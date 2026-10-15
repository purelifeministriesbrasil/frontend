/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Origem pública do site (canonical, links absolutos). */
  readonly PUBLIC_SITE_ORIGIN?: string;
  /** Base da API do Worker, ex.: https://api.purelifeministriesbrasil.org (vazio = mesma origem). */
  readonly PUBLIC_API_URL?: string;
  /** Site key pública do widget Cloudflare Turnstile. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  /** "true" liga o PIX dinâmico pela API; qualquer outro valor mostra a chave PIX institucional. */
  readonly PUBLIC_ENABLE_PIX_GATEWAY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
