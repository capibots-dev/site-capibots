import { Mail } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { contato, formatarData, mailtoContato, type Materia } from '@/lib/imprensa';

export const Selo = () => (
  <span className="inline-block rounded-full bg-[#e05c00] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
    Sala de Imprensa
  </span>
);

export const ListaNaMidia = ({ materias }: { materias: Materia[] }) => (
  <ul className="mt-4 divide-y divide-[#1a5c2a]/15 max-w-[70ch]">
    {materias.map((m) => (
      <li key={m.url} className="py-3">
        <p className="text-sm text-[#1f2a22]/70">
          {m.veiculo} · <time dateTime={m.data}>{formatarData(m.data)}</time>
        </p>
        <a
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('press_media_click', { veiculo: m.veiculo })}
          className="font-semibold text-[#1a5c2a] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5c2a]"
        >
          {m.titulo}
        </a>
      </li>
    ))}
  </ul>
);

// Só o e-mail da equipe fica público: a página é indexável e aparece no menu e no rodapé do site
export const ContatoImprensa = ({ className = '', assunto = 'Imprensa: Capi-Aprende' }: { className?: string; assunto?: string }) => (
  <section aria-labelledby="contato-imprensa" className={className}>
    <h2 id="contato-imprensa" className="text-2xl font-bold text-[#1a5c2a]">Contato de imprensa</h2>
    <p className="mt-3 max-w-[70ch] text-[17px] leading-[1.6]">
      <strong>{contato.nome}</strong>, {contato.papel.toLowerCase()}.
    </p>
    <a
      href={mailtoContato(assunto)}
      onClick={() => trackEvent('press_contact_click', { method: 'email' })}
      className="mt-4 inline-flex items-center gap-2 rounded-md border-2 border-[#1a5c2a] px-4 py-2 font-semibold text-[#1a5c2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5c2a]"
    >
      <Mail className="h-4 w-4" aria-hidden="true" />
      {contato.email}
    </a>
  </section>
);
