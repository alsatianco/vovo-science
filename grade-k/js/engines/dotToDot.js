/* ============================================================
   engines/dotToDot.js — Dot-to-Dot (tap numbered dots in order)
   Data:
     { engine:"dots", prompt, narration,
       viewBox?: "0 0 100 100",
       dots:[ {x,y}, ... ],         // in correct 1..n order
       reveal?: "<svg-inner markup>" // optional art shown when finished
     }
   Tapping the correct next dot draws a line from the previous dot and
   lights it up; a wrong dot shakes + hints. When all dots are joined,
   an optional picture is revealed and the activity completes.
   ============================================================ */
(function () {
  "use strict";
  var UI = window.UI, el = UI.el;
  var SVGNS = "http://www.w3.org/2000/svg";

  function starsFor(m){ return m===0?3:m<=2?2:1; }
  function svgEl(name, attrs){
    var n = document.createElementNS(SVGNS, name);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    return n;
  }

  window.Engine.register("dots", {
    mount: function (stage, data, api) {
      var dots = data.dots || [];
      var vb = data.viewBox || "0 0 100 100";
      var next = 0, mistakes = 0;

      var svg = svgEl("svg", { viewBox: vb, class: "dots-svg", role: "img" });

      // optional faint reveal art behind the dots
      var revealGroup = null;
      if (data.reveal) {
        revealGroup = svgEl("g", { class: "dots-reveal", opacity: "0" });
        revealGroup.innerHTML = data.reveal; // authored, trusted markup
        svg.appendChild(revealGroup);
      }

      var lineGroup = svgEl("g", {});
      svg.appendChild(lineGroup);

      dots.forEach(function (d, i) {
        var g = svgEl("g", { class: "dot-node", tabindex: "0", role: "button", "aria-label": "Dot " + (i + 1) });
        var c = svgEl("circle", { cx: d.x, cy: d.y, r: 4.2, class: "dot-c" });
        var t = svgEl("text", { x: d.x, y: d.y + 2.2, "text-anchor": "middle", class: "dot-t" });
        t.textContent = String(i + 1);
        g.appendChild(c); g.appendChild(t);
        function hit(){ tap(i, g, d); }
        g.addEventListener("click", hit);
        g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hit(); } });
        svg.appendChild(g);
      });

      stage.appendChild(el("div.dots", null, svg));

      function tap(i, g, d) {
        if (g.classList.contains("done")) return;
        if (i === next) {
          if (next > 0) {
            var prev = dots[next - 1];
            lineGroup.appendChild(svgEl("line", { x1: prev.x, y1: prev.y, x2: d.x, y2: d.y, class: "dot-line" }));
          }
          g.classList.add("done");
          next++;
          api.praise();
          if (next === dots.length) {
            // close the shape back to dot 1 if it's clearly a loop (optional aesthetic)
            if (revealGroup) revealGroup.setAttribute("opacity", "1");
            setTimeout(function(){ api.complete(starsFor(mistakes)); }, 700);
          }
        } else {
          mistakes++;
          g.classList.add("wrong");
          api.hint(next === 0 ? "Start at number one!" : "Find number " + (next + 1) + "!");
          setTimeout(function(){ g.classList.remove("wrong"); }, 500);
        }
      }
    }
  });
})();
