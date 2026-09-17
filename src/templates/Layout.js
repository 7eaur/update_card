import { site } from '../config/site.js';
import { renderHeader } from '../components/Header.js';
import { renderFooter } from '../components/Footer.js';

export const renderLayout = ({ title, description, currentPath = '/', content, noIndex = false }) => {
  const pageTitle = title ? `${title} | ${site.brandNameAr}` : `${site.brandNameAr} | خدمات رقمية منذ ${site.since}`;
  const metaDescription = description || site.description;

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#031877">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDescription}">
  ${noIndex ? '<meta name="robots" content="noindex,follow">' : ''}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ar_YE">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDescription}">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
  <link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png">
  <link rel="stylesheet" href="/assets/site.css">
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
