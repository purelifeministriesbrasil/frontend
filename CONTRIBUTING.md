# Guia de Contribuição — purelife-web

O repositório `purelife-web` é responsável pela experiência visual, acessibilidade e performance do portal público do **Pure Life Ministries Brasil**.

---

## Diretrizes e Checklist

Regras de Arquitetura e Frontend

1. **Astro SSG por Padrão**:
   - Todo novo conteúdo institucional deve ser criado como página ou componente Astro estático (`.astro`).
   - Evite bibliotecas externas pesadas para manipulação visual; priorize Vanilla JS moderno em tags `<script>` com escopo isolado.

2. **React 19 Islands Restritas**:
   - Componentes React só são aceitos quando houver necessidade imperativa de formulários interativos, integração de áudio contínuo ou modais dinâmicos.
   - Utilize a diretiva `client:idle` ou `client:load` conscientemente para manter o JS bundle mínimo.

3. **Zero Inline Styles e Conformidade CSP**:
   - O uso de `style="..."` é proibido.
   - Utilize as classes utilitárias do **Tailwind CSS v4** declaradas em `src/styles/global.css`.

4. **Verificação de Topologia e Isolamento**:
   - Nunca importe código de banco de dados (`drizzle-orm`, Neon, etc.) no frontend.
   - Contratos de dados devem ser consumidos unicamente através do pacote `purelife-contracts`.

---

## Validação Local

Validação Local Obrigatória

Antes de enviar qualquer Pull Request:
```bash
# Executa compilação estática + verificação de topologia + verificação de estilos inline
pnpm run ci:verify
```

---

## Fluxo de Trabalho Git

Fluxo de Branches e Commits

- Crie uma branch com prefixo claro: `feat/nova-secao-podcast` ou `fix/modal-doacao-pix`.
- Adote o padrão Conventional Commits:
  - `feat(ui): add accessible audio player island`
  - `fix(styles): eliminate inline style from testimonial card`
