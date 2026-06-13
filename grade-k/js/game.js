/* ============================================================
   game.js — the game runner (sequences a unit's activities)
   Exposes: window.GameRunner
   Reads window.SCIENCE_DATA[unitId].activities[] and, for each:
     - renders a prompt bar (text + hear-again) and a clean stage
     - mounts the named engine with a shared `api`
     - collects stars, advances, then shows the reward screen
   The engine contract (see engine.js):
     Engine.get(name).mount(stageEl, activityData, api)
     api = { narrate, complete(stars), praise(), hint(text) }
   ============================================================ */
(function () {
  "use strict";

  var UI = window.UI, Sound = window.Sound, Storage = window.Storage, Engine = window.Engine;
  var el = UI.el, svgUse = UI.svgUse, art = UI.art;

  var PRAISE = ["Yes!", "Great job!", "You did it!", "Awesome!", "Wonderful!", "Super!"];
  var HINTS  = ["Try again!", "Almost! Try another one.", "Hmm, try a different one.", "Give it another go!"];
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  var current = null; // { unitId, data, i, starsPer, onExit }

  function start(unitId, opts) {
    var data = window.SCIENCE_DATA[unitId];
    if (!data || !data.activities || !data.activities.length) {
      // Nothing to play — bounce back.
      if (opts && opts.onExit) opts.onExit();
      return;
    }
    current = { unitId: unitId, data: data, i: 0, starsPer: [], onExit: (opts && opts.onExit) || function () {} };
    renderActivity();
  }

  function renderActivity() {
    var c = current, act = c.data.activities[c.i];

    // If the activity has a reading passage, show it first via Reader.
    if (act.reading && window.Reader) {
      window.Reader.show(act.reading, function () { mountActivity(c, act); });
      return;
    }
    mountActivity(c, act);
  }

  function mountActivity(c, act) {
    var engine = Engine.get(act.engine);
    var entry = window.UNIT_INDEX[c.unitId];
    var helperArt = entry ? (entry.world.mascotArt || entry.world.mascot) : "#m-sprout";

    // ----- progress dots -----
    var dots = el("div.game-progress", { "aria-label": "Activity " + (c.i + 1) + " of " + c.data.activities.length });
    for (var d = 0; d < c.data.activities.length; d++) {
      dots.appendChild(el("span.dot" + (d < c.i ? ".done" : d === c.i ? ".active" : ""), null));
    }

    // ----- prompt bar (text + hear again) -----
    var hearBtn = el("button.hearbtn", {
      "aria-label": "Hear the instructions again",
      onclick: function () { Sound.replay(); }
    }, [svgUse("#i-replay"), el("span", { text: "Hear it" })]);

    var promptBar = el("div.game-prompt", null, [
      art(helperArt, "prompt-mascot", entry ? entry.world.mascotName + " helper" : "Science helper"),
      el("p.prompt-text", { text: act.prompt || "" }),
      hearBtn
    ]);

    // ----- stage -----
    var stage = el("div.game-stage");

    var wrap = el("div.fill game", null, [dots, promptBar, stage]);
    UI.setScreen(wrap);

    // Narrate the instruction (becomes the "hear again" phrase).
    if (act.narration) Sound.narrate(act.narration);

    // ----- mount the engine -----
    if (!engine) {
      stage.appendChild(el("p.prompt-text", { text: "(This activity type isn't ready yet.)" }));
      // Don't trap the child — let them finish with a friendly button.
      stage.appendChild(el("button.bigbtn", { onclick: function () { activityDone(1); } }, "Next"));
      return;
    }

    var api = {
      narrate: function (t) { Sound.narrate(t); },
      praise: function () { Sound.narrate(pick(PRAISE)); },
      hint: function (t) { Sound.narrate(t || pick(HINTS)); },
      complete: function (stars) { activityDone(stars); }
    };

    try {
      engine.mount(stage, act, api);
    } catch (e) {
      // Never leave a child stuck on a broken activity.
      if (window.console && console.error) console.error("Engine '" + act.engine + "' failed:", e);
      stage.appendChild(el("button.bigbtn", { onclick: function () { activityDone(1); } }, "Next"));
    }
  }

  function activityDone(stars) {
    var s = Math.max(1, Math.min(3, (stars | 0) || 1));
    current.starsPer.push(s);

    // brief positive beat, then advance
    UI.confetti(14);
    current.i++;
    if (current.i < current.data.activities.length) {
      setTimeout(renderActivity, 650);
    } else {
      setTimeout(renderReward, 650);
    }
  }

  function renderReward() {
    var c = current;
    var avg = c.starsPer.reduce(function (a, b) { return a + b; }, 0) / c.starsPer.length;
    var total = Math.max(1, Math.min(3, Math.round(avg)));
    Storage.recordUnit(c.unitId, total);

    var entry = window.UNIT_INDEX[c.unitId];
    var mascot = entry ? entry.world.mascot : "#m-sprout";
    var mascotArt = entry ? (entry.world.mascotArt || mascot) : mascot;

    var bigStars = el("div.reward-stars", { "aria-label": "You earned " + total + " stars" });
    for (var i = 0; i < 3; i++) {
      var st = svgUse("#i-star", "reward-star" + (i < total ? " on" : ""));
      st.style.animationDelay = (i * 0.18) + "s";
      bigStars.appendChild(st);
    }

    var panel = el("div.panel reward", null, [
      art(mascotArt, "mascot mascot--float mascot--storybook", entry ? entry.world.mascotName + " mascot" : "Science mascot"),
      el("h2.title", { text: "You did it!" }),
      bigStars,
      el("p", { text: c.data.title ? ("Great work in " + c.data.title + "!") : "Great work!" }),
      el("div.reward-actions", null, [
        el("button.bigbtn ghost", { onclick: function () { start(c.unitId, { onExit: c.onExit }); } },
          [svgUse("#i-replay"), "Play again"]),
        el("button.bigbtn", { onclick: function () { c.onExit(); } },
          [svgUse("#i-home"), "More games"])
      ])
    ]);

    UI.setScreen(el("div.fill", null, [panel]));
    UI.confetti(40);
    Sound.narrate("You did it! You earned " + total + (total === 1 ? " star!" : " stars!"));
  }

  window.GameRunner = { start: start };
})();
