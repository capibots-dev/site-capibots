// Rifa digital: reserva números em sequência (a partir de RIFA_PRIMEIRO, depois dos canhotos físicos),
// gera o Pix "copia e cola" com o valor certo e deixa a equipe confirmar o pagamento à mão.
// Os dados ficam num banco D1 (ver schema.sql). A reserva é atômica: o contador só avança se ainda
// houver números, então duas pessoas nunca recebem o mesmo bilhete.
//
// Rotas (todas com prefixo /rifa):
//   GET  /rifa/info                              -> { precoCentavos, primeiro, ultimo, restantes }
//   POST /rifa/reservar  { nome, telefone, email, quantidade, consentimento, site }
//                                                -> { pedido }
//   GET  /rifa/pedido?id=<id>                    -> { pedido }
//   GET  /rifa/admin/pedidos        (Authorization: Bearer <RIFA_ADMIN_TOKEN>)  -> { pedidos, resumo }
//   POST /rifa/admin/status { id | ids, status }  -> { ok: true, alterados }   (status: aguardando | pago | cancelado)

const MAX_POR_PEDIDO = 50;
const MAX_RESERVAS_POR_HORA = 10;
const STATUS = ['aguardando', 'pago', 'cancelado'];

const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;

const numeroInteiro = (env, chave, padrao) => {
  const n = Number.parseInt(env[chave] ?? '', 10);
  return Number.isFinite(n) ? n : padrao;
};

const config = (env) => ({
  preco: numeroInteiro(env, 'RIFA_PRECO_CENTAVOS', 500),
  primeiro: numeroInteiro(env, 'RIFA_PRIMEIRO', 501),
  ultimo: numeroInteiro(env, 'RIFA_ULTIMO', 1000),
});

// ---- Pix (BR Code estático, padrão do Banco Central) ----

const campo = (id, valor) => `${id}${String(valor.length).padStart(2, '0')}${valor}`;

const semAcento = (texto, max) =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .toUpperCase()
    .trim()
    .slice(0, max);

const crc16 = (texto) => {
  let crc = 0xffff;
  for (let i = 0; i < texto.length; i++) {
    crc ^= texto.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

const pixCopiaECola = (env, valorCentavos, txid) => {
  const corpo =
    campo('00', '01') +
    campo('01', '11') +
    campo('26', campo('00', 'br.gov.bcb.pix') + campo('01', env.PIX_CHAVE.trim())) +
    campo('52', '0000') +
    campo('53', '986') +
    campo('54', (valorCentavos / 100).toFixed(2)) +
    campo('58', 'BR') +
    campo('59', semAcento(env.PIX_NOME ?? 'CAPIBOTS', 25)) +
    campo('60', semAcento(env.PIX_CIDADE ?? 'UBERLANDIA', 15)) +
    campo('62', campo('05', txid)) +
    '6304';
  return corpo + crc16(corpo);
};

// ---- Montagem das respostas ----

const novoId = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const intervalo = (linha) => ({ de: linha.inicio, ate: linha.inicio + linha.quantidade - 1 });

// O que o comprador vê: sem telefone nem e-mail, só o primeiro nome
const pedidoPublico = (env, linha) => {
  const { de, ate } = intervalo(linha);
  const publico = {
    id: linha.id,
    primeiroNome: linha.nome.split(' ')[0],
    de,
    ate,
    quantidade: linha.quantidade,
    valorCentavos: linha.valor_centavos,
    status: linha.status,
    criadoEm: linha.criado_em,
    pagoEm: linha.pago_em,
  };
  if (linha.status === 'aguardando' && env.PIX_CHAVE) {
    publico.pix = pixCopiaECola(env, linha.valor_centavos, `RIFA${linha.id.slice(0, 12).toUpperCase()}`);
  }
  return publico;
};

async function info(request, env, { json, cors }) {
  const { preco, primeiro, ultimo } = config(env);
  await env.RIFA.prepare('INSERT OR IGNORE INTO rifa_contador (id, proximo) VALUES (1, ?)').bind(primeiro).run();
  const linha = await env.RIFA.prepare('SELECT proximo FROM rifa_contador WHERE id = 1').first();
  const restantes = Math.max(0, ultimo - linha.proximo + 1);
  return json({ precoCentavos: preco, primeiro, ultimo, restantes, maxPorPedido: MAX_POR_PEDIDO }, 200, cors(request, env));
}

async function reservar(request, env, { json, cors, dentroDoLimite }) {
  const headers = cors(request, env);
  if (!env.PIX_CHAVE) return json({ erro: 'A rifa digital ainda não está aberta.' }, 503, headers);

  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return json({ erro: 'Pedido inválido.' }, 400, headers);
  }
  if (corpo.site) return json({ erro: 'Pedido inválido.' }, 400, headers);

  const nome = String(corpo.nome ?? '').trim().slice(0, 120);
  const telefone = String(corpo.telefone ?? '').replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
  const email = String(corpo.email ?? '').trim().toLowerCase();
  const quantidade = Number(corpo.quantidade);

  if (nome.length < 2) return json({ erro: 'Informe seu nome.' }, 400, headers);
  if (telefone.length < 10 || telefone.length > 11) return json({ erro: 'Informe um telefone com DDD.' }, 400, headers);
  if (email && !emailValido(email)) return json({ erro: 'O e-mail informado não é válido.' }, 400, headers);
  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > MAX_POR_PEDIDO) {
    return json({ erro: `Escolha de 1 a ${MAX_POR_PEDIDO} bilhetes.` }, 400, headers);
  }
  if (corpo.consentimento !== true) return json({ erro: 'É preciso aceitar o uso dos dados.' }, 400, headers);

  if (!(await dentroDoLimite(request, env, 'limite-rifa', MAX_RESERVAS_POR_HORA))) {
    return json({ erro: 'Muitas tentativas. Tente de novo mais tarde.' }, 429, headers);
  }

  const { preco, primeiro, ultimo } = config(env);
  await env.RIFA.prepare('INSERT OR IGNORE INTO rifa_contador (id, proximo) VALUES (1, ?)').bind(primeiro).run();

  // Reserva atômica: avança o contador só se ainda couber a quantidade pedida
  const reserva = await env.RIFA
    .prepare('UPDATE rifa_contador SET proximo = proximo + ?1 WHERE id = 1 AND proximo + ?1 - 1 <= ?2 RETURNING proximo - ?1 AS inicio')
    .bind(quantidade, ultimo)
    .first();
  if (!reserva) return json({ erro: 'Não há bilhetes suficientes para essa quantidade.' }, 409, headers);

  const id = novoId();
  const valorCentavos = quantidade * preco;
  await env.RIFA
    .prepare(
      'INSERT INTO rifa_pedidos (id, nome, telefone, whatsapp, email, inicio, quantidade, valor_centavos, status, criado_em) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    )
    .bind(id, nome, telefone, 1, email || null, reserva.inicio, quantidade, valorCentavos, 'aguardando', new Date().toISOString())
    .run();

  const linha = await env.RIFA.prepare('SELECT * FROM rifa_pedidos WHERE id = ?').bind(id).first();
  return json({ pedido: pedidoPublico(env, linha) }, 200, headers);
}

async function consultar(request, env, { json, cors }) {
  const headers = cors(request, env);
  const id = new URL(request.url).searchParams.get('id') ?? '';
  if (!/^[0-9a-f]{32}$/.test(id)) return json({ erro: 'Pedido não encontrado.' }, 404, headers);
  const linha = await env.RIFA.prepare('SELECT * FROM rifa_pedidos WHERE id = ?').bind(id).first();
  if (!linha) return json({ erro: 'Pedido não encontrado.' }, 404, headers);
  return json({ pedido: pedidoPublico(env, linha) }, 200, headers);
}

// ---- Administração ----

// Compara sem parar no primeiro caractere diferente
const igual = (a, b) => {
  if (a.length !== b.length) return false;
  let diferenca = 0;
  for (let i = 0; i < a.length; i++) diferenca |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diferenca === 0;
};

async function autorizado(request, env, { dentroDoLimite }) {
  if (!env.RIFA_ADMIN_TOKEN) return { ok: false, status: 503, erro: 'Administração não configurada.' };
  const enviado = (request.headers.get('Authorization') ?? '').replace(/^Bearer /, '');
  if (enviado && igual(enviado, env.RIFA_ADMIN_TOKEN)) return { ok: true };
  // Senha errada conta no limite por IP
  if (!(await dentroDoLimite(request, env, 'limite-rifa-admin', 10))) return { ok: false, status: 429, erro: 'Muitas tentativas. Tente de novo mais tarde.' };
  return { ok: false, status: 401, erro: 'Senha incorreta.' };
}

async function adminPedidos(request, env, ajudantes) {
  const headers = ajudantes.cors(request, env);
  const auth = await autorizado(request, env, ajudantes);
  if (!auth.ok) return ajudantes.json({ erro: auth.erro }, auth.status, headers);

  const { results } = await env.RIFA.prepare('SELECT * FROM rifa_pedidos ORDER BY criado_em DESC').all();
  const pedidos = results.map((l) => ({
    id: l.id,
    nome: l.nome,
    telefone: l.telefone,
    email: l.email,
    ...intervalo(l),
    quantidade: l.quantidade,
    valorCentavos: l.valor_centavos,
    status: l.status,
    criadoEm: l.criado_em,
    pagoEm: l.pago_em,
  }));
  const soma = (status, campo) => pedidos.filter((p) => p.status === status).reduce((t, p) => t + p[campo], 0);
  const resumo = {
    pagos: soma('pago', 'quantidade'),
    aguardando: soma('aguardando', 'quantidade'),
    arrecadadoCentavos: soma('pago', 'valorCentavos'),
  };
  return ajudantes.json({ pedidos, resumo }, 200, headers);
}

async function adminStatus(request, env, ajudantes) {
  const headers = ajudantes.cors(request, env);
  const auth = await autorizado(request, env, ajudantes);
  if (!auth.ok) return ajudantes.json({ erro: auth.erro }, auth.status, headers);

  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return ajudantes.json({ erro: 'Pedido inválido.' }, 400, headers);
  }
  // Aceita um pedido (id) ou vários de uma vez (ids), para confirmar pagamentos em lote
  const ids = Array.isArray(corpo.ids) ? corpo.ids.map(String) : [String(corpo.id ?? '')];
  if (!STATUS.includes(corpo.status) || ids.length === 0 || ids.length > 500 || !ids.every((i) => /^[0-9a-f]{32}$/.test(i))) {
    return ajudantes.json({ erro: 'Pedido inválido.' }, 400, headers);
  }

  const pagoEm = corpo.status === 'pago' ? new Date().toISOString() : null;
  const resultados = await env.RIFA.batch(
    ids.map((id) => env.RIFA.prepare('UPDATE rifa_pedidos SET status = ?, pago_em = ? WHERE id = ?').bind(corpo.status, pagoEm, id)),
  );
  const alterados = resultados.reduce((total, r) => total + r.meta.changes, 0);
  if (!alterados) return ajudantes.json({ erro: 'Pedido não encontrado.' }, 404, headers);
  return ajudantes.json({ ok: true, alterados }, 200, headers);
}

// Devolve a resposta se a rota for da rifa, ou null para o Worker seguir com as outras
export async function rifa(request, env, ajudantes) {
  const { pathname } = new URL(request.url);
  if (!pathname.startsWith('/rifa/')) return null;

  const origem = request.headers.get('Origin');
  const origemOk = origem && ajudantes.origensPermitidas(env).includes(origem);
  if (!origemOk) return ajudantes.json({ erro: 'Origem não permitida.' }, 403, ajudantes.cors(request, env));

  const rota = `${request.method} ${pathname}`;
  if (rota === 'GET /rifa/info') return info(request, env, ajudantes);
  if (rota === 'POST /rifa/reservar') return reservar(request, env, ajudantes);
  if (rota === 'GET /rifa/pedido') return consultar(request, env, ajudantes);
  if (rota === 'GET /rifa/admin/pedidos') return adminPedidos(request, env, ajudantes);
  if (rota === 'POST /rifa/admin/status') return adminStatus(request, env, ajudantes);
  return null;
}
