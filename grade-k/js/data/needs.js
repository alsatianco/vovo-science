/* data/needs.js — "Just What I Need" (Earth & Space · Needs of Plants,
   Animals & People)
   NGSS: relate the needs of plants/animals (including humans) to the
   places they live. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.needs = {
    title: "Just What I Need",
    color: "earth",
    mascot: "#m-cloud",
    vocab: ["need", "water", "food", "home", "place"],
    activities: [
      {
        engine: "match",
        reading: {
          text: "All living things need a home that gives them what they need. A fish needs to live in water. A cactus needs a hot, dry desert. A bird needs a tree to build its nest.",
          icons: ["#c-fish", "#c-cactus"]
        },
        prompt: "Match the living thing to its home.",
        narration: "Living things live where they get what they need. Tap a living thing, then tap its home.",
        pairs: [
          { a: { icon: "#c-fish",   label: "Fish" },   b: { icon: "#c-pond",   label: "Pond" } },
          { a: { icon: "#c-cactus", label: "Cactus" }, b: { icon: "#c-desert", label: "Desert" } },
          { a: { icon: "#c-bird",   label: "Bird" },   b: { icon: "#c-tree",   label: "Tree" } }
        ]
      },
      {
        engine: "build",
        reading: {
          text: "Pets are animals that live with people. Dogs and cats need food, clean water, and a safe home to live in. When we care for a pet, we help it get everything it needs.",
          icons: ["#c-dog", "#c-water"]
        },
        prompt: "Give the pet what it needs!",
        narration: "Every pet needs food, water, and a home. Give the puppy each thing it needs!",
        goalText: "The puppy is happy! It has food, water, and a home.",
        zones: [
          { id: "food",  label: "Food",  icon: "#c-meat",  accepts: ["food"] },
          { id: "water", label: "Water", icon: "#c-water", accepts: ["water"] },
          { id: "home",  label: "Home",  icon: "#c-house", accepts: ["home"] }
        ],
        parts: [
          { id: "food",  label: "Food",  icon: "#c-meat" },
          { id: "water", label: "Water", icon: "#c-water" },
          { id: "home",  label: "Home",  icon: "#c-house" },
          { id: "ball",  label: "Toy",   icon: "#c-ball" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "All living things need food, water, and a safe place to live. Plants need sunlight and water. Animals need food and shelter. Every living thing lives where it can get what it needs.",
          icons: ["#c-water", "#c-house"]
        },
        prompt: "What do living things need?",
        narration: "Living things need food, water, and a good place to live. Let's check!",
        rounds: [
          { ask: "A fish lives best in the…?", narration: "Where does a fish live best?", hint: "A fish needs to live in water!",
            options: [ { icon: "#c-pond", label: "Pond", correct: true }, { icon: "#c-desert", label: "Desert" } ] },
          { ask: "Every animal needs to drink…?", narration: "What does every animal need to drink?", hint: "Every animal needs water!",
            options: [ { icon: "#c-water", label: "Water", correct: true }, { label: "Sand" } ] },
          { ask: "A cactus lives best in the…?", narration: "Where does a cactus grow best?", hint: "A cactus loves the dry desert!",
            options: [ { icon: "#c-desert", label: "Desert", correct: true }, { icon: "#c-pond", label: "Pond" } ] }
        ],
        pool: [
          { ask: "A bird needs to eat…?", narration: "What does a bird need to eat?", hint: "All animals need food to eat!",
            options: [ { icon: "#c-meat", label: "Food", correct: true }, { icon: "#c-desert", label: "Sand" } ] },
          { ask: "What does a plant need to grow?", narration: "What does a plant need to grow big?", hint: "Plants need sunlight and water to grow!",
            options: [ { icon: "#c-water", label: "Water", correct: true }, { icon: "#c-house", label: "A house" } ] },
          { ask: "Where does a bird build its nest?", narration: "Where does a bird like to build its nest?", hint: "A bird builds its nest in a tree!",
            options: [ { icon: "#c-tree", label: "A tree", correct: true }, { icon: "#c-pond", label: "A pond" } ] }
        ]
      }
    ]
  };
})();
