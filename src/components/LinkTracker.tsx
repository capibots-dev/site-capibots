import { useEffect } from 'react';
import { trackLinkClick } from '@/lib/analytics';

// Um único listener cobre todos os links do site
const LinkTracker = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      const href = link?.getAttribute('href');
      if (href) trackLinkClick(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
};

export default LinkTracker;
