import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WORKER_API as API } from '@/lib/api';
import { BookOpen, Download, FileText, Info } from 'lucide-react';


// A lista precisa bater com CADERNOS em worker/src/index.js (o Worker decide quais PDFs saem)
const CADERNOS = [
  { id: 'merito-cientifico', titulo: 'Mérito Científico', descricao: 'A pesquisa da temporada, do tema à solução.', leitura: '/2026/cadernos/merito-cientifico.html' },
  { id: 'organizacao-e-metodo', titulo: 'Organização e Método', descricao: 'Como a equipe se organiza e trabalha ao longo da temporada.', leitura: '/2026/cadernos/organizacao-e-metodo.html' },
  { id: 'tecnologia-e-engenharia', titulo: 'Tecnologia e Engenharia', descricao: 'A jornada do Robôvara: funções, treinos, método de trabalho e resultados.', leitura: '/2026/cadernos/tecnologia-e-engenharia.html' },
];

// Os links do Worker valem 10 minutos e funcionam uma vez; guardamos 9 para ter margem
const VALIDADE_LINK_MS = 9 * 60 * 1000;

type Link = { url: string; expira: number };

const CadernosTecnicos = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [equipe, setEquipe] = useState('');
  const [site, setSite] = useState(''); // armadilha para robôs: fica escondido
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [aberto, setAberto] = useState(false);
  const [pendente, setPendente] = useState<string | null>(null);
  const [cadastrado, setCadastrado] = useState(false);
  const [links, setLinks] = useState<Record<string, Link>>({});

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

  // Envia o cadastro ao Worker e devolve os links novos
  const cadastrar = async () => {
    const resposta = await fetch(`${API}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, equipe, consentimento, site }),
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.erro ?? 'Não foi possível concluir o cadastro.');
    const novos: Record<string, Link> = {};
    for (const c of dados.cadernos as { id: string; url?: string }[]) {
      if (c.url) novos[c.id] = { url: c.url, expira: Date.now() + VALIDADE_LINK_MS };
    }
    setLinks(novos);
    setCadastrado(true);
    return novos;
  };

  // O link é de uso único: depois de usado, sai da lista
  const iniciarDownload = (id: string, disponiveis: Record<string, Link>) => {
    const link = disponiveis[id];
    if (!link) return;
    setLinks((atuais) => {
      const { [id]: _usado, ...resto } = atuais;
      return resto;
    });
    window.location.href = link.url;
  };

  const clicar = async (id: string) => {
    if (!cadastrado) {
      setPendente(id);
      setErro('');
      setAberto(true);
      return;
    }
    // Já cadastrado: usa o link guardado ou, se já foi usado ou expirou, pede outro com os mesmos dados
    try {
      const atual = links[id];
      iniciarDownload(id, atual && atual.expira > Date.now() ? links : await cadastrar());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Não foi possível iniciar o download.');
    }
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const novos = await cadastrar();
      setAberto(false);
      if (pendente) iniciarDownload(pendente, novos);
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
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-md border border-primary/40 bg-primary/5 p-4 flex gap-3 text-sm">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Versões resumidas.</strong> Estes documentos condensam os cadernos técnicos da equipe para divulgação. Não são as versões finais entregues ao torneio para avaliação.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CADERNOS.map((c) => (
                <Card key={c.id} className="flex flex-col">
                  <CardContent className="p-5 flex flex-col flex-1">
                    <FileText className="h-6 w-6 text-primary mb-3" />
                    <h2 className="text-lg font-bold mb-1">{c.titulo}</h2>
                    <p className="text-sm text-muted-foreground mb-5 flex-1">{c.descricao}</p>
                    <div className="flex flex-col gap-2">
                      <Button asChild size="sm">
                        <a href={c.leitura}>
                          <BookOpen className="h-4 w-4 mr-1" />
                          Ler online
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => clicar(c.id)}>
                        <Download className="h-4 w-4 mr-1" />
                        Baixar PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-sm text-muted-foreground text-center">
              A leitura online é livre. Para baixar o PDF, pedimos um cadastro rápido na primeira vez.
            </p>
          </div>
        </div>
      </section>

      <Dialog open={aberto} onOpenChange={setAberto}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cadastro para download</DialogTitle>
            <DialogDescription>Informe seus dados e o download começa em seguida.</DialogDescription>
          </DialogHeader>

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
              {enviando ? 'Enviando...' : 'Cadastrar e baixar'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CadernosTecnicos;
