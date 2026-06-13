// Generates icons.html — a self-contained visual gallery of every SVG symbol
// in the sprite (inlined so it renders under file://). For human art review.
// Run: node tools/gen-gallery.mjs
import { readFileSync, writeFileSync } from "node:fs";
const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const syms = [...html.matchAll(/<symbol\s+id="(ic-[a-z0-9-]+)"\s+viewBox="([^"]+)">([\s\S]*?)<\/symbol>/g)];
const cells = syms.map(([, id, vb, body]) =>
  `<figure><svg viewBox="${vb}" width="72" height="72" aria-hidden="true">${body}</svg><figcaption>${id}</figcaption></figure>`
).join("\n");
const out = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Icon gallery (${syms.length})</title>
<style>
 body{font-family:system-ui,sans-serif;background:#F4E9D8;color:#4A3B2A;margin:0;padding:24px}
 h1{font-family:Georgia,serif}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:14px}
 figure{margin:0;background:#FCF6EA;border:3px solid #4A3B2A;border-radius:14px;padding:10px;text-align:center;box-shadow:0 4px 0 rgba(74,59,42,.15)}
 svg{display:block;margin:0 auto}
 figcaption{font-size:12px;font-weight:700;margin-top:6px;word-break:break-all}
</style></head><body>
<h1>Daily Science — icon gallery (${syms.length} icons)</h1>
<p>Visual audit of every <code>ic-*</code> symbol. Open in a browser.</p>
<div class="grid">
${cells}
</div><!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "a1a04c5c2cc846bc8817b419c4cd07aa"}'></script><!-- End Cloudflare Web Analytics --></body></html>`;
writeFileSync(root + "icons.html", out);
console.log(`wrote icons.html with ${syms.length} icons`);
