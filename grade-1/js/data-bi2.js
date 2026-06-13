/* ============================================================
   data-bi2.js — Big Idea 2: "Plants and animals live in many
   different places." (Habitat and Survival)
   Distilled from Daily Science Grade 1 (EMC 5011), pp. 36-65.
   Six units: Weeks 1-4, a Review, and a Hands-on activity.
   ============================================================ */
(function () {
  var BI = 2, TITLE = "Plants and animals live in many different places.";

  /* ---- Week 1: Where do animals sleep? (pp. 38-43) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "animal-homes", bigIdea: BI, bigIdeaTitle: TITLE, week: 1,
    question: "Where do animals sleep?", color: "#6E8B3D", cardIcon: "ic-forest",
    vocab: [
      { word: "habitat", kid: "a place where things live", icon: "ic-forest" },
      { word: "nest",    kid: "a bird's tree home",        icon: "ic-nest" },
      { word: "den",     kid: "a home for wild animals",   icon: "ic-den" }
    ],
    reading: {
      title: "Where do animals sleep?",
      lines: [
        { text: "A habitat is a place where animals live.", icon: "ic-forest" },
        { text: "There are many habitats on Earth.",        icon: "ic-tree" },
        { text: "A forest is full of trees and plants.",    icon: "ic-forest" },
        { text: "A bird sleeps in a nest.",                 icon: "ic-nest" },
        { text: "A fox sleeps in a den.",                   icon: "ic-den" },
        { text: "A desert is very hot and dry.",            icon: "ic-desert" },
        { text: "A snake hides under a warm rock.",         icon: "ic-snake" },
        { text: "The ocean is full of salty water.",        icon: "ic-ocean" },
        { text: "A fish can even sleep underwater!",        icon: "ic-fish" }
      ]
    },
    games: [
      {
        engine: "match", title: "Find each home!",
        prompt: "Match each animal to its habitat.",
        narration: "Tap an animal, then tap the place where it lives.",
        pairs: [
          { from: { icon: "ic-owl",  label: "owl"  }, to: { icon: "ic-forest", label: "forest" } },
          { from: { icon: "ic-fish", label: "fish" }, to: { icon: "ic-ocean",  label: "ocean"  } },
          { from: { icon: "ic-snake", label: "snake" }, to: { icon: "ic-desert", label: "desert" } }
        ]
      },
      {
        engine: "sort", title: "Where do they live?",
        prompt: "Put each animal in its habitat.",
        narration: "Some animals live in the forest. Some in the desert. Some in the ocean. Tap one, then tap its home.",
        bins: [
          { id: "forest", label: "Forest", icon: "ic-forest" },
          { id: "desert", label: "Desert", icon: "ic-desert" },
          { id: "ocean",  label: "Ocean",  icon: "ic-ocean" }
        ],
        items: [
          { icon: "ic-owl",   label: "owl",   bin: "forest" },
          { icon: "ic-fox",   label: "fox",   bin: "forest" },
          { icon: "ic-snake", label: "snake", bin: "desert" },
          { icon: "ic-coyote", label: "coyote", bin: "desert" },
          { icon: "ic-fish",  label: "fish",  bin: "ocean" },
          { icon: "ic-octopus", label: "octopus", bin: "ocean" }
        ]
      },
      {
        engine: "readword", title: "Name the habitat!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-forest", answer: "forest", options: ["forest", "desert", "ocean"] },
          { icon: "ic-desert", answer: "desert", options: ["desert", "forest", "ocean"] },
          { icon: "ic-ocean",  answer: "ocean",  options: ["ocean", "desert", "forest"] },
          { icon: "ic-nest",   answer: "nest",   options: ["nest", "den"] }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A whale lives in the ocean.",  icons: ["ic-whale", "ic-ocean"], answer: true },
          { text: "A fox sleeps in a den.",       icons: ["ic-fox", "ic-den"],     answer: true },
          { text: "A camel lives in the ocean.",  icons: ["ic-camel", "ic-ocean"], answer: false },
          { text: "A bird sleeps in a nest.",     icons: ["ic-bird", "ic-nest"],   answer: true },
          { text: "A desert is wet and cold.",    icons: ["ic-desert"],            answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["habitat", "nest", "den"],
        sentences: [
          { icon: "ic-forest", before: "All animals live in a", after: ".", answer: "habitat" },
          { icon: "ic-nest",   before: "A bird sleeps in a",    after: ".", answer: "nest" },
          { icon: "ic-den",    before: "A fox sleeps in a",     after: ".", answer: "den" }
        ]
      }
    ]
  });

  /* ---- Week 2: Why do camels have humps? (pp. 44-49) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "camel-humps", bigIdea: BI, bigIdeaTitle: TITLE, week: 2,
    question: "Why do camels have humps?", color: "#C9A24B", cardIcon: "ic-camel",
    vocab: [
      { word: "camel",  kid: "lives in the dry desert", icon: "ic-camel" },
      { word: "stores", kid: "keeps it for later",      icon: "ic-hump" },
      { word: "desert", kid: "a hot, dry place",        icon: "ic-desert" }
    ],
    reading: {
      title: "Why do camels have humps?",
      lines: [
        { text: "A camel lives in the desert.",            icon: "ic-camel" },
        { text: "The desert is hot and dry.",              icon: "ic-desert" },
        { text: "There is not much food or water.",        icon: "ic-sand" },
        { text: "A camel stores fat in its hump.",         icon: "ic-hump" },
        { text: "The fat helps it go a long time.",        icon: "ic-camel" },
        { text: "Big feet help it walk on the sand.",      icon: "ic-sand" },
        { text: "Long eyelashes keep sand out of its eyes.", icon: "ic-eyelash" },
        { text: "These body parts help the camel live here.", icon: "ic-camel" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["stores", "desert", "hump"],
        sentences: [
          { icon: "ic-hump",   before: "A camel has a", after: " made of fat.", answer: "hump" },
          { icon: "ic-desert", before: "A camel lives in the", after: ".", answer: "desert" },
          { icon: "ic-camel",  before: "The hump", after: " fat for later.", answer: "stores" }
        ]
      },
      {
        engine: "match", title: "What is it for?",
        prompt: "Match each body part to its job.",
        narration: "Tap a camel body part, then tap what it does.",
        pairs: [
          { from: { icon: "ic-hump",    label: "hump"    }, to: { icon: "ic-camel",  label: "stores fat" } },
          { from: { icon: "ic-eyelash", label: "eyelashes" }, to: { icon: "ic-sand",  label: "block sand" } },
          { from: { icon: "ic-sand",    label: "big feet" }, to: { icon: "ic-desert", label: "walk on sand" } }
        ]
      },
      {
        engine: "needs", title: "Help the camel!",
        prompt: "Tap the body parts that help a camel in the desert.",
        narration: "A camel lives in the hot desert. Tap the body parts that help it live there. Leave the others.",
        hero: "ic-camel", wrongMsg: "A {x} does not help a camel in the desert.",
        choices: [
          { icon: "ic-hump",    label: "hump",      need: true },
          { icon: "ic-sand",    label: "big feet",  need: true },
          { icon: "ic-eyelash", label: "eyelashes", need: true },
          { icon: "ic-gills",   label: "gills",     need: false },
          { icon: "ic-leaf",    label: "leaf",      need: false }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A camel's hump helps it live in the desert.", icons: ["ic-camel", "ic-hump"], answer: true },
          { text: "It rains a lot in the desert.",               icons: ["ic-desert"],           answer: false },
          { text: "Long eyelashes keep sand out of its eyes.",   icons: ["ic-eyelash"],          answer: true },
          { text: "A camel's big feet help it swim.",            icons: ["ic-camel", "ic-sand"], answer: false },
          { text: "Food is hard to find in the desert.",         icons: ["ic-sand"],             answer: true }
        ]
      },
      {
        engine: "readword", title: "Name it!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-camel",  answer: "camel",  options: ["camel", "whale", "fox"] },
          { icon: "ic-hump",   answer: "hump",   options: ["hump", "nest", "den"] },
          { icon: "ic-desert", answer: "desert", options: ["desert", "ocean", "forest"] }
        ]
      }
    ]
  });

  /* ---- Week 3: Can a whale live in a lake? (pp. 50-55) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "whale-lake", bigIdea: BI, bigIdeaTitle: TITLE, week: 3,
    question: "Can a whale live in a lake?", color: "#3D7A8B", cardIcon: "ic-whale",
    vocab: [
      { word: "whale", kid: "the biggest ocean animal", icon: "ic-whale" },
      { word: "krill", kid: "tiny food for whales",     icon: "ic-krill" },
      { word: "lake",  kid: "small fresh water",         icon: "ic-lake" }
    ],
    reading: {
      title: "Can a whale live in a lake?",
      lines: [
        { text: "The ocean is very big.",               icon: "ic-ocean" },
        { text: "It is full of salty water.",            icon: "ic-salt" },
        { text: "A whale lives in the ocean.",           icon: "ic-whale" },
        { text: "A whale is the biggest ocean animal.",  icon: "ic-whale" },
        { text: "Many whales eat tiny krill.",           icon: "ic-krill" },
        { text: "A lake is much smaller than an ocean.", icon: "ic-lake" },
        { text: "Lake water is fresh, not salty.",       icon: "ic-water" },
        { text: "A lake is too small for a big whale.",  icon: "ic-lake" },
        { text: "So a whale cannot live in a lake!",     icon: "ic-whale" }
      ]
    },
    games: [
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Whales eat krill.",                icons: ["ic-whale", "ic-krill"], answer: true },
          { text: "Water in a lake is salty.",        icons: ["ic-lake"],              answer: false },
          { text: "A whale and krill both live in water.", icons: ["ic-whale", "ic-krill"], answer: true },
          { text: "Krill are bigger than whales.",    icons: ["ic-krill", "ic-whale"], answer: false },
          { text: "A lake is smaller than an ocean.", icons: ["ic-lake", "ic-ocean"],  answer: true }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["whale", "krill", "lake"],
        sentences: [
          { icon: "ic-whale", before: "A", after: " is the biggest ocean animal.", answer: "whale" },
          { icon: "ic-krill", before: "Many whales eat", after: ".", answer: "krill" },
          { icon: "ic-lake",  before: "A whale cannot live in a", after: ".", answer: "lake" }
        ]
      },
      {
        engine: "match", title: "Where does it live?",
        prompt: "Match each animal to its habitat.",
        narration: "Tap an animal, then tap the water where it lives.",
        pairs: [
          { from: { icon: "ic-whale", label: "whale" }, to: { icon: "ic-ocean", label: "ocean" } },
          { from: { icon: "ic-frog",  label: "frog"  }, to: { icon: "ic-lake",  label: "lake"  } },
          { from: { icon: "ic-turtle", label: "turtle" }, to: { icon: "ic-lake", label: "lake" } }
        ]
      },
      {
        engine: "sort", title: "Ocean or lake?",
        prompt: "Put each one where it lives.",
        narration: "The ocean is big and salty. A lake is small and fresh. Tap one, then tap where it lives.",
        bins: [
          { id: "ocean", label: "Ocean", icon: "ic-ocean" },
          { id: "lake",  label: "Lake",  icon: "ic-lake" }
        ],
        items: [
          { icon: "ic-whale",   label: "whale",   bin: "ocean" },
          { icon: "ic-krill",   label: "krill",   bin: "ocean" },
          { icon: "ic-octopus", label: "octopus", bin: "ocean" },
          { icon: "ic-frog",    label: "frog",    bin: "lake" },
          { icon: "ic-turtle",  label: "turtle",  bin: "lake" },
          { icon: "ic-fish",    label: "fish",    bin: "lake" }
        ]
      }
    ]
  });

  /* ---- Week 4: Why do trees have different kinds of leaves? (pp. 56-61) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "tree-leaves", bigIdea: BI, bigIdeaTitle: TITLE, week: 4,
    question: "Why do trees have different kinds of leaves?", color: "#5E8C3A", cardIcon: "ic-maple-leaf",
    vocab: [
      { word: "leaves",    kid: "they make food for the tree", icon: "ic-leaf" },
      { word: "evergreen", kid: "stays green all year",         icon: "ic-evergreen" }
    ],
    reading: {
      title: "Why do trees have different kinds of leaves?",
      lines: [
        { text: "All trees have leaves.",                   icon: "ic-leaf" },
        { text: "Leaves come in many shapes.",              icon: "ic-maple-leaf" },
        { text: "Flat leaves soak up the warm sun.",        icon: "ic-sun" },
        { text: "In the fall, they turn red and orange.",   icon: "ic-maple-leaf" },
        { text: "Then they dry up and fall off.",           icon: "ic-bare-tree" },
        { text: "An evergreen grows in cold places.",       icon: "ic-evergreen" },
        { text: "It has thin leaves like needles.",         icon: "ic-needle-leaf" },
        { text: "These leaves stay green all year.",        icon: "ic-evergreen" },
        { text: "Leaves match the place where the tree lives.", icon: "ic-tree" }
      ]
    },
    games: [
      {
        engine: "sort", title: "Which tree?",
        prompt: "Put each tree where it belongs.",
        narration: "Some trees lose their leaves in winter. Evergreens stay green. Tap one, then tap the right basket.",
        bins: [
          { id: "loses",     label: "Loses leaves", icon: "ic-bare-tree" },
          { id: "evergreen", label: "Stays green",  icon: "ic-evergreen" }
        ],
        items: [
          { icon: "ic-maple-leaf",  label: "maple",  bin: "loses" },
          { icon: "ic-leaf",        label: "broad leaf", bin: "loses" },
          { icon: "ic-bare-tree",   label: "bare tree", bin: "loses" },
          { icon: "ic-needle-leaf", label: "needles", bin: "evergreen" },
          { icon: "ic-evergreen",   label: "evergreen", bin: "evergreen" }
        ]
      },
      {
        engine: "match", title: "Where does it grow?",
        prompt: "Match each leaf to its place.",
        narration: "Tap a leaf, then tap the place where that tree grows.",
        pairs: [
          { from: { icon: "ic-maple-leaf",  label: "flat leaf" }, to: { icon: "ic-sun",  label: "warm place" } },
          { from: { icon: "ic-needle-leaf", label: "needle leaf" }, to: { icon: "ic-evergreen", label: "cold place" } }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Evergreen trees stay green all year.", icons: ["ic-evergreen"],   answer: true },
          { text: "Flat leaves turn colors in the fall.", icons: ["ic-maple-leaf"],  answer: true },
          { text: "Trees with flat leaves lose them in summer.", icons: ["ic-bare-tree"], answer: false },
          { text: "An evergreen has leaves like needles.", icons: ["ic-needle-leaf"], answer: true },
          { text: "All trees have the same leaves.",       icons: ["ic-leaf"],        answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["leaves", "winter", "evergreen"],
        sentences: [
          { icon: "ic-leaf",      before: "Trees have many kinds of", after: ".", answer: "leaves" },
          { icon: "ic-bare-tree", before: "Flat leaves fall off in the", after: ".", answer: "winter" },
          { icon: "ic-evergreen", before: "An", after: " tree has pointy leaves.", answer: "evergreen" }
        ]
      },
      {
        engine: "readword", title: "Name it!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-maple-leaf",  answer: "maple",     options: ["maple", "pine"] },
          { icon: "ic-needle-leaf", answer: "needle",    options: ["needle", "flat"] },
          { icon: "ic-evergreen",   answer: "evergreen", options: ["evergreen", "bare"] }
        ]
      }
    ]
  });

  /* ---- Week 5: Unit Review (pp. 62-64) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi2-review", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "review",
    question: "Big Idea 2 Review", color: "#C97B2C", cardIcon: "ic-star",
    reading: {
      title: "What did we learn?",
      lines: [
        { text: "A habitat is where things live.",        icon: "ic-forest" },
        { text: "A camel lives in the dry desert.",       icon: "ic-camel" },
        { text: "A whale lives in the big ocean.",        icon: "ic-whale" },
        { text: "Some trees stay green all year.",        icon: "ic-evergreen" },
        { text: "Now show what you know!",                icon: "ic-star" }
      ]
    },
    games: [
      {
        engine: "readword", title: "Find the word!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-camel",     answer: "camel",     options: ["camel", "whale", "evergreen"] },
          { icon: "ic-ocean",     answer: "ocean",     options: ["ocean", "lake", "forest"] },
          { icon: "ic-nest",      answer: "nest",      options: ["nest", "den"] },
          { icon: "ic-evergreen", answer: "evergreen", options: ["evergreen", "desert", "ocean"] }
        ]
      },
      {
        engine: "match", title: "Find each home!",
        prompt: "Match each animal to its habitat.",
        narration: "Tap an animal, then tap the place where it lives.",
        pairs: [
          { from: { icon: "ic-camel", label: "camel" }, to: { icon: "ic-desert", label: "desert" } },
          { from: { icon: "ic-whale", label: "whale" }, to: { icon: "ic-ocean",  label: "ocean"  } },
          { from: { icon: "ic-fox",   label: "fox"   }, to: { icon: "ic-forest", label: "forest" } }
        ]
      },
      {
        engine: "sort", title: "Sort the words!",
        prompt: "Put each one where it belongs.",
        narration: "Is it a habitat, or an animal home? Tap one, then tap the right basket.",
        bins: [
          { id: "habitat", label: "Habitats", icon: "ic-forest" },
          { id: "home",    label: "Animal homes", icon: "ic-nest" }
        ],
        items: [
          { icon: "ic-forest", label: "forest", bin: "habitat" },
          { icon: "ic-desert", label: "desert", bin: "habitat" },
          { icon: "ic-ocean",  label: "ocean",  bin: "habitat" },
          { icon: "ic-nest",   label: "nest",   bin: "home" },
          { icon: "ic-den",    label: "den",    bin: "home" }
        ]
      },
      {
        engine: "truefalse", title: "What do you know?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A camel lives in the desert.",          icons: ["ic-camel", "ic-desert"], answer: true },
          { text: "A whale can live in a small lake.",     icons: ["ic-whale", "ic-lake"],   answer: false },
          { text: "Evergreen trees stay green all year.",  icons: ["ic-evergreen"],          answer: true },
          { text: "A nest is a home for a bird.",          icons: ["ic-bird", "ic-nest"],    answer: true },
          { text: "Whales eat krill.",                     icons: ["ic-whale", "ic-krill"],  answer: true }
        ]
      }
    ]
  });

  /* ---- Week 5: Hands-on Activity "Look at a Leaf" (p. 65) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi2-handson", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "handson",
    question: "Look at a Leaf", color: "#5E8C3A", cardIcon: "ic-hand-lens",
    games: [
      {
        engine: "handson", title: "Look at a Leaf", icon: "ic-hand-lens",
        narration: "A scientist looks closely at things. Let's look closely at a leaf! Here is what to do.",
        materials: [
          { icon: "ic-leaf",      label: "a leaf" },
          { icon: "ic-hand-lens", label: "hand lens" },
          { icon: "ic-crayon",    label: "crayons" }
        ],
        steps: [
          "Touch the leaf. Is it rough or smooth?",
          "Smell the leaf. What does it smell like?",
          "Look through the hand lens. Find lines, bumps, or holes.",
          "Put the leaf under your paper.",
          "Rub a crayon on top to make a leaf rubbing!"
        ]
      }
    ]
  });
})();
