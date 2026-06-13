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
  var currentAudio = null;
  var lastCancelAt = -99999;  // throttle deliberate cancels
  var CANCEL_GAP = 550;       // ms minimum between cancels (anti-wedge)
  var hiTimers = [];          // karaoke highlight fallback timers
  var hiCleanups = [];        // listeners attached for timing-based highlights
  var HI_LEAD_SILENCE = 0.20; // typical TTS lead-in silence (s) before first word
  var HI_TAIL_SILENCE = 0.10; // typical TTS trailing silence (s) after last word

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

  function clearHi() {
    for (var i = 0; i < hiTimers.length; i++) clearTimeout(hiTimers[i]);
    hiTimers = [];
    for (var j = 0; j < hiCleanups.length; j++) {
      try { hiCleanups[j](); } catch (e) {}
    }
    hiCleanups = [];
  }

  function audioSrcFor(text) {
    var map = window.TTS_AUDIO || null;
    return map && text ? map[text] || null : null;
  }

  function timingStartsFor(text) {
    var map = window.TTS_TIMINGS || null;
    var starts = map && text ? map[text] : null;
    return starts && starts.length ? starts : null;
  }

  // Split text into punctuation-bounded phrases for karaoke highlight.
  // Each entry is { startChar, endChar, words } where startChar/endChar are
  // inclusive/exclusive char offsets into `text`. We highlight an entire
  // phrase at a time, mapped proportionally to the WAV duration — this is
  // far more drift-tolerant than per-word timings against expressive speech.
  function splitPhrases(text) {
    var phrases = [];
    if (!text) return phrases;
    var re = /[^.!?,;:\n]+[.!?,;:\n]*/g, m;
    while ((m = re.exec(text))) {
      var seg = m[0];
      var leading = (seg.match(/^\s*/) || [""])[0].length;
      var trailing = (seg.match(/\s*$/) || [""])[0].length;
      var startChar = m.index + leading;
      var endChar = m.index + seg.length - trailing;
      if (endChar <= startChar) continue;
      var wc = (seg.match(/\S+/g) || []).length;
      if (!wc) continue;
      phrases.push({ startChar: startChar, endChar: endChar, words: wc });
    }
    if (!phrases.length && text.trim()) {
      phrases.push({
        startChar: 0,
        endChar: text.length,
        words: (text.match(/\S+/g) || []).length || 1
      });
    }
    return phrases;
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

  function makeUtterance(text, rate) {
    if (!chosenVoice) chosenVoice = pickVoice();
    var u = new window.SpeechSynthesisUtterance(text);
    if (chosenVoice) { u.voice = chosenVoice; u.lang = chosenVoice.lang; }
    else u.lang = "en-US";
    u.rate = rate || 0.92; u.pitch = 1.05; u.volume = 1;
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
    var phrases = splitPhrases(item.text);
    if (!phrases.length) return;
    var totalWords = phrases.reduce(function (a, p) { return a + p.words; }, 0) || 1;
    var scheduled = false;

    function fireAll() {
      var dur = (isFinite(audio.duration) && audio.duration > 0)
        ? audio.duration
        : Math.max(1.0, totalWords * 0.40);
      var speech = Math.max(0.4, dur - HI_LEAD_SILENCE - HI_TAIL_SILENCE);
      var t = HI_LEAD_SILENCE;
      phrases.forEach(function (p) {
        var ms = Math.max(0, t * 1000);
        hiTimers.push(setTimeout(function () {
          item.onWord(p.startChar, p.endChar);
        }, ms));
        t += speech * (p.words / totalWords);
      });
    }

    function schedule() {
      if (scheduled) return;
      scheduled = true;
      fireAll();
    }

    audio.addEventListener("loadedmetadata", schedule, { once: true });
    audio.addEventListener("playing", schedule, { once: true });
    // Safety net if neither event fires promptly (cached audio, Safari quirks).
    hiTimers.push(setTimeout(schedule, 600));
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
    var u = makeUtterance(item.text, item.rate);
    current = u;
    if (item.onWord) u.onboundary = function (ev) {
      if (ev.name === "word" || ev.charIndex != null) { item._got = true; clearHi(); item.onWord(ev.charIndex || 0); }
    };
    var finished = false;
    var finish = function () {
      if (finished) return; finished = true;
      if (current === u) finishItem(item);
    };
    u.onend = finish;
    u.onerror = finish;
    try { synth.speak(u); } catch (e) { current = null; if (item.onEnd) item.onEnd(); }

    // Highlight fallback for engines that don't fire word boundaries (Safari).
    // Use phrase-level highlighting (one call per punctuation-bounded chunk)
    // so we don't visibly drift away from the spoken voice.
    if (item.onWord) {
      clearHi();
      var phrasesS = splitPhrases(item.text);
      var totalWordsS = phrasesS.reduce(function (a, p) { return a + p.words; }, 0) || 1;
      // Roughly 0.40s per word at synth rate ~0.92; budget = leading delay + per-word time.
      var perWordSec = 0.40;
      hiTimers.push(setTimeout(function () {
        if (item._got) return;
        var t = 0;
        phrasesS.forEach(function (p) {
          var ms = Math.max(0, t * 1000);
          hiTimers.push(setTimeout(function () {
            if (item._got) return;
            item.onWord(p.startChar, p.endChar);
          }, ms));
          t += perWordSec * p.words;
        });
      }, 380));
    }
  }

  // Speak one queued item NOW. Driven only when the engine is idle.
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

  // Deliberate interrupt: play `item` now, cancelling current — but only if
  // we haven't cancelled very recently (throttle = anti-wedge). Otherwise we
  // just queue it and let the current utterance finish.
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
    isWarmed: function () { return warmed; },
    hasPending: function () { return !!pending; },

    warmUp: function () {
      if (warmed) return;
      if (supported) chosenVoice = pickVoice() || chosenVoice;
      warmed = true;
      if (supported) { try { synth.resume(); } catch (e) {} }
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
      if (muted) {
        pending = null; stopFileAudio();
        if (supported) { try { synth.cancel(); } catch (e) {} }
        clearHi();
      }
    },

    stop: function () { pending = null; clearHi(); stopFileAudio(); if (supported) { try { synth.cancel(); } catch (e) {} } },

    voiceName: function () { return chosenVoice ? chosenVoice.name : null; }
  };

  window.Sound = Sound;
})();
