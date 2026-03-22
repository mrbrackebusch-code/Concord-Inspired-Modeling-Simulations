import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { ensureVesselAssets } from "./lib/vessel-assets.mjs";

const root = resolve(process.cwd());
const suiteRoot = join(root, "simulations", "unit-01", "lesson-01", "mass-change");
const assetsRoot = join(suiteRoot, "assets");
const statesRoot = join(suiteRoot, "states");
const interactivesRoot = join(suiteRoot, "interactives");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function writeText(path, data) {
  writeFileSync(path, `${data}\n`, "utf8");
}

const animatedIceSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="132" viewBox="0 0 96 132">
  <defs>
    <clipPath id="beakerInterior">
      <path d="M28 22h40v88c0 6-4 10-10 10H38c-6 0-10-4-10-10V22Z"/>
    </clipPath>
    <linearGradient id="cube" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f2fbff"/>
      <stop offset="1" stop-color="#9ecbf0"/>
    </linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c7e7fb"/>
      <stop offset="1" stop-color="#83bde7"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#beakerInterior)">
    <rect x="28" y="92" width="40" height="20" rx="4" fill="url(#water)" opacity="0.84">
      <animate attributeName="y" values="92;82;74;70" dur="4.2s" fill="freeze"/>
      <animate attributeName="height" values="20;30;38;42" dur="4.2s" fill="freeze"/>
    </rect>
    <ellipse cx="48" cy="92" rx="18" ry="3.4" fill="#edf8ff" opacity="0.52">
      <animate attributeName="cy" values="92;82;74;70" dur="4.2s" fill="freeze"/>
      <animate attributeName="rx" values="16;17;18;18" dur="4.2s" fill="freeze"/>
    </ellipse>
    <g opacity="0.94">
      <path d="M31 78l15-9 15 9-15 9Z" fill="url(#cube)" stroke="#83b7de" stroke-width="1.4"/>
      <path d="M31 78v16l15 9V87Z" fill="#bfe0f6" stroke="#83b7de" stroke-width="1.2"/>
      <path d="M61 78v16l-15 9V87Z" fill="#9cc9eb" stroke="#83b7de" stroke-width="1.2"/>
      <path d="M47 74l15-9 15 9-15 9Z" fill="url(#cube)" stroke="#83b7de" stroke-width="1.4"/>
      <path d="M47 74v16l15 9V83Z" fill="#c6e4f7" stroke="#83b7de" stroke-width="1.2"/>
      <path d="M77 74v16l-15 9V83Z" fill="#a6d0ef" stroke="#83b7de" stroke-width="1.2"/>
      <path d="M39 71l13-8 13 8-13 8Z" fill="url(#cube)" stroke="#83b7de" stroke-width="1.2"/>
      <path d="M39 71v14l13 8V79Z" fill="#d2ecfb" stroke="#83b7de" stroke-width="1.1"/>
      <path d="M65 71v14l-13 8V79Z" fill="#b4daf4" stroke="#83b7de" stroke-width="1.1"/>
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 7; 0 13" dur="4.2s" fill="freeze"/>
      <animateTransform attributeName="transform" additive="sum" type="scale" values="1 1; 0.82 0.74; 0.6 0.45" dur="4.2s" fill="freeze"/>
      <animate attributeName="opacity" values="0.94;0.78;0.46;0.16" dur="4.2s" fill="freeze"/>
    </g>
    <path d="M34 80c6 6 14 8 24 7" fill="none" stroke="#e5f6ff" stroke-width="2" stroke-linecap="round" opacity="0.08">
      <animate attributeName="opacity" values="0.08;0.32;0.54;0.62" dur="4.2s" fill="freeze"/>
    </path>
    <path d="M36 89c7 4 14 5 22 4" fill="none" stroke="#deeffb" stroke-width="1.8" stroke-linecap="round" opacity="0.04">
      <animate attributeName="opacity" values="0.04;0.24;0.38;0.46" dur="4.2s" fill="freeze"/>
    </path>
  </g>
  <path d="M18 10h60" fill="none" stroke="#5b7180" stroke-width="4" stroke-linecap="round"/>
  <path d="M24 10v102c0 5 4 10 10 10h28c6 0 10-5 10-10V10" fill="none" stroke="#748a98" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M28 20h40" fill="none" stroke="#d8eef9" stroke-opacity="0.75" stroke-width="2.5"/>
  <path d="M34 30h28" fill="none" stroke="#d8eef9" stroke-opacity="0.5" stroke-width="1.6"/>
</svg>`;

const animatedPrecipitateSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="106" height="148" viewBox="0 0 106 148">
  <defs>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eef8ff" stop-opacity="0.68"/>
      <stop offset="1" stop-color="#cfe4ef" stop-opacity="0.4"/>
    </linearGradient>
    <clipPath id="uprightInterior">
      <path d="M20 24h24v82c0 7-5 12-12 12s-12-5-12-12V24Z"/>
    </clipPath>
    <clipPath id="receiverInterior">
      <path d="M64 24h24v82c0 7-5 12-12 12s-12-5-12-12V24Z"/>
    </clipPath>
    <clipPath id="tiltedInterior">
      <path d="M-12 -46h28v86c0 8-6 14-14 14s-14-6-14-14V-46Z"/>
    </clipPath>
  </defs>
  <g clip-path="url(#uprightInterior)" opacity="0.95">
    <rect x="20" y="82" width="24" height="32" rx="4" fill="#a9d9f4" opacity="0.84"/>
    <ellipse cx="32" cy="82" rx="10" ry="3.5" fill="#e7f6fe" opacity="0.4"/>
  </g>
  <rect x="18" y="8" width="28" height="12" rx="4" fill="#5f7780"/>
  <path d="M16 20h32v90c0 8-6 14-14 14h-4c-8 0-14-6-14-14V20Z" fill="url(#glass)" stroke="#738a97" stroke-width="4" stroke-linejoin="round"/>

  <g clip-path="url(#receiverInterior)">
    <rect x="64" y="96" width="24" height="16" rx="4" fill="#f4f6df" opacity="0.66">
      <animate attributeName="y" values="96;90;82;76" dur="3.8s" fill="freeze"/>
      <animate attributeName="height" values="16;22;30;36" dur="3.8s" fill="freeze"/>
    </rect>
    <path d="M65 98c7 6 13 8 22 8" fill="none" stroke="#cfd6b1" stroke-width="3" stroke-linecap="round" opacity="0">
      <animate attributeName="opacity" values="0;0;0.35;0.72" dur="3.8s" fill="freeze"/>
    </path>
    <ellipse cx="76" cy="112" rx="10" ry="3.5" fill="#a0a868" opacity="0">
      <animate attributeName="cy" values="112;108;104;100" dur="3.8s" fill="freeze"/>
      <animate attributeName="opacity" values="0;0.18;0.52;0.9" dur="3.8s" fill="freeze"/>
    </ellipse>
  </g>
  <rect x="62" y="8" width="28" height="12" rx="4" fill="#5f7780" opacity="0.86"/>
  <path d="M60 20h32v90c0 8-6 14-14 14h-4c-8 0-14-6-14-14V20Z" fill="url(#glass)" stroke="#738a97" stroke-width="4" stroke-linejoin="round"/>

  <g transform="translate(72 54)">
    <animateTransform attributeName="transform" type="translate" values="72 54; 66 48; 60 42; 60 42" dur="3.8s" fill="freeze"/>
    <animateTransform attributeName="transform" additive="sum" type="rotate" values="0; -16; -34; -36" dur="3.8s" fill="freeze"/>
    <g clip-path="url(#tiltedInterior)">
      <path d="M-8 0h16c4 0 7 3 7 7v25c0 8-5 14-13 14h-3c-8 0-13-6-13-14V7c0-4 3-7 6-7Z" fill="#ffe4a8" opacity="0.88">
        <animate attributeName="d" values="M-8 0h16c4 0 7 3 7 7v25c0 8-5 14-13 14h-3c-8 0-13-6-13-14V7c0-4 3-7 6-7Z;M-4 6h12c4 0 7 3 7 7v18c0 8-5 14-13 14h-3c-8 0-13-6-13-14V13c0-4 3-7 6-7Z;M0 14h8c4 0 7 3 7 7v10c0 8-5 14-13 14h-3c-8 0-13-6-13-14V21c0-4 3-7 6-7Z;M4 22h4c4 0 7 3 7 7v2c0 8-5 14-13 14h-3c-8 0-13-6-13-14V29c0-4 3-7 6-7Z" dur="3.8s" fill="freeze"/>
      </path>
      <ellipse cx="1" cy="1" rx="11" ry="3.4" fill="#fff3ca" opacity="0.55">
        <animate attributeName="opacity" values="0.55;0.4;0.18;0" dur="3.8s" fill="freeze"/>
      </ellipse>
    </g>
    <rect x="-10" y="-58" width="24" height="12" rx="4" fill="#5f7780"/>
    <path d="M-14 -46h32v90c0 8-6 14-14 14h-4c-8 0-14-6-14-14v-90Z" fill="url(#glass)" stroke="#738a97" stroke-width="4" stroke-linejoin="round"/>
  </g>

  <path d="M66 70C70 78 73 86 76 94" fill="none" stroke="#f3d086" stroke-width="5" stroke-linecap="round" opacity="0">
    <animate attributeName="opacity" values="0;0;0.9;0.65;0" keyTimes="0;0.18;0.38;0.72;1" dur="3.8s" fill="freeze"/>
  </path>
</svg>`;

writeText(join(assetsRoot, "beaker-ice-melting.svg"), animatedIceSvg);
writeText(join(assetsRoot, "precipitate-pour.svg"), animatedPrecipitateSvg);
ensureVesselAssets(assetsRoot);

const iceInteractive = {
  "title": "Ice to water",
  "publicationStatus": "draft",
  "subtitle": "Press play, watch the clock, and let the melting run on its own.",
  "about": "Play starts a visible melting process instead of jumping between frozen boards.",
  "parameters": [
    {
      "name": "iceClockSeconds",
      "initialValue": 0
    },
    {
      "name": "iceRunToken",
      "initialValue": 0
    }
  ],
  "models": [
    {
      "type": "md2d",
      "id": "ice-before-live",
      "url": "../../../simulations/unit-01/lesson-01/mass-change/states/ice-before.json",
      "viewOptions": {
        "controlButtons": "play",
        "enableAtomTooltips": false,
        "gridLines": false,
        "xunits": false,
        "yunits": false,
        "showClock": false
      },
      "onLoad": [
        "set('iceRunToken', get('iceRunToken') + 1);",
        "set('iceClockSeconds', 0);",
        "setComponentDisabled('ice-reset-button', true);",
        "onStart(function () {",
        "  set('iceRunToken', get('iceRunToken') + 1);",
        "  loadModel('ice-melting-live', function () {",
        "    start();",
        "  });",
        "});"
      ]
    },
    {
      "type": "md2d",
      "id": "ice-melting-live",
      "url": "../../../simulations/unit-01/lesson-01/mass-change/states/ice-melting.json",
      "viewOptions": {
        "controlButtons": "",
        "enableAtomTooltips": false,
        "gridLines": false,
        "xunits": false,
        "yunits": false,
        "showClock": false
      },
      "onLoad": [
        "setComponentDisabled('ice-reset-button', true);",
        "callEvery(50, function () {",
        "  set('iceClockSeconds', Math.min(8, Math.floor(get('time') / 50)));",
        "});",
        "onStart(function () {",
        "  var runToken = get('iceRunToken');",
        "  callAt(405, function () {",
        "    if (get('iceRunToken') !== runToken) { return; }",
        "    loadModel('ice-after-live', function () {",
        "      set('iceClockSeconds', 8);",
        "      stop();",
        "    });",
        "  });",
        "});"
      ]
    },
    {
      "type": "md2d",
      "id": "ice-after-live",
      "url": "../../../simulations/unit-01/lesson-01/mass-change/states/ice-after.json",
      "viewOptions": {
        "controlButtons": "reset",
        "enableAtomTooltips": false,
        "gridLines": false,
        "xunits": false,
        "yunits": false,
        "showClock": false
      },
      "onLoad": [
        "set('iceRunToken', get('iceRunToken') + 1);",
        "set('iceClockSeconds', 8);",
        "setComponentDisabled('ice-reset-button', false);",
        "stop();"
      ]
    }
  ],
  "components": [
    {
      "type": "text",
      "id": "ice-note",
      "text": "Press play and watch the clock while the ice melts."
    },
    {
      "type": "text",
      "id": "ice-clock-label",
      "text": "Clock"
    },
    {
      "type": "numericOutput",
      "id": "ice-clock-output",
      "property": "iceClockSeconds",
      "units": "s",
      "width": "5em"
    },
    {
      "type": "button",
      "id": "ice-reset-button",
      "text": "Reset",
      "action": [
        "set('iceRunToken', get('iceRunToken') + 1);",
        "set('iceClockSeconds', 0);",
        "loadModel('ice-before-live');"
      ],
      "disabled": true
    }
  ],
  "layout": {
    "left": [
      [
        "ice-note"
      ],
      [
        "ice-clock-label",
        "ice-clock-output"
      ],
      [
        "ice-reset-button"
      ]
    ]
  },
  "template": [
    {
      "id": "left",
      "top": "3em",
      "right": "model.left",
      "padding-right": "0.75em",
      "align": "right",
      "width": "14em"
    }
  ]
};

const precipitateInteractive = {
  "title": "Precipitate",
  "publicationStatus": "draft",
  "subtitle": "Weigh it, run the pour, then weigh it again.",
  "about": "The pour is now a visible motion step, not a frozen panel swap.",
  "models": [
    {
      "type": "md2d",
      "id": "precipitate-ready-step",
      "url": "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-ready.json",
      "viewOptions": {
        "controlButtons": "",
        "enableAtomTooltips": false,
        "gridLines": false,
        "xunits": false,
        "yunits": false,
        "showClock": false
      },
      "onLoad": [
        "set('precipitateRunToken', get('precipitateRunToken') + 1);",
        "setComponentDisabled('precipitate-before-button', false);",
        "setComponentDisabled('precipitate-pour-button', true);",
        "setComponentDisabled('precipitate-after-button', true);",
        "setComponentDisabled('precipitate-reset-button', true);"
      ]
    },
    {
      "type": "md2d",
      "id": "precipitate-before-measured",
      "url": "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-before.json",
      "viewOptions": {
        "controlButtons": "",
        "enableAtomTooltips": false,
        "gridLines": false,
        "xunits": false,
        "yunits": false,
        "showClock": false
      },
      "onLoad": [
        "set('precipitateRunToken', get('precipitateRunToken') + 1);",
        "setComponentDisabled('precipitate-before-button', true);",
        "setComponentDisabled('precipitate-pour-button', false);",
        "setComponentDisabled('precipitate-after-button', true);",
        "setComponentDisabled('precipitate-reset-button', false);"
      ]
    },
    {
      "type": "md2d",
      "id": "precipitate-pour-live",
      "url": "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-pour.json",
      "viewOptions": {
        "controlButtons": "",
        "enableAtomTooltips": false,
        "gridLines": false,
        "xunits": false,
        "yunits": false,
        "showClock": false
      },
      "onLoad": [
        "setComponentDisabled('precipitate-before-button', true);",
        "setComponentDisabled('precipitate-pour-button', true);",
        "setComponentDisabled('precipitate-after-button', true);",
        "setComponentDisabled('precipitate-reset-button', true);",
        "onStart(function () {",
        "  var runToken = get('precipitateRunToken');",
        "  callAt(190, function () {",
        "    if (get('precipitateRunToken') !== runToken) { return; }",
        "    loadModel('precipitate-after-ready');",
        "  });",
        "});"
      ]
    },
    {
      "type": "md2d",
      "id": "precipitate-after-ready",
      "url": "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-after-ready.json",
      "viewOptions": {
        "controlButtons": "",
        "enableAtomTooltips": false,
        "gridLines": false,
        "xunits": false,
        "yunits": false,
        "showClock": false
      },
      "onLoad": [
        "set('precipitateRunToken', get('precipitateRunToken') + 1);",
        "setComponentDisabled('precipitate-before-button', true);",
        "setComponentDisabled('precipitate-pour-button', true);",
        "setComponentDisabled('precipitate-after-button', false);",
        "setComponentDisabled('precipitate-reset-button', false);"
      ]
    },
    {
      "type": "md2d",
      "id": "precipitate-after-measured",
      "url": "../../../simulations/unit-01/lesson-01/mass-change/states/precipitate-after.json",
      "viewOptions": {
        "controlButtons": "",
        "enableAtomTooltips": false,
        "gridLines": false,
        "xunits": false,
        "yunits": false,
        "showClock": false
      },
      "onLoad": [
        "set('precipitateRunToken', get('precipitateRunToken') + 1);",
        "setComponentDisabled('precipitate-before-button', true);",
        "setComponentDisabled('precipitate-pour-button', true);",
        "setComponentDisabled('precipitate-after-button', true);",
        "setComponentDisabled('precipitate-reset-button', false);"
      ]
    }
  ],
  "components": [
    {
      "type": "text",
      "id": "precipitate-note",
      "text": "Use the actual sequence: weigh before, pour, then weigh after."
    },
    {
      "type": "button",
      "id": "precipitate-before-button",
      "text": "Weigh (before)",
      "action": "loadModel('precipitate-before-measured');"
    },
    {
      "type": "button",
      "id": "precipitate-pour-button",
      "text": "Pour",
      "action": [
        "set('precipitateRunToken', get('precipitateRunToken') + 1);",
        "setComponentDisabled('precipitate-before-button', true);",
        "setComponentDisabled('precipitate-pour-button', true);",
        "setComponentDisabled('precipitate-after-button', true);",
        "setComponentDisabled('precipitate-reset-button', true);",
        "loadModel('precipitate-pour-live', function () {",
        "  start();",
        "});"
      ],
      "disabled": true
    },
    {
      "type": "button",
      "id": "precipitate-after-button",
      "text": "Weigh (after)",
      "action": "loadModel('precipitate-after-measured');",
      "disabled": true
    },
    {
      "type": "button",
      "id": "precipitate-reset-button",
      "text": "Reset",
      "action": [
        "set('precipitateRunToken', get('precipitateRunToken') + 1);",
        "loadModel('precipitate-ready-step');"
      ],
      "disabled": true
    }
  ],
  "layout": {
    "left": [
      [
        "precipitate-note"
      ],
      [
        "precipitate-before-button"
      ],
      [
        "precipitate-pour-button"
      ],
      [
        "precipitate-after-button"
      ],
      [
        "precipitate-reset-button"
      ]
    ]
  },
  "template": [
    {
      "id": "left",
      "top": "3em",
      "right": "model.left",
      "padding-right": "0.75em",
      "align": "right",
      "width": "14em"
    }
  ],
  "parameters": [
    {
      "name": "precipitateRunToken",
      "initialValue": 0
    }
  ]
};

writeJson(join(interactivesRoot, "ice-to-water.json"), iceInteractive);
writeJson(join(interactivesRoot, "precipitate.json"), precipitateInteractive);
