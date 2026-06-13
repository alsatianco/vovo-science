/* ============================================================
   engines/traceWord.js — Write Words / Word build (spell a vocab word)
   Data:
     { engine:"trace", prompt, narration, word:"SEED", icon? }
   A picture cue + empty letter slots. The word's letters appear shuffled
   as tiles; the child taps them in order to spell the word. Correct
   letters fill the next slot (and are spoken); wrong taps shake + hint.
   Complete when the word is spelled. Gentle for ages 5–6: only the
   word's own letters are offered (no distractors).
   ============================================================ */
(function () {
  "use strict";
  var UI = window.UI, el = UI.el, svgUse = UI.svgUse;

  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function starsFor(m){ return m===0?3:m<=2?2:1; }

  window.Engine.register("trace", {
    mount: function (stage, data, api) {
      var word = (data.word || "").toUpperCase().replace(/\s+/g, "");
      var letters = word.split("");
      var next = 0, mistakes = 0;

      var pic = data.icon ? el("div.trace-pic", null, svgUse(data.icon)) : null;

      // slots
      var slotsRow = el("div.trace-slots", { "aria-label": "Spell the word " + word });
      var slotEls = letters.map(function () {
        var s = el("div.trace-slot");
        slotsRow.appendChild(s);
        return s;
      });

      // shuffled letter tiles (track original duplicates by value only)
      var tray = el("div.trace-tray");
      shuffle(letters.map(function (ch, i) { return { ch: ch, i: i }; })).forEach(function (o) {
        var tile = el("button.trace-tile", {
          "aria-label": "Letter " + o.ch,
          text: o.ch,
          onclick: function () { tap(o.ch, tile); }
        });
        tray.appendChild(tile);
      });

      stage.appendChild(el("div.trace", null, [pic, slotsRow, tray].filter(Boolean)));

      function tap(ch, tile) {
        if (tile.disabled) return;
        if (ch === letters[next]) {
          slotEls[next].textContent = ch;
          slotEls[next].classList.add("filled");
          tile.classList.add("placed"); tile.disabled = true;
          api.narrate(ch); // say the letter
          next++;
          if (next === letters.length) {
            setTimeout(function () { api.narrate(word + "!"); }, 350);
            setTimeout(function () { api.complete(starsFor(mistakes)); }, 900);
          }
        } else {
          mistakes++;
          tile.classList.add("wrong");
          api.hint("That's not the next letter. The word is " + word + ".");
          setTimeout(function () { tile.classList.remove("wrong"); }, 500);
        }
      }
    }
  });
})();
