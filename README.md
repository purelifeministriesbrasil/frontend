# purelife-web — Frontend Oficial e Portal Institucional

[![Astro](https://img.shields.io/badge/Astro-5.4-BC52EE.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React%2019-Islands%20Only-61dafb.svg)](https://react.dev)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020.svg)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Security Policy](https://img.shields.io/badge/Security-Policy-red.svg)](./SECURITY.md)

Frontend estático de alta performance e acessibilidade do ministério **Pure Life Ministries Brasil** (`purelifebrasil.org`), implementado em **Astro v5 (SSG)** com **Tailwind CSS v4** e **React 19 Islands** pontuais, em estrita conformidade com a Especificação Técnica v5.0 (`arquitetura-purelife-v5.md`).

---

## 🏛️ Arquitetura e Decisões Fundamentais

Conforme a **ADR-001**, o frontend rejeita o modelo de Single Page Application (SPA) para páginas institucionais:
1. **SSG Puro (`prerender = true`)**: As 16 seções da Home e todas as páginas institucionais são pré-renderizadas estaticamente em tempo de compilação.
2. **Orçamento Rigoroso de JavaScript**: A Home carrega apenas **~1.02 kB gzip** de JavaScript nativo Vanilla para microinterações (menu mobile, carrossel de depoimentos, accordions de FAQ).
3. **React 19 Islands Isoladas**: React 19 é restrito exclusivamente a ilhas interativas dinâmicas que necessitam de gerenciamento de estado complexo:
   - `DonationModal.tsx` (geração de QR Code Pix e cópia de chave)
   - `ContactForm.tsx` (validação e submissão de contato)
   - `AudioPlayer.tsx` (reprodução de podcasts/áudios)
4. **Zero Estilos Inline**: A esteira de verificação proíbe qualquer atributo `style="..."` em conformidade com a política CSP rígida (`style-src 'self'`).

---

## 📁 Estrutura de Diretórios

```
frontend/
├── public/                  # Favicons, manifest, imagens estáticas
├── scripts/
│   ├── verify-no-inline-style.mjs # Verificação de conformidade CSP
│   └── verify-topology.mjs        # Auditoria de limites de pacotes
├── src/
│   ├── components/
│   │   ├── islands/         # Ilhas interativas React 19 (DonationModal, etc.)
│   │   ├── sections/        # Seções Astro estáticas (Hero, About, etc.)
│   │   └── ui/              # Componentes UI reutilizáveis (Button, Card, etc.)
│   ├── layouts/
│   │   └── BaseLayout.astro # Layout base com meta tags e tokens
│   ├── pages/               # Rotas estáticas (index, sobre, contato, etc.)
│   └── styles/
│       └── global.css       # Tailwind CSS v4 e diretivas de design
└── astro.config.mjs         # Configuração do adaptador Cloudflare
```

---

## 🚀 Instalação e Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento local
pnpm run dev

# Compilar para produção (Cloudflare Pages)
pnpm run build

# Executar suíte completa de verificação (Build + Topologia + CSP)
pnpm run ci:verify
```

---

## 🛡️ Governança e Contribuição

- [Código de Conduta](CODE_OF_CONDUCT.md)
- [Guia de Contribuição](CONTRIBUTING.md)
- [Política de Segurança](SECURITY.md)
- [Licença MIT](LICENSE)