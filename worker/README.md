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

## Cuidados

- Os PDFs de `trabalhos/` nunca entram no Git nem em `public/`. Só vão para o R2 pelo comando acima.
- Para trocar um caderno, rode o `r2 object put` de novo com o mesmo nome.
- Para tirar o acesso do ar, apague os objetos do bucket ou rode `npx wrangler delete`.
