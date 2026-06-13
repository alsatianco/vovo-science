/* ============================================================
   ui.js — tiny DOM + SVG helpers. window.UI
   No framework. Everything builds plain DOM nodes.

   UI.icon(id) clones the <symbol>'s children into a fresh <svg> rather
   than using <use href="#id">. Under file:// some Chrome builds refuse
   <use> cross-reference ("unsafe attempt ... unique security origins")
   and the icon vanishes — inlining the geometry sidesteps that entirely.
   ============================================================ */
(function () {
  "use strict";

  var spriteRoot = null;
  function symbolFor(id) {
    if (!spriteRoot) spriteRoot = document.querySelector("svg[aria-hidden]");
    return document.getElementById(id);
  }

  function icon(id, cls) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("class", "icon" + (cls ? " " + cls : ""));
    svg.setAttribute("aria-hidden", "true");
    var sym = symbolFor(id);
    if (sym) {
      // Clone every child of the <symbol> (handles nested <use> to other
      // symbols too, e.g. ic-rock-x references ic-rock).
      var kids = sym.childNodes;
      for (var i = 0; i < kids.length; i++) svg.appendChild(kids[i].cloneNode(true));
    }
    return svg;
  }

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k.slice(0, 2) === "on" && typeof attrs[k] === "function") n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    if (children) (Array.isArray(children) ? children : [children]).forEach(function (c) {
      if (c == null) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  // A big round icon button (home / back / sound).
  function iconButton(iconId, label, onClick) {
    var b = el("button", { "class": "icon-btn", "aria-label": label, title: label });
    b.appendChild(icon(iconId));
    b.addEventListener("click", function () { Sound.warmUp(); onClick(); });
    return b;
  }

  // A picture tile: framed icon + caption word. Used everywhere.
  function tile(iconId, caption, opts) {
    opts = opts || {};
    var t = el("button", { "class": "tile" + (opts.cls ? " " + opts.cls : "") });
    t.appendChild(el("div", { "class": "tile-art" }, icon(iconId)));
    if (caption) t.appendChild(el("div", { "class": "tile-cap" }, caption));
    if (opts.onClick) t.addEventListener("click", function () { Sound.warmUp(); opts.onClick(t); });
    return t;
  }

  // Burst of stars/leaves from a point — cheap delight, pure DOM+CSS.
  function burst(x, y, host) {
    host = host || document.body;
    for (var i = 0; i < 10; i++) {
      var s = el("div", { "class": "spark" });
      s.appendChild(icon(i % 2 ? "ic-star" : "ic-leaf"));
      var ang = (Math.PI * 2 * i) / 10, dist = 60 + (i % 3) * 22;
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      s.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      host.appendChild(s);
      (function (node) { setTimeout(function () { node.remove(); }, 900); })(s);
    }
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  window.UI = { icon: icon, el: el, iconButton: iconButton, tile: tile, burst: burst, clear: clear };
})();
