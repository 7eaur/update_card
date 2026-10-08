import { site } from '../config/site.js';
import { renderHeader } from '../components/Header.js';
import { renderFooter } from '../components/Footer.js';
import { renderLogoIntro, renderNavigationStatus } from '../components/LogoIntro.js';
import { icon } from '../components/icons.js';

const jsonLdSafe = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

export const renderLayout = ({
  title,
  description,
  currentPath = '/',
  content,
  noIndex = false,
  pageType = 'WebPage',
  socialImage = site.socialImage,
  socialImageAlt = site.socialImageAlt,
  structuredData = [],
}) => {
  const pageTitle = title
    ? (title.includes(site.brandNameAr) ? title : `${title} | ${site.brandNameAr}`)
    : `${site.brandNameAr} | خدمات رقمية في اليمن منذ ${site.since}`;
  const metaDescription = description || site.description;
  const canonicalUrl = new URL(currentPath, site.siteUrl).toString();
  const socialImageUrl = new URL(socialImage, site.siteUrl).toString();
  const organizationId = `${site.siteUrl}/#organization`;
  const websiteId = `${site.siteUrl}/#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: site.brandNameAr,
      alternateName: site.brandAliases,
      url: site.siteUrl,
      foundingDate: String(site.since),
      description: site.description,
      logo: {
        '@type': 'ImageObject',
        url: `${site.siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: {
        '@type': 'ImageObject',
        url: socialImageUrl,
        width: 1024,
        height: 1024,
      },
      telephone: '+967770498884',
      email: site.email,
      areaServed: {
        '@type': 'Country',
        name: site.areaServed,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'صنعاء',
        addressCountry: site.countryCode,
      },
      sameAs: [site.facebookHref],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+967770498884',
        email: site.email,
        contactType: 'customer service',
        areaServed: site.countryCode,
        availableLanguage: [site.language],
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: site.siteUrl,
      name: site.brandNameAr,
      alternateName: site.brandAliases,
      publisher: { '@id': organizationId },
      inLanguage: site.language,
    },
    {
      '@type': pageType,
      '@id': webpageId,
      url: canonicalUrl,
      name: pageTitle,
      description: metaDescription,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: socialImageUrl,
      },
      inLanguage: site.language,
    },
    ...structuredData,
  ];

  const structuredGraph = jsonLdSafe({
    '@context': 'https://schema.org',
    '@graph': graph,
  });

  const robots = noIndex
    ? 'noindex,follow'
    : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#031877">
  <meta name="color-scheme" content="light">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${site.brandName}">
  <meta property="og:locale" content="${site.locale}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${socialImageUrl}">
  <meta property="og:image:secure_url" content="${socialImageUrl}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1024">
  <meta property="og:image:height" content="1024">
  <meta property="og:image:alt" content="${socialImageAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description" content="${metaDescription}">
  <meta name="twitter:image" content="${socialImageUrl}">
  <meta name="twitter:image:alt" content="${socialImageAlt}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
  <!-- Eligibility is recorded early; animation starts only after its real logo is decoded. -->
  <script>
    (() => {
      try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (document.visibilityState === 'hidden') return;
        if (sessionStorage.getItem('update-card-intro-v1')) return;
        sessionStorage.setItem('update-card-intro-v1', 'seen');
        document.documentElement.dataset.brandIntroEligible = 'true';
      } catch (_) {
        // Storage-restricted browsers show the website without interrupting navigation.
      }
    })();
  </script>
  <link rel="stylesheet" href="/assets/site.css?v=${site.assetVersion}">
  <script type="application/ld+json">${structuredGraph}</script>
  <script src="/assets/site.js?v=${site.assetVersion}" defer></script>
</head>
<body>
  ${renderLogoIntro()}
  ${renderNavigationStatus()}
  <a class="skip-link" href="#main-content">انتقل إلى المحتوى</a>
  ${renderHeader(currentPath)}
  <main id="main-content">${content}</main>
  ${renderFooter()}
  <button class="back-to-top" type="button" aria-label="العودة إلى أعلى الصفحة" title="العودة إلى الأعلى" data-back-to-top tabindex="-1" aria-hidden="true">
    ${icon('arrowUp')}
  </button>
</body>
</html>`;
};
