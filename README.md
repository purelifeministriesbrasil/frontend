<p align="center">
  <img src="public/favicon.svg" alt="Pure Life Ministries Brasil" width="72" />
</p>

<h1 align="center">purelife-web</h1>

<p align="center">
  Site institucional do <strong>Pure Life Ministries Brasil</strong> — <code>purelifeministriesbrasil.org</code>
</p>

<p align="center">
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Astro-5%20SSG-BC52EE.svg" alt="Astro 5" /></a>
  <a href="https://preactjs.com"><img src="https://img.shields.io/badge/Preact-ilhas-673AB8.svg" alt="Preact" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind-v4-38bdf8.svg" alt="Tailwind CSS v4" /></a>
  <a href="https://pages.cloudflare.com"><img src="https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020.svg" alt="Cloudflare Pages" /></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Seguran%C3%A7a-pol%C3%ADtica-red.svg" alt="Política de segurança" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/Licen%C3%A7a-MIT-blue.svg" alt="Licença MIT" /></a>
</p>

---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Início rápido](#2-início-rápido)
3. [Estrutura do repositório](#3-estrutura-do-repositório)
4. [Onde editar o conteúdo](#4-onde-editar-o-conteúdo)
5. [Variáveis de ambiente](#5-variáveis-de-ambiente)
6. [Qualidade e segurança](#6-qualidade-e-segurança)
7. [Publicação](#7-publicação)
8. [Governança](#8-governança)

---

## 1. Visão geral

Site **100% estático** (Astro, `output: 'static'`) com **18 páginas**. Só os formulários são interativos, como
ilhas **Preact** (API do React via `preact/compat`). Toda gravação de dados passa pela API
(`api.purelifeministriesbrasil.org`, repositório [`backend`](https://github.com/purelifeministriesbrasil/backend)):
o navegador nunca acessa o banco e não recebe nenhuma credencial.

| Página | Caminho | Página | Caminho |
|---|---|---|---|
| Início | `/` | Editora | `/editora/` |
| Sobre (com linha do tempo) | `/sobre/` | Conferência | `/conferencia/` |
| Programas | `/programas/` | Viagem EUA | `/viagem-eua/` |
| Programa Residencial | `/programas/residencial/` | Campus | `/campus/` |
| Curso (Formação Superior) | `/curso/` | Perguntas frequentes | `/perguntas-frequentes/` |
| Triagem | `/triagem/` → `/triagem/recebido/` | Contato | `/contato/` |
| Doar | `/doar/` → `/doar/obrigado/` | Confirmação da newsletter | `/newsletter/confirmar/` |
| Política de privacidade | `/politica-de-privacidade/` | Página não encontrada | `/404` |

---

## 2. Início rápido

Pré-requisitos: **Node 22** e **pnpm**.

```bash
pnpm install
cp .env.example .env     # ajuste os valores (veja a seção 5)
pnpm dev                 # http://localhost:4321
```

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor local com recarga automática |
| `pnpm typecheck` | `astro check` + `tsc` |
| `pnpm build` | Gera `dist/` e grava a CSP com os *hashes* dos scripts em `dist/_headers` |
| `pnpm preview` | Serve `dist/` (sem aplicar `_headers`) |
| `pnpm ci:verify` | Validação completa: typecheck, build, topologia e ausência de estilos inline |

Para testar com os headers reais do Cloudflare Pages (CSP incluída):

```bash
pnpm --dir ../backend exec wrangler pages dev ../frontend/dist
```

---

## 3. Estrutura do repositório

```
frontend/
├── public/                 # Copiado sem processamento para dist/
│   ├── _headers            # Modelo dos headers de segurança (a CSP final é gerada no build)
│   ├── _redirects          # 301 dos endereços do site antigo (WordPress)
│   ├── fonts/              # Montserrat e Ruda (woff2, auto-hospedadas)
│   └── og-image.jpg        # Imagem de compartilhamento (1200×630)
├── scripts/                # Etapas de build e verificações do CI       → scripts/README.md
├── src/                                                                 → src/README.md
│   ├── assets/images/      # Fotos e logos otimizados pelo astro:assets
│   ├── components/         # Componentes por área do site                → src/components/README.md
│   ├── data/               # Conteúdo editável em TypeScript             → src/data/README.md
│   ├── layouts/            # BaseLayout (SEO, cabeçalho, rodapé) e ContentLayout
│   ├── lib/                # site-config, cliente da API, SEO e animações
│   ├── pages/              # Rotas: cada arquivo vira uma página
│   ├── schemas/            # Contratos zod/mini — idênticos ao backend   → src/schemas/README.md
│   └── styles/             # Tailwind v4, tokens de design e fontes
├── astro.config.mjs
└── .github/                # CI, modelos de issue e de pull request
```

---

## 4. Onde editar o conteúdo

O site novo é a **referência** de conteúdo. Não há painel administrativo: textos, preços e contatos ficam em
poucos arquivos, separados do layout.

| O que | Onde |
|---|---|
| E-mail, WhatsApps, endereço, redes sociais, vídeos | `src/lib/site-config.ts` |
| Curso, Programa Residencial (taxas), chave PIX | `src/lib/site-config.ts` |
| Programas, depoimentos, fotos do campus, linha do tempo, Viagem EUA | `src/data/*.ts` |
| Livros da Editora | `src/pages/editora.astro` |
| Endereços antigos → novos | `public/_redirects` |

Guia completo: [Gestão de Conteúdo do Site](https://purelifeministriesbrasil.github.io/documentation/operations/content-management/).

---

## 5. Variáveis de ambiente

Todas são **públicas** (acabam no HTML ou no JavaScript); nenhum segredo pertence a este repositório.

| Variável | Produção | Uso |
|---|---|---|
| `PUBLIC_SITE_ORIGIN` | `https://purelifeministriesbrasil.org` | URLs canônicas, sitemap e Open Graph |
| `PUBLIC_API_URL` | `https://api.purelifeministriesbrasil.org` | Base da API; entra na CSP (`connect-src`, `form-action`) |
| `PUBLIC_TURNSTILE_SITE_KEY` | chave pública do widget | Turnstile (em desenvolvimento: `1x00000000000000000000AA`) |
| `PUBLIC_ENABLE_PIX_GATEWAY` | `false` | `true` liga o PIX dinâmico; `false` mostra a chave PIX do CNPJ |

---

## 6. Qualidade e segurança

- **Estático garantido**: `scripts/verify-topology.mjs` falha se alguma das 18 páginas não for HTML estático.
- **CSP sem `'unsafe-inline'` em scripts**: `scripts/generate-csp.mjs` calcula o SHA-256 de cada script inline.
  Handlers inline (`onclick=`) e atributos `style=` quebram o build.
- **Formulários**: Cloudflare Turnstile, `Idempotency-Key` por tentativa (duplo clique não duplica envio) e
  validação idêntica à da API (`src/schemas/`).
- **Desempenho**: imagens AVIF/WebP responsivas, fontes auto-hospedadas e *prefetch* ao passar o mouse.
- **Acessibilidade**: link “pular para o conteúdo”, foco visível, rótulos em todos os campos e textos
  alternativos em todas as fotos.

---

## 7. Publicação

O projeto do Cloudflare Pages publica o `main` automaticamente:

| Configuração | Valor |
|---|---|
| Framework preset | Astro |
| Build command | `pnpm ci:verify` |
| Output directory | `dist` |
| Variáveis | as da seção 5, mais `NODE_VERSION=22` |

Cada pull request ganha uma prévia com endereço próprio. Para voltar a uma versão anterior:
*Workers & Pages → projeto → Deployments → Rollback*. Runbook completo:
[Implantação](https://purelifeministriesbrasil.github.io/documentation/operations/deployment/).

---

## 8. Governança

[Contribuição](CONTRIBUTING.md) · [Segurança e LGPD](SECURITY.md) · [Código de Conduta](CODE_OF_CONDUCT.md) ·
[Licença MIT](LICENSE) · [Documentação técnica](https://purelifeministriesbrasil.github.io/documentation/)
