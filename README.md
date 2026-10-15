# purelife-web — Frontend Oficial e Portal Institucional

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React%2019-Islands%20Only-61dafb.svg)](https://react.dev)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020.svg)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Security Policy](https://img.shields.io/badge/Security-Policy-red.svg)](./SECURITY.md)

Site estático do **Pure Life Ministries Brasil** (`purelifeministriesbrasil.org`): **Astro 5 (SSG)**, **Tailwind CSS v4** e
**ilhas React 19**, hospedado no **Cloudflare Pages**. Toda escrita de dados passa pela API do Worker
(`api.purelifeministriesbrasil.org`); o frontend **não** fala com o Supabase e não carrega nenhuma chave de banco.

---

## 1. Princípios

1. **SSG puro (`output: 'static'`)**: 17 páginas pré-renderizadas; `verify-topology` garante que nenhuma virou SSR.
2. **Ilhas React mínimas**: `TriageForm`, `ContactForm` e `DonationForm`. A newsletter é Astro + script
   progressivo (funciona sem JavaScript via POST nativo para a API).
3. **Contratos compartilhados**: `src/schemas/` é cópia **byte a byte** de `backend/src/schemas/`, com a mesma
   versão exata do Zod (4.6.7) nos dois repositórios.
4. **Turnstile e idempotência**: cada formulário renderiza o widget Cloudflare Turnstile (render explícito, token
   renovado após cada resposta) e envia `Idempotency-Key` (UUID v4) estável por tentativa — duplo clique ou falha
   de rede não duplicam triagem, contato ou cobrança PIX.
5. **CSP estrita sem `'unsafe-inline'` em scripts**: `scripts/generate-csp.mjs` roda após o build, calcula o
   SHA-256 de cada script inline do Astro e grava o CSP em `dist/_headers` (inclui `PUBLIC_API_URL` em
   `connect-src`/`form-action` e o Turnstile em `script-src`/`frame-src`). Handlers inline quebram o build.
6. **Zero estilos inline**: auditado por `verify-no-inline-style`.

---

## 2. Comandos

```bash
pnpm install
pnpm dev          # http://localhost:4321 (configure .env a partir de .env.example)
pnpm typecheck    # astro check + tsc
pnpm build        # astro build + geração do CSP em dist/_headers
pnpm ci:verify    # typecheck + build + topologia + inline-style (validação completa)
pnpm preview      # pré-visualização (não aplica _headers)
```

Para testar com os headers reais do Cloudflare Pages (CSP incluso), use o Wrangler do repositório `backend`:

```bash
pnpm --dir ../backend exec wrangler pages dev ../frontend/dist
```

---

## 3. Variáveis de ambiente (todas públicas)

| Variável | Exemplo | Uso |
|---|---|---|
| `PUBLIC_SITE_ORIGIN` | `https://purelifeministriesbrasil.org` | Origem canônica |
| `PUBLIC_API_URL` | `https://api.purelifeministriesbrasil.org` | Base da API e CSP |
| `PUBLIC_TURNSTILE_SITE_KEY` | `0x4AAAA...` | Widget Turnstile (teste: `1x00000000000000000000AA`) |
| `PUBLIC_ENABLE_PIX_GATEWAY` | `false` | `true` liga o PIX dinâmico pela API; `false` mostra a chave PIX CNPJ |

Veja `.env.example`. No Cloudflare Pages, configure-as em **Settings → Variables and Secrets** (build).

---

## 4. Deploy (Cloudflare Pages)

- Framework preset: **Astro** · Build command: `pnpm build` · Output: `dist` · Node 22.
- `public/_headers` é o template; o arquivo efetivo é gerado em `dist/_headers` a cada build.
- Runbook completo: [documentação → Operações → Deploy](https://purelifeministriesbrasil.github.io/documentation/operations/deployment/).

---

## 5. Governança

- [Código de Conduta](CODE_OF_CONDUCT.md) · [Contribuição](CONTRIBUTING.md) · [Segurança e LGPD](SECURITY.md) · [Licença MIT](LICENSE)
