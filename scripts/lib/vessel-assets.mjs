import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BEAKER_OUTLINE_SOURCE = "source-candidates/freesvg-beaker-outline.svg";
const BEAKER_FILLED_SOURCE = "source-candidates/freesvg-water-beaker.svg";
const JAR_SOURCE = "source-candidates/freesvg-empty-glass-jar.svg";
const TUBE_EMPTY_SOURCE = "source-candidates/freesvg-test-tube-empty-graded.svg";
const TUBE_FILLED_SOURCE = "source-candidates/freesvg-test-tube-filled.svg";

const cache = new Map();

function loadSourceMarkup(assetsRoot, relativePath, options = {}) {
  const key = `${relativePath}:${options.preserveIds ? "keep-ids" : "strip-ids"}`;
  if (!cache.has(key)) {
    const sanitized = readFileSync(join(assetsRoot, relativePath), "utf8")
      .replace(/^\uFEFF/, "")
      .replace(/^\s*<\?xml[\s\S]*?\?>\s*/i, "")
      .replace(/<!--[\s\S]*?-->\s*/g, "")
      .replace(/<sodipodi:namedview\b[\s\S]*?\/>\s*/gi, "")
      .replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview\s*>\s*/gi, "")
      .replace(/<metadata[\s\S]*?<\/metadata\s*>\s*/gi, "")
      .replace(/\s+xmlns(?::[\w-]+)?="[^"]*"/g, "")
      .replace(/\s+(?:inkscape|sodipodi|rdf|cc|dc|svg|ns1):[\w-]+="[^"]*"/g, "")
      .replace(/\s+(?:inkscape|sodipodi):[\w-]+="[^"]*"/g, "")
      .replace(/<svg\b[^>]*>/i, "__VESSEL_OPEN__")
      .replace(/<\/svg\s*>/i, "__VESSEL_CLOSE__");
    cache.set(
      key,
      options.preserveIds ? sanitized : sanitized.replace(/\s+id="[^"]*"/g, "")
    );
  }
  return cache.get(key);
}

function renderSource(assetsRoot, relativePath, attrs = "", options = {}) {
  const openTag = attrs ? `<g ${attrs}>` : "<g>";
  return loadSourceMarkup(assetsRoot, relativePath, options)
    .replace("__VESSEL_OPEN__", openTag)
    .replace("__VESSEL_CLOSE__", "</g>");
}

function shell({ width, height, viewBox, defs = "", layers = [] }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">
  <defs>
    ${defs}
  </defs>
  ${layers.join("\n  ")}
</svg>
`;
}

function writeAsset(assetsRoot, fileName, svg) {
  writeFileSync(join(assetsRoot, fileName), svg, "utf8");
}

function beakerScene(assetsRoot, contentMarkup, extraDefs = "") {
  return shell({
    width: 96,
    height: 132,
    viewBox: "0 0 146 177",
    defs: `
      <clipPath id="beakerInterior">
        <path d="M43 31H103V145C103 154 96 162 87 162H59C50 162 43 154 43 145Z"/>
      </clipPath>
      <linearGradient id="beakerWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#cfeafc" stop-opacity="0.92"/>
        <stop offset="1" stop-color="#86c0e6" stop-opacity="0.94"/>
      </linearGradient>
      <radialGradient id="iceFace" cx="34%" cy="24%" r="82%">
        <stop offset="0" stop-color="#fbfeff"/>
        <stop offset="1" stop-color="#a7d2ee"/>
      </radialGradient>
      <radialGradient id="tabletFace" cx="34%" cy="26%" r="72%">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#d6d9d2"/>
      </radialGradient>
      ${extraDefs}
    `,
    layers: [
      `<ellipse cx="73" cy="166" rx="34" ry="7" fill="#a3b5c2" fill-opacity="0.18"/>`,
      renderSource(assetsRoot, BEAKER_FILLED_SOURCE, 'opacity="0.12"'),
      `<g clip-path="url(#beakerInterior)">${contentMarkup}</g>`,
      `<path d="M51 34C54 81 55 121 56 152" fill="none" stroke="#f8fcfe" stroke-opacity="0.4" stroke-width="4.8" stroke-linecap="round"/>`,
      `<path d="M92 34C90 78 89 118 87 151" fill="none" stroke="#dcebf5" stroke-opacity="0.26" stroke-width="3" stroke-linecap="round"/>`,
      renderSource(assetsRoot, BEAKER_OUTLINE_SOURCE, 'opacity="0.98"')
    ]
  });
}

function iceBeakerScene(assetsRoot, contentMarkup, extraDefs = "") {
  return shell({
    width: 112,
    height: 154,
    viewBox: "0 0 146 177",
    defs: `
      <clipPath id="beakerInterior">
        <path d="M43 31H103V145C103 154 96 162 87 162H59C50 162 43 154 43 145Z"/>
      </clipPath>
      <linearGradient id="beakerWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#cfeafc" stop-opacity="0.92"/>
        <stop offset="1" stop-color="#86c0e6" stop-opacity="0.94"/>
      </linearGradient>
      <radialGradient id="iceFace" cx="34%" cy="24%" r="82%">
        <stop offset="0" stop-color="#fbfeff"/>
        <stop offset="1" stop-color="#a7d2ee"/>
      </radialGradient>
      <radialGradient id="tabletFace" cx="34%" cy="26%" r="72%">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#d6d9d2"/>
      </radialGradient>
      ${extraDefs}
    `,
    layers: [
      `<ellipse cx="73" cy="166" rx="34" ry="7" fill="#a3b5c2" fill-opacity="0.18"/>`,
      renderSource(assetsRoot, BEAKER_FILLED_SOURCE, 'opacity="0.12"'),
      `<g clip-path="url(#beakerInterior)">${contentMarkup}</g>`,
      `<path d="M51 34C54 81 55 121 56 152" fill="none" stroke="#f8fcfe" stroke-opacity="0.4" stroke-width="4.8" stroke-linecap="round"/>`,
      `<path d="M92 34C90 78 89 118 87 151" fill="none" stroke="#dcebf5" stroke-opacity="0.26" stroke-width="3" stroke-linecap="round"/>`,
      renderSource(assetsRoot, BEAKER_OUTLINE_SOURCE, 'opacity="0.98"')
    ]
  });
}

function beakerOutlineSvg(assetsRoot) {
  return shell({
    width: 96,
    height: 132,
    viewBox: "0 0 146 177",
    layers: [
      `<ellipse cx="73" cy="166" rx="34" ry="7" fill="#a3b5c2" fill-opacity="0.12"/>`,
      `<path d="M51 34C54 81 55 121 56 152" fill="none" stroke="#f8fcfe" stroke-opacity="0.38" stroke-width="4.8" stroke-linecap="round"/>`,
      renderSource(assetsRoot, BEAKER_OUTLINE_SOURCE, 'opacity="0.98"')
    ]
  });
}

function beakerWater(y, height) {
  return `
    <rect x="43" y="${y}" width="60" height="${height}" rx="7" fill="url(#beakerWater)" opacity="0.92"/>
    <ellipse cx="73" cy="${y}" rx="28" ry="5.2" fill="#ecf8ff" opacity="0.54"/>
  `;
}

function iceBlock(x, y, options = {}) {
  const scale = options.scale ?? 1;
  const opacity = options.opacity ?? 0.96;
  const rotate = options.rotate ?? 0;
  const top = 16 * scale;
  const half = top / 2;
  const sideH = 20 * scale;
  const stroke = 1.5 * scale;
  const centerX = half;
  const centerY = half + sideH * 0.6;
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate} ${centerX} ${centerY})" opacity="${opacity}">
      <path d="M0 ${half}L${half} 0L${top} ${half}L${half} ${top}" fill="url(#iceFace)" stroke="#7fb6dd" stroke-width="${stroke}" stroke-linejoin="round"/>
      <path d="M0 ${half}V${half + sideH}L${half} ${top + sideH}V${top}" fill="#d4eefb" stroke="#7fb6dd" stroke-width="${stroke * 0.82}" stroke-linejoin="round"/>
      <path d="M${top} ${half}V${half + sideH}L${half} ${top + sideH}V${top}" fill="#a9d3ef" stroke="#7fb6dd" stroke-width="${stroke * 0.82}" stroke-linejoin="round"/>
      <path d="M${half * 0.26} ${half * 0.9}L${half * 0.96} ${half * 0.32}" fill="none" stroke="#ffffff" stroke-opacity="0.62" stroke-width="${stroke * 0.92}" stroke-linecap="round"/>
      <path d="M${half * 1.04} ${half * 0.46}L${top * 0.88} ${half * 1.02}" fill="none" stroke="#effaff" stroke-opacity="0.46" stroke-width="${stroke * 0.7}" stroke-linecap="round"/>
    </g>
  `;
}

function iceSolidCluster() {
  return `
    <g opacity="0.98">
      ${iceBlock(45, 103, { scale: 0.92, opacity: 0.96, rotate: -9 })}
      ${iceBlock(61, 97, { scale: 0.9, opacity: 0.95, rotate: 7 })}
      ${iceBlock(55, 83, { scale: 0.76, opacity: 0.92, rotate: -4 })}
    </g>
  `;
}

function iceRoundedRemnants(opacity = 0.7) {
  return `
    <g opacity="${opacity}">
      <path d="M52 98c5-6 13-8 22-7 8 1 13 5 14 10 1 6-2 12-8 16-6 4-15 5-22 3-7-2-10-8-9-13 0-4 1-7 3-9Z" fill="#eaf8ff" fill-opacity="0.82" stroke="#96c7e7" stroke-width="1.7"/>
      <path d="M70 89c5-3 12-4 18-2 6 2 9 7 8 12-2 5-7 10-14 12-7 2-14 1-18-3-4-3-4-9-2-13 2-3 4-5 8-6Z" fill="#e6f7ff" fill-opacity="0.72" stroke="#92c3e3" stroke-width="1.55"/>
      <path d="M60 93c6 3 12 5 19 5" fill="none" stroke="#ffffff" stroke-opacity="0.58" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M75 97c3 2 7 3 12 3" fill="none" stroke="#eff9ff" stroke-opacity="0.44" stroke-width="1.45" stroke-linecap="round"/>
    </g>
  `;
}

function iceSoftChunk(x, y, options = {}) {
  const scale = options.scale ?? 1;
  const opacity = options.opacity ?? 0.72;
  const rotate = options.rotate ?? 0;
  const bodyW = 22 * scale;
  const bodyH = 17 * scale;
  return `
    <g transform="translate(${x} ${y}) rotate(${rotate} ${bodyW / 2} ${bodyH / 2})" opacity="${opacity}">
      <path d="M2 ${bodyH * 0.42}C3 ${bodyH * 0.16} ${bodyW * 0.22} 1 ${bodyW * 0.42} 1H${bodyW * 0.66}C${bodyW * 0.88} 1 ${bodyW} ${bodyH * 0.18} ${bodyW} ${bodyH * 0.42}V${bodyH * 0.63}C${bodyW} ${bodyH * 0.88} ${bodyW * 0.84} ${bodyH} ${bodyW * 0.62} ${bodyH}H${bodyW * 0.3}C${bodyW * 0.12} ${bodyH} 0 ${bodyH * 0.86} 0 ${bodyH * 0.67}V${bodyH * 0.46}C0 ${bodyH * 0.45} 1 ${bodyH * 0.44} 2 ${bodyH * 0.42}Z" fill="#ebf9ff" fill-opacity="0.82" stroke="#98c8e8" stroke-width="${1.55 * scale}"/>
      <path d="M${bodyW * 0.22} ${bodyH * 0.38}C${bodyW * 0.36} ${bodyH * 0.28} ${bodyW * 0.58} ${bodyH * 0.26} ${bodyW * 0.76} ${bodyH * 0.34}" fill="none" stroke="#ffffff" stroke-opacity="0.58" stroke-width="${1.55 * scale}" stroke-linecap="round"/>
      <path d="M${bodyW * 0.28} ${bodyH * 0.62}C${bodyW * 0.42} ${bodyH * 0.7} ${bodyW * 0.58} ${bodyH * 0.72} ${bodyW * 0.76} ${bodyH * 0.66}" fill="none" stroke="#eff9ff" stroke-opacity="0.34" stroke-width="${1.15 * scale}" stroke-linecap="round"/>
    </g>
  `;
}

function iceSurfaceRemnant(opacity = 0.42) {
  return `
    <g opacity="${opacity}">
      <path d="M60 88c4-3 10-4 16-3 6 1 10 4 10 8 0 4-3 8-8 10-5 2-11 3-16 1-5-1-8-5-7-9 0-3 2-5 5-7Z" fill="#eefaff" fill-opacity="0.7" stroke="#9ecbeb" stroke-width="1.45"/>
      <path d="M65 92c4 2 8 3 14 3" fill="none" stroke="#ffffff" stroke-opacity="0.52" stroke-width="1.45" stroke-linecap="round"/>
    </g>
  `;
}

function iceAfterFragments(opacity = 0.5) {
  return `
    <g opacity="${opacity}">
      <path d="M58 90c4-3 9-4 14-3 5 1 8 4 8 8 0 4-3 7-8 9-5 2-11 2-15 0-4-2-6-5-5-8 1-2 3-4 6-6Z" fill="#eefaff" fill-opacity="0.56" stroke="#9ecbeb" stroke-width="1.25"/>
      <path d="M66 94c3 1 6 2 11 2" fill="none" stroke="#ffffff" stroke-opacity="0.48" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M77 99c3-2 7-2 10-1 3 2 4 4 4 6 0 3-2 5-5 6-4 1-8 1-11-1-3-1-4-4-3-6 0-2 2-3 5-4Z" fill="#f2fbff" fill-opacity="0.4" stroke="#add0ea" stroke-width="1.05"/>
    </g>
  `;
}

function iceLateSlush(opacity = 0.48) {
  return `
    <g opacity="${opacity}">
      <path d="M53 98c5-3 11-4 18-4 8 0 14 2 18 5 4 4 4 8 1 11-4 4-10 6-18 6-7 0-14-2-19-5-4-3-5-7-2-10 1-1 2-2 2-3Z" fill="#eaf8ff" fill-opacity="0.34" stroke="#b4d7ee" stroke-width="1.05"/>
      <path d="M59 97c3 2 7 3 12 3 6 1 12 0 17-2" fill="none" stroke="#ffffff" stroke-opacity="0.34" stroke-width="1.2" stroke-linecap="round"/>
      <ellipse cx="63" cy="103" rx="8" ry="5" fill="#f3fbff" fill-opacity="0.22"/>
      <ellipse cx="81" cy="101" rx="7" ry="4.5" fill="#eefaff" fill-opacity="0.2"/>
      <path d="M66 92c3-2 7-3 10-2 4 0 7 2 7 5 0 3-2 5-6 6-4 1-8 1-11-1-3-1-5-3-4-5 0-1 2-2 4-3Z" fill="#f5fcff" fill-opacity="0.28" stroke="#c5e1f2" stroke-width="0.95"/>
    </g>
  `;
}

function beakerIceBeforeSvg(assetsRoot) {
  return iceBeakerScene(
    assetsRoot,
    beakerWater(112, 34) +
      `<path d="M52 112c7 3 15 4 23 4 9 0 16-1 22-3" fill="none" stroke="#edf8ff" stroke-width="2.8" stroke-linecap="round" opacity="0.3"/>` +
      `<path d="M56 119c6 2 12 3 19 3" fill="none" stroke="#dfeffb" stroke-width="2" stroke-linecap="round" opacity="0.22"/>` +
      iceSolidCluster()
  );
}

function beakerIceAfterSvg(assetsRoot) {
  return iceBeakerScene(
    assetsRoot,
    beakerWater(88, 58) +
      `<path d="M50 93c8 4 17 6 28 6 10 0 19-2 25-5" fill="none" stroke="#ecf8ff" stroke-width="3.1" stroke-linecap="round" opacity="0.56"/>` +
      `<path d="M55 101c6 3 12 4 19 4" fill="none" stroke="#dceffd" stroke-width="2.45" stroke-linecap="round" opacity="0.4"/>` +
      `<path d="M60 109c5 2 10 3 15 3" fill="none" stroke="#eff8ff" stroke-width="1.9" stroke-linecap="round" opacity="0.34"/>` +
      iceLateSlush(0.62)
  );
}

function beakerIceMeltingSvg(assetsRoot) {
  return shell({
    width: 112,
    height: 154,
    viewBox: "0 0 146 177",
    defs: `
      <clipPath id="beakerInterior">
        <path d="M43 31H103V145C103 154 96 162 87 162H59C50 162 43 154 43 145Z"/>
      </clipPath>
      <linearGradient id="beakerWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#cfeafc" stop-opacity="0.92"/>
        <stop offset="1" stop-color="#86c0e6" stop-opacity="0.94"/>
      </linearGradient>
      <radialGradient id="iceFace" cx="34%" cy="24%" r="82%">
        <stop offset="0" stop-color="#fbfeff"/>
        <stop offset="1" stop-color="#a7d2ee"/>
      </radialGradient>
      <filter id="softIceBlur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="0.85"/>
      </filter>
    `,
    layers: [
      `<ellipse cx="73" cy="166" rx="34" ry="7" fill="#a3b5c2" fill-opacity="0.18"/>`,
      renderSource(assetsRoot, BEAKER_FILLED_SOURCE, 'opacity="0.12"'),
      `<g clip-path="url(#beakerInterior)">
        <rect x="43" y="112" width="60" height="34" rx="7" fill="url(#beakerWater)" opacity="0.92">
          <animate attributeName="y" values="112;108;101;95;90" dur="5.8s" fill="freeze"/>
          <animate attributeName="height" values="34;38;45;51;56" dur="5.8s" fill="freeze"/>
        </rect>
        <ellipse cx="73" cy="112" rx="28" ry="5.2" fill="#ecf8ff" opacity="0.54">
          <animate attributeName="cy" values="112;108;101;95;90" dur="5.8s" fill="freeze"/>
          <animate attributeName="rx" values="27;28;29;29;28" dur="5.8s" fill="freeze"/>
        </ellipse>
        <g opacity="0.96">
          ${iceBlock(45, 103, { scale: 0.92, opacity: 0.96, rotate: -9 })}
          <animateTransform attributeName="transform" type="translate" values="0 0;-4 2;-9 7;-12 10;-14 11" dur="5.8s" fill="freeze"/>
          <animateTransform attributeName="transform" additive="sum" type="scale" values="1 1;0.95 0.95;0.78 0.71;0.5 0.42;0.24 0.18" dur="5.8s" fill="freeze"/>
          <animateTransform attributeName="transform" additive="sum" type="rotate" values="0;1;4;6;7" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0.96;0.86;0.54;0.12;0.02" dur="5.8s" fill="freeze"/>
        </g>
        <g opacity="0.95">
          ${iceBlock(61, 97, { scale: 0.9, opacity: 0.95, rotate: 7 })}
          <animateTransform attributeName="transform" type="translate" values="0 0;2 2;8 7;14 10;17 11" dur="5.8s" fill="freeze"/>
          <animateTransform attributeName="transform" additive="sum" type="scale" values="1 1;0.95 0.93;0.8 0.73;0.52 0.44;0.26 0.18" dur="5.8s" fill="freeze"/>
          <animateTransform attributeName="transform" additive="sum" type="rotate" values="0;-1;-3;-5;-6" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0.95;0.86;0.56;0.14;0.02" dur="5.8s" fill="freeze"/>
        </g>
        <g opacity="0.92">
          ${iceBlock(55, 83, { scale: 0.76, opacity: 0.92, rotate: -4 })}
          <animateTransform attributeName="transform" type="translate" values="0 0;2 4;3 10;4 14;4 16" dur="5.8s" fill="freeze"/>
          <animateTransform attributeName="transform" additive="sum" type="scale" values="1 1;0.86 0.82;0.58 0.48;0.22 0.16;0.04 0.03" dur="5.8s" fill="freeze"/>
          <animateTransform attributeName="transform" additive="sum" type="rotate" values="0;2;5;7;9" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0.92;0.74;0.28;0.04;0" dur="5.8s" fill="freeze"/>
        </g>
        <g opacity="0" filter="url(#softIceBlur)">
          ${iceSoftChunk(43, 101, { scale: 0.78, opacity: 0.82, rotate: -10 })}
          <animateTransform attributeName="transform" type="translate" values="0 0;-1 0;-5 2;-7 4;-8 5" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0;0.1;0.48;0.2;0.01" dur="5.8s" fill="freeze"/>
        </g>
        <g opacity="0" filter="url(#softIceBlur)">
          ${iceSoftChunk(72, 98, { scale: 0.74, opacity: 0.8, rotate: 8 })}
          <animateTransform attributeName="transform" type="translate" values="0 0;1 1;5 3;8 5;10 6" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0;0.08;0.48;0.22;0.01" dur="5.8s" fill="freeze"/>
        </g>
        <g opacity="0" filter="url(#softIceBlur)">
          ${iceSoftChunk(60, 90, { scale: 0.48, opacity: 0.68, rotate: -1 })}
          <animateTransform attributeName="transform" type="translate" values="0 0;0 1;0 3;1 4;1 5" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0;0.02;0.14;0.1;0" dur="5.8s" fill="freeze"/>
        </g>
        <g opacity="0" filter="url(#softIceBlur)">
          ${iceRoundedRemnants(0.72)}
          <animateTransform attributeName="transform" type="translate" values="0 0;0 0;1 2;1 4;1 5" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0;0;0.02;0.08;0.04" dur="5.8s" fill="freeze"/>
        </g>
        <g opacity="0" filter="url(#softIceBlur)">
          ${iceLateSlush(0.74)}
          <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 0;0 1;0 2" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0;0;0.06;0.28;0.64" dur="5.8s" fill="freeze"/>
        </g>
        <g opacity="0" filter="url(#softIceBlur)">
          ${iceSurfaceRemnant(0.48)}
          <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 -1;0 -2;0 -2" dur="5.8s" fill="freeze"/>
          <animate attributeName="opacity" values="0;0;0.04;0.18;0.32" dur="5.8s" fill="freeze"/>
        </g>
        <path d="M58 97c4 7 6 12 7 17" fill="none" stroke="#eefaff" stroke-width="2.2" stroke-linecap="round" opacity="0">
          <animate attributeName="opacity" values="0;0.12;0.34;0.24;0.08" dur="5.8s" fill="freeze"/>
        </path>
        <path d="M76 93c3 7 4 12 5 17" fill="none" stroke="#e8f7ff" stroke-width="2" stroke-linecap="round" opacity="0">
          <animate attributeName="opacity" values="0;0.08;0.26;0.2;0.07" dur="5.8s" fill="freeze"/>
        </path>
        <path d="M67 88c2 5 3 10 3 16" fill="none" stroke="#f3fbff" stroke-width="1.6" stroke-linecap="round" opacity="0">
          <animate attributeName="opacity" values="0;0.04;0.18;0.22;0.08" dur="5.8s" fill="freeze"/>
        </path>
        <path d="M63 86c2 4 4 8 5 14" fill="none" stroke="#f7fdff" stroke-width="1.6" stroke-linecap="round" opacity="0">
          <animate attributeName="opacity" values="0;0;0.16;0.24;0.1" dur="5.8s" fill="freeze"/>
        </path>
        <path d="M50 116c8 4 18 6 29 6 9 0 17-2 23-5" fill="none" stroke="#eff9ff" stroke-width="3" stroke-linecap="round" opacity="0.12">
          <animate attributeName="opacity" values="0.12;0.22;0.38;0.56;0.66" dur="5.8s" fill="freeze"/>
        </path>
        <path d="M56 126c10 4 18 5 25 4" fill="none" stroke="#dff0fb" stroke-width="2.5" stroke-linecap="round" opacity="0.04">
          <animate attributeName="opacity" values="0.04;0.14;0.26;0.38;0.46" dur="5.8s" fill="freeze"/>
        </path>
        <path d="M48 110c7 2 16 3 25 3 11 0 20-1 27-3" fill="none" stroke="#f8fdff" stroke-width="1.8" stroke-linecap="round" opacity="0.08">
          <animate attributeName="opacity" values="0.08;0.14;0.22;0.3;0.34" dur="5.8s" fill="freeze"/>
        </path>
      </g>`,
      `<path d="M51 34C54 81 55 121 56 152" fill="none" stroke="#f8fcfe" stroke-opacity="0.4" stroke-width="4.8" stroke-linecap="round"/>`,
      renderSource(assetsRoot, BEAKER_OUTLINE_SOURCE, 'opacity="0.98"')
    ]
  });
}

function beakerSugarSvg(assetsRoot, mode) {
  const clouds = {
    before: "",
    notStirred: `
      <ellipse cx="71" cy="118" rx="23" ry="10" fill="#f4fbff" fill-opacity="0.16"/>
      <ellipse cx="79" cy="112" rx="14" ry="7" fill="#eef8ff" fill-opacity="0.12"/>`,
    notStirredMid: `
      <ellipse cx="72" cy="112" rx="25" ry="12" fill="#f4fbff" fill-opacity="0.22"/>
      <ellipse cx="81" cy="105" rx="16" ry="8" fill="#eef8ff" fill-opacity="0.18"/>`,
    stirredMid: `
      <ellipse cx="73" cy="98" rx="25" ry="14" fill="#f5fbff" fill-opacity="0.24"/>
      <ellipse cx="67" cy="118" rx="18" ry="9" fill="#eef8ff" fill-opacity="0.16"/>`,
    stirred: `
      <ellipse cx="73" cy="103" rx="23" ry="12" fill="#f5fbff" fill-opacity="0.12"/>`
  };
  const crystals = {
    before: `
      <g fill="#fffdf5" stroke="#c7c3b6" stroke-width="1.2">
        <rect x="55" y="120" width="5" height="5" rx="1" transform="rotate(12 57.5 122.5)"/>
        <rect x="63" y="123" width="5" height="5" rx="1" transform="rotate(-8 65.5 125.5)"/>
        <rect x="70" y="119" width="5" height="5" rx="1" transform="rotate(18 72.5 121.5)"/>
        <rect x="77" y="124" width="5" height="5" rx="1" transform="rotate(-16 79.5 126.5)"/>
        <rect x="85" y="120" width="5" height="5" rx="1" transform="rotate(8 87.5 122.5)"/>
      </g>`,
    notStirred: `
      <g fill="#fffdf5" stroke="#c7c3b6" stroke-width="1.1">
        <rect x="60" y="123" width="4.5" height="4.5" rx="1" transform="rotate(10 62.25 125.25)"/>
        <rect x="68" y="126" width="4.5" height="4.5" rx="1" transform="rotate(-12 70.25 128.25)"/>
        <rect x="79" y="122" width="4.5" height="4.5" rx="1" transform="rotate(9 81.25 124.25)"/>
      </g>`,
    notStirredMid: `
      <g fill="#fffdf5" stroke="#c7c3b6" stroke-width="1">
        <rect x="66" y="126" width="4" height="4" rx="1" transform="rotate(10 68 128)"/>
        <rect x="75" y="123" width="4" height="4" rx="1" transform="rotate(-8 77 125)"/>
      </g>`,
    stirredMid: "",
    stirred: ""
  };
  return beakerScene(
    assetsRoot,
    beakerWater(98, 48) +
      clouds[mode] +
      crystals[mode] +
      `<path d="M51 104c9 4 17 6 27 6 10 0 18-2 24-4" fill="none" stroke="#eef8ff" stroke-width="2.6" stroke-linecap="round" opacity="0.34"/>`
  );
}

function beakerAlkaSvg(assetsRoot, mode) {
  const bubbles = {
    before: "",
    ventedStart: `
      <circle cx="76" cy="94" r="3.2" fill="#ffffff" fill-opacity="0.92" stroke="#d4d9d4" stroke-width="1"/>
      <circle cx="82" cy="84" r="2.5" fill="#ffffff" fill-opacity="0.9" stroke="#d4d9d4" stroke-width="0.9"/>`,
    vented: `
      <circle cx="76" cy="97" r="3.4" fill="#ffffff" fill-opacity="0.92" stroke="#d4d9d4" stroke-width="1"/>
      <circle cx="82" cy="88" r="2.9" fill="#ffffff" fill-opacity="0.9" stroke="#d4d9d4" stroke-width="0.9"/>
      <circle cx="68" cy="82" r="2.6" fill="#ffffff" fill-opacity="0.88" stroke="#d4d9d4" stroke-width="0.9"/>
      <circle cx="84" cy="72" r="2.4" fill="#ffffff" fill-opacity="0.86" stroke="#d4d9d4" stroke-width="0.8"/>
      <circle cx="70" cy="69" r="2.2" fill="#ffffff" fill-opacity="0.84" stroke="#d4d9d4" stroke-width="0.8"/>`
  };
  return beakerScene(
    assetsRoot,
    beakerWater(97, 49) +
      `<path d="M51 103c9 4 17 6 27 6 10 0 18-2 24-4" fill="none" stroke="#eef8ff" stroke-width="2.8" stroke-linecap="round" opacity="0.38"/>` +
      `<g transform="translate(73 124)">
        <circle cx="0" cy="0" r="15" fill="url(#tabletFace)" stroke="#9ea49d" stroke-width="2.2"/>
        <path d="M-7 -7L7 7" fill="none" stroke="#b9beb7" stroke-width="2.1"/>
      </g>` +
      bubbles[mode]
  );
}

function jarScene(assetsRoot, contentMarkup) {
  return shell({
    width: 88,
    height: 142,
    viewBox: "0 0 746.5 1150",
    defs: `
      <clipPath id="jarInterior">
        <path d="M184 206H564V1000C564 1061 522 1105 462 1116H284C222 1105 182 1061 182 1000V206Z"/>
      </clipPath>
      <linearGradient id="jarWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#cfeafc" stop-opacity="0.92"/>
        <stop offset="1" stop-color="#86c0e6" stop-opacity="0.94"/>
      </linearGradient>
      <radialGradient id="jarTablet" cx="34%" cy="26%" r="72%">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#d6d9d2"/>
      </radialGradient>
    `,
    layers: [
      `<ellipse cx="374" cy="1118" rx="190" ry="30" fill="#9fb0bc" fill-opacity="0.14"/>`,
      `<g clip-path="url(#jarInterior)">${contentMarkup}</g>`,
      `<path d="M265 258C291 525 304 790 309 1042" fill="none" stroke="#f8fcfe" stroke-opacity="0.34" stroke-width="28" stroke-linecap="round"/>`,
      `<path d="M514 250C492 505 482 774 473 1035" fill="none" stroke="#dcecf5" stroke-opacity="0.2" stroke-width="18" stroke-linecap="round"/>`,
      renderSource(assetsRoot, JAR_SOURCE, 'opacity="0.96"', { preserveIds: true })
    ]
  });
}

function jarOutlineSvg(assetsRoot) {
  return shell({
    width: 88,
    height: 142,
    viewBox: "0 0 746.5 1150",
    layers: [
      `<ellipse cx="374" cy="1118" rx="190" ry="30" fill="#9fb0bc" fill-opacity="0.12"/>`,
      `<path d="M265 258C291 525 304 790 309 1042" fill="none" stroke="#f8fcfe" stroke-opacity="0.3" stroke-width="28" stroke-linecap="round"/>`,
      renderSource(assetsRoot, JAR_SOURCE, 'opacity="0.96"', { preserveIds: true })
    ]
  });
}

function jarAlkaCapturedSvg(assetsRoot, mode) {
  const bubbles =
    mode === "start"
      ? `
      <circle cx="376" cy="694" r="22" fill="#ffffff" fill-opacity="0.92" stroke="#d4d9d4" stroke-width="8"/>
      <circle cx="448" cy="618" r="18" fill="#ffffff" fill-opacity="0.88" stroke="#d4d9d4" stroke-width="7"/>`
      : `
      <circle cx="376" cy="716" r="24" fill="#ffffff" fill-opacity="0.92" stroke="#d4d9d4" stroke-width="8"/>
      <circle cx="448" cy="648" r="19" fill="#ffffff" fill-opacity="0.9" stroke="#d4d9d4" stroke-width="7"/>
      <circle cx="306" cy="600" r="17" fill="#ffffff" fill-opacity="0.88" stroke="#d4d9d4" stroke-width="6"/>
      <circle cx="472" cy="520" r="16" fill="#ffffff" fill-opacity="0.84" stroke="#d4d9d4" stroke-width="6"/>
      <circle cx="324" cy="492" r="14" fill="#ffffff" fill-opacity="0.82" stroke="#d4d9d4" stroke-width="5"/>`;

  return jarScene(
    assetsRoot,
    `<rect x="185" y="676" width="379" height="326" rx="36" fill="url(#jarWater)" opacity="0.92"/>
     <ellipse cx="374" cy="676" rx="172" ry="34" fill="#eef8ff" opacity="0.5"/>
     <g transform="translate(374 888)">
       <circle cx="0" cy="0" r="108" fill="url(#jarTablet)" stroke="#9ea49d" stroke-width="16"/>
       <path d="M-46 -46L46 46" fill="none" stroke="#b9beb7" stroke-width="16"/>
     </g>
     ${bubbles}`
  );
}

function tubeSourceGroup(assetsRoot, relativePath, transform, opacity = 1) {
  return renderSource(assetsRoot, relativePath, `transform="${transform}" opacity="${opacity}"`);
}

function precipitateShell(contentMarkup, extraDefs = "") {
  return shell({
    width: 106,
    height: 148,
    viewBox: "0 0 106 148",
    defs: `
      <clipPath id="leftTubeInterior">
        <path d="M18 26H34V112C34 122 29 128 26 128C23 128 18 122 18 112Z"/>
      </clipPath>
      <clipPath id="rightTubeInterior">
        <path d="M68 26H84V112C84 122 79 128 76 128C73 128 68 122 68 112Z"/>
      </clipPath>
      <clipPath id="tiltedTubeInterior">
        <path d="M-8 -44H8V42C8 52 3 58 0 58C-3 58-8 52-8 42Z"/>
      </clipPath>
      ${extraDefs}
    `,
    layers: [
      `<ellipse cx="53" cy="136" rx="28" ry="6" fill="#a8b8c3" fill-opacity="0.12"/>`,
      contentMarkup
    ]
  });
}

function tubePairBase(assetsRoot) {
  return `
    ${tubeSourceGroup(assetsRoot, TUBE_FILLED_SOURCE, "translate(14 10) scale(0.65)", 0.08)}
    ${tubeSourceGroup(assetsRoot, TUBE_FILLED_SOURCE, "translate(64 10) scale(0.65)", 0.05)}
    ${tubeSourceGroup(assetsRoot, TUBE_EMPTY_SOURCE, "translate(14 10) scale(0.65)", 0.98)}
    ${tubeSourceGroup(assetsRoot, TUBE_EMPTY_SOURCE, "translate(64 10) scale(0.65)", 0.98)}
  `;
}

function precipitateBeforeSvg(assetsRoot) {
  return precipitateShell(`
    <g clip-path="url(#leftTubeInterior)">
      <rect x="18" y="82" width="16" height="36" rx="4" fill="#aad8f3" opacity="0.86"/>
      <ellipse cx="26" cy="82" rx="7.2" ry="2.5" fill="#edf7fe" opacity="0.42"/>
    </g>
    <g clip-path="url(#rightTubeInterior)">
      <rect x="68" y="82" width="16" height="36" rx="4" fill="#ffe3a0" opacity="0.88"/>
      <ellipse cx="76" cy="82" rx="7.2" ry="2.5" fill="#fff2c8" opacity="0.42"/>
    </g>
    <rect x="16" y="9" width="20" height="8" rx="3" fill="#5e7680"/>
    <rect x="66" y="9" width="20" height="8" rx="3" fill="#5e7680"/>
    ${tubePairBase(assetsRoot)}
  `);
}

function precipitateAfterSvg(assetsRoot) {
  return precipitateShell(`
    <g clip-path="url(#leftTubeInterior)">
      <rect x="18" y="100" width="16" height="18" rx="4" fill="#eef6fb" opacity="0.2"/>
    </g>
    <g clip-path="url(#rightTubeInterior)">
      <rect x="68" y="74" width="16" height="44" rx="4" fill="#f4f7df" opacity="0.74"/>
      <path d="M69 79c5 3 9 4 14 4" fill="none" stroke="#fff7dc" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
      <ellipse cx="76" cy="114" rx="7.5" ry="3" fill="#9ea55d" opacity="0.9"/>
      <ellipse cx="76" cy="107" rx="8.3" ry="7" fill="#d1d8b1" opacity="0.5"/>
      <ellipse cx="75" cy="97" rx="10" ry="9" fill="#dce1c3" opacity="0.28"/>
    </g>
    <rect x="16" y="9" width="20" height="8" rx="3" fill="#5e7680"/>
    <rect x="66" y="9" width="20" height="8" rx="3" fill="#5e7680"/>
    ${tubePairBase(assetsRoot)}
  `);
}

function precipitatePourStartSvg(assetsRoot) {
  return precipitateShell(`
    <g clip-path="url(#rightTubeInterior)">
      <rect x="68" y="86" width="16" height="32" rx="4" fill="#f4f7df" opacity="0.4"/>
    </g>
    <rect x="66" y="9" width="20" height="8" rx="3" fill="#5e7680"/>
    ${tubeSourceGroup(assetsRoot, TUBE_EMPTY_SOURCE, "translate(64 10) scale(0.65)", 0.98)}
    <g transform="translate(54 58) rotate(-14)">
      <g clip-path="url(#tiltedTubeInterior)">
        <path d="M-8 4H8V41C8 51 3 57 0 57C-3 57-8 51-8 41Z" fill="#ffe3a0" opacity="0.88"/>
        <ellipse cx="0" cy="4" rx="7.2" ry="2.5" fill="#fff2c8" opacity="0.42"/>
      </g>
      <rect x="-10" y="-57" width="20" height="8" rx="3" fill="#5e7680"/>
      ${tubeSourceGroup(assetsRoot, TUBE_EMPTY_SOURCE, "translate(-20.6 -58.2) scale(0.65)", 0.98)}
    </g>
  `);
}

function precipitatePourEndSvg(assetsRoot) {
  return precipitateShell(`
    <g clip-path="url(#rightTubeInterior)">
      <rect x="68" y="74" width="16" height="44" rx="4" fill="#f4f7df" opacity="0.72"/>
      <ellipse cx="76" cy="111" rx="7.5" ry="3" fill="#9ea55d" opacity="0.84"/>
      <ellipse cx="76" cy="103" rx="8.3" ry="7" fill="#d1d8b1" opacity="0.48"/>
    </g>
    <rect x="66" y="9" width="20" height="8" rx="3" fill="#5e7680"/>
    ${tubeSourceGroup(assetsRoot, TUBE_EMPTY_SOURCE, "translate(64 10) scale(0.65)", 0.98)}
    <g transform="translate(54 58) rotate(-36)">
      <g clip-path="url(#tiltedTubeInterior)">
        <path d="M1 15H8V41C8 51 3 57 0 57C-3 57-8 51-8 41V26Z" fill="#ffe3a0" opacity="0.48"/>
      </g>
      <rect x="-10" y="-57" width="20" height="8" rx="3" fill="#5e7680"/>
      ${tubeSourceGroup(assetsRoot, TUBE_EMPTY_SOURCE, "translate(-20.6 -58.2) scale(0.65)", 0.98)}
    </g>
    <path d="M63 70C68 77 72 85 76 93" fill="none" stroke="#f3d086" stroke-width="4" stroke-linecap="round" opacity="0.56"/>
  `);
}

function precipitatePourSvg(assetsRoot) {
  return precipitateShell(`
    <g clip-path="url(#rightTubeInterior)">
      <rect x="68" y="96" width="16" height="18" rx="4" fill="#f4f7df" opacity="0.66">
        <animate attributeName="y" values="96;90;82;76" dur="3.8s" fill="freeze"/>
        <animate attributeName="height" values="18;24;32;38" dur="3.8s" fill="freeze"/>
      </rect>
      <path d="M69 98c5 3 9 4 14 4" fill="none" stroke="#fff7dc" stroke-width="2" stroke-linecap="round" opacity="0">
        <animate attributeName="opacity" values="0;0;0.24;0.46" dur="3.8s" fill="freeze"/>
      </path>
      <ellipse cx="76" cy="114" rx="7.5" ry="3" fill="#9ea55d" opacity="0">
        <animate attributeName="cy" values="114;111;107;103" dur="3.8s" fill="freeze"/>
        <animate attributeName="opacity" values="0;0.18;0.52;0.88" dur="3.8s" fill="freeze"/>
      </ellipse>
      <ellipse cx="76" cy="100" rx="10" ry="9" fill="#dce1c3" opacity="0">
        <animate attributeName="cy" values="104;101;98;95" dur="3.8s" fill="freeze"/>
        <animate attributeName="opacity" values="0;0;0.22;0.34" dur="3.8s" fill="freeze"/>
      </ellipse>
    </g>
    <rect x="66" y="9" width="20" height="8" rx="3" fill="#5e7680"/>
    ${tubeSourceGroup(assetsRoot, TUBE_EMPTY_SOURCE, "translate(64 10) scale(0.65)", 0.98)}
    <g transform="translate(54 58)">
      <animateTransform attributeName="transform" type="translate" values="54 58;50 52;46 47;46 47" dur="3.8s" fill="freeze"/>
      <animateTransform attributeName="transform" additive="sum" type="rotate" values="0;-15;-33;-35" dur="3.8s" fill="freeze"/>
      <g clip-path="url(#tiltedTubeInterior)">
        <path d="M-8 4H8V41C8 51 3 57 0 57C-3 57-8 51-8 41Z" fill="#ffe3a0" opacity="0.88">
          <animate attributeName="d" values="M-8 4H8V41C8 51 3 57 0 57C-3 57-8 51-8 41Z;M-5 10H8V41C8 51 3 57 0 57C-3 57-8 51-8 41V18Z;M-1 18H8V41C8 51 3 57 0 57C-3 57-8 51-8 41V28Z;M4 28H8V41C8 51 3 57 0 57C-3 57-8 51-8 41V36Z" dur="3.8s" fill="freeze"/>
        </path>
        <ellipse cx="0" cy="4" rx="7.2" ry="2.5" fill="#fff2c8" opacity="0.44">
          <animate attributeName="opacity" values="0.44;0.28;0.08;0" dur="3.8s" fill="freeze"/>
        </ellipse>
      </g>
      <rect x="-10" y="-57" width="20" height="8" rx="3" fill="#5e7680"/>
      ${tubeSourceGroup(assetsRoot, TUBE_EMPTY_SOURCE, "translate(-20.6 -58.2) scale(0.65)", 0.98)}
    </g>
    <path d="M62 69C67 77 71 86 76 94" fill="none" stroke="#f3d086" stroke-width="4.2" stroke-linecap="round" opacity="0">
      <animate attributeName="opacity" values="0;0;0.92;0.68;0" keyTimes="0;0.18;0.38;0.72;1" dur="3.8s" fill="freeze"/>
    </path>
  `);
}

function ensureVesselAssets(assetsRoot) {
  mkdirSync(assetsRoot, { recursive: true });

  writeAsset(assetsRoot, "beaker-outline.svg", beakerOutlineSvg(assetsRoot));
  writeAsset(assetsRoot, "beaker-ice-before.svg", beakerIceBeforeSvg(assetsRoot));
  writeAsset(assetsRoot, "beaker-ice-after.svg", beakerIceAfterSvg(assetsRoot));
  writeAsset(assetsRoot, "beaker-ice-melting.svg", beakerIceMeltingSvg(assetsRoot));
  writeAsset(assetsRoot, "beaker-ice-melting-early.svg", beakerIceBeforeSvg(assetsRoot));
  writeAsset(assetsRoot, "beaker-ice-melting-late.svg", beakerIceAfterSvg(assetsRoot));

  writeAsset(assetsRoot, "beaker-sugar-before.svg", beakerSugarSvg(assetsRoot, "before"));
  writeAsset(assetsRoot, "beaker-sugar-not-stirred.svg", beakerSugarSvg(assetsRoot, "notStirred"));
  writeAsset(assetsRoot, "beaker-sugar-not-stirred-mid.svg", beakerSugarSvg(assetsRoot, "notStirredMid"));
  writeAsset(assetsRoot, "beaker-sugar-stirred.svg", beakerSugarSvg(assetsRoot, "stirred"));
  writeAsset(assetsRoot, "beaker-sugar-stirred-mid.svg", beakerSugarSvg(assetsRoot, "stirredMid"));

  writeAsset(assetsRoot, "beaker-alka-before.svg", beakerAlkaSvg(assetsRoot, "before"));
  writeAsset(assetsRoot, "beaker-alka-vented-start.svg", beakerAlkaSvg(assetsRoot, "ventedStart"));
  writeAsset(assetsRoot, "beaker-alka-vented.svg", beakerAlkaSvg(assetsRoot, "vented"));

  writeAsset(assetsRoot, "jar-outline.svg", jarOutlineSvg(assetsRoot));
  writeAsset(assetsRoot, "jar-alka-captured-start.svg", jarAlkaCapturedSvg(assetsRoot, "start"));
  writeAsset(assetsRoot, "jar-alka-captured.svg", jarAlkaCapturedSvg(assetsRoot, "live"));

  writeAsset(assetsRoot, "precipitate-before.svg", precipitateBeforeSvg(assetsRoot));
  writeAsset(assetsRoot, "precipitate-after.svg", precipitateAfterSvg(assetsRoot));
  writeAsset(assetsRoot, "precipitate-pour-start.svg", precipitatePourStartSvg(assetsRoot));
  writeAsset(assetsRoot, "precipitate-pour-end.svg", precipitatePourEndSvg(assetsRoot));
  writeAsset(assetsRoot, "precipitate-pour.svg", precipitatePourSvg(assetsRoot));
}

export { ensureVesselAssets };
