/* ============================================================
   data/worlds.js — portal structure: 3 worlds → 15 units
   Exposes: window.WORLDS
   Metadata only (titles, icons, mascots, order). Per-unit game
   CONTENT lives in window.SCIENCE_DATA.<unit> (data/<unit>.js),
   authored in Milestones 1 & 3. Units without content yet show a
   friendly "coming soon" placeholder.
   ============================================================ */
(function () {
  "use strict";

  window.WORLDS = [
    {
      id: "life",
      name: "Life Science",
      tagline: "Plants, animals & living things",
      mascot: "#m-sprout",
      mascotArt: "assets/mascots/sprout-storybook.jpg",
      mascotName: "Sprout",
      units: [
        { id: "plants",         name: "Garden Grow",          icon: "#u-plants" },
        { id: "animals",        name: "Animal Friends",       icon: "#u-animals" },
        { id: "traits",         name: "Look Like Family",     icon: "#u-traits" },
        { id: "livingNonliving",name: "Alive or Not?",        icon: "#u-living" },
        { id: "lifeCycle",      name: "Sprout to Fruit",      icon: "#u-lifecycle" }
      ]
    },
    {
      id: "physical",
      name: "Physical Science",
      tagline: "Pushes, pulls, forces & light",
      mascot: "#m-spark",
      mascotArt: "assets/mascots/spark-storybook.jpg",
      mascotName: "Zip",
      units: [
        { id: "pushesPulls",    name: "Push It!",             icon: "#u-push" },
        { id: "interactions",   name: "Crash & Roll",         icon: "#u-interactions" },
        { id: "energyForces",   name: "Big Push, Little Push",icon: "#u-energy" },
        { id: "sunlight",       name: "Sunshine Warms",       icon: "#u-sun" },
        { id: "reducingWarming",name: "Make Some Shade",      icon: "#u-shade" }
      ]
    },
    {
      id: "earth",
      name: "Earth & Space",
      tagline: "Weather, the planet & caring for it",
      mascot: "#m-cloud",
      mascotArt: "assets/mascots/skye-storybook.jpg",
      mascotName: "Skye",
      units: [
        { id: "weatherClimate", name: "Weather Watch",        icon: "#u-weather" },
        { id: "changingEnv",    name: "Busy Builders",        icon: "#u-environment" },
        { id: "needs",          name: "Just What I Need",     icon: "#u-needs" },
        { id: "forecasting",    name: "Storm Ready",          icon: "#u-forecast" },
        { id: "humanImpact",    name: "Care for Earth",       icon: "#u-earth" }
      ]
    }
  ];

  /* Container for per-unit content packs (populated by data/<unit>.js). */
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};

  /* Helpers used by the router. */
  window.WORLDS_BY_ID = {};
  window.UNIT_INDEX = {}; // unitId -> { unit, world }
  window.WORLDS.forEach(function (w) {
    window.WORLDS_BY_ID[w.id] = w;
    w.units.forEach(function (u) { window.UNIT_INDEX[u.id] = { unit: u, world: w }; });
  });
})();
