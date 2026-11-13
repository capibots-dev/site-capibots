import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Download, FileText, FolderOpen, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useCopiar } from '@/components/imprensa/useCopiar';
import { ContatoImprensa, FichaRapida, ListaNaMidia, Selo, SobreEquipe } from '@/components/imprensa/Blocos';
import { trackEvent } from '@/lib/analytics';
import { notFoundMeta } from '@/lib/pageMeta';
import { formatarData, getRelease, releaseMeta, textoLegenda, textoRelease, whatsappContato } from '@/lib/imprensa';

const FOCO = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5c2a]';
const BTN_PRIMARIO = `inline-flex items-center justify-center gap-2 rounded-md bg-[#1a5c2a] px-4 py-2 text-sm font-semibold text-white ${FOCO}`;
const BTN_SECUNDARIO = `inline-flex items-center justify-center gap-2 rounded-md border-2 border-[#1a5c2a] bg-white px-4 py-2 text-sm font-semibold text-[#1a5c2a] ${FOCO}`;
const H2 = 'text-2xl font-bold text-[#1a5c2a]';

const ImprensaRelease = () => {
  const { slug = '' } = useParams();
  const release = getRelease(slug);
  usePageMeta(release ? releaseMeta(release) : notFoundMeta);
  const { aviso, copiar } = useCopiar();

  if (!release) {
    return (
      <div className="min-h-screen bg-white text-[#1f2a22]">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-[#1a5c2a]">Release não encontrado</h1>
          <p className="mt-3">Este release não existe ou ainda não foi publicado.</p>
          <Link to="/imprensa" className="mt-4 inline-block font-semibold text-[#1a5c2a] underline underline-offset-4">
            Voltar à Sala de Imprensa
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const downloads = release.downloads.filter((d) => d.arquivo);
  const fotos = release.fotos.destaques;
  const drive = release.fotos.pastaDrive;
  const track = (action: string) => trackEvent('press_action', { action, release: release.slug });

  return (
    <div className="min-h-screen bg-white text-[#1f2a22]">
      <div className="print:hidden"><Header /></div>

      {/* Anúncio da cópia para leitores de tela */}
      <p role="status" aria-live="polite" className={aviso ? 'fixed top-24 left-1/2 z-[60] -translate-x-1/2 rounded-md bg-[#1f2a22] px-4 py-2 text-sm font-semibold text-white print:hidden' : 'sr-only'}>
        {aviso}
      </p>

      <main className="container mx-auto px-4 pt-10 pb-28 md:pb-14">
        <article className="mx-auto max-w-4xl">
          <nav aria-label="Navegação" className="mb-6 print:hidden">
            <Link to="/imprensa" className={`inline-flex items-center gap-2 text-sm font-semibold text-[#1a5c2a] underline underline-offset-4 ${FOCO}`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar à Sala de Imprensa
            </Link>
          </nav>

          <header>
            <Selo />
            <p className="mt-3 text-sm text-[#1f2a22]/70">
              Publicado em <time dateTime={release.dataPublicacao}>{formatarData(release.dataPublicacao)}</time> · Atualizado em{' '}
              <time dateTime={release.atualizadoEm}>{formatarData(release.atualizadoEm)}</time>
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight text-[#1a5c2a]">{release.titulo}</h1>
            <p className="mt-4 max-w-[70ch] text-lg leading-[1.6] text-[#1f2a22]">{release.linhaFina}</p>
          </header>

          <section aria-label="Resumo" className="mt-6 max-w-[70ch] rounded-lg border-l-4 border-[#e05c00] bg-[#f7f5ef] p-4 text-[17px] leading-[1.6]">
            {release.resumo}
          </section>

          {/* Kit de imprensa: fixo no rodapé da tela no celular */}
          <section
            aria-label="Kit de imprensa"
            className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,.1)] md:static md:z-auto md:mt-8 md:rounded-lg md:border md:bg-[#f7f5ef] md:p-4 md:shadow-none print:hidden"
          >
            <h2 className="sr-only">Kit de imprensa</h2>
            <div className="flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible">
              <button type="button" className={`${BTN_PRIMARIO} shrink-0`} onClick={() => copiar(textoRelease(release), 'release')}>
                <Copy className="h-4 w-4" aria-hidden="true" /> Copiar release
              </button>
              {downloads.map((d) => (
                <a key={d.arquivo} href={d.arquivo} download className={`${BTN_SECUNDARIO} shrink-0`} onClick={() => track(`download:${d.rotulo}`)}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {d.rotulo}
                  {d.tamanho && <span className="font-normal opacity-80">({d.tamanho})</span>}
                </a>
              ))}
              {drive && (
                <a href={drive} target="_blank" rel="noopener noreferrer" className={`${BTN_SECUNDARIO} shrink-0`} onClick={() => track('fotos_drive')}>
                  <FolderOpen className="h-4 w-4" aria-hidden="true" /> Fotos em alta (Drive)
                </a>
              )}
              <a href={whatsappContato(release.tema)} target="_blank" rel="noopener noreferrer" className={`${BTN_SECUNDARIO} shrink-0`} onClick={() => track('falar_com_a_equipe')}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Falar com a equipe
              </a>
            </div>
          </section>

          <section aria-label="Números-chave" className="mt-8">
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {release.numeros.map((n) => (
                <li key={n.rotulo} className="rounded-lg border border-[#1a5c2a]/20 p-4 text-center">
                  <p className="text-3xl font-extrabold text-[#e05c00]">{n.valor}</p>
                  <p className="mt-1 text-sm">{n.rotulo}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Release completo" className="mt-10 max-w-[70ch] text-[17px] leading-[1.6] md:text-lg">
            {release.corpo.map((b, i) =>
              b.tipo === 'intertitulo' ? (
                <h2 key={i} className={`${H2} mt-8 mb-3 border-b-4 border-[#f5c518] pb-1 w-fit`}>{b.texto}</h2>
              ) : b.tipo === 'aspas' ? (
                <blockquote key={i} className="my-5 border-l-4 border-[#e05c00] pl-4 italic">
                  “{b.texto}”{b.autor && <footer className="mt-1 text-sm not-italic">{b.autor}</footer>}
                </blockquote>
              ) : (
                <p key={i} className="mb-4">{b.texto}</p>
              )
            )}
          </section>

          {(fotos.length > 0 || drive) && (
            <section aria-labelledby="fotos" className="mt-12">
              <h2 id="fotos" className={H2}>Fotos em destaque</h2>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {fotos.map((f) => (
                  <li key={f.miniatura}>
                    <img src={f.miniatura} alt={f.alt ?? f.legenda} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
                    <p className="mt-2 text-sm">{f.legenda}</p>
                    <p className="text-xs text-[#1f2a22]/70">{f.credito}</p>
                    <button type="button" className={`${BTN_SECUNDARIO} mt-2 print:hidden`} onClick={() => copiar(textoLegenda(f), 'legenda')}>
                      <Copy className="h-4 w-4" aria-hidden="true" /> Copiar legenda
                    </button>
                  </li>
                ))}
              </ul>
              {drive && (
                <a href={drive} target="_blank" rel="noopener noreferrer" className={`${BTN_SECUNDARIO} mt-6`} onClick={() => track('fotos_drive')}>
                  <FolderOpen className="h-4 w-4" aria-hidden="true" /> Pasta completa no Google Drive
                </a>
              )}
            </section>
          )}

          {release.etapasPesquisa.length > 0 && (
            <section aria-labelledby="pesquisa" className="mt-12">
              <h2 id="pesquisa" className={H2}>A pesquisa passo a passo</h2>
              <ol className="mt-5 space-y-6 border-l-2 border-[#1a5c2a]/30 pl-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 md:border-l-0 md:pl-0 lg:grid-cols-6">
                {release.etapasPesquisa.map((e, i) => (
                  <li key={e.titulo} className="relative md:border-t-2 md:border-[#1a5c2a]/30 md:pt-5">
                    <span className="absolute -left-[33px] top-1 h-3 w-3 rounded-full bg-[#e05c00] md:-top-[7px] md:left-0" aria-hidden="true" />
                    <p className="text-xs font-bold text-[#e05c00]">{e.quando ?? `Etapa ${i + 1}`}</p>
                    <h3 className="font-bold">{e.titulo}</h3>
                    <p className="mt-1 text-sm leading-[1.5]">{e.texto}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {release.prototipo && (
            <section aria-labelledby="experimente" className="mt-12 max-w-[70ch]">
              <h2 id="experimente" className={H2}>Experimente</h2>
              <p className="mt-3 text-[17px] leading-[1.6]">
                O protótipo navegável está aberto ao público. A equipe também convida a imprensa para uma demonstração do tutor com o celular em modo avião.
              </p>
              <a href={release.prototipo} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARIO} mt-4`} onClick={() => track('prototipo')}>
                Abrir o protótipo
              </a>
            </section>
          )}

          {release.naMidia.length > 0 && (
            <section aria-labelledby="midia" className="mt-12">
              <h2 id="midia" className={H2}>Na mídia</h2>
              <ListaNaMidia materias={[...release.naMidia].sort((a, b) => b.data.localeCompare(a.data))} />
            </section>
          )}

          <FichaRapida className="mt-12" aoCopiar={copiar} />

          <SobreEquipe className="mt-12" aoCopiar={copiar} />

          <ContatoImprensa className="mt-12" assunto={`Imprensa: ${release.titulo}`} tema={release.tema} />

          <section aria-labelledby="imagem" className="mt-12 max-w-[70ch] rounded-lg bg-[#f7f5ef] p-4 text-sm leading-[1.6]">
            <h2 id="imagem" className="font-bold flex items-center gap-2"><FileText className="h-4 w-4" aria-hidden="true" /> Direito de imagem</h2>
            <p className="mt-1">
              A equipe detém o consentimento formal das famílias para a divulgação das imagens e fotos disponíveis nesta página e na pasta do Google Drive, conforme prevê o ECA Digital (Lei 15.211/2025) e a LGPD.
            </p>
          </section>

          <details className="mt-8 max-w-[70ch] print:hidden">
            <summary className={`cursor-pointer font-bold text-[#1a5c2a] ${FOCO}`}>Histórico de atualizações</summary>
            <ul className="mt-3 space-y-1 text-sm">
              {[...release.historico].sort((a, b) => b.data.localeCompare(a.data)).map((h) => (
                <li key={h.data + h.mudanca}>
                  <time dateTime={h.data} className="font-semibold">{formatarData(h.data)}</time>: {h.mudanca}
                </li>
              ))}
            </ul>
          </details>
        </article>
      </main>
      <div className="print:hidden"><Footer /></div>
    </div>
  );
};

export default ImprensaRelease;
