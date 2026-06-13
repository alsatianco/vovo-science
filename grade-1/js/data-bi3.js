/* ============================================================
   data-bi3.js — Big Idea 3: "The sun, moon, and stars are
   objects in our sky." (EMC 5011, pp. 66-95)
   Six units: Week 1-4, Unit Review, Hands-on.
   Pure data — read by the reading screen + game engines.
   ============================================================ */
(function () {
  var BI = 3, TITLE = "The sun, moon, and stars are objects in our sky.";

  /* ---- Week 1: What causes day and night? (pp. 68-73) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "day-night", bigIdea: BI, bigIdeaTitle: TITLE, week: 1,
    question: "What causes day and night?", color: "#3B5BA5", cardIcon: "ic-earth",
    vocab: [
      { word: "Earth",   kid: "the planet we live on", icon: "ic-earth" },
      { word: "rotates", kid: "spins around",          icon: "ic-earth" },
      { word: "day",     kid: "when it is light",       icon: "ic-noon-sun" },
      { word: "night",   kid: "when it is dark",        icon: "ic-night" }
    ],
    reading: {
      title: "What causes day and night?",
      lines: [
        { text: "Earth is the planet we live on.",       icon: "ic-earth" },
        { text: "Earth spins all the way around.",        icon: "ic-earth" },
        { text: "It rotates once every day.",             icon: "ic-earth" },
        { text: "The sun and moon do not move.",          icon: "ic-sun" },
        { text: "Our side turns to the sun. It is day.",  icon: "ic-noon-sun" },
        { text: "Our side turns away. It is night.",      icon: "ic-night" },
        { text: "At night we see the stars.",             icon: "ic-star" },
        { text: "Earth never stops rotating.",            icon: "ic-earth" },
        { text: "So we always have day and night!",       icon: "ic-night" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["rotates", "day", "night"],
        sentences: [
          { icon: "ic-earth",    before: "Earth spins all the way around. It", after: ".", answer: "rotates" },
          { icon: "ic-noon-sun", before: "When the sun shines on us, it is",   after: ".", answer: "day" },
          { icon: "ic-night",    before: "When we turn away from the sun, it is", after: ".", answer: "night" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Earth rotates once every day.",        icons: ["ic-earth"],              answer: true },
          { text: "At night, our side is away from the sun.", icons: ["ic-night"],          answer: true },
          { text: "At night, we can see stars.",          icons: ["ic-star", "ic-night"],   answer: true },
          { text: "At night, it is dark all over Earth.", icons: ["ic-earth"],              answer: false },
          { text: "At night, Earth stops rotating.",      icons: ["ic-earth"],              answer: false }
        ]
      },
      {
        engine: "sort", title: "Day or night?",
        prompt: "Put each one where it belongs.",
        narration: "Some things we see in the day. Some at night. Tap one, then tap the right basket.",
        bins: [
          { id: "day",   label: "Day",   icon: "ic-noon-sun" },
          { id: "night", label: "Night", icon: "ic-night" }
        ],
        items: [
          { icon: "ic-sun",       label: "sun",     bin: "day" },
          { icon: "ic-noon-sun",  label: "noon",    bin: "day" },
          { icon: "ic-kid",       label: "awake",   bin: "day" },
          { icon: "ic-moon",      label: "moon",    bin: "night" },
          { icon: "ic-star",      label: "stars",   bin: "night" },
          { icon: "ic-night",     label: "dark",    bin: "night" }
        ]
      },
      {
        engine: "sequence", title: "From morning to night",
        prompt: "Tap the pictures in order.",
        narration: "The sun seems to move across the sky. Tap them from morning to night.",
        steps: [
          { icon: "ic-morning-sun", label: "morning" },
          { icon: "ic-noon-sun",    label: "noon" },
          { icon: "ic-evening-sun", label: "evening" },
          { icon: "ic-night",       label: "night" }
        ]
      },
      {
        engine: "needs", title: "What do we see in the day?",
        prompt: "Tap everything we see in the daytime sky.",
        narration: "In the day, our side faces the sun. Tap what we see in the daytime sky. Leave the others.",
        hero: "ic-noon-sun", wrongMsg: "We do not see the {x} in the daytime sky.",
        choices: [
          { icon: "ic-sun",   label: "sun",   need: true },
          { icon: "ic-bird",  label: "bird",  need: true },
          { icon: "ic-air",   label: "clouds", need: true },
          { icon: "ic-star",  label: "stars", need: false },
          { icon: "ic-moon",  label: "moon",  need: false }
        ]
      }
    ]
  });

  /* ---- Week 2: What do we see in the sky at night? (pp. 74-79) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "night-sky", bigIdea: BI, bigIdeaTitle: TITLE, week: 2,
    question: "What do we see in the sky at night?", color: "#2E4A8C", cardIcon: "ic-moon",
    vocab: [
      { word: "stars",  kid: "make their own light", icon: "ic-star" },
      { word: "sun",    kid: "the closest star",     icon: "ic-sun" },
      { word: "moon",   kid: "made of rock",         icon: "ic-moon" },
      { word: "planet", kid: "does not make light",  icon: "ic-planet" }
    ],
    reading: {
      title: "What do we see in the sky at night?",
      lines: [
        { text: "At night we see stars shining.",        icon: "ic-star" },
        { text: "Stars give off their own light.",        icon: "ic-star" },
        { text: "The sun is a star, too.",                icon: "ic-sun" },
        { text: "The sun is the closest star to us.",     icon: "ic-sun" },
        { text: "We see the moon at night.",              icon: "ic-moon" },
        { text: "The moon is made of rock.",              icon: "ic-moon" },
        { text: "The moon does not make its own light.",  icon: "ic-moon" },
        { text: "Light from the sun makes it bright.",    icon: "ic-sun" },
        { text: "Planets like Mars reflect the sun, too.", icon: "ic-mars" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["stars", "sun", "planet"],
        sentences: [
          { icon: "ic-star",   before: "At night we see",            after: ".", answer: "stars" },
          { icon: "ic-sun",    before: "The closest star to us is the", after: ".", answer: "sun" },
          { icon: "ic-planet", before: "Mars is a",                  after: ".", answer: "planet" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Stars give off their own light.", icons: ["ic-star"],            answer: true },
          { text: "The sun is a star.",              icons: ["ic-sun"],             answer: true },
          { text: "Mars is a planet.",               icons: ["ic-mars"],            answer: true },
          { text: "The moon makes its own light.",   icons: ["ic-moon"],            answer: false },
          { text: "We see stars at night.",          icons: ["ic-star", "ic-night"], answer: true }
        ]
      },
      {
        engine: "needs", title: "What is in the night sky?",
        prompt: "Tap everything we see in the night sky.",
        narration: "Look up at night! Tap the things in the night sky. Leave the others.",
        hero: "ic-night", wrongMsg: "We do not see a {x} in the night sky.",
        choices: [
          { icon: "ic-star",   label: "stars",  need: true },
          { icon: "ic-moon",   label: "moon",   need: true },
          { icon: "ic-planet", label: "planet", need: true },
          { icon: "ic-tree",   label: "tree",   need: false },
          { icon: "ic-fish",   label: "fish",   need: false }
        ]
      },
      {
        engine: "match", title: "Match the sky object",
        prompt: "Match each object to what it does.",
        narration: "Tap a sky object, then tap what it does.",
        pairs: [
          { from: { icon: "ic-star", label: "star" }, to: { icon: "ic-energy", label: "makes light" } },
          { from: { icon: "ic-moon", label: "moon" }, to: { icon: "ic-rock",   label: "made of rock" } },
          { from: { icon: "ic-mars", label: "Mars" }, to: { icon: "ic-planet", label: "a planet" } }
        ]
      },
      {
        engine: "sort", title: "Light or no light?",
        prompt: "Put each one where it belongs.",
        narration: "Some things make their own light. Some reflect the sun. Tap one, then tap the right basket.",
        bins: [
          { id: "makes",     label: "Makes light",     icon: "ic-energy" },
          { id: "reflects",  label: "Reflects the sun", icon: "ic-moon" }
        ],
        items: [
          { icon: "ic-sun",    label: "sun",   bin: "makes" },
          { icon: "ic-star",   label: "star",  bin: "makes" },
          { icon: "ic-moon",   label: "moon",  bin: "reflects" },
          { icon: "ic-mars",   label: "Mars",  bin: "reflects" },
          { icon: "ic-venus",  label: "Venus", bin: "reflects" }
        ]
      }
    ]
  });

  /* ---- Week 3: Why do we need the sun? (pp. 80-85) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "need-sun", bigIdea: BI, bigIdeaTitle: TITLE, week: 3,
    question: "Why do we need the sun?", color: "#C9852C", cardIcon: "ic-sun",
    vocab: [
      { word: "energy", kid: "power we can use",   icon: "ic-energy" },
      { word: "light",  kid: "energy we can see",  icon: "ic-noon-sun" },
      { word: "heat",   kid: "energy we can feel",  icon: "ic-fire" }
    ],
    reading: {
      title: "Why do we need the sun?",
      lines: [
        { text: "The sun gives us energy.",             icon: "ic-energy" },
        { text: "We see the energy as light.",           icon: "ic-noon-sun" },
        { text: "We feel the energy as heat.",           icon: "ic-fire" },
        { text: "The sun's light helps us see.",         icon: "ic-sun" },
        { text: "The sun's heat keeps us warm.",         icon: "ic-fire" },
        { text: "Plants use the sun to make food.",      icon: "ic-corn" },
        { text: "We eat plants and animals.",            icon: "ic-corn" },
        { text: "Without the sun, nothing could grow.",  icon: "ic-flower" },
        { text: "We need the sun to live!",              icon: "ic-sun" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["energy", "light", "heat"],
        sentences: [
          { icon: "ic-energy",   before: "The sun gives us",      after: ".", answer: "energy" },
          { icon: "ic-noon-sun", before: "The sun's light helps us", after: " see.", answer: "light" },
          { icon: "ic-fire",     before: "The sun's heat keeps us", after: " warm.", answer: "heat" }
        ]
      },
      {
        engine: "needs", title: "What does the sun give?",
        prompt: "Tap everything the sun gives us.",
        narration: "The sun gives us so much! Tap what the sun gives us. Leave the others.",
        hero: "ic-sun", wrongMsg: "The sun does not give us a {x}.",
        choices: [
          { icon: "ic-noon-sun", label: "light",  need: true },
          { icon: "ic-fire",     label: "heat",   need: true },
          { icon: "ic-energy",   label: "energy", need: true },
          { icon: "ic-ball",     label: "ball",   need: false },
          { icon: "ic-teddy",    label: "toy",    need: false }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "The sun gives us light and heat.",  icons: ["ic-sun"],            answer: true },
          { text: "Plants need the sun to make food.", icons: ["ic-corn", "ic-sun"], answer: true },
          { text: "We need the sun to live.",          icons: ["ic-kid", "ic-sun"],  answer: true },
          { text: "The sun is very weak.",             icons: ["ic-sun"],            answer: false },
          { text: "We could live without the sun.",    icons: ["ic-sun"],            answer: false }
        ]
      },
      {
        engine: "sort", title: "Does it need the sun?",
        prompt: "Put each one where it belongs.",
        narration: "Living things need the sun. Nonliving things do not. Tap one, then tap the right basket.",
        bins: [
          { id: "needs",  label: "Needs the sun",    icon: "ic-sun" },
          { id: "no",     label: "Does not need it", icon: "ic-rock" }
        ],
        items: [
          { icon: "ic-flower", label: "flower", bin: "needs" },
          { icon: "ic-corn",   label: "corn",   bin: "needs" },
          { icon: "ic-cow",    label: "cow",    bin: "needs" },
          { icon: "ic-kid",    label: "child",  bin: "needs" },
          { icon: "ic-rock",   label: "rock",   bin: "no" },
          { icon: "ic-car",    label: "car",    bin: "no" }
        ]
      },
      {
        engine: "sequence", title: "From sun to food",
        prompt: "Tap the pictures in order.",
        narration: "The sun feeds the corn. The corn feeds the cow. The cow feeds us! Tap them in order.",
        steps: [
          { icon: "ic-sun",  label: "sun" },
          { icon: "ic-corn", label: "plant" },
          { icon: "ic-cow",  label: "animal" },
          { icon: "ic-kid",  label: "person" }
        ]
      }
    ]
  });

  /* ---- Week 4: Can anything live on the moon? (pp. 86-91) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "live-moon", bigIdea: BI, bigIdeaTitle: TITLE, week: 4,
    question: "Can anything live on the moon?", color: "#5A6B8C", cardIcon: "ic-moon-full",
    vocab: [
      { word: "moon",     kid: "a big rock near Earth", icon: "ic-moon" },
      { word: "crater",   kid: "a hole like a bowl",     icon: "ic-crater" },
      { word: "mountain", kid: "a very tall rock",       icon: "ic-mountain" }
    ],
    reading: {
      title: "Can anything live on the moon?",
      lines: [
        { text: "The moon is close to Earth.",            icon: "ic-moon" },
        { text: "The moon is made of rock.",              icon: "ic-rock" },
        { text: "It has tall mountains.",                 icon: "ic-mountain" },
        { text: "It has craters like big bowls.",         icon: "ic-crater" },
        { text: "Rocks crashed in and made the craters.", icon: "ic-crater" },
        { text: "The moon has no air or water.",          icon: "ic-moon" },
        { text: "So nothing can live on the moon.",       icon: "ic-astronaut" },
        { text: "We must take our own air and water.",    icon: "ic-astronaut" },
        { text: "The moon seems to change shape, too.",   icon: "ic-moon-crescent" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["moon", "crater", "mountain"],
        sentences: [
          { icon: "ic-rock",     before: "The moon is made of rock. We call it the", after: ".", answer: "moon" },
          { icon: "ic-crater",   before: "A hole like a bowl is a",  after: ".", answer: "crater" },
          { icon: "ic-mountain", before: "A very tall rock is a",    after: ".", answer: "mountain" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "The moon is made of rock.",       icons: ["ic-moon"],     answer: true },
          { text: "The moon has craters.",           icons: ["ic-crater"],   answer: true },
          { text: "The moon has air and water.",     icons: ["ic-moon"],     answer: false },
          { text: "The moon makes its own light.",   icons: ["ic-moon"],     answer: false },
          { text: "Nothing can live on the moon.",   icons: ["ic-astronaut"], answer: true }
        ]
      },
      {
        engine: "needs", title: "What the moon does NOT have",
        prompt: "Tap what the moon does not have.",
        narration: "The moon is dry and empty. Tap the things the moon does not have. Leave the things it does.",
        hero: "ic-moon", wrongMsg: "The moon DOES have a {x}.",
        choices: [
          { icon: "ic-air",      label: "air",      need: true },
          { icon: "ic-water",    label: "water",    need: true },
          { icon: "ic-tree",     label: "trees",    need: true },
          { icon: "ic-crater",   label: "craters",  need: false },
          { icon: "ic-mountain", label: "mountains", need: false }
        ]
      },
      {
        engine: "match", title: "Match the moon",
        prompt: "Match each thing to what it tells us.",
        narration: "Tap a picture, then tap what it tells us about the moon.",
        pairs: [
          { from: { icon: "ic-crater",   label: "crater"   }, to: { icon: "ic-rock", label: "like a bowl" } },
          { from: { icon: "ic-mountain", label: "mountain" }, to: { icon: "ic-moon", label: "very tall" } },
          { from: { icon: "ic-astronaut", label: "astronaut" }, to: { icon: "ic-air", label: "brings air" } }
        ]
      },
      {
        engine: "sequence", title: "Moon phases",
        prompt: "Tap the moon shapes in order.",
        narration: "The moon seems to change shape. Tap from new moon to full moon.",
        steps: [
          { icon: "ic-moon-new",      label: "new" },
          { icon: "ic-moon-crescent", label: "crescent" },
          { icon: "ic-moon-quarter",  label: "quarter" },
          { icon: "ic-moon-gibbous",  label: "gibbous" },
          { icon: "ic-moon-full",     label: "full" }
        ]
      }
    ]
  });

  /* ---- Week 5: Unit Review (pp. 92-94) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi3-review", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "review",
    question: "Big Idea 3 Review", color: "#3B5BA5", cardIcon: "ic-star",
    reading: {
      title: "What did we learn?",
      lines: [
        { text: "Earth rotates to make day and night.", icon: "ic-earth" },
        { text: "Stars make their own light.",          icon: "ic-star" },
        { text: "The sun gives us light and heat.",     icon: "ic-sun" },
        { text: "The moon is rock with craters.",       icon: "ic-moon-full" },
        { text: "Now show what you know!",              icon: "ic-star" }
      ]
    },
    games: [
      {
        engine: "truefalse", title: "What do you know?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Earth rotates to make day and night.", icons: ["ic-earth"],            answer: true },
          { text: "We see stars mostly at night.",        icons: ["ic-star", "ic-night"], answer: true },
          { text: "The sun gives Earth light and heat.",  icons: ["ic-sun"],              answer: true },
          { text: "The moon has air and water.",          icons: ["ic-moon"],             answer: false },
          { text: "Mars is a planet.",                    icons: ["ic-mars"],             answer: true }
        ]
      },
      {
        engine: "sort", title: "Day or night?",
        prompt: "Put each one where it belongs.",
        narration: "When do we see it? Tap one, then tap the right basket.",
        bins: [
          { id: "day",   label: "Day",   icon: "ic-noon-sun" },
          { id: "night", label: "Night", icon: "ic-night" }
        ],
        items: [
          { icon: "ic-sun",    label: "sun",    bin: "day" },
          { icon: "ic-bird",   label: "bird",   bin: "day" },
          { icon: "ic-moon",   label: "moon",   bin: "night" },
          { icon: "ic-star",   label: "stars",  bin: "night" },
          { icon: "ic-planet", label: "planet", bin: "night" },
          { icon: "ic-noon-sun", label: "noon", bin: "day" }
        ]
      },
      {
        engine: "match", title: "Be a word star!",
        prompt: "Match each word to its meaning.",
        narration: "Tap a word, then tap what it means.",
        pairs: [
          { from: { icon: "ic-moon",     label: "moon"   }, to: { icon: "ic-rock",   label: "closest to Earth" } },
          { from: { icon: "ic-noon-sun", label: "light"  }, to: { icon: "ic-energy", label: "energy we see" } },
          { from: { icon: "ic-fire",     label: "heat"   }, to: { icon: "ic-sun",    label: "energy we feel" } }
        ]
      },
      {
        engine: "readword", title: "Find the word!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-earth",  answer: "Earth",  options: ["Earth", "moon", "sun"] },
          { icon: "ic-star",   answer: "star",   options: ["star", "moon", "planet"] },
          { icon: "ic-moon",   answer: "moon",   options: ["moon", "sun", "star"] },
          { icon: "ic-crater", answer: "crater", options: ["crater", "mountain", "rock"] }
        ]
      }
    ]
  });

  /* ---- Week 5: Hands-on Activity "Moon Phase Fun" (p. 95) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi3-handson", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "handson",
    question: "Moon Phase Fun", color: "#2E4A8C", cardIcon: "ic-paper-plate",
    games: [
      {
        engine: "handson", title: "Moon Phase Fun", icon: "ic-paper-plate",
        narration: "Let's make the moon change shape! Here is what to do.",
        materials: [
          { icon: "ic-paper-plate", label: "paper plate" },
          { icon: "ic-noon-sun",    label: "yellow marker" },
          { icon: "ic-moon-new",    label: "black marker" }
        ],
        steps: [
          "Get a moon phase from your teacher.",
          "Color your paper plate to look like that moon.",
          "Use yellow for the lit-up part. Use black for the dark part.",
          "Add little craters with your marker.",
          "Stand in a circle to show the moon going around Earth.",
          "Hold your plate up high. See the moon change shape!"
        ]
      }
    ]
  });
})();
