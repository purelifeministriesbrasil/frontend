# `scripts/` — build e verificações

Scripts Node sem dependências externas, executados pelos comandos do `package.json`.

| Script | Comando | O que faz | Falha quando |
|---|---|---|---|
| `generate-csp.mjs` | `pnpm build` (após o `astro build`) | Lê `public/_headers`, calcula o SHA-256 de cada script inline do HTML gerado e grava a CSP final em `dist/_headers`, incluindo a origem de `PUBLIC_API_URL` e o Turnstile. Lê `PUBLIC_API_URL` do ambiente e, se ausente, do `.env` local (o log informa a origem); vazia = mesma origem | `PUBLIC_API_URL` inválida ou handler inline (`on*=`) |
| `verify-topology.mjs` | `pnpm verify:topology` | Confere que as 19 páginas esperadas existem em `dist/` como HTML estático | Página faltando ou renderizada no servidor |
| `verify-no-inline-style.mjs` | `pnpm verify:no-inline-style` | Procura `style="…"`, `@import` externo e fontes de sistema indevidas no HTML | Qualquer ocorrência |
| `verify-dist-secrets.mjs` | `pnpm verify:dist-secrets` | Procura padrões de credenciais de servidor e nomes de variáveis exclusivas do servidor em `dist/` (o valor encontrado nunca é impresso) | Qualquer ocorrência |

Os quatro rodam juntos em `pnpm ci:verify`, no CI e no build do Cloudflare Pages. Para builds locais, defina as quatro variáveis
`PUBLIC_*` explicitamente (valores de teste do job `verify` em `.github/workflows/ci.yml`) para não herdar o `.env` de produção.

Ao criar uma página nova, acrescente-a à lista de `verify-topology.mjs`.
