// Dependency-free runtime smoke test for the Daily Science game.
// Loads audio.js + ui.js + engines.js + all data files in a minimal DOM shim,
// then MOUNTS every game of every unit and clicks every clickable element,
// asserting nothing throws. Catches runtime bugs the static checker can't.
// Run: node tools/smoke.mjs
import { readFileSync, readdirSync } from "node:fs";
import vm from "node:vm";

const root = new URL("..", import.meta.url).pathname;

/* ---------- minimal DOM shim ---------- */
class TextNode { constructor(t) { this._text = t == null ? "" : "" + t; this.parentNode = null; }
  get textContent() { return this._text; } cloneNode() { return new TextNode(this._text); } }
class Style { setProperty(k, v) { this[k] = v; } removeProperty(k) { delete this[k]; } }
class ClassList {
  constructor(el) { this.el = el; this.s = new Set(); }
  _sync() { this.el._class = [...this.s].join(" "); }
  add() { for (const c of arguments) this.s.add(c); this._sync(); }
  remove() { for (const c of arguments) this.s.delete(c); this._sync(); }
  toggle(c, f) { if (f === undefined) f = !this.s.has(c); if (f) this.s.add(c); else this.s.delete(c); this._sync(); return f; }
  contains(c) { return this.s.has(c); }
}
class Element {
  constructor(tag, ns) {
    this.tagName = tag; this.ns = ns || null; this.childNodes = []; this.parentNode = null;
    this.style = new Style(); this.classList = new ClassList(this); this.attributes = {};
    this.listeners = {}; this._class = ""; this._text = ""; this.disabled = false;
    this.offsetWidth = 40; this.clientWidth = 40; this.id = "";
  }
  set className(v) { this._class = v || ""; this.classList.s = new Set(this._class.split(/\s+/).filter(Boolean)); }
  get className() { return this._class; }
  setAttribute(k, v) { this.attributes[k] = v; if (k === "class") this.className = v; if (k === "id") this.id = v; }
  getAttribute(k) { return this.attributes[k]; }
  removeAttribute(k) { delete this.attributes[k]; if (k === "disabled") this.disabled = false; }
  setAttributeNS(_n, k, v) { this.setAttribute(k, v); }
  addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); }
  removeEventListener(t, fn) { if (this.listeners[t]) this.listeners[t] = this.listeners[t].filter(f => f !== fn); }
  dispatch(t, ev) { (this.listeners[t] || []).slice().forEach(fn => fn(ev || {})); }
  click() { this.dispatch("click", {}); }
  appendChild(c) { if (c == null) return c; if (typeof c === "string") c = new TextNode(c); c.parentNode = this; this.childNodes.push(c); return c; }
  removeChild(c) { const i = this.childNodes.indexOf(c); if (i >= 0) this.childNodes.splice(i, 1); if (c) c.parentNode = null; return c; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  cloneNode(deep) { const e = new Element(this.tagName, this.ns); e.className = this._class; e.attributes = { ...this.attributes }; e._text = this._text; if (deep) this.childNodes.forEach(c => e.appendChild(c.cloneNode(true))); return e; }
  get firstChild() { return this.childNodes[0] || null; }
  get children() { return this.childNodes.filter(n => n instanceof Element); }
  set textContent(v) { this._text = v == null ? "" : "" + v; this.childNodes = []; }
  get textContent() { return this._text || this.childNodes.map(c => c.textContent || "").join(""); }
  set innerHTML(v) { this._html = v; }
  _match(sel, el) {
    if (sel[0] === ".") return el.classList.contains(sel.slice(1));
    if (sel.indexOf("[") >= 0) return el.tagName === sel.slice(0, sel.indexOf("["));
    return el.tagName === sel;
  }
  _find(sel, single, out) {
    out = out || [];
    for (const c of this.childNodes) if (c instanceof Element) {
      if (this._match(sel, c)) { out.push(c); if (single) return out; }
      c._find(sel, single, out); if (single && out.length) return out;
    }
    return out;
  }
  querySelector(sel) { return this._find(sel, true)[0] || null; }
  querySelectorAll(sel) { return this._find(sel, false); }
  getBoundingClientRect() { return { left: 0, top: 0, right: 40, bottom: 40, width: 40, height: 40 }; }
  setPointerCapture() {} releasePointerCapture() {} scrollIntoView() {} focus() {}
}
const appEl = new Element("div"); appEl.id = "app";
const document = {
  createElement: t => new Element(t),
  createElementNS: (ns, t) => new Element(t, ns),
  createTextNode: t => new TextNode(t),
  getElementById: id => (id === "app" ? appEl : null),
  querySelector: () => null,
  body: new Element("body"),
  documentElement: new Element("html")
};
const win = {};
const ctx = {
  window: win, document, Math, console, JSON, Array, Object, String, Number, Boolean, RegExp, Date,
  setTimeout: () => 0, clearTimeout: () => {}, setInterval: () => 0, clearInterval: () => {},
  navigator: { userAgent: "node" }, localStorage: { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = "" + v; } }
};
ctx.window = win; vm.createContext(ctx);

/* ---------- load scripts in order ---------- */
const sync = () => { for (const k of ["UI", "Sound", "Engines", "UNITS"]) if (win[k] !== undefined) ctx[k] = win[k]; };
const run = f => { vm.runInContext(readFileSync(root + f, "utf8"), ctx, { filename: f }); sync(); };

let fail = false;
const dataFiles = readdirSync(root + "js").filter(f => /^data.*\.js$/.test(f)).sort().map(f => "js/" + f);
try {
  run("js/audio.js"); run("js/ui.js"); run("js/engines.js");
  for (const f of dataFiles) run(f);
} catch (e) { console.log("LOAD ERROR:", e.stack); process.exit(1); }

const UNITS = win.UNITS || [];
const Engines = win.Engines;
console.log(`loaded ${UNITS.length} units, ${Object.keys(Engines).length} engines\n`);

/* ---------- mount + click every game ---------- */
function clickAll(node, depth) {
  if (depth > 40 || !(node instanceof Element)) return;
  if (node.listeners.click) { try { node.click(); } catch (e) { throw e; } }
  node.childNodes.slice().forEach(c => clickAll(c, depth + 1));
}
let games = 0;
for (const u of UNITS) {
  const ctxLabel = `BI${u.bigIdea} ${u.kind || "wk" + u.week} "${u.question}"`;
  if (!u.question) { fail = true; console.log("⚠ missing question:", u.id); }
  if (u.kind !== "handson" && !u.reading) console.log("note: no reading passage:", ctxLabel);
  if (!u.games || !u.games.length) { fail = true; console.log("⚠ no games:", ctxLabel); continue; }
  u.games.forEach((g, gi) => {
    games++;
    const stage = new Element("div");
    const api = { narrate() {}, praise() {}, mistake() {}, complete() {} };
    if (!Engines[g.engine]) { fail = true; console.log(`✗ ${ctxLabel} game#${gi}: unknown engine "${g.engine}"`); return; }
    try {
      Engines[g.engine](stage, g, api);
      if (!stage.childNodes.length) { fail = true; console.log(`✗ ${ctxLabel} game#${gi} (${g.engine}): rendered nothing`); return; }
      clickAll(stage, 0); // exercise every click handler (both correct + wrong branches)
    } catch (e) { fail = true; console.log(`✗ ${ctxLabel} game#${gi} (${g.engine}) THREW:\n   ${e.stack.split("\n").slice(0, 3).join("\n   ")}`); }
  });
}
console.log(`mounted+clicked ${games} games across ${UNITS.length} units`);

/* ---------- app.js: boot + drive the two-level navigation ---------- */
try {
  run("js/app.js"); // IIFE builds the Home (Big Idea picker) into #app
  const bar = appEl.childNodes[0], screen = appEl.childNodes[1];
  if (!bar || !screen) throw new Error("app did not build bar+screen");
  const biCards = screen.querySelectorAll(".bi-card");
  if (biCards.length !== 6) { fail = true; console.log(`✗ home: expected 6 Big-Idea cards, got ${biCards.length}`); }
  let drives = 0;
  for (let i = 0; i < biCards.length; i++) {
    bar.querySelector(".icon-btn").click();          // Home -> Big-Idea picker
    const cards = screen.querySelectorAll(".bi-card");
    cards[i].click();                                 // -> Big Idea week list
    const units = screen.querySelectorAll(".unit-card");
    if (!units.length) { fail = true; console.log(`✗ BI card ${i}: no unit cards`); continue; }
    units[0].click();                                 // -> Cover
    const start = screen.querySelector(".big-btn");
    if (start) start.click();                          // -> Reading (or Games for handson)
    const play = screen.querySelector(".play-btn");
    if (play) play.click();                            // Reading -> Games (first game mounts)
    drives++;
  }
  console.log(`drove home->bigidea->unit->cover->play for ${drives} Big Ideas`);
} catch (e) { fail = true; console.log("✗ app.js nav drive THREW:\n   " + e.stack.split("\n").slice(0, 4).join("\n   ")); }

console.log(fail ? "\n❌ SMOKE FAILED" : "\n✅ SMOKE OK");
process.exit(fail ? 1 : 0);
