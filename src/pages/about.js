import { site } from '../config/site.js';
import { icon } from '../components/icons.js';
import { renderContactCTA } from '../components/ContactCTA.js';
import { renderPageHero } from '../components/PageHero.js';

export const renderAboutPage = () => `
${renderPageHero({
  eyebrow: 'من نحن',
  title: `منذ ${site.since}، نعمل في عالم الخدمات الرقمية`,
  text: 'خبرة متخصصة في الشحن والدفع والشراء الإلكتروني وخدمات رقمية متعددة للأفراد وقطاع الجملة.',
  imageSrc: '/assets/images/home/about.avif',
  imageAlt: 'هوية أبديت كارد على واجهة مبنى حديث',
})}

<section class="content-section">
  <div class="container content-panel content-grid">
    <div><p class="eyebrow">قصتنا</p><h2>خبرة متخصصة منذ ${site.since}</h2></div>
    <div><p>منذ عام ${site.since}، تعمل <strong>${site.brandNameAr}</strong> في مجال الخدمات الرقمية وحلول الشحن والدفع والشراء الإلكتروني، مع خبرة متخصصة في تنفيذ مجموعة متنوعة من العمليات الرقمية عبر المنصات والمواقع المدعومة.</p><p>نخدم عملاء التجزئة والجملة، ونحرص على أن تكون تجربة التعامل واضحة وسريعة وموثوقة، بدءًا من الاستفسار وحتى إتمام الخدمة.</p></div>
  </div>
</section>

<section class="content-section">
  <div class="container value-cards">
    <article><span>01</span><h2>سرعة</h2><p>استجابة مباشرة وتنفيذ منظم بحسب طبيعة الخدمة وتوفرها.</p></article>
    <article><span>02</span><h2>وضوح</h2><p>نراجع التفاصيل والتوفر والسعر قبل بدء التنفيذ.</p></article>
    <article><span>03</span><h2>موثوقية</h2><p>متابعة واضحة من الاستفسار وحتى اكتمال الخدمة.</p></article>
  </div>
</section>

<section class="content-section">
  <div class="container split-panel split-panel--accent">
    <div><p class="eyebrow">نطاق العمل</p><h2>من الشحن إلى الدفع والشراء العالمي</h2><p>تشمل خدماتنا شحن الألعاب والتطبيقات، البطاقات والاشتراكات الرقمية، الدفع الإلكتروني، التراخيص والبرمجيات، والشراء من المواقع العالمية، إلى جانب خدمات أخرى حسب الطلب والتوفر.</p></div>
    <a class="button button--primary" href="/services/">استكشف خدماتنا ${icon('arrow')}</a>
  </div>
</section>

<div class="container">${renderContactCTA({ title: 'حاب تعرف أكثر أو عندك استفسار؟' })}</div>`;
