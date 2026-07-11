/* ============================================================
   data-bi7.js — Big Idea 7: "Animals can be sorted into groups."
   Teaches the six animal groups from the "Reading in Science" model
   (mammal, bird, fish, reptile, amphibian, insect): one group per week,
   each with a picture-backed reading + classify games, then a cumulative
   Review and an at-home Hands-on hunt.

   Reuses existing engines only (needs / sort / readword / truefalse /
   cloze / handson). The "tricky" cases that actually test understanding
   are taught on purpose — a whale is a mammal, a penguin is a bird, a
   worm is not an insect.
   ============================================================ */
(function () {
  "use strict";
  var BI = 7, TITLE = "Animals can be sorted into groups.";

  /* ---- Week 1: What is a mammal? (fur + milk; whale is a mammal) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi7-mammals", bigIdea: BI, bigIdeaTitle: TITLE, week: 1,
    question: "What is a mammal?", color: "#B85C8A", cardIcon: "ic-dog",
    vocab: [
      { word: "mammal", kid: "has fur, drinks milk", icon: "ic-dog" },
      { word: "fur",    kid: "soft hair on the body", icon: "ic-cat" },
      { word: "milk",   kid: "what baby mammals drink", icon: "ic-milk" }
    ],
    reading: {
      title: "What is a mammal?",
      lines: [
        { text: "Animals can be sorted into groups.", icon: "ic-paw" },
        { text: "Mammals are one group.",             icon: "ic-dog" },
        { text: "Mammals have fur or hair.",          icon: "ic-cat" },
        { text: "Baby mammals drink milk.",           icon: "ic-milk" },
        { text: "A dog and a cow are mammals.",       icon: "ic-cow" },
        { text: "A whale lives in the sea.",          icon: "ic-whale" },
        { text: "But a whale is a mammal too!",       icon: "ic-whale" }
      ]
    },
    games: [
      {
        engine: "needs", title: "Find the mammals!",
        prompt: "Tap all the mammals.",
        narration: "Mammals have fur and drink milk. Tap all the mammals. Leave the others.",
        hero: "ic-dog", wrongMsg: "A {x} is not a mammal.",
        choices: [
          { icon: "ic-cat",    label: "cat",    need: true },
          { icon: "ic-cow",    label: "cow",    need: true },
          { icon: "ic-monkey", label: "monkey", need: true },
          { icon: "ic-bird",   label: "bird",   need: false },
          { icon: "ic-fish",   label: "fish",   need: false },
          { icon: "ic-frog",   label: "frog",   need: false }
        ]
      },
      {
        engine: "sort", title: "Mammal or not?",
        prompt: "Put each one where it belongs.",
        narration: "Is it a mammal? Tap it, then tap the right basket.",
        bins: [
          { id: "mammal", label: "Mammal",       icon: "ic-dog" },
          { id: "other",  label: "Not a mammal", icon: "ic-fish" }
        ],
        items: [
          { icon: "ic-cat",   label: "cat",   bin: "mammal" },
          { icon: "ic-fox",   label: "fox",   bin: "mammal" },
          { icon: "ic-whale", label: "whale", bin: "mammal" },
          { icon: "ic-bird",  label: "bird",  bin: "other" },
          { icon: "ic-fish",  label: "fish",  bin: "other" },
          { icon: "ic-snake", label: "snake", bin: "other" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A dog is a mammal.",        icons: ["ic-dog"],   answer: true },
          { text: "Baby mammals drink milk.",  icons: ["ic-milk"],  answer: true },
          { text: "A whale is a fish.",        icons: ["ic-whale"], answer: false },
          { text: "A bird is a mammal.",       icons: ["ic-bird"],  answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["milk", "fur", "mammal"],
        sentences: [
          { icon: "ic-milk", before: "A baby mammal drinks", after: ".",              answer: "milk" },
          { icon: "ic-cat",  before: "A cat has soft",       after: " on its body.",  answer: "fur" },
          { icon: "ic-cow",  before: "A cow is a",           after: ".",              answer: "mammal" }
        ]
      }
    ]
  });

  /* ---- Week 2: What is a bird? (feathers + wings + eggs; penguin is a bird) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi7-birds", bigIdea: BI, bigIdeaTitle: TITLE, week: 2,
    question: "What is a bird?", color: "#4A90D9", cardIcon: "ic-owl",
    vocab: [
      { word: "bird",     kid: "has feathers and wings", icon: "ic-bird" },
      { word: "feathers", kid: "cover a bird's body",     icon: "ic-owl" },
      { word: "nest",     kid: "where birds lay eggs",    icon: "ic-nest" }
    ],
    reading: {
      title: "What is a bird?",
      lines: [
        { text: "Birds are a group of animals.",   icon: "ic-bird" },
        { text: "Birds have feathers and wings.",  icon: "ic-bird" },
        { text: "A bird eats with its beak.",      icon: "ic-hen" },
        { text: "Birds lay eggs in a nest.",       icon: "ic-nest" },
        { text: "Most birds can fly.",             icon: "ic-owl" },
        { text: "A penguin cannot fly.",           icon: "ic-penguin" },
        { text: "But a penguin is a bird too!",    icon: "ic-penguin" }
      ]
    },
    games: [
      {
        engine: "needs", title: "Find the birds!",
        prompt: "Tap all the birds.",
        narration: "Birds have feathers and wings. Tap all the birds. Leave the others.",
        hero: "ic-bird", wrongMsg: "A {x} is not a bird.",
        choices: [
          { icon: "ic-hen",     label: "hen",     need: true },
          { icon: "ic-owl",     label: "owl",     need: true },
          { icon: "ic-penguin", label: "penguin", need: true },
          { icon: "ic-cat",     label: "cat",     need: false },
          { icon: "ic-fish",    label: "fish",    need: false },
          { icon: "ic-frog",    label: "frog",    need: false }
        ]
      },
      {
        engine: "sort", title: "Bird or not?",
        prompt: "Put each one where it belongs.",
        narration: "Is it a bird? Tap it, then tap the right basket.",
        bins: [
          { id: "bird",  label: "Bird",       icon: "ic-bird" },
          { id: "other", label: "Not a bird", icon: "ic-cat" }
        ],
        items: [
          { icon: "ic-hen",     label: "hen",     bin: "bird" },
          { icon: "ic-owl",     label: "owl",     bin: "bird" },
          { icon: "ic-penguin", label: "penguin", bin: "bird" },
          { icon: "ic-dog",     label: "dog",     bin: "other" },
          { icon: "ic-fish",    label: "fish",    bin: "other" },
          { icon: "ic-snake",   label: "snake",   bin: "other" }
        ]
      },
      {
        engine: "readword", title: "Name the bird!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-owl",     answer: "owl",     options: ["owl", "fox", "frog"] },
          { icon: "ic-hen",     answer: "hen",     options: ["hen", "cat", "fish"] },
          { icon: "ic-penguin", answer: "penguin", options: ["penguin", "whale", "snake"] }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A bird has feathers.",       icons: ["ic-bird"],    answer: true },
          { text: "A penguin is a bird.",       icons: ["ic-penguin"], answer: true },
          { text: "Birds lay eggs in a nest.",  icons: ["ic-nest"],    answer: true },
          { text: "A cat can fly with wings.",  icons: ["ic-cat"],     answer: false }
        ]
      }
    ]
  });

  /* ---- Week 3: What is a fish? (fins + gills + water; a whale is NOT a fish) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi7-fish", bigIdea: BI, bigIdeaTitle: TITLE, week: 3,
    question: "What is a fish?", color: "#3FA7A0", cardIcon: "ic-fish",
    vocab: [
      { word: "fish",  kid: "lives in water, has fins", icon: "ic-fish" },
      { word: "fins",  kid: "help a fish swim",          icon: "ic-swim" },
      { word: "gills", kid: "help a fish breathe",       icon: "ic-gills" }
    ],
    reading: {
      title: "What is a fish?",
      lines: [
        { text: "Fish are a group of animals.",   icon: "ic-fish" },
        { text: "Fish live in the water.",         icon: "ic-water" },
        { text: "Fish swim with their fins.",      icon: "ic-swim" },
        { text: "Fish breathe with gills.",        icon: "ic-gills" },
        { text: "A shark is a big fish.",          icon: "ic-shark" },
        { text: "A whale swims, but it is not a fish.", icon: "ic-whale" }
      ]
    },
    games: [
      {
        engine: "needs", title: "Find the fish!",
        prompt: "Tap all the fish.",
        narration: "Fish live in water and swim with fins. Tap all the fish. Leave the others.",
        hero: "ic-fish", wrongMsg: "A {x} is not a fish.",
        choices: [
          { icon: "ic-fish",  label: "fish",  need: true },
          { icon: "ic-shark", label: "shark", need: true },
          { icon: "ic-dog",   label: "dog",   need: false },
          { icon: "ic-bird",  label: "bird",  need: false },
          { icon: "ic-frog",  label: "frog",  need: false }
        ]
      },
      {
        engine: "sort", title: "Fish or not?",
        prompt: "Put each one where it belongs.",
        narration: "Is it a fish? Tap it, then tap the right basket.",
        bins: [
          { id: "fish",  label: "Fish",       icon: "ic-fish" },
          { id: "other", label: "Not a fish", icon: "ic-dog" }
        ],
        items: [
          { icon: "ic-fish",  label: "fish",  bin: "fish" },
          { icon: "ic-shark", label: "shark", bin: "fish" },
          { icon: "ic-whale", label: "whale", bin: "other" },
          { icon: "ic-bird",  label: "bird",  bin: "other" },
          { icon: "ic-frog",  label: "frog",  bin: "other" }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["fins", "gills", "fish"],
        sentences: [
          { icon: "ic-swim",  before: "A fish swims with its", after: ".", answer: "fins" },
          { icon: "ic-gills", before: "A fish breathes with",  after: ".", answer: "gills" },
          { icon: "ic-shark", before: "A shark is a big",      after: ".", answer: "fish" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A fish lives in water.",       icons: ["ic-fish", "ic-water"], answer: true },
          { text: "A fish breathes with gills.",  icons: ["ic-gills"],            answer: true },
          { text: "A shark is a fish.",           icons: ["ic-shark"],            answer: true },
          { text: "A whale is a fish.",           icons: ["ic-whale"],            answer: false }
        ]
      }
    ]
  });

  /* ---- Week 4: What is a reptile? (dry scaly skin + eggs on land) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi7-reptiles", bigIdea: BI, bigIdeaTitle: TITLE, week: 4,
    question: "What is a reptile?", color: "#6E9B3E", cardIcon: "ic-turtle",
    vocab: [
      { word: "reptile", kid: "has dry, scaly skin", icon: "ic-turtle" },
      { word: "snake",   kid: "a long reptile",       icon: "ic-snake" },
      { word: "lizard",  kid: "a reptile with legs",  icon: "ic-lizard" }
    ],
    reading: {
      title: "What is a reptile?",
      lines: [
        { text: "Reptiles are a group of animals.", icon: "ic-turtle" },
        { text: "Reptiles have dry, scaly skin.",   icon: "ic-snake" },
        { text: "They lay their eggs on land.",     icon: "ic-turtle" },
        { text: "A snake is a reptile.",            icon: "ic-snake" },
        { text: "A turtle is a reptile.",           icon: "ic-turtle" },
        { text: "A lizard is a reptile too.",       icon: "ic-lizard" }
      ]
    },
    games: [
      {
        engine: "needs", title: "Find the reptiles!",
        prompt: "Tap all the reptiles.",
        narration: "Reptiles have dry, scaly skin. Tap all the reptiles. Leave the others.",
        hero: "ic-turtle", wrongMsg: "A {x} is not a reptile.",
        choices: [
          { icon: "ic-snake",  label: "snake",  need: true },
          { icon: "ic-turtle", label: "turtle", need: true },
          { icon: "ic-lizard", label: "lizard", need: true },
          { icon: "ic-frog",   label: "frog",   need: false },
          { icon: "ic-fish",   label: "fish",   need: false },
          { icon: "ic-bird",   label: "bird",   need: false }
        ]
      },
      {
        engine: "sort", title: "Reptile or not?",
        prompt: "Put each one where it belongs.",
        narration: "Is it a reptile? Tap it, then tap the right basket.",
        bins: [
          { id: "reptile", label: "Reptile",       icon: "ic-turtle" },
          { id: "other",   label: "Not a reptile", icon: "ic-frog" }
        ],
        items: [
          { icon: "ic-snake",  label: "snake",  bin: "reptile" },
          { icon: "ic-turtle", label: "turtle", bin: "reptile" },
          { icon: "ic-lizard", label: "lizard", bin: "reptile" },
          { icon: "ic-frog",   label: "frog",   bin: "other" },
          { icon: "ic-fish",   label: "fish",   bin: "other" },
          { icon: "ic-cat",    label: "cat",    bin: "other" }
        ]
      },
      {
        engine: "readword", title: "Name the reptile!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-snake",  answer: "snake",  options: ["snake", "worm", "fish"] },
          { icon: "ic-turtle", answer: "turtle", options: ["turtle", "frog", "hen"] },
          { icon: "ic-lizard", answer: "lizard", options: ["lizard", "cat", "bird"] }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A snake is a reptile.",           icons: ["ic-snake"],  answer: true },
          { text: "A reptile has dry, scaly skin.",  icons: ["ic-turtle"], answer: true },
          { text: "A turtle lays eggs on land.",     icons: ["ic-turtle"], answer: true },
          { text: "A frog is a reptile.",            icons: ["ic-frog"],   answer: false }
        ]
      }
    ]
  });

  /* ---- Week 5: What is an amphibian? (wet skin + water & land + tadpole) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi7-amphibians", bigIdea: BI, bigIdeaTitle: TITLE, week: 5,
    question: "What is an amphibian?", color: "#5FA88A", cardIcon: "ic-frog",
    vocab: [
      { word: "amphibian", kid: "lives in water and on land", icon: "ic-frog" },
      { word: "tadpole",   kid: "a baby frog",                icon: "ic-tadpole" },
      { word: "wet",       kid: "how an amphibian's skin feels", icon: "ic-water" }
    ],
    reading: {
      title: "What is an amphibian?",
      lines: [
        { text: "Amphibians are a group of animals.", icon: "ic-frog" },
        { text: "They have smooth, wet skin.",         icon: "ic-frog" },
        { text: "They live in water and on land.",     icon: "ic-water" },
        { text: "A baby frog is a tadpole.",           icon: "ic-tadpole" },
        { text: "The tadpole grows into a frog.",      icon: "ic-frog" },
        { text: "A frog is an amphibian.",             icon: "ic-frog" }
      ]
    },
    games: [
      {
        engine: "needs", title: "Find the amphibians!",
        prompt: "Tap all the amphibians.",
        narration: "Amphibians have wet skin and live in two places. Tap all the amphibians. Leave the others.",
        hero: "ic-frog", wrongMsg: "A {x} is not an amphibian.",
        choices: [
          { icon: "ic-frog",    label: "frog",    need: true },
          { icon: "ic-tadpole", label: "tadpole", need: true },
          { icon: "ic-snake",   label: "snake",   need: false },
          { icon: "ic-fish",    label: "fish",    need: false },
          { icon: "ic-cat",     label: "cat",     need: false }
        ]
      },
      {
        engine: "sort", title: "Amphibian or not?",
        prompt: "Put each one where it belongs.",
        narration: "Is it an amphibian? Tap it, then tap the right basket.",
        bins: [
          { id: "amphibian", label: "Amphibian",        icon: "ic-frog" },
          { id: "other",     label: "Not an amphibian", icon: "ic-snake" }
        ],
        items: [
          { icon: "ic-frog",    label: "frog",    bin: "amphibian" },
          { icon: "ic-tadpole", label: "tadpole", bin: "amphibian" },
          { icon: "ic-snake",   label: "snake",   bin: "other" },
          { icon: "ic-fish",    label: "fish",    bin: "other" },
          { icon: "ic-turtle",  label: "turtle",  bin: "other" }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["tadpole", "frog", "amphibian"],
        sentences: [
          { icon: "ic-tadpole", before: "A baby frog is a",        after: ".", answer: "tadpole" },
          { icon: "ic-frog",    before: "A tadpole grows into a",  after: ".", answer: "frog" },
          { icon: "ic-frog",    before: "A frog is an",            after: ".", answer: "amphibian" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A frog is an amphibian.",           icons: ["ic-frog"],    answer: true },
          { text: "A tadpole grows into a frog.",      icons: ["ic-tadpole"], answer: true },
          { text: "A frog lives in water and on land.", icons: ["ic-frog"],   answer: true },
          { text: "A frog has dry, scaly skin.",       icons: ["ic-frog"],    answer: false }
        ]
      }
    ]
  });

  /* ---- Week 6: What is an insect? (six legs + three body parts) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi7-insects", bigIdea: BI, bigIdeaTitle: TITLE, week: 6,
    question: "What is an insect?", color: "#D98C3A", cardIcon: "ic-ladybug",
    vocab: [
      { word: "insect", kid: "has six legs", icon: "ic-ladybug" },
      { word: "legs",   kid: "an insect has six", icon: "ic-ant" },
      { word: "wings",  kid: "help many insects fly", icon: "ic-butterfly" }
    ],
    reading: {
      title: "What is an insect?",
      lines: [
        { text: "Insects are a group of animals.", icon: "ic-ladybug" },
        { text: "Insects have six legs.",          icon: "ic-ant" },
        { text: "Their body has three parts.",     icon: "ic-bee" },
        { text: "Many insects have wings.",        icon: "ic-butterfly" },
        { text: "A bee and an ant are insects.",   icon: "ic-bee" },
        { text: "A worm is not an insect.",        icon: "ic-worm" }
      ]
    },
    games: [
      {
        engine: "needs", title: "Find the insects!",
        prompt: "Tap all the insects.",
        narration: "Insects have six legs. Tap all the insects. Leave the others.",
        hero: "ic-bee", wrongMsg: "A {x} is not an insect.",
        choices: [
          { icon: "ic-bee",       label: "bee",       need: true },
          { icon: "ic-ant",       label: "ant",       need: true },
          { icon: "ic-ladybug",   label: "ladybug",   need: true },
          { icon: "ic-butterfly", label: "butterfly", need: true },
          { icon: "ic-worm",      label: "worm",      need: false },
          { icon: "ic-snail",     label: "snail",     need: false }
        ]
      },
      {
        engine: "sort", title: "Insect or not?",
        prompt: "Put each one where it belongs.",
        narration: "Is it an insect? Tap it, then tap the right basket.",
        bins: [
          { id: "insect", label: "Insect",       icon: "ic-bee" },
          { id: "other",  label: "Not an insect", icon: "ic-worm" }
        ],
        items: [
          { icon: "ic-bee",       label: "bee",       bin: "insect" },
          { icon: "ic-ant",       label: "ant",       bin: "insect" },
          { icon: "ic-ladybug",   label: "ladybug",   bin: "insect" },
          { icon: "ic-worm",      label: "worm",      bin: "other" },
          { icon: "ic-snail",     label: "snail",     bin: "other" },
          { icon: "ic-bird",      label: "bird",      bin: "other" }
        ]
      },
      {
        engine: "readword", title: "Name the insect!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-bee",       answer: "bee",       options: ["bee", "worm", "fish"] },
          { icon: "ic-ant",       answer: "ant",       options: ["ant", "snail", "frog"] },
          { icon: "ic-butterfly", answer: "butterfly", options: ["butterfly", "bird", "snake"] }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "An insect has six legs.", icons: ["ic-ant"],     answer: true },
          { text: "A ladybug is an insect.", icons: ["ic-ladybug"], answer: true },
          { text: "A bee has wings.",        icons: ["ic-bee"],     answer: true },
          { text: "A worm is an insect.",    icons: ["ic-worm"],    answer: false }
        ]
      }
    ]
  });

  /* ---- Week 7: Unit Review — sort every group (the end-of-chapter check) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi7-review", bigIdea: BI, bigIdeaTitle: TITLE, week: 7, kind: "review",
    question: "Big Idea 7 Review", color: "#C97B2C", cardIcon: "ic-star",
    reading: {
      title: "What did we learn?",
      lines: [
        { text: "Mammals have fur and drink milk.",     icon: "ic-dog" },
        { text: "Birds have feathers and wings.",        icon: "ic-bird" },
        { text: "Fish live in water and have fins.",     icon: "ic-fish" },
        { text: "Reptiles have dry, scaly skin.",        icon: "ic-turtle" },
        { text: "Amphibians live in water and on land.", icon: "ic-frog" },
        { text: "Insects have six legs.",                icon: "ic-ladybug" },
        { text: "Now show what you know!",               icon: "ic-star" }
      ]
    },
    games: [
      {
        engine: "truefalse", title: "What do you know?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A dog is a mammal.",       icons: ["ic-dog"],     answer: true },
          { text: "A bird has feathers.",     icons: ["ic-bird"],    answer: true },
          { text: "A whale is a mammal.",     icons: ["ic-whale"],   answer: true },
          { text: "An insect has six legs.",  icons: ["ic-ladybug"], answer: true },
          { text: "A frog is a fish.",        icons: ["ic-frog"],    answer: false },
          { text: "A snake is a mammal.",     icons: ["ic-snake"],   answer: false }
        ]
      },
      {
        engine: "sort", title: "Sort the animals!",
        prompt: "Put each one in its group.",
        narration: "Tap an animal, then tap its group basket. Mammal, bird, or fish?",
        bins: [
          { id: "mammal", label: "Mammal", icon: "ic-dog" },
          { id: "bird",   label: "Bird",   icon: "ic-bird" },
          { id: "fish",   label: "Fish",   icon: "ic-fish" }
        ],
        items: [
          { icon: "ic-cat",   label: "cat",   bin: "mammal" },
          { icon: "ic-whale", label: "whale", bin: "mammal" },
          { icon: "ic-owl",   label: "owl",   bin: "bird" },
          { icon: "ic-hen",   label: "hen",   bin: "bird" },
          { icon: "ic-fish",  label: "fish",  bin: "fish" },
          { icon: "ic-shark", label: "shark", bin: "fish" }
        ]
      },
      {
        engine: "sort", title: "Sort more animals!",
        prompt: "Put each one in its group.",
        narration: "Tap an animal, then tap its group basket. Reptile, amphibian, or insect?",
        bins: [
          { id: "reptile",   label: "Reptile",   icon: "ic-turtle" },
          { id: "amphibian", label: "Amphibian", icon: "ic-frog" },
          { id: "insect",    label: "Insect",    icon: "ic-ladybug" }
        ],
        items: [
          { icon: "ic-snake",   label: "snake",   bin: "reptile" },
          { icon: "ic-turtle",  label: "turtle",  bin: "reptile" },
          { icon: "ic-frog",    label: "frog",    bin: "amphibian" },
          { icon: "ic-tadpole", label: "tadpole", bin: "amphibian" },
          { icon: "ic-bee",     label: "bee",     bin: "insect" },
          { icon: "ic-ladybug", label: "ladybug", bin: "insect" }
        ]
      },
      {
        engine: "readword", title: "Name the group!",
        prompt: "Tap the word for the animal's group.",
        narration: "Look at the animal. Tap the word that names its group.",
        rounds: [
          { icon: "ic-dog",  answer: "mammal",    options: ["mammal", "bird", "fish"] },
          { icon: "ic-owl",  answer: "bird",      options: ["bird", "insect", "reptile"] },
          { icon: "ic-frog", answer: "amphibian", options: ["amphibian", "fish", "mammal"] },
          { icon: "ic-bee",  answer: "insect",    options: ["insect", "bird", "reptile"] }
        ]
      }
    ]
  });

  /* ---- Week 7: Hands-on Activity "Animal Group Hunt!" ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi7-handson", bigIdea: BI, bigIdeaTitle: TITLE, week: 7, kind: "handson",
    question: "Animal Group Hunt!", color: "#3E8E7E", cardIcon: "ic-paw",
    games: [
      {
        engine: "handson", title: "Animal Group Hunt!", icon: "ic-paw",
        narration: "Let's go on an animal group hunt! Here is what to do.",
        materials: [
          { icon: "ic-hand-lens", label: "your eyes" },
          { icon: "ic-paw",       label: "animals" },
          { icon: "ic-home",      label: "your home or yard" }
        ],
        steps: [
          "Look for animals at home or outside.",
          "See one with fur? That is a mammal!",
          "See one with feathers? That is a bird!",
          "Count the legs on a little bug. Six legs means an insect!",
          "Tell someone which group each animal is in."
        ]
      }
    ]
  });
})();
