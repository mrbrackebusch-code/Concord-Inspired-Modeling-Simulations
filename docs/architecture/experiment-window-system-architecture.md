# Experiment Window System Architecture

## Purpose

This note locks the immediate architectural shift for Unit 1 Lesson 1 and the simulations that follow it.

The repository is no longer aiming only at "better standalone animations."

It is now aiming at a reusable **experiment-window system** that can eventually support:

- apparatus simulations
- evidence capture
- model revision
- AI-assisted writing and reflection
- game progression
- later MD2D-driven atom and molecule control

The important constraint is that we are **not** building all of those layers at once.

We are building the right foundation now so later layers do not require a restart.

## Immediate Decision

The first production target is:

`six reusable Lesson 1 experiment windows for Mass & Change`

These are the first real instances of a larger system, not one-off special cases.

That means the current Lesson 1 work should be reinterpreted as:

- an apparatus layer now
- a game-ready substrate later

## The Correct Separation Of Responsibilities

### 1. Phenomenon Layer

This is the scientific scene itself.

For Lesson 1 this includes:

- steel wool pulled apart
- ice melting
- precipitate formation
- steel wool burning
- sugar dissolving
- Alka-Seltzer reacting

In the current repo, these are authored as Concord Lab / MD2D interactives under:

- `simulations/unit-01/lesson-01/mass-change/`

The phenomenon layer is responsible for:

- object placement and motion
- visible process over time
- measurement choreography
- procedural integrity rules
- optional future particle/model views

### 2. Experiment Window Shell

This is the shared project-owned host around the phenomenon layer.

It belongs in:

- `packages/lab-host/`
- `apps/studio/` for launch surfaces

The shell is responsible for:

- mounting a Lab interactive
- showing shared experiment-window chrome
- providing shared regions and layout
- exposing a stable host API for evidence, events, and later game systems

The shell should own the reusable frame, not the simulation-specific choreography.

### 3. Evidence Contract

This is the standard data surface that all experiment windows must eventually expose.

It is the bridge between:

- the apparatus simulation
- model-validation workflows
- writing scaffolds
- AI training interactions
- game systems

### 4. Game Layer

This does **not** ship now.

It will later consume the same evidence and event contract for:

- challenge logic
- progression
- revision loops
- AI upgrade systems
- scoring and optional gamification

### 5. Model-Building And Writing Layer

This also does **not** ship now.

It will later consume the evidence contract for:

- sentence frames
- drag/drop explanation builders
- revision prompts
- observed-versus-modeled comparisons
- live student-built model playback

## What We Build Now

The immediate scope is intentionally narrow.

### Build now

- a reusable experiment-window shell
- a registry of Lesson 1 experiment-window definitions
- a studio route that loads current interactives through the shell
- a host-side event bridge API
- a documented evidence and event contract
- the first migration path away from naked `embeddable.html` redirects

### Do not build now

- narrative wrapper
- RPG structure
- unlock tree
- scoring layer
- AI writing assistant
- revision grading logic
- suit integrity timer
- top-down world navigation
- atom-control gameplay

Those can only be added safely after the experiment-window layer is stable.

## Experiment Window Regions

Every experiment window should converge on the same shared layout:

1. `Main apparatus stage`
   The live experiment scene and direct manipulation area.
2. `Object tray`
   The materials or objects relevant to the current experiment.
3. `Procedure rail`
   Ordered steps with visible completion state.
4. `Instrument / readout panel`
   Mass readout, stability, trial state, boundary state.
5. `Evidence tray`
   Initial/final values, snapshots, event flags, later notes.
6. `Briefing panel`
   Context, operator prompt, or challenge framing.

The first host implementation may contain placeholders where the current interactives have not yet exposed the needed hooks. That is acceptable.

What is not acceptable is pretending those hooks already exist when they do not.

## Zoom-Level Rule

The current experiment-window build should be treated as a `zoomed-in platform view`.

That means the Lesson 1 shell is not a disposable UI that will later be replaced by a game.

It is the close-up view of the player's experiment platform, bench, or ship-mounted apparatus area.

Later, a room-scale or mission-scale game layer can zoom out to show:

- navigation
- hazards
- supply collection
- docking
- route planning

Then it can zoom back in to the same experiment-window substrate for the actual scientific procedure.

This rule matters because it keeps the present build relevant to the future game:

- the close-up apparatus remains the source of experimental truth
- the room-scale layer adds context and challenge
- neither layer needs to be thrown away

The close-up view should therefore be callable as a reusable host surface from the start.

That means a future main game should be able to:

- open a specific experiment window
- receive readiness and evidence updates
- switch experiments
- return to the room-scale layer

without reimplementing the experiment shell.

## Shared Interaction Grammar

The shell and its child experiments should converge on the same verbs:

- `drag/drop`
- `snap into slot`
- `click/grab`
- `hold to stabilize`
- `Record`
- `Run`
- `Capture`
- `Reset`

Consistency here matters because later model-building, tutorials, and game systems should not have to relearn the control language for each experiment.

## Standard Host Event Contract

All experiment windows should eventually expose host-readable events such as:

- `onObjectPlaced`
- `onStepCompleted`
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

The first host implementation should provide the API and event stream even if only a few lifecycle events are emitted initially.

## Standard Evidence Contract

Each completed run should eventually be able to produce at least:

- `experimentId`
- `setupState`
- `initialMass`
- `finalMass`
- `deltaMass`
- `measurementStable`
- `boundaryStatus`
- `spillFlags`
- `leakFlags`
- `escapeFlags`
- `beforeSnapshotId`
- `afterSnapshotId`
- `particleSnapshotIds`
- `procedureCompletionState`

This is the core bridge to later systems.

If a future feature cannot read from this contract, it is probably coupled too tightly to one simulation.

## Phase Plan

### Phase 1: Host Shell Foundation

Deliver:

- project-owned experiment-window shell
- experiment registry
- studio launch through the shell
- visible placeholders for procedure, evidence, and event streams

This phase is about structure, not full parity with the final game vision.

### Phase 2: Evidence And Procedure Migration

Deliver:

- shared procedure-state updates
- shared readout / stability / boundary outputs
- per-experiment mistake detection and flags
- before/after evidence capture surfaces

This phase makes the shell operational rather than decorative.

### Phase 3: Revision And Reflection Systems

Deliver:

- observed-versus-modeled comparison
- evidence breakpoints
- revision records
- structured reflection prompts

This phase turns the experiment windows into learning engines rather than just apparatus scenes.

### Phase 4: Game Systems

Deliver:

- challenge framing
- progression logic
- optional scoring and badges
- AI training interactions
- tool upgrades and world-state consequences

This phase sits on top of the experiment-window substrate rather than replacing it.

For the specific one-ship / station-based game direction, read:

- `docs/architecture/ship-station-gameplay-architecture.md`

### Phase 5: MD2D Expansion For Microscopic Play

Deliver:

- particle-level scenes where instructionally appropriate
- atom / molecule manipulation
- hybrid host overlays for richer effects and controls
- tighter integration between macro evidence and MD2D model-space behavior

This phase is where the repo begins turning Lesson 1 foundations into deeper chemistry gameplay.

## MD2D Role In This Architecture

MD2D is not only a future atom playground.

It has two roles:

### Now

- serve as a macroscopic scene compositor for Lesson 1
- keep Concord Lab compatibility
- preserve direct-manipulation and timed process behavior

### Later

- support microscopic model views
- support atom and molecule control where the curriculum actually wants it
- feed the game layer with real model state rather than fake particle overlays

The architecture should therefore preserve MD2D as a model core, even when the host shell becomes richer.

## Working Rule For This Shift

The rule for the next implementation passes is:

`build the experiment window and contract first, then let later systems read from it`

Do not skip to the game wrapper.

Do not skip to AI writing.

Do not skip to atom-control gameplay.

Those become tractable only if the experiment layer is clean, reusable, and event-rich first.

The ship-mode game should therefore be treated as:

- a new host mode that reads the shared contract
- a station and mission layer on top of the same experiment truth
- not a replacement for the apparatus layer
