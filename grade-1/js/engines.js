/* ============================================================
   engines.js — the review minigames. window.Engines
   Each engine: mount(stage, data, api)
     stage = container element to build into
     data  = the game object from UNIT.games[]
     api   = { narrate(text), praise(), complete(stars), mistake() }
   Engines know nothing about navigation or each other — pure, data-driven.

   Scoring (forgiving, from the book): 0 mistakes -> 3 stars, <=2 -> 2,
   else 1. Never 0 — young children are always rewarded for finishing.
   ============================================================ */
(function () {
  "use strict";
  var el = UI.el, icon = UI.icon, tile = UI.tile;

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function starsFor(mistakes) { return mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1; }
  function shake(node) { node.classList.remove("shake"); void node.offsetWidth; node.classList.add("shake"); }

  var Engines = {};

  /* ---- helper: a heading row with prompt + replay button ---- */
  function header(data, api) {
    var h = el("div", { "class": "game-head" });
    h.appendChild(el("h2", { "class": "game-title", text: data.title }));
    var p = el("p", { "class": "game-prompt", text: data.prompt });
    var replay = el("button", { "class": "mini-replay", "aria-label": "Hear again" }, icon("ic-speaker"));
    replay.addEventListener("click", function () { Sound.warmUp(); Sound.say(data.narration || data.prompt); });
    p.appendChild(replay);
    h.appendChild(p);
    return h;
  }

  /* ============ SORT: living vs nonliving ============ */
  Engines.sort = function (stage, data, api) {
    var mistakes = 0, remaining = data.items.length, selected = null;
    stage.appendChild(header(data, api));

    var bins = el("div", { "class": "sort-bins" });
    var binEls = {};
    data.bins.forEach(function (b) {
      var bin = el("div", { "class": "basket", "data-bin": b.id });
      bin.appendChild(el("div", { "class": "basket-art" }, icon(b.icon)));
      bin.appendChild(el("div", { "class": "basket-label", text: b.label }));
      bin.appendChild(el("div", { "class": "basket-catch" }));
      bin.addEventListener("click", function () { tryDrop(b.id, bin); });
      binEls[b.id] = bin;
      bins.appendChild(bin);
    });
    stage.appendChild(bins);

    var tray = el("div", { "class": "tray" });
    shuffle(data.items).forEach(function (item) {
      var t = tile(item.icon, item.label, { onClick: function () { select(item, t); } });
      t._item = item;
      tray.appendChild(t);
    });
    stage.appendChild(tray);
    api.narrate(data.narration);

    function select(item, node) {
      if (node.classList.contains("placed")) return;
      Array.prototype.forEach.call(tray.children, function (c) { c.classList.remove("picked"); });
      selected = { item: item, node: node };
      node.classList.add("picked");
      Sound.say(item.label);
    }
    function tryDrop(binId, binNode) {
      if (!selected) { shake(binNode); return; }
      if (selected.item.bin === binId) {
        selected.node.classList.add("placed");
        binNode.querySelector(".basket-catch").appendChild(icon(selected.item.icon, "caught"));
        api.praise();
        selected = null;
        if (--remaining === 0) setTimeout(function () { api.complete(starsFor(mistakes)); }, 500);
      } else {
        mistakes++; shake(binNode); api.mistake();
      }
    }
  };

  /* ============ MATCH: baby -> grown ============ */
  Engines.match = function (stage, data, api) {
    var mistakes = 0, remaining = data.pairs.length, selected = null;
    stage.appendChild(header(data, api));

    var board = el("div", { "class": "match-board" });
    var left = el("div", { "class": "match-col" });
    var right = el("div", { "class": "match-col" });

    // _key = the pair's index in data.pairs, so a left tile and its matching
    // right tile share a key. Each column is shuffled independently.
    shuffle(data.pairs).forEach(function (p) {
      var key = data.pairs.indexOf(p);
      var f = tile(p.from.icon, p.from.label, { cls: "match-tile" });
      f._key = key; f._side = "from";
      f.addEventListener("click", function () { pick(f); });
      left.appendChild(f);
    });
    shuffle(data.pairs).forEach(function (p) {
      var key = data.pairs.indexOf(p);
      var g = tile(p.to.icon, p.to.label, { cls: "match-tile" });
      g._key = key; g._side = "to";
      g.addEventListener("click", function () { pick(g); });
      right.appendChild(g);
    });

    board.appendChild(left); board.appendChild(right);
    stage.appendChild(board);
    api.narrate(data.narration);

    function pick(node) {
      if (node.classList.contains("locked")) return;
      Sound.say(node.querySelector(".tile-cap").textContent);
      if (!selected) {
        clearPick();
        selected = node; node.classList.add("picked");
        return;
      }
      if (selected === node) { clearPick(); selected = null; return; }
      if (selected._side === node._side) { // re-select same side
        clearPick(); selected = node; node.classList.add("picked"); return;
      }
      // one from + one to
      if (selected._key === node._key) {
        selected.classList.remove("picked"); selected.classList.add("locked");
        node.classList.add("locked");
        api.praise();
        selected = null;
        if (--remaining === 0) setTimeout(function () { api.complete(starsFor(mistakes)); }, 500);
      } else {
        mistakes++; shake(node); shake(selected); api.mistake();
        clearPick(); selected = null;
      }
    }
    function clearPick() {
      Array.prototype.forEach.call(board.querySelectorAll(".picked"), function (n) { n.classList.remove("picked"); });
    }
  };

  /* ============ NEEDS: tap what it needs to survive ============ */
  Engines.needs = function (stage, data, api) {
    var mistakes = 0;
    var needCount = data.choices.filter(function (c) { return c.need; }).length;
    var found = 0;
    stage.appendChild(header(data, api));

    var hero = el("div", { "class": "needs-hero" }, icon(data.hero, "hero"));
    stage.appendChild(hero);

    var row = el("div", { "class": "needs-row" });
    shuffle(data.choices).forEach(function (c) {
      var t = tile(c.icon, c.label);
      t.addEventListener("click", function () {
        if (t.classList.contains("done")) return;
        Sound.warmUp();
        if (c.need) {
          t.classList.add("done", "good");
          t.appendChild(el("div", { "class": "badge" }, icon("ic-check")));
          api.praise();
          if (++found === needCount) setTimeout(function () { api.complete(starsFor(mistakes)); }, 500);
        } else {
          mistakes++; shake(t);
          t.classList.add("done", "bad");
          t.appendChild(el("div", { "class": "badge" }, icon("ic-x")));
          api.mistake(data.wrongMsg ? data.wrongMsg.replace("{x}", c.label) : null);
        }
      });
      row.appendChild(t);
    });
    stage.appendChild(row);
    api.narrate(data.narration);
  };

  /* ============ CLOZE: TAP a word to hear it, then DRAG it to the blank ============
     Pre-readers can't read the words, so a TAP reads the word aloud; a DRAG
     (pointer events → works on touch + mouse) drops it into the blank. */
  Engines.cloze = function (stage, data, api) {
    var mistakes = 0, idx = 0, locked = false;
    stage.appendChild(header(data, api));

    var card = el("div", { "class": "cloze-card" });
    stage.appendChild(card);

    var bank = el("div", { "class": "cloze-bank" });
    shuffle(data.bank).forEach(function (w) {
      var b = el("button", { "class": "bank-word", text: w });
      makeDraggable(b, w);
      bank.appendChild(b);
    });
    stage.appendChild(bank);

    render();
    api.narrate(data.narration);

    function render() {
      UI.clear(card);
      if (idx >= data.sentences.length) { api.complete(starsFor(mistakes)); return; }
      var s = data.sentences[idx];
      card.appendChild(el("div", { "class": "cloze-art" }, icon(s.icon, "hero")));
      var sent = el("div", { "class": "cloze-sentence" });
      sent.appendChild(el("span", { text: s.before + " " }));
      var slot = el("span", { "class": "cloze-slot", text: "?" });
      sent.appendChild(slot);
      sent.appendChild(el("span", { text: s.after }));
      card.appendChild(sent);
      card.appendChild(el("div", { "class": "read-count", text: (idx + 1) + " / " + data.sentences.length }));
      card._slot = slot;
    }

    function hit(node, x, y) {
      var r = node.getBoundingClientRect(), pad = 28;
      return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad;
    }

    function makeDraggable(btn, word) {
      var sx = null, sy = null, dragging = false, ghost = null;
      btn.style.touchAction = "none";   // let us own the gesture (no scroll steal)
      btn.addEventListener("pointerdown", function (e) {
        if (btn.disabled || locked) return;
        sx = e.clientX; sy = e.clientY; dragging = false;
        try { btn.setPointerCapture(e.pointerId); } catch (_) {}
      });
      btn.addEventListener("pointermove", function (e) {
        if (sx == null) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (!dragging && dx * dx + dy * dy > 64) {   // moved > 8px → start a drag
          dragging = true;
          Sound.warmUp();
          ghost = btn.cloneNode(true);
          ghost.classList.add("drag-ghost"); ghost.removeAttribute("disabled");
          document.body.appendChild(ghost);
          btn.classList.add("drag-src");
        }
        if (dragging && ghost) {
          ghost.style.left = e.clientX + "px";
          ghost.style.top = e.clientY + "px";
          if (card._slot) card._slot.classList.toggle("drop-hover", hit(card._slot, e.clientX, e.clientY));
        }
      });
      btn.addEventListener("pointerup", function (e) {
        if (sx == null) return;
        var wasDrag = dragging;
        if (ghost) { ghost.remove(); ghost = null; }
        btn.classList.remove("drag-src");
        if (card._slot) card._slot.classList.remove("drop-hover");
        try { btn.releasePointerCapture(e.pointerId); } catch (_) {}
        var ex = e.clientX, ey = e.clientY;
        sx = sy = null; dragging = false;
        if (!wasDrag) { Sound.warmUp(); Sound.say(word); }                 // TAP = hear it
        else if (card._slot && hit(card._slot, ex, ey)) attempt(word, btn); // DROP on blank = answer
      });
      btn.addEventListener("pointercancel", function () {
        if (ghost) { ghost.remove(); ghost = null; }
        btn.classList.remove("drag-src");
        if (card._slot) card._slot.classList.remove("drop-hover");
        sx = sy = null; dragging = false;
      });
    }

    function attempt(word, btn) {
      if (locked || btn.disabled) return;
      var s = data.sentences[idx];
      if (word === s.answer) {
        locked = true;
        card._slot.textContent = word; card._slot.classList.add("filled");
        btn.classList.add("used"); btn.disabled = true;
        api.praise();
        setTimeout(function () { Sound.narrate(s.before + " " + word + s.after); }, 700);
        idx++;
        setTimeout(function () { locked = false; render(); }, 1500);
      } else {
        mistakes++; shake(card._slot); api.mistake("Try another word.");
      }
    }
  };

  /* ============ TRUEFALSE: hear a statement, tap YES or NO ============
     The signature Week-2 style. Pictures + an auto-read statement support
     pre-readers; tap the statement to hear it again. */
  Engines.truefalse = function (stage, data, api) {
    var mistakes = 0, idx = 0, locked = false;
    stage.appendChild(header(data, api));

    var card = el("div", { "class": "tf-card" });
    stage.appendChild(card);

    var btns = el("div", { "class": "tf-btns" });
    var yes = el("button", { "class": "tf-btn yes" });
    yes.appendChild(icon("ic-check")); yes.appendChild(el("span", { text: "Yes" }));
    var no = el("button", { "class": "tf-btn no" });
    no.appendChild(icon("ic-x")); no.appendChild(el("span", { text: "No" }));
    yes.addEventListener("click", function () { answer(true, yes); });
    no.addEventListener("click", function () { answer(false, no); });
    btns.appendChild(yes); btns.appendChild(no);
    stage.appendChild(btns);

    render();
    api.narrate(data.narration);
    readStatement();

    function readStatement() { var r = data.rounds[idx]; if (r) Sound.narrate(r.text); }

    function render() {
      UI.clear(card);
      locked = false;
      yes.classList.remove("good", "bad"); no.classList.remove("good", "bad");
      if (idx >= data.rounds.length) { btns.style.display = "none"; api.complete(starsFor(mistakes)); return; }
      var r = data.rounds[idx];
      var arts = el("div", { "class": "tf-arts" });
      (r.icons || []).forEach(function (ic) { arts.appendChild(el("div", { "class": "tf-art" }, icon(ic, "hero"))); });
      card.appendChild(arts);
      var sentence = el("button", { "class": "tf-sentence", text: r.text });
      sentence.addEventListener("click", function () { Sound.warmUp(); Sound.say(r.text); });
      card.appendChild(sentence);
      card.appendChild(el("div", { "class": "read-count", text: (idx + 1) + " / " + data.rounds.length }));
    }

    function answer(val, btn) {
      if (locked || idx >= data.rounds.length) return;
      Sound.warmUp();
      var r = data.rounds[idx];
      if (val === r.answer) {
        locked = true; btn.classList.add("good"); api.praise();
        idx++;
        setTimeout(function () { render(); readStatement(); }, 850);
      } else {
        mistakes++; shake(btn); btn.classList.add("bad"); api.mistake();
        setTimeout(function () { btn.classList.remove("bad"); }, 500);
      }
    }
  };

  /* ============ SEQUENCE: tap the pictures in the right order ============
     The array order in data.steps IS the correct order; cards are shuffled.
     Child taps cards in order; each correct tap fills the next slot. */
  Engines.sequence = function (stage, data, api) {
    var mistakes = 0, next = 0, n = data.steps.length;
    stage.appendChild(header(data, api));

    var track = el("div", { "class": "seq-track" });
    var slots = [];
    data.steps.forEach(function (_, i) {
      if (i) track.appendChild(el("div", { "class": "seq-arrow", text: "→" }));
      var slot = el("div", { "class": "seq-slot" }, el("span", { "class": "seq-num", text: (i + 1) + "" }));
      slots.push(slot); track.appendChild(slot);
    });
    stage.appendChild(track);

    var tray = el("div", { "class": "seq-tray" });
    shuffle(data.steps.map(function (s, i) { return { s: s, i: i }; })).forEach(function (o) {
      var t = tile(o.s.icon, o.s.label, { onClick: function () { tap(o, t); } });
      tray.appendChild(t);
    });
    stage.appendChild(tray);
    api.narrate(data.narration);

    function tap(o, node) {
      if (node.classList.contains("placed")) return;
      Sound.say(o.s.label);
      if (o.i === next) {
        node.classList.add("placed");
        var slot = slots[next];
        UI.clear(slot);
        slot.appendChild(icon(o.s.icon));
        slot.appendChild(el("div", { "class": "seq-cap", text: o.s.label }));
        slot.classList.add("filled");
        api.praise();
        if (++next === n) setTimeout(function () { api.complete(starsFor(mistakes)); }, 600);
      } else {
        mistakes++; shake(node); api.mistake("Which one comes next?");
      }
    }
  };

  /* ============ READWORD: see a picture, tap the word that names it ============
     Reuses the .read-card / .read-art / .read-opts / .word-btn styles. */
  Engines.readword = function (stage, data, api) {
    var mistakes = 0, idx = 0, locked = false;
    stage.appendChild(header(data, api));
    var card = el("div", { "class": "read-card" });
    stage.appendChild(card);
    render();
    api.narrate(data.narration);

    function render() {
      UI.clear(card); locked = false;
      if (idx >= data.rounds.length) { api.complete(starsFor(mistakes)); return; }
      var r = data.rounds[idx];
      card.appendChild(el("div", { "class": "read-art" }, icon(r.icon, "hero")));
      var opts = el("div", { "class": "read-opts" });
      shuffle(r.options).forEach(function (w) {
        var b = el("button", { "class": "word-btn", text: w });
        b.addEventListener("click", function () { choose(w, b, r); });
        opts.appendChild(b);
      });
      card.appendChild(opts);
      card.appendChild(el("div", { "class": "read-count", text: (idx + 1) + " / " + data.rounds.length }));
    }
    function choose(w, btn, r) {
      if (locked || btn.disabled) return;
      Sound.warmUp(); Sound.say(w);
      if (w === r.answer) {
        locked = true; btn.classList.add("good"); api.praise();
        idx++; setTimeout(render, 850);
      } else {
        mistakes++; shake(btn); btn.classList.add("bad"); btn.disabled = true; api.mistake();
      }
    }
  };

  /* ============ THERMOMETER: drag the level to freeze water / melt ice ============ */
  Engines.thermometer = function (stage, data, api) {
    var mistakes = 0, idx = 0, locked = false;
    var freeze = data.freeze || 32, MINT = 0, MAXT = 100, temp = 60;
    stage.appendChild(header(data, api));

    var wrap = el("div", { "class": "therm-wrap" });
    var task = el("div", { "class": "therm-task" });
    wrap.appendChild(task);

    var col = el("div", { "class": "therm-col" });
    var tube = el("div", { "class": "therm-tube" });
    var fill = el("div", { "class": "therm-fill" });
    var line = el("div", { "class": "therm-line" }, icon("ic-snowflake"));
    tube.appendChild(fill); tube.appendChild(line);
    col.appendChild(tube); col.appendChild(el("div", { "class": "therm-bulb" }));
    wrap.appendChild(col);

    var readout = el("div", { "class": "therm-read" });
    wrap.appendChild(readout);
    stage.appendChild(wrap);

    function setTemp(t) {
      temp = Math.max(MINT, Math.min(MAXT, t));
      fill.style.height = ((temp - MINT) / (MAXT - MINT) * 100) + "%";
      line.style.bottom = ((freeze - MINT) / (MAXT - MINT) * 100) + "%";
      var frozen = temp <= freeze;
      UI.clear(readout);
      readout.appendChild(icon(frozen ? "ic-ice-cube" : "ic-water", "hero"));
      readout.appendChild(el("div", { "class": "therm-state", text: frozen ? "Frozen!" : "Liquid" }));
      readout.classList.toggle("is-frozen", frozen);
    }
    function tempFromY(clientY) {
      var r = tube.getBoundingClientRect();
      return MINT + (1 - (clientY - r.top) / r.height) * (MAXT - MINT);
    }
    var dragging = false;
    tube.style.touchAction = "none";
    tube.addEventListener("pointerdown", function (e) { dragging = true; Sound.warmUp(); try { tube.setPointerCapture(e.pointerId); } catch (_) {} setTemp(tempFromY(e.clientY)); });
    tube.addEventListener("pointermove", function (e) { if (dragging) setTemp(tempFromY(e.clientY)); });
    tube.addEventListener("pointerup", function (e) { if (!dragging) return; dragging = false; try { tube.releasePointerCapture(e.pointerId); } catch (_) {} check(); });
    tube.addEventListener("pointercancel", function () { dragging = false; });

    setTemp(temp);
    render();
    api.narrate(data.narration);

    function render() {
      locked = false;
      if (idx >= data.rounds.length) { api.complete(starsFor(mistakes)); return; }
      var r = data.rounds[idx];
      UI.clear(task);
      task.appendChild(el("div", { "class": "therm-prompt", text: r.label }));
      task.appendChild(el("div", { "class": "read-count", text: (idx + 1) + " / " + data.rounds.length }));
    }
    function check() {
      if (locked || idx >= data.rounds.length) return;
      var r = data.rounds[idx];
      var ok = r.want === "below" ? temp <= freeze : temp > freeze;
      if (ok) { locked = true; api.praise(); idx++; setTimeout(render, 900); }
      else { mistakes++; shake(tube); api.mistake(r.want === "below" ? "Colder! Drag it below the snowflake." : "Warmer! Drag it above the snowflake."); }
    }
  };

  /* ============ COMPARE: which force sends it farther? ============ */
  Engines.compare = function (stage, data, api) {
    var mistakes = 0, idx = 0, launched = false, locked = false, laneA, laneB;
    stage.appendChild(header(data, api));
    var arena = el("div", { "class": "cmp-arena" });
    stage.appendChild(arena);
    var go = el("button", { "class": "big-btn cmp-go", text: "Go!" });
    go.appendChild(icon("ic-energy"));
    go.addEventListener("click", function () { Sound.warmUp(); launch(); });
    stage.appendChild(go);
    render();
    api.narrate(data.narration);

    function lane(side, info) {
      var ln = el("div", { "class": "cmp-lane" });
      ln.appendChild(el("div", { "class": "cmp-label", text: info.label }));
      var track = el("div", { "class": "cmp-track" });
      var obj = el("div", { "class": "cmp-obj" }, icon(info.icon, "hero"));
      track.appendChild(obj); ln.appendChild(track);
      ln.addEventListener("click", function () { if (launched && !locked) choose(side, ln); });
      ln._obj = obj; ln._track = track;
      return ln;
    }
    function render() {
      launched = false; locked = false;
      UI.clear(arena);
      if (idx >= data.scenarios.length) { api.complete(starsFor(mistakes)); return; }
      var s = data.scenarios[idx];
      laneA = lane("a", s.a); laneB = lane("b", s.b);
      arena.appendChild(laneA); arena.appendChild(laneB);
      arena.appendChild(el("div", { "class": "read-count", text: (idx + 1) + " / " + data.scenarios.length }));
      go.style.display = "";
    }
    function launch() {
      if (launched) return; launched = true;
      var s = data.scenarios[idx], maxF = Math.max(s.a.force, s.b.force);
      [[laneA, s.a], [laneB, s.b]].forEach(function (p) {
        var ln = p[0], info = p[1];
        var w = ln._track.clientWidth - ln._obj.offsetWidth - 14;
        ln._obj.style.transform = "translate(" + ((info.force / maxF) * Math.max(40, w)) + "px, -50%)";
      });
      go.style.display = "none";
      setTimeout(function () { api.narrate("Which one went farther? Tap it!"); }, 700);
    }
    function choose(side, ln) {
      if (locked) return;
      if (side === data.scenarios[idx].farther) {
        locked = true; ln.classList.add("pick"); api.praise(); idx++; setTimeout(render, 1000);
      } else { mistakes++; shake(ln); api.mistake("Look again — which went farther?"); }
    }
  };

  /* ============ PATHDRAW: steer the car to the goal with the arrow pad ============ */
  Engines.pathdraw = function (stage, data, api) {
    var mistakes = 0, idx = 0, cur, R;
    stage.appendChild(header(data, api));
    var board = el("div", { "class": "pg-board" });
    stage.appendChild(board);
    var pad = el("div", { "class": "pg-pad" });
    [["up", "↑"], ["left", "←"], ["down", "↓"], ["right", "→"]].forEach(function (d) {
      var b = el("button", { "class": "pg-btn pg-" + d[0], text: d[1] });
      b.addEventListener("click", function () { Sound.warmUp(); move(d[0]); });
      pad.appendChild(b);
    });
    stage.appendChild(pad);
    render();
    api.narrate(data.narration);

    function isObst(c, r) { return (R.obstacles || []).some(function (o) { return o[0] === c && o[1] === r; }); }
    function render() {
      if (idx >= data.rounds.length) { api.complete(starsFor(mistakes)); return; }
      R = data.rounds[idx];
      cur = { c: R.start[0], r: R.start[1] };
      UI.clear(board);
      board.style.gridTemplateColumns = "repeat(" + R.cols + ", 1fr)";
      board._cells = {};
      for (var r = 0; r < R.rows; r++) for (var c = 0; c < R.cols; c++) {
        var cell = el("div", { "class": "pg-cell" });
        if (isObst(c, r)) { cell.classList.add("obst"); cell.appendChild(icon(R.obstacleIcon || "ic-rock")); }
        if (c === R.goal[0] && r === R.goal[1]) { cell.classList.add("goal"); cell.appendChild(icon(R.goalIcon || "ic-star")); }
        board._cells[c + "," + r] = cell;
        board.appendChild(cell);
      }
      placeCar();
    }
    function placeCar() {
      var old = board.querySelector(".pg-car"); if (old) old.remove();
      board._cells[cur.c + "," + cur.r].appendChild(el("div", { "class": "pg-car" }, icon(R.carIcon || "ic-car", "hero")));
    }
    function move(d) {
      var nc = cur.c + (d === "left" ? -1 : d === "right" ? 1 : 0);
      var nr = cur.r + (d === "up" ? -1 : d === "down" ? 1 : 0);
      if (nc < 0 || nr < 0 || nc >= R.cols || nr >= R.rows || isObst(nc, nr)) {
        mistakes++; api.mistake("That way is blocked!");
        var car = board.querySelector(".pg-car"); if (car) shake(car); return;
      }
      cur.c = nc; cur.r = nr; placeCar();
      if (cur.c === R.goal[0] && cur.r === R.goal[1]) { api.praise(); idx++; setTimeout(render, 800); }
    }
  };

  /* ============ GRAVITYPATH: tap where it will land ============ */
  Engines.gravitypath = function (stage, data, api) {
    var mistakes = 0, idx = 0, locked = false;
    stage.appendChild(header(data, api));
    var scene = el("div", { "class": "gp-scene" });
    var spots = el("div", { "class": "gp-spots" });
    stage.appendChild(scene); stage.appendChild(spots);
    render();
    api.narrate(data.narration);

    function render() {
      locked = false; UI.clear(scene); UI.clear(spots);
      if (idx >= data.rounds.length) { api.complete(starsFor(mistakes)); return; }
      var r = data.rounds[idx];
      var path = el("div", { "class": "gp-path gp-" + (r.path || "drop") });
      if (r.path === "slide") path.appendChild(icon("ic-slide"));
      if (r.path === "swing") path.appendChild(icon("ic-swing"));
      scene.appendChild(path);
      scene._obj = el("div", { "class": "gp-obj" }, icon(r.icon || "ic-ball", "hero"));
      scene.appendChild(scene._obj);
      var n = r.targets || 3;
      for (var i = 0; i < n; i++) (function (i) {
        var spot = el("button", { "class": "gp-spot" }, icon("ic-target"));
        spot.addEventListener("click", function () { choose(i, spot, r); });
        spots.appendChild(spot);
      })(i);
      scene._spots = Array.prototype.slice.call(spots.children);
    }
    function choose(i, spot, r) {
      if (locked) return; locked = true; Sound.warmUp();
      var target = scene._spots[r.answer];
      var sb = scene.getBoundingClientRect(), tb = target.getBoundingClientRect();
      var dx = (tb.left + tb.width / 2) - (sb.left + sb.width / 2), dy = (tb.top - sb.top) + 6;
      scene._obj.style.transform = "translate(calc(-50% + " + dx + "px), " + dy + "px)";
      target.classList.add("landed");
      if (i === r.answer) { setTimeout(api.praise, 500); idx++; setTimeout(render, 1300); }
      else { mistakes++; spot.classList.add("wrong"); api.mistake("Watch where it lands!"); idx++; setTimeout(render, 1500); }
    }
  };

  /* ============ HANDSON: a 'try it at home' activity card (no scoring pressure) ============ */
  Engines.handson = function (stage, data, api) {
    var card = el("div", { "class": "handson" });
    card.appendChild(el("div", { "class": "handson-art" }, icon(data.icon || "ic-mascot", "hero")));
    card.appendChild(el("h2", { "class": "handson-title", text: data.title }));
    if (data.materials && data.materials.length) {
      card.appendChild(el("div", { "class": "handson-sub", text: "What you need" }));
      var mats = el("div", { "class": "handson-mats" });
      data.materials.forEach(function (m) {
        var t = el("div", { "class": "handson-mat" });
        t.appendChild(el("div", { "class": "handson-mat-art" }, icon(m.icon)));
        t.appendChild(el("div", { text: m.label }));
        mats.appendChild(t);
      });
      card.appendChild(mats);
    }
    card.appendChild(el("div", { "class": "handson-sub", text: "Steps" }));
    var steps = el("ol", { "class": "handson-steps" });
    (data.steps || []).forEach(function (s) { steps.appendChild(el("li", { text: s })); });
    card.appendChild(steps);
    var done = el("button", { "class": "big-btn", text: "I did it!" });
    done.appendChild(icon("ic-check"));
    done.addEventListener("click", function () { Sound.warmUp(); api.complete(3); });
    card.appendChild(done);
    stage.appendChild(card);
    api.narrate(data.narration || data.title);
  };

  window.Engines = Engines;
})();
