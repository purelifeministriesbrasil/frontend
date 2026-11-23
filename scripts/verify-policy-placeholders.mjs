#!/usr/bin/env node
/**
 * Falha se o build ainda contiver marcadores "[PREENCHER" (dados do ministério ou validação jurídica pendentes).
 * Roda no job de deploy: impede publicar a Política de Privacidade com campos em branco.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const dist = resolve(process.argv[2] ?? "dist");
const MARKER = "[PREENCHER";
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith(".html") && readFileSync(full, "utf8").includes(MARKER)) hits.push(full);
  }
}

walk(dist);
if (hits.length > 0) {
  console.error(`[verify-policy-placeholders] FALHA: marcador "${MARKER}" encontrado em:`);
  for (const f of hits) console.error(`  - ${f}`);
  console.error("Preencha os campos pendentes (ver comentário em src/pages/politica-de-privacidade.astro).");
  process.exit(1);
}
console.log("[verify-policy-placeholders] OK: nenhum marcador pendente.");
