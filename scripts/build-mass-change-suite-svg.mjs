import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const suiteRoot = resolve(process.cwd(), "simulations/unit-01/lesson-01/mass-change");
const modelsRoot = join(suiteRoot, "models");
const sharedImagePath = "../../../simulations/unit-01/lesson-01/mass-change/assets/";

mkdirSync(modelsRoot, { recursive: true });

const colors = {
  background: "#f6f1e6",
  panel: "rgba(255,255,255,0.9)",
  line: "rgba(31,42,48,0.22)",
  ink: "rgba(31,42,48,0.96)",
  water: "rgba(115,186,242,0.82)",
  waterDeep: "rgba(84,152,217,0.9)",
  vapor: "rgba(255,255,255,0.65)",
  sugar: "rgba(224,208,170,0.95)",
  residue: "rgba(110,89,75,0.94)",
  bubble: "rgba(255,255,255,0.96)",
  cloud: "rgba(198,205,210,0.78)",
  note: "rgb(255,248,213)",
  display: "#d8f5e3",
  escaped: "rgba(124,132,140,0.92)"
};

const assetSizes = {
  scale: { width: 1.32, height: 0.6 },
  steelLoose: { width: 1.2, height: 0.84 },
  ice: { width: 0.84, height: 0.84 },
  precipitatePanel: { width: 1.06, height: 1.48 }
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
    fence: options.fence ?? 0,
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
    ...(options.height !== undefined ? { height: options.height } : {}),
    ...(options.fontScale !== undefined ? { fontScale: options.fontScale } : {})
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

function panelFrame(x, title, note) {
  return {
    shapes: [
      rect(x, 0.62, 1.7, 2.72, colors.panel, {
        lineColor: colors.line,
        lineWeight: 2,
        layer: 1
      })
    ],
    texts: [
      textBox(title, x + 0.12, 3.2, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        fontScale: 0.9
      }),
      textBox(note, x + 0.12, 0.08, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.92)",
        width: 1.42,
        fontScale: 0.75
      })
    ],
    images: []
  };
}

function scaleDisplay(x, readout) {
  return {
    shapes: [],
    texts: [
      textBox(readout, x + 0.85, 0.64, {
        width: 0.78,
        color: colors.display,
        textAlign: "center",
        fontScale: 0.8
      })
    ],
    images: [
      image("balance-scale.svg", x + 0.19, 1.08, {
        imageLayerPosition: 8
      })
    ]
  };
}

function overviewCard(x, label, imageUri, size, yTop) {
  return {
    shapes: [
      rect(x, 0.95, 1.22, 1.95, colors.panel, {
        lineColor: colors.line,
        lineWeight: 2,
        layer: 1
      })
    ],
    texts: [
      textBox(label, x + 0.15, 0.72, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        width: 0.92,
        fontScale: 0.78,
        textAlign: "center"
      })
    ],
    images: [
      image(imageUri, x + (1.22 - size.width) / 2, yTop, {
        imageLayerPosition: 5
      })
    ]
  };
}

function mergeParts(...parts) {
  return parts.reduce(
    (all, part) => ({
      shapes: all.shapes.concat(part.shapes ?? []),
      texts: all.texts.concat(part.texts ?? []),
      images: all.images.concat(part.images ?? [])
    }),
    { shapes: [], texts: [], images: [] }
  );
}

function serializeShapes(shapes) {
  return {
    type: shapes.map((item) => item.type),
    x: shapes.map((item) => item.x),
    y: shapes.map((item) => item.y),
    height: shapes.map((item) => item.height),
    width: shapes.map((item) => item.width),
    fence: shapes.map((item) => item.fence),
    color: shapes.map((item) => item.color),
    lineColor: shapes.map((item) => item.lineColor),
    lineWeight: shapes.map((item) => item.lineWeight),
    lineDashes: shapes.map((item) => item.lineDashes),
    layer: shapes.map((item) => item.layer)
  };
}

function sceneModel(title, subtitle, sceneBuilder) {
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
      images: scene.images,
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
    shapes: serializeShapes(scene.shapes)
  };
}

const scenes = {
  overview: sceneModel(
    "Mass & Change Evidence Suite",
    "SVG-first macroscopic visuals, native Lab components for layout and state, and a shared balance/readout system for every investigation.",
    () =>
      mergeParts(
        overviewCard(0.45, "Shared balance", "balance-scale.svg", assetSizes.scale, 2.28),
        overviewCard(1.95, "Steel wool", "steel-wool-loose.svg", assetSizes.steelLoose, 2.35),
        overviewCard(3.4, "Ice + water", "ice-cube.svg", assetSizes.ice, 2.45),
        overviewCard(4.75, "Precipitate", "precipitate-after.svg", assetSizes.precipitatePanel, 2.7),
        {
          shapes: [],
          texts: [
            textBox("The next quality bar is better object art, a better balance, and tighter per-case choreography.", 0.55, 0.35, {
              frame: "rounded rectangle",
              backgroundColor: "rgba(255,255,255,0.94)",
              width: 4.95,
              fontScale: 0.84
            })
          ],
          images: []
        }
      )
  ),
  steelWool: sceneModel(
    "Steel wool pulled apart",
    "Students should see that the material looks different when spread out, but the evidence target is still whether the mass changes.",
    () =>
      mergeParts(
        panelFrame(0.2, "Before", "same steel wool before being pulled apart"),
        panelFrame(2.15, "Pulled apart", "same material spread out into a looser shape"),
        panelFrame(4.1, "Run history", "the bad result should make students wonder where matter went"),
        scaleDisplay(0.2, "4.82 g"),
        scaleDisplay(2.15, "4.82 g"),
        scaleDisplay(4.1, "Run 3: 4.73 g"),
        {
          shapes: [
            ellipse(4.98, 2.1, 0.06, 0.04, colors.escaped, { lineColor: colors.escaped, layer: 2 }),
            ellipse(5.16, 1.98, 0.05, 0.03, colors.escaped, { lineColor: colors.escaped, layer: 2 }),
            ellipse(5.08, 1.84, 0.04, 0.03, colors.escaped, { lineColor: colors.escaped, layer: 2 })
          ],
          texts: [
            textBox("Run 1: 4.82 g\nRun 2: 4.79 g\nRun 3: 4.73 g", 4.25, 1.55, {
              frame: "rounded rectangle",
              backgroundColor: "rgba(255,255,255,0.9)",
              width: 1.18,
              fontScale: 0.67
            })
          ],
          images: [
            image("steel-wool-compact.svg", 0.57, 2.52, { imageLayerPosition: 5 }),
            image("steel-wool-loose.svg", 2.4, 2.54, { imageLayerPosition: 5 }),
            image("steel-wool-loose.svg", 4.28, 2.54, { imageLayerPosition: 5 })
          ]
        }
      )
  ),
  iceToWater: sceneModel(
    "Ice to water",
    "The visible form changes a lot, but the total mass should not. This stays at the evidence level rather than showing any particle explanation.",
    () =>
      mergeParts(
        panelFrame(0.2, "Before", "solid ice in the cup"),
        panelFrame(2.15, "Melting", "ice and liquid water together"),
        panelFrame(4.1, "Liquid water", "all melted, same matter"),
        scaleDisplay(0.2, "18.42 g"),
        scaleDisplay(2.15, "18.42 g"),
        scaleDisplay(4.1, "18.42 g"),
        {
          shapes: [
            rect(0.66, 1.18, 0.74, 0.3, "rgba(170,214,248,0.4)", { lineColor: "rgba(170,214,248,0.2)", layer: 2 }),
            rect(2.61, 1.18, 0.74, 0.38, colors.water, { lineColor: colors.waterDeep, lineWeight: 1, layer: 2 }),
            ellipse(2.76, 1.49, 0.36, 0.12, colors.vapor, { lineColor: "rgba(255,255,255,0.3)", lineWeight: 1, layer: 2 }),
            rect(4.56, 1.18, 0.74, 0.54, colors.water, { lineColor: colors.waterDeep, lineWeight: 1, layer: 2 }),
            ellipse(4.62, 1.64, 0.62, 0.1, "rgba(255,255,255,0.34)", { lineColor: "rgba(255,255,255,0.1)", lineWeight: 1, layer: 3 })
          ],
          texts: [],
          images: [
            image("beaker-outline.svg", 0.55, 2.54, { imageLayerPosition: 6 }),
            image("beaker-outline.svg", 2.5, 2.54, { imageLayerPosition: 6 }),
            image("beaker-outline.svg", 4.45, 2.54, { imageLayerPosition: 6 }),
            image("ice-cube.svg", 0.58, 2.34, { imageLayerPosition: 5 }),
            image("ice-cube.svg", 0.81, 2.28, { imageLayerPosition: 5 }),
            image("ice-cube.svg", 1.01, 2.36, { imageLayerPosition: 5 }),
            image("ice-cube.svg", 2.66, 2.2, { imageLayerPosition: 5 }),
            image("ice-cube.svg", 2.9, 2.08, { imageLayerPosition: 5 })
          ]
        }
      )
  ),
  precipitate: sceneModel(
    "Precipitate",
    "This case needs recognizable apparatus and a clear before / pour / after flow. The visible change should be unmistakable before any explanation is offered.",
    () =>
      mergeParts(
        panelFrame(0.2, "Weigh (before)", "two capped vials before mixing"),
        panelFrame(2.15, "Pour", "one liquid is poured into the other vial"),
        panelFrame(4.1, "Weigh (after)", "cloudiness and solid both count as part of the system"),
        scaleDisplay(0.2, "41.26 g"),
        scaleDisplay(4.1, "41.26 g"),
        {
          shapes: [],
          texts: [
            textBox("The vials stay capped except during the actual pour.", 2.26, 0.64, {
              frame: "rounded rectangle",
              backgroundColor: colors.note,
              width: 1.5,
              fontScale: 0.72,
              textAlign: "center"
            })
          ],
          images: [
            image("precipitate-before.svg", 0.52, 2.72, { imageLayerPosition: 6 }),
            image("precipitate-pour.svg", 2.48, 2.72, { imageLayerPosition: 6 }),
            image("precipitate-after.svg", 4.43, 2.72, { imageLayerPosition: 6 })
          ]
        }
      )
  ),
  burns: sceneModel(
    "Steel wool burns",
    "The point is the system boundary: an open burn can gain matter from air, while a closed setup keeps the whole system available for weighing.",
    () =>
      mergeParts(
        panelFrame(0.2, "Before", "steel wool before burning"),
        panelFrame(2.15, "Open", "burning in air"),
        panelFrame(4.1, "Closed / capped", "whole system remains available to weigh"),
        scaleDisplay(0.2, "0.92 g"),
        scaleDisplay(2.15, "0.96 g"),
        scaleDisplay(4.1, "18.74 g"),
        {
          shapes: [
            rect(4.66, 1.28, 0.44, 0.16, colors.residue, { lineColor: colors.residue, lineWeight: 1, layer: 2 }),
            ellipse(4.74, 1.66, 0.24, 0.12, "rgba(249,195,104,0.28)", { lineColor: "rgba(249,195,104,0.1)", lineWeight: 1, layer: 2 })
          ],
          texts: [
            textBox("same whole-system mass before and after", 4.18, 1.42, {
              frame: "rounded rectangle",
              backgroundColor: "rgba(255,255,255,0.9)",
              width: 1.36,
              fontScale: 0.7,
              textAlign: "center"
            })
          ],
          images: [
            image("steel-wool-compact.svg", 0.58, 2.52, { imageLayerPosition: 5 }),
            image("steel-wool-loose.svg", 2.43, 2.44, { imageLayerPosition: 5 }),
            image("flame-plume.svg", 2.62, 2.35, { imageLayerPosition: 4 }),
            image("jar-outline.svg", 4.5, 2.62, { imageLayerPosition: 6 }),
            image("steel-wool-compact.svg", 4.45, 2.14, { imageLayerPosition: 5 }),
            image("flame-plume.svg", 4.58, 2.12, { imageLayerPosition: 4 })
          ]
        }
      )
  ),
  sugar: sceneModel(
    "Sugar dissolves",
    "The visible difference is how quickly the sugar disappears into the water, not a new microscopic picture.",
    () =>
      mergeParts(
        panelFrame(0.2, "Before", "water and sugar together"),
        panelFrame(2.15, "Not stirred", "some crystals still visible"),
        panelFrame(4.1, "Stirred", "uniform-looking solution"),
        scaleDisplay(0.2, "33.18 g"),
        scaleDisplay(2.15, "33.18 g"),
        scaleDisplay(4.1, "33.18 g"),
        {
          shapes: [
            rect(0.66, 1.18, 0.74, 0.5, colors.water, { lineColor: colors.waterDeep, lineWeight: 1, layer: 2 }),
            rect(0.86, 1.18, 0.34, 0.16, colors.sugar, { lineColor: colors.sugar, lineWeight: 1, layer: 3 }),
            rect(2.61, 1.18, 0.74, 0.5, colors.water, { lineColor: colors.waterDeep, lineWeight: 1, layer: 2 }),
            rect(2.84, 1.18, 0.3, 0.18, colors.sugar, { lineColor: colors.sugar, lineWeight: 1, layer: 3 }),
            rect(4.56, 1.18, 0.74, 0.56, "rgba(122,189,241,0.78)", { lineColor: colors.waterDeep, lineWeight: 1, layer: 2 }),
            ellipse(4.68, 1.66, 0.5, 0.08, "rgba(255,255,255,0.3)", { lineColor: "rgba(255,255,255,0.1)", lineWeight: 1, layer: 3 }),
            ellipse(4.74, 1.46, 0.42, 0.06, "rgba(255,255,255,0.22)", { lineColor: "rgba(255,255,255,0.1)", lineWeight: 1, layer: 3 })
          ],
          texts: [],
          images: [
            image("beaker-outline.svg", 0.55, 2.54, { imageLayerPosition: 6 }),
            image("beaker-outline.svg", 2.5, 2.54, { imageLayerPosition: 6 }),
            image("beaker-outline.svg", 4.45, 2.54, { imageLayerPosition: 6 })
          ]
        }
      )
  ),
  alka: sceneModel(
    "Alka-Seltzer",
    "The critical contrast is whether the gas escapes or remains part of the system. The visuals should make that system question obvious.",
    () =>
      mergeParts(
        panelFrame(0.2, "Before", "tablet in water"),
        panelFrame(2.15, "Vented", "gas escapes"),
        panelFrame(4.1, "Captured", "gas kept in system"),
        scaleDisplay(0.2, "26.40 g"),
        scaleDisplay(2.15, "26.12 g"),
        scaleDisplay(4.1, "26.40 g"),
        {
          shapes: [
            rect(0.66, 1.18, 0.74, 0.52, colors.water, { lineColor: colors.waterDeep, lineWeight: 1, layer: 2 }),
            rect(2.61, 1.18, 0.74, 0.52, colors.water, { lineColor: colors.waterDeep, lineWeight: 1, layer: 2 }),
            ellipse(2.86, 2.04, 0.08, 0.08, colors.bubble, { lineColor: "rgba(176,176,176,0.82)", lineWeight: 1, layer: 3 }),
            ellipse(3, 1.86, 0.06, 0.06, colors.bubble, { lineColor: "rgba(176,176,176,0.82)", lineWeight: 1, layer: 3 }),
            ellipse(3.12, 1.66, 0.05, 0.05, colors.bubble, { lineColor: "rgba(176,176,176,0.82)", lineWeight: 1, layer: 3 }),
            ellipse(3.22, 2.18, 0.05, 0.05, colors.bubble, { lineColor: "rgba(176,176,176,0.82)", lineWeight: 1, layer: 3 }),
            rect(4.56, 1.18, 0.74, 0.52, colors.water, { lineColor: colors.waterDeep, lineWeight: 1, layer: 2 }),
            ellipse(4.88, 1.98, 0.07, 0.07, colors.bubble, { lineColor: "rgba(176,176,176,0.82)", lineWeight: 1, layer: 3 }),
            ellipse(5, 1.8, 0.05, 0.05, colors.bubble, { lineColor: "rgba(176,176,176,0.82)", lineWeight: 1, layer: 3 }),
            ellipse(5.08, 1.62, 0.05, 0.05, colors.bubble, { lineColor: "rgba(176,176,176,0.82)", lineWeight: 1, layer: 3 }),
            rect(4.71, 2.44, 0.44, 0.12, colors.cloud, { lineColor: "rgba(109,124,132,0.82)", lineWeight: 1, layer: 2 })
          ],
          texts: [],
          images: [
            image("beaker-outline.svg", 0.55, 2.54, { imageLayerPosition: 6 }),
            image("beaker-outline.svg", 2.5, 2.54, { imageLayerPosition: 6 }),
            image("jar-outline.svg", 4.5, 2.62, { imageLayerPosition: 6 }),
            image("alka-tablet.svg", 0.8, 1.82, { imageLayerPosition: 5 }),
            image("alka-tablet.svg", 2.8, 1.72, { imageLayerPosition: 5 }),
            image("alka-tablet.svg", 4.8, 1.72, { imageLayerPosition: 5 })
          ]
        }
      )
  )
};

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

writeJson(join(suiteRoot, "model.json"), scenes.overview);
writeJson(join(modelsRoot, "steel-wool-pulled-apart.json"), scenes.steelWool);
writeJson(join(modelsRoot, "ice-to-water.json"), scenes.iceToWater);
writeJson(join(modelsRoot, "precipitate.json"), scenes.precipitate);
writeJson(join(modelsRoot, "steel-wool-burns.json"), scenes.burns);
writeJson(join(modelsRoot, "sugar-dissolves.json"), scenes.sugar);
writeJson(join(modelsRoot, "alka-seltzer.json"), scenes.alka);
