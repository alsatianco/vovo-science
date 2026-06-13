/* ============================================================
   storage.js — progress & preferences (localStorage + fallback)
   Exposes: window.Storage
   Shape: { sound:Boolean, units:{ [unitId]: { stars:0-3, done:Boolean } } }
   Degrades to an in-memory object if localStorage is unavailable
   (e.g., some browsers block it under file:// or private mode).
   ============================================================ */
(function () {
  "use strict";

  var KEY = "sciencePlay.v1";
  var memoryFallback = null; // used if localStorage throws

  function rawGet() {
    try {
      var s = window.localStorage.getItem(KEY);
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return memoryFallback;
    }
  }

  function rawSet(obj) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(obj));
    } catch (e) {
      memoryFallback = obj; // keep it for this session at least
    }
  }

  function defaults() {
    return { sound: true, units: {} };
  }

  function load() {
    var data = rawGet();
    if (!data || typeof data !== "object") data = defaults();
    if (typeof data.sound !== "boolean") data.sound = true;
    if (!data.units || typeof data.units !== "object") data.units = {};
    return data;
  }

  var state = load();

  var Storage = {
    /* ---- Sound preference ---- */
    getSound: function () { return state.sound; },
    setSound: function (on) { state.sound = !!on; rawSet(state); },

    /* ---- Per-unit progress ---- */
    getUnit: function (unitId) {
      return state.units[unitId] || { stars: 0, done: false };
    },
    /* Record a result; only ever increases stars (kids never lose progress). */
    recordUnit: function (unitId, stars) {
      var u = state.units[unitId] || { stars: 0, done: false };
      u.stars = Math.max(u.stars || 0, Math.min(3, Math.max(0, stars | 0)));
      u.done = true;
      state.units[unitId] = u;
      rawSet(state);
      return u;
    },
    isUnitDone: function (unitId) { return !!(state.units[unitId] && state.units[unitId].done); },
    getUnitStars: function (unitId) { return (state.units[unitId] && state.units[unitId].stars) || 0; },

    /* ---- Aggregates ---- */
    totalStars: function () {
      var t = 0, id;
      for (id in state.units) if (state.units.hasOwnProperty(id)) t += state.units[id].stars || 0;
      return t;
    },
    unitsDoneIn: function (unitIds) {
      var n = 0;
      for (var i = 0; i < unitIds.length; i++) if (this.isUnitDone(unitIds[i])) n++;
      return n;
    },

    /* ---- Reset (parent/teacher control) ---- */
    reset: function () { state = defaults(); rawSet(state); }
  };

  window.Storage = Storage;
})();
