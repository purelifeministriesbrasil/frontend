# Guia de Contribuição — purelife-web

Este repositório cuida da experiência visual, da acessibilidade e do desempenho do site público do
**Pure Life Ministries Brasil**.

---

## 1. Regras de arquitetura

1. **Astro estático por padrão**
   - Conteúdo institucional é página ou componente `.astro`, renderizado no build.
   - Comportamentos simples usam `<script>` do Astro (TypeScript, sem bibliotecas pesadas).
2. **Ilhas Preact só quando necessário**
   - Use `.tsx` apenas quando houver estado no navegador (formulários). Os ícones vêm de `lucide-preact`.
   - Hidrate com `client:load` (conteúdo principal) ou `client:visible` (abaixo da dobra).
3. **Sem estilos inline e CSP estrita**
   - `style="…"` e handlers inline (`onclick=`) são proibidos e quebram o build.
   - Use as classes do Tailwind v4 e os tokens de `src/styles/tokens.css`.
4. **Fronteira com a API**
   - Nunca importe código de banco (`drizzle-orm`, drivers Postgres) nem coloque segredos no frontend.
   - Os contratos ficam em `src/schemas/`, **idênticos** aos do `backend` (ver
     [`src/schemas/README.md`](src/schemas/README.md)).
5. **Conteúdo**
   - Textos, preços e contatos ficam em `src/lib/site-config.ts` e `src/data/`; o site novo é a referência.

---

## 2. Validação local

```bash
pnpm ci:verify   # typecheck + build + topologia + ausência de estilos inline
```

O CI executa o mesmo comando em todo pull request.

---

## 3. Fluxo de trabalho Git

- Crie a branch a partir do `main` com prefixo claro: `feat/…`, `fix/…`, `docs/…`, `ci/…`.
- Mensagens no padrão *Conventional Commits*:
  - `feat(curso): adiciona a seção de corpo docente`
  - `fix(styles): remove estilo inline do card de depoimento`
- Abra o pull request preenchendo o modelo; após o merge no `main`, o site é publicado automaticamente.
