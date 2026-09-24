// frontend/src/lib/sanity/client.ts (§4.3, §13.3)
// Abstração de cliente Sanity com fallback elegante para fixtures locais no build SSG

import programsFallback from "../../data/fixtures/programs.json";
import faqsFallback from "../../data/fixtures/faqs.json";

export interface SanityConfig {
  projectId?: string;
  dataset?: string;
  apiVersion?: string;
}

const config: SanityConfig = {
  projectId: import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
};

/**
 * Executa uma query GROQ contra o Sanity CDN.
 * Se o projeto não estiver configurado ou ocorrer falha de rede no build,
 * retorna os fixtures canónicos locais garantindo compilação estática 100% resiliente.
 */
export async function fetchSanityQuery<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!config.projectId) {
    return null;
  }

  try {
    let url = `https://${config.projectId}.api.sanity.io/v${config.apiVersion}/data/query/${config.dataset}?query=${encodeURIComponent(query)}`;
    for (const [key, val] of Object.entries(params)) {
      url += `&$${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(val))}`;
    }

    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.warn(`[Sanity] API query failed (${res.status}): fallbacking to local fixtures`);
      return null;
    }

    const data = await res.json();
    return data.result as T;
  } catch (error) {
    console.warn("[Sanity] Network error during build query: using local fixtures fallback", error);
    return null;
  }
}

/**
 * Obtém a lista de programas com fallback automático
 */
export async function getPrograms() {
  const remote = await fetchSanityQuery<any[]>(`*[_type == "program"] | order(name asc)`);
  return remote && remote.length > 0 ? remote : programsFallback;
}

/**
 * Obtém um programa específico por slug
 */
export async function getProgramBySlug(slug: string) {
  const remote = await fetchSanityQuery<any>(
    `*[_type == "program" && slug.current == $slug][0]`,
    { slug }
  );
  if (remote) return remote;
  return programsFallback.find((p) => p.slug === slug) || null;
}

/**
 * Obtém a lista de perguntas frequentes
 */
export async function getFaqs() {
  const remote = await fetchSanityQuery<any[]>(`*[_type == "faq"] | order(order asc)`);
  return remote && remote.length > 0 ? remote : faqsFallback;
}
