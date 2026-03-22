# SVG Source Ingestion Proof

This note records a concrete proof that the repository's allowlisted external SVG sources were actually used, not merely discussed.

## Date

- `2026-03-21`

## What Was Done

One SVG sample was downloaded into the repository from each primary or curated allowlisted source:

- Openclipart
- FreeSVG
- PublicDomainVectors
- Open Doodles
- Open Peeps

The files were stored in:

- `simulations/unit-01/lesson-01/mass-change/assets/source-proof/`

And their provenance was recorded in:

- `simulations/unit-01/lesson-01/mass-change/assets/ASSET_MANIFEST.md`

## Why This Matters

This is a control against a known failure mode: defaulting to weaker project-authored placeholders because importing outside assets feels administratively riskier.

The proof imports establish that:

- the allowlist is operational
- the repo can hold third-party assets with documented provenance
- future work should treat these sources as normal starting points when they improve quality

## Operational Consequence

Future agents should not say any of the following without evidence:

- "we should probably just draw it ourselves"
- "outside assets are too risky"
- "the licensing is too unclear"

Those claims are no longer acceptable when the need can be served by the allowlisted sources already proven here.
