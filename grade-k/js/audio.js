/* ============================================================
   audio.js — speech narration (Web Speech API), no audio files
   Exposes: window.Sound

   WHY THIS IS A QUEUE, NOT cancel()-on-every-call:
   Chrome's engine WEDGES if cancel() is called rapidly (once per
   tap to interrupt). After a handful of races every later utterance
   fires onerror:"canceled", never onstart, and stays broken until
   the *browser* is restarted. That was the "plays a while then
   silent forever" bug.

   So routine narration NEVER cancels: it enqueues a single
   latest-wins "pending" utterance and lets the current short one
   finish, then pump() (driven by onend/onerror) speaks the pending
   one. Only a deliberate interrupt may cancel, and that cancel is
   THROTTLED so it can't wedge the engine.

   Other hard-won lessons kept: no silent priming utterance; speak
   only after the first user gesture; retain utterance refs (GC bug);
   pick a natural voice; periodic resume() to defeat Chrome auto-pause.
   ============================================================ */
(function () {
  "use strict";

  var synth = window.speechSynthesis || null;
  var supported = !!synth && typeof window.SpeechSynthesisUtterance === "function";

  var muted = !(window.Storage ? window.Storage.getSound() : true);
  var lastText = "";
  var chosenVoice = null;
  var warmed = false;
  var keepRefs = [];           // retain utterance refs — Chrome GC bug
  var pending = null;          // at most ONE queued item (latest wins)
  var current = null;
  var currentAudio = null;
  var lastCancelAt = -99999;   // throttle deliberate cancels
  var CANCEL_GAP = 550;        // ms minimum between cancels (anti-wedge)
  var hiTimers = [];           // karaoke highlight fallback timers

  var DENY = /\b(albert|bad news|good news|bahh|bells|boing|bubbles|cellos|jester|organ|pipe organ|superstar|trinoids|whisper|wobble|zarvox|deranged|hysterical|junior|ralph|fred|kathy|princess|bruce|agnes|grandma|grandpa|reed|rocko|sandy|shelley|eddy|flo|novelty)\b/i;
  var NICE = ["ava", "allison", "samantha", "susan", "victoria", "karen", "moira",
              "tessa", "serena", "zoe", "kate", "stephanie", "fiona", "nora",
              "google us english", "microsoft aria", "microsoft jenny", "microsoft zira"];

  function scoreVoice(v) {
    var n = (v.name || "").toLowerCase();
    if (DENY.test(n)) return -1000;
    var s = 0;
    if (n.indexOf("premium") !== -1) s += 1000;
    if (n.indexOf("enhanced") !== -1) s += 500;
    for (var i = 0; i < NICE.length; i++) if (n.indexOf(NICE[i]) !== -1) { s += (NICE.length - i) * 20; break; }
    if (v.localService) s += 60;
    if (/^en[-_]us/i.test(v.lang)) s += 30;
    else if (/^en[-_](gb|au|ca)/i.test(v.lang)) s += 20;
    else if (/^en/i.test(v.lang)) s += 10;
    return s;
  }

  function pickVoice() {
    if (!supported) return null;
    var voices = synth.getVoices() || [];
    if (!voices.length) return null;
    var best = null, bestScore = -Infinity;
    for (var i = 0; i < voices.length; i++) {
      var sc = scoreVoice(voices[i]);
      if (sc > bestScore) { bestScore = sc; best = voices[i]; }
    }
    if (!best || bestScore < 0) best = voices.filter(function (v) { return /^en/i.test(v.lang); })[0] || voices[0];
    return best;
  }

  if (supported) {
    chosenVoice = pickVoice();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = function () { chosenVoice = pickVoice() || chosenVoice; };
    }
    // Keepalive: Chrome silently pauses the engine after ~15s; periodic resume()
    // while speaking keeps long/queued speech flowing. Harmless when idle.
    setInterval(function () { try { if (synth.speaking) synth.resume(); } catch (e) {} }, 7000);
  }

  function clearHi() { for (var i = 0; i < hiTimers.length; i++) clearTimeout(hiTimers[i]); hiTimers = []; }

  function audioSrcFor(text) {
    var map = window.TTS_AUDIO || null;
    return map && text ? map[text] || null : null;
  }

  function canSpeakItem(item) {
    return supported || (!!item && !!audioSrcFor(item.text));
  }

  function stopFileAudio() {
    if (!currentAudio) return;
    var a = currentAudio;
    currentAudio = null;
    try { a.pause(); a.removeAttribute("src"); a.load(); } catch (e) {}
  }

  /* Vietnamese voice picker */
  function pickViVoice() {
    if (!supported) return null;
    var voices = synth.getVoices() || [];
    return voices.filter(function (v) { return /^vi/i.test(v.lang); })[0] || null;
  }
  var viVoice = null;
  if (supported && synth.onvoiceschanged !== undefined) {
    var _orig = synth.onvoiceschanged;
    synth.onvoiceschanged = function () { if (_orig) _orig(); viVoice = pickViVoice(); };
  }
  viVoice = pickViVoice();

  function makeUtterance(text, rate, lang) {
    var isVi = (lang === "vi") || (window.Lang && window.Lang.isVi && window.Lang.isVi());
    var u = new window.SpeechSynthesisUtterance(text);
    if (isVi) {
      if (!viVoice) viVoice = pickViVoice();
      if (viVoice) { u.voice = viVoice; u.lang = viVoice.lang; }
      else { u.lang = "vi-VN"; }
      u.rate = rate || 0.85; u.pitch = 1.0; u.volume = 1;
    } else {
      if (!chosenVoice) chosenVoice = pickVoice();
      if (chosenVoice) { u.voice = chosenVoice; u.lang = chosenVoice.lang; }
      else u.lang = "en-US";
      u.rate = rate || 0.92; u.pitch = 1.0; u.volume = 1;
    }
    keepRefs.push(u); if (keepRefs.length > 12) keepRefs.shift();
    return u;
  }

  function finishItem(item) {
    current = null;
    if (item.onWord) clearHi();
    if (item.onEnd) item.onEnd();
    pump();
  }

  function startTimedHighlights(item, audio) {
    if (!item.onWord) return;
    clearHi();
    var starts = [], re = /\S+/g, m;
    while ((m = re.exec(item.text))) starts.push(m.index);
    if (!starts.length) return;

    var scheduled = false;
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      var durationMs = (isFinite(audio.duration) && audio.duration > 0) ? audio.duration * 1000 : starts.length * 420;
      var per = Math.max(180, durationMs / starts.length);
      starts.forEach(function (idx, i) {
        hiTimers.push(setTimeout(function () { item.onWord(idx); }, i * per));
      });
    }

    audio.addEventListener("loadedmetadata", schedule, { once: true });
    audio.addEventListener("playing", schedule, { once: true });
    hiTimers.push(setTimeout(schedule, 800));
  }

  function doSpeakFile(item, src) {
    var a = new Audio(src);
    var finished = false;
    currentAudio = a;
    current = item;
    a.preload = "auto";
    startTimedHighlights(item, a);
    a.onended = function () {
      if (finished) return; finished = true;
      if (currentAudio === a) currentAudio = null;
      finishItem(item);
    };
    a.onerror = function () {
      if (finished) return; finished = true;
      if (currentAudio === a) currentAudio = null;
      if (item.onWord) clearHi();
      item._skipFile = true;
      doSpeak(item);
    };
    var play = a.play();
    if (play && play.catch) {
      play.catch(function () {
        if (finished) return; finished = true;
        if (currentAudio === a) currentAudio = null;
        if (item.onWord) clearHi();
        item._skipFile = true;
        doSpeak(item);
      });
    }
  }

  function doSpeakSynth(item) {
    try { synth.resume(); } catch (e) {}
    var u = makeUtterance(item.text, item.rate, item.lang);
    current = u;
    if (item.onWord) u.onboundary = function (ev) {
      if (ev.name === "word" || ev.charIndex != null) {
        item._got = true; clearHi(); item.onWord(ev.charIndex || 0);
      }
    };
    var finished = false;
    var finish = function () {
      if (finished) return; finished = true;
      if (current === u) finishItem(item);
    };
    u.onend = finish;
    u.onerror = finish;
    try { synth.speak(u); } catch (e) { current = null; if (item.onEnd) item.onEnd(); }

    // Highlight fallback for Safari (no word boundary events)
    if (item.onWord) {
      clearHi();
      var starts = [], re = /\S+/g, m;
      while ((m = re.exec(item.text))) starts.push(m.index);
      var per = 360;
      hiTimers.push(setTimeout(function () {
        if (item._got) return;
        starts.forEach(function (idx, i) {
          hiTimers.push(setTimeout(function () { if (!item._got) item.onWord(idx); }, i * per));
        });
      }, 380));
    }
  }

  // Speak one queued item NOW. Only called when engine is idle.
  function doSpeak(item) {
    var src = !item._skipFile ? audioSrcFor(item.text) : null;
    if (src) { doSpeakFile(item, src); return; }
    if (supported) { doSpeakSynth(item); return; }
    if (item.onEnd) item.onEnd();
  }

  // If the engine is idle and something is queued, speak it.
  function pump() {
    if (muted || !warmed || !pending) return;
    if (!canSpeakItem(pending)) { var skipped = pending; pending = null; if (skipped.onEnd) skipped.onEnd(); return; }
    if (currentAudio) return;
    if (supported && (synth.speaking || synth.pending)) return;
    var item = pending; pending = null;
    doSpeak(item);
  }

  // Routine narration: queue (latest wins), NEVER cancel.
  function enqueue(item) {
    if (muted || !item.text || !canSpeakItem(item)) { if (item.onEnd) item.onEnd(); return; }
    pending = item;
    if (!warmed) return;
    pump();
  }

  // Deliberate interrupt: play now, cancelling current — throttled to prevent wedge.
  function interrupt(item) {
    if (muted || !item.text || !canSpeakItem(item)) { if (item.onEnd) item.onEnd(); return; }
    pending = item;
    if (!warmed) return;
    if (currentAudio) {
      stopFileAudio();
      pump();
      return;
    }
    if (supported && (synth.speaking || synth.pending)) {
      var now = Date.now();
      if (now - lastCancelAt > CANCEL_GAP) {
        lastCancelAt = now;
        try { synth.cancel(); } catch (e) {} // onerror→finish→pump plays pending
      }
      // else: too soon — let current finish, then pending plays automatically
    } else {
      pump();
    }
  }

  var Sound = {
    isSupported: function () { return supported; },
    isMuted: function () { return muted; },
    isWarmed: function () { return warmed; },
    hasPending: function () { return !!pending; },

    warmUp: function () {
      if (warmed) return;
      if (supported) chosenVoice = pickVoice() || chosenVoice;
      warmed = true;
      if (supported) { try { synth.resume(); } catch (e) {} }
      pump(); // flush anything queued before the first gesture
    },

    // Queued, non-interrupting — for prompts, praise, screen narrations
    narrate: function (text) { lastText = text || ""; enqueue({ text: lastText }); },

    // Interrupt (throttled) — for tap-to-hear a label and replay buttons
    say: function (text) { if (text) interrupt({ text: text }); },
    replay: function () { if (lastText) interrupt({ text: lastText }); },

    // Karaoke reading passage: interrupt + per-word highlighting
    // lang: "en"|"vi" — optional, defaults to window.Lang.get()
    narrateKaraoke: function (text, onWord, onEnd, lang) {
      lastText = text || "";
      interrupt({ text: text, rate: 0.82, onWord: onWord, onEnd: onEnd, lang: lang });
    },

    setMuted: function (m) {
      muted = !!m;
      if (window.Storage) window.Storage.setSound(!muted);
      if (muted) {
        pending = null; stopFileAudio();
        if (supported) { try { synth.cancel(); } catch (e) {} }
        clearHi();
      }
    },

    stop: function () {
      pending = null; clearHi(); stopFileAudio();
      if (supported) { try { synth.cancel(); } catch (e) {} }
    },

    voiceName: function () { return chosenVoice ? chosenVoice.name : null; }
  };

  window.Sound = Sound;
})();
