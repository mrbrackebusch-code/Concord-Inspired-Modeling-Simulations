# Source Proof Assets

This folder exists to prove that the repository's allowlisted external SVG sources are actually usable in practice and will not be avoided by default.

These files are not yet production simulation assets. They are sourcing smoke-test imports.

## Included Proof Imports

- `openclipart-beaker.svg`
  - source: `https://openclipart.org/detail/327600/beaker`
- `freesvg-beaker.svg`
  - source: `https://freesvg.org/beaker`
- `publicdomainvectors-beaker-illustration.svg`
  - source: `https://publicdomainvectors.org/en/free-clipart/Beaker-illustration/52145.html`
- `opendoodles-selfie.svg`
  - source: `https://www.opendoodles.com/`
- `openpeeps-peep-90.svg`
  - source: `https://www.openpeeps.com/`

## Purpose

These imports prove three things:

1. the allowlist is operational, not hypothetical
2. future agents should not be gun-shy about importing assets from these sources
3. provenance and manifest updates happen in the same work pass as the import

## Follow-Through Rule

When a proof asset is promoted into a real simulation workflow:

1. copy or adapt it into the actual production asset path as needed
2. update the manifest entry with modifications
3. update attribution files if a future source requires that
