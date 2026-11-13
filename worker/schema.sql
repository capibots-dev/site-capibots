-- Banco da rifa digital. Aplicar uma vez: npx wrangler d1 execute capibots-rifa --remote --file schema.sql

CREATE TABLE IF NOT EXISTS rifa_contador (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  proximo INTEGER NOT NULL
);

-- Cada pedido ocupa uma faixa contínua de números: inicio .. inicio + quantidade - 1
CREATE TABLE IF NOT EXISTS rifa_pedidos (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  whatsapp INTEGER NOT NULL DEFAULT 1,
  email TEXT,
  inicio INTEGER NOT NULL,
  quantidade INTEGER NOT NULL,
  valor_centavos INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'aguardando',
  criado_em TEXT NOT NULL,
  pago_em TEXT
);
