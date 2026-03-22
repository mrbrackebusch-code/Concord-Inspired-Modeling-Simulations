# Mass & Change Rebuild Master Plan

## Purpose

This document is the execution plan for rebuilding the current Unit 1 Lesson 1 interactives so they stop feeling like static state browsers and start feeling like believable, pedagogically correct Concord-style simulations.

This is not a quick outline. It is the working roadmap for a multi-turn rebuild with the hardest visual and animation problems addressed first.

## Core Goal

Every interactive must satisfy this chain:

`student action -> believable process over time -> visible evidence -> measured mass response -> student interpretation`

The current repo has partially acceptable control structure. The next phase is to rebuild the visible behavior itself.

## Non-Negotiable Constraints

- No static poster-state feeling.
- No misleading mass comparisons caused by changing what is being weighed.
- No relying on JSON structure as a proxy for simulation quality.
- No particle visuals in this lesson.
- Every meaningful real-world change must be shown as process.
- Every process must look intentionally designed, not procedurally accidental.
- Art and animation quality are now first-class work, not secondary polish.

## Build Order

The rebuild order is intentionally front-loaded with the hardest visual problems:

1. Steel wool burning
2. Precipitate formation
3. Alka-Seltzer reaction
4. Sugar dissolving
5. Ice melting
6. Steel wool pulled apart

This order is correct because it forces the project to solve the hardest visual-process problems first. If the burn and precipitate look believable, the rest become easier.

## Tooling Strategy

The repository should support maximum authoring capability while keeping live runtime use selective.

Planned tools and their job:

- `SVGO`: optimize and normalize SVG output.
- `SVG.js`: construct and manipulate layered SVG scenes when that is easier than hand-editing every frame.
- `GSAP`: drive believable timelines, easing, flicker, morphing, stagger, and sequence control.
- `PixiJS`: optional overlay for particles such as sparks, embers, smoke, fine bubbles, and drifting precipitate specks when SVG alone stops being convincing.
- `Lottie` or equivalent: optional, only if one specific authored motion is clearly better done as a dedicated animation asset.

## Working Principle

The toolchain should be powerful enough to do almost anything, but each simulation should only ship what it actually needs.

That means:

- maximum authoring capability in the repo
- disciplined, minimal runtime use in each interactive

## Definition Of Success

A future pass is successful only if all of the following are true:

- the user clicks or drags once and a believable process unfolds over time
- the object art reads immediately without explanatory text carrying the scene
- the scale behaves like an instrument, not a label
- the motion has timing, staging, and visual progression
- the evidence is clearer than the UI
- the animation quality is strong enough that the simulation feels like an authored investigation, not a rough prototype

## Audit Of This Plan

This section exists because art and animation quality are the most likely places for this project to fail while still producing a lot of activity. The purpose of the audit is to make the plan harder to satisfy superficially.

### Main Risk

The main risk is not technical failure. The main risk is false progress: routes work, buttons work, JSON loads, assets technically exist, but the simulations still feel cheap, crude, or emotionally disappointing to revisit.

That risk is especially high when:

- a sequence is technically animated but still reads like a slide deck
- the object art is recognizable only because of labels
- the animation has motion but not believable change
- the scale displays numbers but does not feel like a real measuring instrument
- SVG assets are layered, but still have placeholder-level silhouette quality
- a draft is declared "good" because it is better than before rather than because it is genuinely strong

### What Would Cause This Plan To Fail

This plan would still fail if any of the following are true after significant work:

- the steel wool still looks like scribbles instead of tangled material
- the fire still looks like stock flame stickers instead of a burning process affecting the object
- the precipitate still looks like opacity changes instead of matter forming in suspension
- the bubbles still look like generic dots rather than an actual reaction process
- the sugar still looks like white marks that simply vanish
- the ice still looks like icons shrinking into a puddle
- the scale still looks like a decorative label instead of an instrument with a responsive display
- the strongest scenes are only convincing in still captures and not when watched over time
- the simulations are only "good for AI" rather than good in absolute terms

### Conditions Required For True Success

The probability of true success rises only if all of these conditions are enforced:

1. Every major simulation gets at least one dedicated art pass before it gets called structurally complete.
2. Every major simulation gets at least one dedicated motion pass after the art pass.
3. The hardest cases set the standard for the easier ones, not the other way around.
4. The user is never asked to accept weak placeholder art as a normal intermediate quality bar.
5. Progress is judged by browser evidence and captures, not by implementation effort.
6. The plan remains willing to throw away confusing or ugly work instead of rationalizing it.
7. The suite is reviewed for emotional reaction as well as technical correctness: does it feel disappointing to reopen or not?

### Art Quality Gate

A simulation fails the art gate if any of the following are true:

- the object silhouette is weak
- the object would be hard to identify without text
- the line work is obviously placeholder-level
- the surface, depth, or material treatment is too thin to read
- the object and the process feel like separate layers that do not affect each other
- the scene looks algorithmically assembled rather than intentionally composed

A simulation passes the art gate only if:

- the object reads immediately
- the material quality is clear
- the object keeps its identity throughout the process
- the transformed state still feels like the same matter undergoing change
- the scene would still feel respectable if shown without supporting explanation

### Animation Quality Gate

A simulation fails the animation gate if:

- motion starts too abruptly
- motion ends too abruptly
- motion exists but does not communicate physical change
- timing is too linear or too mechanical
- the animation can be reduced to a before/after jump without losing much
- the process cannot be understood from the unfolding motion itself

A simulation passes the animation gate only if:

- the process is readable as a process
- the object changes in stages
- timing supports interpretation
- reset and replay feel clean
- the viewer can see where the evidence came from

### Measurement Quality Gate

A simulation fails the measurement gate if:

- the display changes without a believable reason
- the readout appears from nowhere
- the simulation quietly changes what is being weighed
- the scale is visually secondary when it should be evidence-critical
- the digits change too abruptly to be noticed as part of the process

A simulation passes the measurement gate only if:

- the scale responds visibly to action
- the readout is legible and intentional
- the measurement progression supports the lesson move
- what is being weighed is conceptually stable and clear

### Review Discipline Gate

The plan fails if the working habit becomes:

- "this is probably good enough"
- "the JSON is valid so it is fine"
- "the screenshot is acceptable at thumbnail size"
- "we can polish later" when the underlying visual concept is weak

The plan succeeds only if the working habit becomes:

- compare early / middle / late frames
- identify the ugliest or fakest moment
- improve that specific moment
- reopen the simulation and judge it again
- refuse to praise weak work just because it took effort

### Do Not Call It Good If

Do not call a simulation good if:

- it is merely less embarrassing than the previous version
- it works only because the text tells the viewer what they are seeing
- the process is only convincing when described in words
- the strongest compliment available is "at least the buttons work"
- the art still reads as rough lines, generic blocks, or placeholder icons

### Probability Assessment

Likelihood of true success is:

- low if the project keeps accepting control scaffolding as progress
- medium if the project improves process but accepts weak art
- medium if the project improves art but still uses static-slide animation logic
- high only if both art quality and process quality are treated as equally non-negotiable

### Planning Consequence

Because of this audit, the execution plan below must be interpreted with an additional rule:

A phase is not complete when the tasks are checked off. A phase is complete only when the resulting simulation survives the art gate, animation gate, measurement gate, and review discipline gate described above.

## 100-Step Execution Plan

### Phase 0: Lock Scope And Remove Known Confusion

1. Freeze the current lesson goal and treat the assignment as authoritative over any draft simulation behavior.
2. Remove or ignore any current behavior that produces a conceptually wrong mass comparison.
3. Scrap the current `closed / capped` steel wool burn framing for now unless it can be reintroduced without changing what is being weighed.
4. Reframe `steel wool burns` as a single clean proof-of-concept case: steel wool on the pan, burning begins, measured mass rises over time.
5. Keep `apps/studio/interactives/unit-01/lesson-01/mass-change/index.html` as the menu entry and keep each simulation individual under it.
6. Audit all existing simulation routes and mark which ones are still pedagogically usable and which ones are scaffolds only.
7. Create a strict distinction between `control scaffolding` and `real simulation behavior` in planning and implementation notes.
8. Treat the current button wiring as provisional infrastructure, not as evidence of simulation quality.
9. Confirm that all future work will prioritize `what happens after the click` over adding more buttons or routes.
10. List every current known failure mode: crude art, static-slide feel, misleading burn logic, weak scale behavior, shallow precipitation, weak dissolving, weak bubbling, weak melting.
11. Create one internal checklist for all future passes: art quality, process quality, measurement quality, pedagogy quality.
12. Decide that no simulation will be called complete until it passes that checklist.
13. Preserve the current menu structure so all future rebuilds are reviewable in one place.
14. Lock the sequence of rebuild work to the six-case order specified above.

### Phase 1: Authoring Capability To The Nth Degree

15. Add build-time SVG optimization support with `SVGO` so all art assets can be cleaned and normalized automatically.
16. Add `SVG.js` to make layered scene authoring and SVG manipulation easier than raw repetitive hand editing.
17. Add `GSAP` to support real timelines, easing, repeats, delays, flicker, and sequence choreography.
18. Add `PixiJS` as an optional overlay system for particles and atmospheric effects when SVG alone is not enough.
19. Decide that `PixiJS` will be optional per sim, not globally assumed in every interactive.
20. Add one scripts folder convention for art generation and one for interactive JSON generation so asset work and interactive work stay separate.
21. Define a shared asset pipeline directory structure for source art, generated art, and optimized art.
22. Add an explicit naming convention for variant assets: `before`, `live`, `mid`, `late`, `final`, `glow`, `ash`, `settled`, `vented`, `captured`.
23. Add a preview workflow so one art asset can be rendered and checked without opening the full simulation.
24. Expand the screenshot verification workflow so it can capture early, middle, and late frames for any target state or interactive.
25. Add a small scriptable timing harness for animation review so over-time changes can be checked without guessing.
26. Define a rule for when to use animated SVG alone versus when to add GSAP control versus when to add PixiJS overlay.
27. Write down the animation quality standard: no hard pops, no abrupt object teleportation, no fake endpoint substitution when the process matters.
28. Confirm that all future animation work will be judged against the best current proof-of-concept, not against old scaffold quality.

### Phase 2: Shared Visual Language Before Individual Rebuilds

29. Redesign the scale as a first-class shared component, not a one-off asset.
30. Create a proper scale body with a clear pan, body, display window, and believable proportions.
31. Add a true `zero / idle` display state for the scale.
32. Add a visible `loading / object placed` response on the scale so mass never just appears from nothing.
33. Create a common mass-readout treatment for digits, glow, contrast, and transition behavior.
34. Make the scale display capable of stepping through changing values rather than only swapping final numbers.
35. Create a shared beaker visual language: glass outline, interior clip region, highlights, and shadowing.
36. Create a shared test-tube / capped-vial visual language with consistent glass, cap, fill, and edge styling.
37. Create a shared jar / container treatment for any closed setup that may return later.
38. Create a consistent fluid rendering style for macroscopic liquids: fill, meniscus, shine, and mild texture.
39. Create a consistent cloud / haze rendering style for precipitate and reaction clouding.
40. Create a consistent bubble system style for gas production.
41. Create a consistent flame / ember / glow style family that can be reused across burning cases and future combustion work.
42. Create a consistent residue / ash visual style so burned matter changes texture over time.
43. Create a shared motion style guide: timing ranges, easing preferences, flicker frequency, liquid pacing, bubble pacing, settling pacing.
44. Document when motion should be restrained versus dramatic so the suite feels coherent.

### Phase 3: Steel Wool Burning Proof Of Concept

45. Replace the current `steel wool burns` draft with a single-condition proof-of-concept path focused on clarity and believability.
46. Remove the current `closed / capped` branch from the active proof-of-concept UI.
47. Keep one simple user action to begin the burn.
48. Create new SVG source art for steel wool specifically tuned for burning, not recycled from the pull-apart case.
49. Make the steel wool silhouette read as tangled metal fiber even before any animation begins.
50. Add inner density layers so the wool has visual depth rather than looking like a few strokes.
51. Create a glow-mask layer so certain zones can heat and brighten over time.
52. Create an ember-color palette progression from cool gray to warm glow to darkened residue.
53. Design a flame system that does not look like clip-art fire pasted on top of the wool.
54. Decide which parts of the burn are SVG timeline motion and which parts, if any, need GSAP control.
55. Add a staged ignition sequence instead of instantly showing a fully burning object.
56. Show the first signs of burning as localized brightening before full flame growth.
57. Animate the flame with believable variation rather than a single static flame shape.
58. Add small flicker timing offsets so the burn feels alive and not loop-stamped.
59. Make the flame height and brightness evolve during the burn rather than holding one posture.
60. Gradually alter the wool color and internal highlights as burning proceeds.
61. Add subtle deformation or collapse so the object itself changes during burning.
62. Add residue formation so the end state reads as transformed matter, not just old art with a flame removed.
63. Make the scale display rise over time during the burn instead of changing only at the end.
64. Ensure the mass readout progression is smooth and visible enough that students can notice the trend.
65. Decide whether to show tiny sparks or fine smoke and, if needed, implement that with a very light PixiJS overlay.
66. Keep sparks restrained so they support believability rather than turning the scene into spectacle.
67. Build the final burn as one continuous sequence that can replay cleanly.
68. Verify that the burn proof-of-concept no longer has the feeling of a slide progression.
69. Capture early, middle, and late burn frames and review them for silhouette quality, timing quality, and measurement quality.
70. Tune the art after those captures instead of assuming the first pass is good.
71. Iterate the burn until it looks like the strongest simulation in the repo, not just a better version of the old one.
72. Treat the final burn implementation as the benchmark for every later rebuild.

### Phase 4: Precipitate Formation Rebuild

73. Throw out the idea that precipitate is good enough if the tube tilts and then an after-image appears.
74. Redraw the test tubes so they read as clean glass apparatus rather than generic placeholders.
75. Improve the liquid fills so each initial liquid feels optically contained by the glass.
76. Make the source tube lift and tilt as a process, not as a pose swap.
77. Make the pour stream read as actual liquid transfer rather than a drawn line.
78. Control the pour speed so it feels intentional and physical.
79. Let the receiving liquid respond during the pour rather than waiting until the end.
80. Introduce early faint clouding before the full precipitate appears.
81. Animate the precipitate as a swirling cloud that develops through the liquid body.
82. Make the cloud motion feel like suspended matter forming, not like a fade-in overlay.
83. Add subtle rotational and eddy-like internal motion so the cloud has structure.
84. Begin to settle some of the solid as the swirl slows.
85. Create a later-phase settled precipitate shape at the bottom of the receiving tube.
86. Preserve enough translucency in the liquid so students can still read the process through the glass.
87. Make the before-weigh and after-weigh moments distinct, with the scale display only revealing measured mass on those actions.
88. Keep the scale visually out of focus during the pour step without making the scene feel dead.
89. Review the whole precipitate sequence for realism of timing: not too fast, not too theatrical, and no abrupt endpoint jump.
90. Capture early, middle, and late frames of the precipitate process and adjust until the clouding and settling feel believable.

### Phase 5: Alka-Seltzer Reaction Rebuild

91. Redraw the tablet, vessel, and liquid so the setup reads clearly before the reaction starts.
92. Make the tablet visibly enter or begin reacting instead of cutting directly to a bubbly state.
93. Stage the bubbles over time: initial few bubbles, active fizzing, later sustained bubbling.
94. Vary bubble size, position, and release timing so the reaction feels organic.
95. Distinguish `vented` from `captured` visually through gas behavior rather than only through labels.
96. In `vented`, let bubbles rise and leave the visible measured system.
97. In `captured`, let gas visibly accumulate or remain within the setup.
98. Make the mass display respond at the appropriate stage with a readable trend rather than a surprise number.
99. Add mild liquid disturbance from the bubbling so the whole scene feels alive.
100. Tune the reaction pacing so it reads as an actual fizzing process rather than a decorative bubble overlay.
101. Capture early, middle, and late reaction frames and adjust density, pacing, and vessel readability.

### Phase 6: Sugar Dissolving Rebuild

102. Redraw sugar crystals so they look like actual solid granules and not generic white shapes.
103. Improve the beaker and solution art so the liquid body has believable depth.
104. For `Not stirred`, make the dissolving happen slowly and unevenly.
105. Let some sugar remain visibly at the bottom or in suspension longer in the unstirred case.
106. For `Stirred`, create a stronger motion pattern through the liquid that accelerates dissolution.
107. Use fine particle disappearance rather than hard shape deletion.
108. Add a subtle cloud or concentration trail where sugar is actively dissolving.
109. Make the final stirred solution look more uniform than the unstirred one.
110. Keep the measured mass stable while the visible solid disappears, so the evidence remains the point.
111. Make the difference between stirred and unstirred readable primarily through process, not through text.
112. Capture the middle of both dissolving processes and tune the rate contrast until it is obvious but not exaggerated.

### Phase 7: Ice Melting Rebuild

113. Replace the current simplistic cube-to-puddle feeling with a more physical sloughing and shrinking sequence.
114. Redraw the ice cubes with enough shape variation that they feel like multiple pieces of ice, not one repeated icon.
115. Add translucency, edge highlights, and subtle internal cracking so the cubes read as cold solid matter.
116. Make the earliest melt visible as gloss, softening edges, and small runoff rather than immediate disappearance.
117. Gradually lower the solid volume while raising the liquid level.
118. Let meltwater accumulate around and between the cubes before they are mostly gone.
119. Preserve one or two semi-remaining fragments late in the process so the transition feels continuous.
120. Keep the clock and the scale alive during the melting sequence so time and measurement feel coupled to the process.
121. Make the end state read as water that came from those cubes, not a new puddle that replaced them.
122. Capture early, middle, and late melt frames and tune until the transition is physically legible.

### Phase 8: Steel Wool Pulled Apart Rebuild

123. Keep this case visually simpler than the burn, but not crude.
124. Redraw the steel wool so it is a clean, believable tangled object even in the non-burning case.
125. Keep the drag affordance explicit and purposeful, borrowing Concord's pull logic but improving the visible object response.
126. Make the pulled section deform and separate in a way that feels connected to the main wad.
127. Add a slight spring or resistance impression so the pull does not feel like dragging a sticker.
128. Improve the scale behavior so taking part of the sample off the tray is visually and numerically clear.
129. Make the return-to-tray moment feel physical enough that recording a run makes sense.
130. If the three-run structure stays, each run must feel like repeating the manipulation, not like clicking next on a sequence.
131. Preserve the lesson's small-variation idea without letting the simulation feel random or sloppy.
132. Capture pull-away and return moments and tune until the interaction feels honest and direct.

### Phase 9: Shared Scale And Measurement Pass

133. Replace any remaining mass readouts that still feel pasted on or disconnected from the object interaction.
134. Make every scale begin from a believable idle state before mass is measured.
135. Add a common placement response when an object or system is put on the pan.
136. Make digits transition in a readable way instead of instant swapping whenever that transition matters pedagogically.
137. Standardize display brightness, contrast, and digit size across all six simulations.
138. Ensure the scale never changes because the simulation changed what counts as the measured system without making that explicit.
139. Audit every case to ensure the mass result is conceptually correct relative to what is being weighed.
140. Remove any remaining measurement behavior that would confuse a student more than help them.

### Phase 10: Art Direction And Consistency Pass

141. Review the whole suite for silhouette quality so each object reads correctly at a glance.
142. Normalize line weights and interior detail density so assets look like they belong to the same authored family.
143. Normalize highlight and shadow treatment across glass, liquid, solids, flame, cloud, and residue.
144. Reduce any remaining clip-art look in the fire, bubbles, clouding, or crystal art.
145. Add just enough textural richness that the scenes feel intentional without becoming visually busy.
146. Make sure the background, panel framing, and object staging support the phenomena rather than competing with them.
147. Ensure labels exist only where needed and do not become the main source of clarity.
148. Review object placement and composition so no important process looks awkwardly centered by accident.
149. Remove any remaining asset that still feels like obvious placeholder art.
150. Rebuild those weak assets rather than trying to defend them.

### Phase 11: Animation Quality Pass

151. Review every process for pacing problems: too fast, too slow, too even, too abrupt, too decorative.
152. Introduce timing asymmetry where appropriate so processes feel organic.
153. Remove any remaining hard cuts that interrupt the illusion of process.
154. Ensure repeats and resets do not visually pop or leave stale visual states behind.
155. Tune easing curves for physical credibility rather than generic motion sweetness.
156. Make flames flicker irregularly but within a controlled band.
157. Make bubbles drift with variation rather than identical upward movement.
158. Make precipitate clouding unfold in layered stages instead of one transparency fade.
159. Make melting and dissolving transitions feel like loss, spread, and change of form rather than shrinking icons.
160. Make pull / drag responses feel connected, not detached.

### Phase 12: Pedagogy And Evidence Pass

161. Re-check every simulation against the assignment wording and intended evidence.
162. Ensure that each sim still produces the intended mass outcome category: increased, decreased, or stayed about the same as appropriate.
163. Ensure the UI never states the conclusion students are supposed to infer.
164. Ensure the process is visible enough that a student could narrate what changed without being told.
165. Ensure every click maps cleanly to an intentional experimental action.
166. Remove any remaining extra controls that are technically possible but pedagogically unnecessary.
167. Ensure the menu structure helps navigation but does not imply the simulations are one giant tabbed app unless that becomes explicitly desired later.
168. Ensure the open menu plus individual simulations pattern remains simple and understandable.
169. Make sure no simulation requires awkward user skill when a button is the more faithful stand-in for the lab action.
170. Confirm that the rebuilt suite is still macroscopic and evidence-first.

### Phase 13: Capture, Review, And Iteration Infrastructure

171. Capture early, middle, and late frames for every animated process in the suite.
172. Store those captures in a consistent location and naming scheme for before/after comparison.
173. Use those captures to judge process quality rather than relying on memory after opening a page once.
174. Add one review sheet per simulation: art, timing, measurement, pedagogy, reset behavior.
175. Compare each rebuilt simulation against the steel-wool-burn benchmark to keep standards rising.
176. Revisit any simulation that drops below the benchmark after later work improves the standard.
177. Keep the strongest capture set available so the user can compare progress over time.
178. Avoid declaring success after the first convincing pass; require at least one iteration after review.
179. Use browser captures to spot clipping, timing, and compositional weaknesses invisible in JSON.
180. Treat capture review as mandatory, not optional.

### Phase 14: Repo Hygiene And Regeneration Safety

181. Ensure all generated interactives can be rebuilt from scripts without losing the latest improvements.
182. Update any generator scripts that still recreate old weak behavior.
183. Separate hand-authored hero assets from generated utility assets clearly.
184. Ensure the build scripts do not overwrite hand-tuned assets accidentally.
185. Add notes in the repo about which files are generated and which are manually authored.
186. Keep the menu page stable while the individual simulations change underneath it.
187. Remove dead scaffold files only after their replacements are proven and no routes depend on them.
188. Keep the version note honest when local patches are required to keep the vendored Lab runtime working.
189. Record any runtime quirks discovered while mixing Lab with animated SVG, GSAP, or optional Pixi overlays.
190. Preserve a clean enough structure that this same workflow can scale to dozens more simulations later.

### Phase 15: Final Quality Bar For This Lesson

191. Re-open every rebuilt simulation from the menu page and verify the route structure is still clean.
192. Verify that the menu is truly just links and that each simulation remains individual in practice.
193. Verify that each simulation feels alive within a few seconds of student action.
194. Verify that each simulation produces visually readable evidence without relying on explanatory text.
195. Verify that the scale contributes meaningfully in every relevant case.
196. Verify that the hardest cases, especially burn and precipitate, now feel dramatically better than the current drafts.
197. Verify that the art no longer reads as rough placeholder work.
198. Verify that no remaining case feels like a static slide presentation.
199. Verify that the suite now feels like the beginning of a serious simulation project rather than a basic technical scaffold.
200. Only after those checks pass should the lesson be treated as a credible proof-of-concept for the larger hundred-simulation vision.

## Immediate Next Working Sequence

The next several work turns should roughly follow this order:

1. Simplify and rebuild `steel wool burns` as the new proof-of-concept.
2. Push `precipitate` to the same standard.
3. Rebuild `Alka-Seltzer` with a strong bubble system.
4. Rebuild `sugar dissolves` with convincing gradual disappearance and mixing.
5. Rebuild `ice to water` with better sloughing and liquid accumulation.
6. Rebuild `steel wool pulled apart` with cleaner art and more physical response.
7. Run suite-wide scale, art, animation, and pedagogy passes.

## How To Use This Plan In Conversation

If the user says `next`, advance to the next unfinished cluster of steps in this file, not just the next trivial code patch.

The burden is on the agent to make large forward moves and maintain the quality bar established here.
