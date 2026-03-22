# Lab Runtime Readiness

## Purpose

This note exists to make the repository technically ready to receive lesson content and authored simulation requirements later without reopening the same runtime decisions each time.

## Decisions Already Made

- Project-authored code and notes stay in `apps/`, `packages/`, `simulations/`, `content/`, and `docs/`.
- Upstream Concord Lab stays isolated under `vendor/lab/`.
- `packages/lab-host/` is the only project-owned integration seam for loading and mounting Lab interactives.
- Concord's `gh-pages` distribution archive has been imported under `vendor/lab/dist/`.
- The imported artifact is pinned in `vendor/lab/VERSION.md` as commit `6d41564`, imported on `2026-03-16`.

## Current Ready State

- The studio can boot one local interactive through Concord's own `embeddable.html`.
- The first real authored Lab files live in `simulations/unit-01/lesson-01/mass-change/`.
- The local launcher path is `apps/studio/interactives/unit-01/lesson-01/mass-change/index.html`.

## Important Path Rule

When Lab is launched from `vendor/lab/dist/embeddable.html`, model URLs inside `interactive.json` are resolved against Lab's own `actualRoot`, not against the interactive file's directory.

For this repository, that means a simulation interactive loaded via:

`vendor/lab/dist/embeddable.html#../../../simulations/unit-01/lesson-01/mass-change/interactive.json`

must point its model URL at:

`../../../simulations/unit-01/lesson-01/mass-change/model.json`

not at plain `model.json`.

This rule matters for every simulation authored through the pinned Lab distribution.

## Remaining Work

- Replace the starter JSON with lesson-specific `Mass & Change` investigations.
- Add any project-owned loading helpers to `packages/lab-host/` only if the raw Concord launch path becomes too limiting.
- Promote stable simulations into `apps/site/` after the authored Lab JSON is doing the instructional work.