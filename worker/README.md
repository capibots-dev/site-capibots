# Worker dos cadernos técnicos

Libera o download dos PDFs depois de um cadastro (nome, e-mail, equipe). Os PDFs ficam num bucket
privado do Cloudflare R2; o site nunca os contém. Cada link de download vale 10 minutos e funciona uma vez.

## Publicar (uma vez)

Pré-requisito: conta gratuita na Cloudflare. Rode dentro de `worker/`:

```bash
npx wrangler login
npx wrangler r2 bucket create capibots-cadernos
npx wrangler kv namespace create CADASTROS      # copie o id mostrado para wrangler.toml
npx wrangler deploy                              # mostra o endereço https://capibots-cadernos.<sub>.workers.dev
```

Depois:

1. Suba as versões resumidas (nomes exatos, ver `CADERNOS` em `src/index.js`). Os cadernos oficiais entregues ao torneio não ficam no bucket:

   ```bash
   npx wrangler r2 object put capibots-cadernos/merito-cientifico-resumido.pdf --file <arquivo>.pdf --remote
   npx wrangler r2 object put capibots-cadernos/organizacao-e-metodo-resumido.pdf --file <arquivo>.pdf --remote
   npx wrangler r2 object put capibots-cadernos/tecnologia-engenharia-resumido.pdf --file <arquivo>.pdf --remote
   ```

2. Coloque o endereço do Worker em `src/pages/CadernosTecnicos.tsx` (constante `API`) ou na variável
   `VITE_CADERNOS_API` do build, e publique o site.

## Ver quem se cadastrou

```bash
npx wrangler kv key list --binding CADASTROS --remote --prefix contato:
npx wrangler kv key get --binding CADASTROS --remote "contato:fulano@exemplo.com"
```

## Beta-testers do Capi-Aprende

A rota `POST /beta-capi-aprende` guarda as inscrições no mesmo KV, com a chave `beta:<email>` (nome, e-mail, perfil, cidade, data e `status`, que começa em `pendente`). Inscrever o mesmo e-mail de novo só atualiza os dados. Depois de alterar o Worker, rode `npx wrangler deploy`.

```bash
npx wrangler kv key list --binding CADASTROS --remote --prefix beta:
npx wrangler kv key get --binding CADASTROS --remote "beta:fulano@exemplo.com"
# marcar que o login já foi enviado (reescreva o JSON inteiro, mudando só o status)
npx wrangler kv key put --binding CADASTROS --remote "beta:fulano@exemplo.com" '{"nome":"...","email":"fulano@exemplo.com","perfil":"professor","cidade":"...","criadoEm":"...","status":"login enviado"}'
```

Para remover alguém (pedido de exclusão dos dados): `npx wrangler kv key delete --binding CADASTROS --remote "beta:fulano@exemplo.com"`.

## Rifa digital

Vende bilhetes a partir do número 501 (depois dos canhotos físicos), em `/rifa` no site. A pessoa escolhe a quantidade, informa nome e telefone, e recebe os números já reservados e um Pix copia e cola com o valor certo. O pagamento é confirmado à mão pela equipe em `/rifa/admin`. O código está em `src/rifa.js` e os dados ficam num banco D1.

Configurar (uma vez), dentro de `worker/`:

```bash
npx wrangler d1 create capibots-rifa                                  # cole o database_id em wrangler.toml
npx wrangler d1 execute capibots-rifa --remote --file schema.sql
npx wrangler secret put RIFA_ADMIN_TOKEN                              # a senha da página /rifa/admin
```

Em `wrangler.toml`, preencha `PIX_CHAVE` (a chave Pix que recebe), confira `PIX_NOME`/`PIX_CIDADE` e ajuste `RIFA_PRECO_CENTAVOS`, `RIFA_PRIMEIRO` e `RIFA_ULTIMO` (faixa de números à venda). Depois `npx wrangler deploy`. O prêmio e a data do sorteio aparecem na página se forem preenchidos em `src/lib/rifa.ts`.

Como funciona:

- Cada pedido ocupa uma faixa contínua (ex.: 501 a 505). O contador avança de forma atômica, então dois pedidos nunca recebem o mesmo número.
- Os números não expiram. Se alguém desistir, cancele o pedido em `/rifa/admin`; os números cancelados ficam de fora do sorteio e não são reaproveitados.
- O Pix é estático: o banco não avisa o site. Para conferir, compare nome e valor no extrato com a lista de "Aguardando".
- O comprador acompanha o bilhete por um endereço com código aleatório (`/rifa/pedido/<id>`); ele só vê o primeiro nome, nunca telefone ou e-mail.
- Dados de contato: ver `/rifa/admin` (botão "Exportar CSV") ou `npx wrangler d1 execute capibots-rifa --remote --command "SELECT * FROM rifa_pedidos"`. Para apagar os dados de alguém: `DELETE FROM rifa_pedidos WHERE id = '...'`.

## Cuidados

- Os PDFs nunca entram no Git nem em `public/`. Só vão para o R2 pelo comando acima.
- Para trocar um caderno, rode o `r2 object put` de novo com o mesmo nome.
- Para tirar o acesso do ar, apague os objetos do bucket ou rode `npx wrangler delete`.
