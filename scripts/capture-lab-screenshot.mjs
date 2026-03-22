import { existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { request } from "node:http";
import { spawn } from "node:child_process";
import { basename, extname, isAbsolute, relative, resolve } from "node:path";

const DEFAULT_PORT = 8123;
const DEFAULT_WIDTH = 1440;
const DEFAULT_HEIGHT = 1200;
const DEFAULT_BUDGET_MS = 6000;

const args = parseArgs(process.argv.slice(2));

if (!args.interactive && !args.model) {
  fail("Pass either --interactive <slug-or-path> or --model <path-to-model.json>.");
}

if (args.interactive && args.model) {
  fail("Use either --interactive or --model, not both.");
}

const root = resolve(process.cwd());
const distDir = resolve(root, "vendor", "lab", "dist");
const port = Number(args.port || DEFAULT_PORT);
const { width, height } = parseSize(args.size);
const budget = Number(args.budget || DEFAULT_BUDGET_MS);

if (!existsSync(distDir)) {
  fail("Pinned Lab distribution was not found at vendor/lab/dist.");
}

const chromePath = findChrome();
const target = await resolveTarget({
  root,
  distDir,
  interactiveArg: args.interactive,
  modelArg: args.model
});

const outputPath = resolveOutputPath({
  root,
  explicitOutput: args.out,
  label: target.label
});

const profileDir = resolve(
  root,
  ".tmp",
  "chrome-headless-new",
  sanitizeName(target.label)
);

await ensureServer(port);
await mkdir(resolve(root, ".captures"), { recursive: true });
await mkdir(profileDir, { recursive: true });

const interactiveUrl = `http://localhost:${port}/vendor/lab/dist/embeddable.html#${encodeURI(target.hashPath)}`;

console.log(`Capturing ${target.label}`);
console.log(`Chrome: ${chromePath}`);
console.log(`URL: ${interactiveUrl}`);
console.log(`Output: ${outputPath}`);

await runChrome({
  chromePath,
  interactiveUrl,
  outputPath,
  profileDir,
  width,
  height,
  budget
});

console.log("Capture complete.");

async function resolveTarget({ root, distDir, interactiveArg, modelArg }) {
  if (interactiveArg) {
    const interactivePath = resolveInteractivePath(root, interactiveArg);
    assertExists(interactivePath, "Interactive JSON");

    return {
      label: basename(interactivePath, extname(interactivePath)),
      hashPath: toPosix(relative(distDir, interactivePath))
    };
  }

  const modelPath = resolveWorkspacePath(root, modelArg);
  assertExists(modelPath, "Model JSON");

  const label = basename(modelPath, extname(modelPath));
  const tempDir = resolve(root, ".tmp", "capture-interactives");
  const tempInteractivePath = resolve(tempDir, `${sanitizeName(label)}.json`);

  await mkdir(tempDir, { recursive: true });
  await writeFile(
    tempInteractivePath,
    `${JSON.stringify(
      {
        title: `Capture: ${label}`,
        publicationStatus: "draft",
        models: [
          {
            type: "md2d",
            id: sanitizeName(label),
            url: toPosix(relative(distDir, modelPath)),
            viewOptions: {
              controlButtons: "",
              enableAtomTooltips: false,
              gridLines: false,
              xunits: false,
              yunits: false
            }
          }
        ],
        components: []
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  return {
    label,
    hashPath: toPosix(relative(distDir, tempInteractivePath))
  };
}

function resolveInteractivePath(root, interactiveArg) {
  if (looksLikePath(interactiveArg)) {
    return resolveWorkspacePath(root, interactiveArg);
  }

  return resolve(
    root,
    "simulations",
    "unit-01",
    "lesson-01",
    "mass-change",
    "interactives",
    `${interactiveArg}.json`
  );
}

function resolveWorkspacePath(root, inputPath) {
  return isAbsolute(inputPath) ? inputPath : resolve(root, inputPath);
}

function resolveOutputPath({ root, explicitOutput, label }) {
  if (explicitOutput) {
    return resolveWorkspacePath(root, explicitOutput);
  }

  return resolve(root, ".captures", `${sanitizeName(label)}.png`);
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

function parseSize(sizeArg) {
  if (!sizeArg) {
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  const match = /^(\d+)x(\d+)$/i.exec(sizeArg);
  if (!match) {
    fail("Use --size WIDTHxHEIGHT, for example --size 1600x1200.");
  }

  return {
    width: Number(match[1]),
    height: Number(match[2])
  };
}

async function ensureServer(port) {
  const isReachable = await new Promise((resolveRequest) => {
    const req = request(
      {
        host: "127.0.0.1",
        port,
        path: "/apps/studio/index.html",
        timeout: 2000
      },
      (res) => {
        res.resume();
        resolveRequest(res.statusCode === 200);
      }
    );

    req.on("error", () => resolveRequest(false));
    req.on("timeout", () => {
      req.destroy();
      resolveRequest(false);
    });
    req.end();
  });

  if (!isReachable) {
    fail(`The local dev server is not reachable at http://localhost:${port}/apps/studio/index.html. Run npm.cmd run dev first.`);
  }
}

async function runChrome({
  chromePath,
  interactiveUrl,
  outputPath,
  profileDir,
  width,
  height,
  budget
}) {
  if (existsSync(outputPath)) {
    await rm(outputPath, { force: true });
  }

  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--disable-crash-reporter",
    `--virtual-time-budget=${budget}`,
    `--user-data-dir=${profileDir}`,
    `--window-size=${width},${height}`,
    `--screenshot=${outputPath}`,
    interactiveUrl
  ];

  await new Promise((resolveRun, rejectRun) => {
    const child = spawn(chromePath, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", rejectRun);
    child.on("close", (code) => {
      if (code !== 0) {
        rejectRun(new Error(stderr || `Chrome exited with code ${code}.`));
        return;
      }

      if (!existsSync(outputPath)) {
        rejectRun(new Error("Chrome exited successfully, but no screenshot file was created."));
        return;
      }

      resolveRun();
    });
  });
}

function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  fail("Chrome was not found. Set CHROME_BIN or install Google Chrome.");
}

function looksLikePath(value) {
  return value.includes("/") || value.includes("\\") || value.endsWith(".json");
}

function assertExists(filePath, label) {
  if (!existsSync(filePath)) {
    fail(`${label} not found: ${filePath}`);
  }
}

function sanitizeName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function toPosix(value) {
  return value.replace(/\\/g, "/");
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
