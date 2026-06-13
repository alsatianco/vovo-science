/* ============================================================
   engines/colorByNumber.js — Color-by-Number (paint by a key)
   Data:
     { engine:"color", prompt, narration,
       palette:[ { key, color, name } ],
       art: "<svg viewBox=…> … </svg>"   // authored SVG (trusted, in-repo)
     }
   The art contains regions tagged with data-key matching a palette key,
   each holding a <text class="cbn-num"> label. Child picks a color,
   then taps matching-numbered regions; correct fills lock in, wrong
   shakes + hints. Complete when every region is filled.
   NOTE: `art` is author-written markup shipped in our own data files —
   not user input — so injecting it is safe here.
   ============================================================ */
(function () {
  "use strict";
  var UI = window.UI, el = UI.el;

  function starsFor(m) { return m === 0 ? 3 : m <= 2 ? 2 : 1; }

  window.Engine.register("color", {
    mount: function (stage, data, api) {
      var palette = data.palette || [];
      var current = null; // {key,color,name}
      var mistakes = 0, filled = 0;

      // ----- palette -----
      var pal = el("div.cbn-palette", { role: "group", "aria-label": "Colors" });
      palette.forEach(function (p) {
        var btn = el("button.cbn-swatch", {
          "aria-label": "Color " + p.key + ", " + p.name,
          style: "--swatch:" + p.color,
          onclick: function () { selectColor(p, btn); }
        }, [
          el("span.cbn-key", { text: String(p.key) }),
          el("span.cbn-name", { text: p.name })
        ]);
        pal.appendChild(btn);
      });

      // ----- art canvas -----
      var canvas = el("div.cbn-canvas");
      canvas.innerHTML = data.art || ""; // trusted, authored SVG

      stage.appendChild(el("div.cbn", null, [pal, canvas]));

      var regions = canvas.querySelectorAll("[data-key]");
      var totalRegions = regions.length;

      function selectColor(p, btn) {
        current = p;
        var all = pal.querySelectorAll(".cbn-swatch");
        for (var i = 0; i < all.length; i++) all[i].classList.remove("sel");
        btn.classList.add("sel");
        api.narrate("Color " + p.name + "! Tap the " + p.key + " parts.");
      }

      function paint(region) {
        if (region.classList.contains("filled")) return;
        if (!current) { api.hint("Pick a color first!"); return; }
        if (String(region.getAttribute("data-key")) === String(current.key)) {
          // fill the shape(s) inside the region; hide its number
          var shapes = region.querySelectorAll("path,circle,rect,polygon,ellipse");
          for (var i = 0; i < shapes.length; i++) {
            if (shapes[i].classList.contains("cbn-fill") || shapes[i].getAttribute("data-fill") === "1" || shapes.length === 1) {
              shapes[i].setAttribute("fill", current.color);
            }
          }
          var num = region.querySelector(".cbn-num");
          if (num) num.style.display = "none";
          region.classList.add("filled");
          filled++;
          api.praise();
          if (filled === totalRegions) setTimeout(function () { api.complete(starsFor(mistakes)); }, 600);
        } else {
          mistakes++;
          region.classList.add("wrong");
          api.hint("That part is a different color. Look at the number!");
          setTimeout(function () { region.classList.remove("wrong"); }, 500);
        }
      }

      // wire region taps (+ keyboard access)
      for (var r = 0; r < regions.length; r++) {
        (function (region) {
          region.setAttribute("tabindex", "0");
          region.setAttribute("role", "button");
          region.style.cursor = "pointer";
          region.addEventListener("click", function () { paint(region); });
          region.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); paint(region); }
          });
        })(regions[r]);
      }
    }
  });
})();
