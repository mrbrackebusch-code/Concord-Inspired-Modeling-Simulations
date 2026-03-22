# Game Chat Handoff: Pedagogical Simulation Side

Use this as the handoff to the separate game-side thread.

The goal is to let game work and simulation work proceed in parallel without either side blocking the other.

## Paste-Ready Handoff Script

```md
MODE: GAME_HANDOFF

Here is what you can expect from the pedagogical simulation side as you build the game proof of concept.

## Core rule

Treat the pedagogical simulation as the `zoomed-in experiment view` of the future game.

It is not a throwaway prototype and not a separate product.

The game will eventually:

- navigate at room or mission scale
- do that navigation in whatever room-scale form the game chooses, such as top-down ship flight or top-down suit traversal
- use that movement to carry out the macroscopic setup and handling of the experiment itself
- dock with a station or experiment platform when the procedure calls for it
- open the zoomed-in simulation view
- let the student perform the close-up scientific procedure there
- read back procedure, evidence, and event state
- return to the room-scale game

So the simulation side is building the close-up truth layer now.

The important framing is:

- the game is not adding a separate objective around the science
- the game structure is gamifying the experimental procedure itself
- the ship is an unwieldy tool used to make the experiment happen

## What the experimental part is for

This close-up layer is not just a prettier animation surface.

It exists to do five jobs:

1. let the player perform a real scientific procedure at readable scale
2. generate trustworthy evidence from that procedure
3. preserve procedural integrity and mark compromised runs
4. later feed revision, writing, model-building, and AI-training systems
5. remain polished enough that the game can keep calling it instead of replacing it

So the experimental part is the `evidence engine` of the larger game.

## What the room-scale gameplay is for

The room-scale layer is not a separate scavenging game wrapped around the experiment.

It exists to turn experimental handling into gameplay.

That means the room-scale challenge should come from things like:

- piloting the ship to the correct apparatus or station
- positioning the ship well enough to pick up or place actual experiment items
- moving the correct material to the correct place
- doing that procedure in the allotted stabilization window
- coping with the fact that the ship is a somewhat awkward instrument

So if the player is "collecting" anything, it should be specific experimental matter or apparatus such as:

- a beaker
- a jar
- a scale tray target
- a test tube
- a tablet
- a steel wool sample
- a solution needed for the run

It should not read like generic loot, crafting resources, or abstract supplies.

## Non-negotiable intent

The simulation side is building around these rules:

- student action -> visible consequence -> evidence -> student interpretation
- evidence before explanation
- process realism over poster-state shortcuts
- visible causation over state swapping
- macroscopic Lesson 1 evidence first
- no early particle view for Unit 1 Lesson 1
- no UI that tells the student the conservation rule directly

In other words:

- the simulation should show what happened
- the student should still have to determine what it means

## What the game must understand about mistakes

The experiment layer is not trying to create generic fail states.

It is trying to create `evidence consequences`.

That means mistakes should read like:

- spill
- leak
- gas escaped
- fragment lost
- unstable measurement
- contaminated setup

The game can make those mistakes more dramatic through awkward handling, timing pressure, or ship-control difficulty.

But the game should preserve this logic:

- mistakes compromise the run
- compromised runs produce weaker or flagged evidence
- the close-up layer remains the authority on what actually happened

The point is not "you lost."

The point is "your run no longer supports a clean scientific claim."

## Why this matters later

The experimental run is meant to feed later systems that are already part of the long-term plan:

- evidence trays
- revision records
- observed-versus-modeled comparisons
- sentence frames using real run data
- model-building from evidence
- AI training and tool upgrades
- optional scoring tied to evidence-preserving performance

So the game should treat every run as something that may later be used as proof, not as disposable spectacle.

## Current Lesson 1 scientific intent

The current simulation work is focused on Unit 1 Lesson 1 `Mass & Change`.

These first six experiments are about generating evidence around:

- before and after mass
- visible change
- proper measurement timing
- system boundary integrity
- matter entering or leaving a system

The close-up layer should therefore help the player:

- weigh correctly
- run the phenomenon
- reweigh correctly
- notice when the run was compromised

The close-up layer should not directly tell the player the scientific rule.

It should provide the evidence the player will later use to construct or revise that rule.

## What already exists

There is now a project-owned experiment-window host around the Lesson 1 simulations.

Current host pieces:

- `packages/lab-host/runtime/experiment-window-registry.js`
- `packages/lab-host/runtime/experiment-window-shell.js`
- `packages/lab-host/runtime/experiment-window-shell.css`
- `apps/studio/experiment-window/index.html`

There is also an embed harness:

- `apps/studio/experiment-window/embed-demo.html`

## What the game can call right now

The simulation window is callable as an embedded close-up surface.

Launch shape:

- `/apps/studio/experiment-window/index.html?experiment=<id>&mode=embed`

Recommended launch helper:

- `window.RainbowLabHostRegistry.buildLaunchUrl(experimentId, { mode: "embed", parentOrigin: window.location.origin, sessionId })`

Supported experiment ids:

- `unit-01/lesson-01/mass-change/steel-wool-pulled-apart`
- `unit-01/lesson-01/mass-change/ice-to-water`
- `unit-01/lesson-01/mass-change/precipitate`
- `unit-01/lesson-01/mass-change/steel-wool-burns`
- `unit-01/lesson-01/mass-change/sugar-dissolves`
- `unit-01/lesson-01/mass-change/alka-seltzer`

## Current parent-child messaging

When embedded, the child simulation host can post:

- `rainbow.labHost.ready`
- `rainbow.labHost.state`
- `rainbow.labHost.event`
- `rainbow.labHost.interactiveRendered`
- `rainbow.labHost.modelLoaded`
- `rainbow.labHost.error`

The parent can currently send:

- `rainbow.labHost.requestState`
- `rainbow.labHost.focusStage`
- `rainbow.labHost.reload`
- `rainbow.labHost.setExperiment`

This is enough for a proof of concept.

## What state the game can expect

The child host maintains a state object with:

- `experiment`
- `shellMode`
- `procedure`
- `evidence`
- `status`
- `events`

Important evidence fields:

- `currentMass`
- `initialMass`
- `finalMass`
- `deltaMass`
- `measurementStable`
- `boundaryStatus`
- `beforeSnapshot`
- `afterSnapshot`
- `activeMistakeFlags`

Important status fields:

- `host`
- `interactive`
- `model`
- `evidence`

## Important limitation right now

The embed seam exists for all six Lesson 1 experiments, and the shared host contract is now exposed across all six.

That means the game can expect every Lesson 1 experiment window to provide the same general host-readable surface:

- procedure state
- evidence state
- status state
- event stream

However, the `quality depth` still varies.

The strongest current proof-of-concept targets are still:

- `precipitate`
- `steel-wool-pulled-apart`

The remaining four now expose the same host contract, but they are still earlier in visual and interaction polish.

So for the game proof of concept, assume:

- all six are callable and host-readable
- `precipitate` is still the best first full integration target
- `steel-wool-pulled-apart` is still the best second target
- the other four are ready for parallel integration but still need later polish passes

## What the game should build now

Build the room-scale proof of concept around the assumption that the close-up procedure is handed off to the simulation shell.

That means the game should own:

- ship movement
- docking or positioning when the procedure calls for it
- moving, picking up, carrying, and placing actual experiment apparatus or materials
- the mild piloting difficulty of using the ship as the instrument that performs setup actions
- time-window pressure tied to completing the experiment before stabilization expires
- room-scale approach to the apparatus, station, or procedure area
- transition into and out of the zoomed-in experiment view
- HUD-level reaction to simulation messages

The game should not own:

- chemistry logic
- mass truth
- procedure truth
- experiment-specific evidence rules
- the detailed close-up animation of the phenomenon

Those belong to the simulation side.

## What the game should preserve emotionally

The close-up experimental layer should feel like:

- "I am doing the science now"
- "my handling affected what happened"
- "this result counts as evidence"
- "the ship was the awkward tool I used to carry out the procedure"

It should not feel like:

- a decorative cutscene
- a reward screen
- a detachable minigame with arbitrary rules

The larger game can provide danger, urgency, and fun.

The larger game should provide handling challenge in service of the experiment.

The close-up layer provides trust.

## What the game should not assume

Do not assume:

- that the game can manipulate Lab internals directly
- that all six experiments already emit a fully uniform contract
- that scoring, revision, or writing systems are ready
- that the microscopic MD2D layer is part of this proof of concept
- that the zoomed-in view is temporary and will be replaced later

The zoomed-in view is meant to stay.

## Recommended proof-of-concept target

Build one room and one station loop for `precipitate`.

Recommended flow:

1. Player uses the ship to reach the precipitate procedure area.
2. Player uses the ship to bring the needed experiment items into place for the run.
3. Game opens the embedded experiment window for `precipitate` at the close-up stage of the procedure.
4. Game waits for `rainbow.labHost.ready` and `rainbow.labHost.modelLoaded`.
5. Player completes the close-up experiment in the embedded view.
6. Game listens for `rainbow.labHost.state` and `rainbow.labHost.event`.
7. Game closes the zoomed-in view and returns to the room-scale shell.

That is enough to prove the architecture.

## Suggested UI contract for the game

The game should treat the simulation embed like a callable module with three simple states:

- `opening`
- `active`
- `closing`

The game HUD can display child state summaries such as:

- experiment title
- interactive loaded
- current model
- initial mass
- final mass
- delta mass
- active mistake flags

That keeps the main game informed without trying to absorb the close-up interface.

## What the game can assume about visual quality

The simulation side intends to keep the zoomed-in view as the polished apparatus surface.

That means:

- real SVG-authored or otherwise carefully authored apparatus visuals
- readable close-up process animation
- clear measurement and evidence surfaces
- host-readable procedure and evidence state

So the room-scale game does not need to solve close-up chemistry rendering first.

It can assume the zoomed-in experiment view is where the most detailed scientific animation will live.

## Suggested engineering stance

Please build the game proof of concept so that:

- the experiment view is loaded in an iframe or equivalent isolated host surface
- all coordination happens through the documented message bridge
- the game treats the simulation side as authoritative for experiment truth
- the game can swap experiments by changing only the experiment id

If the game-side proof of concept can cleanly open, observe, and close `precipitate`, then the two tracks are aligned correctly.

## Bottom line

The pedagogical simulation side is building:

- the close-up experiment view
- the experiment truth
- the evidence contract
- the polished scientific animation
- the future evidence substrate for revision, writing, and modeling

The game side should build:

- the room-scale shell
- the ship-as-instrument experience
- the transition into that close-up view
- the parent-level HUD and flow around it
- timing and handling challenge that make clean evidence harder to preserve during the procedure

That is the parallel-development contract.
```

## Notes

This handoff is intentionally scoped to the current proof-of-concept stage.

It does not promise:

- full uniformity across all six experiments yet
- finalized scoring or pedagogy systems
- final game-engine choice

It does promise:

- a callable zoomed-in experiment surface
- a parent-child bridge
- a stable conceptual split between room-scale gameplay and close-up experiment truth
