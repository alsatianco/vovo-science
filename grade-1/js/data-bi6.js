/* ============================================================
   data-bi6.js — Big Idea 6: "An object's motion can be changed
   by using force. Pushing and pulling are types of forces."
   Distilled from Daily Science Grade 1 (Evan-Moor EMC 5011), pp. 156-185.
   Six units: Weeks 1-4, a Review, and a Hands-on activity.
   ============================================================ */
(function () {
  var BI = 6, TITLE = "An object's motion can be changed by using force.";

  /* ---- Week 1: Why do shopping carts have wheels? (pp. 158-163) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "cart-wheels", bigIdea: BI, bigIdeaTitle: TITLE, week: 1,
    question: "Why do shopping carts have wheels?", color: "#8E5BA6", cardIcon: "ic-cart",
    vocab: [
      { word: "motion", kid: "moving place to place", icon: "ic-car" },
      { word: "force",  kid: "a push or a pull",       icon: "ic-energy" },
      { word: "wheel",  kid: "round, it rolls",        icon: "ic-wheel" }
    ],
    reading: {
      title: "Why do shopping carts have wheels?",
      lines: [
        { text: "When a thing moves, it is in motion.", icon: "ic-car" },
        { text: "It takes force to move a thing.",       icon: "ic-energy" },
        { text: "A force is a push or a pull.",          icon: "ic-push" },
        { text: "A push moves a thing away.",            icon: "ic-cart" },
        { text: "A pull brings a thing closer.",         icon: "ic-pull" },
        { text: "Big, heavy things need more force.",    icon: "ic-cart" },
        { text: "A wheel is round. It rolls.",           icon: "ic-wheel" },
        { text: "Wheels make pushing easy.",             icon: "ic-bike" },
        { text: "So a cart has wheels to roll!",         icon: "ic-cart" }
      ]
    },
    games: [
      {
        engine: "match", title: "Push or pull?",
        prompt: "Match each picture to push or pull.",
        narration: "Tap a picture, then tap push or pull.",
        pairs: [
          { from: { icon: "ic-cart", label: "cart" }, to: { icon: "ic-push", label: "push" } },
          { from: { icon: "ic-wagon", label: "wagon" }, to: { icon: "ic-pull", label: "pull" } },
          { from: { icon: "ic-rope", label: "rope" }, to: { icon: "ic-pull", label: "pull" } }
        ]
      },
      {
        engine: "needs", title: "What is true about force?",
        prompt: "Tap every true thing about force.",
        narration: "A force is a push or a pull. Tap the true things. Leave the others.",
        hero: "ic-energy", wrongMsg: "That is not true. A {x} is not a force.",
        choices: [
          { icon: "ic-push",  label: "a push",  need: true },
          { icon: "ic-pull",  label: "a pull",  need: true },
          { icon: "ic-cart",  label: "moves things", need: true },
          { icon: "ic-sun",   label: "the sun", need: false },
          { icon: "ic-rock",  label: "a rock",  need: false }
        ]
      },
      {
        engine: "sort", title: "Has wheels or not?",
        prompt: "Put each one where it belongs.",
        narration: "Some things have wheels. Some do not. Tap one, then tap the right basket.",
        bins: [
          { id: "wheels", label: "Has wheels", icon: "ic-wheel" },
          { id: "none",   label: "No wheels",  icon: "ic-rock" }
        ],
        items: [
          { icon: "ic-cart",       label: "cart",  bin: "wheels" },
          { icon: "ic-bike",       label: "bike",  bin: "wheels" },
          { icon: "ic-skateboard", label: "board", bin: "wheels" },
          { icon: "ic-rock",       label: "rock",  bin: "none" },
          { icon: "ic-ball",       label: "ball",  bin: "none" },
          { icon: "ic-tree",       label: "tree",  bin: "none" }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A push and a pull are forces.",       icons: ["ic-push", "ic-pull"], answer: true },
          { text: "A push moves a thing away.",          icons: ["ic-cart"],            answer: true },
          { text: "Wheels make pushing easier.",         icons: ["ic-wheel"],           answer: true },
          { text: "A full cart is easy to push.",        icons: ["ic-cart"],            answer: false },
          { text: "You need no force to move a rock.",   icons: ["ic-rock"],            answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["wheel", "push", "pull"],
        sentences: [
          { icon: "ic-wheel", before: "A round thing that rolls is a", after: ".", answer: "wheel" },
          { icon: "ic-push",  before: "To move a thing away, you",    after: " it.", answer: "push" },
          { icon: "ic-pull",  before: "To bring a thing closer, you", after: " it.", answer: "pull" }
        ]
      }
    ]
  });

  /* ---- Week 2: Why does a ball go far when I kick it hard? (pp. 164-169) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "kick-far", bigIdea: BI, bigIdeaTitle: TITLE, week: 2,
    question: "Why does a ball go far when I kick it hard?", color: "#A05BB0", cardIcon: "ic-ball",
    vocab: [
      { word: "distance", kid: "how far it goes", icon: "ic-ball" },
      { word: "speed",    kid: "how fast it is",  icon: "ic-airplane" },
      { word: "kick",     kid: "a big force",     icon: "ic-kick" }
    ],
    reading: {
      title: "Why does a ball go far when I kick it hard?",
      lines: [
        { text: "Force makes a ball move.",            icon: "ic-kick" },
        { text: "Distance is how far it goes.",        icon: "ic-ball" },
        { text: "A big kick is a big force.",          icon: "ic-kick" },
        { text: "A big force sends the ball far.",     icon: "ic-ball" },
        { text: "A little tap is a little force.",     icon: "ic-tap" },
        { text: "A little force goes a short way.",    icon: "ic-tap" },
        { text: "Speed is how fast a thing moves.",    icon: "ic-airplane" },
        { text: "An airplane is fast. A snail is slow.", icon: "ic-snail" },
        { text: "So a hard kick makes a ball go far!", icon: "ic-ball" }
      ]
    },
    games: [
      {
        engine: "compare", title: "Which goes farther?",
        prompt: "Tap Go! Then tap the one that went farther.",
        narration: "A bigger force sends a ball farther. Tap Go, then tap the one that went farther.",
        scenarios: [
          { a: { icon: "ic-kick", label: "hard kick", force: 3 }, b: { icon: "ic-tap", label: "soft tap", force: 1 }, farther: "a" },
          { a: { icon: "ic-tap",  label: "soft tap",  force: 1 }, b: { icon: "ic-kick", label: "hard kick", force: 3 }, farther: "b" },
          { a: { icon: "ic-kick", label: "big push",  force: 3 }, b: { icon: "ic-push", label: "little push", force: 1 }, farther: "a" }
        ]
      },
      {
        engine: "sort", title: "Big force or little force?",
        prompt: "Put each one where it belongs.",
        narration: "A big force is strong. A little force is soft. Tap one, then tap the right basket.",
        bins: [
          { id: "big",    label: "Big force",    icon: "ic-kick" },
          { id: "little", label: "Little force", icon: "ic-tap" }
        ],
        items: [
          { icon: "ic-kick", label: "hard kick", bin: "big" },
          { icon: "ic-push", label: "big push",  bin: "big" },
          { icon: "ic-cart", label: "heavy pull", bin: "big" },
          { icon: "ic-tap",  label: "soft tap",  bin: "little" },
          { icon: "ic-snail", label: "tiny push", bin: "little" }
        ]
      },
      {
        engine: "match", title: "Fast or slow?",
        prompt: "Match each thing to fast or slow.",
        narration: "Some things are fast. Some are slow. Tap a thing, then tap fast or slow.",
        pairs: [
          { from: { icon: "ic-airplane", label: "airplane" }, to: { icon: "ic-energy", label: "fast" } },
          { from: { icon: "ic-snail",    label: "snail" },    to: { icon: "ic-leaf",   label: "slow" } },
          { from: { icon: "ic-bike",     label: "bike" },     to: { icon: "ic-energy", label: "fast" } }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "A big force sends a ball far.",       icons: ["ic-kick", "ic-ball"],  answer: true },
          { text: "A little tap is a little force.",     icons: ["ic-tap"],              answer: true },
          { text: "An airplane goes fast.",              icons: ["ic-airplane"],         answer: true },
          { text: "A little force sends a ball far.",    icons: ["ic-tap", "ic-ball"],   answer: false },
          { text: "A snail goes very fast.",             icons: ["ic-snail"],            answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["distance", "speed", "force"],
        sentences: [
          { icon: "ic-ball",     before: "How far a ball goes is the", after: ".", answer: "distance" },
          { icon: "ic-airplane", before: "How fast a thing moves is its", after: ".", answer: "speed" },
          { icon: "ic-kick",     before: "A kick is a big",            after: ".", answer: "force" }
        ]
      }
    ]
  });

  /* ---- Week 3: Why do cars have steering wheels? (pp. 170-175) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "steering-path", bigIdea: BI, bigIdeaTitle: TITLE, week: 3,
    question: "Why do cars have steering wheels?", color: "#7A4FA0", cardIcon: "ic-steering-wheel",
    vocab: [
      { word: "forward",  kid: "toward the front", icon: "ic-arrow" },
      { word: "backward", kid: "toward the back",  icon: "ic-arrow" },
      { word: "path",     kid: "the way it goes",  icon: "ic-path-curved" }
    ],
    reading: {
      title: "Why do cars have steering wheels?",
      lines: [
        { text: "When a thing moves, it follows a path.", icon: "ic-path-straight" },
        { text: "You can push a car forward.",            icon: "ic-arrow" },
        { text: "You can pull a car backward.",           icon: "ic-arrow" },
        { text: "Some paths are straight.",               icon: "ic-path-straight" },
        { text: "Some paths are curved.",                 icon: "ic-path-curved" },
        { text: "Some paths go in a circle.",             icon: "ic-path-circular" },
        { text: "Force can change a path.",               icon: "ic-energy" },
        { text: "A steering wheel turns the wheels.",     icon: "ic-steering-wheel" },
        { text: "So a steering wheel changes the path!",  icon: "ic-car" }
      ]
    },
    games: [
      {
        engine: "sort", title: "What kind of path?",
        prompt: "Put each one with its path.",
        narration: "A path can be straight, curved, or a circle. Tap one, then tap the right basket.",
        bins: [
          { id: "straight", label: "Straight", icon: "ic-path-straight" },
          { id: "curved",   label: "Curved",   icon: "ic-path-curved" },
          { id: "circle",   label: "Circle",   icon: "ic-path-circular" }
        ],
        items: [
          { icon: "ic-car",   label: "road",        bin: "straight" },
          { icon: "ic-arrow", label: "straight",    bin: "straight" },
          { icon: "ic-airplane", label: "curved flight", bin: "curved" },
          { icon: "ic-path-curved", label: "curve", bin: "curved" },
          { icon: "ic-path-circular", label: "track", bin: "circle" },
          { icon: "ic-steering-wheel", label: "round", bin: "circle" }
        ]
      },
      {
        engine: "match", title: "Which way?",
        prompt: "Match the word to its way.",
        narration: "Tap a word, then tap the picture that matches.",
        pairs: [
          { from: { icon: "ic-arrow", label: "forward" },  to: { icon: "ic-car",  label: "go ahead" } },
          { from: { icon: "ic-arrow", label: "backward" }, to: { icon: "ic-pull", label: "go back" } },
          { from: { icon: "ic-steering-wheel", label: "turn" }, to: { icon: "ic-path-curved", label: "curve" } }
        ]
      },
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "All things move in a path.",            icons: ["ic-path-straight"],  answer: true },
          { text: "Force can change a path.",              icons: ["ic-energy"],         answer: true },
          { text: "A steering wheel turns the wheels.",    icons: ["ic-steering-wheel"], answer: true },
          { text: "A path can only be straight.",          icons: ["ic-path-curved"],    answer: false },
          { text: "Talking changes a car's path.",         icons: ["ic-car"],            answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["path", "force", "forward"],
        sentences: [
          { icon: "ic-path-curved", before: "The way a thing goes is its", after: ".", answer: "path" },
          { icon: "ic-energy",      before: "A path can be changed by",    after: ".", answer: "force" },
          { icon: "ic-arrow",       before: "To the front is",             after: ".", answer: "forward" }
        ]
      },
      {
        engine: "pathdraw", title: "Steer the car!",
        prompt: "Drive the car around the rock to the star.",
        narration: "Use the arrows to steer the car. Go around the rock to the star.",
        rounds: [
          {
            cols: 4, rows: 4, start: [0, 3], goal: [3, 0],
            obstacles: [[1, 1], [2, 2]],
            carIcon: "ic-car", goalIcon: "ic-star", obstacleIcon: "ic-rock"
          },
          {
            cols: 4, rows: 4, start: [0, 0], goal: [3, 3],
            obstacles: [[1, 2], [2, 1]],
            carIcon: "ic-car", goalIcon: "ic-star", obstacleIcon: "ic-rock"
          }
        ]
      }
    ]
  });

  /* ---- Week 4: Why do things fall down when you drop them? (pp. 176-181) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "gravity-down", bigIdea: BI, bigIdeaTitle: TITLE, week: 4,
    question: "Why do things fall down when you drop them?", color: "#9B59B6", cardIcon: "ic-gravity",
    vocab: [
      { word: "gravity", kid: "pulls things down", icon: "ic-gravity" },
      { word: "fall",    kid: "to drop down",      icon: "ic-ball" },
      { word: "force",   kid: "can hold things up", icon: "ic-energy" }
    ],
    reading: {
      title: "Why do things fall down when you drop them?",
      lines: [
        { text: "Throw a ball up. It comes down.",      icon: "ic-ball" },
        { text: "A force pulls it to the ground.",      icon: "ic-gravity" },
        { text: "That force is called gravity.",        icon: "ic-gravity" },
        { text: "Gravity pulls everything down.",       icon: "ic-gravity" },
        { text: "It pulls all things the same way.",    icon: "ic-ball" },
        { text: "A ball and a book fall the same.",     icon: "ic-bread" },
        { text: "Your force can hold things up.",       icon: "ic-energy" },
        { text: "A slide changes your path down.",      icon: "ic-slide" },
        { text: "So gravity makes things fall down!",   icon: "ic-gravity" }
      ]
    },
    games: [
      {
        engine: "truefalse", title: "Yes or no?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Gravity pulls things down.",          icons: ["ic-gravity"],        answer: true },
          { text: "A ball and a book fall the same.",    icons: ["ic-ball", "ic-bread"], answer: true },
          { text: "Force can hold a thing up.",          icons: ["ic-energy"],         answer: true },
          { text: "Gravity pulls things up.",            icons: ["ic-gravity"],        answer: false },
          { text: "A book and a ball land at different times.", icons: ["ic-bread"],   answer: false }
        ]
      },
      {
        engine: "cloze", title: "Finish the sentence!",
        prompt: "Tap a word to hear it. Drag it to the blank.",
        narration: "Tap a word to hear it. Then drag the right word into the blank.",
        bank: ["gravity", "down", "force"],
        sentences: [
          { icon: "ic-gravity", before: "The force that pulls things down is", after: ".", answer: "gravity" },
          { icon: "ic-ball",    before: "If you drop a ball, it falls",        after: ".", answer: "down" },
          { icon: "ic-energy",  before: "You can use your",                    after: " to hold it up.", answer: "force" }
        ]
      },
      {
        engine: "match", title: "What holds it up?",
        prompt: "Match the thing to what holds it up.",
        narration: "Some things hold other things up. Tap a thing, then tap what holds it.",
        pairs: [
          { from: { icon: "ic-ball",  label: "ball" },  to: { icon: "ic-kid",    label: "your hands" } },
          { from: { icon: "ic-bread", label: "book" },  to: { icon: "ic-energy", label: "your force" } },
          { from: { icon: "ic-kid",   label: "you" },   to: { icon: "ic-swing",  label: "a swing" } }
        ]
      },
      {
        engine: "needs", title: "What is true about gravity?",
        prompt: "Tap every true thing about gravity.",
        narration: "Gravity pulls everything down. Tap the true things. Leave the others.",
        hero: "ic-gravity", wrongMsg: "That is not true about gravity.",
        choices: [
          { icon: "ic-gravity", label: "pulls down",  need: true },
          { icon: "ic-ball",    label: "pulls all things", need: true },
          { icon: "ic-energy",  label: "is a force",  need: true },
          { icon: "ic-sun",     label: "pulls up",    need: false },
          { icon: "ic-airplane", label: "stops force", need: false }
        ]
      },
      {
        engine: "gravitypath", title: "Where will it land?",
        prompt: "Watch the path. Tap where it lands.",
        narration: "Gravity pulls the ball down its path. Tap the spot where it will land.",
        rounds: [
          { path: "drop",  icon: "ic-ball", targets: 3, answer: 1 },
          { path: "slide", icon: "ic-ball", targets: 3, answer: 2 },
          { path: "swing", icon: "ic-ball", targets: 3, answer: 0 }
        ]
      }
    ]
  });

  /* ---- Week 5: Unit Review — Force and Motion (pp. 182-184) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi6-review", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "review",
    question: "Big Idea 6 Review", color: "#8E5BA6", cardIcon: "ic-star",
    reading: {
      title: "What did we learn?",
      lines: [
        { text: "A force is a push or a pull.",        icon: "ic-energy" },
        { text: "A big force moves a thing far.",      icon: "ic-kick" },
        { text: "Force can change a path.",            icon: "ic-path-curved" },
        { text: "Gravity pulls everything down.",      icon: "ic-gravity" },
        { text: "Now show what you know!",             icon: "ic-star" }
      ]
    },
    games: [
      {
        engine: "readword", title: "Find the word!",
        prompt: "Tap the word that names the picture.",
        narration: "Look at the picture. Tap the word that names it.",
        rounds: [
          { icon: "ic-gravity", answer: "gravity", options: ["gravity", "speed", "distance"] },
          { icon: "ic-wheel",   answer: "wheel",   options: ["wheel", "push", "pull"] },
          { icon: "ic-airplane", answer: "speed",  options: ["speed", "force", "path"] },
          { icon: "ic-energy",  answer: "force",   options: ["force", "wheel", "ball"] }
        ]
      },
      {
        engine: "match", title: "Match the word!",
        prompt: "Match each word to what it means.",
        narration: "Tap a word, then tap the picture that matches it.",
        pairs: [
          { from: { icon: "ic-push",    label: "push" },    to: { icon: "ic-cart",    label: "move away" } },
          { from: { icon: "ic-pull",    label: "pull" },    to: { icon: "ic-wagon",   label: "bring close" } },
          { from: { icon: "ic-gravity", label: "gravity" }, to: { icon: "ic-ball",    label: "pulls down" } }
        ]
      },
      {
        engine: "sort", title: "Push or pull?",
        prompt: "Put each one where it belongs.",
        narration: "Is it a push or a pull? Tap one, then tap the right basket.",
        bins: [
          { id: "push", label: "Push", icon: "ic-push" },
          { id: "pull", label: "Pull", icon: "ic-pull" }
        ],
        items: [
          { icon: "ic-cart",  label: "cart",  bin: "push" },
          { icon: "ic-kick",  label: "kick",  bin: "push" },
          { icon: "ic-skateboard", label: "board", bin: "push" },
          { icon: "ic-wagon", label: "wagon", bin: "pull" },
          { icon: "ic-rope",  label: "rope",  bin: "pull" }
        ]
      },
      {
        engine: "truefalse", title: "What do you know?",
        prompt: "Listen. Is it true?",
        narration: "Listen to the sentence. Is it true? Tap yes or no.",
        rounds: [
          { text: "Gravity makes a ball come down.",     icons: ["ic-gravity", "ic-ball"], answer: true },
          { text: "A hard kick sends a ball far.",       icons: ["ic-kick", "ic-ball"],    answer: true },
          { text: "Wheels make pushing easier.",         icons: ["ic-wheel"],              answer: true },
          { text: "Pushes and pulls are forces.",        icons: ["ic-push", "ic-pull"],    answer: true },
          { text: "A snail goes faster than a rocket.",  icons: ["ic-snail"],              answer: false }
        ]
      }
    ]
  });

  /* ---- Week 5: Hands-on Activity "Forces on the Playground" (p. 185) ---- */
  (window.UNITS = window.UNITS || []).push({
    id: "bi6-handson", bigIdea: BI, bigIdeaTitle: TITLE, week: 5, kind: "handson",
    question: "Forces on the Playground", color: "#A05BB0", cardIcon: "ic-playground",
    games: [
      {
        engine: "handson", title: "Forces on the Playground", icon: "ic-playground",
        narration: "Let's find pushes and pulls on the playground! Here is what to do.",
        materials: [
          { icon: "ic-swing", label: "a swing" },
          { icon: "ic-slide", label: "a slide" },
          { icon: "ic-ball",  label: "a ball" }
        ],
        steps: [
          "Go outside to a playground.",
          "Push and pull as you play.",
          "Push a swing. Pull yourself up the slide.",
          "Kick a ball and watch it go.",
          "Notice each push and each pull you make!"
        ]
      }
    ]
  });
})();
