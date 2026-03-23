# Third-Party Asset Attribution

Use this file to collect any attribution text required by imported visual assets that ship on public surfaces.

## When To Update This File

Update this file when all of the following are true:

1. an asset is not project-authored
2. the asset license requires attribution
3. the asset is used in a public-facing simulation, page, or distributed package

## Required Fields Per Entry

- asset file
- source URL
- author or project
- license
- attribution text used
- where it is used

## Donor-Repo Imports

If an asset was imported through `C:\my-heroengine-phaser`, keep both of these recorded in
the relevant asset manifest even when this file only carries the public-facing attribution text:

- the donor-repo file path
- the upstream credit source inside the donor repo

## Current Entries

- asset file: `assets/spaceship/spaceship.svg` and `assets/spaceship/spaceship.png`
  source URL: `https://opengameart.org/content/spaceship-2d`
  author or project: `Alucard` via OpenGameArt
  license: `CC BY 3.0`
  attribution text used: `"Spaceship 2D" by Alucard via OpenGameArt, licensed CC BY 3.0.`
  where it is used: repository-level imported game art for planned ship gameplay surfaces

- asset file: `assets/game-poc/tiles/shopPlatform.png`
  source URL: `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles`
  author or project: `Daniel Armstrong (HughSpectrum)` and `Lanea Zimmerman (Sharm)` via Liberated Pixel Cup tileset credits
  license: `CC BY-SA 3.0 / GPLv3`
  attribution text used: `LPC tileset material by Daniel Armstrong (HughSpectrum) and Lanea Zimmerman (Sharm), imported via the approved donor repo and used under CC BY-SA 3.0 / GPLv3 terms.`
  where it is used: `apps/studio/game-poc/` gray platform terrain

- asset file: `assets/game-poc/heroes/DefaultHero.png`
  source URL: `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles`
  author or project: `Stephen Challener (Redshrike)`, `Manuel Riecke (MrBeast)`, `Charles Sanchez (CharlesGabriel)`, and other LPC contributors via donor repo credits
  license: `CC BY-SA 3.0 / GPLv3`
  attribution text used: `LPC character material by Stephen Challener (Redshrike), Manuel Riecke (MrBeast), Charles Sanchez (CharlesGabriel), and contributors, imported via the approved donor repo and used under CC BY-SA 3.0 / GPLv3 terms.`
  where it is used: `apps/studio/game-poc/` cockpit pilot sprite
