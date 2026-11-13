import data from '../data/imprensa/releases.json';
import team from '../data/team.json';
import { SITE_URL, type PageMeta } from './pageMeta';

// Tipos e funções da Sala de Imprensa. Sem React, porque o vite.config.ts também importa este
// arquivo para gerar o HTML estático de cada release (WhatsApp e buscadores não rodam JavaScript).
export type Bloco = { tipo: 'paragrafo' | 'intertitulo' | 'aspas'; texto: string; autor?: string };
export type Etapa = { quando?: string; titulo: string; texto: string };
export type Download = { rotulo: string; arquivo: string; tamanho: string };
export type Foto = { miniatura: string; legenda: string; credito: string; alt?: string };
export type Materia = { veiculo: string; logo?: string; titulo: string; data: string; url: string };
export type Release = {
  slug: string;
  tema?: string;
  publicado: boolean;
  dataPublicacao: string;
  atualizadoEm: string;
  titulo: string;
  linhaFina: string;
  resumo: string;
  numeros: { valor: string; rotulo: string }[];
  corpo: Bloco[];
  etapasPesquisa: Etapa[];
  downloads: Download[];
  fotos: { pastaDrive: string; destaques: Foto[] };
  prototipo: string;
  naMidia: Materia[];
  imagemCompartilhamento: string;
  historico: { data: string; mudanca: string }[];
};
export type Contato = { nome: string; papel: string; whatsapp: string; telefone: string; email: string };

export type Equipe = { texto: string; numeros: { valor: string; rotulo: string }[] };

export const contato = data.contato as Contato;
export const equipe = data.equipe as Equipe;

// Só os publicados, do mais recente para o mais antigo
export const releasesPublicados = (): Release[] =>
  (data.releases as Release[]).filter((r) => r.publicado).sort((a, b) => b.dataPublicacao.localeCompare(a.dataPublicacao));

// Pasta de fotos em alta: a mesma em todos os releases; usa a do mais recente que tiver
export const pastaFotosDrive = (): string => releasesPublicados().find((r) => r.fotos.pastaDrive)?.fotos.pastaDrive ?? '';

export const getRelease = (slug: string) => releasesPublicados().find((r) => r.slug === slug);

// Matérias de todos os releases, sem repetir a mesma URL, da mais recente para a mais antiga
export const todasMaterias = (): (Materia & { release: string })[] => {
  const vistas = new Set<string>();
  return releasesPublicados()
    .flatMap((r) => r.naMidia.map((m) => ({ ...m, release: r.slug })))
    .filter((m) => !vistas.has(m.url) && vistas.add(m.url))
    .sort((a, b) => b.data.localeCompare(a.data));
};

// Texto puro do release: é o que "Copiar release" entrega e o que deve estar idêntico no .docx
export const textoCorpo = (r: Release) =>
  r.corpo
    .map((b) => (b.tipo === 'aspas' ? `“${b.texto}”${b.autor ? ` (${b.autor})` : ''}` : b.texto))
    .join('\n\n');

export const textoRelease = (r: Release) => `${r.titulo}\n\n${r.linhaFina}\n\n${textoCorpo(r)}`;

export const textoLegenda = (f: Foto) => `${f.legenda} ${f.credito}`;

const mensagemJornalista = (tema: string) => `Olá, sou jornalista do veículo ___ e gostaria de falar sobre ${tema}.`;

export const mailtoContato = (assunto: string, tema = 'a Capibots') =>
  `mailto:${contato.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagemJornalista(tema))}`;

export const whatsappContato = (tema = 'a Capibots') =>
  `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagemJornalista(tema))}`;

export const formatarData = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// As páginas da Sala de Imprensa não entram em buscadores nem no sitemap: o link é enviado direto aos veículos
export const indexMeta: PageMeta = {
  noindex: true,
  title: 'Sala de Imprensa | Capibots',
  description:
    'Releases, fotos, contato e materiais da Capibots, equipe de robótica de crianças de 10 anos de Uberlândia (MG), para jornalistas e veículos de comunicação.',
};

export const releaseMeta = (r: Release): PageMeta => ({
  noindex: true,
  title: `${r.titulo} | Capibots`,
  description: r.linhaFina,
  image: r.imagemCompartilhamento || undefined,
  type: 'article',
  publishedTime: r.dataPublicacao,
});

export const releaseJsonLd = (r: Release) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: r.titulo,
  description: r.linhaFina,
  datePublished: r.dataPublicacao,
  dateModified: r.atualizadoEm,
  author: { '@type': 'Organization', name: 'Equipe Capibots', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Capibots', logo: { '@type': 'ImageObject', url: `${SITE_URL}/capibots-logo.png` } },
  image: [`${SITE_URL}${r.imagemCompartilhamento || '/capibots-logo.png'}`],
  mainEntityOfPage: `${SITE_URL}/imprensa/${r.slug}`,
  inLanguage: 'pt-BR',
});

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// HTML simples que vai dentro de #root nas páginas geradas no build. O React substitui tudo ao carregar;
// ele existe para quem lê o código-fonte e para os rastreadores.
export const releaseStaticBody = (r: Release) =>
  `<main><article><h1>${esc(r.titulo)}</h1><p>${esc(r.linhaFina)}</p>` +
  r.corpo
    .map((b) => (b.tipo === 'intertitulo' ? `<h2>${esc(b.texto)}</h2>` : `<p>${esc(b.tipo === 'aspas' ? `“${b.texto}”` : b.texto)}</p>`))
    .join('') +
  `<p><a href="/imprensa">Sala de Imprensa Capibots</a></p></article></main>`;

export const indexStaticBody = () =>
  `<main><h1>Sala de Imprensa Capibots</h1><ul>` +
  releasesPublicados()
    .map((r) => `<li><a href="/imprensa/${r.slug}">${esc(r.titulo)}</a> <p>${esc(r.linhaFina)}</p></li>`)
    .join('') +
  `</ul><h2>Sobre a Capibots</h2><p>${esc(equipe.texto)}</p></main>`;

// Ficha rápida: o quadro que o repórter copia. Só primeiro nome, nunca sobrenome.
export const fichaRapida = () => {
  const integrantes = (team as { name: string; roles: string[] }[])
    .map((m) => `${m.name.split(' ')[0]} (${m.roles.join(' e ').toLowerCase()})`)
    .join(', ');
  const linhas: { rotulo: string; valor: string }[] = [
    { rotulo: 'Equipe', valor: 'Capibots, equipe de robótica' },
    { rotulo: 'Integrantes', valor: integrantes },
    { rotulo: 'Escola', valor: 'Colégio Batista Mineiro, Unidade Martins' },
    { rotulo: 'Cidade', valor: 'Uberlândia (MG)' },
    { rotulo: 'Torneio e categoria', valor: 'Torneio Brasil de Robótica (TBR), categoria Kids 2' },
    { rotulo: 'Final Nacional', valor: '11 a 13 de dezembro de 2026, em Curitiba (PR)' },
    { rotulo: 'Resultado no Regional', valor: '3º lugar geral, em Ituiutaba (31/10 e 1º/11)' },
    { rotulo: 'Pesquisa em números', valor: '46 estudantes ouvidos em campo, 8 soluções comparadas e 16 estudantes no primeiro teste em sala de aula' },
    {
      rotulo: 'O aplicativo',
      valor:
        'O Capi-Aprende é um aplicativo de estudo com tutor de inteligência artificial que roda no próprio celular, sem internet. O professor cadastra o conteúdo numa plataforma; o aluno baixa uma vez, quando há conexão, e estuda em casa. O tutor conversa com a criança e orienta o raciocínio em vez de entregar a resposta. O protótipo navegável está aberto em capiaprende.capibots.com.br.',
    },
  ];
  return {
    linhas,
    texto: linhas.map((l) => `${l.rotulo}: ${l.valor}`).join('\n'),
  };
};
