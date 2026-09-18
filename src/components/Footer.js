import { primaryNav, site } from '../config/site.js';
import { services } from '../data/services.js';
import { icon } from './icons.js';

export const renderFooter = () => `
<footer class="site-footer">
  <div class="container footer-grid">
    <section class="footer-contact" aria-labelledby="footer-contact-title">
      <h2 id="footer-contact-title">تواصل معنا</h2>
      <a href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span>تواصل عبر واتساب</span></a>
      <a href="${site.phoneHref}">${icon('phone')}<span>${site.phoneDisplay}</span></a>
      <a href="${site.emailHref}">${icon('mail')}<span>${site.email}</span></a>
      <span class="footer-contact__item">${icon('mapPin')}<span>${site.location}</span></span>
      <a href="${site.siteUrl}" target="_blank" rel="noopener noreferrer">${icon('globe')}<span>${site.domainDisplay}</span></a>
      <a href="${site.facebookHref}" target="_blank" rel="noopener noreferrer">${icon('facebook')}<span>تابعنا على فيسبوك</span></a>
    </section>

    <nav class="footer-links" aria-label="روابط سريعة">
      <h2>روابط سريعة</h2>
      ${primaryNav.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}
    </nav>

    <nav class="footer-links footer-services" aria-label="فئات الخدمات">
      <h2>خدماتنا</h2>
      ${services.slice(0,6).map((service) => `<a href="/services/${service.slug}/">${service.title}</a>`).join('')}
    </nav>

    <section class="footer-brand" aria-labelledby="footer-brand-title">
      <img src="/assets/brand/logo-horizontal-320.webp" width="320" height="137" alt="${site.brandName}" loading="lazy" decoding="async">
      <h2 id="footer-brand-title" class="sr-only">${site.brandNameAr}</h2>
      <p>أكثر من مجرد خدمات رقمية. نقدم لك حلولاً رقمية موثوقة منذ عام ${site.since} لتكون دائمًا أقرب إلى احتياجاتك.</p>
    </section>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom__inner">
      <p>جميع الحقوق محفوظة © <span data-current-year></span> UPDATE CARD</p>
      <p class="footer-credit">تم التطوير بواسطة <a href="${site.developerUrl}" target="_blank" rel="noopener noreferrer">${site.developerNameAr}</a></p>
    </div>
  </div>
</footer>`;
