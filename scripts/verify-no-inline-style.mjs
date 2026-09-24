import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");
const clientDir = fs.existsSync(path.join(distDir, "client")) ? path.join(distDir, "client") : distDir;

console.log(`[verify-no-inline-style] Scanning HTML files in: ${clientDir}`);

if (!fs.existsSync(clientDir)) {
  console.error(`[verify-no-inline-style] ERROR: Build output directory not found: ${clientDir}`);
  process.exit(1);
}

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith(".html")) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(clientDir);
let violations = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(clientDir, file);
  const content = fs.readFileSync(file, "utf-8");

  // 1. Check for residual inline style attributes: style="..."
  const styleAttrRegex = /<[^>]+?\sstyle=["'][^"']*["']/gi;
  const styleMatches = content.match(styleAttrRegex);
  if (styleMatches) {
    console.error(`[verify-no-inline-style] VIOLATION in ${relPath}: Found residual inline style attributes:`);
    styleMatches.forEach((m) => console.error(`   ${m.substring(0, 100)}...`));
    violations += styleMatches.length;
  }

  // 2. Check for external @import (e.g. Google Fonts)
  if (content.includes("@import") && (content.includes("fonts.googleapis.com") || content.includes("http"))) {
    console.error(`[verify-no-inline-style] VIOLATION in ${relPath}: Found external @import fonts.`);
    violations++;
  }

  // 3. Check for "Mongolian Baiti"
  if (content.toLowerCase().includes("mongolian baiti")) {
    console.error(`[verify-no-inline-style] VIOLATION in ${relPath}: Found reference to forbidden font 'Mongolian Baiti'.`);
    violations++;
  }
}

if (violations > 0) {
  console.error(`[verify-no-inline-style] FAILED with ${violations} violations!`);
  process.exit(1);
}

console.log(`[verify-no-inline-style] SUCCESS: ${htmlFiles.length} HTML files verified. Zero residual inline style= attributes, zero external @imports, and zero references to Mongolian Baiti!`);
