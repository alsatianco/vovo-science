/* data/humanImpact.js — "Care for Earth" (Earth & Space · Reducing Human Impact)
   NGSS: people can make choices that reduce their impact on land,
   water, air, and other living things. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.humanImpact = {
    title: "Care for Earth",
    color: "earth",
    mascot: "#m-cloud",
    vocab: ["reduce", "reuse", "recycle", "clean", "care"],
    activities: [
      {
        engine: "sort",
        reading: {
          text: "To reduce means to use less. To recycle means to remake trash into something new. Recycling helps us make less waste and keeps our Earth clean and beautiful.",
          icons: ["#c-recycle", "#c-trash"]
        },
        prompt: "Recycle or trash?",
        narration: "We can recycle some things to use them again. Sort what to recycle and what is trash.",
        bins: [
          { id: "recycle", label: "Recycle", icon: "#c-recycle" },
          { id: "trash",   label: "Trash",   icon: "#c-trash" }
        ],
        items: [
          { icon: "#c-bottle", label: "Bottle",      bin: "recycle" },
          { icon: "#c-paper",  label: "Paper",       bin: "recycle" },
          { icon: "#c-peel",   label: "Banana peel", bin: "trash" },
          { icon: "#c-ball",   label: "Broken toy",  bin: "trash" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "We can protect our planet every day. Turn off the water when you brush your teeth. Put litter in the trash can. Small choices can make a big difference for the Earth!",
          icons: ["#c-tap", "#c-recycle"]
        },
        prompt: "Care for the Earth!",
        narration: "We can all make choices that help the Earth. Let's see!",
        rounds: [
          { ask: "What should you do with a bottle?", narration: "What should you do with an empty bottle?", hint: "Recycle the bottle!",
            options: [ { icon: "#c-recycle", label: "Recycle it", correct: true }, { label: "Drop it outside" } ] },
          { ask: "To save water, you should…?", narration: "To save water, what should you do?", hint: "Turn off the tap to save water!",
            options: [ { icon: "#c-tap", label: "Turn off the tap", correct: true }, { label: "Let it run" } ] },
          { ask: "Litter on the ground should go in the…?", narration: "Where should litter on the ground go?", hint: "Litter goes in the trash can!",
            options: [ { icon: "#c-trash", label: "Trash can", correct: true }, { icon: "#c-pond", label: "Pond" } ] }
        ],
        pool: [
          { ask: "Which helps the Earth stay clean?",
            narration: "Which one helps our Earth stay clean?",
            hint: "Recycling helps the Earth!",
            options: [ { icon: "#c-recycle", label: "Recycle", correct: true }, { icon: "#c-trash", label: "Litter" } ] },
          { ask: "You finished a drink. What do you do with the bottle?",
            narration: "You finished your drink. What should you do with the empty bottle?",
            hint: "Put it in the recycle bin!",
            options: [ { icon: "#c-recycle", label: "Recycle it", correct: true }, { label: "Drop it outside" } ] },
          { ask: "To use LESS water, you should…?",
            narration: "What can you do to use less water every day?",
            hint: "Turn off the tap to save water!",
            options: [ { icon: "#c-tap", label: "Turn off the tap", correct: true }, { label: "Leave the tap on" } ] },
          { ask: "Small things we do every day can make a…?",
            narration: "Small things we do every day can make a what for the Earth?",
            hint: "Small choices make a big difference!",
            options: [ { label: "Big difference", correct: true }, { label: "Big mess" } ] }
        ]
      },
      {
        engine: "build",
        reading: {
          text: "To reuse means to use something again. A reusable bottle makes less trash than throwing one away. We can all make choices to help the Earth stay healthy!",
          icons: ["#c-bottle", "#c-paper"]
        },
        prompt: "Clean up the park!",
        narration: "Let's clean up the park! Put each thing where it belongs.",
        goalText: "The park is clean! Thank you for caring for the Earth!",
        zones: [
          { id: "recycle", label: "Recycle bin", icon: "#c-recycle", accepts: ["bottle", "paper"] },
          { id: "trash",   label: "Trash can",   icon: "#c-trash",   accepts: ["peel"] }
        ],
        parts: [
          { id: "bottle", label: "Bottle",      icon: "#c-bottle" },
          { id: "paper",  label: "Paper",       icon: "#c-paper" },
          { id: "peel",   label: "Banana peel", icon: "#c-peel" }
        ]
      }
    ]
  };
})();
