## Descrição

<!-- O que muda no site e por quê. Inclua capturas de tela para mudanças visuais. -->

## Referências

- Issue: #

## Checklist

- [ ] `pnpm ci:verify` passou localmente.
- [ ] Nenhum `style="…"` ou handler inline (`onclick=`) foi introduzido.
- [ ] Textos, preços e contatos seguem o site novo (`src/lib/site-config.ts` e `src/data/`).
- [ ] Imagens novas têm texto alternativo (`alt`) descritivo.
- [ ] Nenhum segredo foi adicionado (variáveis `PUBLIC_*` são públicas).
- [ ] Ilha Preact nova (se houver) usa a diretiva de hidratação adequada (`client:load` ou `client:visible`).
- [ ] Se `src/schemas/` mudou, a mesma mudança foi feita no `backend`.
