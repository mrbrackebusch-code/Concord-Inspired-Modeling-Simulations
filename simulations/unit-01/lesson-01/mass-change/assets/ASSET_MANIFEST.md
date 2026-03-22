# Mass & Change Asset Manifest

This manifest records provenance for the `Mass & Change` asset set.

Every imported or adapted third-party asset used in this folder must be listed here before it is treated as part of shipping work.

## Fields

- `asset file`
- `status`
- `source URL`
- `author or project`
- `license`
- `attribution required`
- `modifications`
- `notes`

For imports carried through a local donor repository such as `C:\my-heroengine-phaser`,
record the donor file path and the carried-forward upstream credit source in `notes`.

## Current Project-Authored Assets

These files are currently treated as project-authored within this repository and do not depend on outside SVG provenance.

| asset file | status | source URL | author or project | license | attribution required | modifications | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `flame-plume.svg` | project-authored | n/a | Rainbow Possibility Simulations repo | project-authored | no | authored and revised locally | current flame placeholder |
| `alka-tablet.svg` | project-authored | n/a | Rainbow Possibility Simulations repo | project-authored | no | authored and revised locally | current tablet placeholder |
| `ice-cube.svg` | project-authored | n/a | Rainbow Possibility Simulations repo | project-authored | no | authored and revised locally | current ice placeholder |
| `grab-star.svg` | project-authored | n/a | Rainbow Possibility Simulations repo | project-authored | no | authored and revised locally | drag affordance |

## Imported Or Adapted Third-Party Assets

These entries are current imports in the repository.

| asset file | status | source URL | author or project | license | attribution required | modifications | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `source-proof/openclipart-beaker.svg` | imported | `https://openclipart.org/detail/327600/beaker` | Openclipart contributor `nicubunu` via Openclipart | `CC0 / public domain` per Openclipart site policy | no | none yet | ingestion proof asset; not currently wired into a live simulation |
| `source-proof/freesvg-beaker.svg` | imported | `https://freesvg.org/beaker` | listed by FreeSVG as published by `OpenClipart` | `CC0 public domain` per FreeSVG site policy | no | none yet | ingestion proof asset; downloaded with browser user-agent; not currently wired into a live simulation |
| `source-proof/publicdomainvectors-beaker-illustration.svg` | imported | `https://publicdomainvectors.org/en/free-clipart/Beaker-illustration/52145.html` | PublicDomainVectors page for `Beaker illustration` | `CC0` per PublicDomainVectors site policy | no | none yet | ingestion proof asset; not currently wired into a live simulation |
| `source-proof/opendoodles-selfie.svg` | imported | `https://www.opendoodles.com/` | Open Doodles | `CC0 Public Domain` per site | no | none yet | ingestion proof asset; not currently wired into a live simulation |
| `source-proof/openpeeps-peep-90.svg` | imported | `https://www.openpeeps.com/` | Open Peeps | `CC0 License` per site | no | none yet | ingestion proof asset; not currently wired into a live simulation |
| `source-candidates/openclipart-steel-wool-pad.svg` | imported | `https://openclipart.org/detail/155575/a-pad-of-steel-wool` | Openclipart contributor `mystica` via Openclipart | `CC0 / public domain` per Openclipart site policy | no | none yet | candidate base for the steel wool family |
| `steel-wool-compact.svg`, `steel-wool-loose.svg`, `steel-wool-fragment.svg`, `steel-wool-burnable.svg`, `steel-wool-ember-overlay.svg`, and `steel-wool-ash-overlay.svg` | adapted third-party | `https://openclipart.org/detail/155575/a-pad-of-steel-wool` | adapted from Openclipart contributor `mystica` via Openclipart | `CC0 / public domain` per Openclipart site policy | no | imported base sanitized, cropped, recolored, and adapted into compact, loose, fragment, burnable, ember, and ash variants | shared steel wool family rebuilt around the imported steel wool pad source |
| `source-candidates/freesvg-red-digital-scale.svg` | imported | `https://freesvg.org/red-digital-scale` | FreeSVG page `Red digital scale` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for shared scale redesign |
| `balance-scale.svg`, `balance-scale-dynamic.svg`, and generated `balance-scale-*.svg` variants | adapted third-party | `https://freesvg.org/red-digital-scale` | adapted from FreeSVG page `Red digital scale` | `CC0 public domain` per FreeSVG site policy | no | imported base retained, old display masked, new measured-mass display and generated readout variants added locally | shared scale component rebuilt around the imported red digital scale |
| `source-candidates/freesvg-beaker-outline.svg` | imported | `https://freesvg.org/beaker-outline` | FreeSVG page `Beaker outline` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for beaker scenes |
| `source-candidates/freesvg-water-beaker.svg` | imported | `https://freesvg.org/water-beaker` | FreeSVG page `Water beaker` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for liquid-filled beaker scenes |
| `source-candidates/freesvg-test-tube-empty-graded.svg` | imported | `https://freesvg.org/reagenzglas-leer-skala` | FreeSVG page `reagenzglas leer skala` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for precipitate setup scenes |
| `source-candidates/freesvg-test-tube-filled.svg` | imported | `https://freesvg.org/reagenzglas-voll-simpel` | FreeSVG page `reagenzglas voll simpel` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for precipitate and liquid states |
| `source-candidates/freesvg-empty-glass-jar.svg` | imported | `https://freesvg.org/empty-glass-jar` | FreeSVG page `Empty Glass Jar` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for jar scenes |
| `beaker-outline.svg`, `beaker-ice-*.svg`, `beaker-sugar-*.svg`, and `beaker-alka-*.svg` | adapted third-party | `https://freesvg.org/beaker-outline` and `https://freesvg.org/water-beaker` | adapted from FreeSVG pages `Beaker outline` and `Water beaker` | `CC0 public domain` per FreeSVG site policy | no | imported beaker bases sanitized, recomposed, and extended with shared liquid, ice, sugar, tablet, bubble, and animated melt layers | shared beaker family rebuilt around imported FreeSVG beaker sources |
| `jar-outline.svg` and `jar-alka-captured*.svg` | adapted third-party | `https://freesvg.org/empty-glass-jar` | adapted from FreeSVG page `Empty Glass Jar` | `CC0 public domain` per FreeSVG site policy | no | imported jar base sanitized and recomposed with shared liquid, tablet, and bubble layers | shared jar family rebuilt around the imported FreeSVG jar source |
| `precipitate-before.svg`, `precipitate-after.svg`, and `precipitate-pour*.svg` | adapted third-party | `https://freesvg.org/reagenzglas-leer-skala` and `https://freesvg.org/reagenzglas-voll-simpel` | adapted from FreeSVG pages `reagenzglas leer skala` and `reagenzglas voll simpel` | `CC0 public domain` per FreeSVG site policy | no | imported test-tube bases sanitized, composed into paired-tube layouts, and extended with liquid, cloud, and pour animation layers | shared precipitate and test-tube family rebuilt around imported FreeSVG tube sources |
| `source-candidates/freesvg-flame.svg` | imported | `https://freesvg.org/flame` | FreeSVG page `Flame` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for burn animation work |
| `burn-flame-small.svg` and `burn-flame-large.svg` | adapted third-party | `https://freesvg.org/flame` | adapted from FreeSVG page `Flame` | `CC0 public domain` per FreeSVG site policy | no | imported flame source simplified and cropped to flame-only animated assets for the steel wool burn sequence | open-pan burn proof-of-concept flame assets |
| `burn-smoke-light.svg` and `burn-smoke-heavy.svg` | project-authored | n/a | Rainbow Possibility Simulations repo | project-authored | no | authored locally as lightweight smoke overlays for the steel wool burn sequence | burn-sequence support assets |
| `source-candidates/freesvg-paracetamol-pill.svg` | imported | `https://freesvg.org/paracetamol-pill` | FreeSVG page `Paracetamol Pill` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for tablet scenes |
| `source-candidates/freesvg-ice-cube.svg` | imported | `https://freesvg.org/ice-cube` | FreeSVG page `Ice cube` | `CC0 public domain` per FreeSVG site policy | no | none yet | candidate base for ice scenes |

## Review Rule

If a future agent imports a third-party file and does not update this manifest in the same work pass, that work is incomplete.
