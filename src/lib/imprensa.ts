import data from '../data/imprensa/releases.json';
import { SITE_URL, type PageMeta } from './pageMeta';

// Tipos e funções da Sala de Imprensa. Sem React, porque o vite.config.ts também importa este
// arquivo para gerar o HTML estático de cada release (WhatsApp e buscadores não rodam JavaScript).
export type Bloco = { tipo: 'paragrafo' | 'intertitulo' | 'aspas'; texto: string; autor?: string };
export type Etapa = { quando?: string; titulo: string; texto: string };
export type Download = { rotulo: string; arquivo: string; tamanho: string };
export type Foto = { miniatura: string; legenda: string; credito: string; alt?: string };
export type Materia = { veiculo: string; titulo: string; data: string; url: string };
export type Release = {
  slug: string;
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
export type Contato = { nome: string; papel: string; email: string };

export const contato = data.contato as Contato;

// Só os publicados, do mais recente para o mais antigo
export const releasesPublicados = (): Release[] =>
  (data.releases as Release[]).filter((r) => r.publicado).sort((a, b) => b.dataPublicacao.localeCompare(a.dataPublicacao));

export const getRelease = (slug: string) => releasesPublicados().find((r) => r.slug === slug);

export const todasMaterias = (): (Materia & { release: string })[] =>
  releasesPublicados()
    .flatMap((r) => r.naMidia.map((m) => ({ ...m, release: r.slug })))
    .sort((a, b) => b.data.localeCompare(a.data));

// Texto puro do release: é o que "Copiar release" entrega e o que deve estar idêntico no .docx
export const textoCorpo = (r: Release) =>
  r.corpo
    .map((b) => (b.tipo === 'aspas' ? `“${b.texto}”${b.autor ? ` (${b.autor})` : ''}` : b.texto))
    .join('\n\n');

export const textoRelease = (r: Release) => `${r.titulo}\n\n${r.linhaFina}\n\n${textoCorpo(r)}`;

export const textoLegenda = (f: Foto) => `${f.legenda} ${f.credito}`;

export const mailtoContato = (assunto: string) =>
  `mailto:${contato.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(
    'Olá, sou jornalista do veículo ___ e gostaria de falar sobre o Capi-Aprende.'
  )}`;

export const formatarData = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const indexMeta: PageMeta = {
  title: 'Sala de Imprensa | Capibots',
  description:
    'Releases, fotos, contato e materiais da Capibots, equipe de robótica de crianças de 10 anos de Uberlândia (MG), para jornalistas e veículos de comunicação.',
};

export const releaseMeta = (r: Release): PageMeta => ({
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
  `</ul></main>`;
