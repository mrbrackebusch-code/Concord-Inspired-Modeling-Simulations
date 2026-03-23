# Licensing / Attribution Index

This folder is the repository-level index for third-party licensing and attribution.

It exists to make the code/art split explicit and to stop future work from defaulting to
scratch art when approved outside art already exists.

## Code Versus Art

- Project-authored code is governed by the top-level [LICENSE](/C:/Concord Inspired Modeling Simulations/LICENSE).
- Third-party art and assets are not relicensed by that file.
- Third-party art keeps its upstream license and attribution obligations.

## Approved Donor Repository For Game Art

This project may import game-side art from:

- `C:\my-heroengine-phaser`

That donor repository is an approved source pool for:

- LPC terrain and tile assets
- props and environmental art
- LPC character/body parts and related sprite assets
- other already-cleared free art bundled there

The project rule is:

- do not restart the art hunt if the donor repository already has a usable asset
- do not redraw an asset simply because provenance work feels annoying
- import the stronger existing art and document it properly

## Required Provenance Behavior

When art is imported from the donor repository, preserve two layers of provenance:

1. the local donor-repo path the file came from
2. the upstream author/license source chain recorded by the donor repository

At minimum, carry forward:

- asset file
- donor source path
- upstream source URL or credit source file
- original author or project
- license
- attribution required
- modifications made
- where the asset is used in this repository

## Donor-Repo Credit Sources

Use these files in `C:\my-heroengine-phaser` when importing art:

- `licensing/README.md`
- `licensing/CREDITSLPCBaseAssets.TXT`
- `licensing/spriteAuthors.md`
- `licensing/tilesetAuthors.md`
- `licensing/CREDITSFromLPCSpritesheetGenerator.csv`
- `licensing/MonsterCreditsLicensing.txt`
- `copying.txt`

## LPC-Specific Rule

For LPC base assets and LPC-derived generator output, treat the donor repository's
licensing files as the source of truth for the carried-forward attribution package unless
an imported file has a narrower per-file credit record.

## Public Attribution Rule

If an imported asset requires visible attribution on a public-facing surface:

- update [third-party-asset-attribution.md](/C:/Concord Inspired Modeling Simulations/docs/architecture/third-party-asset-attribution.md)
- keep the corresponding provenance entry in the relevant asset manifest

## Current Imported Repository-Level Art Records

- `assets/spaceship/spaceship.svg`
  donor source: direct external import
  upstream source: `https://opengameart.org/content/spaceship-2d`
  author: `Alucard`
  license: `CC BY 3.0`
  attribution required: `yes`
  notes: imported from the published `spaceship.zip` pack alongside `assets/spaceship/spaceship.png`

- `assets/spaceship/spaceship.png`
  donor source: direct external import
  upstream source: `https://opengameart.org/content/spaceship-2d`
  author: `Alucard`
  license: `CC BY 3.0`
  attribution required: `yes`
  notes: imported from the published `spaceship.zip` pack alongside `assets/spaceship/spaceship.svg`

- `assets/game-poc/tiles/shopPlatform.png`
  donor source: `C:\my-heroengine-phaser\assets\tiles\shopPlatform.png`
  upstream source: `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles`
  carried-forward credit source: `C:\my-heroengine-phaser\licensing\tilesetAuthors.md`
  author: `Daniel Armstrong (HughSpectrum)` and `Lanea Zimmerman (Sharm)` via LPC tileset credits
  license: `CC BY-SA 3.0 / GPLv3`
  attribution required: `yes`
  notes: imported for the ship experiment proof of concept platform terrain in `apps/studio/game-poc/`

- `assets/game-poc/heroes/DefaultHero.png`
  donor source: `C:\my-heroengine-phaser\assets\heroes\DefaultHero.png`
  upstream source: `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles`
  carried-forward credit source: `C:\my-heroengine-phaser\licensing\spriteAuthors.md`
  author: `Stephen Challener (Redshrike)`, `Manuel Riecke (MrBeast)`, `Charles Sanchez (CharlesGabriel)`, and other LPC contributors via donor repo credits
  license: `CC BY-SA 3.0 / GPLv3`
  attribution required: `yes`
  notes: imported for the cockpit pilot in `apps/studio/game-poc/`; animation support metadata copied alongside as `assets/game-poc/heroes/anim_map.json`

This file sets the repository policy and staging location.
Actual imported files still need per-asset manifest entries when they are added.
