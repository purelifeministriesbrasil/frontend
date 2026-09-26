# purelife-web — Frontend Oficial e Portal Institucional

[![Astro](https://img.shields.io/badge/Astro-5.4-BC52EE.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React%2019-Islands%20Only-61dafb.svg)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Client-Supabase%20JS-3ECF8E.svg)](https://supabase.com)
[![Vercel Edge](https://img.shields.io/badge/Deploy-Vercel%20Edge-000000.svg)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Security Policy](https://img.shields.io/badge/Security-Policy-red.svg)](./SECURITY.md)

Frontend estático de alta performance, máxima acessibilidade e segurança do ministério **Pure Life Ministries Brasil** (`purelifeministriesbrasil.org`). O projeto é desenvolvido em **Astro v5 (Static Site Generation - SSG)** com **Tailwind CSS v4** e **React 19 Islands** estritamente restritas, hospedado na **Vercel Edge** e conectado diretamente aos serviços de borda e autenticação/banco do **Supabase**.

---

## 1. Princípios Arquiteturais e Fronteiras

Em estrita observância à diretriz canônica do ecossistema:
> **"Front com Front, Back com Back e Docs com Docs."**

Conforme a **ADR-001** e a **ADR-003**:
1. **SSG Puro (`output: 'static'`)**: Todas as 16 páginas institucionais são pré-renderizadas estaticamente em tempo de compilação, garantindo tempo de resposta na borda (TTFB) inferior a 50ms e resiliência absoluta a picos de tráfego.
2. **Orçamento Rigoroso de JavaScript**: A maior parte da navegação consome zero JavaScript no cliente. Scripts Vanilla leves e autocontidos gerenciam microinterações acessíveis (menu mobile, accordions e carrosséis).
3. **Ilhas Interativas Isoladas (React 19)**: React é reservado exclusivamente a componentes que exigem controle de estado avançado e comunicação assíncrona:
   - `TriageForm.tsx`: Submissão de triagem confidencial com validação Zod client-side e proteção Turnstile.
   - `DonationForm.tsx`: Emissão de PIX Dinâmico com cópia de chave e renderização de QR Code.
   - `ContactForm.tsx`: Formulário de contato institucional e suporte.
4. **Camada de Contratos e Tipos Local**: Esquemas Zod locais e tipagens TypeScript desacopladas garantem integridade total de dados na entrada.
5. **Zero Estilos Inline & CSP Estrita**: Em conformidade com a política Content Security Policy (`style-src 'self'`), a base proíbe qualquer atributo `style="..."` inline, auditado a cada compilação pelo pipeline.

---

## 2. Estrutura de Diretórios

```
frontend/
├── public/                     # Favicons, manifest, imagens estáticas institucionais
├── scripts/
│   ├── verify-no-inline-style.mjs # Verificação estrita de ausência de style inline
│   └── verify-topology.mjs        # Auditoria automatizada de topologia de páginas geradas
├── src/
│   ├── components/
│   │   ├── islands/            # Ilhas interativas React 19 (TriageForm, DonationForm, ContactForm)
│   │   ├── sections/           # Seções Astro estáticas (Hero, Programs, About, FAQ, etc.)
│   │   └── ui/                 # Componentes UI de apresentação pura
│   ├── layouts/
│   │   └── BaseLayout.astro    # Layout base com meta tags OpenGraph, schema.org e cabeçalho
│   ├── lib/
│   │   └── supabase.ts         # Cliente nativo Supabase configurado via variáveis de ambiente
│   ├── pages/                  # 16 rotas canônicas pré-renderizadas
│   │   ├── index.astro         # Página inicial
│   │   ├── sobre.astro         # História e declaração de fé
│   │   ├── programas/          # Visão geral dos programas e internato
│   │   ├── triagem/            # Triagem pastoral confidencial
│   │   ├── doar/               # Apoio financeiro e PIX dinâmico
│   │   ├── contato.astro       # Canal institucional
│   │   └── ...                 # Demais rotas institucionais
│   ├── schemas/                # Validações Zod (triage, donation, contact, newsletter)
│   └── styles/
│       └── global.css          # Tailwind CSS v4 e tokens de design canônicos
├── astro.config.mjs            # Configuração do Astro com adaptador Vercel Static
└── package.json
```

---

## 3. Instalação e Desenvolvimento Local

### Pré-requisitos
- Node.js 22 LTS
- pnpm 10+

### Comandos Disponíveis

```bash
# Instalar dependências
pnpm install

# Iniciar ambiente de desenvolvimento local (http://localhost:4321)
pnpm run dev

# Compilar aplicação para produção
pnpm run build

# Executar suíte completa de verificação de CI (Build + Topologia + CSP)
pnpm run ci:verify

# Pré-visualizar a compilação de produção
pnpm run preview
```

---

## 4. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do repositório baseado nas variáveis necessárias:

```ini
PUBLIC_SITE_ORIGIN=https://purelifeministriesbrasil.org
PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<sua-anon-key>
PUBLIC_TURNSTILE_SITE_KEY=<sua-turnstile-site-key>
```

---

## 5. Governança e Contribuição

- [Código de Conduta](CODE_OF_CONDUCT.md)
- [Guia de Contribuição](CONTRIBUTING.md)
- [Política de Segurança e LGPD](SECURITY.md)
- [Licença MIT](LICENSE)