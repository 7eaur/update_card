import { services } from '../data/services.js';
import { renderServiceCard } from '../components/ServiceCard.js';
import { renderContactCTA } from '../components/ContactCTA.js';

export const renderServicesPage = () => `
<section class="page-hero page-hero--services section-shell"><div class="container page-hero__grid"><div><p class="eyebrow">خدماتنا</p><h1>استكشف مجالات خدماتنا الرقمية</h1><p>ثمانية مجالات رئيسية مرتبة حسب احتياجك، بدون تحويل الموقع إلى متجر أو كتالوج شراء.</p></div><div class="page-hero__mark"><img src="/assets/brand/logo-icon-512.webp" width="512" height="256" alt="رمز أبديت كارد"></div></div></section>
<section class="services-section section-shell"><div class="container"><div class="services-directory">${services.map(renderServiceCard).join('')}</div></div></section>
<div class="container">${renderContactCTA({ eyebrow: 'لم تجد ما تحتاجه؟', title: 'خدمة حسب الطلب موجودة لهذا السبب', text: 'أرسل تفاصيل طلبك وسنراجع إمكانية توفيره قبل تأكيد أي شيء.' })}</div>`;
