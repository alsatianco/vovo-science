/* data/forecasting.js — "Storm Ready" (Earth & Space · Weather Forecasting)
   NGSS: weather forecasting helps people prepare for and respond to
   severe weather. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.forecasting = {
    title: "Storm Ready",
    color: "earth",
    mascot: "#m-cloud",
    vocab: ["forecast", "storm", "prepare", "safe", "warning"],
    activities: [
      {
        engine: "sequence",
        reading: {
          text: "Some weather can be very strong and dangerous. Thunderstorms bring heavy rain. Tornadoes have fast-moving winds. It is important to stay safe when storms come.",
          icons: ["#c-rain", "#c-snow"]
        },
        prompt: "Get ready for the storm!",
        narration: "When a storm is coming, we get ready. Put the steps in order!",
        steps: [
          { icon: "#u-forecast", label: "Storm coming" },
          { icon: "#c-coat",     label: "Get ready" },
          { icon: "#c-house",    label: "Stay safe" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "Weather scientists watch the sky to forecast storms. A forecast tells us what weather is coming so we can get ready. When a storm comes, we can stay safe inside our homes.",
          icons: ["#c-house", "#u-forecast"]
        },
        prompt: "Stay safe!",
        narration: "Weather scientists tell us when a storm is coming, so we can stay safe. Let's see!",
        rounds: [
          { ask: "A big storm is coming! What should you do?", narration: "A big storm is coming! What should you do?", hint: "Stay safe inside!",
            options: [ { icon: "#c-house", label: "Stay inside", correct: true }, { label: "Go swimming" } ] },
          { ask: "Weather scientists tell us about…?", narration: "What do weather scientists tell us about?", hint: "They tell us when storms are coming!",
            options: [ { icon: "#u-forecast", label: "Storms coming", correct: true }, { label: "Lunch" } ] },
          { ask: "Knowing about a storm helps us…?", narration: "How does knowing about a storm help us?", hint: "It helps us get ready and stay safe!",
            options: [ { icon: "#c-house", label: "Get ready", correct: true }, { label: "Get scared" } ] }
        ],
        pool: [
          { ask: "We watch the sky to…?", narration: "Why do we watch the sky and clouds?", hint: "We watch the sky to know what weather is coming!",
            options: [ { label: "Know the weather", correct: true }, { label: "Count birds" } ] },
          { ask: "A weather map shows us…?", narration: "What does a weather map show us?", hint: "A weather map shows where rain or storms are coming!",
            options: [ { icon: "#u-forecast", label: "Where rain is coming", correct: true }, { label: "Where lunch is" } ] },
          { ask: "Before a storm, families should…?", narration: "Before a storm arrives, what should families do?", hint: "Families should get ready and make a plan to stay safe!",
            options: [ { icon: "#c-house", label: "Get ready", correct: true }, { label: "Go outside to play" } ] }
        ]
      },
      {
        engine: "match",
        reading: {
          text: "A weather forecast helps us prepare for what is coming. If snow is coming, we wear warm coats. If it is windy and rainy, we bring an umbrella and stay safe.",
          icons: ["#c-snow", "#c-coat"]
        },
        prompt: "Match the weather to how to get ready.",
        narration: "Different weather needs different ways to stay safe. Match them!",
        pairs: [
          { a: { icon: "#c-rain",     label: "Rain" },  b: { icon: "#u-shade", label: "Umbrella" } },
          { a: { icon: "#c-snow",     label: "Cold" },  b: { icon: "#c-coat",  label: "Warm coat" } },
          { a: { icon: "#u-forecast", label: "Storm" }, b: { icon: "#c-house", label: "Stay inside" } }
        ]
      }
    ]
  };
})();
