# Codex SVG Allowlist And Denylist

## Purpose

This file is the short operational version of the broader SVG sourcing policy.

Use it when the question is simple:

- where should Codex search first?
- what should Codex avoid?

## Allowlist For Broad Repo Ingestion

Use these first for automated or semi-automated asset sourcing:

1. [Openclipart](https://openclipart.org/share)
2. [FreeSVG](https://freesvg.org/)
3. [PublicDomainVectors](https://publicdomainvectors.org/en/public-domain/)
4. [Open Doodles](https://www.opendoodles.com/)
5. [Open Peeps](https://www.openpeeps.com/)

## Why These Are Allowed

- they are broad enough to be useful
- they present simple `CC0` or public-domain reuse stories for this workflow
- they reduce attribution branching and per-asset licensing friction
- they are better aligned with a Codex ingestion workflow than mixed-license aggregators

## Supplemental Sources

These are allowed as supplements, not as the primary answer to the art problem:

- permissive icon libraries listed in `docs/architecture/verified-svg-source-catalog.md`
- individually verified file-by-file sources when the allowlist does not solve the problem

## Denylist For Broad Repo Ingestion

Do not treat these as normal ingestion pools for this repository:

1. [unDraw](https://undraw.co/license)
2. [ManyPixels](https://www.manypixels.co/gallery)
3. [Openverse](https://docs.openverse.org/_preview/2205/api/reference/made_with_ov.html)
4. [SVG Repo](https://www.svgrepo.com/page/licensing/)
5. Wikimedia Commons as a whole

## Why These Are Denied For Blanket Use

- mixed licensing
- terms that require per-work verification
- terms that restrict scraping, embedding, automated search, integrations, or similar ingestion behavior
- risk of wasting time on legal branching or non-compliant automation

## Caveat

Even allowlisted `CC0` or public-domain sources still require care around:

- brands
- logos
- trademarks
- recognizable people
- publicity-rights issues

## Required Follow-Through

When an asset is actually imported:

1. update the simulation asset manifest
2. update the attribution file if required
3. note modifications made
