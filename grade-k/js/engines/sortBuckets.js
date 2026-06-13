/* ============================================================
   engines/sortBuckets.js — Sorting (drop items into labeled bins)
   Data:
     { engine:"sort", prompt, narration,
       bins:[ { id, label, icon? } ],
       items:[ { label, icon?, bin } ] }   // bin = id of correct bin
   Tap an item to pick it up, then tap the bin it belongs in. Correct
   items drop into the bin and lock; wrong taps shake + hint. Complete
   when every item is sorted.
   ============================================================ */
(function () {
  "use strict";
  var UI = window.UI, el = UI.el, svgUse = UI.svgUse;

  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function starsFor(m){ return m===0?3:m<=2?2:1; }

  window.Engine.register("sort", {
    mount: function (stage, data, api) {
      var bins = data.bins || [], items = data.items || [];
      var mistakes = 0, placed = 0, sel = null;

      var tray = el("div.sort-tray", { "aria-label": "Things to sort" });
      shuffle(items).forEach(function (it, n) {
        var b = el("button.sort-item", {
          dataset: { bin: it.bin },
          "aria-label": it.label || "item",
          onclick: function () { selectItem(b); }
        }, [
          it.icon ? el("div.si-pic", null, svgUse(it.icon)) : null,
          it.label ? el("div.si-label", { text: it.label }) : null
        ]);
        tray.appendChild(b);
      });

      var binRow = el("div.sort-bins");
      bins.forEach(function (bin) {
        var dropped = el("div.bin-drop");
        var b = el("button.sort-bin", {
          dataset: { id: bin.id },
          "aria-label": "Put it in " + bin.label,
          onclick: function () { dropInto(bin, b, dropped); }
        }, [
          bin.icon ? el("div.bin-pic", null, svgUse(bin.icon)) : null,
          el("div.bin-label", { text: bin.label }),
          dropped
        ]);
        binRow.appendChild(b);
      });

      stage.appendChild(el("div.sort", null, [tray, binRow]));

      function selectItem(btn) {
        if (btn.classList.contains("placed")) return;
        if (sel) sel.classList.remove("sel");
        if (sel === btn) { sel = null; return; }
        sel = btn; btn.classList.add("sel");
      }

      function dropInto(bin, binBtn, dropZone) {
        if (!sel) { api.hint("Tap a thing first, then tap a basket!"); return; }
        if (sel.dataset.bin === String(bin.id)) {
          sel.classList.add("placed");
          sel.classList.remove("sel");
          var mini = sel.cloneNode(true);
          mini.classList.add("in-bin"); mini.disabled = true; mini.removeAttribute("onclick");
          dropZone.appendChild(mini);
          sel.style.display = "none";
          sel = null;
          placed++;
          api.praise();
          binBtn.classList.add("flash");
          setTimeout(function(){ binBtn.classList.remove("flash"); }, 400);
          if (placed === items.length) setTimeout(function(){ api.complete(starsFor(mistakes)); }, 600);
        } else {
          mistakes++;
          binBtn.classList.add("wrong");
          api.hint("Not that basket. Try another!");
          setTimeout(function(){ binBtn.classList.remove("wrong"); }, 500);
        }
      }
    }
  });
})();
