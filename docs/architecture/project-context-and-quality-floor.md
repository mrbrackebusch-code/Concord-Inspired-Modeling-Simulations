# Project Context And Quality Floor

## Purpose

This note captures what this project is becoming and the minimum quality floor that should guide future work.

It exists because the project has expanded beyond a small set of lesson widgets. The repository now needs a durable top-level framing that future work can inherit without re-deriving it from conversation.

## What This Project Is Becoming

This repository is becoming a reality-first science experience platform.

That platform includes:

- Concord-style pedagogical interactives
- project-owned host shells and experiment windows
- a larger game/world layer in which simulations can appear as contextual encounters
- rich SVG-based object art
- process animation driven by observation of real phenomena
- effects architecture capable of GSAP, Pixi, and future visual augmentation
- future game-capable and MD2D-enhanced experiences

This means the project should no longer be framed as:

- "a few HTML5 simulations"

It should be framed as:

- "a visually ambitious interactive science world whose simulations must hold up inside a larger experiential shell"

## Immediate Consequence

The quality bar rises now, not later.

If the larger game/world experience already exists or is actively being built, then the simulation art and animation can no longer be treated as early placeholders waiting for a future polish pass.

The visual language, object quality, motion quality, and process realism all need to begin rising immediately.

## The Minimum Quality Floor

Future work should assume this baseline:

1. Every interactive is a witnessed change-experience.
2. Every meaningful scene object is motion-capable by default.
3. Every meaningful scene object is effect-capable by default.
4. Every important process is based on a real-world reference target.
5. Every important process has readable early, middle, and late stages.
6. Every important process must survive direct motion review, not just still-frame review.
7. Every important process must survive the single fakest frame test.
8. Object art must be strong enough to stand beside a game/world shell without collapsing into placeholder quality.
9. Beauty should come from modeled reality, not arbitrary decoration.
10. The architecture must keep advanced animation/effects tools available so realism is not blocked by early simplification.

For the current `Mass & Change` suite, the per-simulation required realism tiers are declared in `docs/architecture/mass-change-realism-target-matrix.md`. Those targets are part of the minimum quality floor, not optional stretch goals.

## What "Reality-First" Means At Minimum

Reality-first does not require perfect physical simulation.

It requires:

- continuity of matter
- believable transfer
- believable orientation and gravity cues
- visible cause-and-effect
- material identity persisting through change
- enough observed detail that the process feels satisfying and trustworthy

If a process looks like an educational diagram with a little motion added, it does not meet the floor.

## What "Jaw-Dropping" Means In This Repo

In this repository, jaw-dropping should not mean overdesigned spectacle for its own sake.

It should mean:

- the object art is strong
- the process feels alive
- the movement feels observed
- secondary detail makes the scene satisfying to watch
- the learner wants to watch what happens after they act

The point is not to become flashy at the expense of meaning.

The point is to make careful, reality-based process so compelling that it earns attention naturally.

## Guiding Principle

The enduring rule is:

`keep interaction simple; make the modeled reality rich`

That is the minimum future-proof standard for the full-scale vision.
