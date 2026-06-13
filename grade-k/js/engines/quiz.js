/* ============================================================
   engines/quiz.js — Multiple-Choice (tap the correct picture)
   Data:
     { engine:"quiz", prompt, narration,
       rounds:[ { ask, narration, options:[ {icon?, label, correct?} ] } ] }
   Steps through rounds; correct answer advances; wrong gives a gentle
   hint + shake. Stars reflect how few mistakes were made.
   ============================================================ */
(function () {
  "use strict";
  var UI = window.UI, el = UI.el, svgUse = UI.svgUse;

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function starsFor(m) { return m === 0 ? 3 : m <= 2 ? 2 : 1; }

  window.Engine.register("quiz", {
    mount: function (stage, data, api) {
      // If a pool is provided, merge with rounds and pick randomly (same count as rounds).
      // This prevents kids from memorising answers by replaying.
      var base = data.rounds || [];
      var count = base.length;
      var all = data.pool ? shuffle(base.concat(data.pool)).slice(0, count) : shuffle(base);
      var rounds = all;
      var ri = 0, mistakes = 0;

      var askEl = el("h3.quiz-ask");
      var optsEl = el("div.quiz-options");
      stage.appendChild(el("div.quiz", null, [askEl, optsEl]));

      function renderRound() {
        var r = rounds[ri];
        askEl.textContent = r.ask || "";
        if (r.narration) api.narrate(r.narration);
        optsEl.innerHTML = "";
        // size the grid to the option count (cap at 4 across)
        optsEl.style.setProperty("--cols", Math.min(r.options.length, 4));

        shuffle(r.options).forEach(function (opt) {
          var btn = el("button.opt", {
            "aria-label": opt.label || "option",
            onclick: function () { choose(opt, btn); }
          }, [
            opt.icon ? el("div.opt-pic", null, svgUse(opt.icon)) : null,
            opt.label ? el("div.opt-label", { text: opt.label }) : null
          ]);
          optsEl.appendChild(btn);
        });
      }

      function choose(opt, btn) {
        if (btn.classList.contains("locked")) return;
        if (opt.correct) {
          btn.classList.add("correct", "locked");
          api.praise();
          ri++;
          if (ri < rounds.length) setTimeout(renderRound, 700);
          else setTimeout(function () { api.complete(starsFor(mistakes)); }, 600);
        } else {
          mistakes++;
          btn.classList.add("wrong");
          api.hint(rounds[ri].hint);
          setTimeout(function () { btn.classList.remove("wrong"); }, 500);
        }
      }

      renderRound();
    }
  });
})();
