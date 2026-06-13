/* data/livingNonliving.js — "Alive or Not?" (Life Science · Living & Nonliving)
   NGSS: tell living from nonliving by needs and growth; sort by traits. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.livingNonliving = {
    title: "Alive or Not?",
    color: "life",
    mascot: "#m-sprout",
    vocab: ["living", "nonliving", "needs", "grow"],
    activities: [
      {
        engine: "sort",
        reading: {
          text: "Living things are alive. People, animals, and plants are living things. Rocks, balls, and cars are not living. Living things can grow and have babies.",
          icons: ["#c-tree", "#c-rock"]
        },
        prompt: "Living or not living?",
        narration: "Living things grow and need food and water. Nonliving things do not. Sort them!",
        bins: [
          { id: "living",    label: "Living",     icon: "#c-leaf" },
          { id: "nonliving", label: "Not living", icon: "#c-rock" }
        ],
        items: [
          { icon: "#c-cat",  label: "Cat",  bin: "living" },
          { icon: "#c-tree", label: "Tree", bin: "living" },
          { icon: "#c-bird", label: "Bird", bin: "living" },
          { icon: "#c-rock", label: "Rock", bin: "nonliving" },
          { icon: "#c-ball", label: "Ball", bin: "nonliving" },
          { icon: "#c-car",  label: "Car",  bin: "nonliving" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "A living thing can grow, eat, and have babies. A cat is living. A rock cannot grow or eat. It is not living.",
          icons: ["#c-cat", "#c-rock"]
        },
        prompt: "Is it living?",
        narration: "Living things need food, water, and air, and they grow. Let's check!",
        rounds: [
          { ask: "Which one is living?", narration: "Which one is a living thing?", hint: "A tree grows and needs water. It is living!",
            options: [ { icon: "#c-tree", label: "Tree", correct: true }, { icon: "#c-rock", label: "Rock" } ] },
          { ask: "Which one is NOT living?", narration: "Which one is not living?", hint: "A ball does not eat or grow. It is not living!",
            options: [ { icon: "#c-ball", label: "Ball", correct: true }, { icon: "#c-cat", label: "Cat" } ] },
          { ask: "Living things can…?", narration: "What can living things do?", hint: "Living things grow!",
            options: [ { icon: "#c-youngplant", label: "Grow", correct: true }, { icon: "#c-rock", label: "Stay the same" } ] }
        ],
        pool: [
          { ask: "Does a rock need food?", narration: "Does a rock need food to survive?", hint: "No! A rock is not living, so it does not need food!",
            options: [ { label: "No", correct: true }, { label: "Yes" } ] },
          { ask: "Does a cat need water?", narration: "Does a cat need water to live?", hint: "Yes! A cat is living, so it needs water!",
            options: [ { label: "Yes", correct: true }, { label: "No" } ] },
          { ask: "Which one grows?", narration: "Which one grows bigger over time?", hint: "A plant grows. A rock does not grow!",
            options: [ { icon: "#c-tree", label: "Plant", correct: true }, { icon: "#c-rock", label: "Rock" } ] },
          { ask: "A fish is…?", narration: "A fish — is it living or not living?", hint: "A fish eats and grows, so it is living!",
            options: [ { icon: "#c-leaf", label: "Living", correct: true }, { icon: "#c-ball", label: "Not living" } ] }
        ]
      },
      {
        engine: "match",
        reading: {
          text: "All living things need food and water to survive. Plants also need sunlight to grow. Animals need food they can eat.",
          icons: ["#c-water", "#c-meat"]
        },
        prompt: "What do living things need?",
        narration: "Living things need food, water, and light. Match each one to what it needs.",
        pairs: [
          { a: { icon: "#c-cat",    label: "Cat" },    b: { icon: "#c-meat",  label: "Food" } },
          { a: { icon: "#c-flower", label: "Flower" }, b: { icon: "#c-water", label: "Water" } },
          { a: { icon: "#c-bird",   label: "Bird" },   b: { icon: "#u-sun",   label: "Light" } }
        ]
      }
    ]
  };
})();
