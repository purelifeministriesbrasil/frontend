/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Origem pública do site (canonical, links absolutos). */
  readonly PUBLIC_SITE_ORIGIN?: string;
  /** Base da API do Worker, ex.: https://api.purelifebrasil.org (vazio = mesma origem). */
  readonly PUBLIC_API_URL?: string;
  /** Site key pública do widget Cloudflare Turnstile. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
