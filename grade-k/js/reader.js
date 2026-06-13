/* ============================================================
   reader.js — bilingual karaoke reading screen (EN + VI)
   Exposes: window.Reader
   Reader.show(readingData, onDone)
     readingData = { text, textVi, icons }
   Karaoke: highlights words in the active language via onboundary.
   Language: reads window.Lang (en|vi); falls back to en if no textVi.
   ============================================================ */
(function () {
  "use strict";

  var UI = window.UI, Sound = window.Sound;
  var el = UI.el, svgUse = UI.svgUse;

  function tokenise(text) {
    var tokens = [], re = /\S+/g, m;
    while ((m = re.exec(text)) !== null)
      tokens.push({ word: m[0], start: m.index, end: m.index + m[0].length });
    return tokens;
  }

  function findToken(tokens, charIndex) {
    for (var i = 0; i < tokens.length; i++)
      if (charIndex >= tokens[i].start && charIndex < tokens[i].end) return i;
    var best = 0;
    for (var j = 1; j < tokens.length; j++)
      if (tokens[j].start <= charIndex) best = j;
    return best;
  }

  /* Build a paragraph of clickable word spans. Returns { el, spans, tokens } */
  function buildTextEl(text, cssClass) {
    var tokens = tokenise(text);
    var spans = [];
    var p = el("p." + cssClass);
    tokens.forEach(function (tok, i) {
      var sp = document.createElement("span");
      sp.className = "rd-word";
      sp.textContent = tok.word;
      spans.push(sp);
      p.appendChild(sp);
      if (i < tokens.length - 1) p.appendChild(document.createTextNode(" "));
    });
    return { el: p, spans: spans, tokens: tokens };
  }

  function show(readingData, onDone) {
    if (!readingData || !readingData.text) { onDone(); return; }

    var isVi     = window.Lang && window.Lang.isVi && window.Lang.isVi();
    var textEn   = readingData.text;
    var textVi   = readingData.textVi || "";
    var icons    = readingData.icons || [];

    /* Active language text for karaoke */
    var activeText   = (isVi && textVi) ? textVi : textEn;

    /* Build EN block */
    var en = buildTextEl(textEn, "rd-text rd-text--en");

    /* Build VI block (always rendered if available, greyed when not active) */
    var vi = textVi ? buildTextEl(textVi, "rd-text rd-text--vi") : null;

    /* Active spans/tokens for karaoke highlighting */
    var activeSpans  = (isVi && vi) ? vi.spans  : en.spans;
    var activeTokens = (isVi && vi) ? vi.tokens : en.tokens;
    var activeIdx    = -1;

    function setActive(idx) {
      if (idx === activeIdx) return;
      if (activeIdx >= 0 && activeSpans[activeIdx]) activeSpans[activeIdx].classList.remove("rd-word--active");
      activeIdx = idx;
      if (idx >= 0 && activeSpans[idx]) {
        activeSpans[idx].classList.add("rd-word--active");
        try { activeSpans[idx].scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch(e) {}
      }
    }
    function clearActive() {
      if (activeIdx >= 0 && activeSpans[activeIdx]) activeSpans[activeIdx].classList.remove("rd-word--active");
      activeIdx = -1;
    }

    function narrate() {
      clearActive();
      if (Sound.isMuted()) return;
      var lang = (isVi && textVi) ? "vi" : "en";
      Sound.narrateKaraoke(activeText, function (charIndex) {
        setActive(findToken(activeTokens, charIndex));
      }, clearActive, lang);
    }

    /* Icons row */
    var iconsRow = null;
    if (icons.length) {
      iconsRow = el("div.rd-icons");
      icons.forEach(function (id) {
        iconsRow.appendChild(el("div.rd-icon-wrap", null, svgUse(id, "rd-icon")));
      });
    }

    /* Language badge */
    var langBadge = el("span.rd-lang-badge", {
      text: isVi ? "🇻🇳 Tiếng Việt" : "🇺🇸 English"
    });

    /* Buttons */
    var replayBtn = el("button.rd-replay-btn", {
      "aria-label": "Hear it again",
      onclick: function () { narrate(); }
    }, [svgUse("#i-replay", "rd-btn-icon"), el("span", { text: isVi ? "Nghe lại" : "Hear again" })]);

    var playBtn = el("button.rd-play-btn", {
      "aria-label": "Let's play!",
      onclick: function () { Sound.stop(); onDone(); }
    }, [svgUse("#i-star", "rd-btn-icon"), el("span", { text: isVi ? "Chơi thôi!" : "Let's Play!" })]);

    /* Banner */
    var bannerText = isVi ? "Đọc & Nghe" : "Read & Listen";
    var banner = el("div.rd-banner", null, [
      el("span.rd-banner-line"), el("span.rd-banner-dot"),
      el("span.rd-banner-text", { text: bannerText }),
      el("span.rd-banner-dot"), el("span.rd-banner-line")
    ]);

    /* Text wrap: EN always on top, VI below (if available) */
    var textChildren = [en.el];
    if (vi) {
      var divider = el("div.rd-lang-divider", null, [langBadge]);
      textChildren.push(divider, vi.el);
    }
    var textWrap = el("div.rd-text-wrap", null, textChildren);

    /* Card */
    var card = el("div.rd-card", null, [banner, iconsRow, textWrap, el("div.rd-actions", null, [replayBtn, playBtn])]);
    UI.setScreen(el("div.rd-screen", null, card));

    setTimeout(narrate, 220);
  }

  window.Reader = { show: show };
})();
