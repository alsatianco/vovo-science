// Static consistency checker for the Daily Science game.
// - every engine referenced in data (engine:"x") is defined in engines.js
// - every ic-* icon referenced in js/ is defined as a <symbol id> in index.html
// Run: node tools/verify.mjs
import { readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const jsFiles = readdirSync(root + "js").filter(f => f.endsWith(".js")).map(f => "js/" + f);

let fail = false;
const uniq = a => [...new Set(a)].sort();
const matches = (s, re) => [...s.matchAll(re)].map(m => m[1]);

// 1. syntax check every js file
for (const f of jsFiles) {
  try { execFileSync("node", ["--check", root + f], { stdio: "pipe" }); }
  catch (e) { fail = true; console.log("SYNTAX ERROR in " + f + "\n" + e.stderr); }
}

// 2. engines
const definedEngines = uniq(matches(readFileSync(root + "js/engines.js", "utf8"), /Engines\.([a-zA-Z]+)\s*=/g));
const allJs = jsFiles.map(f => readFileSync(root + f, "utf8")).join("\n");
const refEngines = uniq(matches(allJs, /engine:\s*"([a-zA-Z]+)"/g));
const missingEngines = refEngines.filter(e => !definedEngines.includes(e));

// 3. icons
const definedIcons = uniq(matches(html, /<symbol id="(ic-[a-z0-9-]+)"/g));
const refIcons = uniq(matches(allJs, /"(ic-[a-z0-9-]+)"/g));
const missingIcons = refIcons.filter(i => !definedIcons.includes(i));

console.log(`engines: ${definedEngines.length} defined, ${refEngines.length} referenced`);
console.log(`icons:   ${definedIcons.length} defined, ${refIcons.length} referenced in js`);
if (missingEngines.length) { fail = true; console.log("MISSING ENGINES:", missingEngines); }
if (missingIcons.length) { fail = true; console.log("MISSING ICONS (referenced in js, not in sprite):", missingIcons); }

// 4. count units registered (rough: count .push({ in data files)
const unitFiles = jsFiles.filter(f => /data/.test(f));
let units = 0;
for (const f of unitFiles) units += (readFileSync(root + f, "utf8").match(/UNITS\s*=\s*window\.UNITS\s*\|\|\s*\[\]\)\.push\(\{/g) || []).length;
console.log(`units registered (push count): ${units}`);

console.log(fail ? "\n❌ VERIFY FAILED" : "\n✅ VERIFY OK");
process.exit(fail ? 1 : 0);
