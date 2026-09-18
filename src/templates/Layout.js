import { site } from '../config/site.js';
import { renderHeader } from '../components/Header.js';
import { renderFooter } from '../components/Footer.js';

export const renderLayout = ({ title, description, currentPath = '/', content, noIndex = false }) => {
  const pageTitle = title ? `${title} | ${site.brandNameAr}` : `${site.brandNameAr} | خدمات رقمية منذ ${site.since}`;
  const metaDescription = description || site.description;
  const canonicalUrl = new URL(currentPath, site.siteUrl).toString();
  const organization = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.brandName,
    alternateName: site.brandNameAr,
    url: site.siteUrl,
    foundingDate: String(site.since),
    description: site.description,
    telephone: '+967770498884',
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'صنعاء',
      addressCountry: 'YE',
    },
    sameAs: [site.facebookHref],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+967770498884',
      email: site.email,
      contactType: 'customer service',
      availableLanguage: ['ar'],
    },
  });

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#031877">
  <meta name="color-scheme" content="light">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}">
  <meta name="robots" content="${noIndex ? 'noindex,follow' : 'index,follow'}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ar_YE">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:url" content="${canonicalUrl}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/site.css">
  <script type="application/ld+json">${organization}</script>
  <script src="/assets/site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main-content">انتقل إلى المحتوى</a>
  ${renderHeader(currentPath)}
  <main id="main-content">${content}</main>
  ${renderFooter()}
</body>
</html>`;
};
