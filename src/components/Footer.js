import { primaryNav, site } from '../config/site.js';
import { services } from '../data/services.js';
import { icon } from './icons.js';

export const renderFooter = () => `
<footer class="site-footer">
  <div class="container footer-grid">
    <section class="footer-brand" aria-labelledby="footer-brand-title">
      <img src="/assets/brand/logo-horizontal-320.webp" width="320" height="137" alt="${site.brandName}" loading="lazy" decoding="async">
      <h2 id="footer-brand-title" class="sr-only">${site.brandNameAr}</h2>
      <p>خدمات رقمية وحلول شحن ودفع وشراء إلكتروني منذ ${site.since}.</p>
      <div class="footer-social">
        <a href="${site.facebookHref}" target="_blank" rel="noopener noreferrer" aria-label="صفحة أبديت كارد على فيسبوك">${icon('facebook')}</a>
        <a href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer" aria-label="التواصل عبر واتساب">${icon('whatsapp')}</a>
      </div>
    </section>

    <nav class="footer-links" aria-label="روابط سريعة">
      <h2>روابط سريعة</h2>
      ${primaryNav.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
    </nav>

    <nav class="footer-links footer-services" aria-label="فئات الخدمات">
      <h2>الخدمات</h2>
      ${services.map((service) => `<a href="/services/${service.slug}/">${service.title}</a>`).join('')}
    </nav>

    <section class="footer-contact" aria-labelledby="footer-contact-title">
      <h2 id="footer-contact-title">تواصل معنا</h2>
      <a href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span>واتساب<br><b>${site.phoneDisplay}</b></span></a>
      <a href="${site.phoneHref}">${icon('phone')}<span>اتصال مباشر<br><b>${site.phoneDisplay}</b></span></a>
      <a href="${site.facebookHref}" target="_blank" rel="noopener noreferrer">${icon('facebook')}<span>صفحتنا الرسمية<br><b>Facebook</b></span></a>
    </section>
  </div>

  <div class="footer-bottom">
    <div class="container footer-bottom__inner">
      <p>© <span data-current-year></span> ${site.brandName}. جميع الحقوق محفوظة.</p>
      <p>موقع تعريفي للخدمات الرقمية.</p>
    </div>
  </div>
</footer>`;
