# lab-host

This package is the project-owned integration layer between authored simulations and the pinned Concord Lab runtime.

It now has a concrete first mission:

`host reusable experiment windows around Lab simulations`

## Current Direction

The repo is moving away from:

- naked meta-refresh launchers into `vendor/lab/dist/embeddable.html`

and toward:

- project-owned experiment-window shells that mount Lab inside a reusable frame

That shell is the first step toward later:

- evidence capture
- revision workflows
- AI-assisted writing
- game systems
- MD2D-backed microscopic play

The intended future game shape is:

- one persistent ship control language
- reusable station interactions
- mission manifests that read from the same experiment contract

## Responsibilities

`lab-host` is responsible for:

- resolving an experiment or simulation id to its `interactive.json`
- loading the pinned Lab runtime in a project-owned page
- mounting a Lab interactive into a browser container owned by this project
- rendering reusable shell chrome around the interactive
- exposing host-side lifecycle, evidence, and event APIs
- surfacing boot and runtime errors in a project-controlled way
- keeping project conventions separate from upstream Lab source layout

`lab-host` is not responsible for:

- writing lesson content
- defining the science or pedagogy of a simulation
- replacing the authored phenomenon choreography inside each simulation
- storing upstream Concord source

## Runtime Structure

The first runtime shape is:

- `runtime/experiment-window-registry.js`
  experiment metadata, launch paths, shell copy, and future contract placeholders
- `runtime/experiment-window-shell.js`
  host bootstrap, Lab mount, shell rendering, and host API
- `runtime/experiment-window-shell.css`
  shared shell styling

This is intentionally plain static JavaScript and CSS so the repo can move without adding a bundler first.

## Host API Direction

The host should converge on a stable API that child simulations can call or feed:

- emit simulation events
- update procedure state
- update evidence values
- lock evidence for a run
- report procedural integrity problems such as spill or leak

The shell can render placeholders for these now, but the contract should be defined from the start.

The same host should later support more than one shell mode:

- `studio`
  the current experiment-window view
- `game`
  a future ship, station, hazard, and power layer that still reads the same evidence and event contract

Those two modes should not diverge into separate products.

The intended relationship is:

- `studio` exposes the zoomed-in experiment platform directly
- `game` adds room-scale navigation and docking, then hands off to that same zoomed-in platform view when close scientific work is required

## Callable Embed Contract

The experiment window should be callable from another project-owned surface from the start.

The current shell now supports:

- `mode=studio`
  full experiment-window workspace
- `mode=embed`
  zoomed-in platform view intended for parent-host embedding

Launch shape:

- `/apps/studio/experiment-window/index.html?experiment=<id>&mode=embed`

Optional query parameters:

- `parentOrigin`
  limits which parent origin is allowed to command the child shell
- `sessionId`
  correlation id passed through postMessage payloads

The registry helper can build this URL:

- `window.RainbowLabHostRegistry.buildLaunchUrl(experimentId, options)`

### Parent / Child Messaging

When embedded, the child shell posts messages like:

- `rainbow.labHost.ready`
- `rainbow.labHost.state`
- `rainbow.labHost.event`
- `rainbow.labHost.interactiveRendered`
- `rainbow.labHost.modelLoaded`
- `rainbow.labHost.error`

Current parent commands:

- `rainbow.labHost.requestState`
- `rainbow.labHost.focusStage`
- `rainbow.labHost.reload`
- `rainbow.labHost.setExperiment`

This is intentionally small. It is enough for parallel development:

- the close-up apparatus can be built and polished independently
- the larger game can embed it, observe its state, and swap experiments
- neither side has to own the other's internals

## Phase Rules

### Phase 1

Build the reusable shell and route studio launch through it.

### Phase 2

Standardize evidence, procedure, and event outputs across the six Lesson 1 experiment windows.

### Phase 3

Use that contract for revision, reflection, writing, and game systems.

The game-system direction is documented in:

- `docs/architecture/ship-station-gameplay-architecture.md`

## Rules

- `packages/lab-host/` contains only project-authored integration code and notes.
- Upstream Lab source or release artifacts belong under `vendor/lab/`.
- The exact upstream pin belongs in `vendor/lab/VERSION.md`.
- Any local patch to upstream Lab should be documented separately from project-authored code.
- `lab-host` should stay host-oriented; simulation-specific science behavior still belongs in `simulations/`.

## Expected Inputs

The long-term expectation is that `lab-host` will accept, directly or indirectly:

- an experiment identifier such as `unit-01/lesson-01/mass-change/precipitate`
- the resolved path to `interactive.json`
- shell mode such as `studio`, `site`, or later `game`
- optional registry metadata for procedure rails, briefing copy, and evidence schema

## Cross-Reference

For the repo-level decision behind this shift, read:

- `docs/architecture/experiment-window-system-architecture.md`
- `docs/architecture/ship-station-gameplay-architecture.md`
