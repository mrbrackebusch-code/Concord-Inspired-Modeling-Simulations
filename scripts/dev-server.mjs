import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";

const portArgIndex = process.argv.indexOf("--port");
const port =
  portArgIndex !== -1 && process.argv[portArgIndex + 1]
    ? Number(process.argv[portArgIndex + 1])
    : Number(process.env.PORT || 8123);

const root = resolve(process.cwd());

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function send(res, statusCode, contentType, body) {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

const server = createServer((req, res) => {
  const rawPath = (req.url || "/").split("?")[0];
  const decodedPath = decodeURIComponent(rawPath);
  const requestedPath = decodedPath === "/" ? "/apps/studio/index.html" : decodedPath;
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safePath);

  if (!filePath.startsWith(root)) {
    send(res, 403, "text/plain; charset=utf-8", "Forbidden");
    return;
  }

  if (!existsSync(filePath)) {
    send(res, 404, "text/plain; charset=utf-8", "Not Found");
    return;
  }

  const stats = statSync(filePath);

  if (stats.isDirectory()) {
    const indexPath = join(filePath, "index.html");
    if (!existsSync(indexPath)) {
      send(res, 403, "text/plain; charset=utf-8", "Directory listing is disabled");
      return;
    }

    res.writeHead(200, { "Content-Type": mimeTypes[".html"] });
    createReadStream(indexPath).pipe(res);
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(res);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(`Concord Lab dev server is already running at http://localhost:${port}/apps/studio/index.html`);
    process.exit(0);
  }

  throw error;
});

server.listen(port, () => {
  console.log(`Concord Lab dev server running at http://localhost:${port}/apps/studio/index.html`);
  console.log("Open the Mass & Change evidence suite from the studio page.");
});