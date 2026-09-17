import { services } from '../data/services.js';
import { renderServiceCard } from '../components/ServiceCard.js';
import { renderContactCTA } from '../components/ContactCTA.js';
import { renderPageHero } from '../components/PageHero.js';

export const renderServicesPage = () => `
${renderPageHero({
  eyebrow: 'خدماتنا',
  title: 'استكشف مجالات خدماتنا الرقمية',
  text: 'ثمانية مجالات رئيسية مرتبة حسب احتياجك، لتفهم ما نقدمه بسرعة ثم تدخل إلى التفاصيل التي تهمك.',
  imageSrc: '/assets/images/home/hero.avif',
  imageAlt: 'مجموعة من الخدمات والمنصات الرقمية التي تغطيها أبديت كارد',
})}

<section class="services-section content-section">
  <div class="container services-panel">
    <div class="services-directory">${services.map(renderServiceCard).join('')}</div>
  </div>
</section>

<section class="content-section">
  <div class="container services-note">
    <div><p class="eyebrow">مهم</p><h2>القائمة للتعريف والاستكشاف، وليست متجرًا</h2></div>
    <p>التوفر والسعر وآلية التنفيذ قد تختلف حسب المنصة والمنطقة ونوع الطلب. عند اختيار المجال المناسب تواصل معنا لتأكيد التفاصيل الحالية.</p>
  </div>
</section>

<div class="container">${renderContactCTA({ eyebrow: 'لم تجد ما تحتاجه؟', title: 'خدمة حسب الطلب موجودة لهذا السبب', text: 'أرسل تفاصيل طلبك وسنراجع إمكانية توفيره قبل تأكيد أي شيء.' })}</div>`;
