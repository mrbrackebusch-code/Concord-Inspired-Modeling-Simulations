# Animation And Scene Architecture Standard

## Purpose

This document finalizes the animation rules for this repository.

It exists because "use animation" is still too vague. The repo now has enough constraints that animation needs to be treated as an architectural requirement, not as a finishing touch.

This standard defines:

- what an interactive is in this repository
- what should be assumed by default
- how scene objects must be structured
- how animation tooling should be made available
- how future work should self-audit before claiming realism or polish

This note should be treated as a required constraint alongside:

- `docs/architecture/concord-interactive-pedagogy.md`
- `docs/architecture/process-realism-standard.md`
- `docs/architecture/svg-asset-sourcing-and-licensing.md`
- `docs/architecture/verified-svg-source-catalog.md`
- `docs/architecture/mass-change-total-rebuild-plan.md`

## Core Definition

In this repository, an interactive is a witnessed change-experience.

That means:

- the learner acts
- something visibly changes
- evidence emerges through that change
- the learner interprets what they caused

If the learner mainly clicks through prepared endpoints, that is not enough.

If the scene does not visibly develop in response to action, that is not enough.

## Default Assumption

Do not begin from the question:

- "does this need animation?"

Begin from the question:

- "what is changing here, and how should that change be shown?"

The default repository assumption is:

1. every interactive contains meaningful visible change
2. stillness is local and temporary, not the governing design mode
3. anything that could visibly respond in the real setup should be built so it can visibly respond here

This does **not** mean:

- every object wiggles constantly
- every scene needs ornamental motion

It means:

- no important evidence should arrive as a frozen reveal
- the architecture should never pre-classify scene objects as permanently static if they may need to move later

## Keep Interaction Simple, Make Response Rich

The repo-wide animation philosophy is:

`keep interaction simple; make the response rich`

That means:

- do not add interface complexity just to feel advanced
- do not make learners drag or rotate things awkwardly unless that manipulation is the learning action
- once the learner acts, make the result visually rich, physically suggestive, and satisfying to watch

The richness should come from:

- timing
- secondary motion
- material behavior
- believable transfer
- subtle follow-through
- visible cause-and-effect

not from:

- extra buttons
- gratuitous controls
- generic effect overlays

## Motion-Capable By Default

Scene objects should be built as motion-capable by default.

This is a structural rule.

An object may be still at a given moment, but that is a state, not an identity.

### Correct model

- beaker as a scene object with shell, liquid, highlight, and effect anchors
- scale as a scene object with body, display, digits, and possible placement/readout transitions
- steel wool as a scene object with base, glow/residue masks, and separable fragments
- ice as separate blocks/fragments, not a flattened single image
- test tube as shell + liquid + lip/drip anchor + possible tilt/pour state

### Incorrect model

- "static art asset" vs "animated art asset" as separate object categories
- flattening an object into a single picture and then rebuilding it later when motion is finally needed
- treating objects as decorative background until proven otherwise

## Effect-Capable By Default

Every scene should be designed so richer effects are possible without re-architecting the simulation.

That means objects should have:

- clear layering
- stable anchors
- transformable groups
- optional masks
- optional effect attachment points

Examples:

- burn sparks attached to active wool regions
- precipitate cloud anchored to the mixing zone
- bubbles anchored to tablet or liquid regions
- drips anchored to the lip of the pouring vessel
- readout changes attached to the scale event

This does **not** mean every object needs all effects turned on all the time.

It means the scene should not block realism by construction.

## Tooling Availability Rule

The architecture must not deny realism by denying tools too early.

This repository should assume access to:

- Lab for experimental structure, authored UI, measurements, reset, and state coordination
- SVG for object art and object decomposition
- GSAP for timelines and orchestration
- Pixi for particles, fluid-like secondary effects, glow, smoke, sparks, bubbles, and other high-value overlays
- host-page orchestration when Lab JSON alone would be too limiting

The rule is:

- make all serious animation tools available in the architecture
- choose what to use per simulation based on need
- do not cap realism simply because a simpler stack would be easier to author

At the same time:

- do not load every tool into every experience without reason
- runtime usage can stay selective
- architectural availability must stay broad

## Process Structure Requirement

Every meaningful process should be authored as a process, not as a set of endpoints.

Minimum structure:

1. visible start
2. early development
3. active middle
4. late transition or settling
5. readable finish

Important additions when relevant:

- anticipation or onset
- secondary motion
- lingering residue
- end drips
- tapering
- readout response during the event

## Human-Readable Timing

Duration must be long enough to witness.

But the repo standard is stronger than "make it longer."

The process should also:

- have pacing
- have variation
- have enough internal change that time matters
- reveal where the evidence comes from

If a longer version of the scene still feels like a slowed slideshow, it fails.

## Reality-First Detail

This repository should seek beauty by modeling visible detail from reality.

That means:

- melting should model softening, runoff, rounding, and changing fragments
- pouring should model lift, tilt, slosh, stream, receiver response, and final drips
- burning should model ignition, local spread, glow, sparks, residue, and progressive measurement change
- dissolving should model dispersion, concentration zones, and uneven disappearance
- bubbling should model onset, varied bubble growth, liquid response, and lingering gas behavior

The question is not:

- "what is the simplest animation that communicates the idea?"

The question is:

- "what would a careful observer actually see, and how much of that can we responsibly model?"

## Structural Stillness Rule

Stillness is allowed only as a temporary state in a live scene.

Examples:

- a beaker can sit still before being lifted
- a test tube can sit still before pouring
- a scale can sit still between readout changes
- a steel wool pad can sit still before ignition or pulling

But those same objects should still be authored through the same motion-capable scene system.

Do not create a separate "static-only" object pipeline for them.

## Animation Self-Audit

Before approving a process, ask:

1. What is changing here?
2. Where does the learner see that change begin?
3. Does the object keep its identity while changing?
4. Does matter visibly move, transfer, disperse, or transform instead of teleporting?
5. Would orientation, gravity, contact, or settling matter in real life, and are they visible here?
6. Is the process satisfying because it feels observed, or only because something moved?
7. Could this still be mistaken for a dressed-up state swap?
8. Have we identified and improved the single fakest frame?

If those questions do not have strong answers, the animation is not ready.

## Mass & Change Application

For the current suite, this means:

- `Steel wool pulled apart` must include real deformation/separation behavior
- `Ice to water` must show actual melting progression, not icon shrink
- `Precipitate` must show transfer and cloud development, not magical mixing
- `Steel wool burns` must show ignition, spread, residue, and readout progression
- `Sugar dissolves` must show dissolution and fluid differences through motion
- `Alka-Seltzer` must show onset, bubbling, and gas behavior through motion

Every one of these is animation-required by default.

## Definition Of Done For Animation Architecture

The repo's animation rules are being followed only when:

1. every interactive is assumed to be a change-experience
2. scene objects are motion-capable by default
3. effect attachment is possible without re-architecting the scene
4. the toolchain does not artificially cap realism
5. stillness is treated as a temporary state, not a permanent object category
6. beauty is pursued through modeled reality, not arbitrary flair

If any of the above is missing, the architecture is still too weak.
