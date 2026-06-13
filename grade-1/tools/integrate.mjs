// Integrate workflow output (data files + SVG symbols) for Big Ideas 2-6.
// Reads the workflow journal, writes js/data-biN.js, dedupes+inserts new
// <symbol> icons into index.html's sprite, and registers the <script> tags.
// Run: node tools/integrate.mjs <journalPath>
import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const journalPath = process.argv[2];
const lines = readFileSync(journalPath, "utf8").trim().split("\n");

const drafts = {};      // biId -> {data, newIcons:[{id,depicts}]}
const symbolBlobs = []; // {symbols}
for (const l of lines) {
  const o = JSON.parse(l);
  if (o.type !== "result") continue;
  const v = o.value !== undefined ? o.value : o.result !== undefined ? o.result : o.output;
  if (!v || typeof v !== "object") continue;
  if (v.data !== undefined && v.biId) drafts[v.biId] = { data: v.data, newIcons: v.newIcons || [] };
  else if (v.symbols !== undefined) symbolBlobs.push(v.symbols);
}

// Match each symbol blob to the Big Idea whose newIcons it best covers.
const blockRe = /<symbol\b[\s\S]*?<\/symbol>/g;
const idRe = /<symbol\s+id="(ic-[a-z0-9-]+)"/;
function blobIds(s) { return (s.match(blockRe) || []).map(b => (b.match(idRe) || [])[1]).filter(Boolean); }
const symbolsByBi = {};
for (const s of symbolBlobs) {
  const ids = new Set(blobIds(s));
  let best = null, bestScore = -1;
  for (const bi of Object.keys(drafts)) {
    const score = (drafts[bi].newIcons || []).filter(n => ids.has(n.id)).length;
    if (score > bestScore) { bestScore = score; best = bi; }
  }
  symbolsByBi[best] = s;
}

// 1. Write the data files.
for (const bi of Object.keys(drafts).sort()) {
  writeFileSync(root + `js/data-bi${bi}.js`, drafts[bi].data.endsWith("\n") ? drafts[bi].data : drafts[bi].data + "\n");
  console.log(`wrote js/data-bi${bi}.js (${drafts[bi].data.length} bytes, ${drafts[bi].newIcons.length} new icons claimed)`);
}

// 2. Dedupe + insert new symbols into the sprite.
let html = readFileSync(root + "index.html", "utf8");
const existing = new Set([...html.matchAll(/<symbol\s+id="(ic-[a-z0-9-]+)"/g)].map(m => m[1]));
let inserted = [], skipped = [];
let toInsert = "";
for (const bi of Object.keys(symbolsByBi).sort()) {
  const blocks = (symbolsByBi[bi].match(blockRe) || []);
  let biChunk = `\n  <!-- ===== Big Idea ${bi} ===== -->\n`;
  let any = false;
  for (const b of blocks) {
    const id = (b.match(idRe) || [])[1];
    if (!id) continue;
    if (existing.has(id)) { skipped.push(id); continue; }
    existing.add(id);
    biChunk += "  " + b.trim() + "\n";
    inserted.push(id); any = true;
  }
  if (any) toInsert += biChunk;
}
const close = html.lastIndexOf("</svg>");
html = html.slice(0, close) + toInsert + html.slice(close);

// 3. Register data scripts (idempotent) right after data-bi1.js.
const anchor = '<script src="js/data-bi1.js?v=7"></script>';
let tags = "";
for (const bi of [2, 3, 4, 5, 6]) {
  const tag = `<script src="js/data-bi${bi}.js?v=7"></script>`;
  if (!html.includes(tag)) tags += "\n" + tag;
}
if (tags) html = html.replace(anchor, anchor + tags);

writeFileSync(root + "index.html", html);
console.log(`\ninserted ${inserted.length} new symbols; skipped ${skipped.length} duplicates ${skipped.length ? "(" + [...new Set(skipped)].join(", ") + ")" : ""}`);
console.log("registered data scripts for BI 2-6");
