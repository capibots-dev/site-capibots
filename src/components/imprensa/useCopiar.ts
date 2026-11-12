import { useCallback, useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

// Copia texto puro e devolve o aviso para a região aria-live. Sem navigator.clipboard, seleciona o
// texto num campo temporário e pede Ctrl+C.
export const useCopiar = () => {
  const [aviso, setAviso] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const mostrar = (msg: string) => {
    setAviso(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAviso(''), 3000);
  };

  const copiar = useCallback(async (texto: string, rotulo: string) => {
    trackEvent('press_copy', { item: rotulo });
    try {
      if (!navigator.clipboard?.writeText) throw new Error('sem suporte');
      await navigator.clipboard.writeText(texto);
      mostrar('Texto copiado');
    } catch {
      const campo = document.createElement('textarea');
      campo.value = texto;
      campo.setAttribute('readonly', '');
      campo.style.position = 'fixed';
      campo.style.opacity = '0';
      document.body.appendChild(campo);
      campo.select();
      mostrar('Pressione Ctrl+C');
      setTimeout(() => campo.remove(), 3000);
    }
  }, []);

  return { aviso, copiar };
};
