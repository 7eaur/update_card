import { site } from '../config/site.js';
import { icon } from '../components/icons.js';
import { renderResponsiveImage } from '../components/ResponsiveImage.js';

export const renderContactPage = () => `
<section class="page-hero section-shell">
  <div class="container page-hero__grid">
    <div><p class="eyebrow">تواصل معنا</p><h1>نحن قريبون عندما تحتاج خدمة أو استفسار</h1><p>اختر وسيلة التواصل الأنسب لك. واتساب هو القناة الرئيسية للاستفسارات والطلبات.</p></div>
    <div class="page-hero__visual">${renderResponsiveImage({ name: 'contact', alt: 'تصور بصري لقنوات التواصل مع أبديت كارد', className: 'page-hero__image', variant: 'page', loading: 'eager' })}</div>
  </div>
</section>

<section class="content-section section-shell">
  <div class="container contact-grid">
    <a class="contact-card contact-card--whatsapp" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<div><span>واتساب</span><strong>${site.phoneDisplay}</strong><small>القناة الرئيسية للاستفسارات والطلبات</small></div></a>
    <a class="contact-card" href="${site.phoneHref}">${icon('phone')}<div><span>اتصال مباشر</span><strong>${site.phoneDisplay}</strong><small>للتواصل الهاتفي المباشر</small></div></a>
    <a class="contact-card" href="${site.facebookHref}" target="_blank" rel="noopener noreferrer">${icon('facebook')}<div><span>فيسبوك</span><strong>UPDATE CARD</strong><small>الصفحة الرسمية الحالية</small></div></a>
  </div>
</section>

<section class="content-section section-shell">
  <div class="container split-panel split-panel--accent">
    <div><p class="eyebrow">قبل أن تراسلنا</p><h2>كلما كان طلبك أوضح، كان الرد أسرع</h2><p>أرسل اسم الخدمة أو المنصة، الدولة أو المنطقة إن كانت مهمة، والرابط أو الخطة أو الكمية عند الحاجة.</p></div>
    <a class="button button--primary" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">ابدأ عبر واتساب ${icon('whatsapp')}</a>
  </div>
</section>

<section class="content-section section-shell">
  <div class="container split-panel">
    <div><p class="eyebrow">خدمة حسب الطلب</p><h2>عندك طلب غير موجود في الموقع؟</h2><p>أرسل اسم الخدمة أو الرابط والمنطقة والتفاصيل، وسنراجع إمكانية توفيرها قبل تأكيد السعر أو التنفيذ.</p></div>
    <a class="button button--ghost" href="/services/custom-request/">تفاصيل خدمة حسب الطلب ${icon('arrow')}</a>
  </div>
</section>`;
