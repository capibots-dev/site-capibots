import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ContatoImprensa, ListaNaMidia, Selo } from '@/components/imprensa/Blocos';
import { formatarData, indexMeta, releasesPublicados, todasMaterias } from '@/lib/imprensa';

const CORES = [
  { nome: 'Verde-escuro', hex: '#1a5c2a' },
  { nome: 'Laranja', hex: '#e05c00' },
  { nome: 'Texto', hex: '#1f2a22' },
];

const Imprensa = () => {
  usePageMeta(indexMeta);
  const releases = releasesPublicados();
  const materias = todasMaterias();

  return (
    <div className="min-h-screen bg-white text-[#1f2a22]">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-14">
        <div className="max-w-3xl">
          <Selo />
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#1a5c2a]">Sala de Imprensa Capibots</h1>
          <p className="mt-4 text-[17px] leading-[1.6] md:text-lg max-w-[70ch]">
            A Capibots é a equipe de robótica de nove estudantes do 5º ano do Colégio Batista Mineiro, em Uberlândia (MG). Aqui
            ficam os releases, as fotos e o contato para quem quiser publicar ou produzir a própria matéria.
          </p>
        </div>

        <section aria-labelledby="releases" className="mt-12">
          <h2 id="releases" className="text-2xl font-bold text-[#1a5c2a]">Releases</h2>
          {releases.length === 0 ? (
            <p className="mt-4">Nenhum release publicado no momento.</p>
          ) : (
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {releases.map((r) => (
                <li key={r.slug} className="rounded-lg border border-[#1a5c2a]/20 p-5 bg-white">
                  <time dateTime={r.dataPublicacao} className="text-sm text-[#1f2a22]/70">{formatarData(r.dataPublicacao)}</time>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{r.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6]">{r.linhaFina}</p>
                  <Link
                    to={`/imprensa/${r.slug}`}
                    className="mt-4 inline-block font-semibold text-[#1a5c2a] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5c2a]"
                  >
                    Ver release
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="marca" className="mt-12">
          <h2 id="marca" className="text-2xl font-bold text-[#1a5c2a]">Kit da marca</h2>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
            <img src="/capibots-logo.png" alt="Logomarca da Capibots" className="h-28 w-auto rounded-lg border border-[#1a5c2a]/20 p-3 bg-white" />
            <div>
              <a
                href="/capibots-logo.png"
                download="capibots-logomarca.png"
                className="inline-block rounded-md border-2 border-[#1a5c2a] px-4 py-2 font-semibold text-[#1a5c2a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5c2a]"
              >
                Baixar logomarca (PNG)
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

        <ContatoImprensa className="mt-12" />

        {materias.length > 0 && (
          <section aria-labelledby="midia" className="mt-12">
            <h2 id="midia" className="text-2xl font-bold text-[#1a5c2a]">Na mídia</h2>
            <ListaNaMidia materias={materias} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Imprensa;
