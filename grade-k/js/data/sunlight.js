/* data/sunlight.js — "Sunshine Warms" (Physical Science · Sunlight's Effect on Earth)
   NGSS: sunlight warms Earth's surface. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.sunlight = {
    title: "Sunshine Warms",
    color: "physical",
    mascot: "#m-spark",
    vocab: ["sun", "sunlight", "warm", "hot", "cool"],
    activities: [
      {
        engine: "quiz",
        reading: {
          text: "The sun gives us light and warmth. Sunlight shines on the land, the water, and the air. It warms up the Earth every day!",
          icons: ["#u-sun", "#c-hot"]
        },
        prompt: "Sun makes things warm!",
        narration: "The sun shines on Earth and makes it warm. Let's see what you know!",
        rounds: [
          { ask: "Which spot is warmer?", narration: "Which spot is warmer — in the sun, or in the shade?", hint: "It's warmer in the sun!",
            options: [ { icon: "#u-sun", label: "In the sun", correct: true }, { icon: "#u-shade", label: "In the shade" } ] },
          { ask: "Sunlight makes the ground…?", narration: "When the sun shines, the ground gets how?", hint: "Sunlight makes the ground warm!",
            options: [ { icon: "#c-hot", label: "Warm", correct: true }, { icon: "#c-cold", label: "Freezing" } ] },
          { ask: "When does the sun warm us?", narration: "When does the sun warm the Earth?", hint: "The sun warms us in the daytime!",
            options: [ { icon: "#u-sun", label: "Daytime", correct: true }, { label: "Never" } ] }
        ],
        pool: [
          { ask: "What gives us light during the day?", narration: "What gives us light during the daytime?", hint: "The sun shines and gives us light!",
            options: [ { icon: "#u-sun", label: "The sun", correct: true }, { label: "A lamp" } ] },
          { ask: "At night it is…?", narration: "At night, without the sun, how does it feel?", hint: "At night it is dark and cool!",
            options: [ { icon: "#c-cold", label: "Dark and cool", correct: true }, { icon: "#c-hot", label: "Hot and bright" } ] },
          { ask: "Where is it cooler — in the sun or in the shade?", narration: "Where is it cooler — in the sun, or in the shade?", hint: "The shade blocks the sun, so it is cooler there!",
            options: [ { icon: "#u-shade", label: "In the shade", correct: true }, { icon: "#u-sun", label: "In the sun" } ] }
        ]
      },
      {
        engine: "sort",
        reading: {
          text: "Sunlight warms the sand, soil, and rocks on Earth. A sunny rock is warm to touch. A shady spot under a tree is much cooler.",
          icons: ["#u-sun", "#c-rock"]
        },
        prompt: "Warm or cool?",
        narration: "Spots in the sun are warm. Shady spots are cool. Sort them!",
        bins: [
          { id: "warm", label: "Warm", icon: "#c-hot" },
          { id: "cool", label: "Cool", icon: "#c-cold" }
        ],
        items: [
          { icon: "#u-sun",   label: "Sunshine",   bin: "warm" },
          { icon: "#c-rock",  label: "Sunny rock", bin: "warm" },
          { icon: "#c-tree",  label: "Shady tree", bin: "cool" },
          { icon: "#u-shade", label: "Umbrella",   bin: "cool" }
        ]
      },
      {
        engine: "color",
        reading: {
          text: "The sun shines bright in the blue sky. Sunlight warms the green grass below. At night, without the sun, everything gets cool and dark.",
          icons: ["#u-sun", "#c-tree"]
        },
        prompt: "Color the sunny day!",
        narration: "Color the sunny day. Pick a color, then tap the parts with that number.",
        palette: [
          { key: 1, color: "#ffd43b", name: "yellow" },
          { key: 2, color: "#4dabf7", name: "blue" },
          { key: 3, color: "#37b24d", name: "green" }
        ],
        art:
          '<svg viewBox="0 0 200 160" role="img" aria-label="Color the sunny day">' +
            '<g data-key="2" aria-label="sky, color 2">' +
              '<rect class="cbn-fill" x="0" y="0" width="200" height="112" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="44" y="46" text-anchor="middle">2</text>' +
            '</g>' +
            '<g data-key="3" aria-label="grass, color 3">' +
              '<rect class="cbn-fill" x="0" y="108" width="200" height="52" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="44" y="140" text-anchor="middle">3</text>' +
            '</g>' +
            '<g data-key="1" aria-label="sun, color 1">' +
              '<circle class="cbn-fill" cx="150" cy="46" r="28" fill="#eee" stroke="#c4c4c4" stroke-width="2"/>' +
              '<text class="cbn-num" x="150" y="52" text-anchor="middle">1</text>' +
            '</g>' +
          '</svg>'
      }
    ]
  };
})();
