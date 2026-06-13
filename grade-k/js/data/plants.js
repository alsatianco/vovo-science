/* ============================================================
   data/plants.js — "Garden Grow" (Life Science · Plants)
   NGSS: plants have parts (roots, stem, leaf, flower, fruit) that
   help them survive; plants need water and light.
   Vocabulary: seed, seedling, plant, flower, fruit, roots, stem, leaf.
   4 activities exercise 4 different engines (the M1 vertical slice).
   ============================================================ */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};

  window.SCIENCE_DATA.plants = {
    title: "Garden Grow",
    color: "life",
    mascot: "#m-sprout",
    vocab: ["seed", "seedling", "plant", "flower", "fruit", "roots", "stem", "leaf"],

    activities: [
      /* 1) SEQUENCE — the plant life cycle, seed → fruit */
      {
        engine: "sequence",
        reading: {
          text: "A seed can grow into a new plant. First it becomes a seedling, then it grows leaves, a flower, and finally a fruit!",
          icons: ["#c-seed", "#c-youngplant", "#c-fruit"]
        },
        prompt: "Put the plant in order!",
        narration: "Let's grow a plant! Tap the pictures in order, from the little seed all the way to the fruit.",
        steps: [
          { icon: "#c-seed",       label: "Seed" },
          { icon: "#c-seedling",   label: "Seedling" },
          { icon: "#c-youngplant", label: "Plant" },
          { icon: "#c-flower",     label: "Flower" },
          { icon: "#c-fruit",      label: "Fruit" }
        ]
      },

      /* 2) MATCH — plant part → the job it does */
      {
        engine: "match",
        reading: {
          text: "Plants have parts that help them grow. Roots drink water from the ground. The stem holds up the leaves and flowers.",
          icons: ["#c-roots", "#c-stem", "#c-leaf"]
        },
        prompt: "Match each part to its job.",
        narration: "Plants have parts that help them grow. Tap a plant part, then tap the job it does.",
        pairs: [
          { a: { icon: "#c-roots",  label: "Roots" },  b: { icon: "#c-water", label: "Drink water" } },
          { a: { icon: "#c-leaf",   label: "Leaf" },   b: { icon: "#u-sun",   label: "Soak up light" } },
          { a: { icon: "#c-stem",   label: "Stem" },   b: { icon: "#c-up",    label: "Hold it up" } },
          { a: { icon: "#c-flower", label: "Flower" }, b: { icon: "#c-seed",  label: "Make seeds" } }
        ]
      },

      /* 3) QUIZ — what plants need */
      {
        engine: "quiz",
        reading: {
          text: "Plants need water and sunlight to grow. Roots take in water from the ground. Leaves soak up light from the sun to make food.",
          icons: ["#c-water", "#c-leaf"]
        },
        prompt: "What do plants need?",
        narration: "Plants need water and light to grow. Let's answer some questions!",
        rounds: [
          {
            ask: "What do the roots drink?",
            narration: "What do the roots drink?",
            hint: "Roots drink water!",
            options: [
              { icon: "#c-water", label: "Water", correct: true },
              { icon: "#c-fruit", label: "Juice" }
            ]
          },
          {
            ask: "What do the leaves soak up?",
            narration: "What do the leaves soak up?",
            hint: "Leaves soak up light from the sun!",
            options: [
              { icon: "#u-sun",   label: "Sunlight", correct: true },
              { icon: "#c-water", label: "Water" }
            ]
          },
          {
            ask: "Which one grows into a new plant?",
            narration: "Which one can grow into a brand new plant?",
            hint: "A seed grows into a new plant!",
            options: [
              { icon: "#c-seed",   label: "Seed", correct: true },
              { icon: "#c-flower", label: "Flower" },
              { icon: "#u-sun",    label: "Sun" }
            ]
          }
        ],
        pool: [
          { ask: "What holds up the leaves and flowers?",
            narration: "Which part holds up the leaves and flowers?",
            hint: "The stem holds everything up!",
            options: [ { icon: "#c-stem", label: "Stem", correct: true }, { icon: "#c-roots", label: "Roots" } ] },
          { ask: "Where does a plant drink water from?",
            narration: "Which part of the plant drinks water from the ground?",
            hint: "The roots soak up water!",
            options: [ { icon: "#c-roots", label: "Roots", correct: true }, { icon: "#c-leaf", label: "Leaf" } ] },
          { ask: "What comes after the flower on a plant?",
            narration: "After the flower blooms, what grows on the plant?",
            hint: "A fruit grows after the flower!",
            options: [ { icon: "#c-fruit", label: "Fruit", correct: true }, { icon: "#c-seed", label: "Seed" } ] },
          { ask: "What part of the plant soaks up sunlight?",
            narration: "Which part of the plant catches sunlight to make food?",
            hint: "The leaf soaks up sunlight!",
            options: [ { icon: "#c-leaf", label: "Leaf", correct: true }, { icon: "#c-stem", label: "Stem" } ] }
        ]
      },

      /* 4) COLOR BY NUMBER — paint the flower by the key */
      {
        engine: "color",
        reading: {
          text: "A flower is the beautiful blossom of a plant. A yummy fruit grows from the flower. Fruits have seeds inside that can grow into new plants!",
          icons: ["#c-flower", "#c-fruit"]
        },
        prompt: "Color the flower!",
        narration: "Now let's color the flower. Pick a color, then tap the parts with that number.",
        palette: [
          { key: 1, color: "#ffd43b", name: "yellow" },
          { key: 2, color: "#fa5252", name: "red" },
          { key: 3, color: "#37b24d", name: "green" }
        ],
        art:
          // Flower: center at (100,82). 5 petals at 72° spacing (r=23, d=27 from center).
          // Angles (deg): -90, -18, 54, 126, 198 → petal centers below.
          // Stem+leaf share key=3; petals key=1; center key=2.
          '<svg viewBox="0 0 200 200" role="img" aria-label="Color the flower">' +
            // stem + leaf (3 = green) — drawn first so petals overlap top of stem
            '<g data-key="3" aria-label="stem and leaf, color 3">' +
              '<rect class="cbn-fill" x="95" y="108" width="10" height="72" rx="5" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<ellipse class="cbn-fill" cx="72" cy="148" rx="20" ry="11" transform="rotate(-35 72 148)" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="100" y="158" text-anchor="middle">3</text>' +
            '</g>' +
            // 5 petals (1 = yellow) — 5 circles at 72° apart, r=23, distance 27 from center (100,82)
            '<g data-key="1" aria-label="petals, color 1">' +
              // top      −90°: (100, 55)
              '<circle class="cbn-fill" cx="100" cy="55" r="23" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              // upper-right −18°: (126, 74)
              '<circle class="cbn-fill" cx="126" cy="74" r="23" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              // lower-right  54°: (116, 104)
              '<circle class="cbn-fill" cx="116" cy="104" r="23" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              // lower-left  126°: (84, 104)
              '<circle class="cbn-fill" cx="84"  cy="104" r="23" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              // upper-left  198°: (74, 74)
              '<circle class="cbn-fill" cx="74"  cy="74"  r="23" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="100" y="30" text-anchor="middle">1</text>' +
            '</g>' +
            // center (2 = red)
            '<g data-key="2" aria-label="center, color 2">' +
              '<circle class="cbn-fill" cx="100" cy="82" r="21" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="100" y="88" text-anchor="middle">2</text>' +
            '</g>' +
          '</svg>'
      }
    ]
  };
})();
