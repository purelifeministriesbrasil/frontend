import fs from "node:fs";
import path from "node:path";

// Verify that all public routes are generated as 100% static HTML files (§2.4, §21.3)
const distDir = path.resolve(process.cwd(), "dist");
const clientDir = fs.existsSync(path.join(distDir, "client")) ? path.join(distDir, "client") : distDir;

console.log(`[verify-topology] Inspecting build output in: ${clientDir}`);

if (!fs.existsSync(clientDir)) {
  console.error(`[verify-topology] ERROR: Build output directory does not exist: ${clientDir}`);
  process.exit(1);
}

const requiredStaticPages = [
  "index.html",
  "sobre/index.html",
  "conferencia/index.html",
  "editora/index.html",
  "campus/index.html",
  "viagem-eua/index.html",
  "programas/index.html",
  "programas/residencial/index.html",
  "triagem/index.html",
  "triagem/recebido/index.html",
  "doar/index.html",
  "doar/obrigado/index.html",
  "contato/index.html",
  "perguntas-frequentes/index.html",
  "politica-de-privacidade/index.html",
  "newsletter/confirmar/index.html",
  "404.html",
];

const missing = [];

for (const relPath of requiredStaticPages) {
  const fullPath = path.join(clientDir, relPath);
  if (!fs.existsSync(fullPath)) {
    missing.push(relPath);
  }
}

if (missing.length > 0) {
  console.error(`[verify-topology] FAILED: Missing static HTML pages (may have defaulted to SSR):`);
  missing.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}

// Cloudflare Pages: _headers deve existir com o CSP já gerado (sem placeholder).
const headersFile = path.join(clientDir, "_headers");
if (!fs.existsSync(headersFile)) {
  console.error("[verify-topology] FAILED: dist/_headers ausente (headers de segurança do Cloudflare Pages).");
  process.exit(1);
}
const headers = fs.readFileSync(headersFile, "utf-8");
if (headers.includes("__CSP__") || !/Content-Security-Policy: default-src 'self'/.test(headers)) {
  console.error("[verify-topology] FAILED: CSP não gerado em dist/_headers. O build deve rodar scripts/generate-csp.mjs.");
  process.exit(1);
}

console.log(`[verify-topology] SUCCESS: All ${requiredStaticPages.length} required pages were generated as 100% static HTML!`);
