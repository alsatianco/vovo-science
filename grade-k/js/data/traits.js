/* data/traits.js — "Look Like Family" (Life Science · Traits)
   NGSS: young plants and animals are similar to, but not exactly like,
   their parents. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.traits = {
    title: "Look Like Family",
    color: "life",
    mascot: "#m-sprout",
    vocab: ["parent", "baby", "young", "same", "different"],
    activities: [
      {
        engine: "match",
        reading: {
          text: "Young animals look like their parents. A puppy looks like its mother dog. A chick looks like its parent hen. Young plants also look like parent plants!",
          icons: ["#c-puppy", "#c-chick"]
        },
        prompt: "Match the baby to its parent.",
        narration: "Baby animals look like their parents. Tap a baby, then tap its mom or dad.",
        pairs: [
          { a: { icon: "#c-chick",    label: "Chick" },    b: { icon: "#c-hen",  label: "Hen" } },
          { a: { icon: "#c-puppy",    label: "Puppy" },    b: { icon: "#c-dog",  label: "Dog" } },
          { a: { icon: "#c-seedling", label: "Seedling" }, b: { icon: "#c-tree", label: "Tree" } }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "Young animals share traits with their parents. Traits are things like color, shape, and size. A puppy and its parent dog have the same kind of fur.",
          icons: ["#c-dog", "#c-puppy"]
        },
        prompt: "Whose baby is it?",
        narration: "Babies are like their parents, but smaller. Let's see!",
        rounds: [
          { ask: "A puppy grows up to be a…?", narration: "A puppy grows up to be a what?", hint: "A puppy grows into a dog!",
            options: [ { icon: "#c-dog", label: "Dog", correct: true }, { icon: "#c-hen", label: "Hen" } ] },
          { ask: "A chick grows up to be a…?", narration: "A chick grows up to be a what?", hint: "A chick grows into a hen!",
            options: [ { icon: "#c-hen", label: "Hen", correct: true }, { icon: "#c-tree", label: "Tree" } ] },
          { ask: "A seedling grows into a…?", narration: "A little seedling grows into a what?", hint: "A seedling grows into a big tree!",
            options: [ { icon: "#c-tree", label: "Tree", correct: true }, { icon: "#c-dog", label: "Dog" } ] }
        ],
        pool: [
          { ask: "A kitten grows into a…?", narration: "A little kitten grows into a what?", hint: "A kitten grows into a cat!",
            options: [ { icon: "#c-cat", label: "Cat", correct: true }, { icon: "#c-hen", label: "Hen" } ] },
          { ask: "Baby animals look like their…?", narration: "Baby animals look like their what?", hint: "Babies look like their parents!",
            options: [ { icon: "#c-dog", label: "Parents", correct: true }, { icon: "#c-tree", label: "Trees" } ] },
          { ask: "Which one is the baby?", narration: "Which one is the baby?", hint: "A chick is the baby. A hen is the grown-up!",
            options: [ { icon: "#c-chick", label: "Chick", correct: true }, { icon: "#c-hen", label: "Hen" } ] }
        ]
      },
      {
        engine: "sort",
        reading: {
          text: "Baby animals grow up to look like their parents. A chick is a baby hen. A puppy is a baby dog. Can you tell the babies from the grown-ups?",
          icons: ["#c-chick", "#c-hen"]
        },
        prompt: "Babies and grown-ups",
        narration: "Sort the baby animals and the grown-up animals.",
        bins: [
          { id: "baby",  label: "Babies",    icon: "#c-chick" },
          { id: "grown", label: "Grown-ups", icon: "#c-dog" }
        ],
        items: [
          { icon: "#c-chick", label: "Chick", bin: "baby" },
          { icon: "#c-puppy", label: "Puppy", bin: "baby" },
          { icon: "#c-hen",   label: "Hen",   bin: "grown" },
          { icon: "#c-cow",   label: "Cow",   bin: "grown" }
        ]
      }
    ]
  };
})();
