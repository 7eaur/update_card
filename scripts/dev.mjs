import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const root = resolve(process.cwd());
const dist = resolve(root, 'dist');
const port = Number(process.env.PORT || 4173);

const build = spawn(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });
await new Promise((resolveBuild, rejectBuild) => {
  build.on('exit', (code) => (code === 0 ? resolveBuild() : rejectBuild(new Error(`Build failed: ${code}`))));
});

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png' };

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const filePath = normalize(join(dist, pathname));
    if (!filePath.startsWith(dist)) throw new Error('Invalid path');
    let target = filePath;
    try { await stat(target); } catch { target = join(dist, '404.html'); res.statusCode = 404; }
    const body = await readFile(target);
    res.setHeader('Content-Type', types[extname(target)] || 'application/octet-stream');
    res.end(body);
  } catch {
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}).listen(port, () => console.log(`UPDATE CARD preview: http://localhost:${port}`));
