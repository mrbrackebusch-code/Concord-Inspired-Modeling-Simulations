import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const suiteRoot = resolve(process.cwd(), "simulations/unit-01/lesson-01/mass-change");
const modelsRoot = join(suiteRoot, "models");

mkdirSync(modelsRoot, { recursive: true });

const colors = {
  background: "#f6f1e6",
  panel: "rgba(255,255,255,0.88)",
  line: "rgba(31,42,48,0.24)",
  ink: "rgba(31,42,48,0.96)",
  steel: "rgba(112,122,132,0.92)",
  steelDark: "rgba(79,89,97,0.96)",
  water: "rgba(113,187,255,0.88)",
  ice: "rgba(210,233,255,0.96)",
  sugar: "rgba(231,208,160,0.95)",
  precipitate: "rgba(176,186,92,0.95)",
  residue: "rgba(88,72,66,0.92)",
  fire: "rgba(235,127,55,0.56)",
  bubble: "rgba(255,255,255,0.95)",
  vent: "rgba(196,108,69,0.96)",
  cap: "rgba(53,94,103,0.96)",
  cloud: "rgba(207,214,219,0.72)",
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
    fence: options.fence ?? 0,
    color,
    lineColor: options.lineColor ?? colors.line,
    lineWeight: options.lineWeight ?? 2,
    lineDashes: options.lineDashes ?? "none",
    layer: options.layer ?? 1
  };
}

function textBox(text, x, y, options = {}) {
  return {
    text,
    x,
    y,
    layer: options.layer ?? 3,
    anchor: options.anchor ?? "upper-left",
    ...(options.frame ? { frame: options.frame } : {}),
    ...(options.backgroundColor ? { backgroundColor: options.backgroundColor } : {}),
    ...(options.width !== undefined ? { width: options.width } : {}),
    ...(options.height !== undefined ? { height: options.height } : {}),
    ...(options.fontScale !== undefined ? { fontScale: options.fontScale } : {})
  };
}

function bars(x, y, width, count, gap, color) {
  const out = [];
  for (let index = 0; index < count; index += 1) {
    out.push(rect(x, y + index * gap, width, 0.08, color, {
      lineColor: colors.steelDark,
      lineWeight: 1,
      layer: 2
    }));
  }
  return out;
}

function dots(x, y, count, gapX, gapY, color) {
  const out = [];
  let currentX = x;
  let currentY = y;
  for (let index = 0; index < count; index += 1) {
    out.push(rect(currentX, currentY, 0.09, 0.09, color, {
      lineColor: color,
      lineWeight: 1,
      layer: 2
    }));
    currentX += gapX;
    if ((index + 1) % 4 === 0) {
      currentX = x;
      currentY += gapY;
    }
  }
  return out;
}

function panel(x, title, note) {
  const y = 0.6;
  const width = 1.7;
  const height = 2.75;
  return {
    shapes: [
      rect(x, y, width, height, colors.panel, {
        lineColor: colors.line,
        lineWeight: 2,
        layer: 1
      })
    ],
    texts: [
      textBox(title, x + 0.12, 3.23, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        fontScale: 0.9
      }),
      textBox(note, x + 0.12, 0.37, {
        frame: "rounded rectangle",
        backgroundColor: "rgba(255,255,255,0.9)",
        width: 1.42,
        fontScale: 0.82
      })
    ]
  };
}

function vessel(x, y, width, height) {
  return rect(x, y, width, height, "transparent", {
    lineColor: "rgba(80,96,106,0.85)",
    lineWeight: 3,
    layer: 3
  });
}

function sceneModel(title, subtitle, sceneBuilder) {
  const scene = sceneBuilder();
  return {
    type: "md2d",
    imagePath: "",
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
      textBoxes: [
        textBox(title, 0.22, 3.82, {
          frame: "rounded rectangle",
          backgroundColor: colors.note,
          fontScale: 1.02
        }),
        textBox(subtitle, 0.22, 3.47, {
          width: 5.3,
          frame: "rounded rectangle",
          backgroundColor: "rgba(255,255,255,0.9)",
          fontScale: 0.86
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
    shapes: {
      type: scene.shapes.map((shape) => shape.type),
      x: scene.shapes.map((shape) => shape.x),
      y: scene.shapes.map((shape) => shape.y),
      height: scene.shapes.map((shape) => shape.height),
      width: scene.shapes.map((shape) => shape.width),
      fence: scene.shapes.map((shape) => shape.fence),
      color: scene.shapes.map((shape) => shape.color),
      lineColor: scene.shapes.map((shape) => shape.lineColor),
      lineWeight: scene.shapes.map((shape) => shape.lineWeight),
      lineDashes: scene.shapes.map((shape) => shape.lineDashes),
      layer: scene.shapes.map((shape) => shape.layer)
    }
  };
}

const scenes = {
  overview: sceneModel(
    "Mass & Change Evidence Suite",
    "Observable-level scenes only. Students should still need to invent and revise the particle model later.",
    () => {
      const shapes = [];
      const texts = [
        textBox("Use the selector at left to switch among the six Lesson 1 investigations.", 0.4, 3.0, {
          frame: "rounded rectangle",
          backgroundColor: "rgba(255,255,255,0.92)",
          width: 5,
          fontScale: 0.9
        })
      ];
      const cards = [
        [0.45, 2.1, "Steel wool\npulled apart"],
        [2.15, 2.1, "Ice to water"],
        [3.85, 2.1, "Precipitate"],
        [0.45, 0.95, "Steel wool\nburns"],
        [2.15, 0.95, "Sugar\ndissolves"],
        [3.85, 0.95, "Alka-Seltzer"]
      ];
      cards.forEach(([x, y, label]) => {
        shapes.push(rect(x, y, 1.35, 0.8, colors.panel, {
          lineColor: colors.line,
          lineWeight: 2,
          layer: 1
        }));
        texts.push(textBox(label, x + 0.18, y + 0.48, { fontScale: 0.9 }));
      });
      texts.push(textBox("Mass evidence comes first. Particle explanations come later.", 0.95, 0.35, {
        frame: "rounded rectangle",
        backgroundColor: colors.note,
        width: 4.1,
        fontScale: 0.88
      }));
      return { shapes, texts };
    }
  ),
  steelWool: sceneModel(
    "Steel wool pulled apart",
    "Students see the same material look bigger when spread out, and class-style runs can differ slightly when bits escape.",
    () => {
      const left = panel(0.35, "Compressed", "same steel wool");
      const right = panel(3.95, "Pulled apart", "same steel wool, spread out");
      const shapes = [
        ...left.shapes,
        ...right.shapes,
        ...bars(0.78, 1.42, 0.96, 8, 0.1, colors.steel),
        ...bars(4.22, 1.18, 0.48, 4, 0.22, colors.steel),
        ...bars(4.86, 1.08, 0.42, 3, 0.27, colors.steel),
        ...bars(4.1, 2.08, 0.55, 2, 0.25, colors.steel)
      ];
      const texts = [
        ...left.texts,
        ...right.texts,
        textBox("mass before: 1.02 g", 0.63, 0.95, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.82 }),
        textBox("typical after runs", 4.18, 1.02, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.82 }),
        textBox("Run 1  0.98 g", 4.22, 0.8, { frame: "rounded rectangle", backgroundColor: "rgba(255,255,255,0.9)", fontScale: 0.8 }),
        textBox("Run 2  1.01 g", 4.22, 0.56, { frame: "rounded rectangle", backgroundColor: "rgba(255,255,255,0.9)", fontScale: 0.8 }),
        textBox("Run 3  0.99 g", 4.22, 0.32, { frame: "rounded rectangle", backgroundColor: "rgba(255,255,255,0.9)", fontScale: 0.8 })
      ];
      return { shapes, texts };
    }
  ),
  iceToWater: sceneModel(
    "Ice to water",
    "The visible material changes state and volume, but the measured mass stays the same when the system is kept together.",
    () => {
      const left = panel(0.35, "Before: ice", "solid water");
      const right = panel(3.95, "After: water", "liquid water");
      const shapes = [
        ...left.shapes,
        ...right.shapes,
        vessel(0.86, 1.05, 0.95, 1.45),
        vessel(4.42, 1.05, 0.95, 1.45),
        rect(0.92, 1.12, 0.84, 1.18, colors.ice, { lineColor: "rgba(123,167,216,0.9)", lineWeight: 2, layer: 2 }),
        rect(4.48, 1.12, 0.84, 0.56, colors.water, { lineColor: "rgba(90,155,213,0.95)", lineWeight: 2, layer: 2 })
      ];
      const texts = [
        ...left.texts,
        ...right.texts,
        textBox("mass: 18.44 g", 0.68, 0.74, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.82 }),
        textBox("mass: 18.44 g", 4.28, 0.74, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.82 })
      ];
      return { shapes, texts };
    }
  ),
  precipitate: sceneModel(
    "Precipitate with two capped vials",
    "The lab flow matters here: weigh the closed system, pour, then weigh again after the visible solid appears.",
    () => {
      const first = panel(0.2, "Weigh (before)", "two capped vials");
      const second = panel(2.15, "Pour", "combine the contents");
      const third = panel(4.1, "Weigh (after)", "solid now visible");
      const shapes = [
        ...first.shapes,
        ...second.shapes,
        ...third.shapes,
        vessel(0.58, 1.12, 0.36, 1.2),
        vessel(1.18, 1.12, 0.36, 1.2),
        rect(0.62, 1.12, 0.28, 0.48, colors.water, { lineColor: colors.water, lineWeight: 1, layer: 2 }),
        rect(1.22, 1.12, 0.28, 0.48, "rgba(247,214,98,0.9)", { lineColor: "rgba(206,171,54,0.95)", lineWeight: 1, layer: 2 }),
        rect(0.58, 2.32, 0.36, 0.12, colors.cap, { lineColor: colors.cap, lineWeight: 1, layer: 2 }),
        rect(1.18, 2.32, 0.36, 0.12, colors.cap, { lineColor: colors.cap, lineWeight: 1, layer: 2 }),
        vessel(2.84, 1.05, 0.38, 1.28),
        vessel(3.45, 1.05, 0.72, 1.42),
        rect(2.94, 1.72, 0.17, 0.08, colors.water, { lineColor: colors.water, lineWeight: 1, layer: 2 }),
        rect(3.55, 1.12, 0.5, 0.58, colors.water, { lineColor: colors.water, lineWeight: 1, layer: 2 }),
        rect(3.18, 1.86, 0.3, 0.05, colors.vent, { lineColor: colors.vent, lineWeight: 1, layer: 2, lineDashes: "4,3" }),
        vessel(4.72, 1.05, 0.62, 1.45),
        rect(4.79, 1.12, 0.48, 0.56, colors.cloud, { lineColor: "rgba(120,130,136,0.8)", lineWeight: 1, layer: 2 }),
        rect(4.82, 1.12, 0.42, 0.16, colors.precipitate, { lineColor: "rgba(123,131,63,0.95)", lineWeight: 1, layer: 3 }),
        rect(4.72, 2.32, 0.62, 0.12, colors.cap, { lineColor: colors.cap, lineWeight: 1, layer: 3 })
      ];
      const texts = [
        ...first.texts,
        ...second.texts,
        ...third.texts,
        textBox("total mass: 41.26 g", 0.4, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 }),
        textBox("vials stay capped until after weighing", 2.34, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, width: 1.28, fontScale: 0.76 }),
        textBox("total mass: 41.26 g", 4.27, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 })
      ];
      return { shapes, texts };
    }
  ),
  burns: sceneModel(
    "Steel wool burns",
    "Open and closed-system evidence belongs side by side so students must ask what counted as the system in each case.",
    () => {
      const first = panel(0.2, "Before", "steel wool only");
      const second = panel(2.15, "Open", "burning in air");
      const third = panel(4.1, "Closed / capped", "whole system weighed");
      const shapes = [
        ...first.shapes,
        ...second.shapes,
        ...third.shapes,
        ...bars(0.6, 1.48, 0.82, 7, 0.1, colors.steel),
        rect(2.56, 1.25, 0.9, 0.74, colors.fire, { lineColor: colors.fire, lineWeight: 1, layer: 2 }),
        ...bars(2.7, 1.36, 0.66, 4, 0.12, colors.residue),
        vessel(4.58, 1.05, 0.62, 1.55),
        rect(4.58, 2.46, 0.62, 0.12, colors.cap, { lineColor: colors.cap, lineWeight: 1, layer: 3 }),
        ...bars(4.74, 1.3, 0.28, 4, 0.12, colors.residue),
        rect(4.9, 1.95, 0.08, 0.24, colors.fire, { lineColor: colors.fire, lineWeight: 1, layer: 2 })
      ];
      const texts = [
        ...first.texts,
        ...second.texts,
        ...third.texts,
        textBox("mass: 0.92 g", 0.45, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 }),
        textBox("mass after: 0.96 g", 2.37, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 }),
        textBox("whole system before: 18.74 g", 4.22, 0.92, { frame: "rounded rectangle", backgroundColor: colors.note, width: 1.32, fontScale: 0.72 }),
        textBox("whole system after: 18.74 g", 4.22, 0.62, { frame: "rounded rectangle", backgroundColor: colors.note, width: 1.32, fontScale: 0.72 })
      ];
      return { shapes, texts };
    }
  ),
  sugar: sceneModel(
    "Sugar dissolves",
    "The visible difference is how quickly the sugar disappears into the water, not a new particle picture.",
    () => {
      const first = panel(0.2, "Before", "water + sugar");
      const second = panel(2.15, "Not stirred", "some sugar still visible");
      const third = panel(4.1, "Stirred", "uniform-looking solution");
      const shapes = [
        ...first.shapes,
        ...second.shapes,
        ...third.shapes,
        vessel(0.62, 1.05, 0.92, 1.55),
        rect(0.68, 1.12, 0.8, 0.78, colors.water, { lineColor: colors.water, lineWeight: 1, layer: 2 }),
        rect(0.86, 1.12, 0.36, 0.14, colors.sugar, { lineColor: "rgba(189,168,118,0.95)", lineWeight: 1, layer: 3 }),
        vessel(2.56, 1.05, 0.92, 1.55),
        rect(2.62, 1.12, 0.8, 0.78, colors.water, { lineColor: colors.water, lineWeight: 1, layer: 2 }),
        rect(2.84, 1.12, 0.36, 0.16, colors.sugar, { lineColor: "rgba(189,168,118,0.95)", lineWeight: 1, layer: 3 }),
        vessel(4.5, 1.05, 0.92, 1.55),
        rect(4.56, 1.12, 0.8, 0.84, "rgba(125,190,255,0.78)", { lineColor: "rgba(90,155,213,0.9)", lineWeight: 1, layer: 2 }),
        rect(4.78, 1.52, 0.34, 0.04, "rgba(255,255,255,0.65)", { lineColor: "rgba(255,255,255,0.65)", lineWeight: 1, layer: 3, lineDashes: "5,3" }),
        rect(4.82, 1.72, 0.26, 0.04, "rgba(255,255,255,0.65)", { lineColor: "rgba(255,255,255,0.65)", lineWeight: 1, layer: 3, lineDashes: "5,3" })
      ];
      const texts = [
        ...first.texts,
        ...second.texts,
        ...third.texts,
        textBox("mass: 33.18 g", 0.45, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 }),
        textBox("mass: 33.18 g", 2.4, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 }),
        textBox("mass: 33.18 g", 4.35, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 })
      ];
      return { shapes, texts };
    }
  ),
  alka: sceneModel(
    "Alka-Seltzer",
    "The important contrast is whether the gas is allowed to leave the system or forced to stay part of it.",
    () => {
      const first = panel(0.2, "Before", "tablet + water");
      const second = panel(2.15, "Vented", "gas escapes");
      const third = panel(4.1, "Captured", "gas kept in system");
      const shapes = [
        ...first.shapes,
        ...second.shapes,
        ...third.shapes,
        vessel(0.62, 1.05, 0.92, 1.55),
        rect(0.68, 1.12, 0.8, 0.8, colors.water, { lineColor: colors.water, lineWeight: 1, layer: 2 }),
        rect(1.0, 1.18, 0.16, 0.22, colors.bubble, { lineColor: "rgba(160,160,160,0.8)", lineWeight: 1, layer: 3 }),
        vessel(2.56, 1.05, 0.92, 1.55),
        rect(2.62, 1.12, 0.8, 0.8, colors.water, { lineColor: colors.water, lineWeight: 1, layer: 2 }),
        ...dots(2.86, 2.0, 8, 0.14, 0.14, colors.bubble),
        rect(2.97, 2.5, 0.1, 0.35, colors.vent, { lineColor: colors.vent, lineWeight: 1, layer: 2 }),
        vessel(4.5, 1.05, 0.92, 1.55),
        rect(4.56, 1.12, 0.8, 0.8, colors.water, { lineColor: colors.water, lineWeight: 1, layer: 2 }),
        ...dots(4.82, 1.9, 6, 0.14, 0.14, colors.bubble),
        rect(4.66, 2.55, 0.6, 0.12, colors.cap, { lineColor: colors.cap, lineWeight: 1, layer: 3 }),
        rect(4.82, 2.67, 0.28, 0.42, "rgba(194,228,236,0.8)", { lineColor: colors.cap, lineWeight: 2, layer: 2 })
      ];
      const texts = [
        ...first.texts,
        ...second.texts,
        ...third.texts,
        textBox("mass: 26.40 g", 0.45, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 }),
        textBox("mass after: 26.12 g", 2.34, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 }),
        textBox("mass after: 26.40 g", 4.29, 0.72, { frame: "rounded rectangle", backgroundColor: colors.note, fontScale: 0.8 })
      ];
      return { shapes, texts };
    }
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

const interactive = {
  title: "Mass & Change Evidence Suite",
  publicationStatus: "public",
  subtitle: "Lesson 1 observable-level investigation scenes. Students should still need the particle model later.",
  about: "This suite stays at the visible evidence level on purpose. It uses Concord Lab as the interactive shell while delaying particle representations until the lesson sequence actually needs them.",
  models: [
    {
      type: "md2d",
      id: "overview",
      url: "../../../simulations/unit-01/lesson-01/mass-change/model.json",
      viewOptions: {
        controlButtons: "",
        enableAtomTooltips: false,
        gridLines: false,
        xunits: false,
        yunits: false
      }
    },
    {
      type: "md2d",
      id: "steel-wool-pulled-apart",
      url: "../../../simulations/unit-01/lesson-01/mass-change/models/steel-wool-pulled-apart.json",
      viewOptions: {
        controlButtons: "",
        enableAtomTooltips: false,
        gridLines: false,
        xunits: false,
        yunits: false
      }
    },
    {
      type: "md2d",
      id: "ice-to-water",
      url: "../../../simulations/unit-01/lesson-01/mass-change/models/ice-to-water.json",
      viewOptions: {
        controlButtons: "",
        enableAtomTooltips: false,
        gridLines: false,
        xunits: false,
        yunits: false
      }
    },
    {
      type: "md2d",
      id: "precipitate",
      url: "../../../simulations/unit-01/lesson-01/mass-change/models/precipitate.json",
      viewOptions: {
        controlButtons: "",
        enableAtomTooltips: false,
        gridLines: false,
        xunits: false,
        yunits: false
      }
    },
    {
      type: "md2d",
      id: "steel-wool-burns",
      url: "../../../simulations/unit-01/lesson-01/mass-change/models/steel-wool-burns.json",
      viewOptions: {
        controlButtons: "",
        enableAtomTooltips: false,
        gridLines: false,
        xunits: false,
        yunits: false
      }
    },
    {
      type: "md2d",
      id: "sugar-dissolves",
      url: "../../../simulations/unit-01/lesson-01/mass-change/models/sugar-dissolves.json",
      viewOptions: {
        controlButtons: "",
        enableAtomTooltips: false,
        gridLines: false,
        xunits: false,
        yunits: false
      }
    },
    {
      type: "md2d",
      id: "alka-seltzer",
      url: "../../../simulations/unit-01/lesson-01/mass-change/models/alka-seltzer.json",
      viewOptions: {
        controlButtons: "",
        enableAtomTooltips: false,
        gridLines: false,
        xunits: false,
        yunits: false
      }
    }
  ],
  components: [
    {
      type: "text",
      id: "suite-note",
      text: "Use the selector to switch among the six observable-level investigation scenes. No particle view yet."
    },
    {
      type: "radio",
      id: "investigation-selector",
      label: "Investigation",
      options: [
        { text: "Overview", loadModel: "overview", selected: true },
        { text: "Steel wool pulled apart", loadModel: "steel-wool-pulled-apart" },
        { text: "Ice to water", loadModel: "ice-to-water" },
        { text: "Precipitate", loadModel: "precipitate" },
        { text: "Steel wool burns", loadModel: "steel-wool-burns" },
        { text: "Sugar dissolves", loadModel: "sugar-dissolves" },
        { text: "Alka-Seltzer", loadModel: "alka-seltzer" }
      ]
    }
  ],
  layout: {
    left: [
      ["suite-note"],
      ["investigation-selector"]
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

writeJson(join(suiteRoot, "interactive.json"), interactive);