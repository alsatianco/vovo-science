/* lang.js — language preference (en / vi), shared across Grade K
   Exposes: window.Lang
   - Lang.get()        → "en" | "vi"
   - Lang.set(code)    → save + broadcast
   - Lang.isVi()       → shorthand boolean
   - Lang.on(fn)       → subscribe to change; fn(code) called immediately + on change
*/
(function () {
  "use strict";
  var KEY = "vovo-lang";
  var listeners = [];
  var current = localStorage.getItem(KEY) || "en";

  var Lang = {
    get: function () { return current; },
    isVi: function () { return current === "vi"; },
    set: function (code) {
      current = (code === "vi") ? "vi" : "en";
      try { localStorage.setItem(KEY, current); } catch (e) {}
      listeners.forEach(function (fn) { fn(current); });
    },
    on: function (fn) { listeners.push(fn); fn(current); }
  };

  window.Lang = Lang;
})();
