import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FolderOpen, Presentation } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trackEvent } from '@/lib/analytics';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useCopiar } from '@/components/imprensa/useCopiar';
import { ContatoImprensa, FichaRapida, ListaNaMidia, Selo, SobreEquipe } from '@/components/imprensa/Blocos';
import { formatarData, indexMeta, pastaFotosDrive, releasesPublicados, todasMaterias, type Release } from '@/lib/imprensa';

const FOCO = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5c2a]';

const CORES = [
  { nome: 'Verde-escuro', hex: '#1a5c2a' },
  { nome: 'Laranja', hex: '#e05c00' },
  { nome: 'Texto', hex: '#1f2a22' },
];

const CartaoRelease = ({ r, destaque }: { r: Release; destaque: boolean }) => (
  <li className={`rounded-lg border bg-white p-5 md:p-6 ${destaque ? 'border-[#1a5c2a]/20 border-l-4 border-l-[#e05c00]' : 'border-[#1a5c2a]/20'}`}>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#1f2a22]/70">
      {destaque && <span className="rounded-full bg-[#e05c00] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">Mais recente</span>}
      <time dateTime={r.dataPublicacao}>{formatarData(r.dataPublicacao)}</time>
      {r.atualizadoEm !== r.dataPublicacao && <span>Atualizado em {formatarData(r.atualizadoEm)}</span>}
    </div>
    <h3 className={`mt-2 font-bold leading-snug ${destaque ? 'text-xl md:text-2xl' : 'text-lg'}`}>{r.titulo}</h3>
    <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.6] md:text-base">{r.linhaFina}</p>
    {destaque && r.numeros.length > 0 && (
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Números-chave">
        {r.numeros.map((n) => (
          <li key={n.rotulo} className="rounded-md bg-[#f7f5ef] px-3 py-1.5 text-sm">
            <strong className="text-[#e05c00]">{n.valor}</strong> {n.rotulo}
          </li>
        ))}
      </ul>
    )}
    <Link
      to={`/imprensa/${r.slug}`}
      className={`mt-5 inline-flex items-center gap-2 rounded-md bg-[#1a5c2a] px-4 py-2 text-sm font-semibold text-white ${FOCO}`}
    >
      Ver release <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  </li>
);

const Imprensa = () => {
  usePageMeta(indexMeta);
  const { aviso, copiar } = useCopiar();
  const releases = releasesPublicados();
  const materias = todasMaterias();
  const drive = pastaFotosDrive();

  const secoes = [
    { id: 'releases', rotulo: 'Releases' },
    { id: 'ficha', rotulo: 'Ficha rápida' },
    { id: 'sobre', rotulo: 'Sobre a Capibots' },
    ...(drive ? [{ id: 'fotos', rotulo: 'Fotos' }] : []),
    ...(materias.length > 0 ? [{ id: 'na-midia', rotulo: 'Na mídia' }] : []),
    { id: 'marca', rotulo: 'Kit da marca' },
    { id: 'contato', rotulo: 'Contato' },
  ];

  // Destaca no menu a seção que está na tela
  const [ativa, setAtiva] = useState(secoes[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting);
        if (visivel) setAtiva(visivel.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );
    secoes.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materias.length, drive]);

  const classeLink = (id: string) =>
    `block rounded-md px-3 py-2 text-sm font-semibold ${FOCO} ${
      ativa === id ? 'bg-[#1a5c2a] text-white' : 'text-[#1a5c2a] hover:bg-[#1a5c2a]/10'
    }`;

  return (
    <div className="min-h-screen bg-white text-[#1f2a22]">
      <Header />
      <p
        role="status"
        aria-live="polite"
        className={aviso ? 'fixed top-24 left-1/2 z-[60] -translate-x-1/2 rounded-md bg-[#1f2a22] px-4 py-2 text-sm font-semibold text-white print:hidden' : 'sr-only'}
      >
        {aviso}
      </p>

      {/* Menu das seções no celular: faixa fixa com rolagem lateral */}
      <nav aria-label="Nesta página" className="sticky top-20 z-30 border-b bg-white/95 md:hidden print:hidden">
        <ul className="flex gap-2 overflow-x-auto px-4 py-2">
          {secoes.map((s) => (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} aria-current={ativa === s.id ? 'true' : undefined} className={classeLink(s.id)}>{s.rotulo}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container mx-auto px-4 py-10 md:py-14">
        <header className="max-w-3xl">
          <Selo />
          <h1 className="mt-3 text-3xl font-bold text-[#1a5c2a] md:text-4xl">Sala de Imprensa Capibots</h1>
          <p className="mt-4 max-w-[70ch] text-[17px] leading-[1.6] md:text-lg">
            A Capibots é a equipe de robótica de nove estudantes do 5º ano do Colégio Batista Mineiro, em Uberlândia (MG). Aqui
            ficam os releases, as fotos e o contato para quem quiser publicar ou produzir a própria matéria.
          </p>
        </header>

        <div className="mt-10 md:grid md:grid-cols-[13rem_1fr] md:gap-10">
          {/* Menu das seções no computador */}
          <nav aria-label="Nesta página" className="hidden md:block print:hidden">
            <ul className="sticky top-28 space-y-1">
              {secoes.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={ativa === s.id ? 'true' : undefined} className={classeLink(s.id)}>{s.rotulo}</a>
                </li>
              ))}
            </ul>
          </nav>

          <main className="min-w-0 space-y-14">
            <section id="releases" aria-labelledby="titulo-releases" className="scroll-mt-36 md:scroll-mt-28">
              <h2 id="titulo-releases" className="text-2xl font-bold text-[#1a5c2a]">Releases</h2>
              {releases.length === 0 ? (
                <p className="mt-4">Nenhum release publicado no momento.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {releases.map((r, i) => (
                    <CartaoRelease key={r.slug} r={r} destaque={i === 0} />
                  ))}
                </ul>
              )}
            </section>

            <div id="ficha" className="scroll-mt-36 md:scroll-mt-28">
              <FichaRapida aoCopiar={copiar} />
            </div>

            <div id="sobre" className="scroll-mt-36 md:scroll-mt-28">
              <SobreEquipe mostrarNumeros aoCopiar={copiar} />
            </div>

            {drive && (
              <section id="fotos" aria-labelledby="titulo-fotos" className="scroll-mt-36 md:scroll-mt-28">
                <h2 id="titulo-fotos" className="text-2xl font-bold text-[#1a5c2a]">Fotos</h2>
                <p className="mt-3 max-w-[70ch] text-[17px] leading-[1.6]">
                  As fotos em alta resolução estão numa pasta do Google Drive, liberadas para a imprensa.
                </p>
                <a
                  href={drive}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('press_action', { action: 'fotos_drive', release: 'indice' })}
                  className={`mt-4 inline-flex items-center gap-2 rounded-md border-2 border-[#1a5c2a] px-4 py-2 font-semibold text-[#1a5c2a] ${FOCO}`}
                >
                  <FolderOpen className="h-4 w-4" aria-hidden="true" /> Fotos em alta (Drive)
                </a>
              </section>
            )}

            {materias.length > 0 && (
              <section id="na-midia" aria-labelledby="titulo-midia" className="scroll-mt-36 md:scroll-mt-28">
                <h2 id="titulo-midia" className="text-2xl font-bold text-[#1a5c2a]">Na mídia</h2>
                <ListaNaMidia materias={materias} />
              </section>
            )}

            <section id="marca" aria-labelledby="titulo-marca" className="scroll-mt-36 md:scroll-mt-28">
              <h2 id="titulo-marca" className="text-2xl font-bold text-[#1a5c2a]">Kit da marca</h2>
              <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
                <img src="/capibots-logo.png" alt="Logomarca da Capibots" className="h-28 w-auto rounded-lg border border-[#1a5c2a]/20 bg-white p-3" />
                <div>
                  <a
                    href="/capibots-logo.png"
                    download="capibots-logomarca.png"
                    className={`inline-block rounded-md border-2 border-[#1a5c2a] px-4 py-2 font-semibold text-[#1a5c2a] ${FOCO}`}
                  >
                    Baixar logomarca (PNG)
                  </a>
                  <a
                    href="/mediakit/2026/mediakit_capibots_2026_institucional.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('press_action', { action: 'mediakit_institucional', release: 'indice' })}
                    className={`ml-0 mt-3 inline-flex items-center gap-2 rounded-md border-2 border-[#1a5c2a] px-4 py-2 font-semibold text-[#1a5c2a] sm:ml-3 sm:mt-0 ${FOCO}`}
                  >
                    <Presentation className="h-4 w-4" aria-hidden="true" /> Media kit institucional
                  </a>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {CORES.map((c) => (
                      <li key={c.hex} className="flex items-center gap-2 text-sm">
                        <span className="h-6 w-6 rounded border border-black/20" style={{ background: c.hex }} aria-hidden="true" />
                        {c.nome} <code>{c.hex}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <div id="contato" className="scroll-mt-36 md:scroll-mt-28">
              <ContatoImprensa />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Imprensa;
