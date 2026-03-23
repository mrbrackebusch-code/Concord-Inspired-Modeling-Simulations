# Repository-Level Asset Manifest

This manifest records provenance for imported visual assets stored at the repository root
under `assets/`.

Every imported or adapted third-party asset placed in this folder must be listed here in
the same work pass.

## Fields

- `asset file`
- `status`
- `source URL`
- `author or project`
- `license`
- `attribution required`
- `modifications`
- `notes`

## Imported Or Adapted Third-Party Assets

| asset file | status | source URL | author or project | license | attribution required | modifications | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `spaceship/spaceship.svg` and `spaceship/spaceship.png` | imported | `https://opengameart.org/content/spaceship-2d` | `Alucard` via OpenGameArt | `CC BY 3.0` | yes | none yet | imported from the source pack `spaceship.zip`; top-level spaceship asset approved for future game-side ship work; source page also references `https://gameassets.itch.io` for more graphics by the artist |
| `game-poc/tiles/shopPlatform.png` | imported | `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles` | `Daniel Armstrong (HughSpectrum)` and `Lanea Zimmerman (Sharm)` via LPC tileset credits | `CC BY-SA 3.0 / GPLv3` | yes | copied from approved donor repo; no further modifications yet | donor source path: `C:\my-heroengine-phaser\assets\tiles\shopPlatform.png`; carried-forward credit source: `C:\my-heroengine-phaser\licensing\tilesetAuthors.md`; used for the gray platform terrain in `apps/studio/game-poc/` |
| `game-poc/heroes/DefaultHero.png` | imported | `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles` | `Stephen Challener (Redshrike)`, `Manuel Riecke (MrBeast)`, `Charles Sanchez (CharlesGabriel)`, and other LPC contributors via donor repo credits | `CC BY-SA 3.0 / GPLv3` | yes | copied from approved donor repo; no further modifications yet | donor source path: `C:\my-heroengine-phaser\assets\heroes\DefaultHero.png`; animation support metadata copied alongside as `assets/game-poc/heroes/anim_map.json`; carried-forward credit source: `C:\my-heroengine-phaser\licensing\spriteAuthors.md`; used as the cockpit pilot sprite in `apps/studio/game-poc/` |
