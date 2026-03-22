# Mass & Change Asset Replacement Map

## Purpose

This map says what should happen to the current `Mass & Change` SVG assets.

It does not assume every current file should be swapped one-for-one.
For many of the current scene files, the right move is to replace the underlying object art and then rebuild the scene as a composite.

That distinction matters because most of the weak files in the current suite are not bad only because of one icon. They are bad because the entire scene was built out of weak parts.

## Replacement Modes

- `direct replace`: the current file can be replaced by a library asset with modest adaptation
- `replace base and regenerate`: use the library asset as the new base, then regenerate variants
- `rebuild from library parts`: do not keep the current file; rebuild the scene from stronger imported parts plus custom animation layers
- `keep custom`: keep the file project-authored because the affordance or phenomenon is too specific for stock assets

## Current Mapping

| current asset(s) | current role | replacement mode | proposed replacement source | rationale |
| --- | --- | --- | --- | --- |
| `balance-scale.svg` | shared scale body | replace base and regenerate | `source-candidates/freesvg-red-digital-scale.svg` | the current scale is too diagrammatic; the imported scale is a stronger base for all readout variants |
| `balance-scale-blank.svg`, `balance-scale-*.svg` | generated display variants | replace base and regenerate | derive from `freesvg-red-digital-scale.svg` | keep the variant-generation pattern, but use the stronger scale art underneath |
| `beaker-outline.svg` | generic beaker base | direct replace | `source-candidates/freesvg-beaker-outline.svg` | stronger glass silhouette and labware proportions |
| `beaker-ice-before.svg`, `beaker-ice-after.svg`, `beaker-ice-melting.svg`, `beaker-ice-melting-early.svg`, `beaker-ice-melting-late.svg` | ice scene composites | rebuild from library parts | `source-candidates/freesvg-beaker-outline.svg`, `source-candidates/freesvg-water-beaker.svg`, `source-candidates/freesvg-ice-cube.svg` | the scene should be rebuilt from stronger vessel and ice art, then animated |
| `beaker-sugar-before.svg`, `beaker-sugar-not-stirred.svg`, `beaker-sugar-not-stirred-mid.svg`, `beaker-sugar-stirred.svg`, `beaker-sugar-stirred-mid.svg` | sugar scene composites | rebuild from library parts | `source-candidates/freesvg-beaker-outline.svg`, `source-candidates/freesvg-water-beaker.svg` | replace weak beaker base, keep sugar dissolution as custom overlays |
| `beaker-alka-before.svg`, `beaker-alka-vented-start.svg`, `beaker-alka-vented.svg` | Alka-Seltzer beaker composites | rebuild from library parts | `source-candidates/freesvg-beaker-outline.svg`, `source-candidates/freesvg-water-beaker.svg`, `source-candidates/freesvg-paracetamol-pill.svg` | use stronger beaker and tablet base art, then animate bubbles and disturbance |
| `jar-outline.svg` | generic jar base | direct replace | `source-candidates/freesvg-empty-glass-jar.svg` | stronger vessel silhouette and glass detail |
| `jar-alka-captured-start.svg`, `jar-alka-captured.svg` | captured-gas jar composites | rebuild from library parts | `source-candidates/freesvg-empty-glass-jar.svg`, `source-candidates/freesvg-paracetamol-pill.svg` | rebuild around stronger jar art, keep gas effects custom |
| `precipitate-before.svg`, `precipitate-after.svg`, `precipitate-pour.svg`, `precipitate-pour-start.svg`, `precipitate-pour-end.svg` | test-tube and precipitate scenes | rebuild from library parts | `source-candidates/freesvg-test-tube-empty-graded.svg`, `source-candidates/freesvg-test-tube-filled.svg` | the current test tubes are too weak; the cloud and settling remain custom because that is the actual phenomenon |
| `flame-plume.svg` | generic flame effect | direct replace or adapt | `source-candidates/freesvg-flame.svg` | stronger flame base for burn scenes |
| `burns-open-start.svg`, `burns-open-scene.svg`, `burns-closed-start.svg`, `burns-closed-scene.svg` | steel wool burn scenes | rebuild from library parts | `source-candidates/openclipart-steel-wool-pad.svg`, `source-candidates/freesvg-flame.svg`, `source-candidates/freesvg-red-digital-scale.svg` | do not keep these as-is; rebuild around stronger steel wool, flame, and scale parts |
| `steel-wool-compact.svg`, `steel-wool-loose.svg`, `steel-wool-fragment.svg` | steel wool family | replace base and derive variants | `source-candidates/openclipart-steel-wool-pad.svg` | the imported steel wool gives a much stronger material basis; derive compact, loose, fragment, and burning variants from it |
| `alka-tablet.svg` | tablet object | direct replace or adapt | `source-candidates/freesvg-paracetamol-pill.svg` | stronger tablet form than the current placeholder |
| `ice-cube.svg` | ice object | direct replace or adapt | `source-candidates/freesvg-ice-cube.svg` | stronger base for ice clusters and melt progression |
| `grab-star.svg` | pull affordance | keep custom | keep current file or redraw project-authored | this is an interaction affordance, not a stock object-art problem |

## Practical Consequence

The correct rebuild strategy is not `swap every scene file for one downloaded file`.

The correct rebuild strategy is:

1. replace weak object bases with imported library art
2. regenerate repeated variants from those stronger bases
3. rebuild process-heavy scene composites around those stronger parts
4. keep only the truly simulation-specific affordances and phenomenon layers custom

## Priority Order

Use the replacement map in this order:

1. scale
2. steel wool base family
3. beaker and jar bases
4. precipitate test-tube bases
5. flame
6. tablet
7. ice
8. composite scene rebuilds driven by those bases

That order will give the biggest visible improvement fastest.
