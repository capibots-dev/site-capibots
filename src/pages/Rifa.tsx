import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { usePageMeta } from '@/hooks/usePageMeta';
import { trackEvent } from '@/lib/analytics';
import { RIFA_DATA_SORTEIO, RIFA_PREMIO, chamarRifa, dinheiro, type RifaInfo, type RifaPedido } from '@/lib/rifa';
import { Minus, Plus, Ticket } from 'lucide-react';

const ATALHOS = [1, 5, 10, 20];

const Rifa = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<RifaInfo | null>(null);
  const [falhaInfo, setFalhaInfo] = useState(false);
  const [quantidade, setQuantidade] = useState(5);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [site, setSite] = useState(''); // armadilha para robôs: fica escondido
  const [consentimento, setConsentimento] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  usePageMeta({
    title: 'Rifa digital | Capibots',
    description: 'Compre bilhetes da rifa dos Capibots pelo site e ajude a equipe a chegar à Final Nacional do TBR em Curitiba.',
  });

  useEffect(() => {
    chamarRifa<RifaInfo>('info')
      .then(setInfo)
      .catch(() => setFalhaInfo(true));
  }, []);

  const limite = info ? Math.min(info.maxPorPedido, info.restantes) : 1;
  const ajustar = (n: number) => setQuantidade(Math.max(1, Math.min(limite, n || 1)));

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const { pedido } = await chamarRifa<{ pedido: RifaPedido }>('reservar', {
        metodo: 'POST',
        corpo: { nome, telefone, email, quantidade, consentimento, site },
      });
      trackEvent('rifa_reserva', { quantidade });
      navigate(`/rifa/pedido/${pedido.id}`);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível reservar os bilhetes.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-10 md:py-14 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Rifa digital Capibots 🎟️</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-white/90">
            Compre seus bilhetes pelo site e ajude a equipe a chegar à Final Nacional do TBR, em Curitiba.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto space-y-6">
            {(RIFA_PREMIO || RIFA_DATA_SORTEIO) && (
              <div className="rounded-md border border-primary/40 bg-primary/5 p-4 text-sm space-y-1">
                {RIFA_PREMIO && <p><strong>Prêmio:</strong> {RIFA_PREMIO}</p>}
                {RIFA_DATA_SORTEIO && <p><strong>Sorteio:</strong> {RIFA_DATA_SORTEIO}</p>}
              </div>
            )}

            {falhaInfo && <p className="text-sm text-destructive" role="alert">Não foi possível carregar a rifa agora. Tente de novo em instantes.</p>}

            {info && info.restantes === 0 && (
              <p className="text-center font-semibold">Os bilhetes digitais acabaram. Obrigado pelo apoio!</p>
            )}

            {info && info.restantes > 0 && (
              <Card>
                <CardContent className="p-5 md:p-6">
                  <form onSubmit={enviar} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Quantos bilhetes?</Label>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button type="button" variant="outline" size="icon" aria-label="Menos um bilhete" onClick={() => ajustar(quantidade - 1)} disabled={quantidade <= 1}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          id="quantidade"
                          type="number"
                          inputMode="numeric"
                          min={1}
                          max={limite}
                          value={quantidade}
                          onChange={(e) => ajustar(parseInt(e.target.value, 10))}
                          className="w-20 text-center"
                        />
                        <Button type="button" variant="outline" size="icon" aria-label="Mais um bilhete" onClick={() => ajustar(quantidade + 1)} disabled={quantidade >= limite}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <div className="flex gap-1 ml-auto">
                          {ATALHOS.filter((n) => n <= limite).map((n) => (
                            <Button key={n} type="button" size="sm" variant={quantidade === n ? 'default' : 'outline'} onClick={() => ajustar(n)}>
                              {n}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Ticket className="h-4 w-4 text-primary" />
                        {dinheiro(info.precoCentavos)} cada · total <strong className="text-foreground">{dinheiro(quantidade * info.precoCentavos)}</strong>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required maxLength={120} autoComplete="name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone/WhatsApp (com DDD)</Label>
                      <Input id="telefone" type="tel" inputMode="tel" placeholder="(34) 99999-9999" value={telefone} onChange={(e) => setTelefone(e.target.value)} required maxLength={20} autoComplete="tel" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} autoComplete="email" />
                    </div>

                    {/* Armadilha para robôs */}
                    <div aria-hidden="true" className="absolute -left-[9999px]">
                      <label htmlFor="site">Site</label>
                      <input id="site" tabIndex={-1} autoComplete="off" value={site} onChange={(e) => setSite(e.target.value)} />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox id="consentimento" checked={consentimento} onCheckedChange={(v) => setConsentimento(v === true)} className="mt-1" />
                      <Label htmlFor="consentimento" className="text-sm font-normal text-muted-foreground leading-snug">
                        Concordo que a equipe Capibots guarde meu nome e contato para registrar meus bilhetes e avisar se eu for sorteado. Os dados não serão compartilhados nem usados para outra finalidade.
                      </Label>
                    </div>

                    {erro && <p className="text-sm text-destructive" role="alert">{erro}</p>}

                    <Button type="submit" className="w-full" disabled={enviando || !consentimento}>
                      {enviando ? 'Reservando...' : 'Reservar e gerar Pix'}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Seus números já ficam valendo na hora. Pague o Pix em seguida; a equipe confere os pagamentos e entra em contato se algo faltar.
                    </p>
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

export default Rifa;
