# Experiment Window System Architecture

## Purpose

This note locks the architectural direction for all experiment windows in this repository.

The repository is no longer building isolated lesson widgets. It is building a reusable close-up experiment system that can sit inside:

- studio authoring flows
- game-hosted encounters
- evidence capture workflows
- later correction and model-building flows

The goal is not only "mount a simulation in a frame."

The goal is:

- one reusable chamber host
- one reusable evidence/event contract
- many experiment-specific phenomena authored inside that host

That is how the repo avoids restarting itself every time a new experiment or game layer appears.

## Immediate Decision

The first production target is still:

`six reusable Lesson 1 experiment windows for Mass & Change`

But their architectural role is now clearer.

They are:

- the close-up scientific truth layer
- the chamber the future game enters
- the evidence source the later thinking/model layer consumes

They are not:

- disposable wrappers around `embeddable.html`
- multi-panel dashboards
- one-off bespoke scenes with no shared contract

## Correct Layering

### 1. Phenomenon Layer

This is the scientific scene itself.

For Lesson 1 this includes:

- steel wool pulled apart
- ice melting
- precipitate formation
- steel wool burning
- sugar dissolving
- Alka-Seltzer reacting

This layer is responsible for:

- apparatus placement
- visible process over time
- experiment-specific manipulation
- procedural integrity rules
- experiment-specific evidence emergence

### 2. Chamber Host Layer

This is the shared project-owned experiment chamber.

It belongs primarily in:

- `packages/lab-host/runtime/experiment-window-shell.js`
- `packages/lab-host/runtime/experiment-window-shell.css`
- `apps/studio/experiment-window/`

This layer is responsible for:

- mounting a stage inside a shared host
- shared chamber geometry and chrome
- shared bridge/event/evidence plumbing
- stable mode support such as `studio`, `embed`, and `game`
- shared transition rules between live experiment and later thinking/revision surfaces

### 3. Evidence And Moment Contract

This is the shared surface that later systems read.

It is the bridge between:

- the chamber
- the game shell
- the thinking/CER board
- later model correction and AI training layers

### 4. Game Layer

This layer owns:

- piloting
- collection
- hazards
- docking
- chamber entry
- mission pressure

It should read the shared host contract, not replace it.

### 5. Thinking / Model Layer

This layer owns:

- evidence arrangement
- claim/evidence/reasoning construction
- model correction
- readable model growth or revision state

It should consume captured evidence from the chamber rather than inventing a separate truth source.

## Chamber-First Rule

Every experiment window should now be treated as:

`one chamber, one live scene, one evidence source`

That means the shared chamber should not be authored as a farm of separate cards and panels.

### The chamber should read as:

- one continuous interior
- open at the top when material enters from above
- apparatus mounted low enough to feel grounded
- side and bottom walls defining the space
- actors such as the Eye/camera and DeeDee living in the same scene
- bottom-rail cue text that supports the scene without covering it

### The chamber should not read as:

- a page of boxed widgets
- a giant title card above the apparatus
- a separate "simulation rectangle" floating inside a bigger panel
- a dashboard where the scene is just one component among many

The chamber is the thing.

The interface should emerge from what is happening inside it.

## Shared Chamber Surfaces

Every experiment chamber should converge on the same reusable surfaces.

### 1. Chamber Interior

The physical scene volume.

This is the background architecture of the chamber, not the experiment-specific process.

### 2. Apparatus Zone

The experiment-specific setup:

- scale
- beaker
- tray
- vial
- reaction vessel
- stretch frame
- heat bay

This is where the phenomenon-specific stage art and motion live.

### 3. Actor Layer

Shared in-world actors such as:

- the Eye / camera
- DeeDee the data drone

These should feel like chamber inhabitants, not detached UI panels.

### 4. Bottom Status Rail

This is where action guidance belongs.

Rule:

- in-scene hotspot shows `where`
- bottom rail shows `what`

Do not float directive text in the middle of the apparatus scene.

### 5. Evidence Bridge

The chamber must be able to emit readable evidence and events to the host.

### 6. Thinking Handoff Surface

In `game` mode, the thinking/CER board should live outside the chamber on the game side.

The chamber remains the evidence source.

The thinking board becomes the interpretation surface.

## Shared Phase Contract

Future chambers should be authored against the same high-level phase grammar.

1. `receive`
   Material or apparatus enters the chamber.
2. `stage`
   The setup becomes ready for measurement or process.
3. `measureBefore`
   Initial evidence is gathered.
4. `run`
   The phenomenon unfolds visibly.
5. `measureAfter`
   Final evidence is gathered.
6. `review`
   The run is complete and evidence is available.
7. `think`
   The player builds the correction from gathered evidence.
8. `install`
   The completed correction is committed into the model.

Not every experiment will use every phase in the same way.

But if a future chamber completely ignores this grammar, it should be treated as suspicious.

## Shared Interaction Grammar

The shared verbs should stay narrow and reusable:

- `grab`
- `place`
- `Record`
- `Run`
- `Pour`
- `Pull`
- `Heat`
- `Reset`

The chamber may expose those through direct click targets or in-world apparatus cues, but the control language should stay stable.

## Shared Host Contract

The host contract already has the correct direction.

Registry metadata should continue to live in:

- `packages/lab-host/runtime/experiment-window-registry.js`

Bridge and state plumbing should continue to live in:

- `packages/lab-host/runtime/experiment-window-shell.js`

At minimum, chambers should keep exposing:

- `procedure`
- `evidence`
- `status`
- `events`

And host-readable events such as:

- `onObjectPlaced`
- `onMeasurementStable`
- `onMassRecorded`
- `onRunStarted`
- `onRunCompleted`
- `onSnapshotCaptured`
- `onSpill`
- `onLeak`
- `onGasEscaped`
- `onMatterEntered`
- `onEvidenceLocked`

If a later feature cannot read from this contract, it is too tightly coupled.

## Editability By Key Moments

The repository should now optimize for:

`edit the key moments, not the whole chamber`

That means a new or revised experiment should primarily be authored by editing:

- registry metadata
- apparatus configuration
- experiment-specific hit targets
- moment timing and choreography
- evidence source definitions
- cue copy
- CER prompt structure

What should not happen:

- each stage reimplements its own chamber shell
- each stage invents its own evidence storage metaphor
- each stage invents its own actor language from scratch
- each experiment becomes a bespoke architecture instead of a bespoke phenomenon

## Responsibility Split

### The chamber host should own

- chamber frame and geometry
- shared actor slots and actor styling
- bottom rail and cue placement rules
- host bridge API
- mode-specific layout decisions
- shared transitions into thinking mode

### The stage should own

- apparatus art
- experiment-specific process animation
- experiment-specific click targets
- experiment-specific cue copy
- emitted evidence values and experiment events
- phenomenon-specific timing and realism

This is the main boundary that keeps the repo coherent.

## Extraction Targets

Before too many more experiments are deepened, shared behavior should be extracted from the current ice prototype into reusable utilities.

Priority targets:

- hotspot/cue helpers
- Eye / DeeDee actor choreography helpers
- evidence token storage and flight helpers
- thinking-board / CER helpers
- phase and moment helpers such as receive, measure, run, and install

Those extractions do not all need to happen immediately.

But they do need to become the plan, otherwise the repo will drift back into one-off stage logic.

## Phase Plan

### Phase 1: Stabilize The Shared Chamber Contract

Deliver:

- corrected docs
- stable shared host contract
- chamber-first layout rules
- consistent cue grammar

### Phase 2: Extract Reusable Chamber Helpers

Deliver:

- shared actor helpers
- shared hotspot helpers
- shared evidence token helpers
- shared thinking-board helpers

This is the step that turns the ice prototype into a system.

### Phase 3: Migrate Remaining Lesson 1 Experiments

Deliver:

- all six experiments on the same chamber grammar
- shared event/evidence contract across all six
- shared thinking-board compatibility

### Phase 4: Expand Game Mode

Deliver:

- ship/world shell reading the same host contract
- chamber entry and exit
- evidence-to-thinking transition
- model correction loop using captured evidence

### Phase 5: Later Microscopic Expansion

Deliver:

- microscopic views where instructionally appropriate
- MD2D-backed model-space interactions
- shared linkage between macro evidence and model revision

## Working Rule

The working rule for future work is:

`the chamber is reusable, the phenomenon is specific, and the learner edits the model by acting on evidence that came out of the chamber`

If a draft breaks that rule, it should be redesigned before more polish is added.
