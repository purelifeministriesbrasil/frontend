import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: cloudflare({ imageService: 'passthrough' }),
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  build: { inlineStylesheets: 'never' },
  prefetch: { defaultStrategy: 'tap', prefetchAll: false }
});
