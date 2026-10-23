// Worker dos cadernos técnicos: recebe o cadastro, guarda o contato e libera o download por um
// link que vale 10 minutos e funciona uma vez. Os PDFs ficam no R2 (privado) e nunca vão para o
// repositório nem para o site.
//
// Rotas:
//   POST /cadastro  { nome, email, equipe, consentimento, site }  ->  { cadernos: [{ id, titulo, url }] }
//   GET  /baixar?t=<token>                                         ->  o PDF

// Para liberar um caderno, troque disponivel para true (e apague o aviso) e rode `npx wrangler deploy`
const CADERNOS = [
  { id: 'merito-cientifico', titulo: 'Mérito Científico', arquivo: 'merito-cientifico.pdf', disponivel: true },
  { id: 'organizacao-e-metodo', titulo: 'Organização e Método', arquivo: 'organizacao-e-metodo.pdf', disponivel: true },
  {
    id: 'tecnologia-e-engenharia',
    titulo: 'Tecnologia e Engenharia',
    arquivo: 'tecnologia-e-engenharia.pdf',
    disponivel: false,
    aviso:
      'Como a temporada ainda está em andamento e este caderno traz a estratégia do robô, a abordagem do tapete e os detalhes da programação, ele ainda não está disponível. Será liberado ao término da temporada.',
  },
];

const VALIDADE_LINK_SEGUNDOS = 600;
const MAX_CADASTROS_POR_HORA = 5;

const origensPermitidas = (env) => (env.ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim()).filter(Boolean);

const cors = (request, env) => {
  const origem = request.headers.get('Origin');
  const permitida = origem && origensPermitidas(env).includes(origem);
  return {
    'Access-Control-Allow-Origin': permitida ? origem : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
};

const json = (dados, status, headers) =>
  new Response(JSON.stringify(dados), { status, headers: { 'Content-Type': 'application/json', ...headers } });

const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;

const novoToken = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
};

async function cadastro(request, env) {
  const headers = cors(request, env);
  const origem = request.headers.get('Origin');
  if (!origem || !origensPermitidas(env).includes(origem)) return json({ erro: 'Origem não permitida.' }, 403, headers);

  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return json({ erro: 'Pedido inválido.' }, 400, headers);
  }

  // Campo escondido no formulário: pessoas não o veem, robôs preenchem
  if (corpo.site) return json({ erro: 'Pedido inválido.' }, 400, headers);

  const nome = String(corpo.nome ?? '').trim().slice(0, 120);
  const email = String(corpo.email ?? '').trim().toLowerCase();
  const equipe = String(corpo.equipe ?? '').trim().slice(0, 120);
  if (nome.length < 2) return json({ erro: 'Informe seu nome.' }, 400, headers);
  if (!emailValido(email)) return json({ erro: 'Informe um e-mail válido.' }, 400, headers);
  if (equipe.length < 2) return json({ erro: 'Informe sua equipe ou instituição.' }, 400, headers);
  if (corpo.consentimento !== true) return json({ erro: 'É preciso aceitar o uso dos dados.' }, 400, headers);

  // Limite por IP, para dificultar cadastros em massa
  const ip = request.headers.get('CF-Connecting-IP') ?? 'desconhecido';
  const chaveLimite = `limite:${ip}`;
  const usados = Number(await env.CADASTROS.get(chaveLimite)) || 0;
  if (usados >= MAX_CADASTROS_POR_HORA) return json({ erro: 'Muitas tentativas. Tente de novo mais tarde.' }, 429, headers);
  await env.CADASTROS.put(chaveLimite, String(usados + 1), { expirationTtl: 3600 });

  // Guarda o contato; se o e-mail voltar, mantém a data do primeiro cadastro
  const chaveContato = `contato:${email}`;
  const anterior = await env.CADASTROS.get(chaveContato, 'json');
  const agora = new Date().toISOString();
  await env.CADASTROS.put(
    chaveContato,
    JSON.stringify({ nome, email, equipe, primeiroAcesso: anterior?.primeiroAcesso ?? agora, ultimoAcesso: agora, acessos: (anterior?.acessos ?? 0) + 1 }),
  );

  const url = new URL(request.url);
  const cadernos = [];
  for (const c of CADERNOS) {
    if (!c.disponivel) {
      cadernos.push({ id: c.id, titulo: c.titulo, disponivel: false, aviso: c.aviso });
      continue;
    }
    const token = novoToken();
    await env.CADASTROS.put(`token:${token}`, c.arquivo, { expirationTtl: VALIDADE_LINK_SEGUNDOS });
    cadernos.push({ id: c.id, titulo: c.titulo, disponivel: true, url: `${url.origin}/baixar?t=${token}` });
  }
  return json({ cadernos, validadeMinutos: VALIDADE_LINK_SEGUNDOS / 60 }, 200, headers);
}

async function baixar(request, env) {
  const token = new URL(request.url).searchParams.get('t') ?? '';
  if (!/^[0-9a-f]{48}$/.test(token)) return new Response('Link inválido.', { status: 404 });

  const chave = `token:${token}`;
  const arquivo = await env.CADASTROS.get(chave);
  if (!arquivo) return new Response('Este link expirou. Volte à página e faça o cadastro de novo.', { status: 410 });
  await env.CADASTROS.delete(chave);

  const objeto = await env.CADERNOS.get(arquivo);
  if (!objeto) return new Response('Arquivo indisponível.', { status: 404 });

  return new Response(objeto.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="capibots-${arquivo}"`,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request, env) });
    if (request.method === 'POST' && pathname === '/cadastro') return cadastro(request, env);
    if (request.method === 'GET' && pathname === '/baixar') return baixar(request, env);
    return new Response('Não encontrado.', { status: 404 });
  },
};
