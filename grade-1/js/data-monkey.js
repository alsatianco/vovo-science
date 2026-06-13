/* ============================================================
   data-monkey.js — Big Idea 1, Week 2: "Do monkeys really eat bananas?"
   Distilled from Daily Science Grade 1 (EMC 5011), pp. 14-19.
   Theme: living things eat food to get ENERGY; different animals eat
   different foods; animals eat what grows where they live.
   ============================================================ */
(window.UNITS = window.UNITS || []).push({
  id: "monkey-eat",
  bigIdea: 1,
  bigIdeaTitle: "Living things have basic needs.",
  week: 2,
  question: "Do monkeys really eat bananas?",
  color: "#C97B2C",
  cardIcon: "ic-monkey",

  vocab: [
    { word: "energy", kid: "the power to do work", icon: "ic-energy" }
  ],

  reading: {
    title: "Do monkeys eat bananas?",
    lines: [
      { text: "Living things eat food.",             icon: "ic-apple" },
      { text: "Food gives us energy.",                icon: "ic-energy" },
      { text: "Energy helps us run and play.",        icon: "ic-energy" },
      { text: "Animals eat different foods.",         icon: "ic-monkey" },
      { text: "A monkey eats bananas.",               icon: "ic-banana" },
      { text: "A cow eats grass.",                    icon: "ic-grass" },
      { text: "A bird eats worms.",                   icon: "ic-worm" },
      { text: "A penguin eats fish.",                 icon: "ic-fish" },
      { text: "Animals eat what grows near them.",    icon: "ic-tree" },
      { text: "So yes, monkeys eat bananas!",         icon: "ic-monkey" }
    ]
  },

  games: [
    /* GAME 1 — match each animal to the food it eats (book Day 1 Q1). */
    {
      engine: "match",
      title: "Who eats what?",
      prompt: "Match each animal to its food.",
      narration: "Tap an animal, then tap the food it eats.",
      pairs: [
        { from: { icon: "ic-monkey", label: "monkey" }, to: { icon: "ic-banana", label: "banana" } },
        { from: { icon: "ic-cow",    label: "cow"    }, to: { icon: "ic-grass",  label: "grass"  } },
        { from: { icon: "ic-bird",   label: "bird"   }, to: { icon: "ic-worm",   label: "worm"   } },
        { from: { icon: "ic-cat",    label: "cat"    }, to: { icon: "ic-fish",   label: "fish"   } }
      ]
    },

    /* GAME 2 — Yes or No? (book Day 3 Q2 + Day 5: the week's signature style). */
    {
      engine: "truefalse",
      title: "Yes or no?",
      prompt: "Listen. Is it true?",
      narration: "Listen to the sentence. Is it true? Tap yes or no.",
      rounds: [
        { text: "A monkey eats bananas.",  icons: ["ic-monkey", "ic-banana"], answer: true },
        { text: "A penguin eats bananas.", icons: ["ic-penguin", "ic-banana"], answer: false },
        { text: "A cow eats grass.",       icons: ["ic-cow", "ic-grass"],     answer: true },
        { text: "A monkey eats fish.",     icons: ["ic-monkey", "ic-fish"],   answer: false },
        { text: "A bird eats worms.",      icons: ["ic-bird", "ic-worm"],     answer: true }
      ]
    },

    /* GAME 3 — What do people eat? (book Day 2 Q1: circle the things people eat). */
    {
      engine: "needs",
      title: "What do people eat?",
      prompt: "Tap the things people eat.",
      narration: "People eat many foods. Tap the things people eat. Leave the others.",
      hero: "ic-kid",
      wrongMsg: "People do not eat a {x}.",
      choices: [
        { icon: "ic-apple",  label: "apple",  need: true },
        { icon: "ic-bread",  label: "bread",  need: true },
        { icon: "ic-banana", label: "banana", need: true },
        { icon: "ic-shoe",   label: "shoe",   need: false },
        { icon: "ic-leaf",   label: "leaf",   need: false },
        { icon: "ic-worm",   label: "worm",   need: false }
      ]
    },

    /* GAME 4 — Where does it live? (book Day 3 Q1: match animal to where it lives). */
    {
      engine: "match",
      title: "Where does it live?",
      prompt: "Match each animal to where it lives.",
      narration: "Animals eat food where they live. Tap an animal, then tap where it lives.",
      pairs: [
        { from: { icon: "ic-monkey",  label: "monkey"  }, to: { icon: "ic-jungle", label: "jungle"     } },
        { from: { icon: "ic-cow",     label: "cow"     }, to: { icon: "ic-field",  label: "field"      } },
        { from: { icon: "ic-penguin", label: "penguin" }, to: { icon: "ic-ice",    label: "South Pole" } }
      ]
    },

    /* GAME 5 — Finish the sentence (cloze; book Day 1 Q2: "...eat to get energy"). */
    {
      engine: "cloze",
      title: "Finish the sentence!",
      prompt: "Tap a word to hear it. Drag it to the blank.",
      narration: "Tap a word to hear it. Then drag the right word into the blank.",
      bank: ["energy", "grass", "worms"],
      sentences: [
        { icon: "ic-monkey", before: "Monkeys eat to get", after: ".", answer: "energy" },
        { icon: "ic-cow",    before: "A cow eats",         after: ".", answer: "grass" },
        { icon: "ic-bird",   before: "A bird eats",        after: ".", answer: "worms" }
      ]
    }
  ]
});
