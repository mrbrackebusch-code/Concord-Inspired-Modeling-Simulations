# SVG Asset Sourcing And Licensing

## Purpose

This repository should aggressively use legally usable SVG assets when they improve simulation quality.

For game-side pixel art, LPC art, tiles, props, and other non-SVG visual assets, do not
restart a broad external search if the approved donor repository already has what we need.
Use:

- `docs/architecture/game-art-donor-repo-licensing.md`

for that workflow.

The failure mode to avoid is not only bad licensing practice. It is also needless visual weakness caused by over-avoiding perfectly usable outside assets.

The project rule is therefore:

`use the best legally usable asset available, then document it correctly`

That is the standard future agents should follow.

## Why This Policy Exists

Two bad behaviors have to be prevented at the same time:

1. careless asset reuse with weak or missing provenance
2. over-cautious refusal to use good free assets, resulting in weaker simulations and wasted time

This policy exists to block both.

## Default Decision Rule

Before a broad asset search, consult `docs/architecture/verified-svg-source-catalog.md`.

For broad ingestion, prefer single-license `CC0` or public-domain libraries first.

When a simulation needs an object such as a scale, beaker, flame, test tube, jar, bubble system, or other macroscopic lab visual:

1. search the repo's primary `CC0` or public-domain allowlist first
2. prefer the outside asset if it materially improves quality
3. adapt it as needed
4. record provenance and modification details in the asset manifest
5. only fall back to conditional or mixed-license sources when the allowlist does not solve the problem cleanly
6. only draw from scratch when no good vetted outside asset exists or when the phenomenon is too lesson-specific for stock art

Do not default to scratch art merely because it is familiar.

## Allowed License Tiers

### Preferred

These are the easiest tiers to use:

- `CC0`
- public domain
- `MIT`
- `ISC`
- `Apache-2.0`
- similarly permissive licenses that allow commercial use and modification

These may be imported into the repository as long as their provenance is recorded.

### Allowed With Attribution Discipline

These are allowed only when the manifest and any required attribution are handled carefully:

- `CC BY 3.0`
- `CC BY 4.0`
- other attribution-only licenses with similar requirements

If a source requires attribution, the manifest must say so explicitly and `docs/architecture/third-party-asset-attribution.md` must be updated when the asset is used in a shipping surface.

### Avoid By Default

These should not be the first choice because they complicate downstream use:

- `CC BY-SA`
- any reciprocal or share-alike art license

Only use these when there is a clear quality payoff that justifies the additional obligations, and record that decision explicitly.

### Do Not Use

These are not acceptable for shipping repository assets:

- `CC BY-NC`
- `CC BY-ND`
- any `NC` or `ND` variant
- assets with unclear, missing, contradictory, or unverifiable license terms
- sources whose terms ban automated scraping, searching, linking, embedding, integrations, or similar ingestion patterns needed by this workflow

If a source cannot be verified cleanly, do not import it.

## Current Approved Source Types

The repository may actively source SVG assets from places such as:

- single-license `CC0` or public-domain SVG libraries
- permissive icon libraries used as supplements
- selected file-by-file sources when the file is verified individually
- project-owned original art

The preferred order is intentional: broad `CC0` libraries first, icons second, file-by-file exceptions third, scratch art last.

## Important Distinction: Reference vs Imported Asset

There are two valid ways to use outside visuals:

### As reference only

- screenshot or inspect the outside image
- use it to improve proportions, silhouette, or timing
- do not copy the source file into the repo

This does not create an imported asset obligation, though it can still be useful to note important references in planning docs.

### As an imported or adapted asset

- copy the SVG or derivative into the repository
- modify it, composite it, recolor it, or animate it

This requires a manifest entry.

## Manifest Requirement

Every imported or adapted third-party visual asset must have an entry in the relevant simulation asset manifest.

Required fields:

- asset file
- status: `project-authored`, `imported`, or `adapted`
- source URL
- original author or project
- license
- attribution required: `yes` or `no`
- modifications made
- notes

If any required field is unknown, the asset is not ready for use.

## Asset Folder Expectations

For each simulation asset set:

- the assets folder holds the usable files
- `ASSET_MANIFEST.md` is the source-of-truth provenance record
- project-authored files should still be marked as project-authored in the manifest
- imported files should preserve enough naming clarity that their origin can still be traced

## Agent Behavior Rules

Future agents working in this repository must obey the following:

1. Do not avoid permissive outside assets just because making everything from scratch feels simpler administratively.
2. Do not treat icon libraries as the main answer when the problem is broad object art or illustration.
3. Do not claim a visual is "good enough" if a clearly better legal asset could replace it with modest effort.
4. Do not import an asset without recording its provenance.
5. Do not guess at license terms.
6. Do not use `NC`, `ND`, unclear-license, or automation-hostile sources in shipping work.
7. Do not let licensing caution become an excuse for low visual quality.
8. Do not let visual ambition become an excuse for sloppy licensing.

## Practical Workflow

When adding a new visual asset:

1. identify the object or effect that needs help
2. search the primary allowlist first
3. choose the strongest viable asset
4. import or adapt it
5. optimize it if needed
6. add or update the manifest entry immediately
7. note whether visible attribution must be carried into public deployment

## Decision Heuristic

Use this question:

`Would a vetted outside SVG make the simulation materially more believable than what the project currently has?`

If yes, and the license is acceptable, use it.

That is not laziness. That is good production judgment.

Avoiding such assets by default is the lazy choice because it produces weaker work while pretending to be safer than it really is.
