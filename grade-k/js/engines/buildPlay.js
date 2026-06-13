/* ============================================================
   engines/buildPlay.js — Design/Engineer/Build (place parts into a scene)
   Data:
     { engine:"build", prompt, narration, goalText?,
       parts:[ { id, label, icon } ],
       zones:[ { id, label, accepts:[partId,...], icon? } ] }
   Tap a part to pick it up, then tap the zone it belongs in. A zone
   accepts one or more part ids. Correct placements lock in; wrong taps
   shake + hint. Complete when every zone is filled — the build works!
   ============================================================ */
(function () {
  "use strict";
  var UI = window.UI, el = UI.el, svgUse = UI.svgUse;

  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function starsFor(m){ return m===0?3:m<=2?2:1; }

  window.Engine.register("build", {
    mount: function (stage, data, api) {
      var parts = data.parts || [], zones = data.zones || [];
      var mistakes = 0, filled = 0, sel = null;

      var scene = el("div.build-scene");
      zones.forEach(function (z) {
        var slot = el("div.build-zone-slot");
        var zone = el("button.build-zone", {
          dataset: { id: z.id, accepts: (z.accepts || []).join(",") },
          "aria-label": z.label,
          onclick: function () { place(z, zone, slot); }
        }, [
          z.icon ? el("div.bz-pic", null, svgUse(z.icon)) : null,
          slot,
          el("div.bz-label", { text: z.label })
        ]);
        scene.appendChild(zone);
      });

      var tray = el("div.build-tray", { "aria-label": "Parts to use" });
      shuffle(parts).forEach(function (p) {
        var btn = el("button.build-part", {
          dataset: { id: p.id },
          "aria-label": p.label || "part",
          onclick: function () { selectPart(btn); }
        }, [
          p.icon ? el("div.bp-pic", null, svgUse(p.icon)) : null,
          p.label ? el("div.bp-label", { text: p.label }) : null
        ]);
        tray.appendChild(btn);
      });

      stage.appendChild(el("div.build", null, [scene, tray]));

      function selectPart(btn) {
        if (btn.classList.contains("used")) return;
        if (sel) sel.classList.remove("sel");
        if (sel === btn) { sel = null; return; }
        sel = btn; btn.classList.add("sel");
      }

      function place(z, zoneBtn, slot) {
        if (zoneBtn.classList.contains("done")) return;
        if (!sel) { api.hint("Pick a part first, then tap where it goes!"); return; }
        var accepts = (z.accepts || []).map(String);
        if (accepts.indexOf(String(sel.dataset.id)) !== -1) {
          var pic = sel.querySelector(".bp-pic");
          slot.innerHTML = "";
          if (pic) slot.appendChild(pic.cloneNode(true));
          zoneBtn.classList.add("done");
          sel.classList.add("used"); sel.style.display = "none";
          sel = null;
          filled++;
          api.praise();
          if (filled === zones.length) {
            if (data.goalText) api.narrate(data.goalText);
            setTimeout(function(){ api.complete(starsFor(mistakes)); }, 700);
          }
        } else {
          mistakes++;
          zoneBtn.classList.add("wrong");
          api.hint("That part doesn't go there. Try another spot!");
          setTimeout(function(){ zoneBtn.classList.remove("wrong"); }, 500);
        }
      }
    }
  });
})();
