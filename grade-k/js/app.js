/* ============================================================
   app.js — boot, hash router, top bar, screen rendering
   Screens (hash-routed, file:// safe):
     #/                  Home   (3 worlds)
     #/world/<worldId>   World  (5 unit cards)
     #/unit/<unitId>     Game   (runner in M1; placeholder until content exists)
   Depends on: Storage, Sound, UI, Engine, WORLDS.
   ============================================================ */
(function () {
  "use strict";

  var UI = window.UI, Sound = window.Sound, Storage = window.Storage;
  var el = UI.el, svgUse = UI.svgUse, art = UI.art;

  /* ---------- Top bar elements ---------- */
  var topbar      = document.getElementById("topbar");
  var btnHome     = document.getElementById("btn-home");
  var btnBack     = document.getElementById("btn-back");
  var btnSound    = document.getElementById("btn-sound");
  var btnFullscreen = document.getElementById("btn-fullscreen");
  var elTitle     = document.getElementById("topbar-title");
  var elStarNum   = document.getElementById("starcount-num");

  /* ---------- Routing ---------- */
  function go(hash) { window.location.hash = hash; }

  function parseRoute() {
    var h = (window.location.hash || "").replace(/^#/, "");
    var parts = h.split("/").filter(Boolean); // ["world","life"]
    if (parts[0] === "world" && parts[1]) return { name: "world", worldId: parts[1] };
    if (parts[0] === "unit" && parts[1])  return { name: "unit",  unitId: parts[1] };
    return { name: "home" };
  }

  function render() {
    var route = parseRoute();
    if (route.name === "world") return renderWorld(route.worldId);
    if (route.name === "unit")  return renderUnit(route.unitId);
    return renderHome();
  }

  /* ---------- Top bar state ---------- */
  function setWorldTheme(worldId) {
    document.body.setAttribute("data-world", worldId || "home");
  }

  function updateTopbar(opts) {
    topbar.hidden = false;
    elTitle.textContent = opts.title || "";
    btnBack.hidden = !opts.back;
    btnHome.hidden = !opts.showHome;
    elStarNum.textContent = Storage.totalStars();
    syncSoundButton();
  }

  function syncSoundButton() {
    var muted = Sound.isMuted();
    btnSound.setAttribute("aria-pressed", String(!muted));
    btnSound.setAttribute("aria-label", muted ? "Turn sound on" : "Turn sound off");
    var use = btnSound.querySelector("use");
    var ref = muted ? "#i-sound-off" : "#i-sound-on";
    use.setAttribute("href", ref);
    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", ref);
  }

  function fullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function canEnterFullscreen() {
    if (document.fullscreenEnabled === false || document.webkitFullscreenEnabled === false) return false;
    return !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
  }

  function syncFullscreenButton() {
    if (!btnFullscreen) return;
    var active = !!fullscreenElement();
    btnFullscreen.setAttribute("aria-pressed", String(active));
    btnFullscreen.setAttribute("aria-label", active ? "Exit full screen" : "Enter full screen");
    btnFullscreen.setAttribute("title", active ? "Exit full screen" : "Full screen");
    var use = btnFullscreen.querySelector("use");
    var ref = active ? "#i-fullscreen-exit" : "#i-fullscreen";
    use.setAttribute("href", ref);
    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", ref);
  }

  function toggleFullscreen() {
    var root = document.documentElement;
    if (fullscreenElement()) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) return exit.call(document);
      return;
    }
    var request = root.requestFullscreen || root.webkitRequestFullscreen;
    if (request) return request.call(root);
  }

  /* ---------- HOME ---------- */
  function renderHome() {
    setWorldTheme("home");
    updateTopbar({ title: "Science Play", back: false, showHome: false });

    var head = el("div.screen-head", null, [
      el("div", null, [
        art("assets/mascots/sprout-storybook.jpg", "mascot mascot--float mascot--storybook", "Sprout mascot"),
      ]),
      el("div.brand-hero", null, [
        el("img.brand-hero-img", { src: "assets/logo-transparent.png", alt: "VoVo Science" }),
        el("p.brand-hero-sub", { text: "Pick a world and start playing!" })
      ]),
      el("div", null, [
        art("assets/mascots/skye-storybook.jpg", "mascot mascot--float mascot--storybook", "Skye mascot"),
      ])
    ]);

    var grid = el("div.grid grid--worlds");
    window.WORLDS.forEach(function (w) {
      var done = Storage.unitsDoneIn(w.units.map(function (u) { return u.id; }));
      var pct = Math.round((done / w.units.length) * 100);
      var card = el("button.worldcard", {
        dataset: { worldTheme: w.id },
        "aria-label": w.name + ". " + w.tagline + ". " + done + " of " + w.units.length + " games done.",
        onclick: function () { go("/world/" + w.id); } // destination screen narrates on entry
      }, [
        art(w.mascotArt || w.mascot, "mascot mascot--storybook", w.mascotName + " mascot"),
        el("div.wc-name", { text: w.name }),
        el("div.wc-tagline", { text: w.tagline }),
        el("div.wc-count", { text: done + " / " + w.units.length + " games" }),
        el("div.wc-progress", null, el("span", { style: "width:" + pct + "%" }))
      ]);
      grid.appendChild(card);
    });

    var wrap = el("div.fill", null, [head, grid]);
    UI.setScreen(wrap);
    Sound.narrate("Welcome to Science Play! Pick a world.");
  }

  /* ---------- WORLD ---------- */
  function renderWorld(worldId) {
    var w = window.WORLDS_BY_ID[worldId];
    if (!w) return go("/");
    setWorldTheme(w.id);
    updateTopbar({ title: w.name, back: true, showHome: true });

    var head = el("div.screen-head", null, [
      art(w.mascotArt || w.mascot, "mascot mascot--float mascot--storybook", w.mascotName + " mascot"),
      el("div", null, [
        el("h1.title", { text: w.name }),
        el("p.subtitle", { text: w.tagline })
      ])
    ]);

    // First not-yet-done unit gets the "play next" glow.
    var suggestedId = null;
    for (var i = 0; i < w.units.length; i++) {
      if (!Storage.isUnitDone(w.units[i].id)) { suggestedId = w.units[i].id; break; }
    }

    var grid = el("div.grid grid--units");
    w.units.forEach(function (u) {
      var hasContent = !!window.SCIENCE_DATA[u.id];
      var starsN = Storage.getUnitStars(u.id);
      var done = Storage.isUnitDone(u.id);
      var classes = "unitcard" + (u.id === suggestedId ? " suggested" : "");
      var card = el("button." + classes.replace(/\s/g, "."), {
        "aria-label": u.name + (done ? ", done, " + starsN + " stars" : (hasContent ? ", play" : ", coming soon")),
        onclick: function () { go("/unit/" + u.id); } // destination screen narrates on entry
      }, [
        !hasContent ? el("div.u-badge", { text: "Soon" }) : null,
        el("div.u-icon", null, svgUse(u.icon)),
        el("div.u-name", { text: u.name }),
        UI.stars(starsN)
      ]);
      grid.appendChild(card);
    });

    UI.setScreen(el("div.fill", null, [head, grid]));
    Sound.narrate(w.name + ". Pick a game to play!");
  }

  /* ---------- UNIT / GAME ----------
     Milestone 1 replaces this with the real game runner. Until a unit
     has a content pack, show a friendly placeholder. */
  function renderUnit(unitId) {
    var entry = window.UNIT_INDEX[unitId];
    if (!entry) return go("/");
    var u = entry.unit, w = entry.world;
    setWorldTheme(w.id);
    updateTopbar({ title: u.name, back: true, showHome: true });

    var data = window.SCIENCE_DATA[unitId];

    if (window.GameRunner && data) {
      // Milestone 1+: hand off to the real runner.
      window.GameRunner.start(unitId, {
        onExit: function () { go("/world/" + w.id); }
      });
      return;
    }

    // Placeholder (Milestone 0): no content yet.
    var panel = el("div.panel", null, [
      art(w.mascotArt || w.mascot, "mascot mascot--float mascot--storybook", w.mascotName + " mascot"),
      el("h2.title", { text: u.name }),
      el("p", { text: "This game is coming soon. Check back to play and earn stars!" }),
      el("button.bigbtn", {
        onclick: function () { go("/world/" + w.id); }
      }, [svgUse("#i-back"), "Back to games"])
    ]);
    UI.setScreen(el("div.fill", null, [panel]));
    Sound.narrate(u.name + ". This game is coming soon!");
  }

  /* ---------- Top bar button wiring ---------- */
  btnHome.addEventListener("click", function () { Sound.stop(); go("/"); });
  btnBack.addEventListener("click", function () {
    Sound.stop();
    var route = parseRoute();
    if (route.name === "unit") {
      var entry = window.UNIT_INDEX[route.unitId];
      go(entry ? "/world/" + entry.world.id : "/");
    } else {
      go("/");
    }
  });
  btnSound.addEventListener("click", function () {
    Sound.setMuted(!Sound.isMuted());
    syncSoundButton();
    if (!Sound.isMuted()) Sound.narrate("Sound on!");
  });
  if (btnFullscreen && canEnterFullscreen()) {
    btnFullscreen.hidden = false;
    btnFullscreen.addEventListener("click", function () {
      var action = toggleFullscreen();
      if (action && action.catch) action.catch(function () {});
    });
    document.addEventListener("fullscreenchange", syncFullscreenButton);
    document.addEventListener("webkitfullscreenchange", syncFullscreenButton);
    syncFullscreenButton();
  }

  /* ---------- Audio warm-up on first user gesture (autoplay policy) ---------- */
  function warm() {
    Sound.warmUp();
    window.removeEventListener("pointerdown", warm);
    window.removeEventListener("keydown", warm);
  }
  window.addEventListener("pointerdown", warm, { once: false });
  window.addEventListener("keydown", warm, { once: false });

  /* ---------- Boot ---------- */
  window.addEventListener("hashchange", render);
  syncSoundButton();
  render();
})();
