// Content/logic validator: loads UNITS (data files only — no DOM needed) and
// checks every game is well-formed AND winnable, so no child ever gets stuck.
// Run: node tools/validate.mjs
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";

const root = new URL("..", import.meta.url).pathname;
const win = {};
const ctx = { window: win, console }; vm.createContext(ctx);
for (const f of readdirSync(root + "js").filter(f => /^data.*\.js$/.test(f)).sort())
  vm.runInContext(readFileSync(root + "js/" + f, "utf8"), ctx, { filename: f });
const UNITS = win.UNITS || [];
const engines = new Set([...readFileSync(root + "js/engines.js", "utf8").matchAll(/Engines\.([a-zA-Z]+)\s*=/g)].map(m => m[1]));
const icons = new Set([...readFileSync(root + "index.html", "utf8").matchAll(/<symbol\s+id="(ic-[a-z0-9-]+)"/g)].map(m => m[1]));

const errs = [], warns = [];
const E = (c, m) => { if (!c) errs.push(m); };
const W = (c, m) => { if (!c) warns.push(m); };

function iconsIn(o, out) { out = out || [];
  if (typeof o === "string") { if (/^ic-[a-z0-9-]+$/.test(o)) out.push(o); }
  else if (Array.isArray(o)) o.forEach(x => iconsIn(x, out));
  else if (o && typeof o === "object") for (const k in o) iconsIn(o[k], out);
  return out;
}
function solvable(r) { // BFS on grid, 4-dir, avoid obstacles
  const obs = new Set((r.obstacles || []).map(o => o[0] + "," + o[1]));
  const seen = new Set(), q = [r.start]; const key = p => p[0] + "," + p[1];
  if (obs.has(key(r.start))) return false;
  seen.add(key(r.start));
  while (q.length) { const [c, rr] = q.shift();
    if (c === r.goal[0] && rr === r.goal[1]) return true;
    for (const [dc, dr] of [[1,0],[-1,0],[0,1],[0,-1]]) { const nc = c+dc, nr = rr+dr, k = nc+","+nr;
      if (nc<0||nr<0||nc>=r.cols||nr>=r.rows||obs.has(k)||seen.has(k)) continue; seen.add(k); q.push([nc,nr]); }
  }
  return false;
}

const counts = {};
for (const u of UNITS) {
  const L = `BI${u.bigIdea} ${u.kind || "wk" + u.week} "${u.question}"`;
  counts[u.bigIdea] = (counts[u.bigIdea] || 0) + 1;
  E(u.bigIdea, `${L}: missing bigIdea`);
  E(u.bigIdeaTitle, `${L}: missing bigIdeaTitle`);
  E(u.question, `${L}: missing question`);
  E(u.color, `${L}: missing color`);
  E(u.cardIcon && icons.has(u.cardIcon), `${L}: cardIcon "${u.cardIcon}" missing/undefined`);
  E(u.games && u.games.length >= 1, `${L}: no games`);
  if (u.kind === "handson") E(!u.reading, `${L}: handson should have no reading`);
  else E(u.reading && u.reading.lines && u.reading.lines.length >= 3, `${L}: weekly/review needs a reading passage`);
  if (u.reading) u.reading.lines.forEach((ln, i) => { E(ln.text, `${L} reading[${i}]: no text`); E(icons.has(ln.icon), `${L} reading[${i}]: icon "${ln.icon}" missing`); });
  (u.vocab || []).forEach(v => E(icons.has(v.icon), `${L} vocab "${v.word}": icon "${v.icon}" missing`));

  (u.games || []).forEach((g, gi) => {
    const G = `${L} game#${gi}(${g.engine})`;
    if (!engines.has(g.engine)) { errs.push(`${G}: UNKNOWN engine`); return; }
    iconsIn(g).forEach(ic => E(icons.has(ic), `${G}: icon "${ic}" not in sprite`));
    if (g.engine !== "handson") { E(g.title, `${G}: no title`); E(g.prompt, `${G}: no prompt`); E(g.narration, `${G}: no narration`); }
    switch (g.engine) {
      case "sort": { const ids = new Set((g.bins || []).map(b => b.id));
        E(g.bins && g.bins.length >= 2, `${G}: needs >=2 bins`);
        E(g.items && g.items.length >= 2, `${G}: needs items`);
        (g.items || []).forEach(it => E(ids.has(it.bin), `${G}: item "${it.label}" bin "${it.bin}" not a bin id`));
        (g.bins || []).forEach(b => W((g.items || []).some(it => it.bin === b.id), `${G}: bin "${b.id}" has no items`)); break; }
      case "match": E(g.pairs && g.pairs.length >= 2, `${G}: needs >=2 pairs`);
        (g.pairs || []).forEach((p, i) => E(p.from && p.to && p.from.icon && p.to.icon && p.from.label && p.to.label, `${G}: pair[${i}] incomplete`)); break;
      case "needs": E((g.choices || []).some(c => c.need === true), `${G}: NO correct choice — child can never finish!`);
        W((g.choices || []).some(c => !c.need), `${G}: no distractor (every choice correct)`);
        E(icons.has(g.hero), `${G}: hero "${g.hero}" missing`); break;
      case "cloze": E(g.bank && g.bank.length, `${G}: no bank`);
        (g.sentences || []).forEach((s, i) => { E((g.bank || []).includes(s.answer), `${G}: sentence[${i}] answer "${s.answer}" NOT in bank`); E(s.before != null && s.after != null, `${G}: sentence[${i}] missing before/after`); }); break;
      case "truefalse": E(g.rounds && g.rounds.length, `${G}: no rounds`);
        (g.rounds || []).forEach((r, i) => { E(typeof r.answer === "boolean", `${G}: round[${i}] answer not boolean`); E(r.text, `${G}: round[${i}] no text`); }); break;
      case "readword": E(g.rounds && g.rounds.length, `${G}: no rounds`);
        (g.rounds || []).forEach((r, i) => { E((r.options || []).includes(r.answer), `${G}: round[${i}] answer "${r.answer}" NOT in options`); E(r.options && r.options.length >= 2, `${G}: round[${i}] needs >=2 options`); }); break;
      case "sequence": E(g.steps && g.steps.length >= 2, `${G}: needs >=2 steps`); break;
      case "compare": E(g.scenarios && g.scenarios.length, `${G}: no scenarios`);
        (g.scenarios || []).forEach((s, i) => { E(s.a && s.b && ["a", "b"].includes(s.farther), `${G}: scenario[${i}] malformed`);
          if (s.a && s.b) { E(typeof s.a.force === "number" && typeof s.b.force === "number", `${G}: scenario[${i}] force not numeric`);
            const f = s.farther === "a" ? s.a.force : s.b.force, o = s.farther === "a" ? s.b.force : s.a.force;
            E(f > o, `${G}: scenario[${i}] "farther"=${s.farther} but its force is not larger`); } }); break;
      case "thermometer": E(g.freeze != null, `${G}: no freeze value`);
        (g.rounds || []).forEach((r, i) => E(["below", "above"].includes(r.want), `${G}: round[${i}] want must be "below"/"above"`)); break;
      case "pathdraw": (g.rounds || []).forEach((r, i) => { E(r.start && r.goal && r.cols && r.rows, `${G}: round[${i}] missing grid/start/goal`);
        if (r.start && r.goal) E(solvable(r), `${G}: round[${i}] NOT solvable — child gets stuck!`); }); break;
      case "gravitypath": (g.rounds || []).forEach((r, i) => { const n = r.targets || 3; E(r.answer >= 0 && r.answer < n, `${G}: round[${i}] answer ${r.answer} out of range 0..${n - 1}`); }); break;
      case "handson": E(g.steps && g.steps.length, `${G}: no steps`); E(g.materials && g.materials.length, `${G}: no materials`); break;
    }
  });
}

console.log("units per Big Idea:", JSON.stringify(counts));
console.log(`checked ${UNITS.length} units`);
if (warns.length) { console.log(`\n⚠ ${warns.length} warnings:`); warns.forEach(w => console.log("  - " + w)); }
if (errs.length) { console.log(`\n❌ ${errs.length} ERRORS:`); errs.forEach(e => console.log("  - " + e)); }
else console.log("\n✅ VALIDATE OK (all games well-formed and winnable)");
process.exit(errs.length ? 1 : 0);
