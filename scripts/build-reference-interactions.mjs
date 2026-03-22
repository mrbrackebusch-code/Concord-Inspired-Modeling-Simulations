import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { ensureCoreScaleAssets, ensureScaleAsset } from "./lib/scale-assets.mjs";
import { ensureSteelWoolAssets } from "./lib/steel-wool-assets.mjs";
import { ensureVesselAssets } from "./lib/vessel-assets.mjs";

const root = resolve(process.cwd());
const suiteRoot = join(root, "simulations", "unit-01", "lesson-01", "mass-change");
const assetsRoot = join(suiteRoot, "assets");
const statesRoot = join(suiteRoot, "states");
const interactivesRoot = join(suiteRoot, "interactives");
const studioRoot = join(root, "apps", "studio", "interactives", "unit-01", "lesson-01");
const sharedImagePath = "../../../simulations/unit-01/lesson-01/mass-change/assets/";

mkdirSync(assetsRoot, { recursive: true });
mkdirSync(statesRoot, { recursive: true });
mkdirSync(interactivesRoot, { recursive: true });
mkdirSync(join(studioRoot, "ice-to-water"), { recursive: true });
mkdirSync(join(studioRoot, "precipitate"), { recursive: true });
mkdirSync(join(studioRoot, "steel-wool-pulled-apart"), { recursive: true });
mkdirSync(join(studioRoot, "sugar-dissolves"), { recursive: true });
mkdirSync(join(studioRoot, "steel-wool-burns"), { recursive: true });
mkdirSync(join(studioRoot, "alka-seltzer"), { recursive: true });
ensureCoreScaleAssets(assetsRoot);
ensureSteelWoolAssets(assetsRoot);
ensureVesselAssets(assetsRoot);

const colors = {
  background: "#f6f1e6",
  panel: "rgba(255,255,255,0.9)",
  line: "rgba(31,42,48,0.22)",
  ink: "rgba(31,42,48,0.96)",
  note: "rgb(255,248,213)",
  display: "#d8f5e3",
  water: "rgba(115,186,242,0.82)",
  waterDeep: "rgba(84,152,217,0.9)",
  vapor: "rgba(255,255,255,0.6)"
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

function shape(type, x, y, width, height, color, options = {}) {
  return {
    type,
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

function rect(x, y, width, height, color, options = {}) {
  return shape("rectangle", x, y, width, height, color, options);
}

function ellipse(x, y, width, height, color, options = {}) {
  return shape("ellipse", x, y, width, height, color, options);
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

function escapeXml(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
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
      yunits: false
    },
    ...(onLoad.length ? { onLoad } : {})
  };
}

function sceneModel(title, subtitle, readout, sceneBuilder) {
  const scene = sceneBuilder();
  const scaleImageAsset = ensureScaleAsset(assetsRoot, readout);
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
          fontScale: 0.84
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

const iceBefore = sceneModel(
  "Ice to water",
  "Observe the visible change and compare the measured mass.",
  "18.42 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Before", 0.98, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("beaker-ice-before.svg", 2.02, 2.62, { imageLayerPosition: 6 })
    ]
  })
);

const iceMelting = sceneModel(
  "Ice to water",
  "Observe the visible change and compare the measured mass.",
  "18.42 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Melting", 0.98, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("beaker-ice-melting.svg", 2.02, 2.62, { imageLayerPosition: 6 })
    ]
  })
);

const iceAfter = sceneModel(
  "Ice to water",
  "Observe the visible change and compare the measured mass.",
  "18.42 g",
  () => ({
    shapes: [],
    texts: [
      textBox("After", 0.98, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("beaker-ice-after.svg", 2.02, 2.62, { imageLayerPosition: 6 })
    ]
  })
);

const precipitateBefore = sceneModel(
  "Precipitate",
  "Use the actual sequence: weigh, pour, then weigh again.",
  "41.26 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Weigh (before)", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("precipitate-before.svg", 2.02, 2.84, { imageLayerPosition: 6 })
    ]
  })
);

const precipitatePour = sceneModel(
  "Precipitate",
  "Use the actual sequence: weigh, pour, then weigh again.",
  "0.00 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Pour", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      }),
      textBox("The scale is not the focus during the pour step.", 1.55, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        width: 2.52,
        fontScale: 0.72
      })
    ],
    images: [
      image("precipitate-pour.svg", 2.02, 2.84, { imageLayerPosition: 6 })
    ]
  })
);

const precipitateAfter = sceneModel(
  "Precipitate",
  "Use the actual sequence: weigh, pour, then weigh again.",
  "41.26 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Weigh (after)", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("precipitate-after.svg", 2.02, 2.84, { imageLayerPosition: 6 })
    ]
  })
);

const steelBefore = sceneModel(
  "Steel wool pulled apart",
  "Pull the steel wool apart, then compare the measured mass across runs.",
  "4.82 g",
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

const steelRun1 = sceneModel(
  "Steel wool pulled apart",
  "Pull the steel wool apart, then compare the measured mass across runs.",
  "4.82 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Run 1", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      }),
      textBox("Run 1: 4.82 g", 4.0, 2.62, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        width: 1.0,
        fontScale: 0.72
      })
    ],
    images: [
      image("steel-wool-loose.svg", 2.3, 1.58, { imageLayerPosition: 6 })
    ]
  })
);

const steelRun2 = sceneModel(
  "Steel wool pulled apart",
  "Pull the steel wool apart, then compare the measured mass across runs.",
  "4.79 g",
  () => ({
    shapes: [
      ellipse(4.3, 2.08, 0.05, 0.03, "rgba(124,132,140,0.92)", { lineColor: "rgba(124,132,140,0.92)", layer: 2 })
    ],
    texts: [
      textBox("Run 2", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      }),
      textBox("Run 1: 4.82 g\nRun 2: 4.79 g", 3.92, 2.62, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        width: 1.08,
        fontScale: 0.68
      })
    ],
    images: [
      image("steel-wool-loose.svg", 2.3, 1.58, { imageLayerPosition: 6 })
    ]
  })
);

const steelRun3 = sceneModel(
  "Steel wool pulled apart",
  "Pull the steel wool apart, then compare the measured mass across runs.",
  "4.73 g",
  () => ({
    shapes: [
      ellipse(4.28, 2.12, 0.05, 0.03, "rgba(124,132,140,0.92)", { lineColor: "rgba(124,132,140,0.92)", layer: 2 }),
      ellipse(4.42, 1.98, 0.04, 0.03, "rgba(124,132,140,0.92)", { lineColor: "rgba(124,132,140,0.92)", layer: 2 }),
      ellipse(4.35, 1.84, 0.03, 0.02, "rgba(124,132,140,0.92)", { lineColor: "rgba(124,132,140,0.92)", layer: 2 })
    ],
    texts: [
      textBox("Run 3", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      }),
      textBox("Run 1: 4.82 g\nRun 2: 4.79 g\nRun 3: 4.73 g", 3.84, 2.52, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        width: 1.16,
        fontScale: 0.64
      })
    ],
    images: [
      image("steel-wool-loose.svg", 2.3, 1.58, { imageLayerPosition: 6 })
    ]
  })
);

const sugarBefore = sceneModel(
  "Sugar dissolves",
  "Compare the visible change with the measured mass.",
  "33.18 g",
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
      image("beaker-sugar-before.svg", 2.02, 2.62, { imageLayerPosition: 6 })
    ]
  })
);

const sugarNotStirred = sceneModel(
  "Sugar dissolves",
  "Compare the visible change with the measured mass.",
  "33.18 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Not stirred", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("beaker-sugar-not-stirred.svg", 2.02, 2.62, { imageLayerPosition: 6 })
    ]
  })
);

const sugarStirred = sceneModel(
  "Sugar dissolves",
  "Compare the visible change with the measured mass.",
  "33.18 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Stirred", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("beaker-sugar-stirred.svg", 2.02, 2.62, { imageLayerPosition: 6 })
    ]
  })
);

const burnsBefore = sceneModel(
  "Steel wool burns",
  "Compare the measured mass in the open and closed setups.",
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
      image("steel-wool-burnable.svg", 2.53, 1.58, { imageLayerPosition: 6 })
    ]
  })
);

const burnsOpen = sceneModel(
  "Steel wool burns",
  "Compare the measured mass in the open and closed setups.",
  "0.96 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Open", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("burns-open-scene.svg", 1.92, 2.64, { imageLayerPosition: 6 })
    ]
  })
);

const burnsClosed = sceneModel(
  "Steel wool burns",
  "Compare the measured mass in the open and closed setups.",
  "18.74 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Closed / capped", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      }),
      textBox("whole system", 4.15, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        fontScale: 0.72
      })
    ],
    images: [
      image("burns-closed-scene.svg", 2.0, 2.72, { imageLayerPosition: 6 })
    ]
  })
);

const alkaBefore = sceneModel(
  "Alka-Seltzer",
  "Compare the measured mass when gas can leave versus when it is kept in the setup.",
  "26.40 g",
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
      image("beaker-alka-before.svg", 2.02, 2.62, { imageLayerPosition: 6 })
    ]
  })
);

const alkaVented = sceneModel(
  "Alka-Seltzer",
  "Compare the measured mass when gas can leave versus when it is kept in the setup.",
  "26.12 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Vented", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("beaker-alka-vented.svg", 2.02, 2.62, { imageLayerPosition: 6 })
    ]
  })
);

const alkaCaptured = sceneModel(
  "Alka-Seltzer",
  "Compare the measured mass when gas can leave versus when it is kept in the setup.",
  "26.40 g",
  () => ({
    shapes: [],
    texts: [
      textBox("Captured", 0.92, 0.18, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        fontScale: 0.78
      })
    ],
    images: [
      image("jar-alka-captured.svg", 2.0, 2.72, { imageLayerPosition: 6 })
    ]
  })
);

const iceInteractive = {
  title: "Ice to water",
  publicationStatus: "draft",
  subtitle: "Reference interaction pattern for a simple mass-stays-the-same case.",
  about: "This is the first real state-flow interactive for the Mass & Change lesson.",
  models: [
    interactiveModel("ice-before", "../../../simulations/unit-01/lesson-01/mass-change/states/ice-before.json", [
      "setComponentDisabled('ice-before-button', true);",
      "setComponentDisabled('ice-melting-button', false);",
      "setComponentDisabled('ice-after-button', true);",
      "setComponentDisabled('ice-reset-button', true);"
    ]),
    interactiveModel("ice-melting", "../../../simulations/unit-01/lesson-01/mass-change/states/ice-melting.json", [
      "setComponentDisabled('ice-before-button', false);",
      "setComponentDisabled('ice-melting-button', true);",
      "setComponentDisabled('ice-after-button', false);",
      "setComponentDisabled('ice-reset-button', false);"
    ]),
    interactiveModel("ice-after", "../../../simulations/unit-01/lesson-01/mass-change/states/ice-after.json", [
      "setComponentDisabled('ice-before-button', false);",
      "setComponentDisabled('ice-melting-button', false);",
      "setComponentDisabled('ice-after-button', true);",
      "setComponentDisabled('ice-reset-button', false);"
    ])
  ],
  components: [
    { type: "text", id: "ice-note", text: "Step through the visible change, then compare the measured mass." },
    { type: "button", id: "ice-before-button", text: "Before", action: "loadModel('ice-before');" },
    { type: "button", id: "ice-melting-button", text: "Start melting", action: "loadModel('ice-melting');" },
    { type: "button", id: "ice-after-button", text: "After", action: "loadModel('ice-after');", disabled: true },
    { type: "button", id: "ice-reset-button", text: "Reset", action: "loadModel('ice-before');", disabled: true }
  ],
  layout: {
    left: [["ice-note"], ["ice-before-button"], ["ice-melting-button"], ["ice-after-button"], ["ice-reset-button"]]
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

const precipitateInteractive = {
  title: "Precipitate",
  publicationStatus: "draft",
  subtitle: "Reference interaction pattern for a procedural mass-stays-the-same case.",
  about: "This is the first real multi-step procedural interactive for the Mass & Change lesson.",
  models: [
    interactiveModel("precipitate-before-step", "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-before.json", [
      "setComponentDisabled('precipitate-before-button', true);",
      "setComponentDisabled('precipitate-pour-button', false);",
      "setComponentDisabled('precipitate-after-button', true);",
      "setComponentDisabled('precipitate-reset-button', true);"
    ]),
    interactiveModel("precipitate-pour-step", "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-pour.json", [
      "setComponentDisabled('precipitate-before-button', false);",
      "setComponentDisabled('precipitate-pour-button', true);",
      "setComponentDisabled('precipitate-after-button', false);",
      "setComponentDisabled('precipitate-reset-button', false);"
    ]),
    interactiveModel("precipitate-after-step", "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-after.json", [
      "setComponentDisabled('precipitate-before-button', false);",
      "setComponentDisabled('precipitate-pour-button', false);",
      "setComponentDisabled('precipitate-after-button', true);",
      "setComponentDisabled('precipitate-reset-button', false);"
    ])
  ],
  components: [
    { type: "text", id: "precipitate-note", text: "Use the exact investigation order. The mass should be read at the weigh steps, not during the pour." },
    { type: "button", id: "precipitate-before-button", text: "Weigh (before)", action: "loadModel('precipitate-before-step');" },
    { type: "button", id: "precipitate-pour-button", text: "Pour", action: "loadModel('precipitate-pour-step');" },
    { type: "button", id: "precipitate-after-button", text: "Weigh (after)", action: "loadModel('precipitate-after-step');", disabled: true },
    { type: "button", id: "precipitate-reset-button", text: "Reset", action: "loadModel('precipitate-before-step');", disabled: true }
  ],
  layout: {
    left: [["precipitate-note"], ["precipitate-before-button"], ["precipitate-pour-button"], ["precipitate-after-button"], ["precipitate-reset-button"]]
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

const steelInteractive = {
  title: "Steel wool pulled apart",
  publicationStatus: "draft",
  subtitle: "Reference interaction pattern for a repeatable run-history case.",
  about: "This interactive preserves the run-history behavior needed for the steel wool investigation.",
  models: [
    interactiveModel("steel-before", "../../../simulations/unit-01/lesson-01/mass-change/states/steel-before.json", [
      "setComponentDisabled('steel-before-button', true);",
      "setComponentDisabled('steel-run1-button', false);",
      "setComponentDisabled('steel-run2-button', true);",
      "setComponentDisabled('steel-run3-button', true);",
      "setComponentDisabled('steel-reset-button', true);"
    ]),
    interactiveModel("steel-run-1", "../../../simulations/unit-01/lesson-01/mass-change/states/steel-run-1.json", [
      "setComponentDisabled('steel-before-button', false);",
      "setComponentDisabled('steel-run1-button', true);",
      "setComponentDisabled('steel-run2-button', false);",
      "setComponentDisabled('steel-run3-button', true);",
      "setComponentDisabled('steel-reset-button', false);"
    ]),
    interactiveModel("steel-run-2", "../../../simulations/unit-01/lesson-01/mass-change/states/steel-run-2.json", [
      "setComponentDisabled('steel-before-button', false);",
      "setComponentDisabled('steel-run1-button', false);",
      "setComponentDisabled('steel-run2-button', true);",
      "setComponentDisabled('steel-run3-button', false);",
      "setComponentDisabled('steel-reset-button', false);"
    ]),
    interactiveModel("steel-run-3", "../../../simulations/unit-01/lesson-01/mass-change/states/steel-run-3.json", [
      "setComponentDisabled('steel-before-button', false);",
      "setComponentDisabled('steel-run1-button', false);",
      "setComponentDisabled('steel-run2-button', false);",
      "setComponentDisabled('steel-run3-button', true);",
      "setComponentDisabled('steel-reset-button', false);"
    ])
  ],
  components: [
    { type: "text", id: "steel-note", text: "Run the setup multiple times and compare the measured mass results." },
    { type: "button", id: "steel-before-button", text: "Before", action: "loadModel('steel-before');" },
    { type: "button", id: "steel-run1-button", text: "Run 1", action: "loadModel('steel-run-1');" },
    { type: "button", id: "steel-run2-button", text: "Run 2", action: "loadModel('steel-run-2');", disabled: true },
    { type: "button", id: "steel-run3-button", text: "Run 3", action: "loadModel('steel-run-3');", disabled: true },
    { type: "button", id: "steel-reset-button", text: "Reset", action: "loadModel('steel-before');", disabled: true }
  ],
  layout: {
    left: [["steel-note"], ["steel-before-button"], ["steel-run1-button"], ["steel-run2-button"], ["steel-run3-button"], ["steel-reset-button"]]
  },
  template: [
    { id: "left", top: "3em", right: "model.left", "padding-right": "0.75em", align: "right", width: "14em" }
  ]
};

const sugarInteractive = {
  title: "Sugar dissolves",
  publicationStatus: "draft",
  subtitle: "Reference interaction pattern for a condition-comparison case with the same mass outcome.",
  about: "This interactive preserves the exact Not stirred and Stirred labels while keeping mass constant.",
  models: [
    interactiveModel("sugar-before", "../../../simulations/unit-01/lesson-01/mass-change/states/sugar-before.json", [
      "setComponentDisabled('sugar-before-button', true);",
      "setComponentDisabled('sugar-not-stirred-button', false);",
      "setComponentDisabled('sugar-stirred-button', false);",
      "setComponentDisabled('sugar-reset-button', true);"
    ]),
    interactiveModel("sugar-not-stirred", "../../../simulations/unit-01/lesson-01/mass-change/states/sugar-not-stirred.json", [
      "setComponentDisabled('sugar-before-button', false);",
      "setComponentDisabled('sugar-not-stirred-button', true);",
      "setComponentDisabled('sugar-stirred-button', false);",
      "setComponentDisabled('sugar-reset-button', false);"
    ]),
    interactiveModel("sugar-stirred", "../../../simulations/unit-01/lesson-01/mass-change/states/sugar-stirred.json", [
      "setComponentDisabled('sugar-before-button', false);",
      "setComponentDisabled('sugar-not-stirred-button', false);",
      "setComponentDisabled('sugar-stirred-button', true);",
      "setComponentDisabled('sugar-reset-button', false);"
    ])
  ],
  components: [
    { type: "text", id: "sugar-note", text: "Compare the visible dissolving behavior, then compare the measured mass." },
    { type: "button", id: "sugar-before-button", text: "Before", action: "loadModel('sugar-before');" },
    { type: "button", id: "sugar-not-stirred-button", text: "Not stirred", action: "loadModel('sugar-not-stirred');" },
    { type: "button", id: "sugar-stirred-button", text: "Stirred", action: "loadModel('sugar-stirred');" },
    { type: "button", id: "sugar-reset-button", text: "Reset", action: "loadModel('sugar-before');", disabled: true }
  ],
  layout: {
    left: [["sugar-note"], ["sugar-before-button"], ["sugar-not-stirred-button"], ["sugar-stirred-button"], ["sugar-reset-button"]]
  },
  template: [
    { id: "left", top: "3em", right: "model.left", "padding-right": "0.75em", align: "right", width: "14em" }
  ]
};

const burnsInteractive = {
  title: "Steel wool burns",
  publicationStatus: "draft",
  subtitle: "Reference interaction pattern for a condition-comparison case that sets up the system boundary idea.",
  about: "This interactive preserves the exact Open and Closed / capped labels with their different measured mass outcomes.",
  models: [
    interactiveModel("burns-before", "../../../simulations/unit-01/lesson-01/mass-change/states/burns-before.json", [
      "setComponentDisabled('burns-before-button', true);",
      "setComponentDisabled('burns-open-button', false);",
      "setComponentDisabled('burns-closed-button', false);",
      "setComponentDisabled('burns-reset-button', true);"
    ]),
    interactiveModel("burns-open", "../../../simulations/unit-01/lesson-01/mass-change/states/burns-open.json", [
      "setComponentDisabled('burns-before-button', false);",
      "setComponentDisabled('burns-open-button', true);",
      "setComponentDisabled('burns-closed-button', false);",
      "setComponentDisabled('burns-reset-button', false);"
    ]),
    interactiveModel("burns-closed", "../../../simulations/unit-01/lesson-01/mass-change/states/burns-closed.json", [
      "setComponentDisabled('burns-before-button', false);",
      "setComponentDisabled('burns-open-button', false);",
      "setComponentDisabled('burns-closed-button', true);",
      "setComponentDisabled('burns-reset-button', false);"
    ])
  ],
  components: [
    { type: "text", id: "burns-note", text: "Compare the measured mass in the open and closed setups." },
    { type: "button", id: "burns-before-button", text: "Before", action: "loadModel('burns-before');" },
    { type: "button", id: "burns-open-button", text: "Open", action: "loadModel('burns-open');" },
    { type: "button", id: "burns-closed-button", text: "Closed / capped", action: "loadModel('burns-closed');" },
    { type: "button", id: "burns-reset-button", text: "Reset", action: "loadModel('burns-before');", disabled: true }
  ],
  layout: {
    left: [["burns-note"], ["burns-before-button"], ["burns-open-button"], ["burns-closed-button"], ["burns-reset-button"]]
  },
  template: [
    { id: "left", top: "3em", right: "model.left", "padding-right": "0.75em", align: "right", width: "14em" }
  ]
};

const alkaInteractive = {
  title: "Alka-Seltzer",
  publicationStatus: "draft",
  subtitle: "Reference interaction pattern for a condition-comparison case with gas leaving versus staying in the measured setup.",
  about: "This interactive preserves the exact Vented and Captured labels with their different measured mass outcomes.",
  models: [
    interactiveModel("alka-before", "../../../simulations/unit-01/lesson-01/mass-change/states/alka-before.json", [
      "setComponentDisabled('alka-before-button', true);",
      "setComponentDisabled('alka-vented-button', false);",
      "setComponentDisabled('alka-captured-button', false);",
      "setComponentDisabled('alka-reset-button', true);"
    ]),
    interactiveModel("alka-vented", "../../../simulations/unit-01/lesson-01/mass-change/states/alka-vented.json", [
      "setComponentDisabled('alka-before-button', false);",
      "setComponentDisabled('alka-vented-button', true);",
      "setComponentDisabled('alka-captured-button', false);",
      "setComponentDisabled('alka-reset-button', false);"
    ]),
    interactiveModel("alka-captured", "../../../simulations/unit-01/lesson-01/mass-change/states/alka-captured.json", [
      "setComponentDisabled('alka-before-button', false);",
      "setComponentDisabled('alka-vented-button', false);",
      "setComponentDisabled('alka-captured-button', true);",
      "setComponentDisabled('alka-reset-button', false);"
    ])
  ],
  components: [
    { type: "text", id: "alka-note", text: "Compare the measured mass when gas can leave versus when it stays in the setup." },
    { type: "button", id: "alka-before-button", text: "Before", action: "loadModel('alka-before');" },
    { type: "button", id: "alka-vented-button", text: "Vented", action: "loadModel('alka-vented');" },
    { type: "button", id: "alka-captured-button", text: "Captured", action: "loadModel('alka-captured');" },
    { type: "button", id: "alka-reset-button", text: "Reset", action: "loadModel('alka-before');", disabled: true }
  ],
  layout: {
    left: [["alka-note"], ["alka-before-button"], ["alka-vented-button"], ["alka-captured-button"], ["alka-reset-button"]]
  },
  template: [
    { id: "left", top: "3em", right: "model.left", "padding-right": "0.75em", align: "right", width: "14em" }
  ]
};

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function writeFile(path, data) {
  writeFileSync(path, `${data}\n`, "utf8");
}

writeJson(join(statesRoot, "ice-before.json"), iceBefore);
writeJson(join(statesRoot, "ice-melting.json"), iceMelting);
writeJson(join(statesRoot, "ice-after.json"), iceAfter);
writeJson(join(statesRoot, "precipitate-before.json"), precipitateBefore);
writeJson(join(statesRoot, "precipitate-pour.json"), precipitatePour);
writeJson(join(statesRoot, "precipitate-after.json"), precipitateAfter);
writeJson(join(statesRoot, "steel-before.json"), steelBefore);
writeJson(join(statesRoot, "steel-run-1.json"), steelRun1);
writeJson(join(statesRoot, "steel-run-2.json"), steelRun2);
writeJson(join(statesRoot, "steel-run-3.json"), steelRun3);
writeJson(join(statesRoot, "sugar-before.json"), sugarBefore);
writeJson(join(statesRoot, "sugar-not-stirred.json"), sugarNotStirred);
writeJson(join(statesRoot, "sugar-stirred.json"), sugarStirred);
writeJson(join(statesRoot, "burns-before.json"), burnsBefore);
writeJson(join(statesRoot, "burns-open.json"), burnsOpen);
writeJson(join(statesRoot, "burns-closed.json"), burnsClosed);
writeJson(join(statesRoot, "alka-before.json"), alkaBefore);
writeJson(join(statesRoot, "alka-vented.json"), alkaVented);
writeJson(join(statesRoot, "alka-captured.json"), alkaCaptured);
writeJson(join(interactivesRoot, "ice-to-water.json"), iceInteractive);
writeJson(join(interactivesRoot, "precipitate.json"), precipitateInteractive);
writeJson(join(interactivesRoot, "steel-wool-pulled-apart-reference.json"), steelInteractive);
writeJson(join(interactivesRoot, "sugar-dissolves.json"), sugarInteractive);
writeJson(join(interactivesRoot, "steel-wool-burns.json"), burnsInteractive);
writeJson(join(interactivesRoot, "alka-seltzer.json"), alkaInteractive);

const iceLauncher = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ice to Water Lab Launcher</title>
    <meta http-equiv="refresh" content="0; url=../../../../../../vendor/lab/dist/embeddable.html#../../../simulations/unit-01/lesson-01/mass-change/interactives/ice-to-water.json">
  </head>
  <body>
    <p>Launching Concord Lab...</p>
  </body>
</html>`;

const precipitateLauncher = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Precipitate Lab Launcher</title>
    <meta http-equiv="refresh" content="0; url=../../../../../../vendor/lab/dist/embeddable.html#../../../simulations/unit-01/lesson-01/mass-change/interactives/precipitate.json">
  </head>
  <body>
    <p>Launching Concord Lab...</p>
  </body>
</html>`;

const steelLauncher = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Steel Wool Pulled Apart Lab Launcher</title>
    <meta http-equiv="refresh" content="0; url=../../../../../../vendor/lab/dist/embeddable.html#../../../simulations/unit-01/lesson-01/mass-change/interactives/steel-wool-pulled-apart.json">
  </head>
  <body>
    <p>Launching Concord Lab...</p>
  </body>
</html>`;

const sugarLauncher = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sugar Dissolves Lab Launcher</title>
    <meta http-equiv="refresh" content="0; url=../../../../../../vendor/lab/dist/embeddable.html#../../../simulations/unit-01/lesson-01/mass-change/interactives/sugar-dissolves.json">
  </head>
  <body>
    <p>Launching Concord Lab...</p>
  </body>
</html>`;

const burnsLauncher = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Steel Wool Burns Lab Launcher</title>
    <meta http-equiv="refresh" content="0; url=../../../../../../vendor/lab/dist/embeddable.html#../../../simulations/unit-01/lesson-01/mass-change/interactives/steel-wool-burns.json">
  </head>
  <body>
    <p>Launching Concord Lab...</p>
  </body>
</html>`;

const alkaLauncher = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Alka-Seltzer Lab Launcher</title>
    <meta http-equiv="refresh" content="0; url=../../../../../../vendor/lab/dist/embeddable.html#../../../simulations/unit-01/lesson-01/mass-change/interactives/alka-seltzer.json">
  </head>
  <body>
    <p>Launching Concord Lab...</p>
  </body>
</html>`;

writeFile(join(studioRoot, "ice-to-water", "index.html"), iceLauncher);
writeFile(join(studioRoot, "precipitate", "index.html"), precipitateLauncher);
writeFile(join(studioRoot, "steel-wool-pulled-apart", "index.html"), steelLauncher);
writeFile(join(studioRoot, "sugar-dissolves", "index.html"), sugarLauncher);
writeFile(join(studioRoot, "steel-wool-burns", "index.html"), burnsLauncher);
writeFile(join(studioRoot, "alka-seltzer", "index.html"), alkaLauncher);
