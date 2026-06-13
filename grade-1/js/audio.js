/* ============================================================
   audio.js — speech narration (Web Speech API), no audio files.
   Exposes window.Sound.

   WHY THIS IS A QUEUE, NOT cancel()-on-every-call:
   Chrome's speech engine WEDGES if you call speechSynthesis.cancel()
   rapidly (e.g. once per tap to interrupt). After a handful of races
   every later utterance fires onerror:"canceled", never onstart, and
   stays broken until the *browser* is restarted. That was the
   "plays for a while then goes silent" bug.

   So routine narration NEVER cancels: it enqueues a single latest-wins
   "pending" utterance and lets the current short one finish, then the
   pump() (driven by onend/onerror) speaks the pending one. Only a
   deliberate interrupt (reading the passage, tapping a word) may cancel,
   and that cancel is THROTTLED so it can't wedge the engine.

   Other hard-won lessons kept: no silent priming utterance; speak only
   after the first user gesture; retain utterance refs (GC bug); pick a
   natural voice; periodic resume() to defeat Chrome's auto-pause.
   ============================================================ */
(function () {
  "use strict";

  var synth = window.speechSynthesis || null;
  var supported = !!synth && typeof window.SpeechSynthesisUtterance === "function";

  var muted = false;
  var lastText = "";
  var chosenVoice = null;
  var warmed = false;
  var keepRefs = [];          // hold utterance refs so Chrome doesn't GC them
  var pending = null;         // at most ONE queued utterance (latest wins)
  var current = null;         // the utterance now speaking (for bookkeeping)
  var lastCancelAt = -99999;  // throttle deliberate cancels
  var CANCEL_GAP = 550;       // ms minimum between cancels (anti-wedge)
  var hiTimers = [];          // karaoke highlight fallback timers

  var DENY = /\b(albert|bad news|good news|bahh|bells|boing|bubbles|cellos|jester|organ|superstar|trinoids|whisper|wobble|zarvox|deranged|hysterical|junior|ralph|fred|kathy|princess|bruce|agnes|grandma|grandpa|reed|rocko|sandy|shelley|eddy|flo|novelty)\b/i;
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
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = function () { chosenVoice = pickVoice() || chosenVoice; };
    // Keepalive: Chrome silently pauses the engine after a while; resume()
    // while speaking keeps long/queued speech flowing. Harmless when idle.
    setInterval(function () { try { if (synth.speaking) synth.resume(); } catch (e) {} }, 7000);
  }

  function clearHi() { for (var i = 0; i < hiTimers.length; i++) clearTimeout(hiTimers[i]); hiTimers = []; }

  function makeUtterance(text, rate) {
    if (!chosenVoice) chosenVoice = pickVoice();
    var u = new window.SpeechSynthesisUtterance(text);
    if (chosenVoice) { u.voice = chosenVoice; u.lang = chosenVoice.lang; }
    else u.lang = "en-US";
    u.rate = rate || 0.92; u.pitch = 1.05; u.volume = 1;
    keepRefs.push(u); if (keepRefs.length > 12) keepRefs.shift();
    return u;
  }

  // Speak one queued item NOW. Driven only when the engine is idle.
  function doSpeak(item) {
    try { synth.resume(); } catch (e) {}
    var u = makeUtterance(item.text, item.rate);
    current = u;
    if (item.onWord) u.onboundary = function (ev) {
      if (ev.name === "word" || ev.charIndex != null) { item._got = true; clearHi(); item.onWord(ev.charIndex || 0); }
    };
    var finished = false;
    var finish = function () {
      if (finished) return; finished = true;
      if (current === u) current = null;
      if (item.onEnd) item.onEnd();
      pump();
    };
    u.onend = finish;
    u.onerror = finish;
    try { synth.speak(u); } catch (e) { current = null; if (item.onEnd) item.onEnd(); }

    // Highlight fallback for engines that don't fire word boundaries (Safari).
    if (item.onWord) {
      clearHi();
      var starts = [], re = /\S+/g, m;
      while ((m = re.exec(item.text))) starts.push(m.index);
      var per = 360;
      hiTimers.push(setTimeout(function () {
        if (item._got) return;
        starts.forEach(function (idx, i) { hiTimers.push(setTimeout(function () { if (!item._got) item.onWord(idx); }, i * per)); });
      }, 380));
    }
  }

  // If the engine is idle and something is queued, speak it.
  function pump() {
    if (!supported || muted || !warmed || !pending) return;
    if (synth.speaking || synth.pending) return;
    var item = pending; pending = null;
    doSpeak(item);
  }

  // Routine narration: queue (latest wins), NEVER cancel.
  function enqueue(item) {
    if (!supported || muted || !warmed || !item.text) { if (item.onEnd) item.onEnd(); return; }
    pending = item;
    pump();
  }

  // Deliberate interrupt: play `item` now, cancelling current — but only if
  // we haven't cancelled very recently (throttle = anti-wedge). Otherwise we
  // just queue it and let the current utterance finish.
  function interrupt(item) {
    if (!supported || muted || !warmed || !item.text) { if (item.onEnd) item.onEnd(); return; }
    pending = item;
    if (synth.speaking || synth.pending) {
      var now = Date.now();
      if (now - lastCancelAt > CANCEL_GAP) {
        lastCancelAt = now;
        try { synth.cancel(); } catch (e) {}   // onerror→finish→pump plays `pending`
      }
      // else: too soon to cancel again — current finishes, then pending plays.
    } else {
      pump();
    }
  }

  var Sound = {
    isSupported: function () { return supported; },
    isMuted: function () { return muted; },

    warmUp: function () {
      if (!supported) return;
      chosenVoice = pickVoice() || chosenVoice;
      if (warmed) return;
      warmed = true;
      try { synth.resume(); } catch (e) {}
      pump(); // flush anything queued before the first gesture
    },

    // queued, non-interrupting — for prompts, praise, feedback, sentences
    narrate: function (text) { lastText = text || ""; enqueue({ text: lastText }); },

    // interrupt (throttled) — for tap-to-hear a word/label and replay buttons
    say: function (text) { if (text) interrupt({ text: text }); },
    replay: function () { if (lastText) interrupt({ text: lastText }); },

    // the reading passage: interrupt + per-word highlighting
    narrateKaraoke: function (text, onWord, onEnd) {
      lastText = text || "";
      interrupt({ text: text, onWord: onWord, onEnd: onEnd });
    },

    setMuted: function (m) {
      muted = !!m;
      if (muted && supported) { pending = null; try { synth.cancel(); } catch (e) {} clearHi(); }
    },

    stop: function () { pending = null; clearHi(); if (supported) { try { synth.cancel(); } catch (e) {} } },

    voiceName: function () { return chosenVoice ? chosenVoice.name : null; }
  };

  window.Sound = Sound;
})();
