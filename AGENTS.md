# Project Instructions

These instructions apply to any agent working in this repository.

## Concord-Style Simulation Standard

Before authoring or revising any simulation, read:

- `docs/architecture/concord-interactive-pedagogy.md`
- `docs/architecture/animation-and-scene-architecture-standard.md`
- `docs/architecture/process-realism-standard.md`
- `docs/architecture/svg-asset-sourcing-and-licensing.md`
- `docs/architecture/verified-svg-source-catalog.md`

Treat those notes as required design constraints, not optional background reading.

## Non-Negotiable Rules

1. Do not treat a simulation as a scene browser, storyboard, or slide deck.
2. Do not expose all outcomes at once when the student is supposed to produce evidence by acting.
3. Do not call something "interactive" if the learner is only switching between pre-authored end states.
4. Concord-style quality means: student action -> visible consequence -> evidence -> student interpretation.
5. Buttons are acceptable when they stand in for awkward real-world actions such as `Pour`, `Weigh`, `Shake`, or `Start heating`. They are not acceptable as a substitute for meaningful causation.
6. Prefer one live setup with one meaningful task over multiple side-by-side poster panels.
7. Keep controls sparse and exact. Every control must earn its place pedagogically.
8. Do not tell students the conclusion in the UI. The simulation should show evidence, not explanation.
9. Do not use static pictures as stand-ins for real change. If a meaningful real-world change would be visible, the simulation should show that change unfolding.
10. "Alive" does not mean everything moves all the time. It means the scene responds when acted on: scales update, liquids pour, solids move when handled, reactions visibly develop.
11. Process animation must be human-readable. Do not satisfy a simulation requirement with an image change that technically animates but happens too quickly to witness.
12. Process realism is required, not optional. Show visible causation, matter continuity, orientation truth, contact truth, and staged change. Do not let matter teleport, liquid magically mix, or effects float detached from the thing causing them.
13. Review the single fakest frame of any process on purpose. If that frame breaks the illusion badly enough that a learner would stop trusting the process, the process is not ready.
14. Do not call something polished unless it survives early, middle, and late capture review plus direct browser viewing of the motion itself.
15. Beauty should come from modeled reality, not arbitrary flair. Prefer careful observation of what would actually be visible in the phenomenon over generic animation shorthand.
16. When a phenomenon has rich visible detail in reality, the simulation should earn visual appeal by modeling that detail. Keep the controls simple and make the response rich.
17. Start from the assumption that every interactive is a change-experience. Do not ask whether animation is needed; ask what is changing and how that change should be shown.
18. Scene objects must be motion-capable and effect-capable by default. Stillness is a temporary state, not a permanent object category.
19. Do not split the codebase into a dead static-object path and a separate animated-object path for meaningful scene elements.
20. Match the lesson's representational level. If the lesson is macroscopic, do not introduce particle visuals early just because the engine can.
21. Do not report progress based on JSON structure alone. Confirm the browser experience actually matches the intended learner action.
22. Do not avoid permissively licensed third-party SVG assets just because custom drawing feels safer. If a legally usable asset would materially improve quality, use it and record provenance correctly.
23. Every imported visual asset must be recorded in the simulation's asset manifest with source URL, author or project, license, whether attribution is required, and what modifications were made.
24. Prefer stronger visual quality from vetted outside assets over weaker project-authored placeholders when the license terms are acceptable for this repository.
25. Do not import assets with unclear, non-commercial, or no-derivatives terms into shipping work. Escalate ambiguity instead of guessing.

## Concord Reference Patterns

Use shipped Concord examples as precedents for mechanics, not just styling.

- Continuous liquid representation: use authored shapes, obstacles, and overlays rather than particles when the lesson calls for macroscopic evidence.
- Pull interaction: use the SAM intermolecular-attractions "star" pattern when the learner should drag one thing and watch a connected structure respond.
- Parameter exploration: use sliders, toggles, or selectors only when changing those inputs is the actual learning action.

## Lesson 1 Specific Constraints

For Unit 1 Lesson 1 `Mass & Change`:

- The lesson is evidence-first and macroscopic.
- Do not show particles yet.
- `Ice to water` should be time/process driven.
- `Precipitate` should use procedural actions such as `Weigh (before)`, `Pour`, `Weigh (after)`.
- `Steel wool pulled apart` should behave like a pull/manipulation task, not a state picker.
- Visible change and measured mass are the evidence. The interface must not teach the conservation rule directly.

## Anti-Patterns To Avoid

- Multi-panel posters used in place of one live setup
- Pre-revealed before/after comparisons when the student should cause the change
- Frozen endpoint images used where the student should witness a process
- Passive autoplay with no meaningful learner input
- Controls added just because Lab supports them
- Visual polish presented as if it compensates for missing agency
- Slowing down a bad state swap and calling it animation
- Liquid transfer without visible path, slosh, and finish
- Object effects that are not visibly attached to the object or region causing them
- Generic "fire effect" or "melt effect" pasted on top of a scene without modeling how the material would actually change
- Treating visual satisfaction as optional when reality itself provides richer detail to model
- Building meaningful objects as flattened static art that later has to be rebuilt for motion
- Designing the architecture so realism is limited by missing animation hooks rather than by intentional project choices

If a draft falls into any of the above, it is not done.
