# `scripts/` — build e verificações

Scripts Node sem dependências externas, executados pelos comandos do `package.json`.

| Script | Comando | O que faz | Falha quando |
|---|---|---|---|
| `generate-csp.mjs` | `pnpm build` (após o `astro build`) | Lê `public/_headers`, calcula o SHA-256 de cada script inline do HTML gerado e grava a CSP final em `dist/_headers`, incluindo `PUBLIC_API_URL` e o Turnstile | `PUBLIC_API_URL` ausente ou inválida |
| `verify-topology.mjs` | `pnpm verify:topology` | Confere que as 18 páginas esperadas existem em `dist/` como HTML estático | Página faltando ou renderizada no servidor |
| `verify-no-inline-style.mjs` | `pnpm verify:no-inline-style` | Procura `style="…"`, `@import` externo e fontes de sistema indevidas no HTML | Qualquer ocorrência |

Os três rodam juntos em `pnpm ci:verify`, no CI e no build do Cloudflare Pages.

Ao criar uma página nova, acrescente-a à lista de `verify-topology.mjs`.
