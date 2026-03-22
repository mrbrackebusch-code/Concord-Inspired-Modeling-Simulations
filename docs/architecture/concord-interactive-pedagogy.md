# Concord Interactive Pedagogy

## Purpose

This project is not trying to make generic science animations. It is trying to make Concord-style interactives that are valuable because of how they structure student action, evidence, and interpretation.

The engine matters, but the authored pedagogy matters more. A technically valid Lab interactive can still be the wrong simulation if it does not give the learner meaningful agency.

## Core Standard

A good interactive in this repository must follow this pattern:

`student action -> visible consequence -> evidence -> student interpretation`

That sequence is the center of the work.

If the learner is mostly watching prepared outcomes, browsing states, or being told what the evidence means, the design has drifted away from the Concord standard we want.

## What Makes The Interactives Valuable

The value does not come from the fact that something is moving on screen. It comes from the fact that the learner causes something to happen and then has to make sense of what they caused.

Important consequences of that idea:

- Agency matters.
- Evidence matters.
- Restraint matters.

Another project rule follows from that:

- beauty should come from observed reality

This is important because the goal is not to invent decorative motion. The goal is to make the process satisfying to watch because it behaves in ways that feel carefully observed. When reality offers rich visible detail, the simulation should model that detail instead of replacing it with generic shorthand.

That beauty rule depends on the scene architecture too. Meaningful objects should not be authored as permanently static unless they are truly inert background elements. The repository's motion-capable default is defined in `docs/architecture/animation-and-scene-architecture-standard.md`.

The simulation should not do all the thinking for the learner. It should make the phenomenon accessible and manipulable enough that the learner can notice something important.

## Nothing Important Should Be Frozen

Another project rule is: no static pictures masquerading as simulations.

That does not mean every object must constantly wiggle or animate for decoration. It means that if something meaningful would visibly change in the real-world setup, the learner should be able to see that change happen here too.

Good examples:

- a scale readout changing when an object is placed on or removed from the balance
- ice visibly melting over time after the learner starts the process
- liquid visibly pouring when the learner clicks `Pour`
- bubbles appearing and rising during a reaction
- steel wool moving or separating when the learner pulls it

Important nuance:

- a test tube can sit still when nothing is happening
- a beaker can remain still until the learner mixes, pours, or heats
- a solid object can sit still until it is picked up, pulled, dropped, or changed

So the rule is not "constant motion."

The rule is "visible change must be shown as process, not implied by swapping frozen states."

A related rule is that the process must be witnessable. A technically animated change that happens almost instantly is still pedagogically too close to a state swap. The learner needs enough time to actually see ignition, pouring, clouding, bubbling, melting, settling, or readout change unfold.

That is still not enough by itself. A longer fake animation is still fake. The process also needs realism:

- matter should have continuity
- orientation should matter when it would matter in the real setup
- effects should stay attached to their cause
- the learner should be able to tell where the evidence came from by watching

The repository-wide standard for that lives in `docs/architecture/process-realism-standard.md`.

## Agency Does Not Mean Complexity

Agency does not require a complicated interface.

Sometimes agency is:

- pressing `Play` and choosing when the process begins
- clicking `Pour` and seeing the liquids combine
- pressing `Weigh (before)` and `Weigh (after)` to control when the measurement is revealed
- dragging one visible handle and watching the connected structure respond

The point is not "make the learner do lots of interface work."

The point is "make the learner be the cause of the evidence they are about to interpret."

Buttons are therefore completely acceptable when they represent an intentional experimental action. What is not acceptable is using buttons as a substitute for causation when all they do is switch between pre-authored poster panels.

Those buttons should usually trigger a process, not just reveal a picture. A `Pour` button should initiate pouring. A `Weigh` button should reveal a measurement change on the scale. A `Play` button should start a visible transformation over time.

That visible transformation must also have duration. If the imagery changes too quickly to be meaningfully observed, the student is still effectively being shown an outcome instead of witnessing a process.

That transformation must also keep enough physical continuity that it still reads as the same matter changing. A longer jump cut is still a jump cut.

## The Interface Should Show Evidence, Not Conclusions

Concord-style interactives are strong because they avoid over-explaining.

They generally do not:

- pre-announce the answer
- overlay the intended conclusion as instructional text
- spell out what the student should think before the student has seen the evidence

Instead, they:

- show what changed
- show what did not change
- show comparisons clearly
- let the learner notice the important relationship

The simulation should support the assignment, not replace the assignment.

## One Live Setup Is Better Than A State Browser

A recurring failure mode is turning a simulation into a set of labeled scenes:

- `Before`
- `After`
- `Run 1`
- `Run 2`
- `Run 3`

That structure is easy to author, but it is usually the wrong learner experience.

Concord-style interactives typically present one live setup with:

- one meaningful input or action
- one evolving visual consequence
- one clear measurement or output

That is very different from a slide deck of outcomes.

## Use The Right Representation For The Lesson

The representational level must match the lesson.

If the lesson is macroscopic and is supposed to create a need for particle reasoning later, then do not show particles just because MD2D can.

That means:

- continuous/macroscopic visuals are often the right choice
- particle-level visuals may be inappropriate even if technically possible
- SVG art, authored shapes, and continuous fills can be better pedagogy than microscopic fidelity

The question is not "what can the engine render?"

The question is "what representation is instructionally appropriate right now?"

That still leaves room for ambition. A macroscopic representation can be highly detailed and visually satisfying if that detail comes from the real phenomenon rather than from an instructionally irrelevant effect layer.

## Concord Precedent: Continuous Liquids

The `continuous` mixing-liquids example is a strong precedent for macroscopic liquid representation:

- [continuous interactive](/C:/Concord Inspired Modeling Simulations/vendor/lab/dist/interactives/interactions/continuous.json)
- [continuous model](/C:/Concord Inspired Modeling Simulations/vendor/lab/dist/imports/legacy-mw-content/converted/interactions/mixing-liquids/continuous.json)

What it does:

- uses authored `shapes` to represent liquid regions
- uses `obstacles` and geometry to define the container
- uses labels and guides to frame the observation
- does not rely on visible particles

What to steal from it:

- continuous liquid regions instead of microscopic liquid particles
- authored container geometry
- minimal interface
- emphasis on what the learner sees rather than what the engine can simulate internally

For this project, that pattern is the right starting point for cases such as:

- precipitate formation
- dissolving
- macroscopic liquid comparisons

## Concord Precedent: Dragging The Star

The SAM intermolecular-attractions examples are the right precedent for "grab this and pull it":

- [2-comparing dipole-dipole to london dispersion](/C:/Concord Inspired Modeling Simulations/vendor/lab/dist/interactives/sam/intermolecular-attractions/2-comparing-dipole-dipole-to-london-dispersion.json)
- [npPulling model](/C:/Concord Inspired Modeling Simulations/vendor/lab/dist/imports/legacy-mw-content/converted/sam-activities/intermolecular-attraction/original-interactives-in-pages/page2/npPulling.json)

What they do:

- attach a `star` image to a hidden draggable atom
- bond that hidden draggable atom to the visible structure
- let the learner drag the star
- let the visible structure respond because it is physically connected

That pattern matters because it creates genuine agency:

- the learner pulls
- the system resists or responds
- the learner perceives strength through action

For this project, that is the right precedent for:

- steel wool pulled apart
- any future simulation where the learner should tug, stretch, separate, or reposition something directly

## Concord Precedent: Controlled Parameter Changes

Some Concord examples use sliders or toggles effectively, for example:

- [Charged and Neutral Atoms](/C:/Concord Inspired Modeling Simulations/vendor/lab/dist/interactives/samples/3-100-atoms.json)

Those are good when changing a parameter is itself the learning action.

They are not good as filler controls.

Only add sliders, pulldowns, or toggles when they correspond to a meaningful experimental choice the learner should actually make.

## The Real Failure Mode To Avoid

The biggest risk in this repository is not technical inability. It is authoring drift.

Drift looks like:

- building a visually polished storyboard instead of a simulation
- exposing all outcomes at once instead of making the learner produce them
- using Lab as a JSON slide container rather than as an interactive authoring environment
- confusing "has buttons" with "has agency"
- confusing "looks good" with "supports the lesson"
- confusing a frozen outcome image with a process the learner actually witnessed

This drift wastes time because it produces files that are technically real but pedagogically wrong.

## Lesson 1: Mass & Change

For Unit 1 Lesson 1, the lesson constraints are specific:

- This is a macroscopic evidence lesson.
- Students should not be given particle visuals yet.
- The simulations should help create the need for later particle reasoning.
- The important outputs are visible change and measured mass.
- The simulation must not directly teach the system rule for them.

That leads to concrete authoring decisions.

### Ice to water

The learner should intentionally start the process and watch time pass.

Good:

- a clock
- `Play`
- a visible melting process
- a final measurable mass
- a scale or readout that changes when the object is placed and removed
- distinct cubes that soften, slough, and contribute to the water over time

Bad:

- pre-exposed before/after poster panels as the main interaction
- a frozen `before` image and a frozen `after` image with no witnessed melting
- three cubes merely scaling down as icons in place

### Precipitate

The learner should intentionally control the procedure:

- `Weigh (before)`
- `Pour`
- `Weigh (after)`

Good:

- continuous liquid fills
- visible cloudy/solid formation
- controlled reveal of the mass at the weigh steps
- a pouring process rather than a jump cut from separate liquids to mixed result
- believable source and receiving tube orientation
- visible stream transfer and late drips rather than magical liquid teleportation
- clouding that begins, swirls, and intensifies rather than appearing fully formed
- process detail grounded in the actual reaction being modeled

Bad:

- showing before, pouring, and after as a static triptych
- making the student drag liquids awkwardly if the lesson does not benefit from that complexity
- a tilted tube with no readable transfer path
- instant mixed-cloud result with no visible development

### Steel wool pulled apart

The learner should physically separate or tug the material.

Good:

- a pull handle or analogous drag affordance
- visible deformation or separation
- repeated trials if the lesson calls for measurement variation
- a scale that visibly updates when the wool is placed back on it
- material behavior that still reads as tangled steel fibers rather than a generic deforming blob

Bad:

- replacing the pull with `Run 1`, `Run 2`, `Run 3` scene buttons
- treating the pull as a frozen before/after comparison instead of an action the learner performs

### Other cases

The same rule applies:

- the student should cause the evidence
- the interface should not overcomplicate the action
- the representation should stay macroscopic unless the curriculum stage changes

## Practical Build Questions

Before building or approving any simulation, answer these questions:

1. What is the one important thing the learner does?
2. What changes on screen because of that action?
3. What evidence is produced that the learner can interpret?
4. What would be lost if the simulation were reduced to a static image?
5. Are we showing the answer, or are we showing the evidence?
6. Are the controls essential, or are they filler?

If those questions do not have sharp answers, the design is probably drifting.

## Definition Of Done

A simulation in this project is not done because:

- the JSON loads
- the assets are pretty
- the states are complete
- the controls exist

It is done only when:

- the learner can perform a meaningful action
- that action creates visible evidence
- the evidence supports the intended lesson move
- the representation matches the curriculum stage
- the interface stays sparse and intentional
- the process survives realism review instead of merely duration review

That is the standard future agents should use.
