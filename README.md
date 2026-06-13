# VoVo Science

Offline science games for young children. The repo is pure HTML, CSS, and
JavaScript: no install, no build step, no server, and no external runtime
dependencies. The apps are designed to run directly from disk with `file://`.

VoVo Science is free software under the MIT License. The live website is
https://vovo.alsatian.co.

## Backstory

VoVo Science started as a family project. My wife teaches science for our
five-year-old daughter, VoVo, and after our last family project, Meadow Math
([about](https://math.alsatian.co/about/index.html#about),
[GitHub](https://github.com/alsatianco/meadowmath)), she wanted to make a
website where kids could learn science too. She used AI to build this project;
I helped put it on GitHub, deploy it to the web, and advise on some product and
technical decisions.

## Apps

| Path | Audience | Status | Notes |
|---|---:|---|---|
| `index.html` | launcher | usable | Root grade picker for the available apps. |
| `grade-k/index.html` | PreK/K, age 5-6 | 15 games playable | Three worlds, 15 unit games, 8 reusable activity engines. Milestone 4 polish/a11y hardening remains in `grade-k/plan.md`. |
| `grade-1/index.html` | Grade 1 pre-readers | content complete | 6 Big Ideas, 36 units total, 12 reusable engines, Node verification tools. |

## Quick Start

Open one of these files in a browser:

```text
index.html
grade-k/index.html
grade-1/index.html
```

Chrome is the main reference browser. The apps should also be kept working in
current Edge and Safari from `file://`.

## Architecture Rules

- Keep everything `file://` safe: no `fetch()`, no ES module `import`, no router
  or asset path that requires a server.
- Use classic `<script>` tags and globals on `window`; script order matters.
- Keep content data-driven. Add or tune lessons in data files before changing
  engines.
- Use `localStorage` for local progress, with graceful fallback where possible.
- Use the Web Speech API for narration. Speech generally needs a user gesture;
  avoid aggressive `speechSynthesis.cancel()` patterns because Chrome can wedge.
- Do not add npm, bundlers, CDNs, frameworks, or generated build artifacts unless
  the project direction changes explicitly.

## Repo Map

```text
assets/                 Shared root assets for the launcher
grade-k/
  index.html            Grade K app shell, inline SVG sprite, script wiring
  styles/               Theme, layout, components, game styles
  js/app.js             Hash router and top bar
  js/game.js            Activity runner and reward flow
  js/engine.js          Engine registry contract
  js/engines/           quiz, matchPairs, sequence, colorByNumber, sortBuckets,
                        buildPlay, dotToDot, traceWord
  js/data/              worlds metadata plus 15 unit content packs
  project_requirements.md, game_ideas.md, plan.md

grade-1/
  index.html            Grade 1 app shell and inline SVG art library
  css/styles.css        Complete visual theme and engine styling
  js/app.js             Home, reading flow, games, rewards, persistence
  js/audio.js           Web Speech narration queue
  js/engines.js         12 activity engines
  js/data*.js           36 unit content packs by Big Idea
  tools/                Static, smoke, validation, and icon-gallery scripts
  CLAUDE.md             Detailed maintenance notes and hard-won constraints
  progress.md           Current completion and verification summary
```

## Verification

For Grade 1, run these from `grade-1/` after changing JS, CSS, data, icons, or
script wiring:

```sh
node tools/verify.mjs
node tools/smoke.mjs
node tools/validate.mjs
```

Optional art review:

```sh
node tools/gen-gallery.mjs
```

For Grade K, there is no committed automated tool suite yet. Manually open
`grade-k/index.html` from disk, play representative units in each world, check
sound after a click/tap, reload to confirm progress, resize around tablet and
desktop widths, and check the browser console for errors.

## Editing Notes For Humans And AI Agents

- Read the app-specific docs before large changes: `grade-k/project_requirements.md`,
  `grade-k/plan.md`, `grade-1/CLAUDE.md`, and `grade-1/progress.md`.
- Prefer small, local edits. The two grade apps share ideas but are separate
  implementations.
- When editing Grade 1 JS/CSS, bump the `?v=N` cache-busting values in
  `grade-1/index.html` as documented in `grade-1/CLAUDE.md`.
- Reuse existing engines and SVG symbols before adding new ones.
- Preserve the child-friendly design constraints: large touch targets, forgiving
  scoring, audio-first instructions, visible focus, high contrast, and no failure
  state that traps a child.
- The source educational docs describe scope and content mapping; do not copy
  workbook text verbatim into code or docs.
