import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://purelifeministriesbrasil.org',
  output: 'static',
  // compat: os componentes .tsx e o lucide-react usam a API do React, servida pelo preact/compat (~4x menor).
  integrations: [preact({ compat: true })],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'never' },
  // hover: baixa a página ao passar o mouse/tocar no link; evita prefetch em massa no celular.
  prefetch: { defaultStrategy: 'hover', prefetchAll: true }
});
