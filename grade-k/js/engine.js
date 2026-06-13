/* ============================================================
   engine.js — activity-engine registry & contract
   Exposes: window.Engine
   Each engine registers an implementation:
     Engine.register("quiz", { mount: function(container, data, api){…} });
   The game runner (app.js) calls Engine.get(name).mount(...) for each
   activity in a unit's data pack.

   api passed to mount():
     api.narrate(text)        -> speak via window.Sound
     api.onProgress()         -> optional progress ping
     api.complete(stars)      -> signal this activity is finished (0–3 stars)
   An engine knows nothing about navigation, other engines, or units.
   Full engine implementations are added in Milestone 1+.
   ============================================================ */
(function () {
  "use strict";

  var registry = {};

  window.Engine = {
    register: function (name, impl) {
      if (!name || !impl || typeof impl.mount !== "function") {
        throw new Error("Engine.register: '" + name + "' needs a mount() function");
      }
      registry[name] = impl;
    },
    get: function (name) { return registry[name] || null; },
    has: function (name) { return !!registry[name]; },
    names: function () { return Object.keys(registry); }
  };
})();
