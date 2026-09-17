import { site } from '../config/site.js';
import { services } from '../data/services.js';
import { faqs } from '../data/faqs.js';
import { icon } from '../components/icons.js';
import { renderServiceCard } from '../components/ServiceCard.js';
import { renderSectionHeader } from '../components/SectionHeader.js';
import { renderContactCTA } from '../components/ContactCTA.js';

export const renderHomePage = () => `
<section class="hero section-shell">
  <div class="container hero-grid">
    <picture class="hero-media" aria-hidden="true">
      <source media="(max-width: 680px)" srcset="/assets/media/hero/hero-mobile.webp">
      <source srcset="/assets/media/hero/hero.webp">
      <img src="/assets/media/hero/hero.webp" width="800" height="450" alt="" fetchpriority="high" decoding="async">
    </picture>
    <div class="hero-content">
      <p class="eyebrow">UPDATE CARD · منذ ${site.since}</p>
      <h1>نقرّب لك عالم<br><span>الخدمات الرقمية</span></h1>
      <p class="hero-copy">حلول للشحن والدفع والبطاقات والاشتراكات والشراء عبر الإنترنت، ضمن خدمات متعددة للأفراد وقطاع الجملة.</p>
      <div class="hero-actions">
        <a class="button button--primary" href="/services/">استكشف خدماتنا ${icon('arrow')}</a>
        <a class="button button--ghost" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} تواصل عبر واتساب</a>
      </div>
      <ul class="hero-trust" aria-label="مميزات التعامل">
        <li>${icon('check')} خبرة منذ ${site.since}</li>
        <li>${icon('check')} للجملة والتجزئة</li>
        <li>${icon('check')} خدمات رقمية متعددة</li>
      </ul>
    </div>
  </div>
</section>

<section class="about-teaser section-shell">
  <div class="container about-teaser__grid">
    <div class="about-year"><span>${site.since}</span><small>بداية الخبرة</small></div>
    <div class="about-copy">
      <p class="eyebrow">عن أبديت كارد</p>
      <h2>خبرة متخصصة في عالم يتغير كل يوم</h2>
      <p>نقدم حلولًا للخدمات الرقمية والشحن والدفع والشراء الإلكتروني، مع تجربة تعامل واضحة وسريعة وموثوقة لعملاء التجزئة والجملة.</p>
      <a class="text-link" href="/about/">تعرف علينا أكثر ${icon('arrow')}</a>
    </div>
    <div class="about-note" aria-hidden="true">
      <span>سرعة</span><span>وضوح</span><span>موثوقية</span>
    </div>
  </div>
</section>

<section class="services-section section-shell">
  <div class="container">
    ${renderSectionHeader({
      eyebrow: 'مجالات خدماتنا',
      title: 'خدمات متعددة، بهيكل واضح وسهل الاستكشاف',
      description: 'اختر المجال الأقرب لاحتياجك، ثم تعرّف على الخدمات والمنصات المتوفرة داخله.',
    })}
    <div class="services-bento">
      ${services.map(renderServiceCard).join('')}
    </div>
    <div class="section-action"><a class="button button--ghost" href="/services/">عرض جميع الخدمات ${icon('arrow')}</a></div>
  </div>
</section>

<section class="platforms-strip section-shell" aria-label="أمثلة على المنصات والخدمات">
  <div class="container">
    <p class="eyebrow">أمثلة من عالم خدماتنا</p>
    <div class="platforms-list" role="list">
      ${['PUBG Mobile','Free Fire','Amazon','PlayStation','Netflix','YouTube Premium','USDT','PayPal','Windows','Adobe','SHEIN','Noon'].map((name) => `<span role="listitem">${name}</span>`).join('')}
    </div>
  </div>
</section>

<section class="values-section section-shell">
  <div class="container values-grid">
    <div class="values-copy">
      <p class="eyebrow">طريقة عمل واضحة</p>
      <h2>الراحة لا تأتي من كثرة الخيارات، بل من وضوحها</h2>
      <p>نرتب الخدمات بطريقة تساعدك على فهم ما نقدمه ثم التواصل معنا مباشرة عندما تجد ما يناسبك.</p>
    </div>
    <div class="values-list">
      <article><strong>01</strong><div><h3>السرعة</h3><p>استجابة وتنفيذ بكفاءة ضمن طبيعة كل خدمة وتوفرها.</p></div></article>
      <article><strong>02</strong><div><h3>الوضوح</h3><p>تفاصيل الطلب والتوفر والسعر تُراجع قبل التنفيذ.</p></div></article>
      <article><strong>03</strong><div><h3>الموثوقية</h3><p>نتعامل مع الطلبات بخطوات واضحة ومنظمة من البداية للنهاية.</p></div></article>
    </div>
  </div>
</section>

<section class="audiences section-shell">
  <div class="container audiences-grid">
    <article class="audience-card audience-card--retail">
      <p class="eyebrow">للأفراد</p>
      <h2>خدماتك الرقمية بدون تعقيد</h2>
      <p>استكشف المجال المناسب وتواصل معنا مباشرة لتأكيد الخدمة المتاحة لك.</p>
      <a class="text-link" href="/services/">استكشف الخدمات ${icon('arrow')}</a>
    </article>
    <article class="audience-card audience-card--wholesale">
      <p class="eyebrow">للجملة</p>
      <h2>حلول مرنة للمتاجر والموزعين</h2>
      <p>نوفر خدمات لقطاع الجملة بحسب نوع الطلب والتوفر والاتفاق المباشر.</p>
      <a class="text-link" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">استفسر عن الجملة ${icon('arrow')}</a>
    </article>
  </div>
</section>

<section class="process section-shell">
  <div class="container">
    ${renderSectionHeader({ eyebrow: 'كيف نتعامل؟', title: 'خطوات قليلة وواضحة', description: 'لا متجر ولا خطوات شراء معقدة؛ استكشف ثم تواصل مباشرة.' })}
    <ol class="process-list">
      <li><span>01</span><div><h3>استكشف</h3><p>تعرّف على الفئات والخدمات المتاحة.</p></div></li>
      <li><span>02</span><div><h3>تواصل</h3><p>أرسل تفاصيل ما تحتاجه عبر واتساب.</p></div></li>
      <li><span>03</span><div><h3>تأكيد</h3><p>نراجع التوفر والتفاصيل والسعر الحالي.</p></div></li>
      <li><span>04</span><div><h3>تنفيذ</h3><p>يتم تنفيذ الخدمة وفق التفاصيل المتفق عليها.</p></div></li>
    </ol>
  </div>
</section>

<section class="custom-request section-shell">
  <div class="container custom-request__inner">
    <div class="custom-request__visual" aria-hidden="true">${icon('search')}<span>؟</span></div>
    <div class="custom-request__copy">
      <p class="eyebrow">خدمة حسب الطلب</p>
      <h2>ما لقيت الخدمة التي تبحث عنها؟</h2>
      <p>أرسل لنا اسم الخدمة أو الرابط والمنطقة والتفاصيل المطلوبة، وسنتحقق من إمكانية توفيرها.</p>
    </div>
    <a class="button button--primary" href="/services/custom-request/">اعرف كيف تطلبها ${icon('arrow')}</a>
  </div>
</section>

<section class="faq-preview section-shell">
  <div class="container faq-preview__grid">
    ${renderSectionHeader({ eyebrow: 'الأسئلة الشائعة', title: 'إجابات سريعة قبل ما تتواصل', description: 'أهم النقاط التي تساعدك على فهم طريقة التعامل والخدمات.' , align: 'start'})}
    <div class="faq-list">
      ${faqs.map((item, index) => `<details ${index === 0 ? 'open' : ''}><summary>${item.question}<span>+</span></summary><p>${item.answer}</p></details>`).join('')}
      <a class="text-link" href="/faq/">كل الأسئلة الشائعة ${icon('arrow')}</a>
    </div>
  </div>
</section>

<div class="container">${renderContactCTA()}</div>
`;
