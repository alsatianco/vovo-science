/* data/changingEnv.js — "Busy Builders" (Earth & Space · Changing Environments)
   NGSS: plants and animals (including humans) can change their
   environment to meet their needs. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.changingEnv = {
    title: "Busy Builders",
    color: "earth",
    mascot: "#m-cloud",
    vocab: ["environment", "change", "nest", "dam", "home"],
    activities: [
      {
        engine: "match",
        reading: {
          text: "Animals change their environment to meet their needs. Beavers build dams to make ponds. Birds build nests to protect their eggs. Rabbits dig burrows to hide and sleep.",
          icons: ["#c-beaver", "#c-nest"]
        },
        prompt: "Match the animal to what it builds.",
        narration: "Animals change their world to make a home. Tap an animal, then tap what it builds.",
        pairs: [
          { a: { icon: "#c-beaver", label: "Beaver" }, b: { icon: "#c-dam",    label: "Dam" } },
          { a: { icon: "#c-bird",   label: "Bird" },   b: { icon: "#c-nest",   label: "Nest" } },
          { a: { icon: "#c-rabbit", label: "Rabbit" }, b: { icon: "#c-burrow", label: "Burrow" } }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "Animals build homes to keep themselves and their babies safe. A bird's nest keeps eggs warm. A beaver's dam makes a safe pool of water to live in.",
          icons: ["#c-nest", "#c-dam"]
        },
        prompt: "Why do they build?",
        narration: "Animals build to meet their needs. Let's see!",
        rounds: [
          { ask: "Why does a bird build a nest?", narration: "Why does a bird build a nest?", hint: "A nest keeps the eggs and babies safe!",
            options: [ { icon: "#c-nest", label: "To keep eggs safe", correct: true }, { label: "To eat it" } ] },
          { ask: "What does a beaver build?", narration: "What does a busy beaver build?", hint: "A beaver builds a dam!",
            options: [ { icon: "#c-dam", label: "A dam", correct: true }, { icon: "#c-nest", label: "A nest" } ] },
          { ask: "Animals change their home to meet their…?", narration: "Animals change their home to meet their what?", hint: "They build to meet their needs!",
            options: [ { icon: "#c-water", label: "Needs", correct: true }, { label: "Toys" } ] }
        ],
        pool: [
          { ask: "A rabbit digs a burrow to…?", narration: "Why does a rabbit dig a burrow?", hint: "A rabbit digs a burrow to stay safe and warm!",
            options: [ { icon: "#c-burrow", label: "Stay safe", correct: true }, { icon: "#c-dam", label: "Make a dam" } ] },
          { ask: "Animals build homes called…?", narration: "What do we call the homes that animals build?", hint: "Animals build shelters to live in!",
            options: [ { label: "Shelters", correct: true }, { icon: "#c-car", label: "Roads" } ] },
          { ask: "Why do animals build homes?", narration: "Why do animals build homes?", hint: "Animals build homes to stay safe and warm!",
            options: [ { icon: "#c-nest", label: "To stay safe and warm", correct: true }, { label: "For fun" } ] }
        ]
      },
      {
        engine: "sort",
        reading: {
          text: "Plants also change the environment. Tree roots can crack rocks and push through soil. Gardens add new plants where there were none before.",
          icons: ["#c-tree", "#c-roots"]
        },
        prompt: "Who changes the land?",
        narration: "Animals and people both change the land. Sort who does each one.",
        bins: [
          { id: "animals", label: "Animals", icon: "#c-beaver" },
          { id: "people",  label: "People",  icon: "#c-person" }
        ],
        items: [
          { icon: "#c-dam",   label: "Dam",   bin: "animals" },
          { icon: "#c-nest",  label: "Nest",  bin: "animals" },
          { icon: "#c-house", label: "House", bin: "people" },
          { icon: "#c-car",   label: "Road",  bin: "people" }
        ]
      }
    ]
  };
})();
