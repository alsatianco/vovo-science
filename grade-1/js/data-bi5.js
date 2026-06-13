/* ============================================================
   data-bi5.js — Big Idea 5: "Objects can be solid, liquid, or gas."
   Distilled from Daily Science Grade 1 (Evan-Moor EMC 5011), pp. 126-155.
   Six units: Week 1, Week 2, Week 3, Week 4, Review, Hands-on.
   ============================================================ */
(function () {
  var BI = 5, TITLE = "Objects can be solid, liquid, or gas.";

  /* ---- Week 1: Why can't we walk through walls? (pp. 128-133) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi5-solids", bigIdea: BI, bigIdeaTitle: TITLE, week: 1,
    question: "Why can't we walk through walls?", color: "#4F9DAE", cardIcon: "ic-wall",
    vocab: [
      { word: "matter", kid: "everything that takes up space", icon: "ic-block" },
      { word: "solid",  kid: "matter that keeps its shape",    icon: "ic-brick" },
      { word: "mixture", kid: "solids mixed together",         icon: "ic-teddy" }
    ],
    reading: {
      title: "Why can't we walk through walls?",
      lines: [
        { text: "Everything is made of matter.",        icon: "ic-block" },
        { text: "A solid is one kind of matter.",        icon: "ic-brick" },
        { text: "A solid keeps its own shape.",          icon: "ic-block" },
        { text: "A ball stays a ball. A wall stays a wall.", icon: "ic-ball" },
        { text: "A wall is a solid. So are you!",        icon: "ic-wall" },
        { text: "You can mix solids into a mixture.",    icon: "ic-teddy" },
        { text: "Each solid keeps its shape in the mix.", icon: "ic-block" },
        { text: "Two solids cannot share one spot.",     icon: "ic-brick" },
        { text: "So we cannot walk through a wall!",      icon: "ic-wall" }
      ]
    },
    games: [
      {
        engine: "sort", title: "Is it a solid?",
        prompt: "Put each one where it belongs.",
        narration: "A solid keeps its shape. Tap one, then tap the right basket.",
        bins: [
          { id: "solid",    label: "Solid",     icon: "ic-brick" },
          { id: "notsolid", label: "Not solid", icon: "ic-water" }
        ],
        items: [
          { icon: "ic-ball",   label: "ball",   bin: "solid" },
          { icon: "ic-block",  label: "block",  bin: "solid" },
          { icon: "ic-rock",   label: "rock",   bin: "solid" },
          { icon: "ic-spoon",  label: "spoon",  bin: "solid" },
          { icon: "ic-water",  label: "water",  bin: "notsolid" },
          { icon: "ic-milk",   label: "milk",   bin: "notsolid" }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["matter", "solid", "mixture"],
        sentences: [
          { icon: "ic-block", before: "Everything is made of", after: ".", answer: "matter" },
          { icon: "ic-brick", before: "A brick is a",          after: ".", answer: "solid" },
          { icon: "ic-teddy", before: "Mixed-up solids make a", after: ".", answer: "mixture" }
        ]
      },
      {
        engine: "match", title: "What is it like?",
        prompt: "Match each solid to what is true.",
        narration: "Tap a solid, then tap what is true about it.",
        pairs: [
          { from: { icon: "ic-brick", label: "a brick" }, to: { icon: "ic-block", label: "is a solid" } },
          { from: { icon: "ic-wall",  label: "a wall"  }, to: { icon: "ic-kid",   label: "keeps its shape" } },
          { from: { icon: "ic-teddy", label: "mixed toys" }, to: { icon: "ic-ball", label: "make a mixture" } }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A solid keeps its shape.",        icons: ["ic-brick"],           answer: true },
          { text: "A wall is a solid.",              icons: ["ic-wall"],            answer: true },
          { text: "Everything is made of matter.",   icons: ["ic-block"],           answer: true },
          { text: "You can walk through a wall.",     icons: ["ic-wall", "ic-kid"], answer: false },
          { text: "Water keeps its own shape.",       icons: ["ic-water"],          answer: false }
        ]
      },
      {
        engine: "needs", title: "Find the solids!",
        prompt: "Tap every solid.",
        narration: "A solid keeps its shape. Tap all the solids. Leave the others.",
        hero: "ic-brick", wrongMsg: "A {x} is not a solid. It does not keep its shape.",
        choices: [
          { icon: "ic-block", label: "block", need: true },
          { icon: "ic-ball",  label: "ball",  need: true },
          { icon: "ic-spoon", label: "spoon", need: true },
          { icon: "ic-water", label: "water", need: false },
          { icon: "ic-milk",  label: "milk",  need: false }
        ]
      }
    ]
  });

  /* ---- Week 2: Why does water splash? (pp. 134-139) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi5-liquids", bigIdea: BI, bigIdeaTitle: TITLE, week: 2,
    question: "Why does water splash?", color: "#3FA9C9", cardIcon: "ic-splash",
    vocab: [
      { word: "liquid", kid: "matter that flows",        icon: "ic-water" },
      { word: "flows",  kid: "moves and spreads",        icon: "ic-drip" },
      { word: "splash", kid: "to spread apart suddenly", icon: "ic-splash" }
    ],
    reading: {
      title: "Why does water splash?",
      lines: [
        { text: "Water is a liquid.",                  icon: "ic-water" },
        { text: "A liquid is a kind of matter.",       icon: "ic-cup" },
        { text: "When you pour a liquid, it flows.",   icon: "ic-drip" },
        { text: "A liquid does not keep its shape.",   icon: "ic-water" },
        { text: "It takes the shape of its cup.",      icon: "ic-cup" },
        { text: "When it spills, it spreads out.",     icon: "ic-puddle" },
        { text: "When you drop a liquid, it splashes!", icon: "ic-splash" },
        { text: "A ball bounces, but water splashes.",  icon: "ic-ball" },
        { text: "That is why water splashes!",          icon: "ic-splash" }
      ]
    },
    games: [
      {
        engine: "match", title: "What shape now?",
        prompt: "Match each cup to the liquid inside.",
        narration: "A liquid takes the shape of its cup. Tap a cup, then tap its liquid shape.",
        pairs: [
          { from: { icon: "ic-cup",    label: "a cup"    }, to: { icon: "ic-water", label: "tall water" } },
          { from: { icon: "ic-bowl",   label: "a bowl"   }, to: { icon: "ic-milk",  label: "round milk" } },
          { from: { icon: "ic-teapot", label: "a teapot" }, to: { icon: "ic-drip",  label: "spout drip" } }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["liquid", "flows", "splash"],
        sentences: [
          { icon: "ic-water",  before: "Water is a",            after: ".", answer: "liquid" },
          { icon: "ic-drip",   before: "When you pour it, it",  after: ".", answer: "flows" },
          { icon: "ic-splash", before: "When you drop it, you see a", after: ".", answer: "splash" }
        ]
      },
      {
        engine: "sort", title: "Solid or liquid?",
        prompt: "Put each one where it belongs.",
        narration: "A solid keeps its shape. A liquid flows. Tap one, then tap the right basket.",
        bins: [
          { id: "solid",  label: "Solid",  icon: "ic-block" },
          { id: "liquid", label: "Liquid", icon: "ic-water" }
        ],
        items: [
          { icon: "ic-ball",  label: "ball",  bin: "solid" },
          { icon: "ic-brick", label: "brick", bin: "solid" },
          { icon: "ic-spoon", label: "spoon", bin: "solid" },
          { icon: "ic-water", label: "water", bin: "liquid" },
          { icon: "ic-milk",  label: "milk",  bin: "liquid" },
          { icon: "ic-juice", label: "juice", bin: "liquid" }
        ]
      },
      {
        engine: "needs", title: "Find the liquids!",
        prompt: "Tap every liquid.",
        narration: "A liquid can flow and splash. Tap all the liquids. Leave the others.",
        hero: "ic-water", wrongMsg: "A {x} is a solid. It does not flow.",
        choices: [
          { icon: "ic-water", label: "water", need: true },
          { icon: "ic-milk",  label: "milk",  need: true },
          { icon: "ic-juice", label: "juice", need: true },
          { icon: "ic-ball",  label: "ball",  need: false },
          { icon: "ic-block", label: "block", need: false }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A liquid can flow.",                  icons: ["ic-drip"],            answer: true },
          { text: "Water takes the shape of its cup.",   icons: ["ic-cup", "ic-water"], answer: true },
          { text: "Water splashes when you drop it.",    icons: ["ic-splash"],          answer: true },
          { text: "A liquid keeps its own shape.",        icons: ["ic-water"],          answer: false },
          { text: "A ball flows like water.",             icons: ["ic-ball"],           answer: false }
        ]
      }
    ]
  });

  /* ---- Week 3: Why do balloons float in the air? (pp. 140-145) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi5-gases", bigIdea: BI, bigIdeaTitle: TITLE, week: 3,
    question: "Why do balloons float in the air?", color: "#6FB7C9", cardIcon: "ic-balloon",
    vocab: [
      { word: "gas",    kid: "matter you cannot see", icon: "ic-air" },
      { word: "air",    kid: "the gas all around us",  icon: "ic-balloon" },
      { word: "helium", kid: "a gas lighter than air", icon: "ic-balloon-helium" }
    ],
    reading: {
      title: "Why do balloons float in the air?",
      lines: [
        { text: "Balloons have air in them.",          icon: "ic-balloon" },
        { text: "Air is a gas.",                        icon: "ic-air" },
        { text: "A gas is a kind of matter.",           icon: "ic-air" },
        { text: "You cannot see a gas.",                icon: "ic-air" },
        { text: "A gas takes the shape of its space.",  icon: "ic-balloon" },
        { text: "A gas has less mass than water.",      icon: "ic-water" },
        { text: "Helium is a gas lighter than air.",    icon: "ic-balloon-helium" },
        { text: "A helium balloon floats up high.",     icon: "ic-balloon-helium" },
        { text: "That is why balloons float away!",     icon: "ic-balloon-helium" }
      ]
    },
    games: [
      {
        engine: "match", title: "Fill it with air!",
        prompt: "Match each thing to it filled with air.",
        narration: "A gas takes the shape of its space. Tap a thing, then tap it filled with air.",
        pairs: [
          { from: { icon: "ic-bike",    label: "flat tire" }, to: { icon: "ic-tire",    label: "full tire" } },
          { from: { icon: "ic-balloon", label: "empty"     }, to: { icon: "ic-balloon-helium", label: "full balloon" } },
          { from: { icon: "ic-ball",    label: "flat ball" }, to: { icon: "ic-ball",    label: "round ball" } }
        ]
      },
      {
        engine: "needs", title: "What is true of a gas?",
        prompt: "Tap everything that is true of a gas.",
        narration: "A gas is matter. Tap all the things that are true of a gas. Leave the others.",
        hero: "ic-air", wrongMsg: "That is not true of a gas.",
        choices: [
          { icon: "ic-air",     label: "has mass",     need: true },
          { icon: "ic-balloon", label: "takes shape",  need: true },
          { icon: "ic-balloon-helium", label: "can float", need: true },
          { icon: "ic-brick",   label: "keeps shape",  need: false },
          { icon: "ic-water",   label: "you can pour", need: false }
        ]
      },
      {
        engine: "sort", title: "Solid, liquid, or gas?",
        prompt: "Put each one where it belongs.",
        narration: "Is it a solid, a liquid, or a gas? Tap one, then tap the right basket.",
        bins: [
          { id: "solid",  label: "Solid",  icon: "ic-ice-cube" },
          { id: "liquid", label: "Liquid", icon: "ic-water" },
          { id: "gas",    label: "Gas",    icon: "ic-balloon" }
        ],
        items: [
          { icon: "ic-brick",   label: "brick",   bin: "solid" },
          { icon: "ic-block",   label: "block",   bin: "solid" },
          { icon: "ic-water",   label: "water",   bin: "liquid" },
          { icon: "ic-milk",    label: "milk",    bin: "liquid" },
          { icon: "ic-balloon", label: "air",     bin: "gas" },
          { icon: "ic-steam",   label: "steam",   bin: "gas" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Air is a kind of matter.",          icons: ["ic-air"],     answer: true },
          { text: "A gas has mass.",                    icons: ["ic-balloon"], answer: true },
          { text: "Helium is lighter than air.",        icons: ["ic-balloon-helium"], answer: true },
          { text: "A gas has its own shape.",            icons: ["ic-air"],    answer: false },
          { text: "A gas has more mass than a rock.",    icons: ["ic-rock"],   answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["gas", "helium", "float"],
        sentences: [
          { icon: "ic-air",            before: "The air we breathe is a", after: ".", answer: "gas" },
          { icon: "ic-balloon-helium", before: "A light gas is called",   after: ".", answer: "helium" },
          { icon: "ic-balloon-helium", before: "A helium balloon will",   after: " away.", answer: "float" }
        ]
      }
    ]
  });

  /* ---- Week 4: Why does ice melt? (pp. 146-151) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi5-melt", bigIdea: BI, bigIdeaTitle: TITLE, week: 4,
    question: "Why does ice melt?", color: "#4FB0A8", cardIcon: "ic-ice-cube",
    vocab: [
      { word: "ice",   kid: "frozen water",                 icon: "ic-ice-cube" },
      { word: "melt",  kid: "to turn from solid to liquid", icon: "ic-puddle" },
      { word: "steam", kid: "the gas form of water",        icon: "ic-steam" }
    ],
    reading: {
      title: "Why does ice melt?",
      lines: [
        { text: "When water freezes, it turns to ice.",  icon: "ic-ice-cube" },
        { text: "Ice is a solid. It keeps its shape.",   icon: "ic-ice-cube" },
        { text: "Heat makes ice warm up.",               icon: "ic-sun" },
        { text: "When ice warms up, it melts.",          icon: "ic-puddle" },
        { text: "Melted ice turns into water.",          icon: "ic-water" },
        { text: "Heat can make water very hot.",         icon: "ic-kettle" },
        { text: "Hot water turns into steam.",           icon: "ic-steam" },
        { text: "Steam is the gas form of water.",       icon: "ic-steam" },
        { text: "So heat makes ice melt!",               icon: "ic-sun" }
      ]
    },
    games: [
      {
        engine: "sort", title: "Before or after heat?",
        prompt: "Put each one where it belongs.",
        narration: "Heat melts solids. Tap one, then tap the right basket.",
        bins: [
          { id: "before", label: "Solid (cold)",  icon: "ic-ice-cube" },
          { id: "after",  label: "Melted (warm)", icon: "ic-puddle" }
        ],
        items: [
          { icon: "ic-ice-cube", label: "ice cube", bin: "before" },
          { icon: "ic-popsicle", label: "popsicle", bin: "before" },
          { icon: "ic-butter",   label: "butter",   bin: "before" },
          { icon: "ic-water",    label: "water",    bin: "after" },
          { icon: "ic-puddle",   label: "puddle",   bin: "after" },
          { icon: "ic-milk",     label: "melted",   bin: "after" }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["ice", "melt", "steam"],
        sentences: [
          { icon: "ic-ice-cube", before: "Frozen water is called", after: ".", answer: "ice" },
          { icon: "ic-puddle",   before: "Heat makes ice",         after: ".", answer: "melt" },
          { icon: "ic-steam",    before: "Hot water turns into",   after: ".", answer: "steam" }
        ]
      },
      {
        engine: "match", title: "What does it melt into?",
        prompt: "Match each solid to its melted form.",
        narration: "Heat melts these solids. Tap a solid, then tap what it melts into.",
        pairs: [
          { from: { icon: "ic-ice-cube", label: "ice cube" }, to: { icon: "ic-water",  label: "water" } },
          { from: { icon: "ic-popsicle", label: "popsicle" }, to: { icon: "ic-juice",  label: "drip" } },
          { from: { icon: "ic-butter",   label: "butter"   }, to: { icon: "ic-puddle", label: "puddle" } }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Heat makes ice melt.",            icons: ["ic-sun", "ic-ice-cube"], answer: true },
          { text: "Ice is a solid.",                  icons: ["ic-ice-cube"],          answer: true },
          { text: "Steam is the gas form of water.",  icons: ["ic-steam"],             answer: true },
          { text: "The solid form of water is steam.", icons: ["ic-steam"],            answer: false },
          { text: "Ice gets bigger when it melts.",    icons: ["ic-ice-cube"],         answer: false }
        ]
      },
      {
        engine: "sequence", title: "Heat it up!",
        prompt: "Tap the pictures in order.",
        narration: "Heat changes water. Tap them in order: ice, then water, then steam.",
        steps: [
          { icon: "ic-ice-cube", label: "ice" },
          { icon: "ic-water",    label: "water" },
          { icon: "ic-steam",    label: "steam" }
        ]
      }
    ]
  });

  /* ---- Week 5: Unit Review (pp. 152-154) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi5-review", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "review",
    question: "Big Idea 5 Review", color: "#2E7D8C", cardIcon: "ic-star",
    reading: {
      title: "What did we learn?",
      lines: [
        { text: "A solid keeps its own shape.",         icon: "ic-brick" },
        { text: "A liquid flows and takes its shape.",  icon: "ic-water" },
        { text: "A gas takes the shape of its space.",  icon: "ic-balloon" },
        { text: "Heat melts ice into water.",           icon: "ic-puddle" },
        { text: "Now show what you know!",              icon: "ic-star" }
      ]
    },
    games: [
      {
        engine: "readword", title: "Find the word!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Is it a solid, a liquid, or a gas? Tap the word.",
        rounds: [
          { icon: "ic-brick",   answer: "solid",  options: ["solid", "liquid", "gas"] },
          { icon: "ic-water",   answer: "liquid", options: ["liquid", "solid", "gas"] },
          { icon: "ic-balloon", answer: "gas",    options: ["gas", "liquid", "solid"] },
          { icon: "ic-steam",   answer: "gas",    options: ["gas", "solid", "liquid"] }
        ]
      },
      {
        engine: "sort", title: "Solid, liquid, or gas?",
        prompt: "Put each one where it belongs.",
        narration: "Is it a solid, a liquid, or a gas? Tap one, then tap the right basket.",
        bins: [
          { id: "solid",  label: "Solid",  icon: "ic-block" },
          { id: "liquid", label: "Liquid", icon: "ic-water" },
          { id: "gas",    label: "Gas",    icon: "ic-balloon" }
        ],
        items: [
          { icon: "ic-ball",    label: "ball",  bin: "solid" },
          { icon: "ic-brick",   label: "brick", bin: "solid" },
          { icon: "ic-milk",    label: "milk",  bin: "liquid" },
          { icon: "ic-juice",   label: "juice", bin: "liquid" },
          { icon: "ic-balloon", label: "air",   bin: "gas" },
          { icon: "ic-steam",   label: "steam", bin: "gas" }
        ]
      },
      {
        engine: "match", title: "Match the words!",
        prompt: "Match each word to what it means.",
        narration: "Tap a word, then tap what it means.",
        pairs: [
          { from: { icon: "ic-ice-cube", label: "ice"   }, to: { icon: "ic-water",  label: "frozen water" } },
          { from: { icon: "ic-steam",    label: "steam" }, to: { icon: "ic-balloon", label: "gas of water" } },
          { from: { icon: "ic-teddy",    label: "mixture" }, to: { icon: "ic-block", label: "mixed solids" } }
        ]
      },
      {
        engine: "truefalse", title: "What do you know?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A solid keeps its shape.",          icons: ["ic-brick"],            answer: true },
          { text: "Heat turns liquid water into gas.",  icons: ["ic-steam"],           answer: true },
          { text: "A solid, a liquid, and a gas all have mass.", icons: ["ic-balloon"], answer: true },
          { text: "Mixing solids makes a mixture.",     icons: ["ic-teddy"],           answer: true },
          { text: "A liquid keeps its own shape.",       icons: ["ic-water"],          answer: false }
        ]
      }
    ]
  });

  /* ---- Week 5: Hands-on Activity "Ice Cube Race" (p. 155) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi5-handson", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "handson",
    question: "Ice Cube Race", color: "#5BB8D4", cardIcon: "ic-marble",
    games: [
      {
        engine: "handson", title: "Ice Cube Race", icon: "ic-ice-cube",
        narration: "Let's race to melt the ice and free the marble! Here is what to do.",
        materials: [
          { icon: "ic-ice-cube", label: "ice with a marble inside" },
          { icon: "ic-cup",      label: "a cup" },
          { icon: "ic-marble",   label: "a marble" }
        ],
        steps: [
          "Ask a grown-up to freeze a marble inside an ice cube.",
          "Take the ice cube out and put it in your cup.",
          "Warm the ice with your hands or warm water to melt it.",
          "Do not bite the ice! Just melt it to free the marble.",
          "Race a friend. Who frees the marble first?"
        ]
      }
    ]
  });
})();
