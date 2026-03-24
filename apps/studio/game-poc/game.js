const TILE_SIZE = 32;
const GRID_COLS = 28;
const GRID_ROWS = 18;
const CANVAS_WIDTH = GRID_COLS * TILE_SIZE;
const CANVAS_HEIGHT = GRID_ROWS * TILE_SIZE;
const MOTION_EPSILON = 1.5;
const PLAYER_COLLISION_RADIUS = 14;
const ROCK_MASK_ALPHA_THRESHOLD = 16;
const SHIP_SCALE = 0.17;
const SHIP_FRAME_MS = 120;
const SHIP_DIRECTIONS = ["North", "East", "South", "West"];
const ARM_HEAD_SPEED = 132;
const ARM_SEGMENT_SPACING = 12;
const ARM_RENDER_SEGMENT_LIMIT = 72;
const ARM_HISTORY_STEP = 4;
const ARM_EXTEND_SPEED = 4.8;
const ARM_HEAD_RADIUS = 9;
const ARM_LATCH_RADIUS = 18;
const ARM_CARRY_LAG_SEGMENTS = 2;
const ARM_LAUNCH_ANGLE = Math.PI / 2;
const ARM_PATH_POINT_LIMIT = 1400;
const MAX_HULL = 100;
const FIELD_CHAMBER_ZONE = { x: 11, y: 7, w: 6, h: 3 };
const TERRAIN_THEME = {
  ground: "sand",
  water: "sandWaterPool"
};
const ARM_PART_SOURCES = {
  baseMount: "../../../assets/Mechanical Tentacle Arm/base_mount_large.png",
  socketCup: "../../../assets/Mechanical Tentacle Arm/socket_cup.png",
  connector: "../../../assets/Mechanical Tentacle Arm/connector_link.png",
  jointPlain: "../../../assets/Mechanical Tentacle Arm/tapered_joint_plain.png",
  jointStriped: "../../../assets/Mechanical Tentacle Arm/tapered_joint_striped.png",
  clawOpen: "../../../assets/Mechanical Tentacle Arm/claw_open.png",
  clawClosed: "../../../assets/Mechanical Tentacle Arm/claw_closed.png"
};
const EXPERIMENT_ART_SOURCES = {
  stationIce: "../../../simulations/unit-01/lesson-01/mass-change/assets/beaker-ice-before.svg",
  stationPrecipitate: "../../../simulations/unit-01/lesson-01/mass-change/assets/precipitate-before.svg",
  stationSteelPull: "../../../simulations/unit-01/lesson-01/mass-change/assets/steel-wool-compact.svg",
  stationSugar: "../../../simulations/unit-01/lesson-01/mass-change/assets/beaker-sugar-before.svg",
  stationBurn: "../../../simulations/unit-01/lesson-01/mass-change/assets/steel-wool-burnable.svg",
  stationAlka: "../../../simulations/unit-01/lesson-01/mass-change/assets/beaker-alka-before.svg",
  iceCube: "../../../simulations/unit-01/lesson-01/mass-change/assets/ice-cube.svg",
  steelWool: "../../../simulations/unit-01/lesson-01/mass-change/assets/steel-wool-compact.svg",
  steelWoolBurnable: "../../../simulations/unit-01/lesson-01/mass-change/assets/steel-wool-burnable.svg",
  alkaTablet: "../../../simulations/unit-01/lesson-01/mass-change/assets/alka-tablet.svg",
  beakerOutline: "../../../simulations/unit-01/lesson-01/mass-change/assets/beaker-outline.svg"
};
const ARM_SCALE = {
  baseMount: 0.12,
  socketCup: 0.11,
  connector: 0.13,
  joint: 0.13,
  claw: 0.11
};
const ARM_POSES = {
  stowed: {
    angles: [1.12, 1.72, 2.2, 2.62],
    clawAngle: 2.8,
    clawState: "closed",
    wiggle: [0.04, 0.05, 0.04, 0.03]
  },
  ready: {
    angles: [0.82, 0.58, 0.34, 0.18],
    clawAngle: 0.12,
    clawState: "open",
    wiggle: [0.03, 0.04, 0.03, 0.02]
  },
  capture: {
    angles: [0.68, 0.42, 0.22, 0.06],
    clawAngle: 0.01,
    clawState: "closed",
    wiggle: [0.015, 0.02, 0.018, 0.012]
  }
};

const TERRAIN_FAMILIES = {
  sand: {
    interior: [
      { row: 17, col: 0 },
      { row: 17, col: 1 },
      { row: 17, col: 2 }
    ],
    edgeN: { row: 14, col: 1 },
    edgeS: { row: 16, col: 1 },
    edgeW: { row: 15, col: 0 },
    edgeE: { row: 15, col: 2 },
    cornerNW: { row: 14, col: 0 },
    cornerNE: { row: 14, col: 2 },
    cornerSE: { row: 16, col: 2 },
    cornerSW: { row: 16, col: 0 },
    innerNW: { row: 12, col: 1 },
    innerNE: { row: 12, col: 2 },
    innerSE: { row: 13, col: 2 },
    innerSW: { row: 13, col: 1 },
    decor: [
      { row: 12, col: 0 },
      { row: 13, col: 0 }
    ]
  },
  sandWater: {
    interior: [
      { row: 17, col: 3 },
      { row: 17, col: 4 },
      { row: 17, col: 5 }
    ],
    edgeN: { row: 14, col: 4 },
    edgeS: { row: 16, col: 4 },
    edgeW: { row: 15, col: 3 },
    edgeE: { row: 15, col: 5 },
    cornerNW: { row: 14, col: 3 },
    cornerNE: { row: 14, col: 5 },
    cornerSE: { row: 16, col: 5 },
    cornerSW: { row: 16, col: 3 },
    innerNW: { row: 12, col: 4 },
    innerNE: { row: 12, col: 5 },
    innerSE: { row: 13, col: 5 },
    innerSW: { row: 13, col: 4 },
    decor: [
      { row: 12, col: 3 },
      { row: 13, col: 3 }
    ]
  },
  sandWaterPool: {
    interior: [
      { row: 17, col: 3 },
      { row: 17, col: 4 },
      { row: 17, col: 5 }
    ],
    edgeN: { row: 16, col: 4 },
    edgeS: { row: 14, col: 4 },
    edgeW: { row: 15, col: 5 },
    edgeE: { row: 15, col: 3 },
    cornerNW: { row: 16, col: 5 },
    cornerNE: { row: 16, col: 3 },
    cornerSE: { row: 14, col: 3 },
    cornerSW: { row: 14, col: 5 },
    innerNW: { row: 12, col: 4 },
    innerNE: { row: 12, col: 5 },
    innerSE: { row: 13, col: 5 },
    innerSW: { row: 13, col: 4 },
    decor: []
  }
};

const WATER_POOLS = [
  { cx: 6.2, cy: 5.6, rx: 1.7, ry: 1.2, jitter: 0.18 },
  { cx: 14.2, cy: 6.6, rx: 1.4, ry: 1.05, jitter: 0.18 },
  { cx: 22.2, cy: 5.8, rx: 1.8, ry: 1.25, jitter: 0.2 },
  { cx: 5.2, cy: 10.9, rx: 1.5, ry: 1.05, jitter: 0.16 },
  { cx: 23.0, cy: 10.5, rx: 1.8, ry: 1.15, jitter: 0.2 }
];

const ANOMALY_FIELDS = [
  { id: "north-drift", cx: 14.1, cy: 4.8, radius: 2.2, coreRadius: 0.72, pull: 260, controlLoss: 0.38, dragBoost: 0.32 },
  { id: "west-cluster", cx: 8.3, cy: 8.4, radius: 2.15, coreRadius: 0.68, pull: 220, controlLoss: 0.3, dragBoost: 0.26 },
  { id: "east-cluster", cx: 19.5, cy: 9.8, radius: 2.25, coreRadius: 0.74, pull: 240, controlLoss: 0.34, dragBoost: 0.28 }
];

const ANOMALY_DEBRIS_REFS = [
  { row: 18, col: 18 },
  { row: 18, col: 19 },
  { row: 18, col: 20 },
  { row: 19, col: 18 },
  { row: 20, col: 18 },
  { row: 20, col: 19 },
  { row: 20, col: 20 },
  { row: 21, col: 18 },
  { row: 21, col: 19 },
  { row: 21, col: 20 },
  { row: 22, col: 19 }
];

const ROCK_RECT_DEFS = {
  "2x2_a": { c0: 0, r0: 0, c1: 1, r1: 1 },
  "2x2_g": { c0: 24, r0: 4, c1: 25, r1: 5 },
  "2x2_h": { c0: 26, r0: 4, c1: 27, r1: 5 },
  "2x2_i": { c0: 24, r0: 6, c1: 25, r1: 7 },
  "2x2_j": { c0: 26, r0: 6, c1: 27, r1: 7 },
  "2x3_a": { c0: 16, r0: 0, c1: 17, r1: 2 },
  "3x3_a": { c0: 9, r0: 0, c1: 11, r1: 2 },
  "4x3_a": { c0: 20, r0: 5, c1: 23, r1: 7 }
};

const ROCK_VISUALS = buildRockVisualCatalog("brown");
const ROCK_INSTANCES = [
  { visualId: "boss_rock_brown_2x2_a", tileX: 6, tileY: 4 },
  { visualId: "boss_rock_brown_3x3_a", tileX: 11, tileY: 5 },
  { visualId: "boss_rock_brown_2x3_a", tileX: 20, tileY: 4 },
  { visualId: "boss_rock_brown_2x2_g", tileX: 3, tileY: 9 },
  { visualId: "boss_rock_brown_4x3_a", tileX: 17, tileY: 9 },
  { visualId: "boss_rock_brown_2x2_i", tileX: 9, tileY: 11 },
  { visualId: "boss_rock_brown_2x2_j", tileX: 21, tileY: 11 }
];

const EXPERIMENTS = [
  {
    id: "unit-01/lesson-01/mass-change/ice-to-water",
    title: "Ice to water",
    label: "ICE",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/ice-to-water.json",
    zone: { x: 2, y: 2, w: 3, h: 2 },
    previewKey: "stationIce",
    requirements: [
      { key: "ice-sample", kind: "ice", name: "Ice sample", formula: "H2O(s)", start: { x: 3.6, y: 6.4 } }
    ]
  },
  {
    id: "unit-01/lesson-01/mass-change/precipitate",
    title: "Precipitate",
    label: "PRECIP",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/precipitate.json",
    zone: { x: 11, y: 1, w: 4, h: 2 },
    previewKey: "stationPrecipitate",
    requirements: [
      { key: "silver-nitrate", kind: "solution", name: "Silver nitrate", formula: "AgNO3(aq)", tint: "#90d4ff", start: { x: 10.6, y: 4.3 } },
      { key: "sodium-chloride", kind: "solution", name: "Sodium chloride", formula: "NaCl(aq)", tint: "#ffc980", start: { x: 15.7, y: 3.7 } }
    ]
  },
  {
    id: "unit-01/lesson-01/mass-change/steel-wool-pulled-apart",
    title: "Steel wool pulled apart",
    label: "STEEL PULL",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/steel-wool-pulled-apart.json",
    zone: { x: 21, y: 2, w: 4, h: 2 },
    previewKey: "stationSteelPull",
    requirements: [
      { key: "steel-wool", kind: "steel", name: "Steel wool", formula: "Fe(s)", start: { x: 24.3, y: 5.7 } }
    ]
  },
  {
    id: "unit-01/lesson-01/mass-change/sugar-dissolves",
    title: "Sugar dissolves",
    label: "SUGAR",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/sugar-dissolves.json",
    zone: { x: 2, y: 13, w: 4, h: 2 },
    previewKey: "stationSugar",
    requirements: [
      { key: "water-beaker", kind: "water", name: "Water", formula: "H2O(l)", tint: "#7fd4ff", start: { x: 1.8, y: 11.7 } },
      { key: "sucrose", kind: "sugar", name: "Sucrose", formula: "C12H22O11(s)", tint: "#fff0c4", start: { x: 6.2, y: 11.4 } }
    ]
  },
  {
    id: "unit-01/lesson-01/mass-change/steel-wool-burns",
    title: "Steel wool burns",
    label: "STEEL BURN",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/steel-wool-burns.json",
    zone: { x: 11, y: 14, w: 4, h: 2 },
    previewKey: "stationBurn",
    requirements: [
      { key: "burn-steel", kind: "steel-burn", name: "Steel wool", formula: "Fe(s)", start: { x: 14.6, y: 12.6 } }
    ]
  },
  {
    id: "unit-01/lesson-01/mass-change/alka-seltzer",
    title: "Alka-Seltzer",
    label: "ALKA",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/alka-seltzer.json",
    zone: { x: 21, y: 13, w: 4, h: 2 },
    previewKey: "stationAlka",
    requirements: [
      { key: "alka-water", kind: "water", name: "Water", formula: "H2O(l)", tint: "#79cff8", start: { x: 24.2, y: 11.8 } },
      { key: "alka-tablet", kind: "tablet", name: "Tablet", formula: "NaHCO3 + citric acid", start: { x: 25.4, y: 15.1 } }
    ]
  }
];

const CAPTURE_PRESETS = {
  "unit-01/lesson-01/mass-change/ice-to-water": { before: 84.2, after: 84.2 },
  "unit-01/lesson-01/mass-change/precipitate": { before: 120.0, after: 120.0 },
  "unit-01/lesson-01/mass-change/steel-wool-pulled-apart": { before: 42.6, after: 42.6 },
  "unit-01/lesson-01/mass-change/sugar-dissolves": { before: 93.4, after: 93.4 },
  "unit-01/lesson-01/mass-change/steel-wool-burns": { before: 18.2, after: 19.1 },
  "unit-01/lesson-01/mass-change/alka-seltzer": { before: 102.5, after: 100.8 }
};

const worldCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("world-canvas"));
const worldCtx = worldCanvas.getContext("2d");
const actorCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("actor-canvas"));
const ctx = actorCanvas.getContext("2d");
const experimentPlaceholderText = document.getElementById("experiment-placeholder-text");
const statusPill = document.getElementById("status-pill");
const experimentWindow = document.getElementById("experiment-window");
const overlayFrame = document.getElementById("experiment-frame");
const closeOverlayButton = document.getElementById("close-overlay");
const hullHud = document.getElementById("hud-hull");
const fieldHud = document.getElementById("hud-field");
const captureButton = document.getElementById("capture-evidence");
const captureActiveTitle = document.getElementById("capture-active-title");
const captureActiveCopy = document.getElementById("capture-active-copy");
const captureBefore = document.getElementById("capture-before");
const captureAfter = document.getElementById("capture-after");
const captureDelta = document.getElementById("capture-delta");
const captureCount = document.getElementById("capture-count");
const zoneCaptureList = document.getElementById("zone-capture-list");
const dataDrone = document.getElementById("data-drone");
const aiBriefingAssumption = document.getElementById("ai-briefing-assumption");
const droneBriefingCopy = document.getElementById("drone-briefing-copy");
const startupExperimentId = new URLSearchParams(window.location.search).get("experiment");

const keys = new Set();
const groundGrid = createFilledGrid();
const waterGrid = createBlobGrid(WATER_POOLS);
const spawnPoint = { x: 14 * TILE_SIZE + TILE_SIZE / 2, y: 9 * TILE_SIZE + TILE_SIZE / 2 };

let assetsReady = false;
let overlayOpen = false;
let experimentFrameReady = false;
let loadedExperimentId = "";
let rearmZoneId = null;
let activeZone = null;
let visualTimeMs = 0;
let deathTimerMs = 0;
let deathMessage = "Field integrity lost. Repositioning ship...";
let impactCooldownMs = 0;
let hudFocusExperimentId = null;
let frameHandle = 0;
let previousTime = 0;
let worldDirty = true;
let actorDirty = true;
let spaceHeld = false;
let currentExperimentId = EXPERIMENTS[0].id;
let lastAiBriefingSignature = "";
let lastCaptureHudSignature = "";

const player = {
  x: spawnPoint.x,
  y: spawnPoint.y,
  vx: 0,
  vy: 0,
  angle: 0,
  thrusting: false,
  alive: true,
  hull: MAX_HULL,
  lastSafeX: spawnPoint.x,
  lastSafeY: spawnPoint.y
};
const arm = {
  deployed: false,
  extension: 0,
  headLocalX: 18,
  headLocalY: 0,
  pathLocal: [],
  carryingId: null,
  headWorldX: spawnPoint.x,
  headWorldY: spawnPoint.y,
  aimAngle: 0,
  targetAngle: 0
};

const state = {
  images: {
    terrainSheet: null,
    rockSheet: null,
    rockAuraSheet: null,
    pilotSheet: null,
    ship: null,
    armParts: null,
    experimentArt: null
  },
  animationMap: null,
  backgroundLayer: null,
  groundLayer: null,
  waterLayer: null,
  anomalyLayer: null,
  rockLayer: null,
  rockMasks: [],
  worldLayer: null,
  shipFrameCache: null,
  experimentObjects: [],
  captures: createCaptureState()
};

initializeZoneCaptureCards();

const loadState = Promise.all([
  loadImage("../../../assets/game-poc/tiles/terrain.png"),
  loadImage("../../../assets/game-poc/tiles/rocks.png"),
  loadImage("../../../assets/game-poc/tiles/rocks_aura_r0.png"),
  loadImage("../../../assets/game-poc/heroes/DefaultHero.png"),
  loadImage("../../../assets/spaceship/spaceship.png"),
  loadNamedImages(ARM_PART_SOURCES),
  loadNamedImages(EXPERIMENT_ART_SOURCES),
  fetch("../../../assets/game-poc/heroes/anim_map.json").then((res) => {
    if (!res.ok) {
      throw new Error(`Animation map request failed with status ${res.status}.`);
    }
    return res.json();
  })
]).then(([terrainSheet, rockSheet, rockAuraSheet, pilotSheet, ship, armParts, experimentArt, animationMap]) => {
  const startupExperiment = startupExperimentId ? findExperimentByIdentifier(startupExperimentId) : null;
  if (startupExperiment) {
    currentExperimentId = startupExperiment.id;
  }

  state.images.terrainSheet = terrainSheet;
  state.images.rockSheet = rockSheet;
  state.images.rockAuraSheet = rockAuraSheet;
  state.images.pilotSheet = pilotSheet;
  state.images.ship = ship;
  state.images.armParts = armParts;
  state.images.experimentArt = experimentArt;
  state.animationMap = animationMap;
  state.experimentObjects = buildExperimentObjects();
  state.backgroundLayer = buildBackgroundLayer();
  state.groundLayer = buildTerrainLayer(groundGrid, TERRAIN_THEME.ground);
  state.waterLayer = buildTerrainLayer(waterGrid, TERRAIN_THEME.water);
  state.anomalyLayer = buildAnomalyLayer();
  state.rockLayer = buildRockLayer();
  state.rockMasks = buildRockMasks();
  state.worldLayer = buildWorldLayer();
  resetArmState(true);
  state.shipFrameCache = buildShipFrameCache();
  assetsReady = true;
  activeZone = getCurrentExperiment();
  setStatus("Arrow keys fly the ship. Space deploys the arm. WASD steers the claw. Thread through pickups and bring them back cleanly.");
  renderAiBriefing();
  renderCaptureHud();
  updateHullHud();
  updateFieldHud({ tier: "clear" });
  invalidateWorldLayer();
  invalidateActorLayer();
  loadExperimentFrame(getCurrentExperiment());
});

document.addEventListener("keydown", (event) => {
  keys.add(event.key.toLowerCase());
  if (overlayOpen && event.key === "Escape") {
    closeOverlay();
  }
  if (event.key === " " && !event.repeat) {
    spaceHeld = true;
    toggleArmDeployment();
  }
  if (event.key === "Enter" && !event.repeat) {
    tryStartExperimentFromField();
  }
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Enter", "w", "a", "s", "d", "W", "A", "S", "D"].includes(event.key)) {
    event.preventDefault();
  }
  requestFrame();
});

document.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
  if (event.key === " ") {
    spaceHeld = false;
  }
  requestFrame();
});

closeOverlayButton.addEventListener("click", closeOverlay);
captureButton.addEventListener("click", captureEvidence);
overlayFrame.addEventListener("load", () => {
  experimentFrameReady = true;
  experimentWindow.classList.add("is-loaded");
  configureHostedExperimentFrame();
  const chamberExperiment = activeZone || getCurrentExperiment();
  setStatus(overlayOpen
    ? `${chamberExperiment.title} is live in the chamber.`
    : `Chamber synchronized for ${chamberExperiment.title}.`);
  renderAiBriefing();
  renderCaptureHud();
});

requestFrame();

function frame(now) {
  frameHandle = 0;
  const dtMs = previousTime ? Math.min(40, now - previousTime) : 16.67;
  previousTime = now;

  if (!assetsReady) {
    renderLoading();
    requestFrame();
    return;
  }

  update(dtMs);

  const keepAnimating = shouldContinueAnimating();
  const needsWorldPaint = worldDirty;
  const needsActorPaint = actorDirty || keepAnimating;

  if (needsWorldPaint) {
    renderWorldLayer();
  }

  if (needsActorPaint) {
    renderActorLayer();
  }

  if (needsWorldPaint || needsActorPaint) {
    requestFrame();
  } else {
    previousTime = 0;
  }
}

function update(dtMs) {
  const wasAlive = player.alive;
  const priorX = player.x;
  const priorY = player.y;
  const priorAngle = player.angle;
  const priorZoneId = activeZone?.id || null;
  const priorArmHeadX = arm.headWorldX;
  const priorArmHeadY = arm.headWorldY;
  let changed = false;

  const currentExperiment = getCurrentExperiment();
  if ((activeZone?.id || null) !== currentExperiment.id) {
    activeZone = currentExperiment;
    hudFocusExperimentId = currentExperiment.id;
    renderAiBriefing();
    renderCaptureHud();
    refreshWorldLayer();
  }

  if (!player.alive) {
    deathTimerMs -= dtMs;
    if (deathTimerMs <= 0) {
      respawn();
    }
    invalidateActorLayer();
    return;
  }

  impactCooldownMs = Math.max(0, impactCooldownMs - dtMs);

  const input = getShipInputVector();
  const dt = dtMs / 1000;
  const baseAccel = 920;
  const baseMaxSpeed = 292;
  const baseDrag = 0.92;
  const anomalyInfluence = sampleAnomalyInfluence(player.x, player.y);
  const accel = baseAccel * anomalyInfluence.inputScale;
  const maxSpeed = baseMaxSpeed * anomalyInfluence.maxSpeedScale;
  const drag = baseDrag - anomalyInfluence.dragBoost * 0.12;
  updateFieldHud(anomalyInfluence);
  player.thrusting = input.mag > 0;

  if (input.mag > 0) {
    player.vx += input.x * accel * dt;
    player.vy += input.y * accel * dt;
    const targetAngle = Math.atan2(input.y, input.x) + Math.PI / 2;
    player.angle = easeAngle(player.angle, targetAngle, 0.22);
  } else {
    player.vx *= Math.pow(drag, dtMs / 16.67);
    player.vy *= Math.pow(drag, dtMs / 16.67);
  }

  player.vx += anomalyInfluence.pullX * dt;
  player.vy += anomalyInfluence.pullY * dt;

  const speed = Math.hypot(player.vx, player.vy);
  if (input.mag > 0 || speed > MOTION_EPSILON) {
    visualTimeMs += dtMs;
  }
  if (speed > maxSpeed) {
    const scale = maxSpeed / speed;
    player.vx *= scale;
    player.vy *= scale;
  }

  if (speed > 20 && input.mag === 0) {
    const driftAngle = Math.atan2(player.vy, player.vx) + Math.PI / 2;
    player.angle = easeAngle(player.angle, driftAngle, 0.1);
  }

  if (input.mag === 0 && speed <= MOTION_EPSILON) {
    player.vx = 0;
    player.vy = 0;
  }

  resolvePlayerMovement(dt);
  const armChanged = updateArm(dtMs);
  if (armChanged) {
    visualTimeMs += dtMs;
  }

  const postMoveInfluence = sampleAnomalyInfluence(player.x, player.y);
  updateFieldHud(postMoveInfluence);
  applyAnomalyDamage(postMoveInfluence, dtMs);
  if (!player.alive) {
    return;
  }
  if (postMoveInfluence.inCore) {
    killPlayer("Dense anomaly overwhelmed the ship. Resetting...");
    return;
  }

  if (!overlayOpen && postMoveInfluence.warningLevel > 0.38) {
    setStatus("Localized dark-sector pull rising. Keep clear of the dense core.");
  } else if (!overlayOpen && postMoveInfluence.warningLevel > 0.14) {
    setStatus("Dust and stones are drifting wrong here. Controls feel unstable.");
  } else if (!overlayOpen && activeZone) {
    setStatus(describeExperimentStation(activeZone));
  } else {
    setExplorationStatus();
  }

  renderAiBriefing();
  renderCaptureHud();

  changed =
    changed ||
    !wasAlive ||
    Math.abs(player.x - priorX) > 0.01 ||
    Math.abs(player.y - priorY) > 0.01 ||
    Math.abs(player.angle - priorAngle) > 0.001 ||
    Math.abs(arm.headWorldX - priorArmHeadX) > 0.01 ||
    Math.abs(arm.headWorldY - priorArmHeadY) > 0.01 ||
    armChanged ||
    priorZoneId !== (activeZone?.id || null);

  if (changed) {
    invalidateActorLayer();
  }
}

function renderWorldLayer() {
  worldDirty = false;
  worldCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  worldCtx.drawImage(state.backgroundLayer, 0, 0);
  worldCtx.drawImage(state.worldLayer, 0, 0);
}

function renderActorLayer() {
  actorDirty = false;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawExperimentObjects();
  drawActiveExperimentZone();
  drawPlayer();
  drawArm();

  if (!player.alive) {
    drawDeathOverlay();
  }
}

function renderLoading() {
  worldCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#2a2018";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#f2e5c6";
  ctx.font = "24px Georgia";
  ctx.fillText("Loading ship proof of concept...", 28, 60);
}

function getCurrentExperiment() {
  return findExperimentByIdentifier(currentExperimentId) || EXPERIMENTS[0];
}

function getCurrentExperimentIndex() {
  return EXPERIMENTS.findIndex((experiment) => experiment.id === getCurrentExperiment().id);
}

function setCurrentExperiment(experimentId) {
  if (!experimentId || experimentId === currentExperimentId) {
    return;
  }
  currentExperimentId = experimentId;
  activeZone = getCurrentExperiment();
  hudFocusExperimentId = activeZone.id;
  loadExperimentFrame(activeZone);
  refreshWorldLayer();
  renderAiBriefing();
  renderCaptureHud();
  invalidateActorLayer();
}

function advanceCurrentExperiment() {
  const currentIndex = getCurrentExperimentIndex();
  if (currentIndex < 0 || currentIndex >= EXPERIMENTS.length - 1) {
    return false;
  }
  setCurrentExperiment(EXPERIMENTS[currentIndex + 1].id);
  return true;
}

function refreshWorldLayer() {
  if (!assetsReady) {
    return;
  }
  state.worldLayer = buildWorldLayer();
  invalidateWorldLayer();
}

function getExperimentZone() {
  return FIELD_CHAMBER_ZONE;
}

function isCurrentChamberFocused() {
  return Boolean(getZoneAtPoint(player.x, player.y));
}

function getCurrentRequiredObject(experiment) {
  return state.experimentObjects.find((object) => object.experimentId === experiment.id && !object.delivered) || null;
}

function getInvestigationTask(experiment) {
  const nextObject = getCurrentRequiredObject(experiment);
  if (overlayOpen && activeZone?.id === experiment.id) {
    return experimentFrameReady
      ? `Run ${experiment.title} in the chamber, then capture the evidence for the AI.`
      : `Linking ${experiment.title} into the chamber now. Hold position and prepare to capture evidence.`;
  }
  if (nextObject) {
    return `Retrieve ${nextObject.name} (${nextObject.formula}) and deposit it in the experimental chamber.`;
  }
  if (!isCurrentChamberFocused()) {
    return `Return to the experimental chamber and dock over the pad to begin ${experiment.title}.`;
  }
  return `Press Enter to begin ${experiment.title} in the chamber.`;
}

function getInvestigationQuestion(experiment) {
  const questions = {
    "unit-01/lesson-01/mass-change/ice-to-water": "What happens to mass when ice melts?",
    "unit-01/lesson-01/mass-change/precipitate": "What happens to mass when two liquids make a new solid?",
    "unit-01/lesson-01/mass-change/steel-wool-pulled-apart": "What happens to mass when steel wool gets pulled apart?",
    "unit-01/lesson-01/mass-change/sugar-dissolves": "What happens to mass when sugar dissolves in water?",
    "unit-01/lesson-01/mass-change/steel-wool-burns": "What happens to mass when steel wool burns?",
    "unit-01/lesson-01/mass-change/alka-seltzer": "What happens to mass when Alka-Seltzer reacts in water?"
  };

  return questions[experiment.id] || "What happens to mass during this change?";
}

function getDronePrompt(experiment) {
  const nextObject = getCurrentRequiredObject(experiment);
  const experimentKey = experiment.id;

  if (overlayOpen && activeZone?.id === experiment.id) {
    if (experimentKey === "unit-01/lesson-01/mass-change/ice-to-water") {
      return experimentFrameReady
        ? "Ice, ice! Watch the beaker and grab the good evidence."
        : "Okay, okay... waking up the chamber.";
    }

    return experimentFrameReady
      ? "Okay, okay... watch closely and catch the evidence."
      : "Hold on... waking up the chamber.";
  }

  if (nextObject) {
    if (experimentKey === "unit-01/lesson-01/mass-change/ice-to-water") {
      return getDeliveredCount(experiment) > 0
        ? "Bring the ice over here and drop it in."
        : "I think there's ice outside somewhere...";
    }

    return `Let's go get the ${nextObject.name.toLowerCase()}.`;
  }

  if (!isCurrentChamberFocused()) {
    return "Bring it back to the chamber pad.";
  }

  if (isExperimentReady(experiment)) {
    return "Ooh, it's ready. Press Enter.";
  }

  return "We still need the setup pieces.";
}

function renderAiBriefing() {
  const experiment = getCurrentExperiment();
  const deliveredCount = getDeliveredCount(experiment);
  const captureCount = state.captures[experiment.id]?.count || 0;
  const signature = [
    experiment.id,
    overlayOpen ? "open" : "closed",
    experimentFrameReady ? "frame-ready" : "frame-pending",
    deliveredCount,
    captureCount,
    isCurrentChamberFocused() ? "focused" : "field"
  ].join("|");

  if (signature === lastAiBriefingSignature) {
    return;
  }
  lastAiBriefingSignature = signature;

  aiBriefingAssumption.textContent = getInvestigationQuestion(experiment);
  droneBriefingCopy.textContent = getDronePrompt(experiment);
  dataDrone?.classList.toggle("is-thinking", Boolean(droneBriefingCopy.textContent.trim()));
  experimentPlaceholderText.textContent = "Chamber optics waking up...";
}

function buildBackgroundLayer() {
  const layer = document.createElement("canvas");
  layer.width = CANVAS_WIDTH;
  layer.height = CANVAS_HEIGHT;
  const layerCtx = layer.getContext("2d");
  const gradient = layerCtx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, "#5b4632");
  gradient.addColorStop(1, "#2a2018");
  layerCtx.fillStyle = gradient;
  layerCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (let i = 0; i < 140; i++) {
    const x = (mixSeed(i, 3, 11) % CANVAS_WIDTH) | 0;
    const y = (mixSeed(i, 9, 17) % CANVAS_HEIGHT) | 0;
    const radius = 1 + (mixSeed(i, 5, 21) % 2);
    const alpha = 0.04 + ((mixSeed(i, 7, 33) % 40) / 255);
    layerCtx.fillStyle = `rgba(34, 24, 16, ${alpha.toFixed(3)})`;
    layerCtx.beginPath();
    layerCtx.arc(x, y, radius, 0, Math.PI * 2);
    layerCtx.fill();
  }

  return layer;
}

function buildWorldLayer() {
  const layer = document.createElement("canvas");
  layer.width = CANVAS_WIDTH;
  layer.height = CANVAS_HEIGHT;
  const layerCtx = layer.getContext("2d");
  layerCtx.drawImage(state.groundLayer, 0, 0);
  layerCtx.drawImage(state.waterLayer, 0, 0);
  layerCtx.drawImage(state.anomalyLayer, 0, 0);
  layerCtx.drawImage(state.rockLayer, 0, 0);
  drawExperimentStationsBase(layerCtx);
  return layer;
}

function buildTerrainLayer(grid, familyId, options = {}) {
  const layer = document.createElement("canvas");
  layer.width = CANVAS_WIDTH;
  layer.height = CANVAS_HEIGHT;
  const layerCtx = layer.getContext("2d");
  const sheet = state.images.terrainSheet;
  const family = TERRAIN_FAMILIES[familyId];
  const shadowColor = options.shadowColor || "";
  const shadowBlur = options.shadowBlur || 0;
  const shadowOffsetY = options.shadowOffsetY || 0;

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      if (!grid[row][col]) continue;

      const frame = resolveTerrainFrameRef(grid, row, col, family);
      const px = col * TILE_SIZE;
      const py = row * TILE_SIZE;
      const sx = frame.col * TILE_SIZE;
      const sy = frame.row * TILE_SIZE;

      if (shadowColor) {
        layerCtx.save();
        layerCtx.shadowColor = shadowColor;
        layerCtx.shadowBlur = shadowBlur;
        layerCtx.shadowOffsetY = shadowOffsetY;
        layerCtx.drawImage(sheet, sx, sy, TILE_SIZE, TILE_SIZE, px, py, TILE_SIZE, TILE_SIZE);
        layerCtx.restore();
      } else {
        layerCtx.drawImage(sheet, sx, sy, TILE_SIZE, TILE_SIZE, px, py, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  return layer;
}

function buildAnomalyLayer() {
  const layer = document.createElement("canvas");
  layer.width = CANVAS_WIDTH;
  layer.height = CANVAS_HEIGHT;
  const layerCtx = layer.getContext("2d");

  for (let index = 0; index < ANOMALY_FIELDS.length; index++) {
    drawAnomalySignature(layerCtx, ANOMALY_FIELDS[index], index);
  }

  return layer;
}

function buildRockLayer() {
  const layer = document.createElement("canvas");
  layer.width = CANVAS_WIDTH;
  layer.height = CANVAS_HEIGHT;
  const layerCtx = layer.getContext("2d");
  const rockSheet = state.images.rockSheet;

  for (const rock of ROCK_INSTANCES) {
    const visual = ROCK_VISUALS[rock.visualId];
    if (!visual) {
      continue;
    }

    const widthPx = visual.wTiles * TILE_SIZE;
    const heightPx = visual.hTiles * TILE_SIZE;
    const sx = visual.ref.col * TILE_SIZE;
    const sy = (visual.ref.row - visual.hTiles + 1) * TILE_SIZE;
    const dx = rock.tileX * TILE_SIZE;
    const dy = rock.tileY * TILE_SIZE;

    layerCtx.save();
    layerCtx.shadowColor = "rgba(0, 0, 0, 0.22)";
    layerCtx.shadowBlur = 10;
    layerCtx.shadowOffsetY = 4;
    layerCtx.drawImage(rockSheet, sx, sy, widthPx, heightPx, dx, dy, widthPx, heightPx);
    layerCtx.restore();
  }

  return layer;
}

function buildRockMasks() {
  const masks = [];
  const auraSheet = state.images.rockAuraSheet;

  for (const rock of ROCK_INSTANCES) {
    const visual = ROCK_VISUALS[rock.visualId];
    if (!visual) {
      continue;
    }

    const widthPx = visual.wTiles * TILE_SIZE;
    const heightPx = visual.hTiles * TILE_SIZE;
    const topRow = visual.ref.row - visual.hTiles + 1;
    const composite = document.createElement("canvas");
    composite.width = widthPx;
    composite.height = heightPx;
    const compositeCtx = composite.getContext("2d");

    for (let tileY = 0; tileY < visual.hTiles; tileY++) {
      for (let tileX = 0; tileX < visual.wTiles; tileX++) {
        const sx = (visual.ref.col + tileX) * TILE_SIZE;
        const sy = (topRow + tileY) * TILE_SIZE;
        compositeCtx.drawImage(
          auraSheet,
          sx,
          sy,
          TILE_SIZE,
          TILE_SIZE,
          tileX * TILE_SIZE,
          tileY * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        );
      }
    }

    const imageData = compositeCtx.getImageData(0, 0, widthPx, heightPx);
    masks.push({
      x: rock.tileX * TILE_SIZE,
      y: rock.tileY * TILE_SIZE,
      w: widthPx,
      h: heightPx,
      alpha: imageData.data
    });
  }

  return masks;
}

function drawAnomalySignature(layerCtx, anomaly, index) {
  const centerX = anomaly.cx * TILE_SIZE;
  const centerY = anomaly.cy * TILE_SIZE;
  const radiusX = anomaly.radius * TILE_SIZE;
  const radiusY = radiusX * 0.76;
  const rotation = ((mixSeed(index, 4, 37) % 1000) / 1000) * Math.PI;

  layerCtx.save();
  layerCtx.translate(centerX, centerY);
  layerCtx.rotate(rotation);

  const dustFill = layerCtx.createRadialGradient(0, 0, radiusX * 0.12, 0, 0, radiusX);
  dustFill.addColorStop(0, "rgba(73, 53, 32, 0.22)");
  dustFill.addColorStop(0.55, "rgba(92, 67, 39, 0.12)");
  dustFill.addColorStop(1, "rgba(92, 67, 39, 0)");
  layerCtx.fillStyle = dustFill;
  layerCtx.beginPath();
  layerCtx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
  layerCtx.fill();

  for (let arcIndex = 0; arcIndex < 4; arcIndex++) {
    const inset = arcIndex * 6;
    const start = 0.3 + arcIndex * 0.55;
    const end = start + 1.9;
    layerCtx.strokeStyle = `rgba(82, 61, 37, ${(0.18 - arcIndex * 0.025).toFixed(3)})`;
    layerCtx.lineWidth = 2;
    layerCtx.beginPath();
    layerCtx.ellipse(0, 0, radiusX - inset, radiusY - inset * 0.72, 0, start, end);
    layerCtx.stroke();
  }

  layerCtx.fillStyle = "rgba(52, 35, 21, 0.18)";
  layerCtx.beginPath();
  layerCtx.ellipse(0, 0, anomaly.coreRadius * TILE_SIZE * 1.05, anomaly.coreRadius * TILE_SIZE * 0.82, 0, 0, Math.PI * 2);
  layerCtx.fill();

  layerCtx.restore();

  drawAnomalyDebris(layerCtx, anomaly, index);
}

function drawAnomalyDebris(layerCtx, anomaly, index) {
  const sheet = state.images.terrainSheet;
  const centerX = anomaly.cx * TILE_SIZE;
  const centerY = anomaly.cy * TILE_SIZE;
  const radius = anomaly.radius * TILE_SIZE;

  for (let i = 0; i < 12; i++) {
    const seed = mixSeed(index, i, 59);
    const angle = ((seed % 1000) / 1000) * Math.PI * 2;
    const distance = radius * (0.48 + ((seed >>> 4) % 280) / 1000);
    const ref = ANOMALY_DEBRIS_REFS[(seed >>> 7) % ANOMALY_DEBRIS_REFS.length];
    const size = 12 + ((seed >>> 10) % 10);
    const drawX = centerX + Math.cos(angle) * distance - size / 2;
    const drawY = centerY + Math.sin(angle) * distance * 0.78 - size / 2;

    layerCtx.drawImage(
      sheet,
      ref.col * TILE_SIZE,
      ref.row * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
      Math.round(drawX),
      Math.round(drawY),
      size,
      size
    );
  }
}

function applyImpactDamage(speed) {
  if (impactCooldownMs > 0 || speed < 80 || !player.alive) {
    return;
  }

  const damage = Math.max(0, Math.round((speed - 80) / 6));
  if (damage <= 0) {
    impactCooldownMs = 120;
    return;
  }

  impactCooldownMs = 220;
  applyHullDamage(damage, damage >= 28 ? "Hull impact severe" : "Hull impact registered");
}

function applyAnomalyDamage(influence, dtMs) {
  if (!player.alive) {
    return;
  }
  const damage = influence.damagePerSecond * (dtMs / 1000);
  if (damage <= 0) {
    return;
  }
  applyHullDamage(damage, influence.tier === "lethal" ? "Anomaly shear is stripping the hull" : "Anomaly field is damaging the ship");
}

function applyHullDamage(amount, message) {
  player.hull = clamp(player.hull - amount, 0, MAX_HULL);
  updateHullHud();

  if (player.hull <= 0) {
    killPlayer(`${message}. Hull failure.`);
    return;
  }

  if (!activeZone && !overlayOpen && message) {
    setStatus(`${message}.`);
  }
}

function resolveTerrainFrameRef(grid, row, col, family) {
  const mask = computeNeighborMask(grid, row, col);
  const innerShape = innerCornerFromMask(mask);
  if (innerShape !== "none") {
    const innerFrame = resolveInnerCornerFrame(family, innerShape);
    if (innerFrame) {
      return innerFrame;
    }
  }

  const shape = autoShapeFromMask(mask);
  if (shape === "single" && family.decor.length > 0) {
    return pickTerrainVariant(family.decor, row, col, 41);
  }

  if (family[shape]) {
    return family[shape];
  }

  return pickTerrainVariant(family.interior, row, col, 17);
}

function resolveInnerCornerFrame(family, innerShape) {
  switch (innerShape) {
    case "innerNW":
      return family.innerSE;
    case "innerNE":
      return family.innerSW;
    case "innerSE":
      return family.innerNW;
    case "innerSW":
      return family.innerNE;
    default:
      return null;
  }
}

function pickTerrainVariant(variants, row, col, salt) {
  const index = Math.abs(mixSeed(row, col, salt)) % variants.length;
  return variants[index];
}

function computeNeighborMask(grid, row, col) {
  const same = (nextRow, nextCol) => {
    const clampedRow = clamp(nextRow, 0, GRID_ROWS - 1);
    const clampedCol = clamp(nextCol, 0, GRID_COLS - 1);
    return grid[clampedRow][clampedCol];
  };

  let mask = 0;
  if (same(row - 1, col)) mask |= 1 << 0;
  if (same(row, col + 1)) mask |= 1 << 1;
  if (same(row + 1, col)) mask |= 1 << 2;
  if (same(row, col - 1)) mask |= 1 << 3;
  if (same(row - 1, col + 1)) mask |= 1 << 4;
  if (same(row + 1, col + 1)) mask |= 1 << 5;
  if (same(row + 1, col - 1)) mask |= 1 << 6;
  if (same(row - 1, col - 1)) mask |= 1 << 7;
  return mask;
}

function innerCornerFromMask(mask) {
  const north = (mask & (1 << 0)) !== 0;
  const east = (mask & (1 << 1)) !== 0;
  const south = (mask & (1 << 2)) !== 0;
  const west = (mask & (1 << 3)) !== 0;
  const northEast = (mask & (1 << 4)) !== 0;
  const southEast = (mask & (1 << 5)) !== 0;
  const southWest = (mask & (1 << 6)) !== 0;
  const northWest = (mask & (1 << 7)) !== 0;

  if (!(north && east && south && west)) {
    return "none";
  }
  if (north && west && !northWest) return "innerNW";
  if (north && east && !northEast) return "innerNE";
  if (south && west && !southWest) return "innerSW";
  if (south && east && !southEast) return "innerSE";
  return "none";
}

function autoShapeFromMask(mask) {
  const north = (mask & (1 << 0)) !== 0;
  const east = (mask & (1 << 1)) !== 0;
  const south = (mask & (1 << 2)) !== 0;
  const west = (mask & (1 << 3)) !== 0;

  const cardinalMask =
    (north ? 1 : 0) |
    (east ? 2 : 0) |
    (south ? 4 : 0) |
    (west ? 8 : 0);

  switch (cardinalMask) {
    case 0:
      return "single";
    case 1:
      return "edgeS";
    case 2:
      return "edgeW";
    case 4:
      return "edgeN";
    case 8:
      return "edgeE";
    case 3:
      return "cornerSW";
    case 9:
      return "cornerSE";
    case 6:
      return "cornerNW";
    case 12:
      return "cornerNE";
    case 5:
      return "edgeW";
    case 10:
      return "edgeN";
    case 14:
      return "edgeN";
    case 11:
      return "edgeS";
    case 13:
      return "edgeE";
    case 7:
      return "edgeW";
    case 15:
    default:
      return "center";
  }
}

function mixSeed(row, col, salt) {
  return (((row + 1) * 73856093) ^ ((col + 1) * 19349663) ^ salt) >>> 0;
}

function drawExperimentStationsBase(layerCtx) {
  layerCtx.save();
  const experiment = getCurrentExperiment();
  const zone = getExperimentZone(experiment);
  const { x, y, w, h } = zone;
  const px = x * TILE_SIZE;
  const py = y * TILE_SIZE;
  const padWidth = w * TILE_SIZE;
  const padHeight = h * TILE_SIZE;
  const preview = state.images.experimentArt?.[experiment.previewKey];

  layerCtx.fillStyle = "rgba(14, 24, 31, 0.58)";
  layerCtx.fillRect(px + 4, py + 4, padWidth - 8, padHeight - 8);
  layerCtx.strokeStyle = "rgba(126, 197, 213, 0.52)";
  layerCtx.lineWidth = 2;
  layerCtx.strokeRect(px + 3, py + 3, padWidth - 6, padHeight - 6);

  if (preview) {
    const previewScale = Math.min((padWidth - 18) / preview.width, (padHeight - 18) / preview.height);
    const drawWidth = preview.width * previewScale;
    const drawHeight = preview.height * previewScale;
    layerCtx.globalAlpha = 0.9;
    layerCtx.drawImage(
      preview,
      px + (padWidth - drawWidth) / 2,
      py + (padHeight - drawHeight) / 2 + 3,
      drawWidth,
      drawHeight
    );
    layerCtx.globalAlpha = 1;
  }

  layerCtx.fillStyle = "rgba(10, 16, 22, 0.72)";
  layerCtx.fillRect(px + 6, py + 6, padWidth - 12, 16);
  layerCtx.fillStyle = "#d7f7ff";
  layerCtx.font = "bold 11px Georgia";
  layerCtx.textAlign = "center";
  layerCtx.textBaseline = "middle";
  layerCtx.fillText(`${experiment.label} CHAMBER`, px + padWidth / 2, py + 14);

  layerCtx.restore();
}

function drawActiveExperimentZone() {
  if (!activeZone) {
    return;
  }

  const { x, y, w, h } = getExperimentZone(activeZone);
  const px = x * TILE_SIZE;
  const py = y * TILE_SIZE;
  const ready = isExperimentReady(activeZone);
  const focused = isCurrentChamberFocused();
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = ready ? "rgba(175, 255, 178, 0.88)" : "rgba(255, 236, 160, 0.88)";
  ctx.strokeRect(px + 2, py + 2, w * TILE_SIZE - 4, h * TILE_SIZE - 4);
  ctx.fillStyle = ready ? "rgba(120, 255, 152, 0.12)" : "rgba(255, 241, 168, 0.12)";
  ctx.fillRect(px + 4, py + 4, w * TILE_SIZE - 8, h * TILE_SIZE - 8);

  const progress = getDeliveredCount(activeZone);
  ctx.fillStyle = "rgba(10, 16, 22, 0.78)";
  ctx.fillRect(px + 6, py + (h * TILE_SIZE) - 22, w * TILE_SIZE - 12, 14);
  ctx.fillStyle = ready ? "#b7ffd0" : "#fff0bf";
  ctx.font = "10px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    ready ? (focused ? "Press Enter to begin" : "Return to chamber") : `Placed ${progress}/${activeZone.requirements.length}`,
    px + (w * TILE_SIZE) / 2,
    py + (h * TILE_SIZE) - 15
  );
  ctx.restore();
}

function drawPlayer() {
  const frame = getShipFrame();
  ctx.drawImage(frame.canvas, Math.round(player.x - frame.anchorX), Math.round(player.y - frame.anchorY));
}

function buildShipFrameCache() {
  const shipImage = state.images.ship;
  const shipWidth = shipImage.width * SHIP_SCALE;
  const shipHeight = shipImage.height * SHIP_SCALE;
  const paddingX = 18;
  const paddingTop = 10;
  const paddingBottom = 28;
  const frameWidth = Math.ceil(shipWidth + paddingX * 2);
  const frameHeight = Math.ceil(shipHeight + paddingTop + paddingBottom);
  const anchorX = frameWidth / 2;
  const anchorY = paddingTop + shipHeight / 2;

  const cache = {
    idle: Object.create(null),
    thrust: Object.create(null),
    anchorX,
    anchorY
  };

  for (const direction of SHIP_DIRECTIONS) {
    const animationDef = state.animationMap.animations[`thrust${direction}`];
    const frameCols = animationDef.cols;
    cache.idle[direction] = renderShipFrame({
      direction,
      pilotFrame: frameCols[0],
      flameOffset: null,
      frameWidth,
      frameHeight,
      anchorX,
      anchorY,
      shipWidth,
      shipHeight
    });

    cache.thrust[direction] = frameCols.map((pilotFrame, index) => {
      const flameOffset = Math.sin((index / frameCols.length) * Math.PI * 2) * 4;
      return renderShipFrame({
        direction,
        pilotFrame,
        flameOffset,
        frameWidth,
        frameHeight,
        anchorX,
        anchorY,
        shipWidth,
        shipHeight
      });
    });
  }

  return cache;
}

function renderShipFrame({
  direction,
  pilotFrame,
  flameOffset,
  frameWidth,
  frameHeight,
  anchorX,
  anchorY,
  shipWidth,
  shipHeight
}) {
  const canvas = document.createElement("canvas");
  canvas.width = frameWidth;
  canvas.height = frameHeight;
  const frameCtx = canvas.getContext("2d");

  frameCtx.save();
  frameCtx.translate(anchorX, anchorY);

  frameCtx.fillStyle = "rgba(10, 15, 22, 0.35)";
  frameCtx.beginPath();
  frameCtx.ellipse(0, shipHeight * 0.34, shipWidth * 0.24, shipHeight * 0.12, 0, 0, Math.PI * 2);
  frameCtx.fill();

  if (typeof flameOffset === "number") {
    drawDirectionalThruster(frameCtx, shipWidth, shipHeight, 0.52, directionToAngle(direction), flameOffset);
  }

  frameCtx.drawImage(state.images.ship, -shipWidth / 2, -shipHeight / 2, shipWidth, shipHeight);
  drawPilotInCockpit(frameCtx, shipWidth, shipHeight, direction, pilotFrame);
  drawCanopyGlass(frameCtx, shipWidth, shipHeight);
  frameCtx.restore();

  return {
    canvas,
    anchorX,
    anchorY
  };
}

function getShipFrame() {
  const direction = angleToDirection(player.angle);
  if (!player.thrusting) {
    return state.shipFrameCache.idle[direction];
  }
  const frames = state.shipFrameCache.thrust[direction];
  const frameIndex = Math.floor(visualTimeMs / SHIP_FRAME_MS) % frames.length;
  return frames[frameIndex];
}

function getArmMode() {
  if (overlayOpen) {
    return "capture";
  }
  if (activeZone) {
    return "ready";
  }
  return "stowed";
}

function drawTentacleArm(targetCtx, shipWidth, shipHeight, armMode, armMotionPhase) {
  const armParts = state.images.armParts;
  if (!armParts) {
    return;
  }

  const pose = ARM_POSES[armMode] || ARM_POSES.stowed;
  const mountSocket = {
    x: shipWidth * 0.24,
    y: shipHeight * 0.07
  };
  const baseWidth = armParts.baseMount.width * ARM_SCALE.baseMount;
  const baseHeight = armParts.baseMount.height * ARM_SCALE.baseMount;

  targetCtx.save();
  targetCtx.imageSmoothingEnabled = false;
  targetCtx.globalAlpha = 0.94;
  targetCtx.drawImage(
    armParts.baseMount,
    mountSocket.x - baseWidth * 0.82,
    mountSocket.y - baseHeight * 0.48,
    baseWidth,
    baseHeight
  );

  let cursor = drawArmVerticalPiece(targetCtx, armParts.socketCup, mountSocket.x + 2, mountSocket.y + 3, pose.angles[0] - 0.1, ARM_SCALE.socketCup, 0.34);

  pose.angles.forEach((baseAngle, index) => {
    const wiggle = Math.sin(armMotionPhase + index * 0.85) * pose.wiggle[index];
    const angle = baseAngle + wiggle;
    cursor = drawArmVerticalPiece(targetCtx, armParts.connector, cursor.x, cursor.y, angle, ARM_SCALE.connector, 0.34);
    const vertebra = index % 2 === 0 ? armParts.jointPlain : armParts.jointStriped;
    cursor = drawArmVerticalPiece(targetCtx, vertebra, cursor.x, cursor.y, angle, ARM_SCALE.joint, 0.41);
  });

  const clawImage = pose.clawState === "open" ? armParts.clawOpen : armParts.clawClosed;
  drawArmHorizontalPiece(
    targetCtx,
    clawImage,
    cursor.x,
    cursor.y,
    pose.clawAngle + Math.sin(armMotionPhase + 1.1) * 0.025,
    ARM_SCALE.claw
  );
  targetCtx.restore();
}

function drawArmVerticalPiece(targetCtx, image, x, y, angle, scale, advanceFactor) {
  const width = image.width * scale;
  const height = image.height * scale;
  targetCtx.save();
  targetCtx.translate(x, y);
  targetCtx.rotate(angle - Math.PI / 2);
  targetCtx.drawImage(image, -width / 2, 0, width, height);
  targetCtx.restore();

  const advance = height * advanceFactor;
  return {
    x: x + Math.cos(angle) * advance,
    y: y + Math.sin(angle) * advance
  };
}

function drawArmHorizontalPiece(targetCtx, image, x, y, angle, scale) {
  const width = image.width * scale;
  const height = image.height * scale;
  targetCtx.save();
  targetCtx.translate(x, y);
  targetCtx.rotate(angle);
  targetCtx.drawImage(image, 0, -height / 2, width, height);
  targetCtx.restore();
}

function drawDirectionalThruster(targetCtx, shipWidth, shipHeight, thrusterAlpha, angle, flameOffset) {
  targetCtx.save();
  targetCtx.rotate(angle);

  const thruster = targetCtx.createLinearGradient(0, shipHeight * 0.12, 0, shipHeight * 0.58);
  thruster.addColorStop(0, `rgba(255, 252, 210, ${thrusterAlpha})`);
  thruster.addColorStop(0.35, `rgba(255, 179, 61, ${thrusterAlpha * 0.95})`);
  thruster.addColorStop(1, "rgba(255, 120, 10, 0)");
  targetCtx.fillStyle = thruster;
  targetCtx.beginPath();
  targetCtx.moveTo(-shipWidth * 0.08, shipHeight * 0.14);
  targetCtx.lineTo(shipWidth * 0.08, shipHeight * 0.14);
  targetCtx.lineTo(0, shipHeight * 0.54 + flameOffset);
  targetCtx.closePath();
  targetCtx.fill();

  targetCtx.restore();
}

function drawPilotInCockpit(targetCtx, shipWidth, shipHeight, direction, frameIndex) {
  const pilot = state.images.pilotSheet;
  const animationDef = state.animationMap.animations[`thrust${direction}`];
  const frameSize = state.animationMap.frameSize[0];
  const sx = frameIndex * frameSize;
  const sy = animationDef.row * frameSize;
  const drawSize = 34;
  const cockpitY = -shipHeight * 0.22;

  targetCtx.save();
  targetCtx.beginPath();
  targetCtx.ellipse(0, cockpitY, shipWidth * 0.18, shipHeight * 0.19, 0, 0, Math.PI * 2);
  targetCtx.clip();
  targetCtx.imageSmoothingEnabled = false;
  targetCtx.drawImage(pilot, sx, sy, frameSize, frameSize, -drawSize / 2, cockpitY - 24, drawSize, drawSize);
  targetCtx.restore();
}

function drawCanopyGlass(targetCtx, shipWidth, shipHeight) {
  const canopyY = -shipHeight * 0.21;
  const canopyRadiusX = shipWidth * 0.2;
  const canopyRadiusY = shipHeight * 0.21;

  const canopyGradient = targetCtx.createLinearGradient(0, canopyY - canopyRadiusY, 0, canopyY + canopyRadiusY);
  canopyGradient.addColorStop(0, "rgba(231, 249, 255, 0.34)");
  canopyGradient.addColorStop(0.35, "rgba(120, 222, 255, 0.18)");
  canopyGradient.addColorStop(1, "rgba(7, 108, 150, 0.26)");

  targetCtx.fillStyle = canopyGradient;
  targetCtx.beginPath();
  targetCtx.ellipse(0, canopyY, canopyRadiusX, canopyRadiusY, 0, 0, Math.PI * 2);
  targetCtx.fill();

  targetCtx.strokeStyle = "rgba(225, 247, 255, 0.58)";
  targetCtx.lineWidth = 1.4;
  targetCtx.beginPath();
  targetCtx.ellipse(0, canopyY, canopyRadiusX, canopyRadiusY, 0, 0, Math.PI * 2);
  targetCtx.stroke();

  targetCtx.strokeStyle = "rgba(8, 70, 96, 0.42)";
  targetCtx.lineWidth = 2.2;
  targetCtx.beginPath();
  targetCtx.ellipse(0, -shipHeight * 0.03, shipWidth * 0.24, shipHeight * 0.05, 0, Math.PI, Math.PI * 2);
  targetCtx.stroke();
}

function drawDeathOverlay() {
  ctx.fillStyle = "rgba(255, 57, 57, 0.16)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#ffe6e6";
  ctx.font = "bold 22px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(deathMessage, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

function buildHostedExperimentUrl(experiment) {
  const params = new URLSearchParams({
    experiment: experiment.id,
    mode: "embed"
  });
  return `/apps/studio/experiment-window/index.html?${params.toString()}`;
}

function configureHostedExperimentFrame() {
  let doc;
  let overrideStyle;

  try {
    doc = overlayFrame.contentDocument;
  } catch (error) {
    return;
  }

  if (!doc) {
    return;
  }

  overrideStyle = doc.getElementById("game-poc-host-override");
  if (!overrideStyle) {
    overrideStyle = doc.createElement("style");
    overrideStyle.id = "game-poc-host-override";
    overrideStyle.textContent = `
      html, body {
        background: transparent !important;
      }

      body.rainbow-experiment-window--embed .window-stage {
        min-height: 100vh;
        padding: 0 !important;
        background: transparent !important;
      }

      body.rainbow-experiment-window--embed .window-stage__header,
      body.rainbow-experiment-window--embed .custom-stage__toolbar,
      body.rainbow-experiment-window--embed .custom-stage__footer {
        display: none !important;
      }

      body.rainbow-experiment-window--embed #interactive-container,
      body.rainbow-experiment-window--embed .custom-stage {
        min-height: 100vh !important;
        border: 0 !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
      }

      body.rainbow-experiment-window--embed #interactive-container {
        overflow: hidden !important;
      }

      body.rainbow-experiment-window--embed .custom-stage__scene {
        min-height: calc(100vh + 8rem) !important;
        padding: 0 !important;
        display: grid !important;
        align-content: end !important;
      }

      body.rainbow-experiment-window--embed .custom-stage__scene-frame {
        width: 100% !important;
        max-width: none !important;
        height: 100vh !important;
        margin-top: -8rem !important;
        aspect-ratio: auto !important;
        border: 0 !important;
        border-radius: 0 !important;
        outline: none !important;
        background: transparent !important;
        box-shadow: none !important;
      }
    `;
    doc.head.appendChild(overrideStyle);
  }
}

function loadExperimentFrame(experiment) {
  if (!experiment) {
    return;
  }

  const url = buildHostedExperimentUrl(experiment);
  const absoluteUrl = new URL(url, window.location.origin).toString();

  hudFocusExperimentId = experiment.id;
  activeZone = experiment;
  experimentFrameReady = false;
  experimentWindow.classList.remove("is-loaded");

  if (loadedExperimentId === experiment.id && overlayFrame.src === absoluteUrl && experimentWindow.classList.contains("is-loaded")) {
    experimentFrameReady = true;
    experimentWindow.classList.add("is-loaded");
    return;
  }

  loadedExperimentId = experiment.id;
  overlayFrame.src = url;
}

function openExperiment(experiment) {
  overlayOpen = true;
  hudFocusExperimentId = experiment.id;
  activeZone = experiment;
  player.vx = 0;
  player.vy = 0;
  player.thrusting = false;
  experimentWindow.classList.add("is-active");
  setStatus(`Routing ${experiment.title} into the experiment chamber...`);
  loadExperimentFrame(experiment);
  renderAiBriefing();
  renderCaptureHud();
  invalidateActorLayer();
}

function closeExperimentFrame() {
  experimentFrameReady = false;
  experimentWindow.classList.remove("is-loaded");
}

function closeOverlay() {
  const completedExperiment = activeZone && state.captures[activeZone.id]?.count > 0 ? activeZone : null;
  overlayOpen = false;
  experimentWindow.classList.remove("is-active");
  closeExperimentFrame();
  if (completedExperiment && completedExperiment.id === currentExperimentId) {
    advanceCurrentExperiment();
  }
  activeZone = getCurrentExperiment();
  loadExperimentFrame(activeZone);
  renderAiBriefing();
  if (activeZone) {
    setStatus(describeExperimentStation(activeZone));
  } else {
    setStatus("Return to the field. Stage the next investigation in the chamber.");
  }
  renderCaptureHud();
  invalidateActorLayer();
}

function killPlayer(message = "Ship systems overwhelmed. Resetting...") {
  player.alive = false;
  player.thrusting = false;
  deathTimerMs = 850;
  deathMessage = message;
  player.vx = 0;
  player.vy = 0;
  setStatus(message);
  invalidateActorLayer();
}

function respawn() {
  player.alive = true;
  player.x = spawnPoint.x;
  player.y = spawnPoint.y;
  player.hull = MAX_HULL;
  player.lastSafeX = spawnPoint.x;
  player.lastSafeY = spawnPoint.y;
  player.vx = 0;
  player.vy = 0;
  player.angle = 0;
  player.thrusting = false;
  impactCooldownMs = 0;
  activeZone = getCurrentExperiment();
  rearmZoneId = null;
  deathMessage = "Field integrity lost. Repositioning ship...";
  for (const object of state.experimentObjects) {
    if (!object.delivered) {
      object.x = object.sourceX;
      object.y = object.sourceY;
    }
  }
  resetArmState(true);
  updateHullHud();
  updateFieldHud({ tier: "clear" });
  renderAiBriefing();
  setStatus("Ship reset. Deploy the arm with Space and continue the current investigation.");
  renderCaptureHud();
  invalidateActorLayer();
}

function getShipInputVector() {
  if (overlayOpen) {
    return { x: 0, y: 0, mag: 0 };
  }
  const up = keys.has("arrowup");
  const down = keys.has("arrowdown");
  const left = keys.has("arrowleft");
  const right = keys.has("arrowright");
  let x = (right ? 1 : 0) - (left ? 1 : 0);
  let y = (down ? 1 : 0) - (up ? 1 : 0);
  const mag = Math.hypot(x, y);
  if (mag > 0) {
    x /= mag;
    y /= mag;
  }
  return { x, y, mag };
}

function getArmInputVector() {
  if (overlayOpen || !arm.deployed || arm.extension < 0.08) {
    return { x: 0, y: 0, mag: 0 };
  }
  const up = keys.has("w");
  const down = keys.has("s");
  const left = keys.has("a");
  const right = keys.has("d");
  let x = (right ? 1 : 0) - (left ? 1 : 0);
  let y = (down ? 1 : 0) - (up ? 1 : 0);
  const mag = Math.hypot(x, y);
  if (mag > 0) {
    x /= mag;
    y /= mag;
  }
  return { x, y, mag };
}

function buildExperimentObjects() {
  return EXPERIMENTS.flatMap((experiment) =>
    experiment.requirements.map((requirement, index) => ({
      id: `${experiment.id}::${requirement.key}`,
      experimentId: experiment.id,
      slotIndex: index,
      kind: requirement.kind,
      name: requirement.name,
      formula: requirement.formula,
      tint: requirement.tint || "#d8ecff",
      sourceX: requirement.start.x * TILE_SIZE,
      sourceY: requirement.start.y * TILE_SIZE,
      x: requirement.start.x * TILE_SIZE,
      y: requirement.start.y * TILE_SIZE,
      delivered: false
    }))
  );
}

function getDeliveredCount(experiment) {
  return state.experimentObjects.filter((object) => object.experimentId === experiment.id && object.delivered).length;
}

function isExperimentReady(experiment) {
  return getDeliveredCount(experiment) === experiment.requirements.length;
}

function getFocusedExperiment() {
  return getCurrentExperiment();
}

function describeExperimentStation(experiment) {
  if (isExperimentReady(experiment)) {
    return isCurrentChamberFocused()
      ? `${experiment.title} ready. Press Enter to open the experiment view.`
      : `${experiment.title} staged. Return to the chamber to begin the experiment.`;
  }

  const nextObject = getCurrentRequiredObject(experiment);
  if (nextObject) {
    return `${experiment.title}: retrieve ${nextObject.name} (${nextObject.formula}) and place it in the chamber.`;
  }

  return `${experiment.title}: stage the chamber for the active investigation.`;
}

function tryStartExperimentFromField() {
  if (overlayOpen || !player.alive || !activeZone) {
    return;
  }
  if (!isExperimentReady(activeZone)) {
    setStatus(describeExperimentStation(activeZone));
    return;
  }
  if (!isCurrentChamberFocused()) {
    setStatus(`Return to the ${activeZone.label} chamber pad, then press Enter.`);
    return;
  }
  openExperiment(activeZone);
}

function toggleArmDeployment() {
  if (!assetsReady || overlayOpen || !player.alive) {
    return;
  }
  const wasDeployed = arm.deployed;
  arm.deployed = !arm.deployed;
  if (!arm.deployed) {
    setStatus("Arm retracting.");
  } else {
    if (!wasDeployed) {
      const rest = getArmRestLocal();
      arm.headLocalX = rest.x;
      arm.headLocalY = rest.y;
      arm.pathLocal = Array.from({ length: 8 }, () => ({ ...rest }));
      arm.aimAngle = ARM_LAUNCH_ANGLE;
      arm.targetAngle = ARM_LAUNCH_ANGLE;
      arm.extension = 1;
    }
    setStatus("Arm deployed. Steer the claw with WASD and snake it through the pickup.");
  }
  renderAiBriefing();
  invalidateActorLayer();
}

function getArmMountWorld() {
  const shipWidth = state.images.ship.width * SHIP_SCALE;
  const shipHeight = state.images.ship.height * SHIP_SCALE;
  return {
    x: player.x,
    y: player.y + shipHeight * 0.2
  };
}

function getArmRestLocal() {
  return {
    x: 0,
    y: 14
  };
}

function resetArmState(force = false) {
  arm.deployed = false;
  arm.extension = 0;
  const rest = { x: 0, y: 14 };
  arm.headLocalX = rest.x;
  arm.headLocalY = rest.y;
  arm.pathLocal = Array.from({ length: 8 }, () => ({ ...rest }));
  const mount = assetsReady ? getArmMountWorld() : { x: spawnPoint.x, y: spawnPoint.y };
  arm.headWorldX = mount.x + rest.x;
  arm.headWorldY = mount.y + rest.y;
  arm.aimAngle = ARM_LAUNCH_ANGLE;
  arm.targetAngle = arm.aimAngle;
  if (force) {
    arm.carryingId = null;
  }
}

function updateArm(dtMs) {
  const dt = dtMs / 1000;
  const previousExtension = arm.extension;
  const previousHeadX = arm.headLocalX;
  const previousHeadY = arm.headLocalY;
  const previousAimAngle = arm.aimAngle;
  const targetExtension = arm.deployed && !overlayOpen && player.alive ? 1 : 0;
  arm.extension = targetExtension > 0 ? 1 : approach(arm.extension, targetExtension, dt * ARM_EXTEND_SPEED);

  const rest = getArmRestLocal();
  const input = getArmInputVector();
  if (arm.deployed && arm.extension > 0.1) {
    if (input.mag > 0) {
      arm.aimAngle = Math.atan2(input.y, input.x);
      arm.targetAngle = arm.aimAngle;
    }
    arm.headLocalX += Math.cos(arm.aimAngle) * ARM_HEAD_SPEED * dt;
    arm.headLocalY += Math.sin(arm.aimAngle) * ARM_HEAD_SPEED * dt;
  } else {
    arm.headLocalX = approach(arm.headLocalX, rest.x, dt * 220);
    arm.headLocalY = approach(arm.headLocalY, rest.y, dt * 220);
    arm.targetAngle = ARM_LAUNCH_ANGLE;
    arm.aimAngle = ARM_LAUNCH_ANGLE;
  }

  if (arm.extension < 0.02 && !arm.deployed) {
    arm.headLocalX = rest.x;
    arm.headLocalY = rest.y;
  }

  pushArmHistoryPoint({ x: arm.headLocalX, y: arm.headLocalY }, rest);

  const mount = getArmMountWorld();
  arm.headWorldX = mount.x + arm.headLocalX;
  arm.headWorldY = mount.y + arm.headLocalY;

  if (arm.extension > 0.22) {
    if (
      arm.headWorldX < ARM_HEAD_RADIUS ||
      arm.headWorldX > CANVAS_WIDTH - ARM_HEAD_RADIUS ||
      arm.headWorldY < ARM_HEAD_RADIUS ||
      arm.headWorldY > CANVAS_HEIGHT - ARM_HEAD_RADIUS
    ) {
      failArm("Arm tip hit the field boundary. Retraction triggered.");
    } else if (circleIntersectsAnyRockMask(arm.headWorldX, arm.headWorldY, ARM_HEAD_RADIUS)) {
      failArm("Arm tip clipped a rock. Retraction triggered.");
    } else {
      const headField = sampleAnomalyInfluence(arm.headWorldX, arm.headWorldY);
      if (headField.tier === "medium" || headField.tier === "lethal" || headField.tier === "core") {
        failArm("Arm tip entered a dense anomaly field. Retraction triggered.");
      }
    }
  }

  if (arm.carryingId) {
    const carried = getCarriedObject();
    if (carried) {
      const carryPoint = getArmCarryPoint();
      carried.x = carryPoint.x;
      carried.y = carryPoint.y;
      deliverCarriedObjectIfPossible(carried);
    } else {
      arm.carryingId = null;
    }
  } else if (arm.deployed && arm.extension > 0.2) {
    autoLatchNearestObject();
  }

  return (
    Math.abs(previousExtension - arm.extension) > 0.0001 ||
    Math.abs(previousHeadX - arm.headLocalX) > 0.001 ||
    Math.abs(previousHeadY - arm.headLocalY) > 0.001 ||
    Math.abs(shortestAngleDelta(previousAimAngle, arm.aimAngle)) > 0.001
  );
}

function pushArmHistoryPoint(point, rest) {
  if (!arm.pathLocal.length) {
    arm.pathLocal.push({ ...point });
    return;
  }

  const head = arm.pathLocal[0];
  const dx = point.x - head.x;
  const dy = point.y - head.y;
  const distance = Math.hypot(dx, dy);

  if (distance < ARM_HISTORY_STEP * 0.55) {
    arm.pathLocal[0] = { ...point };
  } else {
    const steps = Math.ceil(distance / ARM_HISTORY_STEP);
    for (let step = steps; step >= 1; step--) {
      const t = step / steps;
      arm.pathLocal.unshift({
        x: head.x + dx * t,
        y: head.y + dy * t
      });
    }
  }

  arm.pathLocal[0] = { ...point };
  const maxPoints = ARM_PATH_POINT_LIMIT;
  if (arm.pathLocal.length > maxPoints) {
    arm.pathLocal.length = maxPoints;
  }

  const tail = arm.pathLocal[arm.pathLocal.length - 1];
  if (Math.hypot(tail.x - rest.x, tail.y - rest.y) > ARM_HISTORY_STEP) {
    arm.pathLocal.push({ ...rest });
    arm.pathLocal.push({ x: 0, y: 0 });
  }
}

function sampleArmTrailPoints() {
  const mount = getArmMountWorld();
  const localPoints = arm.pathLocal.length ? arm.pathLocal.slice() : [{ x: arm.headLocalX, y: arm.headLocalY }];
  localPoints.push(getArmRestLocal(), { x: 0, y: 0 });

  const samples = [localPoints[0]];
  let accumulated = 0;
  let targetDistance = ARM_SEGMENT_SPACING;
  const maxSamples = ARM_RENDER_SEGMENT_LIMIT + 1;

  for (let index = 1; index < localPoints.length && samples.length < maxSamples; index++) {
    const prev = localPoints[index - 1];
    const next = localPoints[index];
    const segmentLength = Math.hypot(next.x - prev.x, next.y - prev.y);
    if (segmentLength === 0) {
      continue;
    }

    while (accumulated + segmentLength >= targetDistance && samples.length < maxSamples) {
      const t = (targetDistance - accumulated) / segmentLength;
      samples.push({
        x: prev.x + (next.x - prev.x) * t,
        y: prev.y + (next.y - prev.y) * t
      });
      targetDistance += ARM_SEGMENT_SPACING;
    }

    accumulated += segmentLength;
  }

  const tail = localPoints[localPoints.length - 1];
  if (samples.length < maxSamples && Math.hypot(samples[samples.length - 1].x - tail.x, samples[samples.length - 1].y - tail.y) > 0.5) {
    samples.push({ ...tail });
  }

  while (samples.length < 2) {
    samples.push({ ...tail });
  }

  return samples
    .slice(0, maxSamples)
    .reverse()
    .map((point) => ({ x: mount.x + point.x, y: mount.y + point.y }));
}

function getArmCarryPoint(points = sampleArmTrailPoints()) {
  const carryIndex = clamp(points.length - 1 - ARM_CARRY_LAG_SEGMENTS, 0, points.length - 1);
  return points[carryIndex];
}

function autoLatchNearestObject() {
  let bestObject = null;
  let bestDistance = Infinity;
  const currentExperiment = getCurrentExperiment();

  for (const object of state.experimentObjects) {
    if (object.delivered || object.experimentId !== currentExperiment.id) {
      continue;
    }
    const dx = object.x - arm.headWorldX;
    const dy = object.y - arm.headWorldY;
    const distance = Math.hypot(dx, dy);
    if (distance < ARM_LATCH_RADIUS && distance < bestDistance) {
      bestDistance = distance;
      bestObject = object;
    }
  }

  if (!bestObject) {
    return;
  }

  arm.carryingId = bestObject.id;
  setStatus(`${bestObject.name} is riding the arm. Bring it back cleanly.`);
}

function deliverCarriedObjectIfPossible(object) {
  const experiment = findExperimentByIdentifier(object.experimentId);
  if (!experiment || experiment.id !== getCurrentExperiment().id) {
    return false;
  }

  const zone = getExperimentZone(experiment);
  const tileX = Math.floor(object.x / TILE_SIZE);
  const tileY = Math.floor(object.y / TILE_SIZE);
  if (tileX < zone.x || tileX >= zone.x + zone.w || tileY < zone.y || tileY >= zone.y + zone.h) {
    return false;
  }

  const slot = getExperimentSlotPosition(experiment, object.slotIndex);
  object.delivered = true;
  object.x = slot.x;
  object.y = slot.y;
  arm.carryingId = null;
  hudFocusExperimentId = experiment.id;
  renderAiBriefing();
  renderCaptureHud();
  setStatus(`${object.name} placed on ${experiment.title}. ${getDeliveredCount(experiment)}/${experiment.requirements.length} ready.`);
  return true;
}

function failArm(message) {
  const carried = getCarriedObject();
  arm.carryingId = null;
  arm.deployed = false;
  setStatus(carried ? `${message} ${carried.name} dropped in place.` : message);
  renderAiBriefing();
}

function getCarriedObject() {
  return arm.carryingId ? state.experimentObjects.find((object) => object.id === arm.carryingId) || null : null;
}

function getExperimentSlotPosition(experiment, slotIndex) {
  const { x, y, w, h } = getExperimentZone(experiment);
  const count = experiment.requirements.length;
  const centerX = (x + w / 2) * TILE_SIZE;
  const baseY = (y + h) * TILE_SIZE - 18;
  const spread = Math.max(0, (count - 1) * 18);
  return {
    x: centerX - spread / 2 + slotIndex * 18,
    y: baseY
  };
}

function drawExperimentObjects() {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  for (const object of state.experimentObjects) {
    if (object.experimentId !== getCurrentExperiment().id) {
      continue;
    }
    drawExperimentObject(object);
  }
  ctx.restore();
}

function drawExperimentObject(object) {
  const selected = activeZone?.id === object.experimentId;
  const x = object.x;
  const y = object.y;
  const shortName = object.name.length > 12 ? `${object.name.slice(0, 12)}.` : object.name;
  const capsuleTint = object.tint || getPickupTint(object);

  drawPickupCapsuleShell(x, y, capsuleTint, selected, object.delivered);

  if (object.kind === "ice") {
    drawSpriteImage(state.images.experimentArt.iceCube, x, y - 1, 19, 19);
  } else if (object.kind === "steel") {
    drawSpriteImage(state.images.experimentArt.steelWool, x, y, 20, 16);
  } else if (object.kind === "steel-burn") {
    drawSpriteImage(state.images.experimentArt.steelWoolBurnable, x, y, 20, 17);
  } else if (object.kind === "tablet") {
    drawSpriteImage(state.images.experimentArt.alkaTablet, x, y, 15, 12);
  } else {
    drawCanisterPickup(x, y, object);
  }

  const labelFill = object.delivered
    ? "rgba(232, 249, 234, 0.96)"
    : selected
      ? "rgba(255, 247, 214, 0.97)"
      : "rgba(248, 244, 232, 0.95)";
  const labelStroke = object.delivered ? "rgba(90, 139, 102, 0.45)" : "rgba(126, 120, 98, 0.34)";
  drawLabelPill(x, y - 28, 58, 13, labelFill, labelStroke);
  ctx.fillStyle = "#203028";
  ctx.font = "8px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(shortName, Math.round(x), Math.round(y - 21));
  drawLabelPill(x, y + 23, 46, 13, labelFill, labelStroke);
  ctx.fillStyle = "#203028";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(object.formula, Math.round(x), Math.round(y + 23.5));
}

function drawSpriteImage(image, x, y, width, height) {
  if (!image) {
    return;
  }
  ctx.drawImage(image, Math.round(x - width / 2), Math.round(y - height / 2), width, height);
}

function getPickupTint(object) {
  if (object.kind === "ice") {
    return "rgba(171, 226, 255, 0.95)";
  }
  if (object.kind === "steel" || object.kind === "steel-burn") {
    return "rgba(214, 226, 230, 0.95)";
  }
  if (object.kind === "tablet") {
    return "rgba(225, 242, 191, 0.95)";
  }
  return object.tint || "rgba(192, 223, 232, 0.95)";
}

function drawPickupCapsuleShell(x, y, tint, selected, delivered) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.fillStyle = "rgba(71, 84, 79, 0.18)";
  ctx.beginPath();
  ctx.ellipse(0, 15, 19, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  const shellFill = delivered
    ? "rgba(241, 249, 241, 0.96)"
    : selected
      ? "rgba(255, 251, 237, 0.97)"
      : "rgba(247, 244, 235, 0.95)";
  const shellStroke = delivered ? "rgba(118, 156, 124, 0.42)" : "rgba(138, 142, 128, 0.34)";

  ctx.fillStyle = shellFill;
  ctx.strokeStyle = shellStroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(-18, -15, 36, 30, 13);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = tint;
  ctx.beginPath();
  ctx.roundRect(-13, -8, 26, 15, 8);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.64)";
  ctx.beginPath();
  ctx.moveTo(-9, -7);
  ctx.lineTo(7, -7);
  ctx.stroke();
  ctx.restore();
}

function drawLabelPill(x, y, width, height, fill, stroke) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(-width / 2, -height / 2, width, height, height / 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawCanisterPickup(x, y, object) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.fillStyle = "rgba(248, 251, 248, 0.84)";
  ctx.beginPath();
  ctx.roundRect(-11, -9, 22, 18, 8);
  ctx.fill();
  ctx.fillStyle = object.tint;
  ctx.beginPath();
  ctx.roundRect(-9, -6, 18, 12, 6);
  ctx.fill();
  ctx.fillStyle = "#20413a";
  ctx.font = "bold 7px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(object.kind === "sugar" ? "C12" : object.name === "Water" ? "H2O" : "AQ", 0, 1.5);
  ctx.restore();
}

function drawArm() {
  if (!assetsReady || arm.extension <= 0.01) {
    return;
  }

  const parts = state.images.armParts;
  const points = sampleArmTrailPoints();
  if (points.length < 2) {
    return;
  }

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.strokeStyle = "rgba(44, 54, 50, 0.2)";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length; index++) {
    ctx.lineTo(points[index].x, points[index].y);
  }
  ctx.stroke();

  for (let index = 0; index < points.length - 1; index++) {
    const from = points[index];
    const to = points[index + 1];
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    drawArmPart(parts.connector, midX, midY, angle + Math.PI / 2, 0.054);
    if (index < points.length - 2) {
      const jointImage = index % 2 === 0 ? parts.jointPlain : parts.jointStriped;
      drawArmPart(jointImage, to.x, to.y, angle, 0.064);
    }
  }

  const head = points[points.length - 1];
  const neck = points[points.length - 2];
  const headAngle = Math.atan2(head.y - neck.y, head.x - neck.x);
  const clawImage = arm.carryingId ? parts.clawClosed : parts.clawOpen;
  drawArmPart(clawImage, head.x, head.y, headAngle, 0.068);
  ctx.restore();
}

function drawArmPart(image, x, y, angle, scale) {
  const width = image.width * scale;
  const height = image.height * scale;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function approach(current, target, delta) {
  if (current < target) {
    return Math.min(target, current + delta);
  }
  if (current > target) {
    return Math.max(target, current - delta);
  }
  return target;
}

function createFilledGrid() {
  return Array.from({ length: GRID_ROWS }, () => Array.from({ length: GRID_COLS }, () => true));
}

function createBlobGrid(blobs) {
  const grid = Array.from({ length: GRID_ROWS }, () => Array.from({ length: GRID_COLS }, () => false));

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const sampleX = col + 0.5;
      const sampleY = row + 0.5;

      for (let index = 0; index < blobs.length; index++) {
        const blob = blobs[index];
        const dx = (sampleX - blob.cx) / blob.rx;
        const dy = (sampleY - blob.cy) / blob.ry;
        const noise = (((mixSeed(row, col, 71 + index * 13) % 1000) / 1000) - 0.5) * blob.jitter;
        if ((dx * dx) + (dy * dy) <= 1 + noise) {
          grid[row][col] = true;
          break;
        }
      }
    }
  }

  return grid;
}

function getZoneAtPoint(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);
  const experiment = getCurrentExperiment();
  const zone = getExperimentZone(experiment);
  return tileX >= zone.x && tileX < zone.x + zone.w && tileY >= zone.y && tileY < zone.y + zone.h ? experiment : null;
}

function findExperimentByIdentifier(identifier) {
  return EXPERIMENTS.find((experiment) => experiment.id === identifier || experiment.id.endsWith(`/${identifier}`)) || null;
}

function createCaptureState() {
  return Object.fromEntries(
    EXPERIMENTS.map((experiment) => [
      experiment.id,
      {
        count: 0,
        before: null,
        after: null,
        delta: null,
        lastCapturedAt: null
      }
    ])
  );
}

function captureEvidence() {
  if (!activeZone || !overlayOpen || !experimentFrameReady || !player.alive) {
    return;
  }

  const preset = CAPTURE_PRESETS[activeZone.id];
  const record = state.captures[activeZone.id];
  record.count += 1;
  record.before = preset.before;
  record.after = preset.after;
  record.delta = roundToTwo(preset.after - preset.before);
  record.lastCapturedAt = Date.now();
  hudFocusExperimentId = activeZone.id;

  setStatus(`${activeZone.title} evidence captured. The chamber log is ready for the next correction step.`);
  renderCaptureHud();
  renderAiBriefing();
}

function renderCaptureHud() {
  const currentExperiment = getCurrentExperiment();
  const focusExperiment = getHudFocusExperiment();
  const focusRecord = focusExperiment ? state.captures[focusExperiment.id] : null;
  const activeRecord = activeZone ? state.captures[activeZone.id] : null;
  const canCapture = Boolean(activeZone && overlayOpen && experimentFrameReady && player.alive);
  const signature = [
    currentExperiment.id,
    activeZone?.id || "none",
    overlayOpen ? "open" : "closed",
    experimentFrameReady ? "frame-ready" : "frame-pending",
    canCapture ? "capture-ready" : "capture-off",
    getDeliveredCount(currentExperiment),
    ...EXPERIMENTS.map((experiment) => `${experiment.id}:${state.captures[experiment.id].count}:${state.captures[experiment.id].delta ?? "na"}`)
  ].join("|");

  if (signature === lastCaptureHudSignature) {
    return;
  }
  lastCaptureHudSignature = signature;

  captureButton.disabled = !canCapture;
  captureButton.textContent = canCapture ? `Capture ${activeZone.label}` : "Capture Evidence";

  if (activeZone) {
    captureActiveTitle.textContent = activeZone.title;
    captureActiveCopy.textContent = experimentFrameReady
      ? "Run the chamber experiment, then capture the evidence that will let you correct the AI."
      : isExperimentReady(activeZone)
        ? "The chamber is syncing now. Capture will arm as soon as the live stage is ready."
        : "The current investigation still needs its required objects staged in the chamber.";
  } else if (focusExperiment && focusRecord && focusRecord.count > 0) {
    captureActiveTitle.textContent = `${focusExperiment.title} log`;
    captureActiveCopy.textContent = "No live station selected. The latest recorded evidence stays visible here until you focus another station.";
  } else {
    captureActiveTitle.textContent = "No active investigation";
    captureActiveCopy.textContent = "Stage the current investigation in the chamber, run it, then capture the result.";
  }

  const displayRecord = activeZone ? activeRecord : focusRecord;
  if (displayRecord && displayRecord.count > 0) {
    captureBefore.textContent = formatMass(displayRecord.before);
    captureAfter.textContent = formatMass(displayRecord.after);
    captureDelta.textContent = formatSignedMass(displayRecord.delta);
    captureCount.textContent = String(displayRecord.count);
  } else {
    captureBefore.textContent = "--";
    captureAfter.textContent = "--";
    captureDelta.textContent = "--";
    captureCount.textContent = "0";
  }

  for (const experiment of EXPERIMENTS) {
    const record = state.captures[experiment.id];
    const isActive = currentExperiment && currentExperiment.id === experiment.id;
    const refs = state.capturesUi[experiment.id];
    let stateCopy = "Awaiting first capture.";
    if (isActive && canCapture) {
      stateCopy = "Chamber live. Capture ready.";
    } else if (isActive && overlayOpen && !experimentFrameReady) {
      stateCopy = "Chamber syncing.";
    } else if (isActive && !record.count) {
      stateCopy = isExperimentReady(experiment) ? "Current investigation: staged." : "Current investigation: gather objects.";
    } else if (record.count > 0) {
      stateCopy = "Recorded in side log.";
    }

    refs.card.classList.toggle("is-active", Boolean(isActive));
    refs.card.classList.toggle("is-captured", record.count > 0);
    refs.badge.textContent = String(record.count);
    refs.state.textContent = stateCopy;
    refs.captures.textContent = String(record.count);
    refs.delta.textContent = record.count > 0 ? formatSignedMass(record.delta) : "--";
  }
}

function getHudFocusExperiment() {
  if (activeZone) {
    return activeZone;
  }
  return hudFocusExperimentId ? findExperimentByIdentifier(hudFocusExperimentId) : null;
}

function resolvePlayerMovement(dt) {
  const proposedX = clamp(player.x + player.vx * dt, PLAYER_COLLISION_RADIUS, CANVAS_WIDTH - PLAYER_COLLISION_RADIUS);
  const xResult = resolveRockAxis(proposedX, player.y, "x");
  if (xResult.collided) {
    player.vx = 0;
    applyImpactDamage(xResult.impactSpeed);
  }
  player.x = xResult.position;

  const proposedY = clamp(player.y + player.vy * dt, PLAYER_COLLISION_RADIUS, CANVAS_HEIGHT - PLAYER_COLLISION_RADIUS);
  const yResult = resolveRockAxis(player.x, proposedY, "y");
  if (yResult.collided) {
    player.vy = 0;
    applyImpactDamage(yResult.impactSpeed);
  }
  player.y = yResult.position;
}

function resolveRockAxis(nextX, nextY, axis) {
  const start = axis === "x" ? player.x : player.y;
  const direction = Math.sign((axis === "x" ? nextX - player.x : nextY - player.y) || 0);
  if (!direction) {
    return { position: start, collided: false, impactSpeed: 0 };
  }

  const stepSize = Math.max(1, Math.min(4, Math.abs(axis === "x" ? nextX - player.x : nextY - player.y) / 6));
  let position = start;
  let candidate = start;
  let collided = false;

  while ((direction > 0 && candidate < (axis === "x" ? nextX : nextY)) || (direction < 0 && candidate > (axis === "x" ? nextX : nextY))) {
    candidate += direction * stepSize;
    if ((direction > 0 && candidate > (axis === "x" ? nextX : nextY)) || (direction < 0 && candidate < (axis === "x" ? nextX : nextY))) {
      candidate = axis === "x" ? nextX : nextY;
    }

    const testX = axis === "x" ? candidate : nextX;
    const testY = axis === "y" ? candidate : nextY;
    if (circleIntersectsAnyRockMask(testX, testY, PLAYER_COLLISION_RADIUS)) {
      collided = true;
      break;
    }
    position = candidate;
  }

  return {
    position,
    collided,
    impactSpeed: collided ? Math.hypot(player.vx, player.vy) : 0
  };
}

function sampleAnomalyInfluence(x, y) {
  let pullX = 0;
  let pullY = 0;
  let inputScale = 1;
  let maxSpeedScale = 1;
  let dragBoost = 0;
  let warningLevel = 0;
  let damagePerSecond = 0;
  let inCore = false;

  for (const anomaly of ANOMALY_FIELDS) {
    const centerX = anomaly.cx * TILE_SIZE;
    const centerY = anomaly.cy * TILE_SIZE;
    const radiusPx = anomaly.radius * TILE_SIZE;
    const corePx = anomaly.coreRadius * TILE_SIZE;
    const dx = centerX - x;
    const dy = centerY - y;
    const distance = Math.hypot(dx, dy);

    if (distance <= corePx) {
      inCore = true;
      warningLevel = 1;
      continue;
    }
    if (distance >= radiusPx || distance === 0) {
      continue;
    }

    const normalized = 1 - (distance / radiusPx);
    const strength = normalized * normalized;
    pullX += (dx / distance) * anomaly.pull * strength;
    pullY += (dy / distance) * anomaly.pull * strength;
    inputScale = Math.min(inputScale, 1 - anomaly.controlLoss * normalized);
    maxSpeedScale = Math.min(maxSpeedScale, 1 - anomaly.controlLoss * 0.48 * normalized);
    dragBoost = Math.max(dragBoost, anomaly.dragBoost * normalized);
    warningLevel = Math.max(warningLevel, normalized);
    if (normalized > 0.68) {
      damagePerSecond = Math.max(damagePerSecond, 22);
    } else if (normalized > 0.4) {
      damagePerSecond = Math.max(damagePerSecond, 9);
    } else if (normalized > 0.18) {
      damagePerSecond = Math.max(damagePerSecond, 3);
    }
  }

  const tier = inCore
    ? "core"
    : damagePerSecond >= 20
      ? "lethal"
      : damagePerSecond >= 8
        ? "medium"
        : damagePerSecond > 0
          ? "mild"
          : "clear";

  return {
    pullX,
    pullY,
    inputScale: clamp(inputScale, 0.42, 1),
    maxSpeedScale: clamp(maxSpeedScale, 0.58, 1),
    dragBoost,
    warningLevel,
    damagePerSecond,
    tier,
    inCore
  };
}

function setExplorationStatus() {
  if (!overlayOpen && activeZone) {
    setStatus(describeExperimentStation(activeZone));
  } else if (!overlayOpen) {
    setStatus("Arrow keys fly the ship. Space deploys the arm. WASD steers the claw. Thread through pickups and bring them back cleanly.");
  }
}

function circleIntersectsAnyRockMask(x, y, radius) {
  for (const mask of state.rockMasks) {
    if (circleIntersectsRockMask(x, y, radius, mask)) {
      return true;
    }
  }
  return false;
}

function circleIntersectsRockMask(x, y, radius, mask) {
  const boundsLeft = x - radius;
  const boundsTop = y - radius;
  const boundsRight = x + radius;
  const boundsBottom = y + radius;

  if (boundsRight < mask.x || boundsLeft > mask.x + mask.w || boundsBottom < mask.y || boundsTop > mask.y + mask.h) {
    return false;
  }

  const startX = Math.max(0, Math.floor(boundsLeft - mask.x));
  const endX = Math.min(mask.w - 1, Math.ceil(boundsRight - mask.x));
  const startY = Math.max(0, Math.floor(boundsTop - mask.y));
  const endY = Math.min(mask.h - 1, Math.ceil(boundsBottom - mask.y));
  const radiusSq = radius * radius;

  for (let py = startY; py <= endY; py++) {
    for (let px = startX; px <= endX; px++) {
      const alpha = mask.alpha[((py * mask.w + px) * 4) + 3];
      if (alpha <= ROCK_MASK_ALPHA_THRESHOLD) {
        continue;
      }
      const dx = (mask.x + px + 0.5) - x;
      const dy = (mask.y + py + 0.5) - y;
      if ((dx * dx) + (dy * dy) <= radiusSq) {
        return true;
      }
    }
  }

  return false;
}

function buildRockVisualCatalog(colorKey) {
  const rowOffset = colorKey === "brown" ? 24 : 0;
  return Object.fromEntries(
    Object.entries(ROCK_RECT_DEFS).map(([id, rectDef]) => {
      const wTiles = rectDef.c1 - rectDef.c0 + 1;
      const hTiles = rectDef.r1 - rectDef.r0 + 1;
      const visualId = `boss_rock_${colorKey}_${id}`;
      return [
        visualId,
        {
          ref: { row: rectDef.r1 + rowOffset, col: rectDef.c0 },
          wTiles,
          hTiles
        }
      ];
    })
  );
}

function angleToDirection(angle) {
  const normalized = normalizeAngle(angle);
  const quarter = Math.PI / 4;
  if (normalized >= -quarter && normalized < quarter) return "North";
  if (normalized >= quarter && normalized < quarter * 3) return "East";
  if (normalized >= -quarter * 3 && normalized < -quarter) return "West";
  return "South";
}

function directionToAngle(direction) {
  switch (direction) {
    case "East":
      return Math.PI / 2;
    case "South":
      return Math.PI;
    case "West":
      return -Math.PI / 2;
    default:
      return 0;
  }
}

function buildStarfield() {
  const field = [];
  for (let i = 0; i < 80; i++) {
    field.push({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      size: Math.random() > 0.8 ? 2 : 1,
      alphaBase: 0.18 + Math.random() * 0.35
    });
  }
  return field;
}

function initializeZoneCaptureCards() {
  const fragment = document.createDocumentFragment();
  state.capturesUi = Object.create(null);

  for (const experiment of EXPERIMENTS) {
    const card = document.createElement("article");
    card.className = "zone-capture-card";

    const top = document.createElement("div");
    top.className = "zone-capture-card__top";

    const labelWrap = document.createElement("div");
    const label = document.createElement("div");
    label.className = "zone-capture-card__label";
    label.textContent = experiment.label;
    const title = document.createElement("strong");
    title.textContent = experiment.title;
    labelWrap.append(label, title);

    const badge = document.createElement("strong");
    badge.textContent = "0";
    top.append(labelWrap, badge);

    const stateCopy = document.createElement("p");
    stateCopy.className = "zone-capture-card__state";
    stateCopy.textContent = "Awaiting first capture.";

    const stats = document.createElement("div");
    stats.className = "zone-capture-card__stats";
    const captures = document.createElement("span");
    captures.innerHTML = "Captures <strong>0</strong>";
    const delta = document.createElement("span");
    delta.innerHTML = "Delta <strong>--</strong>";
    stats.append(captures, delta);

    card.append(top, stateCopy, stats);
    fragment.appendChild(card);

    state.capturesUi[experiment.id] = {
      card,
      badge,
      state: stateCopy,
      captures: captures.querySelector("strong"),
      delta: delta.querySelector("strong")
    };
  }

  zoneCaptureList.replaceChildren(fragment);
}

function setStatus(text) {
  if (statusPill.textContent !== text) {
    statusPill.textContent = text;
  }
}

function updateHullHud() {
  hullHud.textContent = `Hull ${Math.round(player.hull)}%`;
}

function updateFieldHud(influence) {
  const tier = influence?.tier || "clear";
  let text = "Field clear";
  if (tier === "mild") {
    text = "Field mild";
  } else if (tier === "medium") {
    text = "Field medium";
  } else if (tier === "lethal") {
    text = "Field severe";
  } else if (tier === "core") {
    text = "Field critical";
  }
  fieldHud.textContent = text;
}

function invalidateWorldLayer() {
  worldDirty = true;
  requestFrame();
}

function invalidateActorLayer() {
  actorDirty = true;
  requestFrame();
}

function requestFrame() {
  if (!frameHandle) {
    frameHandle = requestAnimationFrame(frame);
  }
}

function shouldContinueAnimating() {
  if (!assetsReady) {
    return true;
  }
  if (!player.alive) {
    return true;
  }
  if (player.thrusting) {
    return true;
  }
  return Math.abs(player.vx) > MOTION_EPSILON || Math.abs(player.vy) > MOTION_EPSILON;
}

function easeAngle(current, target, amount) {
  const delta = shortestAngleDelta(current, target);
  return current + delta * amount;
}

function shortestAngleDelta(a, b) {
  return normalizeAngle(b - a);
}

function normalizeAngle(angle) {
  let next = angle;
  while (next <= -Math.PI) next += Math.PI * 2;
  while (next > Math.PI) next -= Math.PI * 2;
  return next;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roundToTwo(value) {
  return Math.round(value * 100) / 100;
}

function formatMass(value) {
  return `${value.toFixed(2)} g`;
}

function formatSignedMass(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)} g`;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function loadNamedImages(sourceMap) {
  return Promise.all(
    Object.entries(sourceMap).map(([key, src]) =>
      loadImage(src).then((image) => [key, image])
    )
  ).then((entries) => Object.fromEntries(entries));
}

loadState.catch((error) => {
  console.error(error);
  statusPill.textContent = "Asset load failed. Check the console.";
});
