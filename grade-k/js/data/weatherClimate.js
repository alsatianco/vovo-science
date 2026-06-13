/* data/weatherClimate.js — "Weather Watch" (Earth & Space · Weather & Climate)
   NGSS: weather is sunlight, wind, rain/snow, and temperature; observe
   and describe patterns over time. */
(function () {
  "use strict";
  window.SCIENCE_DATA = window.SCIENCE_DATA || {};
  window.SCIENCE_DATA.weatherClimate = {
    title: "Weather Watch",
    color: "earth",
    mascot: "#m-cloud",
    vocab: ["sun", "rain", "snow", "wind", "season"],
    activities: [
      {
        engine: "match",
        reading: {
          text: "Weather can be sunny, rainy, snowy, or windy. We can see and feel the weather outside. Different weather needs different clothes and gear!",
          icons: ["#c-rain", "#c-snow"]
        },
        prompt: "Match the weather to what you use.",
        narration: "Different weather needs different things. Tap the weather, then tap what you would use.",
        pairs: [
          { a: { icon: "#c-rain", label: "Rainy" }, b: { icon: "#u-shade",  label: "Umbrella" } },
          { a: { icon: "#c-snow", label: "Snowy" }, b: { icon: "#c-coat",   label: "Warm coat" } },
          { a: { icon: "#u-sun",  label: "Sunny" }, b: { icon: "#c-sunhat", label: "Sun hat" } }
        ]
      },
      {
        engine: "sequence",
        reading: {
          text: "Weather changes with the seasons. Spring is warm and flowers bloom. Summer is hot and sunny. Fall leaves change color. Winter is cold and snowy.",
          icons: ["#c-blossom", "#c-fallleaf"]
        },
        prompt: "Put the seasons in order.",
        narration: "The seasons come in order, again and again. Start with spring!",
        steps: [
          { icon: "#c-blossom",  label: "Spring" },
          { icon: "#u-sun",      label: "Summer" },
          { icon: "#c-fallleaf", label: "Fall" },
          { icon: "#c-snow",     label: "Winter" }
        ]
      },
      {
        engine: "quiz",
        reading: {
          text: "We wear different clothes for different weather. We wear a warm coat when it is cold and snowy. We wear a sun hat when it is hot and sunny.",
          icons: ["#c-coat", "#c-sunhat"]
        },
        prompt: "Dress for the weather!",
        narration: "Let's dress for the weather!",
        rounds: [
          { ask: "It's raining! What do you take?", narration: "It's raining outside! What do you take with you?", hint: "Take an umbrella in the rain!",
            options: [ { icon: "#u-shade", label: "Umbrella", correct: true }, { icon: "#c-sunhat", label: "Sun hat" } ] },
          { ask: "It's snowy and cold! What do you wear?", narration: "It's snowy and cold! What do you wear?", hint: "Wear a warm coat in the snow!",
            options: [ { icon: "#c-coat", label: "Warm coat", correct: true }, { label: "Swimsuit" } ] },
          { ask: "It's hot and sunny! What do you wear?", narration: "It's hot and sunny! What do you wear?", hint: "Wear a sun hat in the sun!",
            options: [ { icon: "#c-sunhat", label: "Sun hat", correct: true }, { icon: "#c-coat", label: "Warm coat" } ] }
        ],
        pool: [
          { ask: "On a cloudy day, there is…?", narration: "What is the weather like on a cloudy day?", hint: "On a cloudy day there is no bright sun — the sky is grey!",
            options: [ { label: "No bright sun", correct: true }, { icon: "#u-sun", label: "Hot sunshine" } ] },
          { ask: "In the desert, it is usually…?", narration: "What is the weather usually like in the desert?", hint: "The desert is usually hot and very dry!",
            options: [ { label: "Hot and dry", correct: true }, { icon: "#c-snow", label: "Cold and snowy" } ] },
          { ask: "Near the North Pole it is usually…?", narration: "What is the weather like near the North Pole?", hint: "Near the North Pole it is very, very cold!",
            options: [ { icon: "#c-coat", label: "Very cold", correct: true }, { icon: "#c-sunhat", label: "Hot and sunny" } ] }
        ]
      },
      {
        engine: "dots",
        reading: {
          text: "Clouds are made from tiny drops of water in the sky. When clouds get very heavy, rain falls down. The sun warms the water and sends it back up to make more clouds!",
          icons: ["#c-rain", "#u-sun"]
        },
        prompt: "Connect the dots!",
        narration: "Connect the dots to find what we see on a sunny day. Start at number one!",
        viewBox: "0 0 100 100",
        dots: [ {x:50,y:24}, {x:72,y:36}, {x:72,y:58}, {x:50,y:70}, {x:28,y:58}, {x:28,y:36} ],
        reveal: '<circle cx="50" cy="47" r="17" fill="#ffd43b"/>' +
                '<g stroke="#fab005" stroke-width="3" stroke-linecap="round">' +
                '<path d="M50 22V14M50 72v8M25 47h-8M75 47h8M33 30l-6-6M67 64l6 6M67 30l6-6M33 64l-6 6"/></g>'
      }
    ]
  };
})();
