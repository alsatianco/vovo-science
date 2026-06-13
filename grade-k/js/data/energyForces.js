/* data/energyForces.js — "Big Push, Little Push" (Physical Science · Energy & Forces)
   NGSS: a bigger push or pull makes things speed up or slow down more
   quickly. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.energyForces = {
    title: "Big Push, Little Push",
    color: "physical",
    mascot: "#m-spark",
    vocab: ["big", "little", "strong", "gentle", "fast", "slow"],
    activities: [
      {
        engine: "build",
        reading: {
          text: "A push or a pull is a force. Forces can make things start moving, move faster, or stop. A bigger force makes things move farther and faster.",
          icons: ["#c-push", "#c-strong"]
        },
        prompt: "Pick the right push!",
        narration: "A big push sends things far and fast. A little push moves them just a bit. Match each push to what it does.",
        goalText: "You matched the pushes! Big push, big move!",
        zones: [
          { id: "far",  label: "Go far & fast",  icon: "#c-car",    accepts: ["strong"] },
          { id: "near", label: "Move just a bit", icon: "#c-turtle", accepts: ["gentle"] }
        ],
        parts: [
          { id: "strong", label: "Big push",    icon: "#c-strong" },
          { id: "gentle", label: "Little push", icon: "#c-gentle" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "A big, strong push makes things go fast and far. A small, gentle push moves things just a little bit. Heavy things need a bigger push to get moving.",
          icons: ["#c-strong", "#c-gentle"]
        },
        prompt: "Big or little?",
        narration: "Let's think about big pushes and little pushes!",
        rounds: [
          { ask: "Which push makes the ball go faster?", narration: "Which push makes the ball go faster?", hint: "A big, strong push makes it go faster!",
            options: [ { icon: "#c-strong", label: "Big push", correct: true }, { icon: "#c-gentle", label: "Little push" } ] },
          { ask: "To move a heavy car, you need a…?", narration: "To move a heavy car, do you need a big push or a little push?", hint: "A heavy car needs a big push!",
            options: [ { icon: "#c-strong", label: "Big push", correct: true }, { icon: "#c-gentle", label: "Little push" } ] },
          { ask: "A little push makes things go…?", narration: "A little, gentle push makes things go how?", hint: "A little push moves things slowly!",
            options: [ { icon: "#c-turtle", label: "Slow", correct: true }, { icon: "#c-car", label: "Super fast" } ] }
        ],
        pool: [
          { ask: "A kick sends a ball…?", narration: "When you kick a ball, what does the ball do?", hint: "The kick is a push — it makes the ball move!",
            options: [ { icon: "#c-car", label: "Moving", correct: true }, { label: "Sleeping" } ] },
          { ask: "What makes a toy car stop?", narration: "What can make a moving toy car stop?", hint: "A wall or another force can stop it!",
            options: [ { label: "A wall", correct: true }, { label: "Nothing" } ] },
          { ask: "Which makes the ball go farther?", narration: "Which makes a ball go farther — a big push or a little push?", hint: "A big push sends it much farther!",
            options: [ { icon: "#c-strong", label: "Big push", correct: true }, { icon: "#c-gentle", label: "Little push" } ] },
          { ask: "A feather needs a…?", narration: "A feather is very light. Does it need a big push or a little push to move?", hint: "A feather is so light — it only needs a little push!",
            options: [ { icon: "#c-gentle", label: "Little push", correct: true }, { icon: "#c-strong", label: "Big push" } ] }
        ]
      },
      {
        engine: "sort",
        reading: {
          text: "We use pushes and pulls every day. We push a swing to make it go up. We pull a wagon to bring it along. A feather needs only a tiny, gentle push!",
          icons: ["#c-feather", "#c-cart"]
        },
        prompt: "Big push or little push?",
        narration: "Heavy things need a big push. Light things need only a little push. Sort them!",
        bins: [
          { id: "big",    label: "Big push",    icon: "#c-strong" },
          { id: "little", label: "Little push", icon: "#c-gentle" }
        ],
        items: [
          { icon: "#c-car",     label: "Heavy car",  bin: "big" },
          { icon: "#c-rock",    label: "Big rock",   bin: "big" },
          { icon: "#c-leaf",    label: "Light leaf", bin: "little" },
          { icon: "#c-feather", label: "Feather",    bin: "little" }
        ]
      }
    ]
  };
})();
