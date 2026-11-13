import { Link } from 'react-router-dom';
import { Copy, Mail, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { contato, equipe, fichaRapida, formatarData, mailtoContato, whatsappContato, type Materia } from '@/lib/imprensa';

export const Selo = () => (
  <span className="inline-block rounded-full bg-[#e05c00] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
    Sala de Imprensa
  </span>
);

export const ListaNaMidia = ({ materias }: { materias: Materia[] }) => (
  <ul className="mt-4 divide-y divide-[#1a5c2a]/15 max-w-[70ch]">
    {materias.map((m) => (
      <li key={m.url} className="flex items-center gap-4 py-3">
        {m.logo && <img src={m.logo} alt="" loading="lazy" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full" />}
        <div>
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
        </div>
      </li>
    ))}
  </ul>
);

// A página não está no menu, no sitemap nem nos buscadores (noindex): o link vai direto aos veículos
export const ContatoImprensa = ({ className = '', assunto = 'Imprensa: Capibots', tema }: { className?: string; assunto?: string; tema?: string }) => {
  const botao = `inline-flex items-center gap-2 rounded-md border-2 border-[#1a5c2a] px-4 py-2 font-semibold text-[#1a5c2a] ${FOCO}`;
  return (
    <section aria-labelledby="contato-imprensa" className={className}>
      <h2 id="contato-imprensa" className="text-2xl font-bold text-[#1a5c2a]">Contato de imprensa</h2>
      <p className="mt-3 max-w-[70ch] text-[17px] leading-[1.6]">
        <strong>{contato.nome}</strong>, {contato.papel.toLowerCase().replace('capibots', 'Capibots')}.
        <br />
        {contato.telefone} · {contato.email}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={whatsappContato(tema)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('press_contact_click', { method: 'whatsapp' })}
          className={botao}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
        </a>
        <a href={mailtoContato(assunto, tema)} onClick={() => trackEvent('press_contact_click', { method: 'email' })} className={botao}>
          <Mail className="h-4 w-4" aria-hidden="true" /> E-mail
        </a>
      </div>
    </section>
  );
};

const FOCO = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5c2a]';

// Boilerplate e números da equipe, lidos de "equipe" em releases.json; aparece na página-índice e nos releases
export const SobreEquipe = ({
  className = '',
  mostrarNumeros = false,
  aoCopiar,
}: {
  className?: string;
  mostrarNumeros?: boolean;
  aoCopiar?: (texto: string, rotulo: string) => void;
}) => (
  <section aria-labelledby="sobre-equipe" className={className}>
    <h2 id="sobre-equipe" className="text-2xl font-bold text-[#1a5c2a]">Sobre a Capibots</h2>
    {mostrarNumeros && (
      <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {equipe.numeros.map((n) => (
          <li key={n.rotulo} className="rounded-lg border border-[#1a5c2a]/20 p-4 text-center">
            <p className="text-3xl font-extrabold text-[#e05c00]">{n.valor}</p>
            <p className="mt-1 text-sm">{n.rotulo}</p>
          </li>
        ))}
      </ul>
    )}
    <p className="mt-4 max-w-[70ch] text-[17px] leading-[1.6]">{equipe.texto}</p>
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {aoCopiar && (
        <button
          type="button"
          onClick={() => aoCopiar(equipe.texto, 'sobre_equipe')}
          className={`inline-flex items-center gap-2 rounded-md bg-[#1a5c2a] px-4 py-2 text-sm font-semibold text-white print:hidden ${FOCO}`}
        >
          <Copy className="h-4 w-4" aria-hidden="true" /> Copiar texto sobre a Capibots
        </button>
      )}
      <Link to="/sobre" className={`font-semibold text-[#1a5c2a] underline underline-offset-4 ${FOCO}`}>Conheça cada integrante</Link>
      <a href="https://instagram.com/equipecapibots" target="_blank" rel="noopener noreferrer" className={`font-semibold text-[#1a5c2a] underline underline-offset-4 ${FOCO}`}>@equipecapibots</a>
    </div>
  </section>
);

// Quadro de consulta rápida; o botão copia tudo como texto puro
export const FichaRapida = ({ className = '', aoCopiar }: { className?: string; aoCopiar?: (texto: string, rotulo: string) => void }) => {
  const { linhas, texto } = fichaRapida();
  return (
    <section aria-labelledby="ficha-rapida" className={className}>
      <h2 id="ficha-rapida" className="text-2xl font-bold text-[#1a5c2a]">Ficha rápida</h2>
      <dl className="mt-4 max-w-[70ch] divide-y divide-[#1a5c2a]/15 rounded-lg border border-[#1a5c2a]/20 bg-[#f7f5ef]">
        {linhas.map((l) => (
          <div key={l.rotulo} className="px-4 py-3 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="text-sm font-bold text-[#1a5c2a]">{l.rotulo}</dt>
            <dd className="mt-1 text-[15px] leading-[1.6] sm:mt-0">{l.valor}</dd>
          </div>
        ))}
      </dl>
      {aoCopiar && (
        <button
          type="button"
          onClick={() => aoCopiar(texto, 'ficha_rapida')}
          className={`mt-4 inline-flex items-center gap-2 rounded-md bg-[#1a5c2a] px-4 py-2 text-sm font-semibold text-white print:hidden ${FOCO}`}
        >
          <Copy className="h-4 w-4" aria-hidden="true" /> Copiar ficha rápida
        </button>
      )}
    </section>
  );
};
