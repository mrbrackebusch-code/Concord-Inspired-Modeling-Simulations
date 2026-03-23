const TILE_SIZE = 32;
const GRID_COLS = 28;
const GRID_ROWS = 18;
const CANVAS_WIDTH = GRID_COLS * TILE_SIZE;
const CANVAS_HEIGHT = GRID_ROWS * TILE_SIZE;

const EXPERIMENTS = [
  {
    id: "unit-01/lesson-01/mass-change/ice-to-water",
    title: "Ice to water",
    label: "ICE",
    zone: { x: 2, y: 2, w: 3, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/precipitate",
    title: "Precipitate",
    label: "PRECIP",
    zone: { x: 11, y: 1, w: 4, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/steel-wool-pulled-apart",
    title: "Steel wool pulled apart",
    label: "STEEL PULL",
    zone: { x: 21, y: 2, w: 4, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/sugar-dissolves",
    title: "Sugar dissolves",
    label: "SUGAR",
    zone: { x: 2, y: 13, w: 4, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/steel-wool-burns",
    title: "Steel wool burns",
    label: "STEEL BURN",
    zone: { x: 11, y: 14, w: 4, h: 2 }
  },
  {
    id: "unit-01/lesson-01/mass-change/alka-seltzer",
    title: "Alka-Seltzer",
    label: "ALKA",
    zone: { x: 21, y: 13, w: 4, h: 2 }
  }
];

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

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("game-canvas"));
const ctx = canvas.getContext("2d");
const statusPill = document.getElementById("status-pill");
const overlay = document.getElementById("experiment-overlay");
const overlayTitle = document.getElementById("experiment-title");
const overlayFrame = document.getElementById("experiment-frame");
const closeOverlayButton = document.getElementById("close-overlay");

const keys = new Set();
const platformGrid = createPlatformGrid();
const spawnPoint = { x: 14 * TILE_SIZE + TILE_SIZE / 2, y: 9 * TILE_SIZE + TILE_SIZE / 2 };

let assetsReady = false;
let overlayOpen = false;
let rearmZoneId = null;
let activeZone = null;
let animationTime = 0;
let deathTimerMs = 0;
let stars = [];

const player = {
  x: spawnPoint.x,
  y: spawnPoint.y,
  vx: 0,
  vy: 0,
  angle: 0,
  alive: true,
  lastSafeX: spawnPoint.x,
  lastSafeY: spawnPoint.y
};

const state = {
  images: {
    platformSheet: null,
    pilotSheet: null,
    ship: null
  },
  animationMap: null,
  platformCenterFrame: null
};

const loadState = Promise.all([
  loadImage("../../../assets/game-poc/tiles/shopPlatform.png"),
  loadImage("../../../assets/game-poc/heroes/DefaultHero.png"),
  loadImage("../../../assets/spaceship/spaceship.png"),
  fetch("../../../assets/game-poc/heroes/anim_map.json").then((res) => {
    if (!res.ok) {
      throw new Error(`Animation map request failed with status ${res.status}.`);
    }
    return res.json();
  })
]).then(([platformSheet, pilotSheet, ship, animationMap]) => {
  state.images.platformSheet = platformSheet;
  state.images.pilotSheet = pilotSheet;
  state.images.ship = ship;
  state.animationMap = animationMap;
  state.platformCenterFrame = { row: 2, col: 5 };
  stars = buildStarfield();
  assetsReady = true;
  statusPill.textContent = "Cross an outlined zone to open its experiment view.";
});

document.addEventListener("keydown", (event) => {
  keys.add(event.key.toLowerCase());
  if (overlayOpen && event.key === "Escape") {
    closeOverlay();
  }
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

closeOverlayButton.addEventListener("click", closeOverlay);

overlay?.addEventListener("click", (event) => {
  if (event.target === overlay || event.target === overlay.querySelector(".experiment-overlay__backdrop")) {
    closeOverlay();
  }
});

let previousTime = performance.now();
requestAnimationFrame(frame);

function frame(now) {
  const dtMs = Math.min(40, now - previousTime);
  previousTime = now;

  if (assetsReady) {
    if (!overlayOpen) {
      update(dtMs);
    }
    render(dtMs);
  } else {
    renderLoading();
  }

  requestAnimationFrame(frame);
}

function update(dtMs) {
  animationTime += dtMs;

  if (!player.alive) {
    deathTimerMs -= dtMs;
    if (deathTimerMs <= 0) {
      respawn();
    }
    return;
  }

  const input = getInputVector();
  const brakeHeld = keys.has(" ");
  const dt = dtMs / 1000;
  const accel = brakeHeld ? 400 : 780;
  const maxSpeed = brakeHeld ? 120 : 235;
  const drag = brakeHeld ? 0.82 : 0.93;

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
  if (speed > maxSpeed) {
    const scale = maxSpeed / speed;
    player.vx *= scale;
    player.vy *= scale;
  }

  if (speed > 20 && input.mag === 0) {
    const driftAngle = Math.atan2(player.vy, player.vx) + Math.PI / 2;
    player.angle = easeAngle(player.angle, driftAngle, 0.1);
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

  activeZone = getZoneAtPoint(player.x, player.y);
  if (!activeZone) {
    rearmZoneId = null;
    statusPill.textContent = "Cross an outlined zone to open its experiment view.";
    return;
  }

  if (rearmZoneId === activeZone.id) {
    statusPill.textContent = `${activeZone.title} is armed again once you leave and re-enter the box.`;
    return;
  }

  statusPill.textContent = `Opening ${activeZone.title}...`;
  openExperiment(activeZone);
  rearmZoneId = activeZone.id;
}

function render(dtMs) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBackground(nowCycle(animationTime));
  drawPlatforms();
  drawExperimentZones();
  drawPlayer(dtMs);

  if (!player.alive) {
    drawDeathOverlay();
  }
}

function renderLoading() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#07111b";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#e7f4ff";
  ctx.font = "24px Georgia";
  ctx.fillText("Loading ship proof of concept...", 28, 60);
}

function drawBackground(cycle) {
  const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, "#0d1830");
  gradient.addColorStop(1, "#07101a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.save();
  for (const star of stars) {
    const alpha = star.alphaBase + Math.sin(cycle * 0.0018 + star.phase) * 0.18;
    ctx.fillStyle = `rgba(225, 241, 255, ${alpha.toFixed(3)})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  }
  ctx.restore();

  const fieldGlow = ctx.createRadialGradient(
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
  ctx.fillStyle = fieldGlow;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawPlatforms() {
  const sheet = state.images.platformSheet;
  const frame = state.platformCenterFrame;
  const frameSize = sheet.width / 9;
  const sx = frame.col * frameSize;
  const sy = frame.row * frameSize;

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      if (!platformGrid[row][col]) continue;
      const px = col * TILE_SIZE;
      const py = row * TILE_SIZE;

      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.22)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;
      ctx.drawImage(sheet, sx, sy, frameSize, frameSize, px, py, TILE_SIZE, TILE_SIZE);
      ctx.restore();

      const north = row > 0 && platformGrid[row - 1][col];
      const south = row < GRID_ROWS - 1 && platformGrid[row + 1][col];
      const west = col > 0 && platformGrid[row][col - 1];
      const east = col < GRID_COLS - 1 && platformGrid[row][col + 1];

      ctx.strokeStyle = "rgba(190, 206, 220, 0.1)";
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 0.5, py + 0.5, TILE_SIZE - 1, TILE_SIZE - 1);

      ctx.strokeStyle = "rgba(18, 23, 31, 0.5)";
      ctx.lineWidth = 2;
      if (!north) drawLine(px, py, px + TILE_SIZE, py);
      if (!south) drawLine(px, py + TILE_SIZE, px + TILE_SIZE, py + TILE_SIZE);
      if (!west) drawLine(px, py, px, py + TILE_SIZE);
      if (!east) drawLine(px + TILE_SIZE, py, px + TILE_SIZE, py + TILE_SIZE);
    }
  }
}

function drawExperimentZones() {
  ctx.save();
  ctx.lineWidth = 2;
  ctx.font = "bold 12px Georgia";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const experiment of EXPERIMENTS) {
    const { x, y, w, h } = experiment.zone;
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;
    const pulse = 0.45 + Math.sin(animationTime * 0.004 + x + y) * 0.08;
    const active = activeZone && activeZone.id === experiment.id;

    ctx.strokeStyle = active ? `rgba(255, 248, 185, ${pulse + 0.2})` : `rgba(109, 227, 255, ${pulse})`;
    ctx.strokeRect(px + 2, py + 2, w * TILE_SIZE - 4, h * TILE_SIZE - 4);

    ctx.fillStyle = active ? "rgba(255, 248, 185, 0.15)" : "rgba(109, 227, 255, 0.1)";
    ctx.fillRect(px + 4, py + 4, w * TILE_SIZE - 8, h * TILE_SIZE - 8);

    ctx.fillStyle = active ? "#fff8b9" : "#d5f7ff";
    ctx.fillText(experiment.label, px + (w * TILE_SIZE) / 2, py + (h * TILE_SIZE) / 2);
  }

  ctx.restore();
}

function drawPlayer() {
  const shipImage = state.images.ship;
  const shipScale = 0.17;
  const shipWidth = shipImage.width * shipScale;
  const shipHeight = shipImage.height * shipScale;
  const speed = Math.hypot(player.vx, player.vy);

  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle);

  ctx.fillStyle = "rgba(10, 15, 22, 0.35)";
  ctx.beginPath();
  ctx.ellipse(0, shipHeight * 0.34, shipWidth * 0.24, shipHeight * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  const thrusterAlpha = clamp((speed - 20) / 120, 0, 0.7);
  if (thrusterAlpha > 0) {
    const thruster = ctx.createLinearGradient(0, shipHeight * 0.15, 0, shipHeight * 0.52);
    thruster.addColorStop(0, `rgba(255, 252, 210, ${thrusterAlpha})`);
    thruster.addColorStop(0.35, `rgba(255, 179, 61, ${thrusterAlpha * 0.95})`);
    thruster.addColorStop(1, "rgba(255, 120, 10, 0)");
    ctx.fillStyle = thruster;
    ctx.beginPath();
    ctx.moveTo(-shipWidth * 0.08, shipHeight * 0.14);
    ctx.lineTo(shipWidth * 0.08, shipHeight * 0.14);
    ctx.lineTo(0, shipHeight * 0.54 + Math.sin(animationTime * 0.03) * 4);
    ctx.closePath();
    ctx.fill();
  }

  ctx.drawImage(shipImage, -shipWidth / 2, -shipHeight / 2, shipWidth, shipHeight);
  drawPilotInCockpit(shipWidth, shipHeight);
  drawCanopyGlass(shipWidth, shipHeight);

  ctx.restore();
}

function drawPilotInCockpit(shipWidth, shipHeight) {
  const pilot = state.images.pilotSheet;
  const animationMap = state.animationMap;
  const key = "thrustNorth";
  const animationDef = animationMap.animations[key];
  const frames = animationDef.cols;
  const frameIndex = frames[Math.floor(animationTime / 90) % frames.length];
  const frameSize = animationMap.frameSize[0];
  const sx = frameIndex * frameSize;
  const sy = animationDef.row * frameSize;
  const drawSize = 34;
  const cockpitY = -shipHeight * 0.22;

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, cockpitY, shipWidth * 0.18, shipHeight * 0.19, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(pilot, sx, sy, frameSize, frameSize, -drawSize / 2, cockpitY - 24, drawSize, drawSize);
  ctx.restore();
}

function drawCanopyGlass(shipWidth, shipHeight) {
  const canopyY = -shipHeight * 0.21;
  const canopyRadiusX = shipWidth * 0.2;
  const canopyRadiusY = shipHeight * 0.21;

  const canopyGradient = ctx.createLinearGradient(0, canopyY - canopyRadiusY, 0, canopyY + canopyRadiusY);
  canopyGradient.addColorStop(0, "rgba(231, 249, 255, 0.34)");
  canopyGradient.addColorStop(0.35, "rgba(120, 222, 255, 0.18)");
  canopyGradient.addColorStop(1, "rgba(7, 108, 150, 0.26)");

  ctx.fillStyle = canopyGradient;
  ctx.beginPath();
  ctx.ellipse(0, canopyY, canopyRadiusX, canopyRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(225, 247, 255, 0.58)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.ellipse(0, canopyY, canopyRadiusX, canopyRadiusY, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(8, 70, 96, 0.42)";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.ellipse(0, -shipHeight * 0.03, shipWidth * 0.24, shipHeight * 0.05, 0, Math.PI, Math.PI * 2);
  ctx.stroke();
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
  overlay.hidden = false;
  overlayTitle.textContent = experiment.title;
  const url = `../experiment-window/index.html?experiment=${encodeURIComponent(experiment.id)}&mode=embed&parentOrigin=${encodeURIComponent(window.location.origin)}`;
  overlayFrame.src = url;
}

function closeExperimentFrame() {
  overlayFrame.src = "about:blank";
}

function closeOverlay() {
  overlayOpen = false;
  overlay.hidden = true;
  closeExperimentFrame();
  statusPill.textContent = "Leave the box and re-enter it to reopen that experiment.";
}

function killPlayer() {
  player.alive = false;
  deathTimerMs = 850;
  player.vx = 0;
  player.vy = 0;
  statusPill.textContent = "Void contact. Resetting ship...";
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
  activeZone = null;
  rearmZoneId = null;
  statusPill.textContent = "Ship reset. Cross an outlined zone to open its experiment view.";
}

function getInputVector() {
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

function getZoneAtPoint(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);
  return EXPERIMENTS.find((experiment) => {
    const zone = experiment.zone;
    return tileX >= zone.x && tileX < zone.x + zone.w && tileY >= zone.y && tileY < zone.y + zone.h;
  }) || null;
}

function isSafePoint(x, y) {
  const tileX = Math.floor(x / TILE_SIZE);
  const tileY = Math.floor(y / TILE_SIZE);
  if (tileX < 0 || tileX >= GRID_COLS || tileY < 0 || tileY >= GRID_ROWS) {
    return false;
  }
  return platformGrid[tileY][tileX];
}

function buildStarfield() {
  const field = [];
  for (let i = 0; i < 80; i++) {
    field.push({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      size: Math.random() > 0.8 ? 2 : 1,
      alphaBase: 0.18 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2
    });
  }
  return field;
}

function nowCycle(ms) {
  return ms || performance.now();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
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
