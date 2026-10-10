import { access, readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { services } from '../src/data/services.js';
import { getServiceCatalog } from '../src/data/serviceCatalog.js';

const dist = resolve(process.cwd(), 'dist');
const repositoryFiles = [
  'README.md',
  'docs/ARCHITECTURE.md',
  'docs/screenshots/home-desktop.webp',
  'docs/screenshots/home-mobile.webp',
];

for (const file of repositoryFiles) await access(resolve(process.cwd(), file));

const readme = await readFile(resolve(process.cwd(), 'README.md'), 'utf8');
for (const screenshot of repositoryFiles.filter((file) => file.startsWith('docs/screenshots/'))) {
  if (!readme.includes(screenshot)) throw new Error(`README screenshot reference missing: ${screenshot}`);
}

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
  'assets/fonts/cairo-v31-arabic.woff2',
  'assets/fonts/cairo-v31-latin.woff2',
  'assets/fonts/OFL.txt',
  'assets/brand/logo-horizontal-320.webp',
  'assets/brand/logo-horizontal-640.webp',
  'assets/brand/logo-icon-512.webp',
  'assets/social/update-card-share.png',
  'sitemap.xml',
  'robots.txt',
];

for (const file of required) await access(join(dist, file));

const introLogo = await stat(join(dist, 'assets/brand/logo-horizontal-320.webp'));
if (introLogo.size > 16 * 1024) {
  throw new Error(`First-paint intro logo exceeds 16KB: ${introLogo.size} bytes`);
}

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
  // Approved brand intro must be present without becoming page content or a second H1.
  if (!html.includes('data-brand-intro aria-hidden="true"')) throw new Error(`Missing accessible brand intro: ${file}`);
  if (!html.includes('data-navigation-status role="status" aria-live="polite"')) throw new Error(`Missing delayed-navigation accessibility feedback: ${file}`);
  if (!html.includes("localStorage.getItem(introKey)") || !html.includes("'update-card-intro-v2'")) {
    throw new Error(`Persistent first-visit intro guard missing: ${file}`);
  }
  if (!html.includes("classList.add('brand-intro-pending')")) throw new Error(`Early intro queue missing: ${file}`);
  if (html.includes("connection.saveData") || html.includes("document.visibilityState === 'hidden'")) {
    throw new Error(`First-visit intro must not be skipped for slow or background entry: ${file}`);
  }
  if (!html.includes("introPreload.href = '/assets/brand/logo-horizontal-320.webp'") ||
      !html.includes("introPreload.fetchPriority = 'high'")) {
    throw new Error(`Conditional high-priority intro logo preload missing: ${file}`);
  }
  if (!html.includes('src="/assets/brand/logo-horizontal-320.webp"') ||
      !html.includes('width="320" height="76"') ||
      !html.includes('fetchpriority="high"')) {
    throw new Error(`Fast first-paint intro source asset missing: ${file}`);
  }
  if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error(`Expected exactly one H1: ${file}`);
  if (!html.includes('<meta name="description"')) throw new Error(`Missing meta description: ${file}`);
  if (!html.includes('<link rel="preload" href="/assets/fonts/cairo-v31-arabic.woff2" as="font" type="font/woff2" crossorigin>')) {
    throw new Error(`Missing local Arabic font preload: ${file}`);
  }
  if (html.includes('fonts.googleapis.com') || html.includes('fonts.gstatic.com')) {
    throw new Error(`External Google Fonts request found: ${file}`);
  }
  if (!html.includes('<link rel="canonical" href="https://updatecard.net/')) throw new Error(`Missing canonical on primary domain: ${file}`);
  if (!file.endsWith('404.html')) {
    if (!html.includes('<meta property="og:image" content="https://updatecard.net/assets/social/update-card-share.png">')) {
      throw new Error(`Missing Open Graph share image: ${file}`);
    }
    if (!html.includes('<meta name="twitter:image" content="https://updatecard.net/assets/social/update-card-share.png">')) {
      throw new Error(`Missing Twitter share image: ${file}`);
    }
    if (!html.includes('application/ld+json')) throw new Error(`Missing JSON-LD: ${file}`);
  }
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

for (const service of services) {
  const catalog = getServiceCatalog(service.slug);
  const html = await readFile(join(dist, 'services', service.slug, 'index.html'), 'utf8');
  const cardLinks = [...html.matchAll(/<a class="subservice-card[^"]*" href="([^"]+)"/g)]
    .map((match) => match[1]);
  const inquiryCards = (html.match(/class="subservice-inquiry"/g) || []).length;

  if (cardLinks.length !== catalog.length) {
    throw new Error(
      `Expected ${catalog.length} WhatsApp subservice cards for ${service.slug}, found ${cardLinks.length}`
    );
  }
  if (inquiryCards !== 1) {
    throw new Error(`Expected one category inquiry card for ${service.slug}, found ${inquiryCards}`);
  }

  cardLinks.forEach((href, index) => {
    const url = new URL(href);
    const message = url.searchParams.get('text') || '';
    const item = catalog[index];

    if (url.hostname !== 'wa.me' || url.pathname !== '/967770498884') {
      throw new Error(`Invalid WhatsApp destination for ${service.slug}/${item.slug}: ${href}`);
    }
    if (!message.includes(item.title) || !message.includes(service.title)) {
      throw new Error(`WhatsApp message lacks service context for ${service.slug}/${item.slug}`);
    }
  });
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
  `Checked ${htmlFiles.length} HTML pages, ${localRefs.size} local references, ${subserviceAssets.length} referenced subservice assets, and ${services.length} service inquiry flows.`
);

const siteCss = await readFile(join(dist, 'assets', 'site.css'), 'utf8');
const siteJs = await readFile(join(dist, 'assets', 'site.js'), 'utf8');
if (!siteCss.includes('uc-intro-symbol') || !siteCss.includes('uc-intro-out')) {
  throw new Error('Approved brand intro animation is missing from the stylesheet');
}
if (!siteCss.includes('@media(prefers-reduced-motion:reduce)')) {
  throw new Error('Brand intro reduced-motion fallback missing');
}
if (!siteJs.includes("'uc-intro-out', 'uc-intro-fallback-out'") ||
    !siteJs.includes('brandIntro.remove()') ||
    !siteJs.includes('logo.decode()') ||
    !siteJs.includes('3000') ||
    !siteJs.includes("disposeIntro(true)") ||
    !siteJs.includes("localStorage.setItem('update-card-intro-v2', 'seen')") ||
    siteJs.includes("const exitEvents = ['pointerdown'")) {
  throw new Error('Mandatory first-visit intro, fallback, or cleanup missing');
}
if (!siteCss.includes('.brand-intro-pending .brand-intro') ||
    !siteCss.includes('@keyframes uc-intro-pending-out') ||
    !siteCss.includes('.brand-intro-pending .brand-intro__layer--finished') ||
    !siteCss.includes('@keyframes uc-intro-pending-logo') ||
    !siteCss.includes('.brand-intro-fallback .brand-intro') ||
    !siteCss.includes('pointer-events:auto')) {
  throw new Error('Immediate logo, early intro state, visual fallback, or CSS-only escape hatch missing');
}
if (siteCss.includes('.brand-intro__loader') || siteJs.includes('uc-intro-pending-spin')) {
  throw new Error('Obsolete blank-screen intro spinner must not return');
}
if (!siteJs.includes('const DELAY_MS = 350') ||
    !siteJs.includes('new URL(link.href, location.href)') ||
    !siteJs.includes("window.addEventListener('pagehide', resetStatus)") ||
    !siteJs.includes("link.hasAttribute('download')")) {
  throw new Error('Native navigation status safety guards missing');
}
if (!siteCss.includes('.navigation-status.is-visible') ||
    !siteCss.includes('@keyframes uc-status-spin')) {
  throw new Error('Nonblocking navigation loading feedback CSS missing');
}
