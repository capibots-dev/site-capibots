// Eventos do Google Analytics. Nunca envie nome, e-mail ou outro dado pessoal nos parâmetros.
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (name: string, params: Params = {}) => {
  try {
    window.gtag?.('event', name, params);
  } catch {
    // o analytics nunca deve quebrar o site
  }
};

// Classifica o clique em links que o GA não mede sozinho (e-mail, redes sociais, Capi-Aprende)
export const trackLinkClick = (href: string) => {
  if (href.startsWith('mailto:')) {
    trackEvent('click_contact', { method: 'email' });
  } else if (href.includes('instagram.com/')) {
    trackEvent('click_contact', { method: 'instagram', link_url: href });
  } else if (/youtube\.com\/(channel|@)/.test(href)) {
    trackEvent('click_contact', { method: 'youtube' });
  } else if (href.includes('capiaprende.capibots.com.br')) {
    trackEvent('click_capi_aprende', {
      destination: href.includes('/tutorial') ? 'tutorial' : 'app',
      page_path: window.location.pathname,
    });
  }
};
