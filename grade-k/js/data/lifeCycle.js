/* data/lifeCycle.js — "Sprout to Fruit" (Life Science · Life Cycle of a Plant)
   NGSS: observe a simple plant life cycle: seed → seedling → plant →
   flower → fruit. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.lifeCycle = {
    title: "Sprout to Fruit",
    color: "life",
    mascot: "#m-sprout",
    vocab: ["life cycle", "seed", "sprout", "flower", "fruit"],
    activities: [
      {
        engine: "sequence",
        reading: {
          text: "Plants go through a life cycle. A tiny seed grows into a seedling, then a plant, then a flower, and finally a fruit. The fruit has seeds to start the cycle again!",
          icons: ["#c-seed", "#c-flower"]
        },
        prompt: "Order the life cycle.",
        narration: "A plant grows in a cycle. Put the pictures in order, from seed to fruit.",
        steps: [
          { icon: "#c-seed",       label: "Seed" },
          { icon: "#c-seedling",   label: "Sprout" },
          { icon: "#c-youngplant", label: "Plant" },
          { icon: "#c-flower",     label: "Flower" },
          { icon: "#c-fruit",      label: "Fruit" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "A seed drinks water and soaks up sunlight. Then it sprouts into a little seedling. The seedling keeps growing taller and stronger every day.",
          icons: ["#c-seedling", "#c-water"]
        },
        prompt: "What comes next?",
        narration: "Let's think about how a plant grows and changes.",
        rounds: [
          { ask: "What comes after a seed?", narration: "What comes right after a seed?", hint: "A seed sprouts into a little seedling!",
            options: [ { icon: "#c-seedling", label: "Sprout", correct: true }, { icon: "#c-fruit", label: "Fruit" } ] },
          { ask: "What comes after the flower?", narration: "What grows after the flower?", hint: "After the flower comes the fruit!",
            options: [ { icon: "#c-fruit", label: "Fruit", correct: true }, { icon: "#c-seed", label: "Seed" } ] }
        ],
        pool: [
          { ask: "What comes before the sprout?", narration: "What comes before the little sprout?", hint: "A tiny seed comes before the sprout!",
            options: [ { icon: "#c-seed", label: "Seed", correct: true }, { icon: "#c-flower", label: "Flower" } ] },
          { ask: "What comes after the sprout?", narration: "What comes right after the sprout?", hint: "The sprout keeps growing into a plant!",
            options: [ { icon: "#c-youngplant", label: "Plant", correct: true }, { icon: "#c-fruit", label: "Fruit" } ] },
          { ask: "A fruit has seeds to grow…?", narration: "What do the seeds inside a fruit grow into?", hint: "Seeds inside the fruit grow new plants!",
            options: [ { icon: "#c-seedling", label: "New plants", correct: true }, { icon: "#c-flower", label: "Flowers only" } ] },
          { ask: "What comes before the fruit?", narration: "What grows on the plant before the fruit?", hint: "A flower comes before the fruit!",
            options: [ { icon: "#c-flower", label: "Flower", correct: true }, { icon: "#c-seed", label: "Seed" } ] }
        ]
      },
      {
        engine: "dots",
        reading: {
          text: "Some plants grow juicy fruits we can eat. An apple, a pumpkin, and a strawberry all grow from flowers. Fruits have seeds inside to grow new plants!",
          icons: ["#c-fruit", "#c-seed"]
        },
        prompt: "Connect the dots!",
        narration: "Connect the dots to find a yummy fruit. Start at number one!",
        viewBox: "0 0 100 100",
        dots: [ {x:50,y:22}, {x:72,y:34}, {x:74,y:58}, {x:50,y:72}, {x:26,y:58}, {x:28,y:34} ],
        reveal: '<rect x="47" y="16" width="6" height="14" rx="3" fill="#8a5a36"/>' +
                '<circle cx="50" cy="50" r="22" fill="#fa5252"/>' +
                '<path d="M53 30c2-7 8-10 13-9-1 7-6 10-13 9z" fill="#37b24d"/>'
      },
      {
        engine: "color",
        reading: {
          text: "A fruit grows from a flower. Apples, oranges, and bananas are all fruits. Every fruit has seeds inside that can grow into a whole new plant!",
          icons: ["#c-fruit", "#c-flower"]
        },
        prompt: "Color the apple!",
        narration: "Color the apple. Pick a color, then tap the parts with that number.",
        palette: [
          { key: 1, color: "#fa5252", name: "red" },
          { key: 2, color: "#37b24d", name: "green" },
          { key: 3, color: "#8a5a36", name: "brown" }
        ],
        art:
          '<svg viewBox="0 0 200 200" role="img" aria-label="Color the apple">' +
            '<g data-key="3" aria-label="stem, color 3">' +
              '<rect class="cbn-fill" x="95" y="36" width="10" height="38" rx="4" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="100" y="60" text-anchor="middle">3</text>' +
            '</g>' +
            '<g data-key="2" aria-label="leaf, color 2">' +
              '<path class="cbn-fill" d="M104 56 C124 34 150 40 156 56 C138 66 114 64 104 56 Z" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="132" y="55" text-anchor="middle">2</text>' +
            '</g>' +
            '<g data-key="1" aria-label="apple, color 1">' +
              '<path class="cbn-fill" d="M100 70 C58 70 42 112 58 148 C71 176 92 182 100 182 C108 182 129 176 142 148 C158 112 142 70 100 70 Z" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="100" y="134" text-anchor="middle">1</text>' +
            '</g>' +
          '</svg>'
      }
    ]
  };
})();
