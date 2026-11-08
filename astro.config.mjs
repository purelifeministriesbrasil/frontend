import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://purelifeministriesbrasil.org',
  output: 'static',
  // compat: os componentes .tsx usam a API do React, servida pelo preact/compat (~4x menor).
  integrations: [
    preact({ compat: true }),
    // Páginas transacionais ou privadas ficam fora do sitemap (também bloqueadas/noindex).
    sitemap({
      filter: (page) => !/\/(triagem|doar\/obrigado|newsletter|404)(\/|$)/.test(new URL(page).pathname),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'never' },
  // hover: baixa a página ao passar o mouse/tocar no link; evita prefetch em massa no celular.
  prefetch: { defaultStrategy: 'hover', prefetchAll: true }
});
