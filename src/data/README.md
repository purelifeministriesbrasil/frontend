# `src/data/` — conteúdo editável

Dados do site em TypeScript tipado: o build falha se faltar um campo obrigatório, então um erro de digitação não
chega ao ar. Edite aqui, abra um pull request e confira a prévia antes do merge.

| Arquivo | Conteúdo | Aparece em |
|---|---|---|
| `programs.ts` | Programa Residencial e Online Vida Pura (texto, foto, link) | `/`, `/programas/` |
| `testimonials.ts` | Depoimentos | `/` |
| `campus-photos.ts` | Fotos do campus, com texto alternativo | `/`, `/campus/` |
| `timeline.ts` | História do ministério (1986–2023); marcos do Brasil com `brazil: true` | `/sobre/` |
| `usa-trip.ts` | Viagem EUA: datas, lotes, inclusos, programação, FAQ e link de pagamento da SEBI | `/`, `/viagem-eua/` |

Contatos, taxas, chave PIX e dados do curso ficam em [`../lib/site-config.ts`](../lib/site-config.ts).

## Regras

- O **site novo é a referência**: informação divergente em outros canais deve ser confirmada com a liderança
  antes de mudar aqui.
- Depoimentos só com autorização por escrito do autor.
- Toda foto precisa de `alt` descritivo; fotos com pessoas identificáveis exigem autorização de uso de imagem.
