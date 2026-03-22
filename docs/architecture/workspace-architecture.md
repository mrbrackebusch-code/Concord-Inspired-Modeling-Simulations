# Workspace Architecture

## Goal

Keep curriculum content, simulation artifacts, public website code, and any upstream Concord runtime code clearly separated from the start.

## Folder Map

### `apps/site/`

The public-facing shell for curriculum pages and production-ready hosted interactives.

### `apps/studio/`

A local sandbox for rapid iteration, experiments, and unfinished work. If something is unstable or exploratory, it belongs here before it belongs on the site.

### `content/`

Pedagogical notes, unit structure, lesson flow, prompts, and teacher-facing context. This folder should explain why a simulation exists.

### `simulations/`

The simulation itself as a first-class artifact. Each simulation should eventually have:

- `spec.md` for intent and design reasoning
- `model.json` for the model definition
- `interactive.json` for the Lab interactive definition
- `assets/` for images or media

### `packages/lab-host/`

The project-owned integration seam between this repository and a pinned Concord Lab runtime. This is where loading, embedding, path resolution, and browser bootstrap helpers should live.

### `vendor/`

Pinned or patched third-party source kept separate from project-authored files.

### `docs/`

Longform notes, historical references, design rationale, and project memory.

## Recommended Workflow

1. Decide how this repository will consume Concord Lab.
2. Record the exact upstream pin in `vendor/lab/VERSION.md` once the import happens.
3. Define the stable loading contract in `packages/lab-host/`.
4. Start in `content/` and `simulations/.../spec.md`.
5. Define the instructional purpose before defining controls.
6. Draft `model.json` and `interactive.json` against the pinned runtime.
7. Test the work in `apps/studio/`.
8. Promote stable interactives into `apps/site/`.

## Practical Rule

If a file explains educational intent, it belongs in `content/` or `docs/`.

If a file drives one specific simulation, it belongs in `simulations/`.

If a file exists to make the browser load or host the simulation, it belongs in `apps/` or `packages/lab-host/`.

If a file is upstream Concord source or a pinned upstream artifact, it belongs in `vendor/`.