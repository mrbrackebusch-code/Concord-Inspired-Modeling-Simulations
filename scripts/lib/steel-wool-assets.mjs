import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SOURCE_RELATIVE_PATH = "source-candidates/openclipart-steel-wool-pad.svg";
let cachedSourceTemplate;

const compactSilhouette = "M11 34 C8 23 13 13 27 10 C45 5 67 8 79 14 C86 18 88 30 83 38 C77 47 58 51 33 50 C18 49 12 44 11 34 Z";
const looseSilhouette = "M8 33 C6 22 13 13 28 10 C49 5 76 7 89 16 C95 20 97 32 91 41 C84 52 56 54 31 52 C17 50 9 44 8 33 Z";
const fragmentSilhouette = "M8 29 C6 20 11 12 21 9 C34 5 50 9 56 17 C61 24 59 34 50 40 C40 46 21 46 12 39 C9 36 8 33 8 29 Z";

function loadSourceTemplate(assetsRoot) {
  if (!cachedSourceTemplate) {
    cachedSourceTemplate = readFileSync(join(assetsRoot, SOURCE_RELATIVE_PATH), "utf8")
      .replace(/^\uFEFF/, "")
      .replace(/^\s*<\?xml[\s\S]*?\?>\s*/i, "")
      .replace(/<!--[\s\S]*?-->\s*/g, "")
      .replace(/<sodipodi:namedview\b[\s\S]*?\/>\s*/gi, "")
      .replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview\s*>\s*/gi, "")
      .replace(/<metadata[\s\S]*?<\/metadata\s*>\s*/gi, "")
      .replace(/\s+xmlns(?::[\w-]+)?="[^"]*"/g, "")
      .replace(/\s+(?:inkscape|sodipodi|rdf|cc|dc|svg|ns1):[\w-]+="[^"]*"/g, "")
      .replace(/<\/?[\w-]+:[\w-]+\b[^>]*>\s*/g, "")
      .replace(/<svg\b[^>]*>/i, "__STEEL_WOOL_OPEN__")
      .replace(/<\/svg\s*>/i, "__STEEL_WOOL_CLOSE__");
  }
  return cachedSourceTemplate;
}

function renderSource(assetsRoot, attrs = "") {
  const openTag = attrs ? `<g ${attrs}>` : "<g>";
  return loadSourceTemplate(assetsRoot)
    .replace("__STEEL_WOOL_OPEN__", openTag)
    .replace("__STEEL_WOOL_CLOSE__", "</g>");
}

function assetShell({ width, height, viewBox, defs = "", source = "", overlay = "" }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="${viewBox}">
  <defs>
    ${defs}
  </defs>
  ${source}
  ${overlay}
</svg>
`;
}

function commonDefs(pathData) {
  return `
    <filter id="softShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="1.25" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.15 0 0 0 0 0.17 0 0 0 0 0.18 0 0 0 0.28 0" result="shadow"/>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <clipPath id="woolClip">
      <path d="${pathData}"/>
    </clipPath>
    <linearGradient id="coolTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eff4f6" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#cfd7da" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="deepShade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#495154" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#252a2c" stop-opacity="0.32"/>
    </linearGradient>`;
}

function compactSvg(assetsRoot) {
  return assetShell({
    width: 92,
    height: 58,
    viewBox: "0 0 92 58",
    defs: commonDefs(compactSilhouette),
    source: renderSource(assetsRoot, 'transform="translate(7 3) scale(0.247)" clip-path="url(#woolClip)" filter="url(#softShadow)"'),
    overlay: `
      <path d="${compactSilhouette}" fill="url(#deepShade)" opacity="0.52"/>
      <path d="M17 19 C25 14 40 12 55 15 C65 17 74 22 78 29" fill="none" stroke="#f4f8fa" stroke-opacity="0.36" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M15 38 C24 44 42 46 59 42 C70 39 77 34 81 28" fill="none" stroke="#576064" stroke-opacity="0.28" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M11 34 C8 23 13 13 27 10 C45 5 67 8 79 14 C86 18 88 30 83 38" fill="none" stroke="#5a6163" stroke-opacity="0.24" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M15 11 C12 14 10 19 10 23" fill="none" stroke="#7b8386" stroke-opacity="0.55" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M80 13 C84 16 86 20 87 25" fill="none" stroke="#7b8386" stroke-opacity="0.45" stroke-width="1.05" stroke-linecap="round"/>
      <path d="${compactSilhouette}" fill="url(#coolTop)" opacity="0.8"/>`
  });
}

function looseSvg(assetsRoot) {
  return assetShell({
    width: 104,
    height: 60,
    viewBox: "0 0 104 60",
    defs: commonDefs(looseSilhouette),
    source: renderSource(assetsRoot, 'transform="translate(1 7) scale(0.31 0.225)" clip-path="url(#woolClip)" filter="url(#softShadow)"'),
    overlay: `
      <path d="${looseSilhouette}" fill="url(#deepShade)" opacity="0.48"/>
      <g fill="none" stroke="#626a6d" stroke-opacity="0.78" stroke-linecap="round">
        <path d="M10 18 C18 15 26 14 32 17" stroke-width="1.15"/>
        <path d="M18 48 C27 44 39 43 50 47" stroke-width="1.05"/>
        <path d="M78 12 C86 14 92 19 96 26" stroke-width="1.05"/>
        <path d="M83 46 C88 42 93 36 95 31" stroke-width="1.05"/>
        <path d="M34 10 C41 7 51 6 60 8" stroke-width="1.2"/>
      </g>
      <g fill="none" stroke="#d9dfe1" stroke-opacity="0.58" stroke-linecap="round">
        <path d="M21 16 C36 12 53 13 71 18" stroke-width="1.3"/>
        <path d="M23 43 C38 48 57 48 74 42" stroke-width="1.15"/>
      </g>
      <path d="M26 14 C32 20 40 25 50 30 C60 35 72 38 85 38" fill="none" stroke="#edf3f5" stroke-opacity="0.22" stroke-width="1.6" stroke-linecap="round"/>
      <path d="${looseSilhouette}" fill="url(#coolTop)" opacity="0.74"/>`
  });
}

function fragmentSvg(assetsRoot) {
  return assetShell({
    width: 64,
    height: 50,
    viewBox: "0 0 64 50",
    defs: commonDefs(fragmentSilhouette),
    source: renderSource(assetsRoot, 'transform="translate(2 2) scale(0.19)" clip-path="url(#woolClip)" filter="url(#softShadow)"'),
    overlay: `
      <path d="${fragmentSilhouette}" fill="url(#deepShade)" opacity="0.45"/>
      <path d="M13 13 C20 11 29 12 37 15" fill="none" stroke="#edf2f4" stroke-opacity="0.35" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M14 38 C20 42 31 42 42 38" fill="none" stroke="#576064" stroke-opacity="0.25" stroke-width="1.05" stroke-linecap="round"/>
      <g fill="none" stroke="#697274" stroke-opacity="0.72" stroke-linecap="round">
        <path d="M9 17 C6 14 5 11 6 8" stroke-width="0.95"/>
        <path d="M56 18 C60 16 62 13 62 9" stroke-width="0.9"/>
        <path d="M54 38 C58 40 61 43 62 47" stroke-width="0.9"/>
      </g>
      <path d="${fragmentSilhouette}" fill="url(#coolTop)" opacity="0.72"/>`
  });
}

function burnableSvg(assetsRoot) {
  return assetShell({
    width: 92,
    height: 58,
    viewBox: "0 0 92 58",
    defs: commonDefs(compactSilhouette),
    source: renderSource(assetsRoot, 'transform="translate(7 3) scale(0.247)" clip-path="url(#woolClip)" filter="url(#softShadow)"'),
    overlay: `
      <path d="${compactSilhouette}" fill="#2f3437" fill-opacity="0.18"/>
      <path d="M17 21 C28 15 43 14 57 17 C66 19 74 23 79 29" fill="none" stroke="#f7fbfd" stroke-opacity="0.28" stroke-width="1.25" stroke-linecap="round"/>
      <path d="${compactSilhouette}" fill="url(#coolTop)" opacity="0.46"/>`
  });
}

function emberOverlaySvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="92" height="58" viewBox="0 0 92 58">
  <defs>
    <clipPath id="emberClip">
      <path d="${compactSilhouette}"/>
    </clipPath>
    <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#ffd18a" stop-opacity="0.95"/>
      <stop offset="0.5" stop-color="#ff9e40" stop-opacity="0.75"/>
      <stop offset="1" stop-color="#c4471f" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g clip-path="url(#emberClip)">
    <ellipse cx="28" cy="31" rx="11" ry="8" fill="url(#emberGlow)" opacity="0.85"/>
    <ellipse cx="47" cy="24" rx="9" ry="6.5" fill="url(#emberGlow)" opacity="0.62"/>
    <ellipse cx="61" cy="37" rx="10" ry="7" fill="url(#emberGlow)" opacity="0.72"/>
    <path d="M20 27 C28 24 35 24 44 28" fill="none" stroke="#ffd490" stroke-opacity="0.7" stroke-width="1.25" stroke-linecap="round"/>
    <path d="M41 21 C48 18 55 20 61 24" fill="none" stroke="#ffb562" stroke-opacity="0.55" stroke-width="1.15" stroke-linecap="round"/>
    <path d="M54 35 C61 33 67 34 73 38" fill="none" stroke="#ffb562" stroke-opacity="0.5" stroke-width="1.1" stroke-linecap="round"/>
  </g>
</svg>
`;
}

function ashOverlaySvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="92" height="58" viewBox="0 0 92 58">
  <defs>
    <clipPath id="ashClip">
      <path d="${compactSilhouette}"/>
    </clipPath>
    <linearGradient id="ashFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dfe3e5" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#687073" stop-opacity="0.48"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#ashClip)">
    <path d="M13 35 C23 44 41 47 57 44 C67 42 75 38 82 31 L82 50 L10 50 Z" fill="url(#ashFade)" opacity="0.7"/>
    <ellipse cx="29" cy="37" rx="8" ry="5" fill="#737b7f" fill-opacity="0.38"/>
    <ellipse cx="49" cy="34" rx="11" ry="6" fill="#5f676a" fill-opacity="0.32"/>
    <ellipse cx="65" cy="39" rx="9" ry="5" fill="#7a8285" fill-opacity="0.28"/>
    <path d="M18 43 C32 45 48 45 64 42" fill="none" stroke="#dde3e5" stroke-opacity="0.28" stroke-width="1.1" stroke-linecap="round"/>
  </g>
</svg>
`;
}

function ensureSteelWoolAssets(assetsRoot) {
  mkdirSync(assetsRoot, { recursive: true });
  writeFileSync(join(assetsRoot, "steel-wool-compact.svg"), compactSvg(assetsRoot), "utf8");
  writeFileSync(join(assetsRoot, "steel-wool-loose.svg"), looseSvg(assetsRoot), "utf8");
  writeFileSync(join(assetsRoot, "steel-wool-fragment.svg"), fragmentSvg(assetsRoot), "utf8");
  writeFileSync(join(assetsRoot, "steel-wool-burnable.svg"), burnableSvg(assetsRoot), "utf8");
  writeFileSync(join(assetsRoot, "steel-wool-ember-overlay.svg"), emberOverlaySvg(), "utf8");
  writeFileSync(join(assetsRoot, "steel-wool-ash-overlay.svg"), ashOverlaySvg(), "utf8");
}

export { ensureSteelWoolAssets };
