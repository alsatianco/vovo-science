export const meta = {
  name: 'daily-science-content',
  description: 'Draft data + SVG art for Big Ideas 2-6 of the Daily Science Grade 1 game',
  phases: [
    { title: 'Draft', detail: 'author data-biN.js grounded in the workbook PDF' },
    { title: 'Art', detail: 'draw the new SVG <symbol> icons for each Big Idea' },
  ],
}

const PDF = '/Users/duc.nguyen/git2/science-books/Daily-Science-Grade-1-5011i.pdf'

const PREAMBLE = `
You are authoring content for "game-zung", a vanilla-JS, file://-only educational game that turns the
Evan-Moor *Daily Science Grade 1* workbook (EMC 5011) into mini-games for pre-readers.

MUST READ FIRST (use the Read tool):
- /Users/duc.nguyen/git2/game-zung/js/engines.js  — the game engines and the EXACT data fields each reads.
- /Users/duc.nguyen/git2/game-zung/js/data-bi1.js — the CANONICAL TEMPLATE: shows weekly units, a Review unit
  (kind:"review") and a Hands-on unit (kind:"handson"), with exact field names, tone, and structure. COPY THIS STYLE.
- /Users/duc.nguyen/git2/game-zung/js/data.js     — another example unit.
- /Users/duc.nguyen/git2/game-zung/index.html     — the SVG sprite: the full inventory of existing icon ids and the
  art style. REUSE existing ids; only invent new ids for things not already drawn.

ENGINES you may use (reuse aggressively; data shape in parentheses):
- sort: tile then bin. {bins:[{id,label,icon}], items:[{icon,label,bin}]}  (2 OR 3 bins both fine)
- match: two columns, pair them. {pairs:[{from:{icon,label}, to:{icon,label}}]}
- needs: tap ALL correct. {hero, wrongMsg:"...{x}...", choices:[{icon,label,need:true|false}]}
- cloze: tap word to hear, drag to blank. {bank:[words], sentences:[{icon,before,after,answer}]}  (answer must be in bank)
- truefalse: hear statement, Yes/No. {rounds:[{text, icons:[ids], answer:true|false}]}
- readword: see picture, tap its word. {rounds:[{icon, answer, options:[words]}]}  (answer must be in options)
- sequence: tap pictures in order; ARRAY ORDER = correct order. {steps:[{icon,label}]}  (3-5 steps)
- thermometer: drag to freeze/melt. {freeze:32, rounds:[{label, want:"below"|"above"}]}
- compare: which force goes farther. {scenarios:[{a:{icon,label,force:Number}, b:{icon,label,force:Number}, farther:"a"|"b"}]}
- pathdraw: steer car to goal on a grid. {rounds:[{cols,rows, start:[c,r], goal:[c,r], obstacles:[[c,r],...], carIcon, goalIcon, obstacleIcon}]} (small grids ~4x4, solvable)
- gravitypath: tap where it lands. {rounds:[{path:"drop"|"slide"|"swing", icon, targets:3, answer:Number(0-based)}]}
- handson: activity card. {title, icon, materials:[{icon,label}], steps:[strings]}  (no scoring)

EVERY game object also has: engine, title, prompt, narration. Keep language tiny and kind (Grade 1 / pre-reader):
short sentences, friendly prompts, narration that explains the action.

UNIT OBJECT shape (push each onto window.UNITS), matching data-bi1.js EXACTLY:
(window.UNITS = window.UNITS || []).push({
  id, bigIdea, bigIdeaTitle, week,            // weekly units: week 1-4
  question, color, cardIcon,
  vocab:[{word,kid,icon}],                     // optional, 1-3 entries
  reading:{ title, lines:[{text,icon}] },      // ~8-9 short picture-backed sentences (weekly + review). OMIT for handson.
  games:[ ...4-5 game objects... ]
});
- Review unit: same shape but add  kind:"review", week:5,  question:"Big Idea N Review", cardIcon:"ic-star";
  include a short 5-line reading recap; 4 games that re-test the unit using readword/match/sort/truefalse/sequence.
- Hands-on unit: add  kind:"handson", week:5,  NO reading; games:[{engine:"handson", ...}] with materials + steps
  drawn from the book's Week-5 hands-on activity.

CONTENT FIDELITY: base every reading line, vocab word, and game on what the workbook actually teaches on the cited
pages — read them. Do not invent facts the book does not cover. Keep each weekly unit to ~8-9 reading lines and 4-5 games.

ICONS: use existing ids from index.html wherever possible (e.g. ic-sun, ic-fish, ic-water, ic-tree, ic-flower, ic-kid,
ic-bird, ic-cow, ic-rock, ic-ball, ic-star...). For genuinely new things, use new ids of the form ic-<name>
(lowercase, hyphens). List EVERY new id you used (that is NOT already in index.html) in newIcons with a short
"depicts" description so an artist can draw it.
`

const DRAFT_SCHEMA = {
  type: 'object',
  required: ['biId', 'data', 'newIcons'],
  properties: {
    biId: { type: 'integer' },
    data: { type: 'string', description: 'Full contents of js/data-biN.js (an IIFE that pushes all units). Valid JS.' },
    newIcons: {
      type: 'array',
      items: { type: 'object', required: ['id', 'depicts'], properties: { id: { type: 'string' }, depicts: { type: 'string' } } }
    },
  },
}
const ART_SCHEMA = {
  type: 'object',
  required: ['symbols'],
  properties: { symbols: { type: 'string', description: 'Concatenated <symbol id="ic-...">...</symbol> blocks, one per new icon.' } },
}

const SPECS = {
  2: { color: '#6E8B3D', title: 'Plants and animals live in many different places', pages: '36-65', handson: 'Look at a Leaf',
    weeks: `
W1 "Where do animals sleep?" (pp.38-43): habitat/den/forest/nest/desert/ocean. Games: match(animal to home), sort with 3 bins(forest/desert/ocean animals), truefalse, readword(habitat words), cloze. New art e.g. ic-forest, ic-desert, ic-ocean, ic-nest, ic-den, ic-owl, ic-fox, ic-snake.
W2 "Why do camels have humps?" (pp.44-49): camel/stores/desert; hump stores fat, big feet, long eyelashes. Games: cloze(stores), match(body part to job), needs(camel desert adaptations), truefalse, readword. New art e.g. ic-camel, ic-hump, ic-eyelash, ic-sand.
W3 "Can a whale live in a lake?" (pp.50-55): whale/krill/lake; ocean=salt big, lake=fresh small; whales eat krill. Games: truefalse, cloze(krill), match(habitat to animal), sort(ocean vs lake creature). New art e.g. ic-whale, ic-krill, ic-lake.
W4 "Why do trees have different kinds of leaves?" (pp.56-61): leaves/evergreen; broad leaves warm & drop in fall, needle leaves cold & stay green. Games: sort(loses leaves vs evergreen), match(leaf to climate), truefalse, cloze, readword. New art e.g. ic-evergreen, ic-maple-leaf, ic-needle-leaf, ic-bare-tree.
Review (pp.62-64) + Hands-on "Look at a Leaf" (p.65; materials: a leaf, hand lens, crayons; steps: touch/smell/look at a leaf, make a crayon rubbing). New art e.g. ic-hand-lens.` },
  3: { color: '#3B5BA5', title: 'The sun, moon, and stars are objects in our sky', pages: '66-95', handson: 'Moon Phase Fun',
    weeks: `
W1 "What causes day and night?" (pp.68-73): Earth/rotates/day/night; Earth spins once a day; side facing sun=day. Games: cloze(rotates), truefalse, sort(day vs night pictures), sequence(morning to noon to evening to night), needs. New art e.g. ic-earth, ic-moon, ic-night, ic-noon-sun, ic-evening-sun.
W2 "What do we see in the sky at night?" (pp.74-79): stars/sun/moon/planet; stars make own light, moon & planets reflect sun. Games: cloze, truefalse, needs(night-sky objects), match(object to property), sort(makes light vs reflects). New art e.g. ic-mars, ic-venus, ic-planet, ic-constellation.
W3 "Why do we need the sun?" (pp.80-85): energy/heat/light; sun gives light, heat, energy; plants use sun to make food; food chain. Games: cloze, needs(sun gives light/heat/energy), truefalse, sort(needs sun vs not), sequence(sun to plant to animal to person food chain). New art e.g. ic-corn.
W4 "Can anything live on the moon?" (pp.86-91): moon/crater/mountain; moon is rock, has craters, no air/water, nothing lives there; phases. Games: cloze, truefalse, needs(what the moon does NOT have), match(feature to description), sequence(moon phases new to crescent to quarter to gibbous to full). New art e.g. ic-crater, ic-astronaut, ic-moon-new, ic-moon-crescent, ic-moon-quarter, ic-moon-gibbous, ic-moon-full.
Review (pp.92-94) + Hands-on "Moon Phase Fun" (p.95; materials: paper plate, yellow & black markers; steps: color a paper plate to show a moon phase, stand in a circle to model the orbit). New art e.g. ic-paper-plate.` },
  4: { color: '#E08A4A', title: 'Different seasons have different weather', pages: '96-125', handson: 'Measure the Wind!',
    weeks: `
W1 "Why is it hot in the summer?" (pp.98-103): season/summer/axis/orbit; Earth tilts on axis & orbits sun; summer = tilted toward sun, longer/hotter days. Games: cloze(axis/orbit), truefalse, sort(summer vs winter activities), needs, match(cause to effect). New art e.g. ic-axis, ic-orbit, ic-icecream, ic-swim. (ic-sun exists.)
W2 "Why does it snow in the winter?" (pp.104-109): winter/temperature/thermometer/icicles/snow/snowflakes; cold, water freezes at 32F, snow = frozen water. Games: cloze, truefalse, sort(winter vs summer), thermometer(freeze:32; rounds want "below"/"above"), readword. New art e.g. ic-icicle, ic-snow, ic-snowman, ic-coat. (ic-snowflake and ic-thermometer ALREADY EXIST in index.html — reuse them, do not redraw.)
W3 "Why are there a lot of flowers in the spring?" (pp.110-115): spring/bloom/flowers/rain; warmer, longer days, rain makes flowers bloom. Games: cloze, truefalse, needs(flowers need warmth/light/water/rain), sort(spring vs winter), sequence(winter to warm sun to rain to flowers bloom). New art e.g. ic-rain, ic-cloud, ic-rose, ic-tulip, ic-bloom.
W4 "Why do some trees lose their leaves in the fall?" (pp.116-121): autumn/fall/breeze/gust/wind; colder, shorter days, leaves turn color & drop, wind. Games: cloze(breeze/gust), truefalse, sort(fall vs spring), needs(why trees drop leaves), match(cause to effect). New art e.g. ic-fall-leaves, ic-breeze, ic-gust, ic-wind. (ic-bare-tree may already be made by Big Idea 2 — still LIST it in newIcons if you use it; duplicates are de-duped at integration.)
Review (pp.122-124) + Hands-on "Measure the Wind!" (p.125; materials: paper cups, a straw, a pin/pencil; steps: build a simple wind spinner, put it outside, watch it spin in the wind). New art e.g. ic-pinwheel.` },
  5: { color: '#4F9DAE', title: 'Objects can be solid, liquid, or gas', pages: '126-155', handson: 'Ice Cube Race',
    weeks: `
W1 "Why cannot we walk through walls?" (pp.128-133): matter/solid/mass/shape/mixture; a solid keeps its shape; you cannot pass through solids. Games: sort(solid vs not solid), cloze(matter/solid), match(solid to description), truefalse, needs(pick the solids). New art e.g. ic-wall, ic-block, ic-brick. (ic-ball, ic-rock, ic-spoon, ic-teddy exist.)
W2 "Why does water splash?" (pp.134-139): liquid/flows/splash; a liquid flows and takes the shape of its container. Games: match(container to the liquid shape), cloze(flows/splash), sort(solid vs liquid), needs, truefalse. New art e.g. ic-cup, ic-splash, ic-drip, ic-teapot, ic-bowl, ic-milk. (ic-water exists.)
W3 "Why do balloons float in the air?" (pp.140-145): gas/air/helium/float; a gas has mass, takes shape of container; helium is lighter than air. Games: match(object to filled with air), needs(gas properties), sort with 3 bins(solid/liquid/gas), truefalse, cloze(helium/float). New art e.g. ic-balloon, ic-tire, ic-steam. (ic-ice-cube exists for the solid bin.)
W4 "Why does ice melt?" (pp.146-151): ice/solid/liquid/melt/steam/heat; heat changes state: ice to water to steam. Games: sort(before heat vs after heat), cloze(melt/steam), match(object to its melted form), truefalse, sequence(ice to water to steam). New art e.g. ic-puddle, ic-popsicle, ic-kettle, ic-butter. (ic-ice-cube, ic-steam, ic-water exist/are made above.)
Review (pp.152-154) + Hands-on "Ice Cube Race" (p.155; materials: ice cube with a marble frozen inside, a cup; steps: melt the ice with your hands/warm water to free the marble, no biting!). New art e.g. ic-marble.` },
  6: { color: '#8E5BA6', title: 'An object\'s motion can be changed by using force', pages: '156-185', handson: 'Forces on the Playground',
    weeks: `
W1 "Why do shopping carts have wheels?" (pp.158-163): motion/force/push/pull/wheel; force is a push or pull; wheels make pushing easier. Games: match(action to push or pull), needs(force facts), sort(has wheels vs no wheels), truefalse, cloze(wheel/push/pull). New art e.g. ic-cart, ic-wheel, ic-rope, ic-bike, ic-skateboard, ic-push, ic-pull. (ic-car exists.)
W2 "Why does a ball go far when I kick it hard?" (pp.164-169): force/distance/speed; a bigger force moves a thing farther/faster. Games: sort(big force vs little force), match(action to outcome), cloze(distance/speed), truefalse, compare(e.g. {a:{icon:"ic-kick",label:"hard kick",force:3}, b:{icon:"ic-tap",label:"soft tap",force:1}, farther:"a"}). New art e.g. ic-kick, ic-tap, ic-airplane, ic-snail. (ic-ball exists.)
W3 "Why do cars have steering wheels?" (pp.170-175): forward/backward/path/force; force changes an object path (straight/curved/circular); steering changes direction. Games: sort with 3 bins(straight/curved/circular path), match(direction to arrow), cloze(path), truefalse, pathdraw(steer the car around an obstacle to a goal on a small grid; use carIcon:"ic-car", goalIcon:"ic-star", obstacleIcon:"ic-rock"). New art e.g. ic-steering-wheel, ic-path-straight, ic-path-curved, ic-path-circular, ic-arrow.
W4 "Why do things fall down when you drop them?" (pp.176-181): gravity/force; gravity pulls everything down; force can hold things up. Games: truefalse, cloze(gravity), match(scenario to outcome), needs(gravity facts), gravitypath(rounds with path "drop"/"slide"/"swing", icon e.g. ic-ball, targets:3, answer index). New art e.g. ic-gravity. (ic-slide, ic-swing, ic-target exist for the engine.)
Review (pp.182-184) + Hands-on "Forces on the Playground" (p.185; materials: a swing, a slide, a ball; steps: go outside, push and pull on the playground, notice each push or pull). New art e.g. ic-playground.` },
}

phase('Draft')
const results = await pipeline(
  [2, 3, 4, 5, 6],
  (biId) => {
    const s = SPECS[biId]
    return agent(
      `${PREAMBLE}

YOUR TASK: author js/data-bi${biId}.js for **Big Idea ${biId}: "${s.title}"** (accent color "${s.color}").
Read these workbook pages from ${PDF} (pages == printed page numbers): ${s.pages}.

Produce SIX units in this one file (in order): Week 1, Week 2, Week 3, Week 4, a Review unit, a Hands-on unit.
Use bigIdea:${biId} and bigIdeaTitle:"${s.title.replace(/"/g, '')}." on every unit. Pick a per-unit "color"
(you may vary hues around ${s.color}) and a sensible cardIcon. Each weekly unit: ~8-9 reading lines + 4-5 games.

Per-week guidance (engines to reuse + example new icons — adapt as the pages warrant):${s.weeks}

Wrap everything in an IIFE like data-bi1.js: (function(){ ... push(...) x6 ... })();
Return the FULL file text in "data", and list every NEW icon id you used (not already in index.html) in "newIcons".`,
      { label: `draft:bi${biId}`, phase: 'Draft', agentType: 'general-purpose', schema: DRAFT_SCHEMA }
    )
  },
  (draft, biId) => {
    if (!draft || !draft.newIcons || !draft.newIcons.length) return { biId, symbols: '', newIcons: [], data: draft && draft.data }
    const list = draft.newIcons.map(n => `- ${n.id}: ${n.depicts}`).join('\n')
    return agent(
      `You draw SVG icons for a children's "vintage storybook" game. Study the existing sprite for STYLE by reading
/Users/duc.nguyen/git2/game-zung/index.html (the <symbol> blocks). Match that style EXACTLY:
- Each icon: <symbol id="ic-NAME" viewBox="0 0 64 64"> ... </symbol>
- Warm brown ink outline stroke="#4A3B2A", stroke-width ~2.5-3, stroke-linejoin/linecap round.
- Muted storybook fills already in use (e.g. #6BA292 green, #D96C4A coral, #E0A458 mustard,
  #F2C94C yellow, #7CC5D6 blue, #B07A43/#9C6B3F brown, #F4ECE0 cream, #3A3A40 charcoal).
- Simple, bold, instantly recognizable to a 6-year-old. Centered in the 64x64 box.

Draw EXACTLY these new icons for Big Idea ${biId} (do not draw any others, do not redefine existing ones):
${list}

Return "symbols" = all the <symbol>...</symbol> blocks concatenated (with a short <!-- comment --> before each).
Output valid SVG only — no markdown fences.`,
      { label: `art:bi${biId}`, phase: 'Art', agentType: 'general-purpose', schema: ART_SCHEMA }
    ).then(art => ({ biId, data: draft.data, newIcons: draft.newIcons, symbols: (art && art.symbols) || '' }))
  }
)

return results.filter(Boolean).map(r => ({ biId: r.biId, data: r.data || '', symbols: r.symbols || '', newIcons: r.newIcons || [] }))
