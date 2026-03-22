# Process Realism Standard

## Purpose

This note defines the minimum realism standard for visible process in this repository.

It exists because "has animation" is not enough. A simulation can technically animate and still feel fake, abrupt, slide-like, or pedagogically weak. The goal of this standard is to prevent that failure mode.

This file should be treated as a required constraint alongside:

- `docs/architecture/animation-and-scene-architecture-standard.md`
- `docs/architecture/concord-interactive-pedagogy.md`
- `docs/architecture/svg-asset-sourcing-and-licensing.md`
- `docs/architecture/verified-svg-source-catalog.md`
- `docs/architecture/mass-change-total-rebuild-plan.md`

## Core Rule

If a meaningful real-world process would be visible to a learner in the lab, the simulation must show that process unfolding in a human-readable way.

That means:

- not a jump cut
- not a disguised still-image swap
- not an event so fast the learner cannot actually witness it
- not a decorative animation that does not explain where the evidence came from

The learner should be able to watch the process and answer:

1. what action started this
2. what matter is moving or changing
3. where that matter is going
4. what evidence the process produced

## Reality-First Beauty Rule

Visual appeal in this repository should come from properly modeled reality, not arbitrary flourish.

That means:

- do not ask "what animation effect can we add?"
- ask "what would a careful observer actually see?"
- then model that visible detail with enough richness that the phenomenon becomes satisfying to watch

This project should prefer:

- faithful material behavior
- secondary detail that follows from the phenomenon
- restrained controls with rich visible response

over:

- generic effect overlays
- symbolic placeholder motion
- "good enough" animation shorthand that communicates the idea but not the feel of the process

If reality provides visible richness, the simulation should use that richness.

## What Counts As Failure

A process realism pass fails if any of the following are true:

1. The process only really exists in the author's head and not on screen.
2. The process is understandable only because text explains it.
3. The process appears mainly as a hard swap between endpoint images.
4. The process is technically animated but too short to witness.
5. The process ignores obvious real-world physical cues such as gravity, contact, orientation, settling, or transfer.
6. The process hides where the evidence came from.
7. The process looks like a generic effect pasted onto the scene rather than something caused by the objects in the scene.

## Required Process Qualities

### 1. Causation Must Be Visible

The learner's action must visibly start the process.

Examples:

- pressing `Pour` must start the actual pour, not reveal the already-mixed result
- pressing `Play` must start the actual melting process, not reveal a puddle
- pressing `Start burning` must begin ignition, not reveal a fully burning sample

### 2. Matter Must Have Continuity

Matter should not teleport, disappear without a transition, or magically appear in its destination without a readable path.

Examples:

- liquid transferred from one tube to another should be seen leaving the source and entering the receiver
- a dissolving solid should progressively disperse rather than blink away
- ice should soften, shrink, slough, and contribute to the visible water

### 3. Real-World Orientation Must Matter

When a real object's angle or position would change the visible process, the simulation should show that.

Examples:

- a pouring test tube should tilt
- the receiving tube should be angled or positioned in a way that makes the transfer believable
- liquid should visually favor the lower side of a tilted container
- late drips should follow the orientation of the source tube

### 4. Contact Must Be Truthful

Effects should visibly connect to the object or region causing them.

Examples:

- flame should appear attached to burning steel wool, not floating nearby
- a precipitate cloud should develop inside the receiving liquid, not as a detached overlay
- bubbles should emerge from the reacting tablet or its vicinity, not randomly across the vessel
- glow should spread through the steel wool rather than appear as an unrelated orange patch

### 5. The Process Must Have Stages

Important changes need readable early, middle, and late phases.

Examples:

- precipitate: clear liquids -> faint clouding -> swirling dense cloud -> settled result
- burning steel wool: intact wool -> ignition -> active burn -> darkened residue
- ice melting: solid cubes -> softened edges/runoff -> mixed ice/water -> mostly liquid

### 6. The Finish Must Feel Earned

The end state should feel like the consequence of what the learner watched, not an arbitrary final slide.

If the learner could skip the motion and lose almost nothing, the animation is not good enough yet.

## Timing Standard

The goal is not "longer animation" by itself. The goal is witnessable process.

As a default:

- important single-event transformations should usually live in roughly the `1.5s to 5s` range
- complex processes may take longer when needed
- microresponses may be shorter, but still must be perceptible

The default should be adjusted based on the phenomenon, but never collapsed into near-instant outcome reveals.

## Scene-Specific Standards For This Repo

### Scale Behavior

The scale is not decorative. It is part of the evidence path.

Minimum standard:

- empty state reads as zero
- an object appears to be placed on the scale or already on it in a believable way
- the readout responds as part of the event
- digits do not teleport in from nowhere
- if mass changes over time, the readout changes over time

### Ice To Water

Minimum standard:

- multiple cubes, not one icon
- cubes read as separate blocks in water
- edges soften or round off
- water level responds gradually
- late fragments remain before full melt

Failure examples:

- three cubes simply scaling down in place
- a puddle appearing without readable runoff

### Precipitate

Minimum standard:

- source and receiving tubes both read clearly
- the receiver is positioned believably for transfer
- the source tube visibly tilts
- liquid visibly moves toward the lip
- liquid visibly leaves the source
- liquid visibly enters the receiver
- clouding begins as a consequence of mixing
- the cloud develops, swirls, and densifies
- one or more late drips show that the transfer actually finishes

Failure examples:

- the tube tilts and the liquid is magically already mixed
- a straight line or simple block stands in for the pour
- the cloud appears fully formed without development

### Burning Steel Wool

Minimum standard:

- the wool reads as steel wool before ignition
- ignition is staged rather than immediate
- one local bright ignition point appears first
- glow spreads through the wool along believable regions or strands
- flame attaches to the wool instead of floating over it
- sparks are irregular and emerge from active burn regions
- residue darkens and accumulates progressively
- some regions remain less affected while others are actively glowing
- the mass readout rises in a readable way during the burn, not only at the end
- the final object still reads as the same piece of wool, now oxidized and darkened

Failure examples:

- the flame is just pasted over the object
- the burn jumps from unlit to fully burned
- the mass change only appears at the end
- the whole wool changes evenly all at once
- sparks or smoke appear from nowhere instead of from the burning material
- the burn looks like a generic fire icon rather than oxidation moving through tangled metal

Recommended staged target:

1. intact metallic wool on the pan
2. one localized ignition point
3. first glow and tiny initial sparks
4. active burn with migrating glow, attached flame, and irregular sparks
5. expanding dark residue while some regions still glow
6. glow fading with darker brittle-looking residue left behind

### Sugar Dissolving

Minimum standard:

- sugar reads as a real quantity of solid before dissolving
- dissolution is uneven at first
- stirred and unstirred differ in pace and visible distribution
- some transient clouding or local concentration is visible

### Alka-Seltzer

Minimum standard:

- the tablet is visually identifiable before reaction
- bubbling starts after a readable onset
- bubbles vary in density and position
- the liquid reacts visibly to bubbling
- vented and captured differ through visible gas behavior, not only labels

### Steel Wool Pulled Apart

Minimum standard:

- the wool deforms or separates because of the pull
- the learner can tell what part is being pulled
- the pulled fragment remains visually connected or recently separated in a believable way
- returning to the scale feels like part of the same evidence path

## Review Protocol

No process-heavy simulation should be called polished without all of the following:

1. early-frame capture
2. mid-process capture
3. late-frame capture
4. direct browser viewing of the actual motion
5. a short written check against the relevant scene-specific standard above

## Single Fakest Frame Rule

Every process has a frame where it looks the fakest.

Review that frame on purpose.

If the fakest frame breaks the illusion badly enough that the learner would stop trusting the process, the animation is not ready.

## Anti-Shortcut Rule

Do not satisfy this standard by:

- slowing down a bad state swap
- adding decorative easing to a process with no real continuity
- hiding poor transfer or mixing behind text
- calling an unfinished effect "stylized" when it is actually just underbuilt

The point is not motion for its own sake.

The point is believable, interpretable process.

This note defines what good visible process looks like.

`docs/architecture/animation-and-scene-architecture-standard.md` defines the stronger architectural rule that all meaningful scene elements should be motion-capable by default so this level of realism remains possible across the repo.
