# Mass & Change Total Rebuild Plan

## Purpose

This is the consolidated execution document for rebuilding the current `Mass & Change` suite into something substantially more polished, more believable, and more pedagogically faithful.

It exists because the project has accumulated multiple valid corrections that should no longer live only in conversation:

- the simulations must be Concord-style, not state browsers
- meaningful visible change must unfold over time
- macroscopic evidence comes first in this lesson
- the art must stop looking placeholder-level
- outside SVG assets must be used aggressively when the license posture is good
- the current asset set should be rebuilt around stronger imported bases
- the scale must become a first-class instrument
- future `next` turns should make large forward moves instead of re-planning

This document is the working source of truth for that rebuild.

## Source Documents

This plan depends on the following files and should be read with them in mind:

- `docs/architecture/concord-interactive-pedagogy.md`
- `docs/architecture/animation-and-scene-architecture-standard.md`
- `docs/architecture/process-realism-standard.md`
- `docs/architecture/mass-change-rebuild-master-plan.md`
- `docs/architecture/mass-change-asset-replacement-map.md`
- `docs/architecture/svg-asset-sourcing-and-licensing.md`
- `docs/architecture/verified-svg-source-catalog.md`
- `docs/architecture/codex-svg-allowlist-denylist.md`
- `simulations/unit-01/lesson-01/mass-change/assets/ASSET_MANIFEST.md`

If this file conflicts with older planning language, this file wins for the current rebuild.

## Core Standard

Every simulation must satisfy this chain:

`student action -> visible process over time -> evidence -> measured response when relevant -> student interpretation`

That chain is not optional.

The visual ambition standard is also locked:

`keep interaction simple; make the modeled reality rich`

That means the suite should not chase complexity through more controls. It should chase quality through better observation and better process detail.

## Hard Constraints

1. No particles in Lesson 1.
2. No static poster-state feeling.
3. No hidden switch in what is being weighed.
4. No "interactive" claims unless the learner causes meaningful change.
5. No animation that is really just a disguised still-image swap.
6. No relying on labels to rescue weak art.
7. No avoiding high-quality outside assets because scratch art feels administratively easier.
8. No mixed-license blanket ingestion from denylisted sources.
9. No forcing awkward drag interactions when a clean button better represents the lab action.
10. No calling a phase complete because the JSON loads.
11. No process animation may be so short that a learner cannot actually witness it.
12. No process may rely on magical transfer, teleporting matter, detached effects, or orientation-free motion when those would obviously break the real-world illusion.
13. No process should be reduced to generic animation shorthand when the real phenomenon has richer visible detail that can be modeled.
14. No meaningful scene element should be authored through a dead static-only path that blocks later motion, deformation, or effects work.

## Current Accepted Design Decisions

These are no longer open questions.

1. The studio home is a menu of links. The simulations remain individual in practice.
2. Buttons are acceptable when they represent real actions such as `Play`, `Pour`, `Weigh`, `Shake`, `Start burning`, or `Start melting`.
3. `Steel wool burns` should currently be simplified to the open-pan proof-of-concept where the mass rises during burning. The confusing closed comparison is not the active target.
4. `Precipitate` should be button-driven procedural interaction, not liquid dragging.
5. `Steel wool pulled apart` should still become a real manipulation interaction.
6. Visual process quality now matters more than adding more controls.
7. The library sourcing order is `Openclipart -> FreeSVG -> PublicDomainVectors -> Open Doodles / Open Peeps -> supplemental permissive icon libraries -> conditional sources -> scratch art`.
8. Process realism outranks mere animation presence. If a scene has motion but still reads like a fake state swap, it is not acceptable.
9. Motion-capable scene architecture is mandatory. If an object may need to move, tilt, slosh, deform, glow, drip, settle, or emit effects later, it should be built so that remains possible.

## Current Known Failures To Eliminate

1. Scale art too weak.
2. Steel wool art too weak.
3. Fire art and fire process too weak.
4. Precipitate too still and too slide-like.
5. Bubble systems too generic.
6. Dissolving too synthetic.
7. Melting too icon-like.
8. Current scene files built from weak object bases.
9. Too much of the suite still feels like authored state transitions rather than witnessed processes.
10. Too many visuals still depend on thin custom SVG instead of stronger imported foundations.

## Asset Strategy

The current project should not keep trying to make each scene from raw scratch SVG.

The correct strategy is:

1. import strong outside bases
2. replace shared object families first
3. regenerate repeated variants from those stronger bases
4. rebuild process-heavy scenes around those bases
5. keep only the truly simulation-specific layers custom

## Imported Candidate Bases Already In Repo

These are already downloaded and available under `simulations/unit-01/lesson-01/mass-change/assets/source-candidates/`.

1. `freesvg-red-digital-scale.svg`
2. `freesvg-beaker-outline.svg`
3. `freesvg-water-beaker.svg`
4. `freesvg-test-tube-empty-graded.svg`
5. `freesvg-test-tube-filled.svg`
6. `freesvg-empty-glass-jar.svg`
7. `freesvg-flame.svg`
8. `freesvg-paracetamol-pill.svg`
9. `freesvg-ice-cube.svg`
10. `openclipart-steel-wool-pad.svg`

These should be treated as active rebuild inputs, not as curiosities.

## Replacement Decisions Already Locked

1. Scale family should rebuild around `freesvg-red-digital-scale.svg`.
2. Beaker base should rebuild around `freesvg-beaker-outline.svg` and `freesvg-water-beaker.svg`.
3. Jar base should rebuild around `freesvg-empty-glass-jar.svg`.
4. Precipitate tube scenes should rebuild around the FreeSVG test-tube assets.
5. Flame should rebuild around `freesvg-flame.svg` as a base, not as the final effect.
6. Tablet should rebuild around `freesvg-paracetamol-pill.svg`.
7. Ice should rebuild around `freesvg-ice-cube.svg`.
8. Steel wool family should rebuild around `openclipart-steel-wool-pad.svg`.
9. `grab-star.svg` remains custom unless a better project-authored affordance is made.

## Shared Systems That Must Be Rebuilt Before Calling Anything Polished

### Shared Scale System

1. Shared scale body base imported from the stronger outside asset.
2. Shared zero state.
3. Shared placement response.
4. Shared display window behavior.
5. Shared digit styling.
6. Shared digit transition pacing.
7. Shared slight display lag so numbers do not feel teleported in.
8. Shared rule that the readout must be part of the event, not a label glued under it.

### Shared Vessel System

1. Shared beaker base.
2. Shared jar base.
3. Shared test-tube base.
4. Shared glass highlight treatment.
5. Shared liquid clipping and containment logic.
6. Shared meniscus treatment.
7. Shared shadow and line-weight conventions.

### Shared Animation Grammar

1. Nothing important may hard-pop into existence.
2. The learner should be able to tell where the evidence came from by watching.
3. All processes need early, middle, and late stages.
4. All processes need a readable start and readable finish.
5. All resets must feel clean and intentional.
6. If a process can be reduced to a before/after image without losing much, the animation is not good enough yet.
7. Process animations must be human-readable. As a default rule, visible process events should usually run long enough to watch, not flash by. Single-event transformations should generally live in the roughly 1.5s to 5s range unless the phenomenon demands otherwise.
8. Microresponses may be shorter, but still must be perceptible. Scale readout changes, button-state responses, and small object-settling motions should still visibly unfold rather than pop.
9. Every process bundle must be judged from early, middle, and late frames plus the felt duration of the motion itself.
10. Every process bundle must also be judged for visible causation, matter continuity, orientation truth, contact truth, and whether the finish feels earned.
11. Slowing down a bad state swap does not satisfy this grammar.
12. The single fakest frame of each process must be reviewed on purpose.

## Per-Simulation Goals

### Steel Wool Burns

The point is:

- one clean setup
- steel wool on the scale/pan
- learner starts the burn
- burning unfolds over time
- mass rises over time

The simulation must capture:

1. recognizable steel wool before burning
2. one localized ignition point rather than instant full flame
3. first glow and tiny initial sparks before the main burn develops
4. glow spreading through the steel wool along believable regions
5. flame flicker that feels attached to the object
6. irregular sparks that emerge from the active burn
7. gradual transformation of the steel wool into darker oxidized residue
8. some regions still reading as less affected while others are actively burning
9. mass change that visibly progresses during the burn
10. a replayable burn sequence that feels authored, not clipped together
11. a burn duration long enough to actually watch the process happen
12. a final object that still reads as the same wool sample, now transformed

### Precipitate

The point is:

- learner controls `Weigh (before)`
- learner controls `Pour`
- learner controls `Weigh (after)`
- the precipitate forms as a visible process

The simulation must capture:

1. strong test-tube silhouettes
2. believable contained liquids before mixing
3. actual tilt and pour motion
4. liquid slosh toward the lip before the main pour begins
5. stream transfer that reads as liquid, not a line
6. cloud formation that starts faint and intensifies at the point of mixing
7. swirl or eddy motion in the cloud
8. settling or bottom accumulation late in the process
9. measurement reveal only at the weighing actions
10. receiver positioning that makes the transfer believable
11. late drips that make the transfer feel complete
12. process detail informed by the actual Ca(NO3)2 + Na2CO3 -> CaCO3 reaction target rather than a generic cloudy mix

### Alka-Seltzer

The point is:

- learner starts the reaction
- bubbling unfolds over time
- vented versus captured reads through visible gas behavior
- measurement response supports the lesson

The simulation must capture:

1. clear tablet identity before reaction
2. delayed onset rather than instant fizz state
3. bubble density growth over time
4. liquid disturbance from bubbling
5. difference between vented and captured through gas behavior, not just labels
6. measurement behavior tied to the reaction sequence

### Sugar Dissolves

The point is:

- visible solid disappears from sight
- measured mass does not vanish
- stirred and unstirred differ through process

The simulation must capture:

1. believable sugar granules or crystal mass
2. slow uneven dissolution when unstirred
3. faster mixing and disappearance when stirred
4. some transient cloudiness or concentration zones
5. stable measurement while visible solid changes

### Ice To Water

The point is:

- learner starts the process
- time passes visibly
- ice turns into water continuously
- measurement supports the evidence

The simulation must capture:

1. multiple ice cubes, not one generic icon
2. separate blocks that read as separate blocks in the container
3. solid ice that reads as solid matter
4. early gloss and softening
5. runoff and accumulating liquid
6. shrinking / sloughing rather than icon deletion
7. late rounded or oblong remnants before full melt
8. clock and scale that feel alive during the process
9. separate blocks that still feel like separate blocks while melting

### Steel Wool Pulled Apart

The point is:

- learner manipulates the material directly
- visible separation occurs
- the scale becomes part of the evidence path

The simulation must capture:

1. believable steel wool even before interaction
2. one meaningful pull affordance
3. deformation or separation during pull
4. sense of physical connection or resistance
5. visually clear return-to-scale interaction
6. repeated trials only if they still feel like repeated manipulation, not stepping through scenes

## Quality Gates

### Art Gate

A pass fails if:

1. the object silhouette is weak
2. the object is only readable because of text
3. the line work still reads like placeholder vector output
4. the object loses material identity while changing
5. the imported art still looks like untouched clipart pasted into the scene

### Animation Gate

A pass fails if:

1. the process starts or ends abruptly
2. the motion is too linear or too even
3. the change is only obvious in stills, not in motion
4. the scene still feels like a state browser
5. the learner cannot tell what action produced the evidence
6. matter seems to teleport instead of move or transform
7. orientation or gravity cues are missing where they should be present
8. the process would still read almost the same if replaced with two or three stills

### Measurement Gate

A pass fails if:

1. the scale still feels decorative
2. the digits appear from nowhere
3. the mass change is too abrupt to register as part of the process
4. the setup quietly changes what is being weighed

### Process Realism Gate

A pass fails if:

1. the scene violates the rules in `docs/architecture/process-realism-standard.md`
2. the single fakest frame breaks trust in the process
3. the process cannot be explained as a chain of visible cause and effect
4. the final state looks more believable than the process that produced it

### Pedagogy Gate

A pass fails if:

1. the sim explains the conclusion instead of showing the evidence
2. the interaction is more complex than the lab action requires
3. the representation drifts into particles or abstraction that the lesson has not earned
4. the student can get the answer without actually causing the evidence

## Execution Bundles For Future `next` Turns

Each `next` should advance one unfinished bundle, not one tiny patch.

### Bundle 01: Shared Scale Reset

1. Replace the current scale base with the imported scale candidate.
2. Rebuild blank and numbered variants on top of that stronger base.
3. Establish a real zero-state display.
4. Establish placement animation behavior.
5. Establish readable digit transition timing.
6. Audit every current simulation that uses the scale.
7. Remove any scale behavior that still feels like pasted-on text.
8. Confirm the regenerated scale family can be reused by all six simulations.

### Bundle 02: Steel Wool Base Family Reset

9. Use the imported steel wool pad as the base for a rebuilt steel wool family.
10. Derive compact, loose, fragment, and burnable variants.
11. Reduce obvious clipart look through adaptation and simplification.
12. Build internal density bands so the wool reads as tangled material.
13. Create masks or overlays needed for glow and ash stages.
14. Replace current weak steel wool placeholders with the new family.
15. Verify the non-burning family works for pull-apart scenes.
16. Verify the burnable family works for burning scenes.

### Bundle 03: Shared Vessel Reset

17. Replace the generic beaker base.
18. Replace the jar base.
19. Replace the test-tube base.
20. Normalize glass highlights.
21. Normalize containment clipping.
22. Normalize liquid positioning.
23. Remove any remaining vessel overlap errors.
24. Rebuild the simplest composite scenes around the stronger vessel bases.

### Bundle 04: Steel Wool Burn Rebuild

25. Remove the current confusing burn framing from the active proof-of-concept.
26. Build the new open-pan burn around the new scale and steel wool base.
27. Add ignition staging.
28. Add glow progression.
29. Add flame progression.
30. Add residue progression.
31. Add rising mass readout.
32. Add early, middle, and late frame capture review.
33. Add readable process duration rather than a clipped micro-burn.
34. Add localized ignition and first-glow staging.
35. Add irregular sparks and attached flame behavior.
36. Add residue progression that still preserves object identity.
37. Iterate until the burn becomes the best-looking scene in the suite.
38. Treat that result as the visual benchmark for the rest.

### Bundle 05: Precipitate Base Rebuild

35. Rebuild precipitate apparatus around imported test-tube art.
36. Rebuild the before scene around strong contained liquids.
37. Rebuild the pour pose around the stronger source tube.
38. Rebuild the receiving vessel around the stronger fill logic.
39. Remove any remaining flat-shape feeling from the apparatus.
40. Verify that the apparatus itself now looks respectable before animation even starts.

### Bundle 06: Precipitate Process Rebuild

41. Animate tilt and pour.
42. Add stream transfer.
43. Add faint early clouding.
44. Add swirling precipitate development.
45. Add settling behavior late in the process.
46. Tie scale reveal only to `Weigh` actions.
47. Capture early/mid/late frames.
48. Iterate until the precipitate forms as a real process rather than a fade.

### Bundle 07: Alka-Seltzer Base Rebuild

49. Replace the tablet with the stronger outside base.
50. Rebuild vented beaker around stronger beaker art.
51. Rebuild captured jar around stronger jar art.
52. Rebuild liquid fills around stronger vessel clipping.
53. Verify the reaction setup reads clearly before any bubbles begin.
54. Remove any remaining crude placeholder geometry.

### Bundle 08: Alka-Seltzer Process Rebuild

55. Stage the reaction onset.
56. Build bubble density growth.
57. Build bubble size variation.
58. Build liquid disturbance.
59. Build vented escape behavior.
60. Build captured accumulation behavior.
61. Tie mass change to the visible process.
62. Capture and iterate until the fizz reads as alive instead of decorative.

### Bundle 09: Sugar Dissolving Rebuild

63. Rebuild sugar scene bases around stronger beaker art.
64. Create better sugar solids.
65. Build unstirred dissolution timing.
66. Build stirred dissolution timing.
67. Add concentration trails or subtle clouding.
68. Preserve the stable mass evidence.
69. Capture both modes mid-process.
70. Tune until stirred and unstirred differ by process rather than by labels.

### Bundle 10: Ice Rebuild

71. Replace the ice base with the stronger outside ice cube.
72. Build multiple-cube compositions.
73. Add cold-material detail and translucency.
74. Add early softening and runoff.
75. Add water accumulation around cubes.
76. Add late remaining fragments.
77. Tie clock and scale behavior to the melt.
78. Capture and iterate until it no longer looks like icons disappearing.

### Bundle 11: Steel Wool Pull Rebuild

79. Rebuild the pull scene around the new steel wool family.
80. Keep or redraw the drag affordance as needed.
81. Add connected pull/deformation behavior.
82. Add visible response when returning material to the scale.
83. Rebuild any repeated-trial structure so it still feels action-based.
84. Remove any remaining state-browser remnants.
85. Capture pull and return moments.
86. Iterate until the manipulation feels direct and honest.

### Bundle 12: Suite Consistency Pass

87. Normalize art quality across all six.
88. Normalize motion pacing across all six.
89. Normalize scale/readout behavior across all six.
90. Remove any lingering placeholder shapes.
91. Remove any lingering slide-deck feeling.
92. Check every case against the lesson assignment.
93. Check every case for pedagogical drift.
94. Check every case for asset provenance completeness.
95. Check every case for route and reset cleanliness.
96. Prepare the suite for a renewed visual review.

## Extended Step Bank

Use these when a bundle needs more granularity instead of improvisation.

97. Review all current captures before each bundle begins.
98. Identify the single fakest frame in the target simulation.
99. Improve that specific frame first.
100. Then improve transitions into and out of that frame.
101. Avoid polishing a weak visual concept.
102. Replace the concept first if needed.
103. Prefer imported object bases over redrawing generic equipment from scratch.
104. Use scratch work mainly for phenomenon layers, not for generic labware.
105. Keep source files and production files distinct.
106. Update the manifest in the same pass as every new import.
107. Update the attribution file if a future imported asset needs it.
108. Keep denylisted sources out of blanket ingestion workflows.
109. Use browser captures to judge visual truth, not implementation effort.
110. Do not trust a single still frame to validate motion.
111. Compare early, middle, and late frames every time.
112. Remove any effect that is flashy but not instructionally useful.
113. Remove any label that compensates for weak art.
114. Remove any button that compensates for weak process design.
115. Keep the menu simple and stable.
116. Keep individual simulations separate under the menu.
117. Preserve macroscopic representation across all current cases.
118. Do not introduce microscopic hints just because they look cool.
119. Make every visible process explainable by student observation.
120. Make every major scene respectable even before labels appear.
121. Audit the current burned-steel-wool logic before reusing any mass values.
122. Audit all future mass values for conceptual consistency.
123. Ensure the scale never lies accidentally.
124. Ensure the process never teaches the conclusion too directly.
125. Ensure imported art is adapted into a coherent project style rather than pasted raw.
126. Keep the strongest simulation as the evolving standard for the rest.
127. Re-open older rebuilt sims when the standard rises.
128. Reject any pass that is only �better than before.�
129. Reject any pass that is �fine at thumbnail size.�
130. Reject any pass that still makes reopening the project disappointing.

## Definition Of Done For This Rebuild Phase

This rebuild phase is only successful when:

1. all six simulations are clearly more polished than the current drafts
2. the shared object families have been rebuilt around stronger imported art where appropriate
3. the processes unfold over time instead of feeling like static slides
4. the scale feels like an instrument across the suite
5. the visual quality no longer depends on excuses about prototypes or scaffolds
6. the allowlisted external asset pipeline is now part of normal project behavior

## Future Conversation Rule

If the user says `next`, work the next unfinished bundle in this file.

Do not retreat into tiny cleanup patches unless the bundle itself requires them.
Do not re-plan the whole project unless a new contradiction appears.
Do not call the work good early.
