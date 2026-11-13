// scripts/verify-dist-secrets.mjs — falha se o build estático contiver algo com cara de segredo.
// O site só pode embutir variáveis PUBLIC_*; qualquer credencial de servidor em dist/ é vazamento.
// Uso: node scripts/verify-dist-secrets.mjs [diretório]   (padrão: dist)
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TEXT_EXTENSIONS = new Set([".html", ".js", ".mjs", ".css", ".json", ".txt", ".xml", ".map", ".svg", ".webmanifest", ""]);

/** Padrões de credenciais. Cada um tem nome estável para o relatório; o valor encontrado nunca é impresso. */
export const SECRET_PATTERNS = [
  { name: "private-key", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { name: "postgres-url-with-password", re: /postgres(?:ql)?:\/\/[^\s:"'/@]+:[^\s@"']+@/i },
  { name: "resend-api-key", re: /\bre_[A-Za-z0-9]{8,}_[A-Za-z0-9]{16,}/ },
  { name: "asaas-api-key", re: /\$aact_[A-Za-z0-9_]{20,}/ },
  { name: "mercadopago-access-token", re: /\b(?:APP_USR|TEST)-\d{6,}-\d{6}-[a-f0-9]{32}-\d{6,}/ },
  { name: "aws-access-key", re: /\bAKIA[0-9A-Z]{16}\b/ },
  // Chave de site do Turnstile (pública) tem 24 caracteres; a secreta é mais longa.
  { name: "turnstile-secret-key", re: /\b0x4[A-Za-z0-9_-]{30,}\b/ },
  // Nomes de variáveis exclusivas do servidor não devem aparecer no bundle.
  { name: "server-env-name", re: /\b(?:HASH_PEPPER|TRIAGE_KEY_V\d+|TURNSTILE_SECRET_KEY|RESEND_API_KEY|DATABASE_URL|ASAAS_API_KEY|ASAAS_WEBHOOK_SECRET|MERCADOPAGO_ACCESS_TOKEN|MERCADOPAGO_WEBHOOK_SECRET|CLOUDFLARE_API_TOKEN)\b/ },
];

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return files(full);
    return TEXT_EXTENSIONS.has(extname(name).toLowerCase()) || name === "_headers" || name === "_redirects" ? [full] : [];
  });
}

/** Retorna `[{ file, pattern }]` para cada ocorrência (sem o valor). */
export function scan(dir) {
  const findings = [];
  for (const file of files(dir)) {
    const content = readFileSync(file, "utf-8");
    for (const { name, re } of SECRET_PATTERNS) {
      if (re.test(content)) findings.push({ file: relative(dir, file), pattern: name });
    }
  }
  return findings;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dir = resolve(process.argv[2] ?? join(process.cwd(), "dist"));
  if (!existsSync(dir)) {
    console.error(`[verify-dist-secrets] Diretório não encontrado: ${dir}. Rode o build antes.`);
    process.exit(1);
  }
  const findings = scan(dir);
  if (findings.length > 0) {
    for (const f of findings) console.error(`[verify-dist-secrets] ${f.pattern} em ${f.file}`);
    console.error(`[verify-dist-secrets] FALHA: ${findings.length} ocorrência(s). Nenhum valor foi impresso.`);
    process.exit(1);
  }
  console.log("[verify-dist-secrets] SUCCESS: nenhum padrão de segredo em", relative(process.cwd(), dir) || dir);
}
