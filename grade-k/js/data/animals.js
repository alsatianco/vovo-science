/* data/animals.js — "Animal Friends" (Life Science · Animals)
   NGSS: animals have external parts used to move, eat, see, etc.;
   all animals need food (from plants or other animals). */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.animals = {
    title: "Animal Friends",
    color: "life",
    mascot: "#m-sprout",
    vocab: ["wings", "fins", "claws", "ears", "fur", "feathers"],
    activities: [
      {
        engine: "match",
        reading: {
          text: "Animals have special body parts. Birds have wings to fly. Fish have fins to swim. Cats have claws to catch food.",
          icons: ["#c-bird", "#c-fish", "#c-cat"]
        },
        prompt: "Match the animal to its body part.",
        narration: "Animals have special body parts. Tap an animal, then tap the body part it uses.",
        pairs: [
          { a: { icon: "#c-bird",   label: "Bird" },   b: { icon: "#c-wings", label: "Wings" } },
          { a: { icon: "#c-fish",   label: "Fish" },   b: { icon: "#c-fins",  label: "Fins" } },
          { a: { icon: "#c-cat",    label: "Cat" },    b: { icon: "#c-claws", label: "Claws" } },
          { a: { icon: "#c-rabbit", label: "Rabbit" }, b: { icon: "#c-ear",   label: "Big ears" } }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "Animals use their body parts to move and find food. Big ears help a rabbit hear sounds far away. Animals respond to what they hear, see, and smell.",
          icons: ["#c-rabbit", "#c-ear"]
        },
        prompt: "How do animals use their parts?",
        narration: "Body parts help animals live. Let's answer some questions!",
        rounds: [
          { ask: "What helps a bird fly?", narration: "What helps a bird fly?", hint: "Birds fly with wings!",
            options: [ { icon: "#c-wings", label: "Wings", correct: true }, { icon: "#c-fins", label: "Fins" } ] },
          { ask: "What helps a fish swim?", narration: "What helps a fish swim?", hint: "Fish swim with fins!",
            options: [ { icon: "#c-fins", label: "Fins", correct: true }, { icon: "#c-wings", label: "Wings" } ] },
          { ask: "What does a cat use to catch food?", narration: "What does a cat use to catch its food?", hint: "Cats use sharp claws!",
            options: [ { icon: "#c-claws", label: "Claws", correct: true }, { icon: "#c-ear", label: "Ears" } ] }
        ],
        pool: [
          { ask: "What does a rabbit use to hear?", narration: "What does a rabbit use to hear?", hint: "A rabbit has big ears to hear!",
            options: [ { icon: "#c-ear", label: "Big ears", correct: true }, { icon: "#c-fins", label: "Fins" } ] },
          { ask: "Which animal swims in water?", narration: "Which animal swims in the water?", hint: "A fish swims with its fins!",
            options: [ { icon: "#c-fish", label: "Fish", correct: true }, { icon: "#c-bird", label: "Bird" } ] },
          { ask: "Which animal flies in the sky?", narration: "Which animal flies in the sky?", hint: "A bird flies with its wings!",
            options: [ { icon: "#c-bird", label: "Bird", correct: true }, { icon: "#c-rabbit", label: "Rabbit" } ] },
          { ask: "What do all animals need to live?", narration: "What do all animals need to live?", hint: "All animals need food to live and grow!",
            options: [ { icon: "#c-meat", label: "Food", correct: true }, { icon: "#c-claws", label: "Claws" } ] }
        ]
      },
      {
        engine: "sort",
        reading: {
          text: "All animals need food to live and grow. Some animals eat plants like grass and leaves. Some animals eat other animals for food.",
          icons: ["#c-rabbit", "#c-lion"]
        },
        prompt: "What does each animal eat?",
        narration: "Some animals eat plants. Some animals eat other animals. Sort them!",
        bins: [
          { id: "plants", label: "Eats plants", icon: "#c-leaf" },
          { id: "meat",   label: "Eats animals", icon: "#c-meat" }
        ],
        items: [
          { icon: "#c-rabbit", label: "Rabbit", bin: "plants" },
          { icon: "#c-cow",    label: "Cow",    bin: "plants" },
          { icon: "#c-lion",   label: "Lion",   bin: "meat" },
          { icon: "#c-frog",   label: "Frog",   bin: "meat" }
        ]
      },
      {
        engine: "trace",
        reading: {
          text: "Animals have feathers, fur, or fins. These body parts help them stay warm and move through the world. Birds fly with their wings!",
          icons: ["#c-feather", "#c-wings"]
        },
        prompt: "Spell the word.",
        narration: "Birds fly with their wings. Let's spell the word wings!",
        word: "WINGS",
        icon: "#c-wings"
      }
    ]
  };
})();
