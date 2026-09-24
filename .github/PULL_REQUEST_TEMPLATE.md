## Descrição da Alteração

Descrição da Alteração

Descreva sucintamente as alterações visuais, funcionais ou estruturais realizadas no frontend.

## Relações e Referências

Relação com Issues
- Issue: #

## Diretrizes e Checklist

Checklist de Qualidade, Performance e AppSec
- [ ] `pnpm run ci:verify` executou com sucesso (build SSG + verificação de topologia + verificação de estilos inline).
- [ ] Zero inline styles (`style="..."`) introduzidos.
- [ ] O componente segue o design system do Tailwind CSS v4.
- [ ] Nenhuma chave de API ou segredo foi exposto em variáveis de ambiente públicas ou código fonte.
- [ ] Caso uma nova Island React 19 tenha sido criada, a diretiva de hidratação adequada (`client:load` ou `client:idle`) foi utilizada.
