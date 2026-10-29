# `src/components/`

Componentes agrupados pela área do site em que aparecem. Arquivos `.astro` são renderizados no build (zero
JavaScript); arquivos `.tsx` são **ilhas Preact**, hidratadas só onde a página pede.

| Pasta | Componentes | Usado em |
|---|---|---|
| `layout/` | `Header`, `Navigation`, `Footer`, `mobile-nav.ts` (menu do celular) | Todas as páginas, via `BaseLayout` |
| `home/` | Uma seção por arquivo: `Hero`, `ImmediateHelp`, `MissionPillars`, `AboutPreview`, `ProgramsSection`, `CampusPreview`, `TestimonialsPreview`, `MediaPreview`, `ConferencePreview`, `UsaTripPreview`, `BooksPreview`, `DonationPreview`, `FAQPreview`, `NewsletterSection` | `/` |
| `about/` | `HistoryTimeline` (linha do tempo navegável por botões e setas do teclado) | `/sobre/` |
| `course/` | `CourseHighlight` | `/` e `/curso/` |
| `programs/` | `ProgramCard`, `ProgramProcess` | `/`, `/programas/` |
| `forms/` | `TriageForm` (ilha), `ContactForm` (ilha), `Turnstile` (ilha), `NewsletterForm` + `newsletter-enhance.ts` (funciona sem JavaScript) | `/triagem/`, `/contato/`, rodapé e Home |
| `donations/` | `ManualPixDonation` (chave PIX do CNPJ, padrão) e `DonationForm` (PIX dinâmico, se `PUBLIC_ENABLE_PIX_GATEWAY=true`) | `/doar/` |
| `ui/` | `Button`, `Container`, `SectionHeading`, `SkipLink`, `Checkbox` | Reutilizáveis em qualquer área |

## Convenções

- **Prefira `.astro`.** Crie uma ilha `.tsx` só quando houver estado no navegador (formulários).
- Ícones das ilhas vêm de `lucide-preact`; nos `.astro`, SVG inline com `aria-hidden="true"`.
- Hidratação: `client:load` para o conteúdo principal da página, `client:visible` para o que fica abaixo da dobra.
- Sem `style="…"` nem handlers inline (`onclick=`): o CI e a CSP bloqueiam.
- Texto visível sempre em português do Brasil; links que abrem outra aba levam `rel="noopener noreferrer"` e o
  aviso “(abre em nova aba)” para leitores de tela.
