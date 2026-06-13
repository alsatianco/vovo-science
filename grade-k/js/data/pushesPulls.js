/* data/pushesPulls.js — "Push It!" (Physical Science · Pushes & Pulls)
   NGSS: pushes/pulls have different strengths & directions; they can
   start, stop, or change the motion of an object. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.pushesPulls = {
    title: "Push It!",
    color: "physical",
    mascot: "#m-spark",
    vocab: ["push", "pull", "move", "start", "stop"],
    activities: [
      {
        engine: "build",
        reading: {
          text: "Motion is when something moves. To push means to press an object away from you. To pull means to drag or tug something closer to you.",
          icons: ["#c-push", "#c-pull"]
        },
        prompt: "Make the toys move!",
        narration: "A push moves things away. A pull brings things closer. Pick a push or a pull, then tap the toy.",
        goalText: "The toys are moving! Great pushing and pulling!",
        zones: [
          { id: "box",   label: "Push the box",   icon: "#u-push",  accepts: ["push"] },
          { id: "wagon", label: "Pull the wagon", icon: "#c-cart",  accepts: ["pull"] }
        ],
        parts: [
          { id: "push", label: "Push", icon: "#c-push" },
          { id: "pull", label: "Pull", icon: "#c-pull" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "A push moves things away from you. A pull brings things toward you. We can push a ball to kick it, and pull a wagon to carry things.",
          icons: ["#c-ball", "#c-cart"]
        },
        prompt: "Push or pull?",
        narration: "Let's think about pushes and pulls!",
        rounds: [
          { ask: "To move a box away from you, do you push or pull?", narration: "To move a box away from you, do you push or pull?", hint: "You push it away!",
            options: [ { icon: "#c-push", label: "Push", correct: true }, { icon: "#c-pull", label: "Pull" } ] },
          { ask: "To bring a wagon close to you, do you push or pull?", narration: "To bring a wagon close to you, do you push or pull?", hint: "You pull it closer!",
            options: [ { icon: "#c-pull", label: "Pull", correct: true }, { icon: "#c-push", label: "Push" } ] },
          { ask: "A push or a pull can make a ball…?", narration: "What can a push or a pull do to a ball?", hint: "It makes the ball move!",
            options: [ { icon: "#c-ball", label: "Move", correct: true }, { label: "Sing" } ] }
        ],
        pool: [
          { ask: "Opening a door is a…?", narration: "When you open a door, are you pushing or pulling?", hint: "You push the door to open it away from you!",
            options: [ { icon: "#c-push", label: "Push", correct: true }, { icon: "#c-pull", label: "Pull" } ] },
          { ask: "Which one moves things closer to you?", narration: "Which one brings things closer to you — a push or a pull?", hint: "A pull brings things toward you!",
            options: [ { icon: "#c-pull", label: "Pull", correct: true }, { icon: "#c-push", label: "Push" } ] },
          { ask: "Which one moves things farther away?", narration: "Which one moves things farther away from you — a push or a pull?", hint: "A push moves things away from you!",
            options: [ { icon: "#c-push", label: "Push", correct: true }, { icon: "#c-pull", label: "Pull" } ] }
        ]
      },
      {
        engine: "sort",
        reading: {
          text: "Pushes and pulls can be strong or gentle. A strong push makes something move far away. A gentle push moves it just a little bit.",
          icons: ["#c-strong", "#c-gentle"]
        },
        prompt: "Push or pull?",
        narration: "Sort each one. Do you push it or pull it?",
        bins: [
          { id: "push", label: "Push", icon: "#c-push" },
          { id: "pull", label: "Pull", icon: "#c-pull" }
        ],
        items: [
          { icon: "#c-ball",  label: "Kick a ball", bin: "push" },
          { icon: "#c-swing", label: "Swing",       bin: "push" },
          { icon: "#c-cart",  label: "Wagon",       bin: "pull" },
          { icon: "#c-rope",  label: "Tug rope",    bin: "pull" }
        ]
      }
    ]
  };
})();
