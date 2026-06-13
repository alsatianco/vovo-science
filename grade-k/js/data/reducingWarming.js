/* data/reducingWarming.js — "Make Some Shade" (Physical Science ·
   Reducing Warming Effect of Sunlight)
   NGSS: design and build a structure that reduces the warming effect
   of sunlight on an area. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.reducingWarming = {
    title: "Make Some Shade",
    color: "physical",
    mascot: "#m-spark",
    vocab: ["shade", "shadow", "cover", "cool down"],
    activities: [
      {
        engine: "build",
        reading: {
          text: "Shade is darkness when something blocks the sun. Shade helps keep us cool on a hot day. Trees, roofs, and umbrellas can all make shade.",
          icons: ["#u-sun", "#c-tree"]
        },
        prompt: "Make shade for the bench!",
        narration: "The sunny bench is too hot! Pick something that makes shade and put it over the bench.",
        goalText: "Now the bench is cool and shady. Nice building!",
        zones: [
          { id: "bench", label: "Hot sunny bench", icon: "#u-sun", accepts: ["umbrella", "tree", "roof"] }
        ],
        parts: [
          { id: "umbrella", label: "Umbrella", icon: "#u-shade" },
          { id: "tree",     label: "Tree",     icon: "#c-tree" },
          { id: "roof",     label: "Roof",     icon: "#c-roof" },
          { id: "ball",     label: "Ball",     icon: "#c-ball" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "We can design things to make shade. A hat shades your head from the sun. A roof shades a whole building. Shade protects us and keeps us cool.",
          icons: ["#c-sunhat", "#c-roof"]
        },
        prompt: "What makes good shade?",
        narration: "Shade blocks the sun and keeps us cool. Let's answer!",
        rounds: [
          { ask: "What makes good shade on a hot day?", narration: "What makes good shade on a hot day?", hint: "An umbrella makes shade!",
            options: [ { icon: "#u-shade", label: "Umbrella", correct: true }, { icon: "#c-ball", label: "Ball" } ] },
          { ask: "A big tree gives us…?", narration: "What does a big tree give us on a sunny day?", hint: "A tree gives us cool shade!",
            options: [ { icon: "#u-shade", label: "Shade", correct: true }, { icon: "#c-hot", label: "More heat" } ] },
          { ask: "Shade helps us stay…?", narration: "Shade from the sun helps us stay how?", hint: "Shade keeps us cool!",
            options: [ { icon: "#c-cold", label: "Cool", correct: true }, { icon: "#c-hot", label: "Hot" } ] }
        ],
        pool: [
          { ask: "What happens when Earth gets too warm?", narration: "What happens when the Earth gets too warm?", hint: "When Earth gets too warm, ice melts and animals can lose their homes!",
            options: [ { label: "Ice melts", correct: true }, { label: "More snow falls" } ] },
          { ask: "Planting trees helps Earth because…?", narration: "Why does planting trees help the Earth?", hint: "Trees give us cool shade and help clean the air!",
            options: [ { icon: "#c-tree", label: "They give shade and clean air", correct: true }, { label: "They block the rain" } ] },
          { ask: "How can you help keep Earth cool?", narration: "How can you help keep the Earth cool?", hint: "You can plant trees or use less energy to help the Earth!",
            options: [ { icon: "#c-tree", label: "Plant trees", correct: true }, { icon: "#c-hot", label: "Use more heat" } ] }
        ]
      },
      {
        engine: "sort",
        reading: {
          text: "Some things block the sun and make shade. An umbrella, a big tree, and a roof all make shade. A ball or a car cannot block the sun.",
          icons: ["#c-sunhat", "#u-shade"]
        },
        prompt: "Does it make shade?",
        narration: "Some things make shade and block the sun. Some do not. Sort them!",
        bins: [
          { id: "shade", label: "Makes shade", icon: "#u-shade" },
          { id: "none",  label: "No shade",    icon: "#u-sun" }
        ],
        items: [
          { icon: "#u-shade", label: "Umbrella", bin: "shade" },
          { icon: "#c-tree",  label: "Tree",     bin: "shade" },
          { icon: "#c-roof",  label: "Roof",     bin: "shade" },
          { icon: "#c-ball",  label: "Ball",     bin: "none" },
          { icon: "#c-car",   label: "Car",      bin: "none" }
        ]
      }
    ]
  };
})();
