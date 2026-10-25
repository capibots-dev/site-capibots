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

1. Suba os PDFs disponíveis (nomes exatos, ver `CADERNOS` em `src/index.js`; o de Tecnologia e Engenharia só entra quando for liberado):

   ```bash
   npx wrangler r2 object put capibots-cadernos/merito-cientifico.pdf --file ../trabalhos/<arquivo>.pdf --remote
   npx wrangler r2 object put capibots-cadernos/organizacao-e-metodo.pdf --file ../trabalhos/<arquivo>.pdf --remote
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

## Cuidados

- Os PDFs de `trabalhos/` nunca entram no Git nem em `public/`. Só vão para o R2 pelo comando acima.
- Para trocar um caderno, rode o `r2 object put` de novo com o mesmo nome.
- Para tirar o acesso do ar, apague os objetos do bucket ou rode `npx wrangler delete`.
