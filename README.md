# Rainbow Possibility Simulations

This repository is the project workspace for building Concord Lab based HTML5 science simulations that can eventually live on `rainbowpossibility.org`.

## Current Status

The repository now follows Concord Lab's distribution-archive workflow:

- the official static Lab runtime is pinned under `vendor/lab/dist/`
- the imported artifact is recorded in `vendor/lab/VERSION.md`
- the first real Lab-authored evidence suite lives in `simulations/unit-01/lesson-01/mass-change/`
- local launch happens through Concord's own `embeddable.html` over HTTP, not through `file://`

## Start Here

1. Run `npm run dev` from the repository root.
2. Open `http://localhost:8123/apps/studio/index.html`.
3. Launch the `Mass & Change experiment windows`.
4. Read `docs/architecture/concord-interactive-pedagogy.md` before building or revising any simulation behavior.
5. Read `docs/architecture/svg-asset-sourcing-and-licensing.md` before importing or replacing visual assets.
6. Read `docs/architecture/verified-svg-source-catalog.md` before starting a broad SVG asset search.
7. Use `docs/architecture/codex-svg-allowlist-denylist.md` for the short allowlist/denylist operating rule.
8. Use `docs/architecture/third-party-asset-attribution.md` if an imported asset requires visible attribution.
9. Use `docs/architecture/game-art-donor-repo-licensing.md` before importing LPC or other game-side art from `C:\my-heroengine-phaser`.

## Where The Real Simulation Files Live

- `simulations/unit-01/lesson-01/mass-change/interactive.json`
- `simulations/unit-01/lesson-01/mass-change/model.json`

The pages under `apps/studio/` are only launch surfaces for the Lab runtime. The authored simulation itself is the JSON in `simulations/`.

## Workspace Shape

- `apps/site/` is the future public-facing curriculum site shell.
- `apps/studio/` is the local launch surface for testing and iteration.
- `apps/studio/experiment-window/` is the first project-owned host shell for reusable apparatus simulations.
- `content/` stores lesson context and pedagogical notes.
- `simulations/` stores each simulation as a first-class authored artifact.
- `packages/lab-host/` contains the project-owned Lab host shell and future integration helpers.
- `vendor/` stores pinned upstream runtime artifacts.
- `docs/` stores architecture notes and project memory.
