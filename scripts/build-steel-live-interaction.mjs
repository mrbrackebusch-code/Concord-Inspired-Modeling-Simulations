import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { ensureCoreScaleAssets } from "./lib/scale-assets.mjs";
import { ensureSteelWoolAssets } from "./lib/steel-wool-assets.mjs";

const root = resolve(process.cwd());
const suiteRoot = join(root, "simulations", "unit-01", "lesson-01", "mass-change");
const assetsRoot = join(suiteRoot, "assets");
const statesRoot = join(suiteRoot, "states");
const interactivesRoot = join(suiteRoot, "interactives");
const sharedImagePath = "../../../simulations/unit-01/lesson-01/mass-change/assets/";

ensureCoreScaleAssets(assetsRoot);
ensureSteelWoolAssets(assetsRoot);

function writeText(path, text) {
  writeFileSync(path, `${text}\n`, "utf8");
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

const grabStarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42">
  <defs>
    <radialGradient id="glow" cx="50%" cy="48%" r="52%">
      <stop offset="0" stop-color="#fff3ac"/>
      <stop offset="1" stop-color="#e3a926"/>
    </radialGradient>
  </defs>
  <circle cx="21" cy="21" r="18.5" fill="#fff6cf" opacity="0.18"/>
  <path d="M21 3.8l4.5 9.2 10.2 1.5-7.4 7.2 1.8 10.1L21 26.8l-9.1 4.8 1.8-10.1-7.4-7.2 10.2-1.5L21 3.8Z" fill="url(#glow)" stroke="#936500" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="21" cy="21" r="4.6" fill="#fff8d8" stroke="#936500" stroke-width="1.1"/>
</svg>`;

const steelLiveModel = {
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
  viscosity: 0.8,
  timeStepsPerTick: 50,
  DNAState: "dna",
  DNA: "",
  DNAMutations: true,
  viewOptions: {
    viewPortWidth: 6,
    viewPortHeight: 4,
    viewPortZoom: 1,
    viewPortX: 0,
    viewPortY: 0,
    viewPortDrag: false,
    backgroundColor: "#f6f1e6",
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
    images: [
      {
        imageUri: "balance-scale-dynamic.svg",
        imageX: 2.34,
        imageY: 1.08,
        imageLayer: 1,
        imageLayerPosition: 8
      },
      {
        imageUri: "steel-wool-compact.svg",
        imageX: 2.46,
        imageY: 1.54,
        imageLayer: 1,
        imageLayerPosition: 5
      },
      {
        imageUri: "steel-wool-fragment.svg",
        imageHostType: "Atom",
        imageHostIndex: 0,
        imageLayer: 1,
        imageX: 3.0,
        imageY: 1.64
      },
      {
        imageUri: "grab-star.svg",
        imageHostType: "Atom",
        imageHostIndex: 0,
        imageLayer: 1,
        imageX: 3.58,
        imageY: 1.6
      }
    ],
    imageMapping: {
      "balance-scale-dynamic.svg": "balance-scale-4-82-g.svg"
    },
    textBoxes: [
      {
        text: "Steel wool pulled apart",
        x: 0.22,
        y: 3.82,
        layer: 3,
        anchor: "upper-left",
        color: "rgba(31,42,48,0.96)",
        textAlign: "left",
        backgroundColor: "rgb(255,248,213)",
        frame: "rounded rectangle",
        fontScale: 1.02
      },
      {
        text: "Drag the star to pull part of the sample away. Put it back on the tray before you record a run.",
        x: 0.22,
        y: 3.46,
        layer: 3,
        anchor: "upper-left",
        color: "rgba(31,42,48,0.96)",
        textAlign: "left",
        backgroundColor: "rgba(255,255,255,0.92)",
        frame: "rounded rectangle",
        width: 5.3,
        fontScale: 0.82
      },
      {
        text: "Pull + return",
        x: 0.94,
        y: 0.18,
        layer: 3,
        anchor: "upper-left",
        color: "rgba(31,42,48,0.96)",
        textAlign: "left",
        backgroundColor: "rgba(255,255,255,0.92)",
        frame: "rounded rectangle",
        fontScale: 0.78
      },
      {
        text: "Whole sample on tray",
        x: 3.78,
        y: 0.18,
        layer: 3,
        anchor: "upper-left",
        color: "rgba(31,42,48,0.96)",
        textAlign: "left",
        backgroundColor: "rgb(255,248,213)",
        frame: "rounded rectangle",
        width: 1.2,
        fontScale: 0.72
      },
      {
        text: "Recorded runs",
        x: 4.06,
        y: 1.18,
        layer: 3,
        anchor: "upper-left",
        color: "rgba(31,42,48,0.96)",
        textAlign: "left",
        backgroundColor: "rgba(255,255,255,0.92)",
        frame: "rounded rectangle",
        fontScale: 0.72
      },
      {
        text: "Run 1: --",
        x: 4.06,
        y: 1.52,
        layer: 3,
        anchor: "upper-left",
        color: "rgba(31,42,48,0.96)",
        textAlign: "left",
        backgroundColor: "rgba(255,255,255,0.92)",
        frame: "rounded rectangle",
        width: 0.92,
        fontScale: 0.68
      },
      {
        text: "Run 2: --",
        x: 4.06,
        y: 1.82,
        layer: 3,
        anchor: "upper-left",
        color: "rgba(31,42,48,0.96)",
        textAlign: "left",
        backgroundColor: "rgba(255,255,255,0.92)",
        frame: "rounded rectangle",
        width: 0.92,
        fontScale: 0.68
      },
      {
        text: "Run 3: --",
        x: 4.06,
        y: 2.12,
        layer: 3,
        anchor: "upper-left",
        color: "rgba(31,42,48,0.96)",
        textAlign: "left",
        backgroundColor: "rgba(255,255,255,0.92)",
        frame: "rounded rectangle",
        width: 0.92,
        fontScale: 0.68
      }
    ],
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
  },
  pairwiseLJProperties: [],
  elements: {
    mass: [20],
    sigma: [0.1],
    epsilon: [-0.01],
    color: [-1]
  },
  atoms: {
    x: [3.02],
    y: [2.55],
    vx: [0],
    vy: [0],
    charge: [0],
    friction: [1],
    element: [0],
    pinned: [0],
    visible: [0],
    draggable: [1]
  },
  shapes: {
    type: ["rectangle"],
    x: [0.78],
    y: [0.84],
    height: [2.24],
    width: [4.44],
    fence: [0],
    color: ["rgba(255,255,255,0.9)"],
    lineColor: ["rgba(31,42,48,0.22)"],
    lineWeight: [2],
    lineDashes: ["none"],
    layer: [1]
  }
};

const steelInteractive = {
  title: "Steel wool pulled apart",
  publicationStatus: "draft",
  subtitle: "Pull part of the sample away from the scale, put it back, then record each run.",
  about: "Direct-manipulation draft using Concord's draggable-object pattern instead of scene switching.",
  parameters: [
    {
      name: "steelPieceOnScale",
      initialValue: 1
    }
  ],
  models: [
    {
      type: "md2d",
      id: "steel-live",
      url: "../../../simulations/unit-01/lesson-01/mass-change/states/steel-live.json",
      viewOptions: {
        controlButtons: "",
        enableAtomTooltips: false,
        gridLines: false,
        xunits: false,
        yunits: false,
        showClock: false
      },
      onLoad: [
        "var steelCurrentScaleAsset = 'balance-scale-4-82-g.svg';",
        "var steelPendingScaleAsset = null;",
        "var steelPendingScaleTime = null;",
        "function steelSetScaleAsset(asset) {",
        "  steelCurrentScaleAsset = asset;",
        "  set('imageMapping', { 'balance-scale-dynamic.svg': asset });",
        "}",
        "function steelIsOnScale() {",
        "  var piece = getAtomProperties(0);",
        "  return piece.x >= 2.76 && piece.x <= 3.42 && piece.y >= 2.24 && piece.y <= 2.9;",
        "}",
        "function steelRefreshReadout() {",
        "  var onScale = steelIsOnScale();",
        "  var desiredAsset = onScale ? 'balance-scale-4-82-g.svg' : 'balance-scale-3-91-g.svg';",
        "  set('steelPieceOnScale', onScale ? 1 : 0);",
        "  setTextBoxProperties(3, { text: onScale ? 'Whole sample on tray' : 'Part of sample off tray' });",
        "  if (desiredAsset !== steelCurrentScaleAsset && desiredAsset !== steelPendingScaleAsset) {",
        "    steelPendingScaleAsset = desiredAsset;",
        "    steelPendingScaleTime = get('time') + 8;",
        "    steelSetScaleAsset('balance-scale-loading.svg');",
        "  }",
        "  if (steelPendingScaleAsset && steelPendingScaleTime !== null && get('time') >= steelPendingScaleTime) {",
        "    steelSetScaleAsset(steelPendingScaleAsset);",
        "    steelPendingScaleAsset = null;",
        "    steelPendingScaleTime = null;",
        "  }",
        "}",
        "setComponentDisabled('steel-record-1-button', false);",
        "setComponentDisabled('steel-record-2-button', true);",
        "setComponentDisabled('steel-record-3-button', true);",
        "steelSetScaleAsset('balance-scale-4-82-g.svg');",
        "setTextBoxProperties(5, { text: 'Run 1: --' });",
        "setTextBoxProperties(6, { text: 'Run 2: --' });",
        "setTextBoxProperties(7, { text: 'Run 3: --' });",
        "steelRefreshReadout();",
        "callEvery(5, function () {",
        "  steelRefreshReadout();",
        "});",
        "start();"
      ]
    }
  ],
  components: [
    {
      type: "text",
      id: "steel-note",
      text: "Drag the star to pull a piece away from the tray. Put it back on the tray before recording the run."
    },
    {
      type: "button",
      id: "steel-record-1-button",
      text: "Record run 1",
      action: [
        "setTextBoxProperties(5, { text: 'Run 1: ' + (get('steelPieceOnScale') ? '4.82 g' : '3.91 g') });",
        "setComponentDisabled('steel-record-1-button', true);",
        "setComponentDisabled('steel-record-2-button', false);",
        "setComponentDisabled('steel-record-3-button', true);"
      ]
    },
    {
      type: "button",
      id: "steel-record-2-button",
      text: "Record run 2",
      action: [
        "setTextBoxProperties(6, { text: 'Run 2: ' + (get('steelPieceOnScale') ? '4.79 g' : '3.88 g') });",
        "setComponentDisabled('steel-record-1-button', true);",
        "setComponentDisabled('steel-record-2-button', true);",
        "setComponentDisabled('steel-record-3-button', false);"
      ],
      disabled: true
    },
    {
      type: "button",
      id: "steel-record-3-button",
      text: "Record run 3",
      action: [
        "setTextBoxProperties(7, { text: 'Run 3: ' + (get('steelPieceOnScale') ? '4.73 g' : '3.82 g') });",
        "setComponentDisabled('steel-record-1-button', true);",
        "setComponentDisabled('steel-record-2-button', true);",
        "setComponentDisabled('steel-record-3-button', true);"
      ],
      disabled: true
    },
    {
      type: "button",
      id: "steel-reset-button",
      text: "Reset",
      action: "loadModel('steel-live');"
    }
  ],
  layout: {
    left: [
      ["steel-note"],
      ["steel-record-1-button"],
      ["steel-record-2-button"],
      ["steel-record-3-button"],
      ["steel-reset-button"]
    ]
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

writeText(join(assetsRoot, "grab-star.svg"), grabStarSvg);
writeJson(join(statesRoot, "steel-live.json"), steelLiveModel);
writeJson(join(interactivesRoot, "steel-wool-pulled-apart.json"), steelInteractive);
