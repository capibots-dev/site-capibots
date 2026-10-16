import { FlaskConical, Cpu, Trophy, Megaphone, ShoppingBag, Users, Bot, type LucideIcon } from 'lucide-react';

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

// Ícone e cor de cada categoria (os mesmos da capa)
export const categoriaEstilo: Record<string, { icon: LucideIcon; color: string }> = {
  'Mérito Científico': { icon: FlaskConical, color: 'from-orange-400 to-orange-600' },
  'Tecnologia & Engenharia': { icon: Cpu, color: 'from-sky-400 to-sky-600' },
  'Competições': { icon: Trophy, color: 'from-yellow-400 to-amber-600' },
  'Divulgação': { icon: Megaphone, color: 'from-pink-400 to-pink-600' },
  'Ações Empreendedoras': { icon: ShoppingBag, color: 'from-emerald-400 to-emerald-600' },
  'Nossa Equipe': { icon: Users, color: 'from-violet-400 to-violet-600' },
  'Desafio Prático': { icon: Bot, color: 'from-green-500 to-green-700' },
};

// Seções de "Notícias da temporada": estas categorias têm seção própria; as demais ficam agrupadas em "Notícias"
export const SEASON_SECTION_CATEGORIES = ['Ações Empreendedoras', 'Mérito Científico', 'Tecnologia & Engenharia'];
