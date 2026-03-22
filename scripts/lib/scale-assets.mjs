import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_WIDTH = 132;
const OUTPUT_HEIGHT = 60;
const SCALE_VIEWBOX = { width: 425.58, height: 210.58 };
const SOURCE_RELATIVE_PATH = "source-candidates/freesvg-red-digital-scale.svg";
const DEFAULT_READOUTS = [
  "0.00 g",
  "0.92 g",
  "0.96 g",
  "3.82 g",
  "3.88 g",
  "3.91 g",
  "4.73 g",
  "4.79 g",
  "4.82 g",
  "18.42 g",
  "18.74 g",
  "26.12 g",
  "26.40 g",
  "33.18 g",
  "41.26 g"
];

let cachedCandidateMarkup;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function loadCandidateMarkup(assetsRoot) {
  if (!cachedCandidateMarkup) {
    cachedCandidateMarkup = readFileSync(join(assetsRoot, SOURCE_RELATIVE_PATH), "utf8")
      .replace(/^\uFEFF/, "")
      .replace(/^\s*<\?xml[\s\S]*?\?>\s*/i, "")
      .replace(/<!--[\s\S]*?-->\s*/g, "")
      .replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview\s*>\s*/gi, "")
      .replace(/<metadata[\s\S]*?<\/metadata\s*>\s*/gi, "")
      .replace(/\s+xmlns(?::[\w-]+)?="[^"]*"/g, "")
      .replace(/\s+(?:inkscape|sodipodi|rdf|cc|dc|osb|ns1):[\w-]+="[^"]*"/g, "")
      .replace(/<svg\b[^>]*>/i, '<g id="source-scale">')
      .replace(/<\/svg\s*>/i, "</g>");
  }
  return cachedCandidateMarkup;
}

function scaleAssetName(readout) {
  return `balance-scale-${readout
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "blank"}.svg`;
}

function renderSegmentDigit(char, x, y, options = {}) {
  const color = options.color ?? "#f39a47";
  const glow = options.glow ?? "#ffb774";
  const opacity = options.opacity ?? 1;
  const w = 25;
  const h = 45;
  const t = 4.6;
  const segmentLength = 14.6;
  const verticalLength = 16.2;
  const rx = 2.2;
  const segmentsByChar = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "c", "d", "g"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
    "-": ["g"]
  };
  const active = segmentsByChar[char] ?? [];
  const segments = {
    a: { x: x + 5.2, y: y + 1.6, width: segmentLength, height: t },
    d: { x: x + 5.2, y: y + h - t - 1.2, width: segmentLength, height: t },
    g: { x: x + 5.2, y: y + 20.3, width: segmentLength, height: t },
    f: { x: x + 1.2, y: y + 5.2, width: t, height: verticalLength },
    e: { x: x + 1.2, y: y + 23.3, width: t, height: verticalLength },
    b: { x: x + w - t - 1.2, y: y + 5.2, width: t, height: verticalLength },
    c: { x: x + w - t - 1.2, y: y + 23.3, width: t, height: verticalLength }
  };

  return active
    .map((segmentName) => {
      const segment = segments[segmentName];
      return `
      <rect x="${segment.x}" y="${segment.y}" width="${segment.width}" height="${segment.height}" rx="${rx}" fill="${color}" opacity="${opacity}"/>
      <rect x="${segment.x + 0.3}" y="${segment.y + 0.3}" width="${Math.max(segment.width - 0.6, 0)}" height="${Math.max(segment.height - 0.6, 0)}" rx="${Math.max(rx - 0.2, 0)}" fill="${glow}" opacity="${Math.min(opacity + 0.08, 1)}"/>`;
    })
    .join("");
}

function renderReadout(readout) {
  if (readout === "blank") {
    return "";
  }

  if (readout === "loading") {
    return `
      <g opacity="0.94">
        <circle cx="174" cy="137.5" r="5.3" fill="#f39a47"/>
        <circle cx="212.79" cy="137.5" r="5.3" fill="#f39a47" opacity="0.82"/>
        <circle cx="251.58" cy="137.5" r="5.3" fill="#f39a47" opacity="0.64"/>
      </g>`;
  }

  const numeric = readout.replace(/\s*g$/i, "");
  const unit = /\bg$/i.test(readout) ? "g" : "";
  const chars = [...numeric];
  const widths = chars.map((char) => (char === "." ? 10 : 32));
  const totalWidth = widths.reduce((sum, width) => sum + width, 0);
  let cursor = 212.79 - totalWidth / 2;

  const digitMarkup = chars
    .map((char, index) => {
      const width = widths[index];
      if (char === ".") {
        const markup = `<circle cx="${cursor + 5.2}" cy="162.4" r="3.3" fill="#f39a47"/>`;
        cursor += width;
        return markup;
      }
      const markup = renderSegmentDigit(char, cursor, 115.6);
      cursor += width;
      return markup;
    })
    .join("");

  return `
    <g filter="url(#readoutGlow)">
      ${digitMarkup}
    </g>
    ${
      unit
        ? `<text x="291.8" y="154" fill="#f8b471" font-size="18" font-family="'Courier New', monospace" font-weight="700" text-anchor="start">${escapeXml(
            unit
          )}</text>`
        : ""
    }`;
}

function scaleSvg(assetsRoot, readout) {
  const candidateMarkup = loadCandidateMarkup(assetsRoot);
  const displayMarkup = renderReadout(readout);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${OUTPUT_WIDTH}" height="${OUTPUT_HEIGHT}" viewBox="0 0 ${SCALE_VIEWBOX.width} ${SCALE_VIEWBOX.height}">
  <defs>
    <filter id="readoutGlow" x="-12%" y="-20%" width="124%" height="150%">
      <feGaussianBlur stdDeviation="1.3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="displayGlass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0e0e0e"/>
      <stop offset="1" stop-color="#030303"/>
    </linearGradient>
  </defs>
  ${candidateMarkup}
  <rect x="116" y="109.5" width="194" height="53.4" rx="23" fill="url(#displayGlass)"/>
  <path d="M126 116c8-6 22-8 41-8h108c20 0 33 3 39 8" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2.6" stroke-linecap="round"/>
  <text x="212.79" y="101.5" fill="#fff4ec" fill-opacity="0.54" font-size="12.2" font-family="Georgia, 'Times New Roman', serif" text-anchor="middle" letter-spacing="1.4">MEASURED MASS</text>
  ${displayMarkup}
</svg>
`;
}

function writeScaleVariant(assetsRoot, fileName, readout) {
  mkdirSync(assetsRoot, { recursive: true });
  writeFileSync(join(assetsRoot, fileName), scaleSvg(assetsRoot, readout), "utf8");
}

function ensureScaleAsset(assetsRoot, readout) {
  const fileName = scaleAssetName(readout);
  writeScaleVariant(assetsRoot, fileName, readout);
  return fileName;
}

function ensureCoreScaleAssets(assetsRoot, extraReadouts = []) {
  const uniqueReadouts = [...new Set([...DEFAULT_READOUTS, ...extraReadouts])];
  writeScaleVariant(assetsRoot, "balance-scale.svg", "blank");
  writeScaleVariant(assetsRoot, "balance-scale-blank.svg", "blank");
  writeScaleVariant(assetsRoot, "balance-scale-zero.svg", "0.00 g");
  writeScaleVariant(assetsRoot, "balance-scale-loading.svg", "loading");
  writeScaleVariant(assetsRoot, "balance-scale-dynamic.svg", "0.00 g");
  uniqueReadouts.forEach((readout) => {
    ensureScaleAsset(assetsRoot, readout);
  });
}

export { ensureCoreScaleAssets, ensureScaleAsset, scaleAssetName };
