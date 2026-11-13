import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { chamarRifa, dinheiro, faixa, type RifaPedido as Pedido } from '@/lib/rifa';
import { Check, Copy, RefreshCw } from 'lucide-react';

// Para quem comprou, o bilhete vale desde a reserva; o Pix é o que a equipe ainda vai conferir
const rotulos = {
  aguardando: 'Bilhete confirmado e concorrendo ao sorteio',
  pago: 'Bilhete confirmado e pagamento recebido',
  cancelado: 'Bilhete invalidado',
};

const cores = {
  aguardando: 'bg-amber-100 text-amber-900 border-amber-300',
  pago: 'bg-green-100 text-green-900 border-green-300',
  cancelado: 'bg-muted text-muted-foreground border-border',
};

const RifaPedido = () => {
  const { id = '' } = useParams();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [qr, setQr] = useState('');
  const [copiado, setCopiado] = useState(false);

  usePageMeta({ title: 'Seu bilhete | Capibots', description: 'Acompanhe o status dos seus bilhetes da rifa digital dos Capibots.', noindex: true });

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const { pedido: dados } = await chamarRifa<{ pedido: Pedido }>(`pedido?id=${encodeURIComponent(id)}`);
      setPedido(dados);
      setErro('');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível carregar o pedido.');
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const pix = pedido?.pix;
  useEffect(() => {
    if (!pix) {
      setQr('');
      return;
    }
    QRCode.toDataURL(pix, { margin: 1, width: 360 }).then(setQr, () => setQr(''));
  }, [pix]);

  const copiar = async () => {
    if (!pix) return;
    try {
      await navigator.clipboard.writeText(pix);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      toast.error('Não foi possível copiar. Selecione o código e copie à mão.');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-10 gradient-orange-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Seu bilhete 🎟️</h1>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto space-y-6">
            {erro && !pedido && (
              <div className="text-center space-y-4">
                <p className="text-destructive" role="alert">{erro}</p>
                <Button asChild variant="outline"><Link to="/rifa">Voltar à rifa</Link></Button>
              </div>
            )}

            {pedido && (
              <>
                {/* Canhoto digital: o texto escala com a largura do bilhete (unidades cqw) */}
                <div
                  className="relative w-full overflow-hidden rounded-2xl shadow-md"
                  style={{ aspectRatio: '2 / 1', containerType: 'inline-size', backgroundImage: 'url(/images/rifa/bilhete-fundo.jpg)', backgroundSize: '100% 100%' }}
                  role="img"
                  aria-label={`Bilhete da rifa Capibots, ${pedido.quantidade === 1 ? 'número' : 'números'} ${faixa(pedido.de, pedido.ate)}`}
                >
                  {/* Canhoto (lado esquerdo, depois do picote) */}
                  <div className="absolute text-center text-foreground" style={{ left: '4%', width: '15%', top: '38%' }}>
                    <p style={{ fontSize: 'max(16px, 5cqw)', lineHeight: 1 }} className="font-bold">{pedido.quantidade}</p>
                    <p style={{ fontSize: 'max(9px, 2.2cqw)' }} className="uppercase tracking-wider text-muted-foreground">{pedido.quantidade === 1 ? 'bilhete' : 'bilhetes'}</p>
                  </div>

                  {/* Área central, longe das ilustrações dos cantos */}
                  <div className="absolute flex flex-col justify-center text-foreground" style={{ left: '25%', right: '20%', top: '12%', bottom: '22%' }}>
                    <p style={{ fontSize: 'max(10px, 2.4cqw)' }} className="uppercase tracking-widest text-muted-foreground">Rifa Capibots · {pedido.primeiroNome}</p>
                    <p style={{ fontSize: 'max(11px, 2.6cqw)', marginTop: '2cqw' }} className="text-muted-foreground">{pedido.quantidade === 1 ? 'Número' : 'Números'}</p>
                    <p style={{ fontSize: '9cqw', lineHeight: 1.05 }} className="font-bold text-gradient">{faixa(pedido.de, pedido.ate)}</p>
                    <p style={{ fontSize: 'max(13px, 3cqw)', marginTop: '2cqw' }} className="font-semibold">{dinheiro(pedido.valorCentavos)}</p>
                  </div>
                </div>
                <p className={`text-sm font-medium rounded-md border px-3 py-2 text-center ${cores[pedido.status]}`}>{rotulos[pedido.status]}</p>
                {pedido.status === 'pago' && <p className="text-sm text-muted-foreground text-center">Obrigado pelo apoio! Boa sorte no sorteio.</p>}
                {pedido.status === 'cancelado' && <p className="text-sm text-muted-foreground text-center">Este bilhete não está mais valendo. Em caso de dúvida, fale com a equipe.</p>}

                {pedido.status === 'aguardando' && pix && (
                  <Card>
                    <CardContent className="p-5 md:p-6 space-y-4 text-center">
                      <h2 className="text-lg font-bold">Falta o Pix: {dinheiro(pedido.valorCentavos)}</h2>
                      {qr && <img src={qr} alt="QR Code do Pix" width={220} height={220} className="mx-auto rounded-md border" />}
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Ou copie o código e use o Pix copia e cola no app do seu banco:</p>
                        <textarea readOnly value={pix} rows={4} onFocus={(e) => e.currentTarget.select()} className="w-full rounded-md border bg-muted/40 p-2 text-xs font-mono break-all" />
                        <Button type="button" onClick={copiar} className="w-full">
                          {copiado ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          {copiado ? 'Código copiado' : 'Copiar código Pix'}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Seus números já estão valendo. A equipe confere os pagamentos uma vez por dia; se já pagou, não precisa fazer mais nada. Bilhetes sem pagamento até perto do sorteio podem ser invalidados, e a equipe avisa você antes pelo telefone.
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="text-center space-y-3">
                  <Button type="button" variant="outline" onClick={carregar} disabled={carregando}>
                    <RefreshCw className={`h-4 w-4 mr-1 ${carregando ? 'animate-spin' : ''}`} />
                    Atualizar status
                  </Button>
                  <p className="text-xs text-muted-foreground">Guarde o endereço desta página: é por ele que você acompanha seu bilhete.</p>
                  {pedido.status !== 'cancelado' && (
                    <p className="text-sm"><Link to="/rifa" className="text-primary underline">Comprar mais bilhetes</Link></p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RifaPedido;
