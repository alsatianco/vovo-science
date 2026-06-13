/* data/interactions.js — "Crash & Roll" (Physical Science · Interactions)
   NGSS: when objects touch or collide, they push on one another and
   can change each other's motion. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.interactions = {
    title: "Crash & Roll",
    color: "physical",
    mascot: "#m-spark",
    vocab: ["touch", "collide", "crash", "bump", "change"],
    activities: [
      {
        engine: "build",
        reading: {
          text: "Speed is how fast an object moves. We can push something hard to make it go fast, or push it gently to go slow.",
          icons: ["#c-ball", "#c-push"]
        },
        prompt: "Set up the bowling!",
        narration: "Let's set up a bowling game. Put the ball at the start, and the pins at the end.",
        goalText: "All set! Now the ball can roll and crash into the pins!",
        zones: [
          { id: "start", label: "Ball goes here", icon: "#c-ball", accepts: ["ball"] },
          { id: "end",   label: "Pins go here",   icon: "#c-pins", accepts: ["pins"] }
        ],
        parts: [
          { id: "ball", label: "Ball", icon: "#c-ball" },
          { id: "pins", label: "Pins", icon: "#c-pins" }
        ]
      },
      {
        engine: "sequence",
        reading: {
          text: "When two objects bump into each other, they collide! When things collide, they push on each other. The object that gets hit can change its direction or stop.",
          icons: ["#c-ball", "#c-pins"]
        },
        prompt: "What happens in the crash?",
        narration: "Watch what happens when the ball rolls. Put it in order!",
        steps: [
          { icon: "#c-ball",          label: "Ball rolls" },
          { icon: "#u-interactions",  label: "Crash!" },
          { icon: "#c-pins",          label: "Pins fall" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "A bigger push makes an object move faster. When a moving object hits something, it can slow down, stop, or go a different way.",
          icons: ["#c-ball", "#c-strong"]
        },
        prompt: "When things bump…",
        narration: "When things touch and bump, they push each other. Let's see!",
        rounds: [
          { ask: "When two balls bump, they…?", narration: "When two balls bump into each other, what happens?", hint: "They push each other and change how they move!",
            options: [ { icon: "#u-interactions", label: "Push each other", correct: true }, { label: "Take a nap" } ] },
          { ask: "When the ball hits the pins, the pins…?", narration: "When the ball crashes into the pins, what do the pins do?", hint: "The pins move and fall down!",
            options: [ { icon: "#c-pins", label: "Move", correct: true }, { label: "Stay still" } ] }
        ],
        pool: [
          { ask: "A hard push makes a ball go…?", narration: "If you push a ball really hard, how does it go?", hint: "A hard push makes the ball go fast!",
            options: [ { label: "Fast", correct: true }, { label: "Slow" } ] },
          { ask: "What happens when the ball hits the wall?", narration: "What happens when a rolling ball hits the wall?", hint: "The wall pushes back and the ball changes direction!",
            options: [ { icon: "#u-interactions", label: "It changes direction", correct: true }, { label: "It gets bigger" } ] },
          { ask: "Can you make a ball change direction?", narration: "Can you make a ball change direction?", hint: "Yes! A push or bump makes the ball change direction!",
            options: [ { label: "Yes, with a push", correct: true }, { label: "No, never" } ] }
        ]
      }
    ]
  };
})();
