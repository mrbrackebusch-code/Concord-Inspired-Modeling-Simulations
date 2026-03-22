import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { ensureVesselAssets } from "./lib/vessel-assets.mjs";

const root = resolve(process.cwd());
const suiteRoot = join(root, "simulations", "unit-01", "lesson-01", "mass-change");
const assetsRoot = join(suiteRoot, "assets");
const statesRoot = join(suiteRoot, "states");
const interactivesRoot = join(suiteRoot, "interactives");

ensureVesselAssets(assetsRoot);

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function withBlankScale(state) {
  const next = clone(state);
  if (next.viewOptions?.images?.[0]) {
    next.viewOptions.images[0].imageUri = "balance-scale-zero.svg";
  }
  return next;
}

function interactiveModel(id, url, controlButtons, onLoad = []) {
  return {
    type: "md2d",
    id,
    url,
    viewOptions: {
      controlButtons,
      enableAtomTooltips: false,
      gridLines: false,
      xunits: false,
      yunits: false,
      showClock: false
    },
    ...(onLoad.length ? { onLoad } : {})
  };
}

const precipitateBefore = readJson(join(statesRoot, "precipitate-before.json"));
const precipitateAfter = readJson(join(statesRoot, "precipitate-after.json"));

writeJson(join(statesRoot, "precipitate-ready.json"), withBlankScale(precipitateBefore));
writeJson(join(statesRoot, "precipitate-after-ready.json"), withBlankScale(precipitateAfter));

const iceInteractive = {
  title: "Ice to water",
  publicationStatus: "draft",
  subtitle: "Press play, watch the clock, and let the melting run on its own.",
  about: "This interactive now uses time-driven behavior instead of manual step-picking.",
  parameters: [
    {
      name: "iceClockSeconds",
      initialValue: 0
    }
  ],
  models: [
    interactiveModel("ice-before-live", "../../../simulations/unit-01/lesson-01/mass-change/states/ice-before.json", "play", [
      "set('iceClockSeconds', 0);",
      "setComponentDisabled('ice-reset-button', true);",
      "callEvery(50, function () {",
      "  set('iceClockSeconds', Math.min(4, Math.floor(get('time') / 50)));",
      "});",
      "callAt(225, function () {",
      "  loadModel('ice-melting-live', function () {",
      "    start();",
      "  });",
      "});",
      "onStart(function () {",
      "  setComponentDisabled('ice-reset-button', true);",
      "});",
      "onStop(function () {",
      "  setComponentDisabled('ice-reset-button', false);",
      "});"
    ]),
    interactiveModel("ice-melting-live", "../../../simulations/unit-01/lesson-01/mass-change/states/ice-melting.json", "play", [
      "setComponentDisabled('ice-reset-button', true);",
      "callEvery(50, function () {",
      "  set('iceClockSeconds', 4 + Math.min(4, Math.floor(get('time') / 50)));",
      "});",
      "callAt(225, function () {",
      "  loadModel('ice-after-live', function () {",
      "    set('iceClockSeconds', 8);",
      "    stop();",
      "  });",
      "});",
      "onStart(function () {",
      "  setComponentDisabled('ice-reset-button', true);",
      "});",
      "onStop(function () {",
      "  setComponentDisabled('ice-reset-button', false);",
      "});"
    ]),
    interactiveModel("ice-after-live", "../../../simulations/unit-01/lesson-01/mass-change/states/ice-after.json", "reset", [
      "set('iceClockSeconds', 8);",
      "setComponentDisabled('ice-reset-button', false);",
      "stop();"
    ])
  ],
  components: [
    {
      type: "text",
      id: "ice-note",
      text: "Press play and watch the clock while the ice melts."
    },
    {
      type: "text",
      id: "ice-clock-label",
      text: "Clock"
    },
    {
      type: "numericOutput",
      id: "ice-clock-output",
      property: "iceClockSeconds",
      units: "s",
      width: "5em"
    },
    {
      type: "button",
      id: "ice-reset-button",
      text: "Reset",
      action: [
        "set('iceClockSeconds', 0);",
        "loadModel('ice-before-live');"
      ],
      disabled: true
    }
  ],
  layout: {
    left: [
      ["ice-note"],
      ["ice-clock-label", "ice-clock-output"],
      ["ice-reset-button"]
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

const precipitateInteractive = {
  title: "Precipitate",
  publicationStatus: "draft",
  subtitle: "Weigh it, run the pour, then weigh it again.",
  about: "This interactive now treats the pour as an action instead of a manual state jump.",
  models: [
    interactiveModel("precipitate-ready-step", "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-ready.json", "", [
      "setComponentDisabled('precipitate-before-button', false);",
      "setComponentDisabled('precipitate-pour-button', true);",
      "setComponentDisabled('precipitate-after-button', true);",
      "setComponentDisabled('precipitate-reset-button', true);"
    ]),
    interactiveModel("precipitate-before-measured", "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-before.json", "", [
      "setComponentDisabled('precipitate-before-button', true);",
      "setComponentDisabled('precipitate-pour-button', false);",
      "setComponentDisabled('precipitate-after-button', true);",
      "setComponentDisabled('precipitate-reset-button', false);"
    ]),
    interactiveModel("precipitate-pour-live", "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-pour.json", "", [
      "setComponentDisabled('precipitate-before-button', true);",
      "setComponentDisabled('precipitate-pour-button', true);",
      "setComponentDisabled('precipitate-after-button', true);",
      "setComponentDisabled('precipitate-reset-button', true);",
      "callAt(180, function () {",
      "  loadModel('precipitate-after-ready');",
      "});",
      "onStart(function () {",
      "  setComponentDisabled('precipitate-before-button', true);",
      "  setComponentDisabled('precipitate-pour-button', true);",
      "  setComponentDisabled('precipitate-after-button', true);",
      "  setComponentDisabled('precipitate-reset-button', true);",
      "});"
    ]),
    interactiveModel("precipitate-after-ready", "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-after-ready.json", "", [
      "setComponentDisabled('precipitate-before-button', true);",
      "setComponentDisabled('precipitate-pour-button', true);",
      "setComponentDisabled('precipitate-after-button', false);",
      "setComponentDisabled('precipitate-reset-button', false);"
    ]),
    interactiveModel("precipitate-after-measured", "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-after.json", "", [
      "setComponentDisabled('precipitate-before-button', true);",
      "setComponentDisabled('precipitate-pour-button', true);",
      "setComponentDisabled('precipitate-after-button', true);",
      "setComponentDisabled('precipitate-reset-button', false);"
    ])
  ],
  components: [
    {
      type: "text",
      id: "precipitate-note",
      text: "Use the actual sequence: weigh before, pour, then weigh after."
    },
    {
      type: "button",
      id: "precipitate-before-button",
      text: "Weigh (before)",
      action: "loadModel('precipitate-before-measured');"
    },
    {
      type: "button",
      id: "precipitate-pour-button",
      text: "Pour",
      action: [
        "setComponentDisabled('precipitate-before-button', true);",
        "setComponentDisabled('precipitate-pour-button', true);",
        "setComponentDisabled('precipitate-after-button', true);",
        "setComponentDisabled('precipitate-reset-button', true);",
        "loadModel('precipitate-pour-live', function () {",
        "  start();",
        "});"
      ],
      disabled: true
    },
    {
      type: "button",
      id: "precipitate-after-button",
      text: "Weigh (after)",
      action: "loadModel('precipitate-after-measured');",
      disabled: true
    },
    {
      type: "button",
      id: "precipitate-reset-button",
      text: "Reset",
      action: "loadModel('precipitate-ready-step');",
      disabled: true
    }
  ],
  layout: {
    left: [
      ["precipitate-note"],
      ["precipitate-before-button"],
      ["precipitate-pour-button"],
      ["precipitate-after-button"],
      ["precipitate-reset-button"]
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

writeJson(join(interactivesRoot, "ice-to-water.json"), iceInteractive);
writeJson(join(interactivesRoot, "precipitate.json"), precipitateInteractive);
