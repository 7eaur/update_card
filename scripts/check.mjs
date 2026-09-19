import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const serviceRoutes = [
  'games',
  'social-entertainment',
  'gift-cards',
  'subscriptions',
  'software-licenses',
  'digital-payments',
  'international-shopping',
  'custom-request',
];

const required = [
  'index.html',
  'about/index.html',
  'services/index.html',
  ...serviceRoutes.map((slug) => `services/${slug}/index.html`),
  'faq/index.html',
  'contact/index.html',
  '404.html',
  'assets/site.css',
  'assets/site.js',
  'assets/brand/logo-horizontal-320.webp',
  'assets/brand/logo-icon-512.webp',
];

for (const file of required) await access(join(dist, file));

const htmlFiles = [];
async function walkHtml(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walkHtml(path);
    else if (entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}
await walkHtml(dist);

const localRefs = new Set();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!html.includes('<html lang="ar" dir="rtl">')) throw new Error(`Missing Arabic RTL root: ${file}`);
  if (!html.includes('<main id="main-content">')) throw new Error(`Missing main landmark: ${file}`);
  if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error(`Expected exactly one H1: ${file}`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
    const ref = match[1].split('#')[0].split('?')[0];
    if (ref) localRefs.add(ref);
  }
}

for (const ref of localRefs) {
  if (ref === '/') continue;
  const candidate = ref.endsWith('/') ? join(dist, ref, 'index.html') : join(dist, ref);
  try {
    await access(candidate);
  } catch {
    throw new Error(`Broken local reference: ${ref} -> ${candidate}`);
  }
}

const subserviceRoot = join(dist, 'assets', 'media', 'subservices');
const subserviceAssets = [];
async function walkSubserviceAssets(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walkSubserviceAssets(path);
    else subserviceAssets.push(path);
  }
}
await walkSubserviceAssets(subserviceRoot);

const unusedSubserviceAssets = subserviceAssets
  .map((file) => '/' + relative(dist, file).split(sep).join('/'))
  .filter((ref) => !localRefs.has(ref));

if (unusedSubserviceAssets.length) {
  throw new Error(
    `Unused subservice media found in production assets:\n${unusedSubserviceAssets.join('\n')}`
  );
}

console.log(
  `Checked ${htmlFiles.length} HTML pages, ${localRefs.size} local references, and ${subserviceAssets.length} referenced subservice assets.`
);
