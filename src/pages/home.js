import { site } from '../config/site.js';
import { services } from '../data/services.js';
import { icon } from '../components/icons.js';
import { renderServiceCard } from '../components/ServiceCard.js';
import { renderResponsiveImage } from '../components/ResponsiveImage.js';

export const renderHomePage = () => `
<section class="home-hero">
  <div class="container home-hero__grid">
    <div class="home-hero__visual" aria-hidden="true">
      <img class="home-hero__image" src="/assets/images/home/hero-services.jpg" width="1536" height="864" alt="" fetchpriority="high" decoding="async">
    </div>
    <div class="home-hero__content">
      <p class="hero-kicker">UPDATE CARD · منذ ${site.since}</p>
      <h1>نقرّب لك عالم<br><span>الخدمات الرقمية</span></h1>
      <p>شحن الألعاب، البطاقات الرقمية، الاشتراكات، الدفع الإلكتروني والشراء من المواقع العالمية بخدمة واضحة ومباشرة.</p>
      <div class="home-hero__actions">
        <a class="button button--primary" href="/services/">استكشف خدماتنا ${icon('arrow')}</a>
        <a class="button button--whatsapp" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} تواصل عبر واتساب</a>
      </div>
      <ul class="hero-features">
        <li>${icon('check')} منذ عام ${site.since}</li>
        <li>${icon('check')} سرعة في التنفيذ</li>
        <li>${icon('check')} دعم مستمر</li>
        <li>${icon('check')} موثوقية وأمان</li>
      </ul>
    </div>
  </div>
</section>

<section class="home-about">
  <div class="container home-about__card">
    <div class="home-about__content">
      <p class="section-kicker">من نحن</p>
      <h2>منذ عام <span>${site.since}</span></h2>
      <p>نحن في أبديت كارد نتخصص في تقديم أفضل الخدمات الرقمية والحلول المبتكرة لعملائنا في مختلف أنحاء العالم. نعمل على توفير تجربة سهلة وآمنة تشمل الأفراد وكذلك عملاء الجملة والتوزيع.</p>
      <a class="button button--primary button--small" href="/about/">تعرف علينا أكثر ${icon('arrow')}</a>
    </div>
    <div class="home-about__visual" aria-hidden="true">
      <img src="/assets/images/home/about-building.jpg" class="home-about__image" alt="" width="1536" height="864" loading="lazy" decoding="async">
    </div>
  </div>
</section>

<section class="home-services">
  <div class="container home-services__panel">
    <div class="home-services__head">
      <a class="section-link" href="/services/">كل الخدمات ${icon('arrow')}</a>
      <div>
        <p class="section-kicker">مجالات خدماتنا</p>
        <h2>استكشف خدماتنا</h2>
      </div>
    </div>
    <div class="home-services__grid">${services.map(renderServiceCard).join('')}</div>
  </div>
</section>

<section class="home-audiences">
  <div class="container audience-split">
    <article class="audience-block audience-block--retail">
      <div class="audience-block__visual" aria-hidden="true">
        <img src="/assets/images/home/retail-digital.jpg" class="audience-block__image" alt="" width="1534" height="1025" loading="lazy" decoding="async">
      </div>
      <div class="audience-block__content">
        <p class="section-kicker">للأفراد</p>
        <h2>خدمات تلبي احتياجاتك</h2>
        <p>تجربة سهلة وآمنة للحصول على جميع خدماتك الرقمية في مكان واحد.</p>
        <a class="button button--primary button--small" href="/services/">استكشف الخدمات ${icon('arrow')}</a>
      </div>
    </article>
    <article class="audience-block audience-block--wholesale">
      <div class="audience-block__visual" aria-hidden="true">
        <img src="/assets/images/home/wholesale-warehouse.jpg" class="audience-block__image" alt="" width="1526" height="1031" loading="lazy" decoding="async">
      </div>
      <div class="audience-block__content">
        <p class="section-kicker">للجملة والتوزيع</p>
        <h2>شركاء في نمو أعمالك</h2>
        <p>نوفر حلولاً خاصة لعملاء الجملة والتوزيع مع آلية تعامل واضحة ودعم مباشر.</p>
        <a class="button button--primary button--small" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">تعرف على مزايا الجملة ${icon('arrow')}</a>
      </div>
    </article>
  </div>
</section>

<section class="home-process">
  <div class="container">
    <div class="process-heading">
      <h2>كيف تتعامل معنا</h2>
      <p>من الطلب حتى التنفيذ، بخطوات بسيطة وواضحة</p>
    </div>
    <ol class="process-timeline">
      <li><span class="process-icon">${icon('search')}</span><div><small>01</small><h3>اختر الخدمة</h3><p>تصفح الخدمات واختر ما يناسبك.</p></div></li>
      <li><span class="process-icon">${icon('whatsapp')}</span><div><small>02</small><h3>تواصل معنا</h3><p>عبر واتساب أو أي قناة متاحة.</p></div></li>
      <li><span class="process-icon">${icon('card')}</span><div><small>03</small><h3>راجع طلبك</h3><p>نتأكد من التفاصيل ونوضح لك المعلومات.</p></div></li>
      <li><span class="process-icon">${icon('check')}</span><div><small>04</small><h3>يتم التنفيذ</h3><p>ننّفذ طلبك وفق التفاصيل المتفق عليها.</p></div></li>
    </ol>
  </div>
</section>

<section class="home-custom">
  <div class="container home-custom__bar">
    <div class="home-custom__visual" aria-hidden="true">
      <img src="/assets/images/home/service-not-found.webp" class="home-custom__image" alt="" width="160" height="76" loading="lazy" decoding="async">
    </div>
    <div class="home-custom__content">
      <h2>ما لقيت خدمتك؟</h2>
      <p>نوفر لك خدمة رقمية حسب الطلب. فقط تواصل معنا الآن.</p>
    </div>
    <a class="button button--whatsapp" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} تواصل عبر واتساب</a>
  </div>
</section>

<section class="home-closing">
  <div class="container home-closing__bar">
    <img src="/assets/images/home/cta-banner.webp" class="home-closing__image" alt="" width="818" height="82" loading="lazy" decoding="async" aria-hidden="true">
    <div class="home-closing__content">
      <h2>ابدأ رحلتك الرقمية الآن</h2>
      <p>اكتشف عالمًا من الخدمات الرقمية الموثوقة مع UPDATE CARD.</p>
    </div>
    <a class="button button--light" href="/services/">استكشف خدماتنا ${icon('arrow')}</a>
  </div>
</section>
`;
