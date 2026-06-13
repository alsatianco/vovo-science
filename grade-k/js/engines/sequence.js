/* ============================================================
   engines/sequence.js — Sequencing (put steps in order)
   Data:
     { engine:"sequence", prompt, narration,
       steps:[ {icon?, label} ] }   // listed in the CORRECT order
   Numbered slots fill left→right as the child taps tiles in order.
   Tapping the right next tile places it; a wrong tile shakes + hints.
   Complete when every slot is filled.
   ============================================================ */
(function () {
  "use strict";
  var UI = window.UI, el = UI.el, svgUse = UI.svgUse;

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function starsFor(m) { return m === 0 ? 3 : m <= 2 ? 2 : 1; }

  function tileInner(step) {
    return [
      step.icon ? el("div.tile-pic", null, svgUse(step.icon)) : null,
      step.label ? el("div.tile-label", { text: step.label }) : null
    ];
  }

  window.Engine.register("sequence", {
    mount: function (stage, data, api) {
      var steps = data.steps || [];
      var next = 0, mistakes = 0;

      // Slots (numbered targets)
      var slotsRow = el("div.seq-slots");
      var slotEls = [];
      steps.forEach(function (_, i) {
        var slot = el("div.seq-slot", null, el("span.seq-num", { text: String(i + 1) }));
        slotEls.push(slot);
        slotsRow.appendChild(slot);
        if (i < steps.length - 1) slotsRow.appendChild(el("div.seq-arrow", null, svgUse("#i-play")));
      });

      // Tray (shuffled tiles)
      var tray = el("div.seq-tray");
      shuffle(steps.map(function (s, i) { return { order: i, step: s }; })).forEach(function (o) {
        var tile = el("button.seq-tile", {
          dataset: { order: String(o.order) },
          "aria-label": o.step.label || ("step " + (o.order + 1)),
          onclick: function () { tap(o.order, tile, o.step); }
        }, tileInner(o.step));
        tray.appendChild(tile);
      });

      stage.appendChild(el("div.seq", null, [slotsRow, tray]));

      function tap(order, tile, step) {
        if (tile.disabled) return;
        if (order === next) {
          // place into the next slot
          var slot = slotEls[next];
          slot.innerHTML = "";
          slot.classList.add("filled");
          tileInner(step).forEach(function (n) { if (n) slot.appendChild(n); });
          tile.classList.add("placed");
          tile.disabled = true;
          next++;
          api.praise();
          if (next === steps.length) setTimeout(function () { api.complete(starsFor(mistakes)); }, 600);
        } else {
          mistakes++;
          tile.classList.add("wrong");
          api.hint(next === 0 ? "Which one comes first?" : "What comes next?");
          setTimeout(function () { tile.classList.remove("wrong"); }, 500);
        }
      }
    }
  });
})();
