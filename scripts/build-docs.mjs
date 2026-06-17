// Renders the Markdown documents in /documents to print-ready PDFs in /public.
// Uses headless Microsoft Edge / Chrome (no npm dependency). Run: node scripts/build-docs.mjs
import { readFileSync, writeFileSync, existsSync, mkdtempSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// --- minimal, controlled Markdown -> HTML (only the features our docs use) ---
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inline(s) {
  let out = escapeHtml(s);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}
function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let para = [];
  let list = [];
  const flushPara = () => { if (para.length) { html.push(`<p>${para.map(inline).join("<br>")}</p>`); para = []; } };
  const flushList = () => { if (list.length) { html.push(`<ul>${list.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`); list = []; } };
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) { flushPara(); flushList(); continue; }
    if (line.startsWith("### ")) { flushPara(); flushList(); html.push(`<h3>${inline(line.slice(4))}</h3>`); continue; }
    if (line.startsWith("## ")) { flushPara(); flushList(); html.push(`<h2>${inline(line.slice(3))}</h2>`); continue; }
    if (line.startsWith("# ")) { flushPara(); flushList(); html.push(`<h1>${inline(line.slice(2))}</h1>`); continue; }
    if (line === "---") { flushPara(); flushList(); html.push("<hr>"); continue; }
    if (/^[-*]\s+/.test(line)) { flushPara(); list.push(line.replace(/^[-*]\s+/, "")); continue; }
    para.push(line);
  }
  flushPara(); flushList();
  return html.join("\n");
}

const CSS = `
  @page { size: A4; margin: 15mm 16mm; }
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; color: #1f2933; font-size: 10.3pt; line-height: 1.45; margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  h1 { font-size: 22pt; margin: 0 0 2px; letter-spacing: -0.01em; color: #0f172a; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.12em; color: #0f766e; margin: 18px 0 8px; padding-bottom: 4px; border-bottom: 1.4px solid #0f766e; }
  h3 { font-size: 11.5pt; margin: 12px 0 0; color: #0f172a; }
  p { margin: 4px 0; }
  em { color: #52606d; font-style: italic; font-size: 9.6pt; }
  strong { color: #0f172a; }
  ul { margin: 5px 0 2px; padding-left: 16px; }
  li { margin: 3px 0; }
  a { color: #0f766e; text-decoration: none; }
  code { font-family: Consolas, "SF Mono", monospace; font-size: 9.4pt; background: #f1f5f9; padding: 0 3px; border-radius: 3px; }
  hr { border: 0; border-top: 1px solid #e2e8f0; margin: 12px 0; }
  h1 + p { font-size: 11pt; color: #0f766e; font-weight: 600; margin: 2px 0; }
  h1 + p + p { color: #52606d; font-size: 9.4pt; margin: 0 0 4px; }
`;

// Tighter overrides so the one-page resume fits on a single A4 page.
const COMPACT = `
  @page { size: A4; margin: 11mm 13mm; }
  body { font-size: 9.7pt; line-height: 1.3; }
  h1 { font-size: 19pt; }
  h2 { margin: 11px 0 5px; padding-bottom: 3px; }
  h3 { font-size: 10.6pt; margin: 8px 0 0; }
  p { margin: 2px 0; }
  em { font-size: 9pt; }
  ul { margin: 3px 0 1px; padding-left: 15px; }
  li { margin: 1.5px 0; }
  h1 + p { font-size: 10.4pt; }
  h1 + p + p { font-size: 9pt; }
`;

const wrap = (title, body, compact) =>
  `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>${CSS}${compact ? COMPACT : ""}</style></head><body>${body}</body></html>`;

function findBrowser() {
  const pf = process.env["ProgramFiles"] || "C:\\Program Files";
  const pfx = process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)";
  const candidates = [
    `${pfx}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${pf}\\Microsoft\\Edge\\Application\\msedge.exe`,
    `${pf}\\Google\\Chrome\\Application\\chrome.exe`,
    `${pfx}\\Google\\Chrome\\Application\\chrome.exe`,
  ];
  return candidates.find((p) => existsSync(p));
}

const DOCS = [
  { src: "documents/resume.md", html: "documents/resume.html", out: "public/resume.pdf", title: "Jamil Mendez - Resume", compact: true },
  { src: "documents/cv.md", html: "documents/cv.html", out: "public/cv.pdf", title: "Jamil Mendez - CV" },
  { src: "documents/cover-letter.md", html: "documents/cover-letter.html", out: "public/cover-letter.pdf", title: "Jamil Mendez - Cover Letter" },
];

const browser = findBrowser();
if (!browser) { console.error("No Edge/Chrome found. Install one or adjust findBrowser()."); process.exit(1); }
console.log(`using browser: ${browser}`);

for (const doc of DOCS) {
  const md = readFileSync(resolve(doc.src), "utf8");
  const htmlPath = resolve(doc.html);
  writeFileSync(htmlPath, wrap(doc.title, mdToHtml(md), doc.compact), "utf8");
  const outPath = resolve(doc.out);
  const profile = mkdtempSync(join(tmpdir(), "docpdf-"));
  execFileSync(browser, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--user-data-dir=${profile}`,
    `--print-to-pdf=${outPath}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: "ignore" });
  const kb = (statSync(outPath).size / 1024).toFixed(1);
  console.log(`wrote ${doc.out} (${kb} KB)`);
}
