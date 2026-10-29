# `src/` — código-fonte do site

| Pasta | Conteúdo | Regra |
|---|---|---|
| [`pages/`](pages) | Uma página por arquivo; o caminho do arquivo é a URL (`curso.astro` → `/curso/`) | Só composição: textos longos e dados ficam em `data/` ou `lib/site-config.ts` |
| [`layouts/`](layouts) | `BaseLayout` (head, SEO, cabeçalho, rodapé) e `ContentLayout` (páginas de texto) | Toda página usa um dos dois |
| [`components/`](components) | Componentes por área do site | Ver [`components/README.md`](components/README.md) |
| [`data/`](data) | Conteúdo estruturado (programas, depoimentos, fotos, linha do tempo, viagem) | Ver [`data/README.md`](data/README.md) |
| [`lib/`](lib) | Configuração do site e utilitários | Sem dependência de componentes |
| [`schemas/`](schemas) | Contratos de dados compartilhados com a API | **Não edite só aqui** — ver [`schemas/README.md`](schemas/README.md) |
| [`styles/`](styles) | `global.css` (Tailwind v4), `tokens.css` (cores e espaçamentos), `fonts.css` | Nada de `style="…"` nos componentes |
| [`assets/images/`](assets/images) | Fotos e logos; o build gera AVIF/WebP | Substitua mantendo o nome do arquivo |

## `lib/`

| Arquivo | Responsabilidade |
|---|---|
| `site-config.ts` | Contatos, redes, vídeos, curso, Programa Residencial, doação (PIX) e `whatsappUrl()` |
| `api.ts` | `postJson()` para a API, `Idempotency-Key` e tradução de erros de validação por campo |
| `seo.ts` | JSON-LD da organização |
| `reveal.ts` | Animação de entrada ao rolar (respeita `prefers-reduced-motion`) |
