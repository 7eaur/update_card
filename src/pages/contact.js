import { site } from '../config/site.js';
import { icon } from '../components/icons.js';
import { renderPageHero } from '../components/PageHero.js';

export const renderContactPage = () => `
${renderPageHero({
  eyebrow: 'تواصل معنا',
  title: 'نحن قريبون عندما تحتاج خدمة أو استفسار',
  text: 'اختر وسيلة التواصل الأنسب لك. واتساب هو القناة الرئيسية للاستفسارات والطلبات.',
  imageSrc: '/assets/images/home/about.avif',
  imageAlt: 'واجهة أبديت كارد الرسمية',
})}

<section class="content-section">
  <div class="container contact-grid">
    <a class="contact-card contact-card--whatsapp" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<div><span>واتساب</span><strong>${site.phoneDisplay}</strong><small>القناة الرئيسية للاستفسارات والطلبات</small></div></a>
    <a class="contact-card" href="${site.phoneHref}">${icon('phone')}<div><span>اتصال مباشر</span><strong>${site.phoneDisplay}</strong><small>للتواصل الهاتفي المباشر</small></div></a>
    <a class="contact-card" href="${site.facebookHref}" target="_blank" rel="noopener noreferrer">${icon('facebook')}<div><span>فيسبوك</span><strong>UPDATE CARD</strong><small>الصفحة الرسمية الحالية</small></div></a>
  </div>
</section>

<section class="content-section">
  <div class="container contact-meta">
    <a class="contact-meta__item" href="${site.emailHref}">${icon('mail')}<div><span>البريد الإلكتروني</span><strong>${site.email}</strong></div></a>
    <div class="contact-meta__item">${icon('mapPin')}<div><span>الموقع</span><strong>${site.location}</strong></div></div>
    <a class="contact-meta__item" href="${site.siteUrl}" target="_blank" rel="noopener noreferrer">${icon('globe')}<div><span>الموقع الإلكتروني</span><strong>${site.domainDisplay}</strong></div></a>
  </div>
</section>

<section class="content-section">
  <div class="container split-panel split-panel--accent">
    <div><p class="eyebrow">قبل أن تراسلنا</p><h2>كلما كان طلبك أوضح، كان الرد أسرع</h2><p>أرسل اسم الخدمة أو المنصة، الدولة أو المنطقة إن كانت مهمة، والرابط أو الخطة أو الكمية عند الحاجة.</p></div>
    <a class="button button--primary" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">ابدأ عبر واتساب ${icon('whatsapp')}</a>
  </div>
</section>

<section class="content-section">
  <div class="container split-panel">
    <div><p class="eyebrow">خدمة حسب الطلب</p><h2>عندك طلب غير موجود في الموقع؟</h2><p>أرسل اسم الخدمة أو الرابط والمنطقة والتفاصيل، وسنراجع إمكانية توفيرها قبل تأكيد السعر أو التنفيذ.</p></div>
    <a class="button button--ghost" href="/services/custom-request/">تفاصيل خدمة حسب الطلب ${icon('arrow')}</a>
  </div>
</section>`;
