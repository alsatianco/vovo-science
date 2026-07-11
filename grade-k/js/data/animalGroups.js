/* data/animalGroups.js — "Animal Groups" (Life Science · Classifying animals)
   The chapter kids meet six animal groups — mammals, birds, fish, reptiles,
   amphibians, insects — one section at a time, then a two-part final check
   that sorts every group. Reading text follows the "Reading in Science"
   model: one defining trait per group, picture-backed, spoken by the reader.
   Reuses the existing sort / quiz engines; no new engine code. EN-only, like
   the other grade-k packs (the reader falls back to English). */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};

  window.SCIENCE_DATA.animalGroups = {
    title: "Animal Groups",
    color: "life",
    mascot: "#m-sprout",
    vocab: ["mammal", "bird", "fish", "reptile", "amphibian", "insect"],
    activities: [
      /* 1) MAMMALS — sort mammal vs not (fur + milk) */
      {
        engine: "sort",
        reading: {
          text: "Mammals have fur or hair. Baby mammals drink milk from their mom. A dog, a cat, and a cow are mammals.",
          icons: ["#c-dog", "#c-cow"]
        },
        prompt: "Find the mammals!",
        narration: "Mammals have fur and drink milk. Put each mammal in the mammal basket.",
        bins: [
          { id: "mammal", label: "Mammal",       icon: "#c-dog" },
          { id: "other",  label: "Not a mammal", icon: "#c-fish" }
        ],
        items: [
          { icon: "#c-cat",    label: "Cat",    bin: "mammal" },
          { icon: "#c-cow",    label: "Cow",    bin: "mammal" },
          { icon: "#c-rabbit", label: "Rabbit", bin: "mammal" },
          { icon: "#c-fish",   label: "Fish",   bin: "other" },
          { icon: "#c-bird",   label: "Bird",   bin: "other" }
        ]
      },

      /* 2) BIRDS — quiz: which one is a bird? (feathers + wings + eggs) */
      {
        engine: "quiz",
        reading: {
          text: "Birds have feathers and wings. Birds have a beak and lay eggs. Most birds can fly in the sky.",
          icons: ["#c-bird", "#c-hen"]
        },
        prompt: "Which one is a bird?",
        narration: "Birds have feathers and wings. Tap the bird!",
        rounds: [
          { ask: "Which one is a bird?", narration: "Which one is a bird?", hint: "A bird has feathers and wings!",
            options: [ { icon: "#c-bird", label: "Bird", correct: true }, { icon: "#c-cat", label: "Cat" } ] },
          { ask: "Which one has feathers?", narration: "Which one has feathers?", hint: "A hen has soft feathers!",
            options: [ { icon: "#c-hen", label: "Hen", correct: true }, { icon: "#c-fish", label: "Fish" } ] }
        ],
        pool: [
          { ask: "Which one is a baby bird?", narration: "Which one is a baby bird?", hint: "A chick is a baby bird. It will grow feathers and wings!",
            options: [ { icon: "#c-chick", label: "Chick", correct: true }, { icon: "#c-frog", label: "Frog" } ] },
          { ask: "Which one has a beak?", narration: "Which one has a beak?", hint: "Birds eat with a beak!",
            options: [ { icon: "#c-bird", label: "Bird", correct: true }, { icon: "#c-rabbit", label: "Rabbit" } ] }
        ]
      },

      /* 3) FISH — sort fish vs not (fins + gills + water) */
      {
        engine: "sort",
        reading: {
          text: "Fish live in the water. Fish have fins to swim and gills to breathe. A fish is covered in shiny scales.",
          icons: ["#c-fish", "#c-shark"]
        },
        prompt: "Find the fish!",
        narration: "Fish live in water and swim with fins. Put each fish in the fish basket.",
        bins: [
          { id: "fish",  label: "Fish",       icon: "#c-fish" },
          { id: "other", label: "Not a fish", icon: "#c-cat" }
        ],
        items: [
          { icon: "#c-fish",  label: "Fish",  bin: "fish" },
          { icon: "#c-shark", label: "Shark", bin: "fish" },
          { icon: "#c-bird",  label: "Bird",  bin: "other" },
          { icon: "#c-cat",   label: "Cat",   bin: "other" },
          { icon: "#c-frog",  label: "Frog",  bin: "other" }
        ]
      },

      /* 4) REPTILES — quiz: which one is a reptile? (dry scales + eggs on land) */
      {
        engine: "quiz",
        reading: {
          text: "Reptiles have dry, scaly skin. They lay their eggs on the land. A turtle, a snake, and a lizard are reptiles.",
          icons: ["#c-turtle", "#c-snake"]
        },
        prompt: "Which one is a reptile?",
        narration: "Reptiles have dry, scaly skin. Tap the reptile!",
        rounds: [
          { ask: "Which one is a reptile?", narration: "Which one is a reptile?", hint: "A turtle has scales and lays eggs on land!",
            options: [ { icon: "#c-turtle", label: "Turtle", correct: true }, { icon: "#c-fish", label: "Fish" } ] },
          { ask: "Which one has dry, scaly skin?", narration: "Which one has dry, scaly skin?", hint: "A snake is a reptile!",
            options: [ { icon: "#c-snake", label: "Snake", correct: true }, { icon: "#c-cat", label: "Cat" } ] }
        ],
        pool: [
          { ask: "Which one is a reptile?", narration: "Which one is a reptile?", hint: "A lizard has scaly skin!",
            options: [ { icon: "#c-lizard", label: "Lizard", correct: true }, { icon: "#c-bird", label: "Bird" } ] }
        ]
      },

      /* 5) AMPHIBIANS — sort amphibian vs not (wet skin + water & land + tadpole) */
      {
        engine: "sort",
        reading: {
          text: "Amphibians have smooth, wet skin. They live in the water and on the land. A baby frog is called a tadpole.",
          icons: ["#c-frog", "#c-toad"]
        },
        prompt: "Find the amphibians!",
        narration: "Amphibians have wet skin and live in two places. Put each one in the amphibian basket.",
        bins: [
          { id: "amphibian", label: "Amphibian",       icon: "#c-frog" },
          { id: "other",     label: "Not an amphibian", icon: "#c-cat" }
        ],
        items: [
          { icon: "#c-frog", label: "Frog", bin: "amphibian" },
          { icon: "#c-toad", label: "Toad", bin: "amphibian" },
          { icon: "#c-fish", label: "Fish", bin: "other" },
          { icon: "#c-cat",  label: "Cat",  bin: "other" }
        ]
      },

      /* 6) INSECTS — sort insect vs not (six legs + three body parts) */
      {
        engine: "sort",
        reading: {
          text: "Insects have six legs. Their body has three parts. Many insects have wings, like a bee and a butterfly.",
          icons: ["#c-bee", "#c-butterfly"]
        },
        prompt: "Find the insects!",
        narration: "Insects have six legs. Put each insect in the insect basket.",
        bins: [
          { id: "insect", label: "Insect",       icon: "#c-bee" },
          { id: "other",  label: "Not an insect", icon: "#c-bird" }
        ],
        items: [
          { icon: "#c-bee",       label: "Bee",       bin: "insect" },
          { icon: "#c-ant",       label: "Ant",       bin: "insect" },
          { icon: "#c-ladybug",   label: "Ladybug",   bin: "insect" },
          { icon: "#c-bird",      label: "Bird",      bin: "other" },
          { icon: "#c-fish",      label: "Fish",      bin: "other" }
        ]
      },

      /* 7) FINAL CHECK, part 1 — 3-way sort: mammal / bird / fish */
      {
        engine: "sort",
        reading: {
          text: "You know so many animal groups! Let's sort them. Mammals have fur, birds have feathers, and fish have fins.",
          icons: ["#c-dog", "#c-bird", "#c-fish"]
        },
        prompt: "Sort them into groups!",
        narration: "Tap an animal, then tap its group basket. Mammal, bird, or fish?",
        bins: [
          { id: "mammal", label: "Mammal", icon: "#c-dog" },
          { id: "bird",   label: "Bird",   icon: "#c-bird" },
          { id: "fish",   label: "Fish",   icon: "#c-fish" }
        ],
        items: [
          { icon: "#c-cat",   label: "Cat",   bin: "mammal" },
          { icon: "#c-cow",   label: "Cow",   bin: "mammal" },
          { icon: "#c-hen",   label: "Hen",   bin: "bird" },
          { icon: "#c-chick", label: "Chick", bin: "bird" },
          { icon: "#c-shark", label: "Shark", bin: "fish" },
          { icon: "#c-fish",  label: "Fish",  bin: "fish" }
        ]
      },

      /* 8) FINAL CHECK, part 2 — 3-way sort: reptile / amphibian / insect */
      {
        engine: "sort",
        reading: {
          text: "Great sorting! Now for three more groups. Reptiles have scales, amphibians live in two places, and insects have six legs.",
          icons: ["#c-turtle", "#c-frog", "#c-bee"]
        },
        prompt: "Sort them into groups!",
        narration: "Tap an animal, then tap its group basket. Reptile, amphibian, or insect?",
        bins: [
          { id: "reptile",   label: "Reptile",   icon: "#c-turtle" },
          { id: "amphibian", label: "Amphibian", icon: "#c-frog" },
          { id: "insect",    label: "Insect",    icon: "#c-bee" }
        ],
        items: [
          { icon: "#c-turtle",    label: "Turtle",    bin: "reptile" },
          { icon: "#c-snake",     label: "Snake",     bin: "reptile" },
          { icon: "#c-frog",      label: "Frog",      bin: "amphibian" },
          { icon: "#c-toad",      label: "Toad",      bin: "amphibian" },
          { icon: "#c-ant",       label: "Ant",       bin: "insect" },
          { icon: "#c-butterfly", label: "Butterfly", bin: "insect" }
        ]
      }
    ]
  };
})();
