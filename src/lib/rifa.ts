import { WORKER_API } from '@/lib/api';

// Texto da rifa digital. Deixe em branco o que ainda não foi definido: a página esconde a linha.
export const RIFA_PREMIO =
  '2 sorteios, cada um com um combo família: 2 pizzas grandes + refrigerante. Quem morar fora de Uberlândia pode optar por receber R$ 200 em dinheiro.';
export const RIFA_DATA_SORTEIO = '26 de novembro de 2026';

export type StatusPedido = 'aguardando' | 'pago' | 'cancelado';

export type RifaInfo = { precoCentavos: number; primeiro: number; ultimo: number; restantes: number; maxPorPedido: number };

export type RifaPedido = {
  id: string;
  primeiroNome: string;
  de: number;
  ate: number;
  quantidade: number;
  valorCentavos: number;
  status: StatusPedido;
  criadoEm: string;
  pagoEm: string | null;
  pix?: string;
};

export const dinheiro = (centavos: number) => (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const faixa = (de: number, ate: number) => (de === ate ? `${de}` : `${de} a ${ate}`);

// Para a equipe: o bilhete já vale para o sorteio desde a reserva, mas o Pix ainda precisa ser conferido
export const rotuloStatus: Record<StatusPedido, string> = {
  aguardando: 'Pagamento pendente de confirmação',
  pago: 'Pagamento confirmado',
  cancelado: 'Invalidado',
};

export async function chamarRifa<T>(caminho: string, opcoes: { metodo?: 'GET' | 'POST'; corpo?: unknown; senha?: string } = {}): Promise<T> {
  const resposta = await fetch(`${WORKER_API}/rifa/${caminho}`, {
    method: opcoes.metodo ?? 'GET',
    headers: {
      ...(opcoes.corpo ? { 'Content-Type': 'application/json' } : {}),
      ...(opcoes.senha ? { Authorization: `Bearer ${opcoes.senha}` } : {}),
    },
    body: opcoes.corpo ? JSON.stringify(opcoes.corpo) : undefined,
  });
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(dados.erro ?? 'Não foi possível falar com o servidor. Tente de novo.');
  return dados as T;
}
