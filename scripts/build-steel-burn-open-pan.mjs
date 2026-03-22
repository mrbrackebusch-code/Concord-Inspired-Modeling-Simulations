import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { ensureCoreScaleAssets, ensureScaleAsset } from "./lib/scale-assets.mjs";
import { ensureSteelWoolAssets } from "./lib/steel-wool-assets.mjs";

const root = resolve(process.cwd());
const suiteRoot = join(root, "simulations", "unit-01", "lesson-01", "mass-change");
const assetsRoot = join(suiteRoot, "assets");
const statesRoot = join(suiteRoot, "states");
const interactivesRoot = join(suiteRoot, "interactives");
const sharedImagePath = "../../../simulations/unit-01/lesson-01/mass-change/assets/";
mkdirSync(assetsRoot, { recursive: true });
mkdirSync(statesRoot, { recursive: true });
mkdirSync(interactivesRoot, { recursive: true });
ensureCoreScaleAssets(assetsRoot, ["0.92 g", "0.94 g", "0.96 g"]);
ensureSteelWoolAssets(assetsRoot);

function writeText(path, text) {
  writeFileSync(path, `${text}\n`, "utf8");
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function flameSvg(width, height, opacity) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="130 545 120 110">
  <defs>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="170%">
      <feGaussianBlur stdDeviation="3.8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <radialGradient id="emberHalo" cx="50%" cy="68%" r="48%">
      <stop offset="0" stop-color="#ffd485" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#ff8d22" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="189" cy="622" rx="32" ry="16" fill="url(#emberHalo)">
    <animate attributeName="opacity" values="0.3;0.58;0.32;0.46;0.3" dur="1.2s" repeatCount="indefinite"/>
  </ellipse>
  <g opacity="${opacity}" filter="url(#softGlow)">
    <animateTransform attributeName="transform" type="translate" values="0 4;0 0;0 5;0 2;0 4" dur="1.05s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="${opacity};${Math.min(opacity + 0.12, 1)};${Math.max(opacity - 0.08, 0.2)};${opacity}" dur="0.92s" repeatCount="indefinite"/>
    <g transform="translate(-85.624 29.286)">
      <path d="m190.98 594.51c0 18.146 14.44 32.857 32.587 32.857 18.146 0 32.857-14.711 32.857-32.857 0-5.5322-1.3672-10.745-3.7822-15.319-1.7243-3.2659-4.8774-5.5731-6.4136-8.8878-2.3836-5.1433-4.09-10.566-4.09-16.507 0-10.949 5.355-20.646 13.663-27.094-31.48 1.2341-57.343 24.335-63.272 54.579-0.83901 4.2804-1.549 8.7038-1.549 13.23z" transform="translate(34.643 -19.643)" fill="#ff6a00" stroke="#972700" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="m266.05 535.53c-15.241 9.5834-27.188 27.619-23.406 46 4.5311 11.198 21.994 14.125 28.781 3.4688 5.3052-6.7645 1.7755-19.889-3.6741-26.152-3.7667-8.3001-2.4458-14.488-1.3571-23.504l-0.34375 0.1875z" fill="#ffcc00" stroke="#bb6d00" stroke-width="2.1" stroke-linejoin="round"/>
    </g>
  </g>
</svg>`;
}

function smokeSvg(width, height, strength) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 80 96">
  <g fill="#868b91" fill-opacity="0.18">
    <ellipse cx="28" cy="62" rx="16" ry="11">
      <animate attributeName="cy" values="62;40;24" dur="2.6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;${strength};0" dur="2.6s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="42" cy="54" rx="18" ry="12">
      <animate attributeName="cy" values="54;34;16" dur="2.2s" begin="0.35s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;${Math.min(strength + 0.08, 0.6)};0" dur="2.2s" begin="0.35s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="54" cy="66" rx="13" ry="9">
      <animate attributeName="cy" values="66;44;28" dur="2.8s" begin="0.65s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;${Math.max(strength - 0.04, 0.18)};0" dur="2.8s" begin="0.65s" repeatCount="indefinite"/>
    </ellipse>
  </g>
</svg>`;
}

writeText(join(assetsRoot, "burn-flame-small.svg"), flameSvg(64, 72, 0.74));
writeText(join(assetsRoot, "burn-flame-large.svg"), flameSvg(78, 90, 0.88));
writeText(join(assetsRoot, "burn-smoke-light.svg"), smokeSvg(72, 90, 0.24));
writeText(join(assetsRoot, "burn-smoke-heavy.svg"), smokeSvg(84, 102, 0.34));

const colors = {
  background: "#f6f1e6",
  panel: "rgba(255,255,255,0.9)",
  line: "rgba(31,42,48,0.22)",
  ink: "rgba(31,42,48,0.96)",
  note: "rgb(255,248,213)"
};

const baseViewOptions = {
  viewPortWidth: 6,
  viewPortHeight: 4,
  viewPortZoom: 1,
  viewPortX: 0,
  viewPortY: 0,
  viewPortDrag: false,
  backgroundColor: colors.background,
  showClock: false,
  markColor: "#f8b500",
  keShading: false,
  chargeShading: false,
  useThreeLetterCode: true,
  aminoAcidColorScheme: "hydrophobicity",
  showChargeSymbols: true,
  showVDWLines: false,
  VDWLinesCutoff: "medium",
  showVelocityVectors: false,
  showForceVectors: false,
  showElectricField: false,
  electricFieldDensity: 18,
  electricFieldColor: "auto",
  showAtomTrace: false,
  images: [],
  imageMapping: {},
  textBoxes: [],
  xlabel: false,
  ylabel: false,
  xunits: false,
  yunits: false,
  controlButtons: "",
  gridLines: false,
  atomNumbers: false,
  enableAtomTooltips: false,
  enableKeyboardHandlers: true,
  atomTraceColor: "#6913c5",
  velocityVectors: {
    color: "#000",
    width: 0.01,
    length: 2
  },
  forceVectors: {
    color: "#169C30",
    width: 0.01,
    length: 2
  },
  forceVectorsDirectionOnly: false
};

function rect(x, y, width, height, color, options = {}) {
  return {
    type: "rectangle",
    x,
    y,
    width,
    height,
    fence: 0,
    color,
    lineColor: options.lineColor ?? colors.line,
    lineWeight: options.lineWeight ?? 1,
    lineDashes: options.lineDashes ?? "none",
    layer: options.layer ?? 1
  };
}

function image(imageUri, imageX, imageY, options = {}) {
  return {
    imageUri,
    imageX,
    imageY,
    imageLayer: options.imageLayer ?? 1,
    imageLayerPosition: options.imageLayerPosition ?? 0
  };
}

function textBox(text, x, y, options = {}) {
  return {
    text,
    x,
    y,
    layer: options.layer ?? 3,
    anchor: options.anchor ?? "upper-left",
    color: options.color ?? colors.ink,
    textAlign: options.textAlign ?? "left",
    backgroundColor: options.backgroundColor ?? "rgba(255,255,255,0)",
    ...(options.frame ? { frame: options.frame } : {}),
    ...(options.width !== undefined ? { width: options.width } : {}),
    ...(options.fontScale !== undefined ? { fontScale: options.fontScale } : {})
  };
}

function serializeShapes(shapes) {
  return {
    type: shapes.map((item) => item.type),
    x: shapes.map((item) => item.x),
    y: shapes.map((item) => item.y),
    height: shapes.map((item) => item.height),
    width: shapes.map((item) => item.width),
    fence: shapes.map(() => 0),
    color: shapes.map((item) => item.color),
    lineColor: shapes.map((item) => item.lineColor),
    lineWeight: shapes.map((item) => item.lineWeight),
    lineDashes: shapes.map((item) => item.lineDashes),
    layer: shapes.map((item) => item.layer)
  };
}

function sceneModel(title, subtitle, readout, sceneBuilder) {
  const scaleImageAsset = ensureScaleAsset(assetsRoot, readout);
  const scene = sceneBuilder();
  return {
    type: "md2d",
    imagePath: sharedImagePath,
    width: 6,
    height: 4,
    unitsScheme: "md2d",
    lennardJonesForces: true,
    coulombForces: true,
    temperatureControl: false,
    gravitationalField: false,
    timeStep: 1,
    dielectricConstant: 1,
    realisticDielectricEffect: true,
    solventForceFactor: 1.25,
    solventForceType: 0,
    additionalSolventForceMult: 4,
    additionalSolventForceThreshold: 10,
    polarAAEpsilon: -2,
    viscosity: 1,
    timeStepsPerTick: 50,
    DNAState: "dna",
    DNA: "",
    DNAMutations: true,
    viewOptions: {
      ...baseViewOptions,
      images: [
        image(scaleImageAsset, 2.34, 1.08, { imageLayerPosition: 8 }),
        ...scene.images
      ],
      textBoxes: [
        textBox(title, 0.22, 3.82, {
          frame: "rounded rectangle",
          backgroundColor: colors.note,
          fontScale: 1.02
        }),
        textBox(subtitle, 0.22, 3.46, {
          width: 5.3,
          frame: "rounded rectangle",
          backgroundColor: "rgba(255,255,255,0.92)",
          fontScale: 0.82
        }),
        ...scene.texts
      ]
    },
    pairwiseLJProperties: [],
    elements: {
      mass: [20],
      sigma: [0.1],
      epsilon: [-0.01],
      color: [-1]
    },
    atoms: {
      x: [],
      y: [],
      vx: [],
      vy: [],
      charge: [],
      friction: [],
      element: [],
      pinned: []
    },
    shapes: serializeShapes([
      rect(0.78, 0.84, 4.44, 2.24, colors.panel, {
        lineColor: colors.line,
        lineWeight: 2,
        layer: 1
      }),
      ...scene.shapes
    ])
  };
}

function interactiveModel(id, url, onLoad = []) {
  return {
    type: "md2d",
    id,
    url,
    viewOptions: {
      controlButtons: "",
      enableAtomTooltips: false,
      gridLines: false,
      xunits: false,
      yunits: false,
      showClock: false
    },
    ...(onLoad.length ? { onLoad } : {})
  };
}

const burnsBefore = sceneModel(
  "Steel wool burns",
  "Place the sample on the scale, start the burn, and watch the measured mass rise as burning unfolds in the open setup.",
  "0.92 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Before", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("steel-wool-compact.svg", 2.53, 1.58, { imageLayerPosition: 6 })
    ]
  })
);

const burnsLive1 = sceneModel(
  "Steel wool burns",
  "Ignition begins, glow spreads through the steel wool, and the measured mass starts climbing.",
  "0.94 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Ignition", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("steel-wool-compact.svg", 2.53, 1.58, { imageLayerPosition: 4 }),
      image("steel-wool-ember-overlay.svg", 2.53, 1.58, { imageLayerPosition: 6 }),
      image("burn-flame-small.svg", 2.6, 1.72, { imageLayerPosition: 7 }),
      image("burn-smoke-light.svg", 2.58, 1.26, { imageLayerPosition: 9 })
    ]
  })
);

const burnsLive2 = sceneModel(
  "Steel wool burns",
  "The burning intensifies, residue develops, and the measured mass continues rising in the open setup.",
  "0.96 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Burning", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("steel-wool-compact.svg", 2.53, 1.58, { imageLayerPosition: 4 }),
      image("steel-wool-ember-overlay.svg", 2.53, 1.58, { imageLayerPosition: 6 }),
      image("steel-wool-ash-overlay.svg", 2.53, 1.58, { imageLayerPosition: 7 }),
      image("burn-flame-large.svg", 2.48, 1.5, { imageLayerPosition: 8 }),
      image("burn-smoke-heavy.svg", 2.52, 1.08, { imageLayerPosition: 9 })
    ]
  })
);

const burnsAfter = sceneModel(
  "Steel wool burns",
  "After the burn, the visible residue is different and the measured mass is higher than at the start.",
  "0.96 g",
  () => ({
    shapes: [],
    texts: [
      textBox("After", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("steel-wool-compact.svg", 2.53, 1.58, { imageLayerPosition: 4 }),
      image("steel-wool-ash-overlay.svg", 2.53, 1.58, { imageLayerPosition: 7 })
    ]
  })
);

writeJson(join(statesRoot, "burns-before.json"), burnsBefore);
writeJson(join(statesRoot, "burns-open-live-1.json"), burnsLive1);
writeJson(join(statesRoot, "burns-open-live-2.json"), burnsLive2);
writeJson(join(statesRoot, "burns-open.json"), burnsAfter);

const burnsInteractive = {
  title: "Steel wool burns",
  publicationStatus: "draft",
  subtitle: "Start the burn and watch the visible change and measured mass unfold over time.",
  about: "Active proof-of-concept for the open-pan steel wool burn. This route replaces the earlier open/closed comparison draft.",
  models: [
    interactiveModel("burns-before-live", "../../../simulations/unit-01/lesson-01/mass-change/states/burns-before.json", [
      "stop();",
      "setComponentDisabled('burns-start-button', false);",
      "setComponentDisabled('burns-reset-button', true);"
    ]),
    interactiveModel("burns-open-live-1", "../../../simulations/unit-01/lesson-01/mass-change/states/burns-open-live-1.json", [
      "setComponentDisabled('burns-start-button', true);",
      "setComponentDisabled('burns-reset-button', true);",
      "start();",
      "callAt(140, function () { loadModel('burns-open-live-2'); });"
    ]),
    interactiveModel("burns-open-live-2", "../../../simulations/unit-01/lesson-01/mass-change/states/burns-open-live-2.json", [
      "setComponentDisabled('burns-start-button', true);",
      "setComponentDisabled('burns-reset-button', true);",
      "start();",
      "callAt(140, function () { loadModel('burns-open-after'); });"
    ]),
    interactiveModel("burns-open-after", "../../../simulations/unit-01/lesson-01/mass-change/states/burns-open.json", [
      "stop();",
      "setComponentDisabled('burns-start-button', true);",
      "setComponentDisabled('burns-reset-button', false);"
    ])
  ],
  components: [
    {
      type: "text",
      id: "burns-note",
      text: "Start the burn and watch the open-pan steel wool change while the measured mass rises."
    },
    {
      type: "button",
      id: "burns-start-button",
      text: "Start burning",
      action: "loadModel('burns-open-live-1');"
    },
    {
      type: "button",
      id: "burns-reset-button",
      text: "Reset",
      action: "loadModel('burns-before-live');",
      disabled: true
    }
  ],
  layout: {
    left: [["burns-note"], ["burns-start-button"], ["burns-reset-button"]]
  },
  template: [
    {
      id: "left",
      top: "3em",
      right: "model.left",
      "padding-right": "0.75em",
      align: "right",
      width: "14em"
    }
  ]
};

writeJson(join(interactivesRoot, "steel-wool-burns.json"), burnsInteractive);
