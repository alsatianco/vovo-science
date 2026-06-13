/* ============================================================
   engines/matchPairs.js — Matching (connect related pictures)
   Data:
     { engine:"match", prompt, narration,
       pairs:[ { a:{icon?,label}, b:{icon?,label} } ] }
   Tap an item on the left, then its partner on the right (either
   order works). Correct pairs lock with a color + check; wrong taps
   shake gently. Complete when all pairs are matched.
   ============================================================ */
(function () {
  "use strict";
  var UI = window.UI, el = UI.el, svgUse = UI.svgUse;

  var COLORS = ["#ff8787", "#4dabf7", "#69db7c", "#ffd43b", "#da77f2", "#ffa94d"];
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function starsFor(m) { return m === 0 ? 3 : m <= 2 ? 2 : 1; }

  function item(side, idx, info, onPick) {
    return el("button.match-item", {
      dataset: { side: side, idx: String(idx) },
      "aria-label": info.label || "item",
      onclick: function () { onPick(side, idx, this); }
    }, [
      info.icon ? el("div.mi-pic", null, svgUse(info.icon)) : null,
      info.label ? el("div.mi-label", { text: info.label }) : null
    ]);
  }

  window.Engine.register("match", {
    mount: function (stage, data, api) {
      var pairs = data.pairs || [];
      var mistakes = 0, matched = 0;
      var sel = null; // { side, idx, btn }

      var leftCol = el("div.match-col");
      var rightCol = el("div.match-col");

      // Both columns shuffled independently so neither side is predictable.
      shuffle(pairs.map(function (p, i) { return { i: i, a: p.a }; }))
        .forEach(function (o) { leftCol.appendChild(item("a", o.i, o.a, onPick)); });
      shuffle(pairs.map(function (p, i) { return { i: i, b: p.b }; }))
        .forEach(function (o) { rightCol.appendChild(item("b", o.i, o.b, onPick)); });

      stage.appendChild(el("div.match", null, [leftCol, rightCol]));

      function clearSel() {
        if (sel && sel.btn) sel.btn.classList.remove("sel");
        sel = null;
      }

      function lockPair(idx) {
        var color = COLORS[idx % COLORS.length];
        var nodes = stage.querySelectorAll('.match-item[data-idx="' + idx + '"]');
        for (var k = 0; k < nodes.length; k++) {
          nodes[k].classList.add("matched");
          nodes[k].classList.remove("sel");
          nodes[k].disabled = true;
          nodes[k].style.borderColor = color;
          nodes[k].style.background = color + "22";
          var chk = svgUse("#i-check", "mi-check");
          chk.style.color = color;
          nodes[k].appendChild(chk);
        }
      }

      function onPick(side, idx, btn) {
        if (btn.classList.contains("matched")) return;
        if (!sel) { sel = { side: side, idx: idx, btn: btn }; btn.classList.add("sel"); return; }
        if (sel.btn === btn) { clearSel(); return; } // tap same to deselect

        if (sel.side === side) {
          // re-pick on the same side: move selection
          sel.btn.classList.remove("sel");
          sel = { side: side, idx: idx, btn: btn }; btn.classList.add("sel");
          return;
        }

        // opposite sides chosen — do indices match?
        if (sel.idx === idx) {
          lockPair(idx);
          clearSel();
          matched++;
          api.praise();
          if (matched === pairs.length) setTimeout(function () { api.complete(starsFor(mistakes)); }, 600);
        } else {
          mistakes++;
          var a = sel.btn, b = btn;
          a.classList.add("wrong"); b.classList.add("wrong");
          api.hint("Not a match. Try again!");
          setTimeout(function () { a.classList.remove("wrong"); b.classList.remove("wrong"); }, 500);
          clearSel();
        }
      }
    }
  });
})();
