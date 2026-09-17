import { services } from '../data/services.js';
import { renderServiceCard } from '../components/ServiceCard.js';
import { renderContactCTA } from '../components/ContactCTA.js';
import { renderResponsiveImage } from '../components/ResponsiveImage.js';

export const renderServicesPage = () => `
<section class="page-hero page-hero--services section-shell">
  <div class="container page-hero__grid">
    <div><p class="eyebrow">خدماتنا</p><h1>استكشف مجالات خدماتنا الرقمية</h1><p>ثمانية مجالات رئيسية مرتبة حسب احتياجك، لتفهم ما نقدمه بسرعة ثم تدخل إلى التفاصيل التي تهمك.</p></div>
    <div class="page-hero__visual">${renderResponsiveImage({ name: 'wholesale', alt: 'تصور بصري لخدمات أبديت كارد الرقمية', className: 'page-hero__image', variant: 'page', loading: 'eager' })}</div>
  </div>
</section>

<section class="services-section section-shell">
  <div class="container">
    <div class="services-directory">${services.map(renderServiceCard).join('')}</div>
  </div>
</section>

<section class="content-section section-shell">
  <div class="container services-note">
    <div><p class="eyebrow">مهم</p><h2>القائمة للتعريف والاستكشاف، وليست متجرًا</h2></div>
    <p>التوفر والسعر وآلية التنفيذ قد تختلف حسب المنصة والمنطقة ونوع الطلب. عند اختيار المجال المناسب تواصل معنا لتأكيد التفاصيل الحالية.</p>
  </div>
</section>

<div class="container">${renderContactCTA({ eyebrow: 'لم تجد ما تحتاجه؟', title: 'خدمة حسب الطلب موجودة لهذا السبب', text: 'أرسل تفاصيل طلبك وسنراجع إمكانية توفيره قبل تأكيد أي شيء.' })}</div>`;
