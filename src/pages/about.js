import { site } from '../config/site.js';
import { icon } from '../components/icons.js';
import { renderContactCTA } from '../components/ContactCTA.js';

export const renderAboutPage = () => `
<section class="page-hero section-shell">
  <div class="container page-hero__grid">
    <div><p class="eyebrow">من نحن</p><h1>منذ ${site.since}، نعمل في عالم الخدمات الرقمية</h1><p>خبرة متخصصة في الشحن والدفع والشراء الإلكتروني وخدمات رقمية متعددة للأفراد وقطاع الجملة.</p></div>
    <div class="page-hero__mark"><img src="/assets/brand/logo-icon-512.webp" width="512" height="256" alt="رمز أبديت كارد"></div>
  </div>
</section>
<section class="content-section section-shell"><div class="container content-grid"><div><p class="eyebrow">قصتنا</p><h2>خبرة متخصصة منذ ${site.since}</h2></div><div><p>منذ عام ${site.since}، تعمل <strong>${site.brandNameAr}</strong> في مجال الخدمات الرقمية وحلول الشحن والدفع والشراء الإلكتروني، مع خبرة متخصصة في تنفيذ مجموعة متنوعة من العمليات الرقمية عبر المنصات والمواقع المدعومة.</p><p>نخدم عملاء التجزئة والجملة، ونحرص على أن تكون تجربة التعامل واضحة وسريعة وموثوقة، بدءًا من الاستفسار وحتى إتمام الخدمة.</p></div></div></section>
<section class="content-section section-shell"><div class="container value-cards"><article><span>01</span><h2>سرعة</h2><p>تنفيذ منظم واستجابة مباشرة ضمن طبيعة الخدمة.</p></article><article><span>02</span><h2>وضوح</h2><p>تأكيد التفاصيل والتوفر والسعر قبل التنفيذ.</p></article><article><span>03</span><h2>موثوقية</h2><p>تعامل واضح ومتابعة مباشرة للطلب.</p></article></div></section>
<section class="content-section section-shell"><div class="container split-panel"><div><p class="eyebrow">نطاق العمل</p><h2>من الشحن إلى الدفع والشراء العالمي</h2><p>تشمل خدماتنا شحن الألعاب والتطبيقات، البطاقات والاشتراكات الرقمية، الدفع الإلكتروني، التراخيص والبرمجيات، والشراء من المواقع العالمية، إلى جانب خدمات أخرى حسب الطلب والتوفر.</p></div><a class="button button--primary" href="/services/">استكشف خدماتنا ${icon('arrow')}</a></div></section>
<div class="container">${renderContactCTA({ title: 'حاب تعرف أكثر أو عندك استفسار؟' })}</div>`;
