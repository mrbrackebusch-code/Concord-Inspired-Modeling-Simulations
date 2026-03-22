# Visual Capture Workflow

## Purpose

Use Google Chrome's `--headless=new` mode to capture real rendered Lab interactives and state models. This is the feedback loop for fixing alignment, scale placement, SVG art quality, and other visual issues without hand-tuning from memory.

## Commands

Start the local server first:

```powershell
npm.cmd run dev
```

Capture a dedicated interactive:

```powershell
npm.cmd run capture:lab -- --interactive ice-to-water
```

Capture a specific state model directly:

```powershell
npm.cmd run capture:lab -- --model simulations/unit-01/lesson-01/mass-change/states/precipitate-pour.json
```

Write the PNG to a custom location:

```powershell
npm.cmd run capture:lab -- --interactive precipitate --out .captures/precipitate-board.png
```

## Why This Path

- The capture goes through Concord Lab's own `embeddable.html`, not a custom page.
- `--headless=new` produces a real browser render of the Lab runtime.
- `--model` is useful when a scene is hidden behind a button click in the authored interactive. It generates a temporary one-model Lab wrapper automatically, so the state can be captured directly.

## Output

- Default screenshots are written to `.captures/`.
- Temporary capture interactives and Chrome profiles are written to `.tmp/`.

## Iteration Loop

1. Capture the current scene.
2. Inspect the PNG.
3. Adjust SVG art or Lab coordinates in the relevant JSON/SVG file.
4. Re-run the capture command.
5. Repeat until the rendered scene is aligned.
