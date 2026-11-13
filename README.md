# purelife-web

Site institucional estático do Pure Life Ministries Brasil (Astro SSG + ilhas Preact + Tailwind v4), publicado no Cloudflare Pages.

[![CI](https://github.com/purelifeministriesbrasil/frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/purelifeministriesbrasil/frontend/actions/workflows/ci.yml)
[![CodeQL](https://github.com/purelifeministriesbrasil/frontend/actions/workflows/codeql.yml/badge.svg)](https://github.com/purelifeministriesbrasil/frontend/actions/workflows/codeql.yml)
[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-blue.svg)](LICENSE)

> Parte do ecossistema Pure Life Ministries Brasil: [backend](https://github.com/purelifeministriesbrasil/backend) · [frontend](https://github.com/purelifeministriesbrasil/frontend) · [documentação](https://purelifeministriesbrasil.github.io/documentation/)

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Início rápido](#2-início-rápido)
3. [Comandos](#3-comandos)
4. [Estrutura do repositório](#4-estrutura-do-repositório)
5. [Configuração](#5-configuração)
6. [Qualidade e CI](#6-qualidade-e-ci)
7. [Publicação e reversão](#7-publicação-e-reversão)
8. [Manutenção](#8-manutenção)
9. [Governança](#9-governança)

## 1. Visão geral

| Item | Valor |
|---|---|
| Pacote | `purelife-web` |
| Renderização | Astro `output: 'static'`; formulários como ilhas Preact (`preact/compat`) |
| Estilos | Tailwind CSS v4 (`@tailwindcss/vite`); folhas nunca inline (`inlineStylesheets: 'never'`) |
| Hospedagem | Cloudflare Pages, projeto `purelife-site` |
| Endereço provisório | https://purelife-site.pages.dev |
| Endereço oficial | https://purelifeministriesbrasil.org (após a troca de domínio) |
| API | Cloudflare Worker do repositório [backend](https://github.com/purelifeministriesbrasil/backend); o navegador nunca acessa o banco |
| Sitemap | `@astrojs/sitemap`, excluindo `/triagem`, `/doar/obrigado`, `/newsletter` e `/404` |

Rotas (`src/pages/`): `/`, `/sobre/`, `/programas/`, `/programas/residencial/`, `/curso/`, `/triagem/`, `/triagem/recebido/`, `/doar/`, `/doar/obrigado/`, `/editora/`, `/conferencia/`, `/viagem-eua/`, `/campus/`, `/perguntas-frequentes/`, `/contato/`, `/politica-de-privacidade/`, `/newsletter/confirmar/`, `/newsletter/cancelar/`, `/404`.

## 2. Início rápido

Pré-requisitos:

| Ferramenta | Versão |
|---|---|
| Node.js | 22 (`.nvmrc`; mesma versão do CI) |
| pnpm | 12.18.0 (campo `packageManager`; conferido por `pnpm verify:pnpm`) |

1. Instale as dependências.

```bash
pnpm install --frozen-lockfile
```

2. Rode o servidor local (http://localhost:4321).

```bash
pnpm dev
```

3. Gere o build com as quatro variáveis `PUBLIC_*` explícitas (mesmos valores do job `verify` do CI), para que um `.env` local antigo nunca entre no build.

```bash
PUBLIC_SITE_ORIGIN=https://purelifeministriesbrasil.org PUBLIC_API_URL=https://api.purelifeministriesbrasil.org PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA PUBLIC_ENABLE_PIX_GATEWAY=false pnpm ci:verify
```

`1x00000000000000000000AA` é a chave de teste oficial (pública) do Turnstile. Para desenvolvimento com `.env`, copie `.env.example` (só contém valores públicos).

## 3. Comandos

| Comando | O que faz |
|---|---|
| `pnpm dev` | `astro dev` |
| `pnpm build` | `astro build` + `scripts/generate-csp.mjs` (grava a CSP em `dist/_headers`) |
| `pnpm preview` | `astro preview` (não aplica `_headers`) |
| `pnpm astro` | CLI do Astro |
| `pnpm typecheck` | `astro check` + `tsc --noEmit` |
| `pnpm verify:topology` | `scripts/verify-topology.mjs`: páginas exigidas existem como HTML estático; CSP sem `'unsafe-inline'`/`'unsafe-eval'` |
| `pnpm verify:no-inline-style` | `scripts/verify-no-inline-style.mjs`: proíbe atributos `style=` no HTML gerado |
| `pnpm verify:dist-secrets` | `scripts/verify-dist-secrets.mjs`: falha se `dist/` contiver algo com cara de credencial |
| `pnpm ci:verify` | `typecheck` → `build` → `verify:topology` → `verify:no-inline-style` → `verify:dist-secrets` |
| `pnpm verify:pnpm` | `scripts/verify-package-manager.mjs`: confere a versão do pnpm |

`scripts/verify-schema-sync.mjs` não tem script no `package.json`; é chamado pelo workflow `schema-sync.yml`.

## 4. Estrutura do repositório

| Caminho | Conteúdo |
|---|---|
| `public/_headers` | Headers de segurança e cache; `__CSP__` é substituído no build |
| `public/_redirects` | Redirecionamentos 301 dos endereços antigos |
| `public/fonts/` | Fontes auto-hospedadas |
| `scripts/` | Geração da CSP e verificações do CI (ver `scripts/README.md`) |
| `src/assets/images/` | Imagens otimizadas pelo `astro:assets` (`books/`, `campus/`, logos, banners) |
| `src/components/` | Componentes por área (`home/`, `layout/`, `forms/`, `donations/`, `programs/`, `course/`, `about/`, `ui/`) |
| `src/data/` | Conteúdo em TypeScript: `programs.ts`, `testimonials.ts`, `campus-photos.ts`, `timeline.ts`, `usa-trip.ts` |
| `src/layouts/` | `BaseLayout.astro`, `ContentLayout.astro` |
| `src/lib/` | `site-config.ts`, `api.ts`, `seo.ts`, `reveal.ts` |
| `src/pages/` | Rotas (cada arquivo vira uma página) |
| `src/schemas/` | Contratos de validação, byte a byte idênticos ao backend |
| `src/styles/` | `global.css`, `tokens.css`, `fonts.css` |
| `.github/` | Workflows, `dependabot.yml`, `CODEOWNERS`, modelos de issue e PR |
| `.editorconfig`, `.nvmrc`, `.gitattributes` | Padrões de editor, versão do Node (22) e fim de linha |

## 5. Configuração

Todas as variáveis são públicas (vão para o HTML/JS). Nenhum segredo pertence a este repositório.

| Variável | Uso | CI (`verify`) | Produção (`deploy`) |
|---|---|---|---|
| `PUBLIC_SITE_ORIGIN` | Origem pública do site | `https://purelifeministriesbrasil.org` (env do workflow) | `https://purelifeministriesbrasil.org` (env do workflow) |
| `PUBLIC_API_URL` | Base da API; entra na CSP (`connect-src`, `form-action`) | `https://api.purelifeministriesbrasil.org` | `https://api.purelifeministriesbrasil.org` |
| `PUBLIC_TURNSTILE_SITE_KEY` | Site key do widget Turnstile | `1x00000000000000000000AA` (teste) | Variável do repositório `PUBLIC_TURNSTILE_SITE_KEY`; chaves de teste são recusadas |
| `PUBLIC_ENABLE_PIX_GATEWAY` | `true` liga o PIX dinâmico; `false` mostra a chave PIX institucional | `false` | `false` |

Os valores de CI e produção estão em `.github/workflows/ci.yml`. O secret `CLOUDFLARE_API_TOKEN` é usado só pelo passo de publicação.

## 6. Qualidade e CI

| Arquivo | Gatilho | Check | Garante |
|---|---|---|---|
| `ci.yml` | push e PR para `main` | `Typecheck, Static Build, CSP and Topology` | Versão do pnpm, `pnpm install --frozen-lockfile`, `pnpm ci:verify` |
| `ci.yml` | push para `main` (após `verify`) | `Deploy to Cloudflare Pages (production)` | Chave Turnstile presente e não de teste; `pnpm ci:verify` com valores de produção; publicação no `purelife-site` |
| `schema-sync.yml` | push e PR para `main`, segunda 12:00 UTC, manual | `src/schemas idêntico ao do backend` | `src/schemas/` igual ao `main` do backend (em PR apenas avisa) |
| `codeql.yml` | PR, push em `main` e semanal (segunda) | `Análise de segurança (CodeQL)` | Análise estática de segurança (`security-and-quality`) |

CSP: `scripts/generate-csp.mjs` calcula SHA-256 de cada `<script>` e de cada bloco `<style>` inline; `script-src` e `style-src` ficam sem `'unsafe-inline'`. Dependências são atualizadas pelo Dependabot (`.github/dependabot.yml`).

## 7. Publicação e reversão

| Etapa | Descrição |
|---|---|
| Publicar | Merge no `main` → job `verify` → job `deploy` (`wrangler pages deploy dist --project-name=purelife-site --branch=main`) |
| Pré-requisitos | Secret `CLOUDFLARE_API_TOKEN` e variável `PUBLIC_TURNSTILE_SITE_KEY` (Settings → Secrets and variables → Actions); ambiente `production` |
| Falha | Se `verify` ou as checagens do `deploy` falharem, nada é publicado |
| Reverter | Cloudflare → Workers & Pages → `purelife-site` → Deployments → no deploy anterior, "Rollback to this deployment" |

Runbook: [Implantação](https://purelifeministriesbrasil.github.io/documentation/operations/deployment/).

## 8. Manutenção

### Onde editar o conteúdo

| Quero mudar | Arquivo |
|---|---|
| Livros da Editora (catálogo) | `src/pages/editora.astro` |
| Capas dos livros | `src/assets/images/books/` (WebP, ~600 px de largura) |
| Prévia de livros na home | `src/components/home/BooksPreview.astro` |
| Conferência | `src/pages/conferencia.astro` e `src/components/home/ConferencePreview.astro` |
| Perguntas frequentes | `src/pages/perguntas-frequentes.astro` (prévia: `src/components/home/FAQPreview.astro`) |
| Programas | `src/data/programs.ts` |
| Fotos do campus | `src/data/campus-photos.ts` e `src/assets/images/campus/` |
| Depoimentos | `src/data/testimonials.ts` |
| Linha do tempo / Viagem EUA | `src/data/timeline.ts` / `src/data/usa-trip.ts` |
| E-mail, WhatsApps, endereço, redes, chave PIX | `src/lib/site-config.ts` |
| Endereços antigos → novos | `public/_redirects` |
| Schemas de validação | Não editar aqui: alterar no backend e copiar idêntico |

Guias: [Guia do Mantenedor](https://purelifeministriesbrasil.github.io/documentation/operations/maintainer-guide/) · [Gestão de Conteúdo do Site](https://purelifeministriesbrasil.github.io/documentation/operations/content-management/).

## 9. Governança

| Documento | Arquivo |
|---|---|
| Contribuição | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Segurança e LGPD | [SECURITY.md](SECURITY.md) |
| Código de Conduta | [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) |
| Responsáveis pelo código | [.github/CODEOWNERS](.github/CODEOWNERS) |
| Licença | [MIT](LICENSE) |
| Documentação técnica | https://purelifeministriesbrasil.github.io/documentation/ |
