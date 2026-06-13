/* ============================================================
   data-bi4.js — Big Idea 4: "Different seasons have different weather."
   Distilled from Daily Science Grade 1 (Evan-Moor EMC 5011), pp. 96-125.
   Six units: Week 1, Week 2, Week 3, Week 4, Review, Hands-on.
   Accent color #E08A4A; hues varied per unit.
   ============================================================ */
(function () {
  var BI = 4, TITLE = "Different seasons have different weather.";

  /* ---- Week 1: Why is it hot in the summer? (pp. 98-103) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "summer-hot", bigIdea: BI, bigIdeaTitle: TITLE, week: 1,
    question: "Why is it hot in the summer?", color: "#E08A4A", cardIcon: "ic-sun",
    vocab: [
      { word: "season", kid: "a time of year",          icon: "ic-sun" },
      { word: "summer", kid: "the warmest season",       icon: "ic-icecream" },
      { word: "axis",   kid: "a line through Earth",      icon: "ic-earth-axis" },
      { word: "orbit",  kid: "Earth goes around the sun", icon: "ic-orbit" }
    ],
    reading: {
      title: "Why is it hot in the summer?",
      lines: [
        { text: "Each year has four seasons.",            icon: "ic-sun" },
        { text: "Summer is the warmest season.",          icon: "ic-icecream" },
        { text: "Earth tilts on its axis.",               icon: "ic-earth-axis" },
        { text: "Earth orbits, or goes around, the sun.", icon: "ic-orbit" },
        { text: "In summer, Earth tilts toward the sun.", icon: "ic-sun" },
        { text: "We get a lot of sunshine.",              icon: "ic-sun" },
        { text: "The sunshine makes the days hot.",       icon: "ic-icecream" },
        { text: "It makes the days longer, too.",         icon: "ic-sun" },
        { text: "That is why it is hot in the summer!",   icon: "ic-swim" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["axis", "orbit", "summer"],
        sentences: [
          { icon: "ic-earth-axis", before: "Earth tilts on its",   after: ".",            answer: "axis" },
          { icon: "ic-orbit",      before: "Earth and its",        after: " go around the sun.", answer: "orbit" },
          { icon: "ic-icecream",   before: "The warmest season is", after: ".",            answer: "summer" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Each year has four seasons.",          icons: ["ic-sun"],            answer: true },
          { text: "Summer is the warmest season.",        icons: ["ic-icecream"],       answer: true },
          { text: "In summer, the days are long.",        icons: ["ic-sun"],            answer: true },
          { text: "Earth tilts away from the sun in summer.", icons: ["ic-earth-axis"], answer: false },
          { text: "Summer is the coldest season.",        icons: ["ic-snowman"],        answer: false }
        ]
      },
      {
        engine: "sort", title: "When do we do it?",
        prompt: "Put each one where it belongs.",
        narration: "Some things we do in summer. Some in winter. Tap one, then tap the season.",
        bins: [
          { id: "summer", label: "Summer", icon: "ic-icecream" },
          { id: "winter", label: "Winter", icon: "ic-snowman" }
        ],
        items: [
          { icon: "ic-swim",     label: "swim",      bin: "summer" },
          { icon: "ic-icecream", label: "ice cream", bin: "summer" },
          { icon: "ic-sun",      label: "sun",       bin: "summer" },
          { icon: "ic-snowman",  label: "snowman",   bin: "winter" },
          { icon: "ic-coat",     label: "warm coat", bin: "winter" },
          { icon: "ic-snow",     label: "snow",      bin: "winter" }
        ]
      },
      {
        engine: "needs", title: "What do we do in summer?",
        prompt: "Tap everything people do in the summer.",
        narration: "Summer is hot and sunny. Tap the things people do in summer. Leave the others.",
        hero: "ic-sun", wrongMsg: "People do not do that in summer.",
        choices: [
          { icon: "ic-swim",     label: "swim",      need: true },
          { icon: "ic-icecream", label: "ice cream", need: true },
          { icon: "ic-sun",      label: "play in sun", need: true },
          { icon: "ic-snowman",  label: "snowman",   need: false },
          { icon: "ic-coat",     label: "thick coat", need: false }
        ]
      },
      {
        engine: "match", title: "Cause and effect",
        prompt: "Match each cause to what it makes happen.",
        narration: "Tap a cause, then tap what it makes happen.",
        pairs: [
          { from: { icon: "ic-earth-axis", label: "tilt to sun" }, to: { icon: "ic-sun",      label: "a lot of sun" } },
          { from: { icon: "ic-sun",        label: "a lot of sun" }, to: { icon: "ic-icecream", label: "hot weather" } },
          { from: { icon: "ic-orbit",      label: "Earth orbits" }, to: { icon: "ic-swim",     label: "seasons" } }
        ]
      }
    ]
  });

  /* ---- Week 2: Why does it snow in the winter? (pp. 104-109) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "winter-snow", bigIdea: BI, bigIdeaTitle: TITLE, week: 2,
    question: "Why does it snow in the winter?", color: "#5EA3C4", cardIcon: "ic-snowman",
    vocab: [
      { word: "winter",      kid: "the coldest season",     icon: "ic-snowman" },
      { word: "temperature", kid: "how hot or cold it is",   icon: "ic-thermometer" },
      { word: "snow",        kid: "frozen drops of water",   icon: "ic-snow" },
      { word: "icicles",     kid: "thin pieces of ice",      icon: "ic-icicle" }
    ],
    reading: {
      title: "Why does it snow in the winter?",
      lines: [
        { text: "Winter is the coldest season.",            icon: "ic-snowman" },
        { text: "The days are shorter.",                    icon: "ic-snowman" },
        { text: "Earth tilts away from the sun.",           icon: "ic-earth-axis" },
        { text: "We get less sunlight.",                    icon: "ic-coat" },
        { text: "A thermometer tells the temperature.",     icon: "ic-thermometer" },
        { text: "Water freezes at 32 degrees.",             icon: "ic-snowflake" },
        { text: "Snow is tiny frozen drops of water.",      icon: "ic-snow" },
        { text: "Snowflakes and icicles are frozen, too.",  icon: "ic-icicle" },
        { text: "That is why it snows in the winter!",      icon: "ic-snowflake" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["winter", "thermometer", "snow"],
        sentences: [
          { icon: "ic-snowman",     before: "The coldest season is",  after: ".", answer: "winter" },
          { icon: "ic-thermometer", before: "We read temperature on a", after: ".", answer: "thermometer" },
          { icon: "ic-snow",        before: "Frozen drops of water make", after: ".", answer: "snow" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Winter is the coldest season.",        icons: ["ic-snowman"],             answer: true },
          { text: "Water freezes at 32 degrees.",         icons: ["ic-snowflake"],           answer: true },
          { text: "Snow is made of frozen water.",        icons: ["ic-snow"],                answer: true },
          { text: "Snow is made from icicles.",           icons: ["ic-icicle"],              answer: false },
          { text: "People swim outside in the winter.",   icons: ["ic-swim"],                answer: false }
        ]
      },
      {
        engine: "sort", title: "Winter or summer?",
        prompt: "Put each one where it belongs.",
        narration: "Is it winter, or summer? Tap one, then tap the season.",
        bins: [
          { id: "winter", label: "Winter", icon: "ic-snowman" },
          { id: "summer", label: "Summer", icon: "ic-sun" }
        ],
        items: [
          { icon: "ic-snow",     label: "snow",      bin: "winter" },
          { icon: "ic-icicle",   label: "icicle",    bin: "winter" },
          { icon: "ic-coat",     label: "warm coat", bin: "winter" },
          { icon: "ic-icecream", label: "ice cream", bin: "summer" },
          { icon: "ic-swim",     label: "swim",      bin: "summer" },
          { icon: "ic-sun",      label: "hot sun",   bin: "summer" }
        ]
      },
      {
        engine: "thermometer", title: "Freeze the water!",
        prompt: "Drag the temperature up or down.",
        narration: "Water freezes at 32 degrees. Drag the temperature below the snowflake to make ice. Drag it above to melt it.",
        freeze: 32,
        rounds: [
          { label: "Make it cold so the water freezes.", want: "below" },
          { label: "Make it warm so the ice melts.",     want: "above" },
          { label: "Freeze the water into snow.",        want: "below" }
        ]
      },
      {
        engine: "readword", title: "Name it!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-snow",        answer: "snow",        options: ["snow", "rain", "sun"] },
          { icon: "ic-icicle",      answer: "icicle",      options: ["icicle", "leaf", "flower"] },
          { icon: "ic-thermometer", answer: "thermometer", options: ["thermometer", "axis", "orbit"] },
          { icon: "ic-snowman",     answer: "winter",      options: ["winter", "summer", "spring"] }
        ]
      }
    ]
  });

  /* ---- Week 3: Why are there a lot of flowers in the spring? (pp. 110-115) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "spring-flowers", bigIdea: BI, bigIdeaTitle: TITLE, week: 3,
    question: "Why are there a lot of flowers in the spring?", color: "#7FB069", cardIcon: "ic-tulip",
    vocab: [
      { word: "spring",  kid: "the season after winter", icon: "ic-tulip" },
      { word: "bloom",   kid: "to grow and open",        icon: "ic-rose" },
      { word: "flowers", kid: "they make seeds",         icon: "ic-flower" },
      { word: "rain",    kid: "water drops from clouds", icon: "ic-rain" }
    ],
    reading: {
      title: "Why are there a lot of flowers in the spring?",
      lines: [
        { text: "Spring comes after winter.",            icon: "ic-tulip" },
        { text: "The weather gets warmer.",              icon: "ic-sun" },
        { text: "The days get longer.",                  icon: "ic-sun" },
        { text: "Warm air and cool air make rain.",      icon: "ic-cloud" },
        { text: "Some places get a lot of rain.",        icon: "ic-rain" },
        { text: "Plants need warmth, light, and water.", icon: "ic-water" },
        { text: "The rain helps the plants grow.",       icon: "ic-flower" },
        { text: "Flowers begin to bloom.",               icon: "ic-rose" },
        { text: "That is why there are flowers in spring!", icon: "ic-tulip" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["spring", "rain", "bloom"],
        sentences: [
          { icon: "ic-tulip", before: "The season after winter is", after: ".",          answer: "spring" },
          { icon: "ic-rain",  before: "Water drops from clouds are", after: ".",         answer: "rain" },
          { icon: "ic-rose",  before: "In spring, flowers begin to", after: ".",         answer: "bloom" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Spring comes after winter.",         icons: ["ic-tulip"],          answer: true },
          { text: "In spring, the weather gets warmer.", icons: ["ic-sun"],           answer: true },
          { text: "Rain helps the plants grow.",        icons: ["ic-rain", "ic-flower"], answer: true },
          { text: "The days are shorter in spring.",    icons: ["ic-sun"],            answer: false },
          { text: "All flowers smell bad.",             icons: ["ic-rose"],           answer: false }
        ]
      },
      {
        engine: "needs", title: "Help the flowers bloom!",
        prompt: "Tap everything flowers need to bloom.",
        narration: "Flowers need the right things to bloom. Tap the things they need. Leave the others.",
        hero: "ic-flower", wrongMsg: "A flower does not need a {x} to bloom.",
        choices: [
          { icon: "ic-sun",   label: "warmth", need: true },
          { icon: "ic-sun",   label: "light",  need: true },
          { icon: "ic-water", label: "water",  need: true },
          { icon: "ic-rain",  label: "rain",   need: true },
          { icon: "ic-snow",  label: "snow",   need: false },
          { icon: "ic-rock",  label: "rock",   need: false }
        ]
      },
      {
        engine: "sort", title: "Spring or winter?",
        prompt: "Put each one where it belongs.",
        narration: "Is it spring, or winter? Tap one, then tap the season.",
        bins: [
          { id: "spring", label: "Spring", icon: "ic-tulip" },
          { id: "winter", label: "Winter", icon: "ic-snowman" }
        ],
        items: [
          { icon: "ic-flower", label: "flower", bin: "spring" },
          { icon: "ic-rain",   label: "rain",   bin: "spring" },
          { icon: "ic-rose",   label: "bloom",  bin: "spring" },
          { icon: "ic-snow",   label: "snow",   bin: "winter" },
          { icon: "ic-icicle", label: "icicle", bin: "winter" },
          { icon: "ic-coat",   label: "coat",   bin: "winter" }
        ]
      },
      {
        engine: "sequence", title: "How flowers bloom",
        prompt: "Tap the pictures in order.",
        narration: "How do flowers bloom in spring? Tap the pictures in order.",
        steps: [
          { icon: "ic-snowman", label: "cold winter" },
          { icon: "ic-sun",     label: "warm sun" },
          { icon: "ic-rain",    label: "spring rain" },
          { icon: "ic-flower",  label: "flowers bloom" }
        ]
      }
    ]
  });

  /* ---- Week 4: Why do some trees lose their leaves in the fall? (pp. 116-121) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "fall-leaves", bigIdea: BI, bigIdeaTitle: TITLE, week: 4,
    question: "Why do some trees lose their leaves in the fall?", color: "#C96F2C", cardIcon: "ic-fall-leaves",
    vocab: [
      { word: "fall",   kid: "the season before winter", icon: "ic-fall-leaves" },
      { word: "wind",   kid: "air that is moving",        icon: "ic-wind" },
      { word: "breeze", kid: "a small wind",              icon: "ic-breeze" },
      { word: "gust",   kid: "a big, strong wind",        icon: "ic-gust" }
    ],
    reading: {
      title: "Why do some trees lose their leaves in the fall?",
      lines: [
        { text: "Fall comes after summer.",                  icon: "ic-fall-leaves" },
        { text: "Another name for fall is autumn.",          icon: "ic-fall-leaves" },
        { text: "The weather gets colder.",                  icon: "ic-coat" },
        { text: "The days get shorter.",                     icon: "ic-fall-leaves" },
        { text: "There is less sunlight for leaves.",        icon: "ic-bare-tree" },
        { text: "Leaves turn red, yellow, and brown.",       icon: "ic-fall-leaves" },
        { text: "Cool, dry air makes wind.",                 icon: "ic-wind" },
        { text: "The wind blows the leaves off the trees.",  icon: "ic-bare-tree" },
        { text: "That is why trees lose their leaves in fall!", icon: "ic-bare-tree" }
      ]
    },
    games: [
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["breeze", "gust", "fall"],
        sentences: [
          { icon: "ic-breeze",      before: "A little",     after: " is nice and soft.",  answer: "breeze" },
          { icon: "ic-gust",        before: "A strong",     after: " blows your hat off!", answer: "gust" },
          { icon: "ic-fall-leaves", before: "Leaves turn color in the", after: ".",       answer: "fall" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Fall comes after summer.",            icons: ["ic-fall-leaves"],      answer: true },
          { text: "In fall, the days get shorter.",      icons: ["ic-fall-leaves"],      answer: true },
          { text: "Wind blows the leaves off trees.",    icons: ["ic-wind", "ic-bare-tree"], answer: true },
          { text: "A gust is a small, soft wind.",       icons: ["ic-gust"],             answer: false },
          { text: "Animals eat all the leaves in fall.", icons: ["ic-bare-tree"],        answer: false }
        ]
      },
      {
        engine: "sort", title: "Fall or spring?",
        prompt: "Put each one where it belongs.",
        narration: "Is it fall, or spring? Tap one, then tap the season.",
        bins: [
          { id: "fall",   label: "Fall",   icon: "ic-fall-leaves" },
          { id: "spring", label: "Spring", icon: "ic-tulip" }
        ],
        items: [
          { icon: "ic-fall-leaves", label: "falling leaves", bin: "fall" },
          { icon: "ic-bare-tree",   label: "bare tree",      bin: "fall" },
          { icon: "ic-wind",        label: "wind",           bin: "fall" },
          { icon: "ic-flower",      label: "flowers",        bin: "spring" },
          { icon: "ic-rain",        label: "spring rain",    bin: "spring" },
          { icon: "ic-rose",        label: "blooms",         bin: "spring" }
        ]
      },
      {
        engine: "needs", title: "Why do leaves fall?",
        prompt: "Tap the reasons trees lose their leaves.",
        narration: "Why do trees lose their leaves in the fall? Tap the reasons. Leave the others.",
        hero: "ic-bare-tree", wrongMsg: "That is not why trees lose their leaves.",
        choices: [
          { icon: "ic-coat",        label: "weather gets cooler", need: true },
          { icon: "ic-bare-tree",   label: "less sunlight",       need: true },
          { icon: "ic-wind",        label: "wind blows them off", need: true },
          { icon: "ic-bird",        label: "animals eat them",    need: false },
          { icon: "ic-kid",         label: "people take them",    need: false }
        ]
      },
      {
        engine: "match", title: "Cause and effect",
        prompt: "Match each cause to what it makes happen.",
        narration: "Tap a cause, then tap what it makes happen.",
        pairs: [
          { from: { icon: "ic-bare-tree", label: "less sunlight" }, to: { icon: "ic-fall-leaves", label: "leaves drop" } },
          { from: { icon: "ic-wind",      label: "cool air mixes" }, to: { icon: "ic-wind",        label: "wind" } },
          { from: { icon: "ic-earth-axis", label: "Earth tilts away" }, to: { icon: "ic-coat",     label: "cooler days" } }
        ]
      }
    ]
  });

  /* ---- Week 5: Unit Review (pp. 122-124) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi4-review", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "review",
    question: "Big Idea 4 Review", color: "#D98A3D", cardIcon: "ic-star",
    reading: {
      title: "What did we learn?",
      lines: [
        { text: "Each year has four seasons.",          icon: "ic-sun" },
        { text: "Summer is hot. Winter is cold.",       icon: "ic-icecream" },
        { text: "Spring brings rain and flowers.",      icon: "ic-tulip" },
        { text: "Fall is windy. Leaves drop.",          icon: "ic-fall-leaves" },
        { text: "Now show what you know!",              icon: "ic-star" }
      ]
    },
    games: [
      {
        engine: "readword", title: "Find the word!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-icecream",    answer: "summer",      options: ["summer", "winter", "fall"] },
          { icon: "ic-snowman",     answer: "winter",      options: ["winter", "spring", "summer"] },
          { icon: "ic-tulip",       answer: "spring",      options: ["spring", "fall", "winter"] },
          { icon: "ic-fall-leaves", answer: "fall",        options: ["fall", "spring", "summer"] }
        ]
      },
      {
        engine: "match", title: "Match the season",
        prompt: "Match each season to its weather.",
        narration: "Tap a season, then tap its weather.",
        pairs: [
          { from: { icon: "ic-icecream",    label: "summer" }, to: { icon: "ic-sun",     label: "hot"     } },
          { from: { icon: "ic-snowman",     label: "winter" }, to: { icon: "ic-snow",    label: "snow"    } },
          { from: { icon: "ic-tulip",       label: "spring" }, to: { icon: "ic-rain",    label: "rain"    } },
          { from: { icon: "ic-fall-leaves", label: "fall"   }, to: { icon: "ic-wind",    label: "wind"    } }
        ]
      },
      {
        engine: "sort", title: "Hot or cold?",
        prompt: "Put each one where it belongs.",
        narration: "Is it hot, or cold? Tap one, then tap the right basket.",
        bins: [
          { id: "hot",  label: "Hot",  icon: "ic-sun" },
          { id: "cold", label: "Cold", icon: "ic-snowflake" }
        ],
        items: [
          { icon: "ic-icecream", label: "ice cream", bin: "hot" },
          { icon: "ic-swim",     label: "swim",      bin: "hot" },
          { icon: "ic-sun",      label: "summer sun", bin: "hot" },
          { icon: "ic-snow",     label: "snow",      bin: "cold" },
          { icon: "ic-icicle",   label: "icicle",    bin: "cold" },
          { icon: "ic-coat",     label: "warm coat", bin: "cold" }
        ]
      },
      {
        engine: "sequence", title: "Order the seasons",
        prompt: "Tap the seasons in order.",
        narration: "The seasons go in order. Start with winter. Tap them in order.",
        steps: [
          { icon: "ic-snowman",     label: "winter" },
          { icon: "ic-tulip",       label: "spring" },
          { icon: "ic-icecream",    label: "summer" },
          { icon: "ic-fall-leaves", label: "fall"   }
        ]
      }
    ]
  });

  /* ---- Week 5: Hands-on Activity "Measure the Wind!" (p. 125) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi4-handson", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "handson",
    question: "Measure the Wind!", color: "#E08A4A", cardIcon: "ic-pinwheel",
    games: [
      {
        engine: "handson", title: "Measure the Wind!", icon: "ic-pinwheel",
        narration: "You cannot see the wind. But you can see it move things! Let's make a wind gauge. Here is what to do.",
        materials: [
          { icon: "ic-cup",    label: "2 paper cups" },
          { icon: "ic-straw",  label: "a straw" },
          { icon: "ic-pin",    label: "a pin and pencil" }
        ],
        steps: [
          "Tape one cup to each end of the straw.",
          "Make the two cups face different ways.",
          "Ask an adult to poke a pin through the straw into the pencil eraser.",
          "Make sure the straw can spin.",
          "Hold it outside. Watch the wind spin it fast, slow, or not at all!"
        ]
      }
    ]
  });
})();
