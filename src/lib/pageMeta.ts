import projectsData from '../data/projects.json';
import teamData from '../data/team.json';

// Título, descrição e imagem de cada página. Usado em dois lugares: pelo hook usePageMeta (navegação
// dentro do site) e pelo vite.config.ts (HTML estático por rota, que é o que WhatsApp, Instagram e
// outros rastreadores sem JavaScript enxergam). Manter num só arquivo evita os dois divergirem.
export const SITE_URL = 'https://capibots.com.br';
export const DEFAULT_IMAGE = '/capibots-logo.png';

export type PageMeta = {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
};

export const homeMeta: PageMeta = {
  title: 'Capibots - Equipe de Robótica Infantil',
  description:
    'Equipe Capibots - Unidos como capivaras, espertos como robôs! Robótica educacional para crianças de 9 e 10 anos, de Uberlândia (MG).',
};

export const staticPages: Record<string, PageMeta> = {
  '/sobre': {
    title: 'Sobre nós | Capibots',
    description:
      'Conheça os integrantes da Capibots, equipe de robótica de crianças de 9 e 10 anos de Uberlândia (MG), seus valores e as conquistas no Torneio Brasil de Robótica.',
  },
  '/projetos': {
    title: 'Projetos e temporadas | Capibots',
    description:
      'As temporadas da Capibots no Torneio Brasil de Robótica: projeto, pesquisa, linha do tempo e notícias de cada ano.',
  },
  '/blog': {
    title: 'Blog | Capibots',
    description:
      'Notícias da Capibots: pesquisa, competições, ações empreendedoras, tecnologia e a vida da equipe de robótica de Uberlândia.',
  },
  '/contato': {
    title: 'Contato | Capibots',
    description:
      'Fale com a Capibots: parcerias, patrocínio, imprensa e dúvidas sobre a equipe de robótica de Uberlândia (MG).',
  },
  '/capi-aprende': {
    title: 'Capi-Aprende: tutorial e beta-testers | Capibots',
    description:
      'O aplicativo que a Capibots criou para ajudar crianças que não têm internet de qualidade a estudar. Veja o tutorial e entre para o grupo de beta-testers.',
  },
};

export const projectMeta = (p: { title: string; subtitle: string; summary: string; image: string }): PageMeta => ({
  title: `${p.subtitle} | Capibots`,
  description: p.summary,
  image: p.image,
});

const truncate = (text: string, max: number) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

export const memberMeta = (m: { name: string; roles: string[]; minibio: string; image: string }): PageMeta => ({
  title: `${m.name}, ${m.roles.join(' e ').toLowerCase()} da Capibots`,
  description: truncate(m.minibio, 160),
  image: m.image,
});

export const postMeta = (p: { title: string; excerpt: string; date: string; image: string }): PageMeta => ({
  title: `${p.title} | Capibots`,
  description: p.excerpt,
  // emoji no campo image não serve de imagem de compartilhamento
  image: p.image.startsWith('/') ? p.image : undefined,
  type: 'article',
  publishedTime: p.date,
});

export const notFoundMeta: PageMeta = {
  title: 'Página não encontrada | Capibots',
  description: 'Esta página não existe ou ainda não foi publicada.',
  noindex: true,
};

// Rotas com HTML estático gerado no build (além dos posts, que ficam no vite.config.ts)
export const staticRoutes = (): { route: string; meta: PageMeta }[] => [
  ...Object.entries(staticPages).map(([route, meta]) => ({ route, meta })),
  ...projectsData.map((p) => ({ route: `/projetos/${p.id}`, meta: projectMeta(p) })),
  ...teamData.map((m) => ({ route: `/equipe/${m.slug}`, meta: memberMeta(m) })),
];
