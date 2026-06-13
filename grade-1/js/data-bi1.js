/* ============================================================
   data-bi1.js — Big Idea 1 (rest of unit): Weeks 3 & 4, Review, Hands-on.
   Distilled from Daily Science Grade 1 (EMC 5011), pp. 20-35.
   Weeks 1 & 2 live in data.js / data-monkey.js.
   ============================================================ */
(function () {
  var BI = 1, TITLE = "Living things have basic needs.";

  /* ---- Week 3: Do plants have mouths? (pp. 20-25) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "plant-food", bigIdea: BI, bigIdeaTitle: TITLE, week: 3,
    question: "Do plants have mouths?", color: "#6B8E23", cardIcon: "ic-plant-parts",
    vocab: [
      { word: "leaf",  kid: "catches sunlight",   icon: "ic-leaf" },
      { word: "roots", kid: "drink up water",     icon: "ic-roots" },
      { word: "stem",  kid: "holds the plant up", icon: "ic-stem" }
    ],
    reading: {
      title: "Do plants have mouths?",
      lines: [
        { text: "Animals eat food to live.",          icon: "ic-apple" },
        { text: "But plants do not eat.",             icon: "ic-flower" },
        { text: "Plants make their own food!",        icon: "ic-leaf" },
        { text: "Leaves catch the sunlight.",         icon: "ic-sun" },
        { text: "Roots drink water from the ground.", icon: "ic-roots" },
        { text: "The stem holds the plant up tall.",  icon: "ic-stem" },
        { text: "The stem carries water up high.",    icon: "ic-stem" },
        { text: "Plants need air, water, and light.", icon: "ic-water" },
        { text: "So a plant has no mouth at all!",    icon: "ic-plant-parts" }
      ]
    },
    games: [
      {
        engine: "match", title: "What does each part do?",
        prompt: "Match each plant part to its job.",
        narration: "Tap a plant part, then tap what it does.",
        pairs: [
          { from: { icon: "ic-roots", label: "roots" }, to: { icon: "ic-water", label: "drink water" } },
          { from: { icon: "ic-leaf",  label: "leaf"  }, to: { icon: "ic-sun",   label: "catch light" } },
          { from: { icon: "ic-stem",  label: "stem"  }, to: { icon: "ic-plant-parts", label: "hold up" } }
        ]
      },
      {
        engine: "readword", title: "Name the part!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-roots", answer: "roots", options: ["roots", "leaf", "stem"] },
          { icon: "ic-leaf",  answer: "leaf",  options: ["leaf", "roots", "stem"] },
          { icon: "ic-stem",  answer: "stem",  options: ["stem", "leaf", "roots"] }
        ]
      },
      {
        engine: "needs", title: "Help the plant!",
        prompt: "Tap what a plant needs to make food.",
        narration: "A plant makes its own food. Tap the things it needs. Leave the others.",
        hero: "ic-flower", wrongMsg: "A plant does not need a {x} to make food.",
        choices: [
          { icon: "ic-sun",   label: "light", need: true },
          { icon: "ic-water", label: "water", need: true },
          { icon: "ic-air",   label: "air",   need: true },
          { icon: "ic-ball",  label: "ball",  need: false },
          { icon: "ic-shoe",  label: "shoe",  need: false }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A plant makes its own food.", icons: ["ic-flower"],            answer: true },
          { text: "Roots drink water.",          icons: ["ic-roots", "ic-water"], answer: true },
          { text: "Leaves catch sunlight.",      icons: ["ic-leaf", "ic-sun"],    answer: true },
          { text: "A plant eats with a mouth.",  icons: ["ic-flower"],            answer: false },
          { text: "A rock can make food.",       icons: ["ic-rock"],              answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["roots", "leaf", "stem"],
        sentences: [
          { icon: "ic-roots", before: "Water goes in through the", after: ".", answer: "roots" },
          { icon: "ic-leaf",  before: "Light is caught by the",    after: ".", answer: "leaf" },
          { icon: "ic-stem",  before: "The plant is held up by the", after: ".", answer: "stem" }
        ]
      }
    ]
  });

  /* ---- Week 4: Do fish drink water? (pp. 26-31) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "fish-water", bigIdea: BI, bigIdeaTitle: TITLE, week: 4,
    question: "Do fish drink water?", color: "#4F9DAE", cardIcon: "ic-fish",
    vocab: [
      { word: "gills",      kid: "fish breathe with these", icon: "ic-gills" },
      { word: "fresh water", kid: "water in lakes",         icon: "ic-water" },
      { word: "salt water", kid: "water in the ocean",      icon: "ic-salt" }
    ],
    reading: {
      title: "Do fish drink water?",
      lines: [
        { text: "All living things need water.",     icon: "ic-water" },
        { text: "Fish live in the water.",           icon: "ic-fish" },
        { text: "A lake has fresh water.",           icon: "ic-water" },
        { text: "The ocean has salt water.",         icon: "ic-salt" },
        { text: "Fish breathe with gills.",          icon: "ic-gills" },
        { text: "Water goes in through the mouth.",  icon: "ic-fish" },
        { text: "Gills take what fish need.",        icon: "ic-gills" },
        { text: "So yes, a fish drinks water!",      icon: "ic-fish" }
      ]
    },
    games: [
      {
        engine: "needs", title: "Who needs water?",
        prompt: "Tap everything that needs water.",
        narration: "All living things need water. Tap the ones that need water. Leave the others.",
        hero: "ic-water", wrongMsg: "A {x} is nonliving. It does not need water.",
        choices: [
          { icon: "ic-fish",   label: "fish",   need: true },
          { icon: "ic-flower", label: "flower", need: true },
          { icon: "ic-dog",    label: "dog",    need: true },
          { icon: "ic-rock",   label: "rock",   need: false },
          { icon: "ic-ball",   label: "ball",   need: false }
        ]
      },
      {
        engine: "sort", title: "Where does it live?",
        prompt: "Put each one where it lives.",
        narration: "Some animals live in water. Some live on land. Tap one, then tap its home.",
        bins: [
          { id: "water", label: "In water", icon: "ic-water" },
          { id: "land",  label: "On land",  icon: "ic-tree" }
        ],
        items: [
          { icon: "ic-fish",    label: "fish",    bin: "water" },
          { icon: "ic-frog",    label: "frog",    bin: "water" },
          { icon: "ic-tadpole", label: "tadpole", bin: "water" },
          { icon: "ic-dog",     label: "dog",     bin: "land" },
          { icon: "ic-cat",     label: "cat",     bin: "land" },
          { icon: "ic-hen",     label: "hen",     bin: "land" }
        ]
      },
      {
        engine: "readword", title: "Name it!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-gills", answer: "gills", options: ["gills", "mouth", "eye"] },
          { icon: "ic-fish",  answer: "fish",  options: ["fish", "frog", "bird"] },
          { icon: "ic-water", answer: "water", options: ["water", "food", "air"] }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A fish lives in water.",       icons: ["ic-fish", "ic-water"], answer: true },
          { text: "A fish breathes with gills.",  icons: ["ic-fish", "ic-gills"], answer: true },
          { text: "The ocean has salt water.",    icons: ["ic-salt"],             answer: true },
          { text: "A rock needs water to live.",  icons: ["ic-rock"],             answer: false },
          { text: "A fish drinks water.",         icons: ["ic-fish"],             answer: true }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["gills", "water", "salt"],
        sentences: [
          { icon: "ic-gills", before: "A fish breathes with its", after: ".", answer: "gills" },
          { icon: "ic-water", before: "All living things need",   after: ".", answer: "water" },
          { icon: "ic-salt",  before: "The ocean is full of",     after: " water.", answer: "salt" }
        ]
      }
    ]
  });

  /* ---- Week 5: Unit Review (pp. 32-34) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi1-review", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "review",
    question: "Big Idea 1 Review", color: "#C97B2C", cardIcon: "ic-star",
    reading: {
      title: "What did we learn?",
      lines: [
        { text: "Living things grow and change.",     icon: "ic-seedling" },
        { text: "They need food, water, and air.",    icon: "ic-water" },
        { text: "Animals eat. Plants make food.",     icon: "ic-flower" },
        { text: "A rock is nonliving.",               icon: "ic-rock" },
        { text: "Now show what you know!",            icon: "ic-star" }
      ]
    },
    games: [
      {
        engine: "truefalse", title: "What do you know?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A dog is living.",            icons: ["ic-dog"],              answer: true },
          { text: "A rock can grow.",            icons: ["ic-rock"],             answer: false },
          { text: "A monkey eats bananas.",      icons: ["ic-monkey", "ic-banana"], answer: true },
          { text: "A plant makes its own food.", icons: ["ic-flower"],           answer: true },
          { text: "A fish breathes with gills.", icons: ["ic-fish", "ic-gills"], answer: true }
        ]
      },
      {
        engine: "sort", title: "Living or not?",
        prompt: "Put each one where it belongs.",
        narration: "Living, or nonliving? Tap one, then tap the right basket.",
        bins: [
          { id: "living",    label: "Living",    icon: "ic-frog" },
          { id: "nonliving", label: "Nonliving", icon: "ic-rock" }
        ],
        items: [
          { icon: "ic-dog",    label: "dog",    bin: "living" },
          { icon: "ic-flower", label: "flower", bin: "living" },
          { icon: "ic-fish",   label: "fish",   bin: "living" },
          { icon: "ic-rock",   label: "rock",   bin: "nonliving" },
          { icon: "ic-ball",   label: "ball",   bin: "nonliving" },
          { icon: "ic-spoon",  label: "spoon",  bin: "nonliving" }
        ]
      },
      {
        engine: "match", title: "Who eats what?",
        prompt: "Match each animal to its food.",
        narration: "Tap an animal, then tap the food it eats.",
        pairs: [
          { from: { icon: "ic-monkey", label: "monkey" }, to: { icon: "ic-banana", label: "banana" } },
          { from: { icon: "ic-cow",    label: "cow"    }, to: { icon: "ic-grass",  label: "grass"  } },
          { from: { icon: "ic-bird",   label: "bird"   }, to: { icon: "ic-worm",   label: "worm"   } }
        ]
      },
      {
        engine: "readword", title: "Find the word!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-frog",  answer: "living",    options: ["living", "nonliving"] },
          { icon: "ic-rock",  answer: "nonliving", options: ["nonliving", "living"] },
          { icon: "ic-roots", answer: "roots",     options: ["roots", "gills", "stem"] },
          { icon: "ic-gills", answer: "gills",     options: ["gills", "roots", "leaf"] }
        ]
      }
    ]
  });

  /* ---- Week 5: Hands-on Activity "Watch a Plant Drink!" (p. 35) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi1-handson", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "handson",
    question: "Watch a Plant Drink!", color: "#3E8E7E", cardIcon: "ic-celery",
    games: [
      {
        engine: "handson", title: "Watch a Plant Drink!", icon: "ic-celery",
        narration: "Let's watch a plant drink water! Here is what to do.",
        materials: [
          { icon: "ic-celery", label: "celery" },
          { icon: "ic-water",  label: "water" },
          { icon: "ic-flower", label: "red color" }
        ],
        steps: [
          "Fill a cup with water.",
          "Add red food coloring to the water.",
          "Stand a celery stick in the cup.",
          "Wait one whole day.",
          "Look! The leaves turn red. The celery drank the water!"
        ]
      }
    ]
  });
})();
