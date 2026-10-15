import type { z } from "zod/mini";
import { IDEMPOTENCY_KEY_HEADER } from "@/schemas";
import { siteConfig } from "@/lib/site-config";

const REQUEST_TIMEOUT_MS = 15_000;

/** URL absoluta (ou relativa, se PUBLIC_API_URL vazio) de um endpoint do Worker. */
export function apiUrl(path: string): string {
  return `${siteConfig.apiBaseUrl}${path}`;
}

/** UUID v4 por tentativa lógica de envio: retentativas de rede reutilizam a mesma chave. */
export function newIdempotencyKey(): string {
  return crypto.randomUUID();
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string; message: string; fields?: Record<string, string> };

const NETWORK_MESSAGE = "Erro de conexão. Verifique sua rede e tente novamente.";

export async function postJson<T>(
  path: string,
  body: unknown,
  options: { idempotencyKey?: string } = {}
): Promise<ApiResult<T>> {
  const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
  if (options.idempotencyKey) headers[IDEMPOTENCY_KEY_HEADER] = options.idempotencyKey;

  let res: Response;
  try {
    res = await fetch(apiUrl(path), {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    return { ok: false, status: 0, error: "network_error", message: NETWORK_MESSAGE };
  }

  const payload = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  if (res.ok) return { ok: true, data: payload as T };

  return {
    ok: false,
    status: res.status,
    error: typeof payload?.error === "string" ? payload.error : "http_error",
    message:
      typeof payload?.message === "string"
        ? payload.message
        : "Não foi possível concluir a solicitação. Tente novamente em instantes.",
    fields: (payload?.fields as Record<string, string> | undefined) ?? undefined,
  };
}

/** Mensagens por campo a partir de um ZodError (Zod 4: `issues`). */
export function fieldErrors(error: z.core.$ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".") || "form";
    result[path] ??= issue.message;
  }
  return result;
}

/** Remove strings vazias de campos opcionais antes da validação (ex.: telefone apagado). */
export function compact<T extends Record<string, unknown>>(data: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && !(typeof value === "string" && value.trim() === ""))
  ) as Partial<T>;
}
