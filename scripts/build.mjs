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
import { faqs } from '../src/data/faqs.js';
import { site } from '../src/config/site.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, 'assets/brand'), { recursive: true });
await mkdir(resolve(dist, 'assets/favicon'), { recursive: true });
await mkdir(resolve(dist, 'assets/media'), { recursive: true });
await mkdir(resolve(dist, 'assets/images'), { recursive: true });
await mkdir(resolve(dist, 'assets/fonts'), { recursive: true });
await mkdir(resolve(dist, 'assets/social'), { recursive: true });

const brandTokens = await readFile(resolve(root, 'brand/tokens/brand-tokens.css'), 'utf8');
const cssFiles = ['tokens.css', 'base.css', 'layout.css', 'components.css', 'brand-intro.css', 'media.css'];
const css = [brandTokens, ...(await Promise.all(cssFiles.map((file) => readFile(resolve(root, 'src/styles', file), 'utf8'))))].join('\n\n');
await writeFile(resolve(dist, 'assets/site.css'), css);
await cp(resolve(root, 'src/client/site.js'), resolve(dist, 'assets/site.js'));
await cp(resolve(root, 'src/assets/media'), resolve(dist, 'assets/media'), { recursive: true });
await cp(resolve(root, 'src/assets/images'), resolve(dist, 'assets/images'), { recursive: true });
await cp(resolve(root, 'src/assets/fonts'), resolve(dist, 'assets/fonts'), { recursive: true });

const assetCopies = [
  ['brand/web/logo-horizontal-320.webp', 'assets/brand/logo-horizontal-320.webp'],
  ['brand/web/logo-horizontal-640.webp', 'assets/brand/logo-horizontal-640.webp'],
  ['brand/web/logo-icon-512.webp', 'assets/brand/logo-icon-512.webp'],
  ['brand/social/social-avatar-1024.png', 'assets/social/update-card-share.png'],
  ['brand/favicon/favicon-16x16.png', 'assets/favicon/favicon-16x16.png'],
  ['brand/favicon/favicon-32x32.png', 'assets/favicon/favicon-32x32.png'],
  ['brand/favicon/favicon.ico', 'favicon.ico'],
  ['brand/app-icons/apple-touch-icon.png', 'assets/favicon/apple-touch-icon.png'],
  ['brand/app-icons/icon-192.png', 'icon-192.png'],
  ['brand/app-icons/icon-512.png', 'icon-512.png'],
  ['brand/app-icons/maskable-icon-192.png', 'maskable-icon-192.png'],
  ['brand/app-icons/maskable-icon-512.png', 'maskable-icon-512.png'],
  ['brand/app-icons/site.webmanifest', 'site.webmanifest'],
];
for (const [from, to] of assetCopies) {
  await mkdir(dirname(resolve(dist, to)), { recursive: true });
  await cp(resolve(root, from), resolve(dist, to));
}

const organizationRef = { '@id': `${site.siteUrl}/#organization` };

const breadcrumbSchema = (path, name) => ({
  '@type': 'BreadcrumbList',
  '@id': `${new URL(path, site.siteUrl)}#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'الرئيسية',
      item: `${site.siteUrl}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'الخدمات',
      item: `${site.siteUrl}/services/`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name,
      item: new URL(path, site.siteUrl).toString(),
    },
  ],
});

const serviceSeo = {
  games: {
    title: 'شحن الألعاب والخدمات الرقمية في اليمن',
    description: 'خدمات شحن الألعاب والمنصات الرقمية المدعومة في اليمن مع تأكيد الحساب والمنطقة والتوفر قبل التنفيذ.',
  },
  'social-entertainment': {
    title: 'خدمات التطبيقات الاجتماعية والترفيهية',
    description: 'خدمات رقمية للتطبيقات الاجتماعية والترفيهية المدعومة مع توضيح نوع الخدمة والتوفر قبل التنفيذ.',
  },
  'gift-cards': {
    title: 'البطاقات الرقمية وبطاقات المتاجر في اليمن',
    description: 'بطاقات رقمية لمتاجر ومنصات عالمية مع مراجعة منطقة الحساب ونوع البطاقة قبل الشراء.',
  },
  subscriptions: {
    title: 'الاشتراكات الرقمية في اليمن',
    description: 'اشتراكات وتجديدات لخدمات رقمية وترفيهية مدعومة مع تأكيد الخطة وطريقة التفعيل والتوفر.',
  },
  'software-licenses': {
    title: 'تراخيص البرامج وأنظمة التشغيل في اليمن',
    description: 'تراخيص وتفعيلات للبرامج وأنظمة التشغيل والحماية مع تحديد المنتج والإصدار قبل التنفيذ.',
  },
  'digital-payments': {
    title: 'خدمات الدفع الإلكتروني في اليمن',
    description: 'خدمات دفع وسداد رقمية عبر منصات ومحافظ مدعومة مع مراجعة نوع العملية والمنصة والتوفر.',
  },
  'international-shopping': {
    title: 'الشراء من المواقع العالمية والتوصيل إلى اليمن',
    description: 'مساعدة في الشراء من متاجر عالمية مدعومة مع مراجعة رابط المنتج والدولة وخيارات التوصيل إلى اليمن.',
  },
  'custom-request': {
    title: 'خدمة رقمية حسب الطلب في اليمن',
    description: 'أرسل اسم الخدمة أو الرابط والتفاصيل المطلوبة وسنراجع إمكانية التوفير والسعر قبل التنفيذ.',
  },
};

const pages = [
  {
    path: '/',
    file: 'index.html',
    title: 'أبديت كارد | UPDATE CARD | خدمات شحن ورقمية في اليمن',
    description: 'أبديت كارد (UPDATE CARD) لخدمات الشحن الرقمي في اليمن: شحن الألعاب والبطاقات والاشتراكات والدفع الإلكتروني والشراء من المواقع العالمية.',
    pageType: 'WebPage',
    content: renderHomePage(),
  },
  {
    path: '/about/',
    file: 'about/index.html',
    title: 'من نحن',
    description: 'تعرف على أبديت كارد وخبرتها في الخدمات الرقمية في اليمن منذ عام 2018 وخدمة الأفراد والجملة.',
    pageType: 'AboutPage',
    content: renderAboutPage(),
  },
  {
    path: '/services/',
    file: 'services/index.html',
    title: 'الخدمات الرقمية في اليمن',
    description: 'استكشف خدمات أبديت كارد للشحن والبطاقات والاشتراكات والبرمجيات والدفع والشراء من المواقع العالمية.',
    pageType: 'CollectionPage',
    structuredData: [{
      '@type': 'ItemList',
      '@id': `${site.siteUrl}/services/#service-list`,
      name: 'مجالات خدمات أبديت كارد',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
        url: `${site.siteUrl}/services/${service.slug}/`,
      })),
    }],
    content: renderServicesPage(),
  },
  {
    path: '/faq/',
    file: 'faq/index.html',
    title: 'الأسئلة الشائعة',
    description: 'إجابات واضحة حول طلب خدمات أبديت كارد والتوفر والأسعار والجملة والشراء من المواقع العالمية.',
    pageType: 'FAQPage',
    structuredData: [{
      '@type': 'FAQPage',
      '@id': `${site.siteUrl}/faq/#faq`,
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }],
    content: renderFaqPage(),
  },
  {
    path: '/contact/',
    file: 'contact/index.html',
    title: 'تواصل مع أبديت كارد',
    description: 'تواصل مع أبديت كارد في اليمن عبر واتساب أو الاتصال المباشر أو فيسبوك للاستفسار عن الخدمات المتاحة.',
    pageType: 'ContactPage',
    content: renderContactPage(),
  },
];

for (const service of services) {
  const path = `/services/${service.slug}/`;
  const seo = serviceSeo[service.slug] ?? {
    title: service.title,
    description: `${service.title} ضمن خدمات أبديت كارد الرقمية في اليمن. تعرف على الخدمات والمنصات المدعومة حسب التوفر.`,
  };

  pages.push({
    path,
    file: `services/${service.slug}/index.html`,
    title: seo.title,
    description: seo.description,
    pageType: 'CollectionPage',
    structuredData: [
      {
        '@type': 'Service',
        '@id': `${new URL(path, site.siteUrl)}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.intro,
        url: new URL(path, site.siteUrl).toString(),
        provider: organizationRef,
        areaServed: {
          '@type': 'Country',
          name: site.areaServed,
        },
      },
      breadcrumbSchema(path, service.title),
    ],
    content: renderServiceFamilyPage(service),
  });
}

for (const page of pages) {
  const output = resolve(dist, page.file);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, renderLayout({
    title: page.title,
    description: page.description,
    currentPath: page.path,
    content: page.content,
    pageType: page.pageType,
    structuredData: page.structuredData ?? [],
  }));
}

const notFound = renderLayout({
  title: 'الصفحة غير موجودة',
  description: 'الصفحة التي تبحث عنها غير موجودة.',
  currentPath: '/404/',
  noIndex: true,
  content: '<section class="page-hero section-shell"><div class="container page-hero__grid"><div><p class="eyebrow">404</p><h1>الصفحة غير موجودة</h1><p>قد يكون الرابط تغير أو لم يعد متاحًا.</p><a class="button button--primary" href="/">العودة للرئيسية</a></div></div></section>',
});
await writeFile(resolve(dist, '404.html'), notFound);

const sitemapEntries = pages
  .map((page) => `  <url><loc>${new URL(page.path, site.siteUrl).toString()}</loc></url>`)
  .join('\n');
await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
);
await writeFile(
  resolve(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${site.siteUrl}/sitemap.xml\n`,
);

console.log(`Built ${pages.length + 1} static pages into dist/.`);
