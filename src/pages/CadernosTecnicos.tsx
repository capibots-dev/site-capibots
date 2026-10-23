import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, Lock } from 'lucide-react';

// Endereço do Worker da Cloudflare (pasta worker/). Troque pelo endereço que o deploy mostrar.
const API = import.meta.env.VITE_CADERNOS_API ?? 'https://capibots-cadernos.capibots-cadernos.workers.dev';

type Caderno = { id: string; titulo: string; disponivel: boolean; url?: string; aviso?: string };

const CadernosTecnicos = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [equipe, setEquipe] = useState('');
  const [site, setSite] = useState(''); // armadilha para robôs: fica escondido
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [cadernos, setCadernos] = useState<Caderno[] | null>(null);

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
      setCadernos(dados.cadernos);
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
          <div className="max-w-xl mx-auto">
            {cadernos ? (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Cadastro feito!</h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    Cada link abaixo funciona uma vez e expira em 10 minutos. Se precisar, volte e faça o cadastro de novo.
                  </p>
                  <div className="space-y-3">
                    {cadernos.map((c) =>
                      c.disponivel ? (
                        <Button key={c.id} asChild variant="outline" className="w-full justify-start">
                          <a href={c.url}>
                            <FileText className="h-4 w-4 mr-2" />
                            {c.titulo}
                            <Download className="h-4 w-4 ml-auto" />
                          </a>
                        </Button>
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
            ) : (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">Receba os cadernos</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Preencha os dados para liberar o download dos cadernos técnicos da temporada.
                  </p>

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
