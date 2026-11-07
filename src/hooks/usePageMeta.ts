import { useEffect } from 'react';
import { DEFAULT_IMAGE, SITE_URL, type PageMeta } from '@/lib/pageMeta';

// Atualiza título, descrição, canonical e tags de compartilhamento ao navegar. Quando a página
// sai de cena, devolve o que estava antes, então rotas que não chamam o hook não herdam nada.
const upsert = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  const created = !el;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  const previous = el.getAttribute(attr);
  el.setAttribute(attr, value);
  return () => {
    if (created) el!.remove();
    else if (previous !== null) el!.setAttribute(attr, previous);
  };
};

const metaByName = (name: string, value: string) =>
  upsert(`meta[name="${name}"]`, () => Object.assign(document.createElement('meta'), { name }), 'content', value);

const metaByProperty = (property: string, value: string) =>
  upsert(
    `meta[property="${property}"]`,
    () => {
      const el = document.createElement('meta');
      el.setAttribute('property', property);
      return el;
    },
    'content',
    value
  );

export const usePageMeta = (meta: PageMeta | null | undefined) => {
  const { title, description, image, type, noindex } = meta ?? {};
  const path = typeof window === 'undefined' ? '' : window.location.pathname.replace(/\/$/, '');

  useEffect(() => {
    if (!title || !description) return;
    const url = `${SITE_URL}${path}`;
    const imageUrl = `${SITE_URL}${encodeURI(image ?? DEFAULT_IMAGE)}`;
    const previousTitle = document.title;
    document.title = title;

    const restores = [
      metaByName('description', description),
      upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url),
      metaByProperty('og:title', title.replace(/ \| Capibots$/, '')),
      metaByProperty('og:description', description),
      metaByProperty('og:type', type ?? 'website'),
      metaByProperty('og:url', url),
      metaByProperty('og:image', imageUrl),
      metaByName('twitter:image', imageUrl),
      metaByName('twitter:card', image && type === 'article' ? 'summary_large_image' : 'summary'),
      ...(noindex ? [metaByName('robots', 'noindex')] : []),
    ];

    return () => {
      document.title = previousTitle;
      restores.reverse().forEach((restore) => restore());
    };
  }, [title, description, image, type, noindex, path]);
};
