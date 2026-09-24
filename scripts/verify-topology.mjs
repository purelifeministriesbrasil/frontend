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

console.log(`[verify-topology] SUCCESS: All ${requiredStaticPages.length} required pages were generated as 100% static HTML!`);
