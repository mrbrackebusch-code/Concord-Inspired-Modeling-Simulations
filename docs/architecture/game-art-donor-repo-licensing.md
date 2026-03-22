# Game Art Donor Repo Licensing

## Purpose

This note establishes the approved licensing posture for reusing game-side art from the
local donor repository:

- `C:\my-heroengine-phaser`

The point is to eliminate repeated hesitation about whether we should redraw art that is
already available and already cleared for reuse.

## Core Decision

For this repository, `C:\my-heroengine-phaser` is an approved donor source for game-side
art.

That means:

- use the donor repo's art when it is the right asset for the job
- do not default to remaking those assets from scratch
- preserve the upstream license and attribution chain when importing

This is a repository operating rule.

## Why This Exists

The project is moving toward a ship-driven, experiment-as-level game structure.

That work benefits directly from assets that already exist in the donor repository:

- top-down LPC terrain
- props
- environmental objects
- character and body-part assets
- other free-use art already curated there

Restarting the art search or redrawing equivalent material would waste time and reduce
quality.

## Licensing Split

The donor repository already separates code from art:

- its code is under its own code license
- its art remains under the original licenses recorded there

This repository follows the same structural rule:

- project-authored code is governed by the top-level `LICENSE`
- imported art keeps its original upstream license

Importing art from the donor repo does not turn it into project-authored art.

## Approved Working Assumption

Future agents should assume the following unless a specific file proves otherwise:

- the donor repository's art is usable source material for this project
- the main work is provenance carry-forward, not relicensing or redrawing
- the right default is `import and document`, not `avoid and redraw`

## Provenance Workflow

When importing an asset from `C:\my-heroengine-phaser`:

1. record the donor-repo file path
2. identify the upstream credit source inside the donor repo
3. record the upstream author or project
4. record the upstream license
5. record whether visible attribution is required
6. record any local modifications
7. update the relevant asset manifest immediately
8. update repository-level attribution notes if the asset ships publicly and requires it

## Credit Sources To Use

When working from the donor repo, use these files as the primary provenance sources:

- `C:\my-heroengine-phaser\copying.txt`
- `C:\my-heroengine-phaser\licensing\README.md`
- `C:\my-heroengine-phaser\licensing\CREDITSLPCBaseAssets.TXT`
- `C:\my-heroengine-phaser\licensing\spriteAuthors.md`
- `C:\my-heroengine-phaser\licensing\tilesetAuthors.md`
- `C:\my-heroengine-phaser\licensing\CREDITSFromLPCSpritesheetGenerator.csv`
- `C:\my-heroengine-phaser\licensing\MonsterCreditsLicensing.txt`

## LPC Rule

LPC-derived assets are specifically approved for reuse here.

For LPC imports:

- keep the carried-forward LPC credit source
- preserve the recorded license chain
- note any recolor, crop, recomposition, or animation adaptation work

## Anti-Drift Rule

Future agents must not do any of the following:

- avoid donor-repo art because licensing admin feels inconvenient
- reclassify donor art as project-authored
- restart a broad art search before checking the donor repo
- redraw equivalent LPC or donor-repo art without a clear quality reason

## Definition Of Done

The donor-repo licensing setup is being followed only when:

1. donor art is treated as an approved source pool
2. imported files keep their upstream provenance
3. manifests are updated in the same work pass as the import
4. visible-attribution obligations are carried into public-facing surfaces when required
