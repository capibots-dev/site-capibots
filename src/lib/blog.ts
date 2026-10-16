// Posts do Diário de Bordo ficam fora das notícias (capa, destaques, lista do blog e "Continue Lendo");
// aparecem só na lista da página da temporada.
export const DIARIO_CATEGORY = 'Diário de Bordo';

export const isNewsPost = (post: { category: string }) => post.category !== DIARIO_CATEGORY;

// Categorias que aparecem em "Notícias da temporada" na página do projeto
export const SEASON_NEWS_CATEGORIES = [
  'Ações Empreendedoras',
  'Divulgação',
  'Mérito Científico',
  'Competições',
  'Tecnologia & Engenharia',
];
