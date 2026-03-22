# Lab Reference

## Purpose of This Note

This file is the first longform project note. It exists to capture what Concord's `Lab` framework actually is, how it relates to `MD2D`, why it matters for this project, and how the workspace should be organized around it.

The intent is historical as much as technical. Future work should be able to look back at this note and understand the architectural starting point of the project.

## What Lab Is

Concord `Lab` is an HTML5 interactive framework for science education. It is broader than a single simulation engine. The framework combines:

- model runtimes
- authored interactive definitions
- browser-based controls
- graphs and data displays
- visual representations
- support for probeware and related integrations

The important practical point is that `Lab` is the interactive container and runtime layer. It is the thing that turns a model plus an interface into a Concord-style simulation experience in the browser.

## What Lab Is Not

`Lab` is not the entire Concord educational platform.

It does not by itself represent the whole ecosystem of lesson sequencing, student accounts, saved work, classroom orchestration, or the broader hosting systems Concord uses around interactives. Related systems such as `LARA` and activity-player style tools sit outside the Lab runtime itself.

For this project, that distinction matters. We are using `Lab` as the simulation backbone, not as the total curriculum platform.

## Relationship Between Lab and MD2D

`MD2D` is the chemistry or particle-dynamics engine relevant to the first phase of this project.

The relationship is:

- `Lab` is the broader interactive framework
- `MD2D` is a model engine inside that framework

In practical terms, `MD2D` is the part that handles particle motion, collisions, and chemistry-style molecular dynamics. `Lab` is the part that surrounds it with authored interface elements, graphs, controls, displays, and the broader interactive experience.

This distinction should stay explicit in project language. When the project is focused on particle collisions or chemistry-style interactions, we are usually talking about `MD2D`. When the project is focused on the whole interactive shell, authored behavior, or browser delivery, we are talking about `Lab`.

## What Lab Can Be Used For

Based on Concord's docs and examples, `Lab` can support several classes of work relevant to this project:

- standalone science interactives hosted as web pages
- embedded interactives inside curriculum pages
- simulations with controls, graphs, and multiple representations
- particle or molecular dynamics models through `MD2D`
- heat and energy simulations through `Energy2D`
- other model types such as solar system and probeware integrations
- coordinated or externally controlled interactive experiences

That makes `Lab` broad enough for more than a single chemistry simulation. It is a suitable long-term simulation layer if the project expands across topics or wants richer browser-based interactive structure later.

## Why This Project Should Not Treat the Upstream Lab Repo as the Entire Product

The upstream `lab` repository is valuable, but it should not define the whole project shape.

As of `2026-03-15`, GitHub shows Concord Lab's latest visible release as `v1.17.5`, dated `2023-07-06`. The repository remains useful, but its development workflow reflects an older stack. That is another reason to keep this project's curriculum content and public site code in a separate, project-owned structure.

This note is historical context only. Once Lab is imported into this repository, the authoritative project pin should live in `vendor/lab/VERSION.md` rather than only in prose here.

The right mental model is:

- our project owns the curriculum, simulations, notes, and site
- Concord Lab is an engine and runtime dependency
- upstream source should stay isolated unless we truly need to patch it

This protects the project from unnecessary coupling to upstream build assumptions.

## Core Architecture Decision for This Project

This repository is organized around four distinct responsibilities:

### 1. Curriculum and pedagogy

These files belong in `content/` and `docs/`. They explain the educational why.

### 2. Simulation artifacts

These files belong in `simulations/`. They define one interactive at a time and should eventually include model and interactive JSON.

### 3. Public browser surfaces

These files belong in `apps/site/` and `apps/studio/`. They determine how a person sees the work in a browser.

### 4. Runtime integration

These files belong in `packages/lab-host/` and, when necessary, `vendor/`. They determine how our project talks to Concord Lab.

That separation is not cosmetic. It keeps educational intent, simulation content, and runtime mechanics from collapsing into the same place.

## Relevant File Types in This Workspace

### `.md`

Use Markdown for longform notes, lesson context, design rationale, specifications, and project memory. If a file exists to explain something to humans, it should probably be Markdown.

### `.json`

Use JSON for machine-readable simulation artifacts. In later phases, real `model.json` and `interactive.json` files should be Lab-compatible definitions rather than placeholders.

### `.html`

Use HTML for browser entry points, hosting shells, landing pages, and prototype routes.

### `.css`

Use CSS for the visible structure and presentation of the public site and studio surfaces.

### Asset files

Use image and media files inside per-simulation `assets/` folders so each interactive keeps its visual resources close to its model and notes.

## Recommended Development Rhythm

1. Decide the Lab runtime pin and import path.
2. Record that pin in `vendor/lab/VERSION.md`.
3. Define or update the `packages/lab-host/` contract.
4. Start with the lesson idea and simulation purpose.
5. Write or update the simulation `spec.md`.
6. Draft the model and interactive artifacts.
7. Test and iterate in the studio.
8. Promote stable work into the public site.

This sequence should prevent the project from becoming a collection of disconnected technical experiments.

## Practical Naming Rule

Every simulation should be identifiable by unit, lesson, and a short simulation name. That naming rule should appear consistently across:

- folders
- notes
- JSON files
- browser routes

Consistency here will matter once the project grows beyond a single lesson.

## Sources

- Concord Lab overview: https://concord-consortium.github.io/lab/
- MD2D documentation: https://concord-consortium.github.io/lab/doc/models/md2d/index.html
- Energy2D documentation: https://concord-consortium.github.io/lab/doc/models/energy2d/index.html
- Interactive browser: https://concord-consortium.github.io/lab/interactives.html
- Lab examples: https://concord-consortium.github.io/lab-examples/
- LARA Interactive API docs: https://concord-consortium.github.io/lara-interactive-api/docs/
- Concord Lab source repository: https://github.com/concord-consortium/lab