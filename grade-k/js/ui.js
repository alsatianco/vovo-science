/* ============================================================
   ui.js — tiny DOM toolkit + shared widgets
   Exposes: window.UI
   No framework; just ergonomic helpers used by app.js and engines.
   ============================================================ */
(function () {
  "use strict";

  /* el("button.foo", {attrs}, [children|string]) — terse element builder.
     Tag may include a single .class shortcut, e.g. "div.card". */
  function el(tag, attrs, children) {
    var cls = "";
    var dot = tag.indexOf(".");
    if (dot !== -1) { cls = tag.slice(dot + 1).replace(/\./g, " "); tag = tag.slice(0, dot); }
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (attrs) {
      for (var k in attrs) {
        if (!attrs.hasOwnProperty(k)) continue;
        var v = attrs[k];
        if (v == null || v === false) continue;
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;
        else if (k === "text") node.textContent = v;
        else if (k === "onclick") node.addEventListener("click", v);
        else if (k.indexOf("on") === 0 && typeof v === "function") node.addEventListener(k.slice(2), v);
        else if (k === "dataset") { for (var d in v) node.dataset[d] = v[d]; }
        else node.setAttribute(k, v);
      }
    }
    appendChildren(node, children);
    return node;
  }

  function appendChildren(node, children) {
    if (children == null) return;
    if (!Array.isArray(children)) children = [children];
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (c == null || c === false) continue;
      node.appendChild(typeof c === "string" || typeof c === "number"
        ? document.createTextNode(String(c)) : c);
    }
  }

  /* SVG <use> reference into the inline sprite, e.g. svgUse("#u-plants"). */
  function svgUse(id, className) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "icon" + (className ? " " + className : ""));
    var use = document.createElementNS(ns, "use");
    // href (modern) + xlink:href (legacy) for broad file:// support
    use.setAttribute("href", id);
    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", id);
    svg.appendChild(use);
    return svg;
  }

  function art(ref, className, alt) {
    if (!ref) return null;
    if (ref.charAt(0) === "#") return svgUse(ref, className);
    return el("img", {
      "class": "art" + (className ? " " + className : ""),
      src: ref,
      alt: alt || "",
      decoding: "async",
      loading: "lazy",
      draggable: "false"
    });
  }

  /* Render a row of 3 stars, `filled` of them lit. */
  function stars(filled) {
    var wrap = el("div.u-stars", { "aria-label": filled + " of 3 stars" });
    for (var i = 0; i < 3; i++) {
      var s = svgUse("#i-star", i < filled ? "on" : "");
      s.classList.toggle("on", i < filled);
      wrap.appendChild(s);
    }
    return wrap;
  }

  /* Swap the content of #screen with a fresh node (re-triggers entrance anim). */
  function setScreen(node) {
    var screen = document.getElementById("screen");
    screen.innerHTML = "";
    screen.appendChild(node);
    screen.scrollTop = 0;
    screen.focus({ preventScroll: true });
  }

  /* Brief celebratory confetti burst over the whole app. */
  function confetti(count) {
    count = count || 28;
    var colors = ["#ffd43b", "#ff8787", "#69db7c", "#4dabf7", "#da77f2", "#ffa94d"];
    var layer = el("div", { style: "position:fixed;inset:0;pointer-events:none;z-index:50;overflow:hidden" });
    for (var i = 0; i < count; i++) {
      var size = 8 + Math.floor(Math.random() * 10);
      var left = Math.random() * 100;
      var delay = Math.random() * 0.25;
      var dur = 1.1 + Math.random() * 0.9;
      var bit = el("div", {
        style: "position:absolute;top:-20px;left:" + left + "%;width:" + size + "px;height:" + size +
               "px;background:" + colors[i % colors.length] + ";border-radius:3px;" +
               "animation:confetti-fall " + dur + "s " + delay + "s ease-in forwards;" +
               "transform:rotate(" + (Math.random() * 360) + "deg)"
      });
      layer.appendChild(bit);
    }
    document.body.appendChild(layer);
    setTimeout(function () { layer.remove(); }, 2400);
  }

  // Inject the confetti keyframes once (kept here so ui.js is self-contained).
  (function injectKeyframes() {
    var css = "@keyframes confetti-fall{to{transform:translateY(105vh) rotate(720deg);opacity:.2}}";
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
  })();

  window.UI = {
    el: el,
    svgUse: svgUse,
    art: art,
    stars: stars,
    setScreen: setScreen,
    confetti: confetti
  };
})();
