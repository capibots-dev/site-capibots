import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { usePageMeta } from '@/hooks/usePageMeta';
import { chamarRifa, dinheiro, faixa, rotuloStatus, type StatusPedido } from '@/lib/rifa';

type PedidoAdmin = {
  id: string;
  nome: string;
  telefone: string;
  email: string | null;
  de: number;
  ate: number;
  quantidade: number;
  valorCentavos: number;
  status: StatusPedido;
  criadoEm: string;
  pagoEm: string | null;
};

type Resumo = { pagos: number; aguardando: number; arrecadadoCentavos: number };

const FILTROS: { valor: StatusPedido | 'todos'; rotulo: string }[] = [
  { valor: 'aguardando', rotulo: 'Pendentes' },
  { valor: 'pago', rotulo: 'Pagos' },
  { valor: 'cancelado', rotulo: 'Invalidados' },
  { valor: 'todos', rotulo: 'Todos' },
];

const formatarTelefone = (t: string) => (t.length === 11 ? `(${t.slice(0, 2)}) ${t.slice(2, 7)}-${t.slice(7)}` : `(${t.slice(0, 2)}) ${t.slice(2, 6)}-${t.slice(6)}`);
const data = (iso: string) => new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
const aspas = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

// Página interna da equipe: lista os pedidos da rifa e confirma os pagamentos. A senha vive só na
// memória desta aba; quem confere de verdade é o Worker.
const RifaAdmin = () => {
  usePageMeta({ title: 'Administração da rifa | Capibots', description: 'Área interna da equipe Capibots.', noindex: true });

  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [pedidos, setPedidos] = useState<PedidoAdmin[]>([]);
  const [resumo, setResumo] = useState<Resumo | null>(null);
  const [filtro, setFiltro] = useState<StatusPedido | 'todos'>('aguardando');
  const [erro, setErro] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());

  const carregar = useCallback(async (s: string) => {
    setOcupado(true);
    try {
      const dados = await chamarRifa<{ pedidos: PedidoAdmin[]; resumo: Resumo }>('admin/pedidos', { senha: s });
      setPedidos(dados.pedidos);
      setSelecionados(new Set());
      setResumo(dados.resumo);
      setLogado(true);
      setErro('');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Não foi possível entrar.');
      setLogado(false);
    } finally {
      setOcupado(false);
    }
  }, []);

  const mudar = async (pedido: PedidoAdmin, status: StatusPedido) => {
    if (status === 'cancelado' && !window.confirm(`Invalidar o pedido de ${pedido.nome}? Os números ${faixa(pedido.de, pedido.ate)} saem do sorteio e não serão reaproveitados.`)) return;
    try {
      await chamarRifa('admin/status', { metodo: 'POST', corpo: { id: pedido.id, status }, senha });
      await carregar(senha);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Não foi possível atualizar o pedido.');
    }
  };

  const confirmarSelecionados = async () => {
    const ids = [...selecionados];
    if (!ids.length || !window.confirm(`Confirmar o pagamento de ${ids.length} ${ids.length === 1 ? 'pedido' : 'pedidos'}?`)) return;
    try {
      await chamarRifa('admin/status', { metodo: 'POST', corpo: { ids, status: 'pago' }, senha });
      toast.success(`${ids.length} ${ids.length === 1 ? 'pedido confirmado' : 'pedidos confirmados'}.`);
      await carregar(senha);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Não foi possível confirmar os pedidos.');
    }
  };

  const alternar = (id: string, marcado: boolean) =>
    setSelecionados((atuais) => {
      const novos = new Set(atuais);
      if (marcado) novos.add(id);
      else novos.delete(id);
      return novos;
    });

  const exportar = () => {
    const linhas = [
      ['Números', 'Nome', 'Telefone/WhatsApp', 'E-mail', 'Quantidade', 'Valor', 'Status', 'Criado em', 'Pago em'],
      ...pedidos.map((p) => [faixa(p.de, p.ate), p.nome, p.telefone, p.email ?? '', p.quantidade, (p.valorCentavos / 100).toFixed(2), p.status, p.criadoEm, p.pagoEm ?? '']),
    ];
    const blob = new Blob([`\ufeff${linhas.map((l) => l.map(aspas).join(';')).join('\n')}`], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'rifa-digital.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const visiveis = pedidos.filter((p) => filtro === 'todos' || p.status === filtro);
  const selecionaveis = visiveis.filter((p) => p.status === 'aguardando');
  const todosMarcados = selecionaveis.length > 0 && selecionaveis.every((p) => selecionados.has(p.id));

  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-2xl font-bold mb-6">Administração da rifa</h1>

          {!logado ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                carregar(senha);
              }}
              className="max-w-sm space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="senha">Senha da equipe</Label>
                <Input id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" required />
              </div>
              {erro && <p className="text-sm text-destructive" role="alert">{erro}</p>}
              <Button type="submit" disabled={ocupado}>{ocupado ? 'Entrando...' : 'Entrar'}</Button>
            </form>
          ) : (
            <div className="space-y-5">
              {resumo && (
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-md border p-3"><p className="text-2xl font-bold">{resumo.pagos}</p><p className="text-xs text-muted-foreground">bilhetes pagos</p></div>
                  <div className="rounded-md border p-3"><p className="text-2xl font-bold">{resumo.aguardando}</p><p className="text-xs text-muted-foreground">pendentes de confirmação</p></div>
                  <div className="rounded-md border p-3"><p className="text-2xl font-bold">{dinheiro(resumo.arrecadadoCentavos)}</p><p className="text-xs text-muted-foreground">arrecadado</p></div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                {FILTROS.map((f) => (
                  <Button key={f.valor} size="sm" variant={filtro === f.valor ? 'default' : 'outline'} onClick={() => setFiltro(f.valor)}>{f.rotulo}</Button>
                ))}
                <div className="ml-auto flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => carregar(senha)} disabled={ocupado}>Atualizar</Button>
                  <Button size="sm" variant="outline" onClick={exportar}>Exportar CSV</Button>
                </div>
              </div>

              {selecionaveis.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 rounded-md border bg-muted/40 p-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="todos"
                      checked={todosMarcados}
                      onCheckedChange={(v) => setSelecionados(v === true ? new Set(selecionaveis.map((p) => p.id)) : new Set())}
                    />
                    <Label htmlFor="todos" className="text-sm font-normal">Selecionar todos os pendentes da lista</Label>
                  </div>
                  <Button size="sm" className="ml-auto" disabled={selecionados.size === 0} onClick={confirmarSelecionados}>
                    Confirmar pagamento dos selecionados ({selecionados.size})
                  </Button>
                </div>
              )}

              {visiveis.length === 0 && <p className="text-sm text-muted-foreground">Nenhum pedido nesta lista.</p>}

              <ul className="space-y-3">
                {visiveis.map((p) => (
                  <li key={p.id} className="rounded-md border p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    {p.status === 'aguardando' && (
                      <Checkbox aria-label={`Selecionar pedido de ${p.nome}`} checked={selecionados.has(p.id)} onCheckedChange={(v) => alternar(p.id, v === true)} />
                    )}
                    <div className="flex-1 min-w-0 text-sm">
                      <p className="font-semibold">{p.nome} · números {faixa(p.de, p.ate)}</p>
                      <p className="text-muted-foreground">
                        {dinheiro(p.valorCentavos)} · {p.quantidade} {p.quantidade === 1 ? 'bilhete' : 'bilhetes'} · {rotuloStatus[p.status]}
                      </p>
                      <p className="text-muted-foreground">
                        <a className="text-primary underline" href={`https://wa.me/55${p.telefone}`} target="_blank" rel="noopener noreferrer">{formatarTelefone(p.telefone)}</a>
                        {p.email && ` · ${p.email}`} · {data(p.criadoEm)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {p.status !== 'pago' && p.status !== 'cancelado' && <Button size="sm" onClick={() => mudar(p, 'pago')}>Confirmar pagamento</Button>}
                      {p.status === 'pago' && <Button size="sm" variant="outline" onClick={() => mudar(p, 'aguardando')}>Desfazer</Button>}
                      {p.status !== 'cancelado' && <Button size="sm" variant="outline" onClick={() => mudar(p, 'cancelado')}>Invalidar</Button>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RifaAdmin;
