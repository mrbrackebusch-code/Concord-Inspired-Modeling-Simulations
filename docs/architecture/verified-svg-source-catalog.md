# Verified SVG Source Catalog

## Verification Snapshot

This catalog records SVG source pools and libraries verified on `2026-03-21`.

Its purpose is to reduce repeated licensing hesitation and to push future agents toward the strongest legally usable sources first.

The most important correction is this:

For this repository, the primary ingestion answer is not icon libraries.
It is single-license `CC0` or public-domain SVG libraries that are large enough to be useful in a production workflow.

## Primary Rule

For broad asset sourcing in this repository, future agents should prefer:

1. single-license `CC0` or public-domain SVG libraries
2. only then curated `CC0` supplements
3. only then other permissive sources if the primary libraries do not solve the problem

This is the best way to reduce legal branching and reduce my tendency to retreat into weaker scratch art.

## Primary Allowlist: Bulk CC0 Or Public-Domain SVG Libraries

These are the first-stop libraries for broad repository ingestion.

| source | status | verified license posture | why it matters | use rule |
| --- | --- | --- | --- | --- |
| [Openclipart](https://openclipart.org/share) | primary allowlist | Openclipart says it has more than 180,000 vector graphics, all graphics are SVG, and uploads use `CC0` / public domain | strong general-purpose bulk SVG source | preferred first search pool; still record exact asset page URL in the manifest |
| [FreeSVG](https://freesvg.org/) | primary allowlist | homepage says SVG images use `CC0` public-domain license | large bulk SVG source with broad clipart coverage | preferred first search pool; still record exact asset page URL in the manifest |
| [PublicDomainVectors](https://publicdomainvectors.org/en/public-domain/) | primary allowlist | site says downloaded vector images are bound to `CC0` | strong backup bulk vector source | use as primary backup after Openclipart and FreeSVG; still record exact asset page URL in the manifest |

## Curated CC0 Supplements

These are not giant general-purpose archives, but they are still clean and valuable because the license posture is simple.

| source | status | verified license posture | why it matters | use rule |
| --- | --- | --- | --- | --- |
| [Open Doodles](https://www.opendoodles.com/) | curated supplement | site says free for commercial and personal use and labels the library `CC0 Public Domain` | good for friendly human figures and scene elements | use when people or sketch-style supporting art helps; not a substitute for a broad object library |
| [Open Peeps](https://www.openpeeps.com/) | curated supplement | site says free for commercial and personal use under `CC0 License` and notes 584,688+ possible combinations | modular people library for characters, poses, and scene support | use for human/teacher/student scenes, not as a general clipart archive |

## Secondary Supplemental Libraries

These are still useful, but they are not the main ingestion answer for this project. They are secondary because they are mostly icon systems, not broad clipart or object-art libraries.

| source | status | verified license posture | best use in this repo |
| --- | --- | --- | --- |
| [Heroicons](https://github.com/tailwindlabs/heroicons) | secondary supplement | `MIT` | UI glyphs and simple structural shapes |
| [Lucide](https://lucide.dev/license) | secondary supplement | `ISC` | UI and simple object bases |
| [Tabler Icons](https://tabler.io/icons) | secondary supplement | `MIT` | clean structural icon bases |
| [Bootstrap Icons](https://github.com/twbs/icons) | secondary supplement | `MIT` | utility icon support |
| [Ionicons](https://github.com/ionic-team/ionicons) | secondary supplement | `MIT` | interface and simple object forms |
| [Remix Icon](https://github.com/Remix-Design/RemixIcon) | secondary supplement | `Apache-2.0` | broad UI support |
| [Phosphor Icons](https://github.com/phosphor-icons/core) | secondary supplement | `MIT` | multi-weight symbolic bases |
| [Feather](https://github.com/feathericons/feather) | secondary supplement | `MIT` | minimal line icon support |
| [Eva Icons](https://github.com/akveo/eva-icons) | secondary supplement | `MIT` | outline/fill symbol support |
| [Iconoir](https://github.com/iconoir-icons/iconoir) | secondary supplement | `MIT` | object icon bases |
| [Radix Icons](https://github.com/radix-ui/icons) | secondary supplement | `MIT` | small UI controls |
| [Ant Design Icons](https://github.com/ant-design/ant-design-icons) | secondary supplement | `MIT` | UI and utility icon support |
| [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) | secondary supplement | `MIT` | system icon support |
| [Clarity Icons](https://github.com/vmware-clarity/core) | secondary supplement | `MIT` | enterprise-style icon support |
| [Google Material Design Icons](https://github.com/google/material-design-icons/releases) | secondary supplement | `Apache-2.0` | large general-purpose icon support |
| [Carbon Icons](https://github.com/carbon-design-system/carbon-icons) | secondary supplement | `Apache-2.0` | technical icon support |
| [IconPark](https://github.com/bytedance/IconPark) | secondary supplement | `Apache-2.0` | customizable icon bases |

## Denylist For Automated Or Bulk Repo Ingestion

These should not be treated as normal ingestion pools for this repository.

| source | status | reason |
| --- | --- | --- |
| [unDraw](https://undraw.co/license) | denylist | license says it does not include the right to link, embed, scrape, search, or download the assets in automated ways without consent, and it separately prohibits AI/ML uses |
| [ManyPixels](https://www.manypixels.co/gallery) | denylist | site says do not redistribute in packs or create integrations and warns that if the illustrations are central to what you are doing, such as adding them in an app, you probably should not proceed |
| [Openverse](https://docs.openverse.org/_preview/2205/api/reference/made_with_ov.html) | denylist for blanket ingestion | documentation says all content is CC or public domain but also says you should always verify the license of a particular work, so it is not a single-license pool |
| [SVG Repo](https://www.svgrepo.com/page/licensing/) | denylist for blanket ingestion | mixed-license ecosystem rather than a single-license library |
| Wikimedia Commons as a whole | denylist for blanket ingestion | file-by-file licensing means it is not a clean single-license ingestion pool |

## Conditional File-By-File Sources

These are valid only with explicit per-file checking.

| source | status | use rule |
| --- | --- | --- |
| Wikimedia Commons | conditional | allowed only when a specific file page is checked and the manifest records the exact license and author |
| Font Awesome Free | conditional | allowed only when an icon from the free set is genuinely the best fit and its attribution obligations are recorded correctly |
| Boxicons Free | conditional | allowed only when the style is useful enough to justify the additional attribution/licensing care |
| Primer Octicons | conditional | avoid logo-shaped assets; use only clearly generic icons |
| OpenMoji | conditional and avoid-by-default | only use by explicit choice because `CC BY-SA 4.0` adds share-alike obligations |

## Already-Vetted Commons Candidate Files For This Project

These specific Commons files were checked and are still valid candidate files for lab-glassware support work.

| file | status | license | likely use |
| --- | --- | --- | --- |
| [File:Beaker.svg](https://commons.wikimedia.org/wiki/File:Beaker.svg) | vetted candidate | public domain (`PD-self`) | beaker outline base, glassware silhouette reference or import |
| [File:Beakers.svg](https://commons.wikimedia.org/wiki/File:Beakers.svg) | vetted candidate | public domain (`PD-self`) | multiple beaker forms, support geometry |
| [File:Yellow test tube icon.svg](https://commons.wikimedia.org/wiki/File:Yellow_test_tube_icon.svg) | vetted candidate | `CC0` | test tube or vial silhouette base |

## Search Order Rule

When a simulation needs a better visual asset, future agents should search in this order:

1. Openclipart
2. FreeSVG
3. PublicDomainVectors
4. Open Doodles or Open Peeps when the asset is a person or scene-support figure
5. secondary supplemental icon libraries only when the problem is really an icon or simple structural base
6. conditional file-by-file sources
7. project-authored custom SVG when no good vetted outside asset exists

That order is intentional. It is designed to suppress the bad habit of defaulting to weaker scratch art.

## Important Caveat

Even with `CC0` or public-domain libraries, future agents still need to watch for:

- brands
- logos
- trademarks
- recognizable people
- publicity-rights issues

For example, FreeSVG's terms note that `CC0` does not affect patent or trademark rights, nor publicity or privacy rights.

## Manifest Rule

Using an allowlisted source still requires a manifest entry.

At minimum, record:

- asset file
- status
- source URL
- author or project
- license
- attribution required
- modifications
- notes

## Attribution Rule

If a chosen asset requires visible attribution, update:

- `docs/architecture/third-party-asset-attribution.md`

Do this in the same work pass as the import.

## Practical Interpretation For Future Work

This catalog should make the following behavior normal:

- searching broad `CC0` libraries before drawing basic labware from scratch
- importing a stronger public-domain or `CC0` beaker or test-tube base instead of accepting weak placeholder geometry
- using permissive icon libraries only as supplements, not as the main answer to the art problem
- refusing sources whose terms are structurally bad for automation or repo ingestion

This catalog should make the following behavior abnormal:

- reaching for icon libraries first when the problem is really broad object art
- treating mixed-license aggregators as if they were safe blanket ingestion sources
- claiming quality is blocked by licensing before checking the primary allowlist
- rebuilding generic glassware or object silhouettes from scratch without a good reason

## Verification Notes

This catalog is based on source statements available on `2026-03-21`.

If a source changes its licensing terms later, update this file with the new date and revised guidance.
