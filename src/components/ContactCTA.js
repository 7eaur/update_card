import { site } from '../config/site.js';
import { icon } from './icons.js';

export const renderContactCTA = ({
  eyebrow = 'جاهز نساعدك',
  title = 'عندك خدمة في بالك؟',
  text = 'تواصل معنا مباشرة عبر واتساب، وأرسل لنا تفاصيل طلبك.',
} = {}) => `
<section class="contact-cta">
  <img class="contact-cta__backdrop" src="/assets/images/home/cta-banner.webp" alt="" width="1220" height="407" loading="lazy" decoding="async" aria-hidden="true">
  <div class="contact-cta__content">
    <p class="eyebrow">${eyebrow}</p>
    <h2>${title}</h2>
    <p>${text}</p>
  </div>
  <div class="contact-cta__actions">
    <a class="button button--light" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} تواصل عبر واتساب</a>
    <a class="text-link text-link--light" href="${site.phoneHref}">${icon('phone')} اتصل بنا</a>
  </div>
</section>`;
