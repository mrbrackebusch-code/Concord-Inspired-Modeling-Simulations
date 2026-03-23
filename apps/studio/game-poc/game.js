const TILE_SIZE = 32;
const GRID_COLS = 28;
const GRID_ROWS = 18;
const CANVAS_WIDTH = GRID_COLS * TILE_SIZE;
const CANVAS_HEIGHT = GRID_ROWS * TILE_SIZE;
const MOTION_EPSILON = 1.5;
const SHIP_SCALE = 0.17;
const SHIP_FRAME_MS = 120;
const SHIP_DIRECTIONS = ["North", "East", "South", "West"];
const TERRAIN_THEME = {
  ground: "groundBlack",
  chasm: "chasmBlack"
};

const TERRAIN_FAMILIES = {
  groundBlack: {
    interior: [
      { row: 17, col: 12 },
      { row: 17, col: 13 },
      { row: 17, col: 14 }
    ],
    edgeN: { row: 14, col: 13 },
    edgeS: { row: 16, col: 13 },
    edgeW: { row: 15, col: 12 },
    edgeE: { row: 15, col: 14 },
    cornerNW: { row: 14, col: 12 },
    cornerNE: { row: 14, col: 14 },
    cornerSE: { row: 16, col: 14 },
    cornerSW: { row: 16, col: 12 },
    innerNW: { row: 12, col: 13 },
    innerNE: { row: 12, col: 14 },
    innerSE: { row: 13, col: 14 },
    innerSW: { row: 13, col: 13 },
    decor: [
      { row: 12, col: 12 },
      { row: 13, col: 12 }
    ]
  },
  chasmBlack: {
    interior: [
      { row: 5, col: 15 },
      { row: 5, col: 16 },
      { row: 5, col: 17 }
    ],
    edgeN: { row: 2, col: 16 },
    edgeS: { row: 4, col: 16 },
    edgeW: { row: 3, col: 15 },
    edgeE: { row: 3, col: 17 },
    cornerNW: { row: 2, col: 15 },
    cornerNE: { row: 2, col: 17 },
    cornerSE: { row: 4, col: 17 },
    cornerSW: { row: 4, col: 15 },
    innerNW: { row: 0, col: 16 },
    innerNE: { row: 0, col: 17 },
    innerSE: { row: 1, col: 17 },
    innerSW: { row: 1, col: 16 },
    decor: []
  }
};

const EXPERIMENTS = [
  {
    id: "unit-01/lesson-01/mass-change/ice-to-water",
    title: "Ice to water",
    label: "ICE",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/ice-to-water.json",
    zone: { x: 2, y: 2, w: 3, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/precipitate",
    title: "Precipitate",
    label: "PRECIP",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/precipitate.json",
    zone: { x: 11, y: 1, w: 4, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/steel-wool-pulled-apart",
    title: "Steel wool pulled apart",
    label: "STEEL PULL",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/steel-wool-pulled-apart.json",
    zone: { x: 21, y: 2, w: 4, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/sugar-dissolves",
    title: "Sugar dissolves",
    label: "SUGAR",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/sugar-dissolves.json",
    zone: { x: 2, y: 13, w: 4, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/steel-wool-burns",
    title: "Steel wool burns",
    label: "STEEL BURN",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/steel-wool-burns.json",
    zone: { x: 11, y: 14, w: 4, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/alka-seltzer",
    title: "Alka-Seltzer",
    label: "ALKA",
    interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/alka-seltzer.json",
    zone: { x: 21, y: 13, w: 4, h: 2 }
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

const PLATFORM_RECTS = [
  { x: 1, y: 1, w: 5, h: 4 },
  { x: 10, y: 1, w: 6, h: 4 },
  { x: 20, y: 1, w: 6, h: 4 },
  { x: 1, y: 12, w: 6, h: 4 },
  { x: 10, y: 12, w: 6, h: 4 },
  { x: 20, y: 12, w: 6, h: 4 },
  { x: 11, y: 6, w: 6, h: 6 },
  { x: 7, y: 7, w: 4, h: 2 },
  { x: 17, y: 7, w: 4, h: 2 },
  { x: 13, y: 4, w: 2, h: 2 },
  { x: 13, y: 11, w: 2, h: 1 }
];

const worldCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("world-canvas"));
const worldCtx = worldCanvas.getContext("2d");
const actorCanvas = /** @type {HTMLCanvasElement} */ (document.getElementById("actor-canvas"));
const ctx = actorCanvas.getContext("2d");
const statusPill = document.getElementById("status-pill");
const experimentWindow = document.getElementById("experiment-window");
const overlayTitle = document.getElementById("experiment-title");
const overlayFrame = document.getElementById("experiment-frame");
const closeOverlayButton = document.getElementById("close-overlay");
const captureButton = document.getElementById("capture-evidence");
const captureActiveTitle = document.getElementById("capture-active-title");
const captureActiveCopy = document.getElementById("capture-active-copy");
const captureBefore = document.getElementById("capture-before");
const captureAfter = document.getElementById("capture-after");
const captureDelta = document.getElementById("capture-delta");
const captureCount = document.getElementById("capture-count");
const zoneCaptureList = document.getElementById("zone-capture-list");
const startupExperimentId = new URLSearchParams(window.location.search).get("experiment");

const keys = new Set();
const platformGrid = createPlatformGrid();
const chasmGrid = invertGrid(platformGrid);
const spawnPoint = { x: 14 * TILE_SIZE + TILE_SIZE / 2, y: 9 * TILE_SIZE + TILE_SIZE / 2 };

let assetsReady = false;
let overlayOpen = false;
let experimentFrameReady = false;
let rearmZoneId = null;
let activeZone = null;
let visualTimeMs = 0;
let deathTimerMs = 0;
let hudFocusExperimentId = null;
let frameHandle = 0;
let previousTime = 0;
let worldDirty = true;
let actorDirty = true;

const player = {
  x: spawnPoint.x,
  y: spawnPoint.y,
  vx: 0,
  vy: 0,
  angle: 0,
  thrusting: false,
  alive: true,
  lastSafeX: spawnPoint.x,
  lastSafeY: spawnPoint.y
};

const state = {
  images: {
    terrainSheet: null,
    pilotSheet: null,
    ship: null
  },
  animationMap: null,
  backgroundLayer: null,
  chasmLayer: null,
  groundLayer: null,
  worldLayer: null,
  shipFrameCache: null,
  captures: createCaptureState()
};

initializeZoneCaptureCards();

const loadState = Promise.all([
  loadImage("../../../assets/game-poc/tiles/terrain.png"),
  loadImage("../../../assets/game-poc/heroes/DefaultHero.png"),
  loadImage("../../../assets/spaceship/spaceship.png"),
  fetch("../../../assets/game-poc/heroes/anim_map.json").then((res) => {
    if (!res.ok) {
      throw new Error(`Animation map request failed with status ${res.status}.`);
    }
    return res.json();
  })
]).then(([terrainSheet, pilotSheet, ship, animationMap]) => {
  state.images.terrainSheet = terrainSheet;
  state.images.pilotSheet = pilotSheet;
  state.images.ship = ship;
  state.animationMap = animationMap;
  state.backgroundLayer = buildBackgroundLayer();
  state.chasmLayer = buildTerrainLayer(chasmGrid, TERRAIN_THEME.chasm);
  state.groundLayer = buildTerrainLayer(platformGrid, TERRAIN_THEME.ground, {
    shadowColor: "rgba(0, 0, 0, 0.26)",
    shadowBlur: 9,
    shadowOffsetY: 3
  });
  state.worldLayer = buildWorldLayer();
  state.shipFrameCache = buildShipFrameCache();
  assetsReady = true;
  setStatus("Cross an outlined zone to open its experiment view.");
  renderCaptureHud();
  invalidateWorldLayer();
  invalidateActorLayer();

  if (startupExperimentId) {
    const initialExperiment = findExperimentByIdentifier(startupExperimentId);
    if (initialExperiment) {
      openExperiment(initialExperiment);
      rearmZoneId = initialExperiment.id;
      activeZone = initialExperiment;
      hudFocusExperimentId = initialExperiment.id;
      renderCaptureHud();
    }
  }
});

document.addEventListener("keydown", (event) => {
  keys.add(event.key.toLowerCase());
  if (overlayOpen && event.key === "Escape") {
    closeOverlay();
  }
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
    event.preventDefault();
  }
  requestFrame();
});

document.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
  requestFrame();
});

closeOverlayButton.addEventListener("click", closeOverlay);
captureButton.addEventListener("click", captureEvidence);
overlayFrame.addEventListener("load", () => {
  if (overlayOpen) {
    experimentFrameReady = true;
    setStatus(`${overlayTitle.textContent} ready in the experiment window.`);
    renderCaptureHud();
  }
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
  let changed = false;

  if (!player.alive) {
    deathTimerMs -= dtMs;
    if (deathTimerMs <= 0) {
      respawn();
    }
    invalidateActorLayer();
    return;
  }

  const input = getInputVector();
  const brakeHeld = keys.has(" ");
  const dt = dtMs / 1000;
  const accel = brakeHeld ? 520 : 1100;
  const maxSpeed = brakeHeld ? 160 : 320;
  const drag = brakeHeld ? 0.82 : 0.93;
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

  if (brakeHeld) {
    player.vx *= 0.95;
    player.vy *= 0.95;
  }

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

  player.x += player.vx * dt;
  player.y += player.vy * dt;
  player.x = clamp(player.x, 0, CANVAS_WIDTH);
  player.y = clamp(player.y, 0, CANVAS_HEIGHT);

  if (isSafePoint(player.x, player.y)) {
    player.lastSafeX = player.x;
    player.lastSafeY = player.y;
  } else {
    killPlayer();
    return;
  }

  const nextZone = getZoneAtPoint(player.x, player.y);
  if ((nextZone?.id || null) !== (activeZone?.id || null)) {
    activeZone = nextZone;
    if (activeZone) {
      hudFocusExperimentId = activeZone.id;
    }
    renderCaptureHud();
  } else {
    activeZone = nextZone;
  }

  if (!activeZone) {
    rearmZoneId = null;
    setStatus("Cross an outlined zone to open its experiment view.");
  } else if (rearmZoneId === activeZone.id) {
    setStatus(`${activeZone.title} is armed again once you leave and re-enter the box.`);
  } else {
    setStatus(`Opening ${activeZone.title}...`);
    openExperiment(activeZone);
    rearmZoneId = activeZone.id;
  }

  changed =
    changed ||
    !wasAlive ||
    Math.abs(player.x - priorX) > 0.01 ||
    Math.abs(player.y - priorY) > 0.01 ||
    Math.abs(player.angle - priorAngle) > 0.001 ||
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
  drawActiveExperimentZone();
  drawPlayer();

  if (!player.alive) {
    drawDeathOverlay();
  }
}

function renderLoading() {
  worldCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#07111b";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#e7f4ff";
  ctx.font = "24px Georgia";
  ctx.fillText("Loading ship proof of concept...", 28, 60);
}

function buildBackgroundLayer() {
  const layer = document.createElement("canvas");
  layer.width = CANVAS_WIDTH;
  layer.height = CANVAS_HEIGHT;
  const layerCtx = layer.getContext("2d");
  const gradient = layerCtx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, "#0d1830");
  gradient.addColorStop(1, "#07101a");
  layerCtx.fillStyle = gradient;
  layerCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const stars = buildStarfield();
  for (const star of stars) {
    layerCtx.fillStyle = `rgba(225, 241, 255, ${star.alphaBase.toFixed(3)})`;
    layerCtx.fillRect(star.x, star.y, star.size, star.size);
  }

  const fieldGlow = layerCtx.createRadialGradient(
    CANVAS_WIDTH * 0.5,
    CANVAS_HEIGHT * 0.52,
    40,
    CANVAS_WIDTH * 0.5,
    CANVAS_HEIGHT * 0.52,
    CANVAS_WIDTH * 0.5
  );
  fieldGlow.addColorStop(0, "rgba(18, 184, 255, 0.12)");
  fieldGlow.addColorStop(0.55, "rgba(18, 184, 255, 0.05)");
  fieldGlow.addColorStop(1, "rgba(18, 184, 255, 0)");
  layerCtx.fillStyle = fieldGlow;
  layerCtx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  return layer;
}

function buildWorldLayer() {
  const layer = document.createElement("canvas");
  layer.width = CANVAS_WIDTH;
  layer.height = CANVAS_HEIGHT;
  const layerCtx = layer.getContext("2d");
  layerCtx.drawImage(state.chasmLayer, 0, 0);
  layerCtx.drawImage(state.groundLayer, 0, 0);
  drawExperimentZonesBase(layerCtx);
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

function drawExperimentZonesBase(layerCtx) {
  layerCtx.save();
  layerCtx.lineWidth = 2;
  layerCtx.font = "bold 12px Georgia";
  layerCtx.textAlign = "center";
  layerCtx.textBaseline = "middle";

  for (const experiment of EXPERIMENTS) {
    const { x, y, w, h } = experiment.zone;
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;
    layerCtx.strokeStyle = "rgba(109, 227, 255, 0.46)";
    layerCtx.strokeRect(px + 2, py + 2, w * TILE_SIZE - 4, h * TILE_SIZE - 4);

    layerCtx.fillStyle = "rgba(109, 227, 255, 0.1)";
    layerCtx.fillRect(px + 4, py + 4, w * TILE_SIZE - 8, h * TILE_SIZE - 8);

    layerCtx.fillStyle = "#d5f7ff";
    layerCtx.fillText(experiment.label, px + (w * TILE_SIZE) / 2, py + (h * TILE_SIZE) / 2);
  }

  layerCtx.restore();
}

function drawActiveExperimentZone() {
  if (!activeZone) {
    return;
  }

  const { x, y, w, h } = activeZone.zone;
  const px = x * TILE_SIZE;
  const py = y * TILE_SIZE;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 248, 185, 0.82)";
  ctx.strokeRect(px + 2, py + 2, w * TILE_SIZE - 4, h * TILE_SIZE - 4);
  ctx.fillStyle = "rgba(255, 248, 185, 0.12)";
  ctx.fillRect(px + 4, py + 4, w * TILE_SIZE - 8, h * TILE_SIZE - 8);
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
  ctx.fillText("Field integrity lost. Repositioning ship...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

function openExperiment(experiment) {
  overlayOpen = true;
  experimentFrameReady = false;
  hudFocusExperimentId = experiment.id;
  player.vx = 0;
  player.vy = 0;
  player.thrusting = false;
  experimentWindow.classList.add("is-active");
  overlayTitle.textContent = experiment.title;
  setStatus(`Loading ${experiment.title} into the experiment window...`);
  const url = `/vendor/lab/dist/embeddable.html#${experiment.interactiveUrl}`;
  if (overlayFrame.src !== new URL(url, window.location.origin).toString()) {
    overlayFrame.src = url;
  }
  renderCaptureHud();
  invalidateActorLayer();
}

function closeExperimentFrame() {
  experimentFrameReady = false;
  overlayFrame.src = "about:blank";
}

function closeOverlay() {
  overlayOpen = false;
  experimentWindow.classList.remove("is-active");
  closeExperimentFrame();
  overlayTitle.textContent = "Standby Window";
  setStatus("Leave the box and re-enter it to reopen that experiment.");
  renderCaptureHud();
  invalidateActorLayer();
}

function killPlayer() {
  player.alive = false;
  player.thrusting = false;
  deathTimerMs = 850;
  player.vx = 0;
  player.vy = 0;
  setStatus("Void contact. Resetting ship...");
  invalidateActorLayer();
}

function respawn() {
  player.alive = true;
  player.x = spawnPoint.x;
  player.y = spawnPoint.y;
  player.lastSafeX = spawnPoint.x;
  player.lastSafeY = spawnPoint.y;
  player.vx = 0;
  player.vy = 0;
  player.angle = 0;
  player.thrusting = false;
  activeZone = null;
  rearmZoneId = null;
  setStatus("Ship reset. Cross an outlined zone to open its experiment view.");
  renderCaptureHud();
  invalidateActorLayer();
}

function getInputVector() {
  if (overlayOpen) {
    return { x: 0, y: 0, mag: 0 };
  }
  const up = keys.has("w") || keys.has("arrowup");
  const down = keys.has("s") || keys.has("arrowdown");
  const left = keys.has("a") || keys.has("arrowleft");
  const right = keys.has("d") || keys.has("arrowright");
  let x = (right ? 1 : 0) - (left ? 1 : 0);
  let y = (down ? 1 : 0) - (up ? 1 : 0);
  const mag = Math.hypot(x, y);
  if (mag > 0) {
    x /= mag;
    y /= mag;
  }
  return { x, y, mag };
}

function createPlatformGrid() {
  const grid = Array.from({ length: GRID_ROWS }, () => Array.from({ length: GRID_COLS }, () => false));
  for (const rect of PLATFORM_RECTS) {
    for (let row = rect.y; row < rect.y + rect.h; row++) {
      for (let col = rect.x; col < rect.x + rect.w; col++) {
        grid[row][col] = true;
      }
    }
  }
  return grid;
}

function invertGrid(grid) {
  return grid.map((row) => row.map((cell) => !cell));
}

function getZoneAtPoint(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);
  return EXPERIMENTS.find((experiment) => {
    const zone = experiment.zone;
    return tileX >= zone.x && tileX < zone.x + zone.w && tileY >= zone.y && tileY < zone.y + zone.h;
  }) || null;
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

  setStatus(`${activeZone.title} evidence captured into the side log.`);
  renderCaptureHud();
}

function renderCaptureHud() {
  const focusExperiment = getHudFocusExperiment();
  const focusRecord = focusExperiment ? state.captures[focusExperiment.id] : null;
  const activeRecord = activeZone ? state.captures[activeZone.id] : null;
  const canCapture = Boolean(activeZone && overlayOpen && experimentFrameReady && player.alive);

  captureButton.disabled = !canCapture;
  captureButton.textContent = canCapture ? `Capture ${activeZone.label}` : "Capture Evidence";

  if (activeZone) {
    captureActiveTitle.textContent = activeZone.title;
    captureActiveCopy.textContent = experimentFrameReady
      ? "Temporary hook: run the live experiment, then record that result here."
      : "Experiment window is loading. Capture arms as soon as the live view is ready.";
  } else if (focusExperiment && focusRecord && focusRecord.count > 0) {
    captureActiveTitle.textContent = `${focusExperiment.title} log`;
    captureActiveCopy.textContent = "No live zone selected. The latest recorded evidence stays visible here until you arm another zone.";
  } else {
    captureActiveTitle.textContent = "No active zone";
    captureActiveCopy.textContent = "Cross a zone to arm capture, then use the temporary capture button after a run.";
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
    const isActive = activeZone && activeZone.id === experiment.id;
    const refs = state.capturesUi[experiment.id];
    let stateCopy = "Awaiting first capture.";
    if (isActive && canCapture) {
      stateCopy = "Window live. Capture ready.";
    } else if (isActive && overlayOpen && !experimentFrameReady) {
      stateCopy = "Window loading.";
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

function isSafePoint(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);
  if (tileX < 0 || tileX >= GRID_COLS || tileY < 0 || tileY >= GRID_ROWS) {
    return false;
  }
  return platformGrid[tileY][tileX];
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

loadState.catch((error) => {
  console.error(error);
  statusPill.textContent = "Asset load failed. Check the console.";
});
