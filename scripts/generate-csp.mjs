// scripts/generate-csp.mjs — gera a Content-Security-Policy de produção após `astro build`.
// O Astro injeta scripts inline (hidratação das ilhas React e scripts pequenos). Em vez de
// liberar 'unsafe-inline', calculamos o SHA-256 de cada script inline e o listamos em script-src.
// Falha o build se encontrar handlers inline (onclick=...), que não podem ser autorizados por hash.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const distDir = join(process.cwd(), "dist");
const headersPath = join(distDir, "_headers");
// Modelo versionado: reler daqui (e não de dist/) torna o script idempotente após o build.
const headersTemplatePath = join(process.cwd(), "public", "_headers");

function readDotEnv() {
  const envPath = join(process.cwd(), ".env");
  if (!existsSync(envPath)) return {};
  return Object.fromEntries(
    readFileSync(envPath, "utf-8")
      .split(/\r?\n/)
      .map((line) => /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line))
      .filter(Boolean)
      .map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")])
  );
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith(".html") ? [full] : [];
  });
}

if (!existsSync(headersPath)) {
  console.error("[generate-csp] dist/_headers não encontrado. Rode `astro build` antes.");
  process.exit(1);
}

const apiUrl = (process.env.PUBLIC_API_URL ?? readDotEnv().PUBLIC_API_URL ?? "").trim();
let apiOrigin = "";
if (apiUrl) {
  try {
    apiOrigin = new URL(apiUrl).origin;
  } catch {
    console.error(`[generate-csp] PUBLIC_API_URL inválida: ${apiUrl}`);
    process.exit(1);
  }
}

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
const INLINE_HANDLER = /<[^>]+\son[a-z]+\s*=/i;

const hashes = new Set();
const offenders = [];

for (const file of htmlFiles(distDir)) {
  const html = readFileSync(file, "utf-8");
  if (INLINE_HANDLER.test(html)) offenders.push(file);
  for (const [, attrs, body] of html.matchAll(INLINE_SCRIPT)) {
    // JSON-LD é dado, não é executado: CSP não se aplica.
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue;
    if (body.length === 0) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
}

if (offenders.length > 0) {
  console.error(`[generate-csp] Handlers inline encontrados (proibidos pelo CSP):\n${offenders.join("\n")}`);
  process.exit(1);
}

const TURNSTILE = "https://challenges.cloudflare.com";
const directives = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(" ")} ${TURNSTILE}`.replace(/\s+/g, " "),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://img.youtube.com",
  "font-src 'self'",
  `connect-src 'self' ${apiOrigin}`.trim(),
  `frame-src ${TURNSTILE}`,
  `form-action 'self' ${apiOrigin}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
];
const csp = directives.join("; ");

const template = readFileSync(headersTemplatePath, "utf-8");
const CSP_LINE = /^(\s*Content-Security-Policy:\s*)__CSP__\s*$/gm;
const occurrences = template.match(CSP_LINE)?.length ?? 0;
if (occurrences !== 1) {
  console.error(`[generate-csp] Esperada exatamente 1 linha "Content-Security-Policy: __CSP__" em public/_headers (encontradas: ${occurrences}).`);
  process.exit(1);
}
writeFileSync(headersPath, template.replace(CSP_LINE, (_line, prefix) => `${prefix}${csp}`));

console.log(
  `[generate-csp] CSP gerado com ${hashes.size} hash(es) de script inline; API: ${apiOrigin || "(mesma origem)"}.`
);
