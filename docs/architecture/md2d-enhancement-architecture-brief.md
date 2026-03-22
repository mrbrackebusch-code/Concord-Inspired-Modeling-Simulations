# MD2D Enhancement Architecture Brief

## Purpose

This note answers a repo-level question:

How far can we push Concord Lab + MD2D if we stop treating the default MD2D presentation as the ceiling and instead treat MD2D as a model core inside a richer scene and effects architecture?

The local codebase says the answer is: farther than the default examples suggest, but not by staying inside plain interactive JSON alone.

## Pedagogical And Animation Constraints

Any enhanced MD2D work in this repo still has to obey the same standards as the macroscopic Lesson 1 work:

- Concord value comes from `student action -> visible consequence -> evidence -> student interpretation`.
- Animation is not decorative filler. It has to clarify causation and preserve trust.
- Effects must stay attached to the thing causing them.
- Timing has to be human-readable.
- "Beautiful" is acceptable only when it is reality-first or model-first, not just flashy.
- Representation level still matters. If the lesson should stay macroscopic, enhanced MD2D should not force particles in early.

The enhancement question is therefore not "how do we make MD2D look cooler?"

It is:

- how do we make MD2D more alive, readable, responsive, and convincing
- while preserving scientific meaning
- without letting spectacle replace evidence

## Current Repo Reality

The current project-owned wrapper is intentionally thin:

- `apps/studio/interactives/unit-01/lesson-01/*/index.html` mostly redirects straight into `vendor/lab/dist/embeddable.html#...`
- `packages/lab-host/README.md` is still a contract, not a real integration package
- `vendor/lab/dist/embeddable.js` instantiates `new Lab.InteractivesController(...)` directly and mounts into `#interactive-container`

So the repo does not yet have a serious host-layer orchestration system around Lab. That matters because most of the ambitious enhancement ceiling lives in a stronger host page, not in authored JSON alone.

There is also an important correction to the usual assumption about MD2D:

- this repo is already using MD2D as a lightweight scene compositor, not just as a particle viewer
- `simulations/unit-01/lesson-01/mass-change/models/ice-to-water.json` uses layered `images`, `textBoxes`, and `shapes` with zero atoms
- the current Lesson 1 work proves MD2D can already function as an SVG stage with authored layers and timed scripts

That means the local evidence does not support the claim that MD2D is only "little circles in a box."

## Concise Summary

### What MD2D does out of the box

- Simulates atoms, bonds, obstacles, electric fields, and related molecular dynamics state.
- Renders an SVG-based scene with multiple internal layers.
- Supports authored `shapes`, `lines`, `images`, `textBoxes`, atom traces, VDW lines, velocity vectors, force vectors, and electric-field visuals.
- Supports scriptable `onLoad`, `callAt`, `callEvery`, `onPropertyChange`, click handlers, select handlers, atom drag handlers, batch updates, and atom property transitions.
- Supports embedding and host-page communication through `InteractivesController`, `ParentMessageAPI`, and `Lab.IFramePhone`.

### What MD2D does not really do out of the box

- It does not ship with a modern effects pipeline for glow, trails, postprocessing, particles, shaders, or cinematic layering.
- It does not expose first-class collision or reaction FX events.
- It does not provide a project-owned overlay architecture in this repo.
- It does not provide robust drag support for arbitrary non-atom scene objects.
- It does not make it easy to create rich runtime shapes and lines from standard interactive scripts even though the underlying model supports them.
- It remains an SVG renderer, not a high-performance sprite or fluid renderer.

## Capability Split

### What MD2D already does natively

Confirmed in `vendor/lab/dist/lab/lab.js`:

- MD2D view is an SVG scene graph built on `common/views/svg-container` plus `md2d/views/renderer`.
- The renderer creates distinct internal layers:
  - `field-visualization`
  - `shape-container-below`
  - `image-container-below`
  - `text-container-below`
  - `radial-bonds-container`
  - `vdw-lines-container`
  - `main-container`
  - `shape-container-top`
  - `line-container-top`
  - `image-container-top`
  - `text-container-top`
  - `icon-container`
- Shapes support at least `rectangle` and `ellipse`, plus line color, dash pattern, visibility, and `layerPosition`.
- Lines support custom arrowhead path data via `endStyle`, line dashes, weight, and layering.
- Images can be placed in top or bottom layers and ordered with `imageLayerPosition`.
- Images and text boxes can be attached to atoms or obstacles with host coordinates.
- Text boxes support frames, callouts, rotation, width, height, color, anchoring, and host attachment.
- Electric-field arrows, atom traces, charge shading, KE shading, and vector overlays already exist.
- Atom dragging in running models is implemented with live spring-force behavior, not just a naive coordinate jump.
- Atom motion can be smoothly animated with `atomTransition()`.

Local examples confirm these are real authoring features, not dead code:

- `vendor/lab/dist/imports/legacy-mw-content/converted/interactions/mixing-liquids/continuous.json`
- `vendor/lab/dist/imports/legacy-mw-content/converted/sam-activities/intermolecular-attraction/original-interactives-in-pages/page2/npPulling.json`
- `simulations/unit-01/lesson-01/mass-change/models/ice-to-water.json`

### What Lab wrappers can do around MD2D

Confirmed in `vendor/lab/dist/lab/lab.js`, `vendor/lab/dist/embeddable.js`, and the repo wrappers:

- `Lab.InteractivesController` can load an interactive, merge model and view options, load alternate models, serialize interactive state, and expose lifecycle events.
- Interactive JSON can run `onLoad` scripts per model state and coordinate UI behavior with model state.
- The universal scripting API gives access to:
  - `get`, `set`
  - `loadModel`
  - `callAt`, `callEvery`
  - `onPropertyChange`
  - `onClick`, `onDrag`, `onSelect`
  - `start`, `stop`, `reset`, `stepForward`, `stepBack`, `tick`
  - `repaint`
- The MD2D-specific scripting API adds access to atoms, obstacles, bonds, electric fields, text boxes, solvent changes, energy queries, marking, tracing, and atom transitions.
- Embedding supports `postMessage` orchestration through `ParentMessageAPI` and `Lab.IFramePhone`.
- The parent host can already:
  - load a new interactive or model
  - request interactive state
  - request model state
  - observe properties
  - set properties
  - trigger `play`
  - trigger `tick`
  - subscribe to model dispatch events and receive selected property payloads

### What can be added through an external enhancement layer

Confirmed by the current DOM and container structure, plus inferred from normal host-page control:

- A project-owned host page can mount Lab into a normal DOM container instead of meta-refreshing into `embeddable.html`.
- That host page can place additional SVG, HTML, Canvas, or Pixi layers above or below the MD2D container.
- Those layers can stay synchronized by reading:
  - controller lifecycle events
  - model properties
  - model dispatch events
  - model time
  - model-to-pixel transforms from `modelContainer.model2px` and `modelContainer.model2pxInv`
- GSAP can orchestrate host-side timelines without changing the scientific model.
- Pixi or Canvas can render higher-frequency effects that would be awkward or slow in the native SVG layer.
- Shaders are not part of MD2D, but a host-owned WebGL layer is architecturally plausible.

This is not a purely speculative pattern. The same Lab distribution already uses hybrid SVG plus Canvas/WebGL layering in Energy2D. MD2D does not ship that way, but the broader framework shows that Lab itself is not philosophically limited to single-layer SVG rendering.

## Real Extension Seams

### 1. `packages/lab-host/`

This is the right project-owned seam.

Right now it is only a README contract. If the repo wants "MD2D enhanced mode," this package should become the real loader instead of keeping the current meta-refresh launcher pattern.

### 2. `Lab.InteractivesController`

This is the main runtime seam for:

- model load and reload
- lifecycle callbacks
- access to the model controller
- access to the scripting API
- layout and resize integration

This is the cleanest supported entry point.

### 3. `common/views/svg-container`

This is the most important view seam.

It exposes:

- the containing DOM element
- the root SVG
- the viewport group
- model-to-pixel scale functions
- repaint and resize
- custom click, select, and drag handler hooks

This is enough to synchronize a serious overlay system without guessing screen coordinates.

### 4. `md2d/views/renderer`

This is the native visual seam.

It already has a layered internal scene graph, but it is still a vendored runtime file. That makes it a seam with high power and high maintenance cost.

Use it only when the host layer truly cannot deliver the needed result.

### 5. `ParentMessageAPI` and `Lab.IFramePhone`

This is the safest decoupled synchronization seam when MD2D is running inside an iframe.

It is good for:

- property synchronization
- state snapshots
- dispatch-event forwarding
- host-page overlays that do not need direct internal object access

It is weaker for:

- ultra-high-frequency sampling
- non-exposed internal structures
- rich bidirectional control beyond the small message API

### 6. Unsupported but real internals

There are also unstable seams:

- the runtime leaks a global `model` in some controller paths
- internal SVG class names can be targeted directly
- model internals support more than the public scripting API exposes

These are real, but they are not strong foundations for repo-wide architecture unless wrapped behind a project adapter and treated as unstable.

## Where MD2D Feels Limited

### Particle rendering

Native MD2D particles are SVG circles and paths with useful but limited styling:

- gradients
- charge shading
- KE shading
- traces
- vector arrows
- optional glow in quantum-dynamics paths

This is enough for readable science graphics.

It is not enough for:

- rich motion trails
- convincing collision flashes
- depth-rich glow and bloom
- heat haze
- density fog
- modern sprite-style accenting

### Event richness

The MD2D model dispatch surface is narrow:

- `tick`
- `addAtom` / `removeAtom`
- `addRadialBond` / `removeRadialBond`
- electric-field add/remove/change
- `removeAngularBond`
- `invalidation`
- `textBoxesChanged`

There is no first-class collision event, no first-class "reaction emphasis" event, and no high-level effect semantics.

If we want collision pulses, bond-strain halos, or reaction blooms, we will usually have to derive them from model state or add new runtime hooks.

### Runtime object manipulation

The underlying MD2D model supports `addShape` and `addLine`, but the standard MD2D scripting API exposed to authored scripts does not. It exposes `setShapeProperties` and `setLineProperties`, but not the runtime creation helpers.

That means authored JSON scripts can do some dynamic scene work, but not all of it.

### Non-atom interaction

`setDragHandler` is effectively atom-oriented in the shipped renderer.

That is good for pulling atoms or hidden handles attached to structures.

It is weak for:

- arbitrary drag affordances on scene objects
- richer manipulation widgets
- non-atom handles with custom hit areas

### Pure-SVG ceiling

You can push SVG further than the default examples do.

But the ceiling is still real:

- too many animated nodes will hurt
- heavy effect layering will get expensive
- some high-frequency spectacle simply belongs in Canvas or Pixi instead

## How To Overcome Those Limits

### Layer animated SVG above and below MD2D

Yes.

Confirmed path:

- MD2D already renders inside a normal `div#model-container`
- the model container sits inside a normal interactive container
- the internal renderer also already has top and bottom SVG groups

Practical recommendation:

- use a project-owned underlay SVG for broad ambience or background envelopes
- use a project-owned overlay SVG for precise model-anchored callouts, halos, path highlights, and handles
- keep the native MD2D SVG focused on truthful primary representation

### Use host-page overlays synchronized to MD2D state

Yes.

This is the highest-value move.

Use either:

- direct controller access in a project-owned host page
- or `postMessage` synchronization in iframe mode

Good candidates:

- collision pulses
- hover and selection halos
- focus framing
- bond-stretch emphasis
- drag affordance handles
- explanatory but evidence-safe labels

### Augment MD2D events with richer effects

Yes, but usually by derived events rather than native events.

Examples:

- derive "high-energy near collision" from distance and relative velocity
- derive "bond under stress" from current bond length versus rest length
- derive "reaction zone emphasis" from bond creation or removal plus local motion
- derive "field intensity glow" from electric-field vector magnitude

If these become core patterns, the repo should standardize them rather than re-deriving them ad hoc per simulation.

### Make particle views feel more alive or expressive

Yes, within honesty limits.

Good enhancements:

- short velocity-proportional trails
- brief collision ripples tied to actual impact heuristics
- bond-stress color ramps or halo pulses
- local focus glow for selected atoms or molecules
- field overlays that clarify invisible forces
- interactive handles that make drag affordances obvious

Bad enhancements:

- arbitrary squash and stretch
- fake fluid motion disconnected from particle state
- cinematic blur that hides evidence
- energy or charge glows that are not derived from actual state

### Preserve scientific meaning while improving spectacle

Possible, but only if effect rules are explicit.

A good rule is:

- every visible enhancement should be traceable to a model quantity, a user action, or a clearly declared representational abstraction

That keeps "alive" from drifting into "dishonest."

## Prioritized Augmentation Techniques

### 1. Build a real project-owned MD2D host in `packages/lab-host/`

Value:

- highest

Risk:

- low

Why:

- the repo currently has almost no host architecture
- this unlocks every other safe enhancement path
- it avoids forking vendor code too early

### 2. Push native MD2D scenegraph features harder before forking

Value:

- high

Risk:

- low

Examples:

- more deliberate use of `shapes`, `lines`, `images`, `textBoxes`, `layerPosition`, callouts, and host-attached visuals
- more use of `atomTransition`, `callAt`, `callEvery`, live drag, and model-driven runtime mutation

Why:

- the local repo is already proving this works
- it captures value that the default examples underuse

### 3. Add a synchronized overlay SVG and HTML layer

Value:

- high

Risk:

- medium-low

Examples:

- highlights
- labels
- handles
- bond emphasis
- collision rings
- selection framing

Why:

- this is the best balance of power, maintainability, and truthfulness

### 4. Add a Canvas or Pixi effects layer above MD2D

Value:

- high

Risk:

- medium

Examples:

- motion trails
- glow
- sparks
- field fog
- denser particle accents

Why:

- this takes the workload off SVG
- it makes fast micro-effects feasible

### 5. Build a derived-event bridge for collisions, bond stress, and local state changes

Value:

- medium-high

Risk:

- medium

Why:

- MD2D does not give effect-friendly events directly
- a reusable derived-event layer would let future simulations share the same logic

### 6. Add carefully chosen vendor patches to expose better hooks

Value:

- medium

Risk:

- medium-high

Good patch targets:

- public bridge to the active model state
- explicit add/remove events for shapes and lines
- better non-atom interaction hooks
- cleaner exposure of renderer layer roots

Why:

- do this only after host-layer work proves the need

### 7. Fork or replace the MD2D renderer for a custom WebGL-style particle presentation

Value:

- potentially very high

Risk:

- very high

Why:

- this is the true "ceiling push" option
- it is also the fastest way to create a maintenance burden the repo does not want yet

## Future Use Cases Where Enhancement Matters

### Stronger molecular collision visuals

- high-energy collisions could generate brief impact pulses or directional streaks
- collision density could be made legible without changing the actual particle dynamics
- selected particles could reveal motion and interaction patterns much faster

### Richer phase-change visuals

- MD2D atoms could drive overlays for condensation envelopes, frost zones, or liquid-region emphasis
- this is powerful, but it also has the highest honesty risk because continuous visuals can imply more certainty than the particle model actually shows

### Bond and reaction emphasis

- bond stretch can be highlighted before breakage
- bond formation can receive a brief, restrained emphasis pulse
- reaction regions can be made easier to track in dense motion

### Glow, trails, highlights, and field overlays

- electric-field visualization can be more expressive than the default arrows
- high-energy particles can get subtle state-derived trails
- selected or important molecules can become easier to follow

### Better interaction affordances

- drag handles can be visually explicit
- hidden "control atoms" can be masked by cleaner overlay affordances
- selection and pull tasks can feel more intentional and less like internal debug behavior

## Risks

### Pedagogical drift

Risk:

- the enhancement layer becomes the lesson instead of serving the lesson

Mitigation:

- require every enhancement to name the evidence path it supports

### Visual dishonesty

Risk:

- overlays imply physics the model is not actually computing

Mitigation:

- classify each enhancement as either state-derived or representational abstraction
- require cause attachment
- reject effects that hide uncertainty

### Performance problems

Risk:

- SVG plus overlay plus Lab layout plus high atom counts can get expensive fast

Mitigation:

- establish budgets
- allow enhancement fallbacks
- prefer Canvas or Pixi for dense high-frequency effects

### Architecture complexity

Risk:

- too many one-off hacks in interactive scripts and host pages

Mitigation:

- centralize enhancement plumbing in `packages/lab-host/`
- use reusable enhancement modules instead of per-simulation improvisation

### Maintenance cost

Risk:

- a vendor fork becomes the hidden product

Mitigation:

- keep vendor patches minimal and documented
- prefer wrapper and overlay solutions first

## Recommendation

This repo should explicitly support an `MD2D enhanced mode`.

But it should do so in a disciplined order:

- make `packages/lab-host/` real
- mount Lab directly in a project-owned host page
- add standardized overlay roots and synchronization helpers
- use the existing MD2D scenegraph harder
- only then patch vendored MD2D if the wrapper approach hits real blockers

I would not recommend treating enhanced MD2D as a pile of one-off `onLoad` scripts.

I would recommend treating it as a repo feature.

## Recommended Architecture

### Core idea

Keep the scientific model in MD2D.

Move visual ambition into a project-owned host runtime that can layer additional representation around the model without corrupting the model itself.

### Proposed pieces

`packages/lab-host/loader`

- resolves simulation paths
- creates `Lab.InteractivesController`
- exposes the mounted controller to project code

`packages/lab-host/md2d-bridge`

- normalizes access to:
  - controller lifecycle
  - model property observation
  - model dispatch subscriptions
  - model-to-pixel transforms
  - current scene dimensions

`packages/lab-host/overlay-roots`

- creates:
  - underlay SVG root
  - main Lab mount
  - overlay SVG root
  - optional Canvas or Pixi root
  - UI affordance root

`packages/lab-host/enhancements`

- pluggable modules such as:
  - collision emphasis
  - bond stress emphasis
  - field overlay
  - affordance handles
  - trails and glow

`simulations/.../enhancements`

- per-simulation enhancement definitions
- these should describe effect intent and thresholds, not reimplement common plumbing

### Design rule

The enhancement system should be optional per simulation.

Plain Lab must remain a valid fallback mode.

## What Should Be Documented Or Standardized

- The public contract for `packages/lab-host/`
- A stable coordinate-sync API for overlays
- A stable event bridge for model and derived events
- A truthfulness standard for model-derived versus representational effects
- Performance budgets by atom count and effect class
- A fallback policy for low-performance environments
- A vendor patch log if any MD2D internals are changed
- Capture-review expectations for enhancement-heavy simulations
- A naming convention for enhancement modules and per-simulation enhancement configs

## Best Proof Of Concept

The best first proof of concept is an enhanced particle-collisions interactive.

Why this is the best test:

- it is particle-appropriate, so there is no representational mismatch
- it exercises the real MD2D atom view rather than only the scene-compositor features
- it tests high-frequency synchronization and performance
- it lets the repo test richer interaction affordances without macroscopic honesty problems

Recommended POC features:

- selectable atom or molecule focus halo
- short velocity-derived trails
- high-energy collision pulse overlay
- bond-stretch color emphasis when relevant
- a cleaner drag affordance than the raw hidden-control pattern
- a host-owned overlay root synchronized with `model2px`

Success criteria:

- the base MD2D simulation still reads scientifically first
- the enhancement layer makes interaction and consequence easier to read
- performance remains acceptable at useful atom counts
- turning the enhancement layer off still leaves a valid simulation
- turning it on clearly raises the ceiling above default Lab presentation

## Bottom Line

The local repo and vendored runtime support an ambitious conclusion:

- MD2D is not visually maxed out by the stock Concord examples
- Lab already provides real controller, scripting, SVG-scene, and embedding seams
- this repo can meaningfully exceed the baseline look and feel of MD2D

The right path is not "rewrite MD2D first."

The right path is:

- build a project-owned enhancement host
- exploit the native MD2D scenegraph fully
- add synchronized overlay and effects layers
- patch vendor code only where wrapper architecture clearly runs out of room
