/* ============================================================
   app.js — flow controller. Cover -> Read -> Games -> Reward.
   Persistent top bar; karaoke reading; runs UNIT.games[] in order.
   ============================================================ */
(function () {
  "use strict";
  var el = UI.el, icon = UI.icon;
  var UNITS = window.UNITS || [];
  var U = null;                       // the active unit (set on selection)
  var app = document.getElementById("app");

  // tiny storage (localStorage with in-memory fallback)
  var mem = {};
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return mem[k]; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } }
  };
  Sound.setMuted(store.get("g1.muted") === "1");

  var PRAISE = ["Great!", "Nice!", "You got it!", "Yay!", "Well done!", "Super!"];
  var TRYAGAIN = ["Try again!", "Almost!", "Hmm, not that one.", "Have another look."];
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  var sessionStars = 0, maxStars = 0;

  /* ---------- shell ---------- */
  var bar = el("div", { "class": "topbar" });
  var starWrap = el("div", { "class": "star-count" });
  var soundBtn;
  var fullscreenBtn;
  var soundPrompt = el("button", { "class": "sound-start", "aria-label": "Play sound" });
  soundPrompt.appendChild(el("span", { "class": "sound-start-icon" }, icon("ic-speaker")));
  soundPrompt.appendChild(el("span", { "class": "sound-start-text", text: "Play sound" }));
  soundPrompt.addEventListener("click", function () {
    var hadPending = Sound.hasPending && Sound.hasPending();
    Sound.warmUp();
    if (!hadPending) Sound.narrate("Sound on.");
    syncSoundPrompt();
  });

  function syncSoundPrompt() {
    var hidden = Sound.isMuted() || (Sound.isWarmed && Sound.isWarmed());
    soundPrompt.hidden = hidden;
    document.body.classList.toggle("sound-start-visible", !hidden);
  }

  function buildBar() {
    UI.clear(bar);
    bar.appendChild(UI.iconButton("ic-home", "Home", showHome));
    // VoVo brand mark — taps back to portal grade selector
    var brandMark = el("a", { "class": "brand-mark", href: "../index.html", title: "Back to grade selector" });
    var logoImg = el("img", { "class": "brand-mini-img", src: "../assets/logo-mini.png", alt: "VoVo Science" });
    brandMark.appendChild(logoImg);
    bar.appendChild(brandMark);
    bar.appendChild(el("div", { "class": "bar-title", text: U ? U.question : "" }));
    if (U) {
      UI.clear(starWrap);
      starWrap.appendChild(icon("ic-star"));
      starWrap.appendChild(el("span", { text: sessionStars + "" }));
      bar.appendChild(starWrap);
    }
    soundBtn = UI.iconButton("ic-speaker", "Sound on/off", toggleSound);
    soundBtn.classList.toggle("muted", Sound.isMuted());
    bar.appendChild(soundBtn);
    syncSoundPrompt();
    if (canEnterFullscreen()) {
      fullscreenBtn = UI.iconButton(fullscreenElement() ? "ic-fullscreen-exit" : "ic-fullscreen", fullscreenElement() ? "Exit full screen" : "Full screen", toggleFullscreen);
      fullscreenBtn.setAttribute("aria-pressed", String(!!fullscreenElement()));
      bar.appendChild(fullscreenBtn);
    }
  }
  function toggleSound() {
    Sound.setMuted(!Sound.isMuted());
    store.set("g1.muted", Sound.isMuted() ? "1" : "0");
    soundBtn.classList.toggle("muted", Sound.isMuted());
    if (!Sound.isMuted()) Sound.narrate("Sound on.");
    syncSoundPrompt();
  }

  function fullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function canEnterFullscreen() {
    if (document.fullscreenEnabled === false || document.webkitFullscreenEnabled === false) return false;
    return !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
  }

  function syncFullscreenButton() {
    if (!fullscreenBtn) return;
    var active = !!fullscreenElement();
    fullscreenBtn.setAttribute("aria-pressed", String(active));
    fullscreenBtn.setAttribute("aria-label", active ? "Exit full screen" : "Enter full screen");
    fullscreenBtn.setAttribute("title", active ? "Exit full screen" : "Full screen");
    UI.clear(fullscreenBtn);
    fullscreenBtn.appendChild(icon(active ? "ic-fullscreen-exit" : "ic-fullscreen"));
  }

  function toggleFullscreen() {
    var root = document.documentElement;
    var action;
    if (fullscreenElement()) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) action = exit.call(document);
    } else {
      var request = root.requestFullscreen || root.webkitRequestFullscreen;
      if (request) action = request.call(root);
    }
    if (action && action.catch) action.catch(function () {});
  }

  var screen = el("div", { "class": "screen" });
  app.appendChild(bar);
  app.appendChild(screen);
  app.appendChild(soundPrompt);
  document.addEventListener("fullscreenchange", syncFullscreenButton);
  document.addEventListener("webkitfullscreenchange", syncFullscreenButton);

  function setScreen(name, node) {
    // NOTE: we deliberately do NOT cancel speech here. A cancel() immediately
    // before the next screen's speak() makes Chrome drop that speak (the
    // classic cancel->speak race) — which silenced the reading. Interrupting
    // is handled inside Sound.speak() itself (it only cancels when something
    // is actually playing, then re-speaks on a short delay). Home/mute stop
    // audio explicitly where it's safe.
    buildBar();
    UI.clear(screen);
    screen.className = "screen screen-" + name;
    screen.appendChild(node);
  }

  /* ---------- HOME (two levels: Big Idea picker -> week picker) ---------- */
  // Big-Idea metadata. Units carry bigIdea/week/kind; this supplies the
  // picker card's title, accent color, and art. A Big Idea with no built
  // units yet shows as "coming soon".
  var BIG_IDEAS = [
    { id: 1, title: "Living things have basic needs",       color: "#3E8E7E", icon: "ic-frog" },
    { id: 2, title: "Plants and animals live in many places", color: "#6E8B3D", icon: "ic-jungle" },
    { id: 3, title: "The sun, moon, and stars in our sky",  color: "#3B5BA5", icon: "ic-sun" },
    { id: 4, title: "Different seasons have different weather", color: "#E08A4A", icon: "ic-leaf" },
    { id: 5, title: "Objects can be solid, liquid, or gas", color: "#4F9DAE", icon: "ic-water" },
    { id: 6, title: "Motion can be changed by force",       color: "#8E5BA6", icon: "ic-ball" }
  ];

  function showHome() {
    Sound.stop();
    U = null; sessionStars = 0;
    document.documentElement.style.setProperty("--accent", "#3E8E7E");
    var wrap = el("div", { "class": "home" });
    var heroLogo = el("img", { "class": "home-vovo-logo", src: "../assets/logo-transparent.png", alt: "VoVo Science" });
    wrap.appendChild(heroLogo);
    wrap.appendChild(el("div", { "class": "home-badge", text: "Grade 1 · Daily Science" }));
    wrap.appendChild(el("h1", { "class": "home-title", text: "Pick a Big Idea!" }));
    var grid = el("div", { "class": "home-grid" });
    BIG_IDEAS.forEach(function (bi) {
      var count = UNITS.filter(function (u) { return u.bigIdea === bi.id; }).length;
      var c = el("button", { "class": "unit-card bi-card" + (count ? "" : " soon") });
      c.style.setProperty("--accent", bi.color);
      c.appendChild(el("div", { "class": "unit-badge", text: "Big Idea " + bi.id }));
      c.appendChild(el("div", { "class": "unit-art" }, icon(bi.icon || "ic-mascot")));
      c.appendChild(el("div", { "class": "unit-q", text: bi.title }));
      c.addEventListener("click", function () {
        Sound.warmUp();
        if (count) showBigIdea(bi); else Sound.narrate("Coming soon!");
      });
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    setScreen("home", wrap);
  }

  function showBigIdea(bi) {
    Sound.stop();
    U = null; sessionStars = 0;
    document.documentElement.style.setProperty("--accent", bi.color);
    var units = UNITS.filter(function (u) { return u.bigIdea === bi.id; });
    var wrap = el("div", { "class": "home" });
    var head = el("div", { "class": "bi-head" });
    head.appendChild(UI.iconButton("ic-back", "Back", showHome));
    head.appendChild(el("div", { "class": "home-badge", text: "Big Idea " + bi.id }));
    wrap.appendChild(head);
    wrap.appendChild(el("h1", { "class": "home-title", text: bi.title }));
    var grid = el("div", { "class": "home-grid" });
    units.forEach(function (u) {
      var c = el("button", { "class": "unit-card" });
      c.style.setProperty("--accent", u.color || bi.color);
      var badge = u.kind === "review" ? "Review" : u.kind === "handson" ? "Try it!" : "Week " + u.week;
      c.appendChild(el("div", { "class": "unit-badge", text: badge }));
      c.appendChild(el("div", { "class": "unit-art" }, icon(u.cardIcon || bi.icon || "ic-mascot")));
      c.appendChild(el("div", { "class": "unit-q", text: u.question }));
      c.addEventListener("click", function () { Sound.warmUp(); selectUnit(u); });
      grid.appendChild(c);
    });
    wrap.appendChild(grid);
    setScreen("home", wrap);
  }
  function selectUnit(u) {
    U = u;
    maxStars = u.games.length * 3;
    sessionStars = 0;
    document.documentElement.style.setProperty("--accent", u.color || "#3E8E7E");
    showCover();
  }
  // After the cover: read first if the unit has a passage, else go straight to play.
  function beginUnit() { if (U.reading) showReading(); else startGames(); }

  /* ---------- COVER ---------- */
  function showCover() {
    Sound.stop();   // safe here: the cover does not auto-speak, so no race.
    sessionStars = 0;
    var card = el("div", { "class": "cover" });
    var coverLogo = el("img", { "class": "cover-vovo-logo", src: "../assets/logo-mini.png", alt: "VoVo Science" });
    card.appendChild(coverLogo);
    card.appendChild(el("div", { "class": "cover-badge", text: "Big Idea " + U.bigIdea + " · Week " + U.week }));
    card.appendChild(el("div", { "class": "cover-mascot" }, icon("ic-mascot")));
    card.appendChild(el("h1", { "class": "cover-q", text: U.question }));
    card.appendChild(el("p", { "class": "cover-sub", text: U.bigIdeaTitle }));
    var start = el("button", { "class": "big-btn", text: U.reading ? "Let's read!" : "Let's go!" });
    start.appendChild(icon("ic-leaf"));
    start.addEventListener("click", function () { Sound.warmUp(); beginUnit(); });
    card.appendChild(start);
    setScreen("cover", card);
    // greet (after a gesture warmUp will flush)
    Sound.narrate(U.question);
  }

  /* ---------- READING (karaoke) ---------- */
  function showReading() {
    var wrap = el("div", { "class": "reading" });
    wrap.appendChild(el("h1", { "class": "read-title", text: U.reading.title }));

    var book = el("div", { "class": "book" });
    // Build lines; collect word spans with their char range in a joined text.
    var fullParts = [], spans = [], cursor = 0;
    U.reading.lines.forEach(function (line) {
      var row = el("div", { "class": "book-line" });
      var art = el("button", { "class": "line-art", "aria-label": line.text }, icon(line.icon));
      art.addEventListener("click", function () { Sound.warmUp(); Sound.say(line.text); });
      row.appendChild(art);
      var p = el("p", { "class": "line-text" });
      var words = line.text.split(/(\s+)/); // keep spaces
      words.forEach(function (tok) {
        if (/^\s+$/.test(tok)) { p.appendChild(document.createTextNode(tok)); cursor += tok.length; return; }
        var w = el("span", { "class": "word", text: tok });
        w._start = cursor; w._end = cursor + tok.length;
        w.addEventListener("click", function () { Sound.warmUp(); Sound.say(tok.replace(/[^A-Za-z]/g, "")); });
        spans.push(w);
        p.appendChild(w);
        cursor += tok.length;
      });
      // join lines with a space so charIndex is continuous
      fullParts.push(line.text);
      cursor += 1;
      row.appendChild(p);
      book.appendChild(row);
    });
    var fullText = fullParts.join(" ");
    wrap.appendChild(book);

    // controls
    var controls = el("div", { "class": "read-controls" });
    var readBtn = el("button", { "class": "big-btn read-aloud" });
    readBtn.appendChild(icon("ic-speaker"));
    readBtn.appendChild(document.createTextNode("Read to me"));
    var playBtn = el("button", { "class": "big-btn play-btn" });
    playBtn.appendChild(document.createTextNode("Play!"));
    playBtn.appendChild(icon("ic-star"));
    playBtn.addEventListener("click", function () { Sound.warmUp(); startGames(); });
    controls.appendChild(readBtn);
    controls.appendChild(playBtn);
    wrap.appendChild(controls);

    function clearHi() { spans.forEach(function (s) { s.classList.remove("hi"); }); }
    function highlightAt(ci, ciEnd) {
      // Range mode: light up every word whose start falls in [ci, ciEnd).
      if (ciEnd != null) {
        clearHi();
        var first = null;
        for (var k = 0; k < spans.length; k++) {
          if (spans[k]._start >= ci && spans[k]._start < ciEnd) {
            spans[k].classList.add("hi");
            if (!first) first = spans[k];
          }
        }
        if (first) {
          try { first.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {}
        }
        return;
      }
      // Single-word mode (synth boundary events, click-to-hear).
      for (var i = 0; i < spans.length; i++) {
        if (ci >= spans[i]._start && ci < spans[i]._end) {
          clearHi(); spans[i].classList.add("hi");
          spans[i].scrollIntoView({ block: "center", behavior: "smooth" });
          return;
        }
      }
    }
    function startRead() {
      Sound.warmUp();
      readBtn.classList.add("reading-now");
      playBtn.classList.remove("pulse");
      clearHi();
      Sound.narrateKaraoke(fullText, highlightAt, function () {
        clearHi(); readBtn.classList.remove("reading-now"); playBtn.classList.add("pulse");
      });
    }
    readBtn.addEventListener("click", startRead);

    setScreen("reading", wrap);
    // Start reading immediately — but SYNCHRONOUSLY, still inside the click
    // gesture that navigated here (cover "Let's read!" / reward "Play again").
    // A setTimeout here would orphan the speak from the gesture and Chrome
    // would silently block it. Nothing is speaking/pending at this point, so
    // speak() takes its synchronous branch and the audio actually plays.
    startRead();
  }

  /* ---------- GAMES ---------- */
  var gameIndex = 0;
  function startGames() { gameIndex = 0; sessionStars = 0; mountGame(); }

  function mountGame() {
    if (gameIndex >= U.games.length) { showReward(); return; }
    var data = U.games[gameIndex];
    var stageWrap = el("div", { "class": "game-screen" });
    var progress = el("div", { "class": "game-progress" });
    U.games.forEach(function (_, i) {
      progress.appendChild(el("span", { "class": "dot" + (i < gameIndex ? " on" : i === gameIndex ? " cur" : "") }));
    });
    stageWrap.appendChild(progress);
    var stage = el("div", { "class": "stage" });
    stageWrap.appendChild(stage);
    setScreen("game", stageWrap);

    var done = false;
    var api = {
      narrate: function (t) { Sound.narrate(t); },
      praise: function () {
        var r = stage.getBoundingClientRect();
        UI.burst(r.left + r.width / 2, r.top + r.height / 3);
        Sound.narrate(pick(PRAISE));
      },
      mistake: function (msg) { Sound.narrate(msg || pick(TRYAGAIN)); },
      complete: function (stars) {
        if (done) return; done = true;
        sessionStars += stars;
        flashStars(stars, function () { gameIndex++; mountGame(); });
      }
    };
    try { Engines[data.engine](stage, data, api); }
    catch (e) { /* a child must never get stuck — skip on error */ console.error(e); gameIndex++; mountGame(); }
  }

  // brief star celebration between games
  function flashStars(stars, next) {
    var ov = el("div", { "class": "star-burst" });
    for (var i = 0; i < 3; i++) {
      var s = icon("ic-star", i < stars ? "won" : "lost");
      s.style.animationDelay = (i * 0.16) + "s";
      ov.appendChild(s);
    }
    screen.appendChild(ov);
    Sound.narrate(stars === 3 ? "Three stars! Amazing!" : pick(PRAISE));
    setTimeout(function () { ov.remove(); next(); }, 1400);
  }

  /* ---------- REWARD ---------- */
  function showReward() {
    var prevBest = parseInt(store.get("g1.best") || "0", 10);
    if (sessionStars > prevBest) store.set("g1.best", sessionStars + "");

    var card = el("div", { "class": "reward" });
    card.appendChild(el("div", { "class": "reward-mascot" }, icon("ic-mascot")));
    card.appendChild(el("h1", { text: "You did it!" }));
    var row = el("div", { "class": "reward-stars" });
    for (var i = 0; i < maxStars; i++) {
      var s = icon("ic-star", i < sessionStars ? "won" : "lost");
      s.style.animationDelay = (i * 0.08) + "s";
      row.appendChild(s);
    }
    card.appendChild(row);
    card.appendChild(el("p", { "class": "reward-score", text: sessionStars + " of " + maxStars + " stars" }));

    var again = el("button", { "class": "big-btn", text: "Play again" });
    again.addEventListener("click", function () { Sound.warmUp(); beginUnit(); });
    var homeB = el("button", { "class": "big-btn ghost", text: "More units" });
    homeB.appendChild(icon("ic-home"));
    homeB.addEventListener("click", function () { Sound.warmUp(); showHome(); });
    card.appendChild(el("div", { "class": "reward-btns" }, [again, homeB]));

    setScreen("reward", card);
    Sound.narrate("Hooray! You earned " + sessionStars + " stars!");
  }

  /* ---------- boot ---------- */
  showHome();
  syncSoundPrompt();
})();
