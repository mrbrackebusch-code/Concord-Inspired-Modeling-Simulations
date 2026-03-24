# Experiment Chamber Authoring Standard

## Purpose

This note exists to stop future chamber work from becoming a collection of bespoke one-offs.

The chamber system should scale by changing:

- apparatus
- key moments
- evidence sources
- dialogue lines
- correction prompts

It should not scale by rebuilding the host architecture for each experiment.

The rule is:

`author the experiment by editing staged moments, not by rewriting the chamber`

## What Every Chamber Should Inherit

Every experiment chamber should inherit the same baseline structure.

### Shared physical composition

- one continuous chamber interior
- open top when materials enter from above
- side and bottom walls with consistent thickness language
- apparatus mounted low in the chamber
- no floating boxed "simulation pane" inside the chamber

### Shared scene language

- the Eye/camera is an in-world observer, not a panel
- DeeDee is an in-world data drone, not a menu
- guidance lives in the bottom rail, not across the middle of the apparatus
- evidence capture is visible and desirable
- thinking happens after evidence capture, not before

### Shared game relationship

- chamber stays the evidence source
- game overworld handles retrieval, transport, and setup
- thinking/model correction lives outside the chamber in game mode

## The Minimum Authoring Contract

When a new chamber is authored, the experiment-specific file should mainly define:

### 1. Apparatus map

- what objects are present
- what is clickable
- what can visibly change
- what must be measured

### 2. Key moments

These are the editable moments that drive the experiment.

Typical examples:

- sample received
- setup ready
- initial mass recorded
- process started
- process visibly underway
- process complete
- final mass recorded
- evidence locked

### 3. Evidence sources

The stage should declare what counts as capturable evidence.

Typical types:

- `mass`
- `process`
- `boundary`
- `matter-entered`
- `matter-left`
- `mistake-flag`

### 4. Actor reactions

The stage should define what the Eye and DeeDee react to, not reimplement those actors completely.

Typical reactions:

- Eye focus target changes
- Eye flash / charge response
- DeeDee hover excitement
- DeeDee scan pass
- DeeDee evidence storage

### 5. Thinking prompt structure

The stage should define:

- what evidence is needed for the correction
- what sentence slots or conclusion choices are available
- what makes the correction coherent enough to install

## Standard Phase Flow

Every chamber should be authorable against this shared flow, even if some phases are lightweight.

1. `receive`
2. `stage`
3. `measureBefore`
4. `run`
5. `measureAfter`
6. `review`
7. `think`
8. `install`

This gives the repo a reusable grammar.

It also makes later tooling possible.

## Standard Actors

### The Eye

The Eye is not the explainer.

It should:

- hold the unstable assumption
- frame the investigation question
- focus visibly on important chamber events
- react when evidence is gathered
- show model charge or trust growth

It should not:

- state the conclusion
- turn into a generic title card
- replace the learner's reasoning

### DeeDee

DeeDee is not the one doing the science for the learner.

She should:

- help the learner notice what can be collected
- visibly gather evidence after the learner acts
- store captured evidence tokens
- later return those tokens for CER/model correction

She should not:

- do every click for the learner
- become the only interaction target
- replace apparatus agency

## Standard Evidence Behavior

Evidence should not feel like text magically appearing in a log.

Evidence capture should follow this pattern:

1. learner interacts with a real apparatus source
2. the source responds visibly
3. DeeDee harvests an evidence token
4. the Eye reacts
5. the token remains stored for later use

The token should stay readable and recoverable.

That is what makes evidence capture feel valuable and reusable.

## Standard Cue Grammar

Use this rule consistently:

- apparatus highlight answers `where`
- bottom rail answers `what`

Do not create:

- floating directive cards in the center of the scene
- clickable instruction labels
- large top-of-scene banners that dominate the apparatus

## Standard Thinking Board Relationship

The thinking board should consume evidence from the chamber.

It should not recreate the experiment.

In `game` mode, the preferred relationship is:

- chamber stays on the right as the evidence source
- game/overworld side becomes the thinking/model board
- experiment play fades the overworld
- thinking mode darkens the world further and gives correction more weight

This is the current target pattern for Lesson 1.

## Repo Structure Expectations

Current shared surfaces:

- `packages/lab-host/runtime/experiment-window-shell.js`
- `packages/lab-host/runtime/experiment-window-shell.css`
- `packages/lab-host/runtime/experiment-window-registry.js`
- `packages/lab-host/runtime/custom-stages/*.js`

Current integration example:

- `apps/studio/game-poc/`

Shared extraction targets that should become real code surfaces:

- chamber actor helpers
- hotspot and cue helpers
- evidence token helpers
- thinking-board helpers
- phase/moment helpers

Do not bury shared solutions inside one experiment stage if they will be needed by the next three.

## Editable By Changing These Things

If the architecture is healthy, future chamber edits should mostly mean changing:

- apparatus SVG/art and anchors
- moment list and timing
- cue copy
- evidence token definitions
- actor reaction mapping
- CER prompt structure
- registry metadata

If a future agent has to redesign the chamber shell for each new experiment, the architecture has failed.

## Anti-Patterns

- treating the chamber like a generic app panel
- building a separate UI card for every function
- letting every experiment invent its own evidence metaphor
- solving one experiment with a clever hack that the next experiment cannot reuse
- letting stage-specific code own shared actor behavior
- teaching the conclusion in the chamber copy

## Working Rule

The authoring rule for future work is:

`make the phenomenon specific, keep the chamber shared, and make evidence reusable`

That is how this repo becomes editable by changing key moments instead of accumulating scattered one-offs.
