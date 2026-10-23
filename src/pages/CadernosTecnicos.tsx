import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Download, FileText, Lock } from 'lucide-react';

// Endereço do Worker da Cloudflare (pasta worker/). Troque pelo endereço que o deploy mostrar.
const API = import.meta.env.VITE_CADERNOS_API ?? 'https://capibots-cadernos.capibots-cadernos.workers.dev';

// A lista precisa bater com CADERNOS em worker/src/index.js. Quem decide de verdade é o Worker:
// ele só gera link para os cadernos com disponivel: true.
const CADERNOS = [
  { id: 'merito-cientifico', titulo: 'Mérito Científico', descricao: 'A pesquisa da temporada, do tema à solução.', disponivel: true },
  { id: 'organizacao-e-metodo', titulo: 'Organização e Método', descricao: 'Como a equipe se organiza e trabalha ao longo da temporada.', disponivel: true },
  {
    id: 'tecnologia-e-engenharia',
    titulo: 'Tecnologia e Engenharia',
    descricao: '',
    disponivel: false,
    aviso:
      'Como a temporada ainda está em andamento e este caderno traz a estratégia do robô, a abordagem do tapete e os detalhes da programação, ele ainda não está disponível. Será liberado ao término da temporada.',
  },
];

const CadernosTecnicos = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [equipe, setEquipe] = useState('');
  const [site, setSite] = useState(''); // armadilha para robôs: fica escondido
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [links, setLinks] = useState<Record<string, string> | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // A página não deve aparecer em buscadores; o endereço circula só nos cadernos entregues
  useEffect(() => {
    document.title = 'Cadernos técnicos 2026 | Capibots';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const irParaCadastro = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formRef.current?.querySelector('input')?.focus({ preventScroll: true });
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const resposta = await fetch(`${API}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, equipe, consentimento, site }),
      });
      const dados = await resposta.json().catch(() => ({}));
      if (!resposta.ok) throw new Error(dados.erro ?? 'Não foi possível concluir o cadastro.');
      const mapa: Record<string, string> = {};
      for (const c of dados.cadernos as { id: string; url?: string }[]) if (c.url) mapa[c.id] = c.url;
      setLinks(mapa);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível concluir o cadastro.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-10 md:py-14 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Cadernos técnicos 2026</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-white/90">
            Os trabalhos que a equipe Capibots desenvolveu na temporada do TBR 2026.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Cadernos</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  {links
                    ? 'Cadastro feito! Cada link funciona uma vez e expira em 10 minutos. Se precisar, faça o cadastro de novo.'
                    : 'Para baixar, preencha o cadastro logo abaixo.'}
                </p>

                <div className="space-y-3">
                  {CADERNOS.map((c) =>
                    c.disponivel ? (
                      <div key={c.id} className="rounded-md border p-3 flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{c.titulo}</p>
                          <p className="text-sm text-muted-foreground">{c.descricao}</p>
                        </div>
                        {links?.[c.id] ? (
                          <Button asChild size="sm">
                            <a href={links[c.id]}>
                              <Download className="h-4 w-4 mr-1" />
                              Baixar
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={irParaCadastro} disabled={!!links}>
                            <Lock className="h-4 w-4 mr-1" />
                            Baixar
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div key={c.id} className="rounded-md border border-dashed p-3 text-sm">
                        <p className="font-medium flex items-center mb-1">
                          <Lock className="h-4 w-4 mr-2" />
                          {c.titulo}
                        </p>
                        <p className="text-muted-foreground">{c.aviso}</p>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {links ? (
              <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Obrigado pelo interesse no trabalho da equipe!
              </p>
            ) : (
              <Card ref={formRef}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Cadastro para download</h2>
                  <p className="text-sm text-muted-foreground mb-6">Informe seus dados para liberar os botões de download.</p>

                  <form onSubmit={enviar} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required maxLength={120} autoComplete="name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} autoComplete="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="equipe">Equipe ou instituição</Label>
                      <Input id="equipe" value={equipe} onChange={(e) => setEquipe(e.target.value)} required maxLength={120} />
                    </div>

                    {/* Armadilha para robôs */}
                    <div aria-hidden="true" className="absolute -left-[9999px]">
                      <label htmlFor="site">Site</label>
                      <input id="site" tabIndex={-1} autoComplete="off" value={site} onChange={(e) => setSite(e.target.value)} />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox id="consentimento" checked={consentimento} onCheckedChange={(v) => setConsentimento(v === true)} className="mt-1" />
                      <Label htmlFor="consentimento" className="text-sm font-normal text-muted-foreground leading-snug">
                        Concordo que a equipe Capibots guarde meu nome, e-mail e equipe para saber quem acessou os cadernos. Os dados não serão compartilhados nem usados para outra finalidade.
                      </Label>
                    </div>

                    {erro && <p className="text-sm text-destructive" role="alert">{erro}</p>}

                    <Button type="submit" className="w-full" disabled={enviando || !consentimento}>
                      {enviando ? 'Enviando...' : 'Liberar download'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CadernosTecnicos;
