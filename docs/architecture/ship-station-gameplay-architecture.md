# Ship-Station Gameplay Architecture

## Purpose

This note explains how the repository can grow from reusable experiment windows into a scalable game without restarting the simulation work.

The important decision is:

`one persistent ship and one persistent control language across many experiment missions`

This is how the project gets real gameplay without inventing a different minigame for every lab.

## Core Decision

The player should not directly become six different lab tools.

The player should master one embodied system:

`pilot -> collect -> dock -> actuate -> measure -> preserve evidence`

That system can then carry the curriculum.

## What This Does Not Change

This note does not replace the experiment-window system.

It depends on it.

The correct layering is still:

1. `Phenomenon layer`
   The actual scientific process and evidence rules.
2. `Experiment-window layer`
   The host shell, procedure rail, evidence tray, and event contract.
3. `Ship / station gameplay layer`
   Navigation, cargo handling, hazards, power pressure, and mission execution.
4. `Revision and writing layer`
   Evidence comparison, revision records, model building, and explanation.
5. `Later microscopic layer`
   MD2D-backed atom and molecule interaction when instructionally appropriate.

If the ship layer cannot read from the shared experiment contract, it is too tightly coupled and should be redesigned.

## Zoom Relationship

The future game should operate at two connected zoom levels:

1. `Room or mission scale`
   The player pilots the ship, navigates hazards, collects supplies, and docks with stations.
2. `Platform scale`
   The view tightens onto the ship's experiment platform so the player can perform the actual scientific procedure with readable apparatus detail.

The current Lesson 1 experiment windows should therefore be designed as `platform scale` views.

They are the close-up scientific truth layer that the room-scale game will later enter and exit.

This is the safest way to combine:

- large-scale movement and danger
- close-up experimental readability
- evidence-first Concord-style interaction

without building two unrelated systems.

## Design Laws

- One ship, one control language, many missions.
- Hazards should threaten procedural integrity, not replace science with arcade noise.
- Time pressure belongs in the field, not in reading or reflection.
- A new mechanic only earns its way in if it can support a family of future experiments.
- Docked station actions are preferred over free-space micro-manipulation.
- The game should make evidence harder to preserve, not easier to fake.

## The Permanent Control Grammar

The player is limited to one hand plus the motion of the ship.

That constraint is useful. It keeps the game legible and prevents mechanic creep.

The permanent verbs should be:

1. `Thrust / hover`
   Move the ship with acceleration and damping.
2. `Brake / stabilize`
   Reduce drift and prepare for landing, weighing, or precise placement.
3. `Charge and fire claw`
   Reach supplies, hook cargo, or engage a station latch.
4. `Grab / release`
   Hold or drop cargo into sockets, trays, or docking cradles.
5. `Actuate`
   Trigger the current docked station such as weigh, tip, heat, stretch, or swirl.

These verbs should stay stable across the curriculum.

The challenge should come from context, not from re-teaching controls every lesson.

## Why Acceleration Matters

Acceleration and damping create a real skill curve:

- too fast: collisions, slosh, wobble, unstable scale readings, spills
- too slow: wasted power, missed timing windows, incomplete procedures
- just right: clean landings, stable measurements, controlled transfers

That gives the project a real action layer without disconnecting from apparatus truth.

## Core World Primitives

The game layer should be built from a small set of reusable primitives.

### Ship

The player-controlled platform with:

- position
- velocity
- acceleration
- integrity
- power budget
- cargo slots
- claw state

### Cargo Item

Any experiment object the ship can collect, carry, place, or dock:

- vial
- beaker
- steel wool
- tablet
- sugar portion
- evaporating dish
- cap

Each cargo item should define:

- grip points
- mass or handling difficulty
- allowed stations
- failure modes
- simulation payload id

### Socket

A valid placement target that can accept cargo:

- balance pan
- mix cradle slot
- stretch anchor
- heat bay tray
- storage rack

Sockets should provide soft alignment and snap only when the placement is close enough to feel intentional.

### Station

A reusable environmental machine that turns ship actions into scientific procedure.

Stations are where precision work happens.

### Hazard

Any moving or static world condition that threatens cargo, ship integrity, or procedural cleanliness:

- walls
- debris
- drifting hostile organisms
- field turbulence
- moving obstacles

Hazards should matter because they can compromise the run, not because they create unrelated combat.

### Evidence Buffer

The host-side record of:

- collected items
- station sequence
- measured values
- spill or leak flags
- boundary state
- snapshots
- completion state

This should remain part of the experiment contract, not become a game-only special case.

## Station Grammar

To keep the system scalable, Lesson 1 should be expressed with a small station vocabulary.

### Supply Node

Where cargo items are collected.

Supports:

- claw targeting
- pickup
- stow

### Balance Pad

Where the ship or cargo is landed gently enough to obtain a stable mass measurement.

Supports:

- landing
- stabilization
- weigh action
- stable or unstable readout state

### Mix Cradle

A docked station that holds source and receiver vessels and performs controlled transfer.

Supports:

- place source vessel
- place receiver vessel
- tip actuation
- spill detection

### Stretch Frame

A station that anchors one end of a sample while the ship or claw pulls the other end.

Supports:

- anchor
- pull
- fragment-loss detection

### Heat Bay

A station that applies heating while keeping the experiment readable and recoverable.

Supports:

- place sample
- start heating
- track fragment capture or loss

### Agitation Bay

A station that allows controlled swirling or gentle movement without requiring free-space pour physics everywhere.

Supports:

- dissolve or disperse action
- leak or spill detection

### Hold / Process Bay

A station for time-based visible change such as melting or waiting for a process to complete.

Supports:

- start process
- readable change over time
- return to measurement

These stations are enough to cover Lesson 1 without turning every experiment into a bespoke control problem.

When the player docks at a station, the room-scale layer may hand off to a platform-scale experiment view rather than trying to keep every scientific action legible in the zoomed-out world.

That handoff is a feature, not a compromise.

It protects process readability and keeps the game from burying evidence under tiny visuals.

## Experiment Mission Manifest

Every experiment should eventually have a host-readable mission manifest alongside its simulation definition.

That manifest should describe the mission in game terms, while the interactive keeps owning the phenomenon details.

Suggested fields:

```json
{
  "experimentId": "unit-01/lesson-01/mass-change/precipitate",
  "hostModes": ["studio", "game"],
  "requiredSupplies": ["vial-a", "vial-b"],
  "optionalSupplies": [],
  "distractorSupplies": ["empty-cap", "unused-beaker"],
  "stationSequence": ["balance-pad", "mix-cradle", "balance-pad"],
  "evidenceOutputs": ["initialMass", "finalMass", "deltaMass", "beforeSnapshotId", "afterSnapshotId"],
  "failureFlags": ["solutionSpilled", "unstableMeasurement"],
  "successCriteria": ["allRequiredSuppliesCollected", "procedureCompleted", "evidenceLocked"],
  "powerBudgetClass": "short",
  "hazardProfile": "light"
}
```

This manifest should be owned by the host layer or registry, not buried in one simulation script.

## Lesson 1 Mapping

The six Mass and Change investigations already map cleanly onto this grammar.

### Steel Wool Pulled Apart

- collect steel wool
- dock at `balance-pad`
- dock at `stretch-frame`
- dock at `balance-pad`
- watch for `fragmentLost`

### Ice To Water

- collect vial with ice
- dock at `balance-pad`
- dock at `hold / process-bay`
- dock at `balance-pad`
- watch for `waterLeaked`

### Precipitate

- collect both solution vials
- dock at `balance-pad`
- dock at `mix-cradle`
- dock at `balance-pad`
- watch for `solutionSpilled`

### Steel Wool Burns

- collect steel wool and dish
- dock at `balance-pad`
- dock at `heat-bay`
- dock at `balance-pad`
- watch for `fragmentLost`

### Sugar Dissolves

- collect vial and sugar
- dock at `balance-pad`
- dock at `mix-cradle` or `agitation-bay`
- dock at `balance-pad`
- watch for `spillOccurred` or `leakOccurred`

### Alka-Seltzer

- collect vial and tablet
- dock at `balance-pad`
- dock at `agitation-bay` or reaction cradle
- dock at `balance-pad`
- watch for `gasEscaped`

This is why the ship approach is promising. The missions differ, but the verbs stay stable.

## What Should Stay Out Of Scope At First

Do not start with:

- combat
- deep inventory systems
- procedural map generation
- multiple ship classes
- branching dialogue
- permanent economy layers
- free-space precision pouring for every case

Those would bury the actual experiment loop before the core grammar is proven.

Hostile creatures or moving hazards can be added later, but only after the base loop is already fun:

`collect -> dock -> measure -> actuate -> exit`

## Implementation Path

The correct build path is incremental.

### Phase A: Finish The Shared Experiment Contract

Before any real game mode, finish the current migration:

- procedure states
- mass readout and stability
- boundary state
- mistake flags
- evidence outputs

All six Lesson 1 experiments need this.

### Phase B: Add Station Metadata To The Host

Teach the experiment registry about:

- station sequence
- required supplies
- allowed sockets
- failure flags
- host mode support

This is still not the game. It is the declarative bridge that the game will need.

### Phase C: Build A Game Shell Mode Beside Studio Mode

Add a new host mode such as `game` that uses the same experiment contract but renders:

- the ship HUD
- power and integrity meters
- cargo indicators
- supply nodes
- station sockets

This should live beside `studio`, not replace it.

The `game` mode should be able to:

- render a room-scale ship layer
- transition into a platform-scale experiment view
- return to the room-scale layer after the procedure is complete or compromised

### Phase D: Prototype One Room Before One Lesson

Build one small room with:

- one ship
- acceleration and damping
- one claw
- one balance pad
- one mix cradle
- a few obstacles
- one power budget

Do not start with the whole curriculum.

### Phase E: Pilot One Experiment

Use `precipitate` as the first full mission because it exercises:

- collecting multiple supplies
- stable weighing
- placement
- transfer
- spill detection
- before and after evidence

If the game loop is fun there, the system is likely viable.

### Phase F: Expand To A Lesson Family

After `precipitate`, add:

- `sugar-dissolves`
- `alka-seltzer`

Those three together will prove whether the station grammar is broad enough.

### Phase G: Add Revision And Reflection

Only after the physical loop works should the repo connect:

- evidence breakpoints
- failed-run analysis
- revision records
- optional scoring and badges

The game should reward evidence-preserving performance, not replace scientific thinking.

## Immediate Engineering Target

The next practical move is not "build monsters."

It is:

1. finish the Lesson 1 evidence contract across all six experiment windows
2. extend the host registry with station and supply metadata
3. create a `game` host mode scaffold in `lab-host`
4. implement one-room ship controls and docking
5. pilot `precipitate`

That path keeps the repo moving toward the game without breaking the current apparatus work.

For the pilot, the ship-room prototype does not need to perform the entire experiment in the zoomed-out view.

It only needs to:

- collect the correct supplies
- dock cleanly at the relevant station
- transition into the platform-scale experiment window
- read the resulting evidence and completion state

## Relationship To Later MD2D Work

This ship layer does not replace future microscopic interaction.

It prepares for it.

Later, MD2D can support:

- microscopic inspection bays
- model-building challenges
- atom and molecule manipulation
- AI-guided explanation checks

But those later systems should sit on the same mission and evidence substrate.

## Working Rule

The working rule for this architecture is:

`the ship is the player's body, the stations are the lab tools, and the evidence contract is the truth that everything else must obey`

If a future feature breaks that rule, it should be treated as suspect until proven otherwise.
