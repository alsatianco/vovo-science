/* ============================================================
   data.js — content for Big Idea 1, Week 1: "Can a rock grow?"
   Distilled from Daily Science Grade 1 (Evan-Moor EMC 5011), pp. 8-13.
   Pure data: no logic. The reading screen + game engines read this.

   A unit = { id, bigIdea, question, vocab, reading, games }
   reading.lines[] = { text, icon } — one short sentence + a picture,
     so a pre-reader can look at the picture and decode the words while
     the narrator reads and the words light up.
   games[] = { engine, ...engine-specific fields }
   ============================================================ */
(window.UNITS = window.UNITS || []).push({
  id: "rock-grow",
  bigIdea: 1,
  bigIdeaTitle: "Living things have basic needs.",
  week: 1,
  question: "Can a rock grow?",
  color: "#3E8E7E",
  cardIcon: "ic-rock",

  // Words taught this week, each tied to a picture (image ↔ word ↔ sound).
  vocab: [
    { word: "grow",      kid: "to get bigger",       icon: "ic-seedling" },
    { word: "living",    kid: "having life",         icon: "ic-frog" },
    { word: "survive",   kid: "to stay living",      icon: "ic-water" },
    { word: "nonliving", kid: "not having life",     icon: "ic-rock" }
  ],

  // The reading passage — short, picture-backed sentences.
  reading: {
    title: "Can a rock grow?",
    lines: [
      { text: "Some things grow.",                       icon: "ic-tree" },
      { text: "Some things do not.",                      icon: "ic-rock" },
      { text: "A puppy grows into a dog.",                icon: "ic-dog" },
      { text: "A seed grows into a plant.",               icon: "ic-flower" },
      { text: "Only living things grow and change.",      icon: "ic-frog" },
      { text: "Living things need food, water, and air.", icon: "ic-water" },
      { text: "These help living things survive.",        icon: "ic-sun" },
      { text: "A rock is nonliving.",                     icon: "ic-rock" },
      { text: "It does not eat, drink, or grow.",         icon: "ic-rock" },
      { text: "So a rock can NOT grow!",                  icon: "ic-rock-x" }
    ]
  },

  games: [
    /* GAME 1 — Sort: living vs nonliving (book Day 4 "X the nonliving"). */
    {
      engine: "sort",
      title: "Living or not?",
      prompt: "Put each one where it belongs.",
      narration: "Drag each picture into the right basket. Living, or nonliving?",
      bins: [
        { id: "living",    label: "Living",    icon: "ic-frog" },
        { id: "nonliving", label: "Nonliving", icon: "ic-rock" }
      ],
      items: [
        { icon: "ic-dog",     label: "dog",     bin: "living" },
        { icon: "ic-tree",    label: "tree",    bin: "living" },
        { icon: "ic-ladybug", label: "bug",     bin: "living" },
        { icon: "ic-rock",    label: "rock",    bin: "nonliving" },
        { icon: "ic-spoon",   label: "spoon",   bin: "nonliving" },
        { icon: "ic-ball",    label: "ball",    bin: "nonliving" }
      ]
    },

    /* GAME 2 — Grow up! match baby → grown (book Day 2 "draw lines to match"). */
    {
      engine: "match",
      title: "Grow up!",
      prompt: "What does each baby grow into?",
      narration: "Tap a baby animal, then tap what it grows into.",
      pairs: [
        { from: { icon: "ic-puppy",   label: "puppy"   }, to: { icon: "ic-dog",    label: "dog"    } },
        { from: { icon: "ic-seed",    label: "seed"    }, to: { icon: "ic-flower", label: "flower" } },
        { from: { icon: "ic-tadpole", label: "tadpole" }, to: { icon: "ic-frog",   label: "frog"   } },
        { from: { icon: "ic-chick",   label: "chick"   }, to: { icon: "ic-hen",    label: "hen"    } }
      ]
    },

    /* GAME 3 — What do I need to survive? (book Day 3 "color what a dog needs"). */
    {
      engine: "needs",
      title: "Help the dog!",
      prompt: "Tap what a dog needs to survive.",
      narration: "A dog is living. Tap the things it needs to survive. Leave the others.",
      hero: "ic-dog",
      wrongMsg: "A dog does not need a {x} to survive.",
      choices: [
        { icon: "ic-food",  label: "food",  need: true },
        { icon: "ic-water", label: "water", need: true },
        { icon: "ic-air",   label: "air",   need: true },
        { icon: "ic-ball",  label: "ball",  need: false },
        { icon: "ic-teddy", label: "toy",   need: false }
      ]
    },

    /* GAME 4 — Yes or no? (book Day 3 Q2 + Day 5 Q1/Q3: the unit's yes/no items). */
    {
      engine: "truefalse",
      title: "Yes or no?",
      prompt: "Listen. Is it true?",
      narration: "Listen to the sentence. Is it true? Tap yes or no.",
      rounds: [
        { text: "A cat needs food to survive.", icons: ["ic-cat", "ic-food"], answer: true },
        { text: "A tree needs air to survive.",  icons: ["ic-tree", "ic-air"], answer: true },
        { text: "A baby needs toys to survive.", icons: ["ic-teddy"],          answer: false },
        { text: "A teddy bear grows.",            icons: ["ic-teddy"],          answer: false },
        { text: "A rock is living.",              icons: ["ic-rock"],           answer: false }
      ]
    },

    /* GAME 5 — Finish the sentence (cloze) — book Day 5, p.13 activity 3:
       "Complete the sentences. Use the words in the box." A picture cues each
       sentence; tap a word from the bank to drop it into the blank. */
    {
      engine: "cloze",
      title: "Finish the sentence!",
      prompt: "Tap a word to hear it. Drag it to the blank.",
      narration: "Tap a word to hear it. Then drag the right word into the blank.",
      bank: ["living", "nonliving", "survive"],
      sentences: [
        { icon: "ic-rock",      before: "A rock is",                       after: ".", answer: "nonliving" },
        { icon: "ic-butterfly", before: "A butterfly is",                  after: ".", answer: "living" },
        { icon: "ic-water",     before: "I need air, water, and food to",  after: ".", answer: "survive" }
      ]
    }
  ]
});
