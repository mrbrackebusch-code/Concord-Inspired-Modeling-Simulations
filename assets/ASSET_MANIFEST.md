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
| `game-poc/tiles/terrain.png` | imported | `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles` | `Daniel Armstrong (HughSpectrum)` and `Lanea Zimmerman (Sharm)` via LPC tileset credits | `CC BY-SA 3.0 / GPLv3` | yes | copied from approved donor repo; used as the base autotile sheet for donor-style dry ground, water pools, and debris rendering in `apps/studio/game-poc/` | donor source path: `C:\my-heroengine-phaser\assets\tiles\terrain.png`; carried-forward credit source: `C:\my-heroengine-phaser\licensing\tilesetAuthors.md`; replaces the earlier fixed `shopPlatform`-only terrain build with atlas-driven terrain family selection |
| `game-poc/tiles/rocks.png` | imported | `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles` and credited rock-source chain in donor repo | `bluecarrot16`, `Johann Charlot`, `Yar`, `Hyptosis`, `Evert`, `Lanea Zimmerman (Sharm)`, `Guillaume Lecollinet`, `Richard Kettering (Jetrel)`, `Zachariah Husiar (Zabin)`, `Rayane Félix (RayaneFLX)`, `Michele Bucelli (Buch)`, and other listed contributors via donor repo credits | mixed permissive licenses noted in donor credits, including `CC BY-SA 3.0`, `CC BY 3.0`, `GPL 3.0`, `CC BY 4.0`, and `CC0` | yes where required | copied from approved donor repo; used with existing donor rock categorization for blocking rock props in `apps/studio/game-poc/` | donor source path: `C:\my-heroengine-phaser\assets\tiles\rocks.png`; carried-forward credit source: `C:\my-heroengine-phaser\assets\tiles\RocksCredits.txt`; specific brown rock prop rectangles are derived from the donor file `src/rockDefs.ts` |
| `game-poc/tiles/rocks_aura_r0.png` | imported | donor-generated aura sheet derived from the donor rock tileset | same donor rock-source chain as `game-poc/tiles/rocks.png` | derived from the donor sheet licensing chain | yes where required | copied from approved donor repo; used as the rock silhouette collision mask sheet for `apps/studio/game-poc/` | donor source path: `C:\my-heroengine-phaser\assets\tiles\auras\rocks_aura_r0.png`; paired with `rocks.png` for shape-aware collision rather than rectangle collision |
| `game-poc/tiles/shopPlatform.png` | imported | `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles` | `Daniel Armstrong (HughSpectrum)` and `Lanea Zimmerman (Sharm)` via LPC tileset credits | `CC BY-SA 3.0 / GPLv3` | yes | copied from approved donor repo; no further modifications yet | donor source path: `C:\my-heroengine-phaser\assets\tiles\shopPlatform.png`; carried-forward credit source: `C:\my-heroengine-phaser\licensing\tilesetAuthors.md`; retained as an approved donor sheet from the earlier POC pass, but no longer the active terrain renderer |
| `game-poc/heroes/DefaultHero.png` | imported | `https://opengameart.org/content/liberated-pixel-cup-lpc-base-assets-sprites-map-tiles` | `Stephen Challener (Redshrike)`, `Manuel Riecke (MrBeast)`, `Charles Sanchez (CharlesGabriel)`, and other LPC contributors via donor repo credits | `CC BY-SA 3.0 / GPLv3` | yes | copied from approved donor repo; no further modifications yet | donor source path: `C:\my-heroengine-phaser\assets\heroes\DefaultHero.png`; animation support metadata copied alongside as `assets/game-poc/heroes/anim_map.json`; carried-forward credit source: `C:\my-heroengine-phaser\licensing\spriteAuthors.md`; used as the cockpit pilot sprite in `apps/studio/game-poc/` |
| `Mechanical Tentacle Arm/base_mount_large.png`, `block_joint.png`, `socket_cup.png`, `connector_link.png`, `tapered_joint_plain.png`, `tapered_joint_striped.png`, `claw_open.png`, and `claw_closed.png` | imported | `local user-provided generated asset; no public source URL provided in repo` | `user-provided generated asset placed in the workspace by the project owner` | `project-owner provided local asset; external redistribution terms not recorded in repo metadata yet` | no project-side attribution requirement recorded | extracted as separate modular arm parts and used directly to assemble cached manipulator poses in `apps/studio/game-poc/` | source folder: `assets/Mechanical Tentacle Arm/`; used as the first ship-mounted prehensile arm donor for cached curved arm rendering with alternating plain and striped vertebrae plus connector links |
