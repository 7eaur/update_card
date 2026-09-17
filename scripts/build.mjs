import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderLayout } from '../src/templates/Layout.js';
import { renderHomePage } from '../src/pages/home.js';
import { renderAboutPage } from '../src/pages/about.js';
import { renderServicesPage } from '../src/pages/services.js';
import { renderFaqPage } from '../src/pages/faq.js';
import { renderContactPage } from '../src/pages/contact.js';
import { renderServiceFamilyPage } from '../src/pages/serviceFamily.js';
import { services } from '../src/data/services.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, 'assets/brand'), { recursive: true });
await mkdir(resolve(dist, 'assets/favicon'), { recursive: true });

const brandTokens = await readFile(resolve(root, 'brand/tokens/brand-tokens.css'), 'utf8');
const cssFiles = ['tokens.css', 'base.css', 'layout.css', 'components.css'];
const css = [brandTokens, ...(await Promise.all(cssFiles.map((file) => readFile(resolve(root, 'src/styles', file), 'utf8'))))].join('\n\n');
await writeFile(resolve(dist, 'assets/site.css'), css);
await cp(resolve(root, 'src/client/site.js'), resolve(dist, 'assets/site.js'));

const assetCopies = [
  ['brand/web/logo-horizontal-320.webp', 'assets/brand/logo-horizontal-320.webp'],
  ['brand/web/logo-horizontal-640.webp', 'assets/brand/logo-horizontal-640.webp'],
  ['brand/web/logo-icon-512.webp', 'assets/brand/logo-icon-512.webp'],
  ['brand/favicon/favicon-32x32.png', 'assets/favicon/favicon-32x32.png'],
  ['brand/app-icons/apple-touch-icon.png', 'assets/favicon/apple-touch-icon.png'],
];
for (const [from, to] of assetCopies) {
  await mkdir(dirname(resolve(dist, to)), { recursive: true });
  await cp(resolve(root, from), resolve(dist, to));
}

const pages = [
  { path: '/', file: 'index.html', title: '', description: 'خدمات رقمية للشحن والدفع والبطاقات والاشتراكات والشراء عبر الإنترنت منذ 2018.', content: renderHomePage() },
  { path: '/about/', file: 'about/index.html', title: 'من نحن', description: 'تعرف على أبديت كارد وخبرتها في الخدمات الرقمية منذ عام 2018.', content: renderAboutPage() },
  { path: '/services/', file: 'services/index.html', title: 'خدماتنا', description: 'استكشف مجالات خدمات أبديت كارد الرقمية للشحن والدفع والبطاقات والاشتراكات والشراء العالمي.', content: renderServicesPage() },
  { path: '/faq/', file: 'faq/index.html', title: 'الأسئلة الشائعة', description: 'إجابات مختصرة حول طريقة طلب الخدمات والتوفر والأسعار وخدمة حسب الطلب.', content: renderFaqPage() },
  { path: '/contact/', file: 'contact/index.html', title: 'تواصل معنا', description: 'تواصل مع أبديت كارد عبر واتساب أو الاتصال المباشر أو فيسبوك.', content: renderContactPage() },
];

for (const service of services) {
  pages.push({
    path: `/services/${service.slug}/`,
    file: `services/${service.slug}/index.html`,
    title: service.title,
    description: `${service.title} ضمن خدمات أبديت كارد الرقمية. تعرف على أمثلة الخدمات والمنصات المدعومة حسب التوفر.`,
    content: renderServiceFamilyPage(service),
  });
}

for (const page of pages) {
  const output = resolve(dist, page.file);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderLayout({ title: page.title, description: page.description, currentPath: page.path, content: page.content }));
}

const notFound = renderLayout({
  title: 'الصفحة غير موجودة',
  description: 'الصفحة التي تبحث عنها غير موجودة.',
  currentPath: '/404/',
  noIndex: true,
  content: '<section class="page-hero section-shell"><div class="container page-hero__grid"><div><p class="eyebrow">404</p><h1>الصفحة غير موجودة</h1><p>قد يكون الرابط تغير أو لم يعد متاحًا.</p><a class="button button--primary" href="/">العودة للرئيسية</a></div></div></section>',
});
await writeFile(resolve(dist, '404.html'), notFound);

console.log(`Built ${pages.length + 1} static pages into dist/.`);
