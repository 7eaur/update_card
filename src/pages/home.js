import { site } from '../config/site.js';
import { services } from '../data/services.js';
import { faqs } from '../data/faqs.js';
import { icon } from '../components/icons.js';
import { renderServiceCard } from '../components/ServiceCard.js';
import { renderContactCTA } from '../components/ContactCTA.js';
import { renderResponsiveImage } from '../components/ResponsiveImage.js';

const mainServices = services.filter((service) => service.slug !== 'custom-request');

export const renderHomePage = () => `
<section class="home-hero section-shell" aria-labelledby="home-title">
  <div class="container home-hero__frame">
    <div class="home-hero__content">
      <p class="eyebrow">UPDATE CARD · خدمات رقمية منذ ${site.since}</p>
      <h1 id="home-title">عالم رقمي واسع.<br><span>بطريقة أوضح وأقرب.</span></h1>
      <p class="home-hero__lead">شحن، بطاقات رقمية، اشتراكات، دفع إلكتروني وشراء من المواقع العالمية — ضمن تجربة مباشرة تبدأ بالاستكشاف وتنتهي بالتواصل مع فريق أبديت كارد.</p>
      <div class="home-hero__actions">
        <a class="button button--primary" href="/services/">استكشف خدماتنا ${icon('arrow')}</a>
        <a class="button button--quiet" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} واتساب مباشر</a>
      </div>
      <div class="home-hero__meta" aria-label="معلومات مختصرة">
        <span><strong>${site.since}</strong><small>بداية الخبرة</small></span>
        <span><strong>8</strong><small>عائلات خدمات</small></span>
        <span><strong>جملة + تجزئة</strong><small>نطاق الخدمة</small></span>
      </div>
    </div>

    <div class="home-hero__visual" aria-hidden="true">
      <picture>
        <source media="(max-width: 680px)" srcset="/assets/media/hero/hero-mobile.webp">
        <source srcset="/assets/media/hero/hero.webp">
        <img src="/assets/media/hero/hero.webp" width="800" height="450" alt="" fetchpriority="high" decoding="async">
      </picture>
      <span class="home-hero__motif home-hero__motif--top"></span>
      <span class="home-hero__motif home-hero__motif--bottom"></span>
      <span class="home-hero__visual-label">Digital services · Yemen</span>
    </div>
  </div>
</section>

<section class="home-story section-shell" aria-labelledby="story-title">
  <div class="container home-story__grid">
    <div class="home-story__year" aria-hidden="true">${site.since}</div>
    <div class="home-story__content">
      <p class="eyebrow">عن أبديت كارد</p>
      <h2 id="story-title">خبرة متخصصة في الخدمات الرقمية والشراء والسداد عبر الإنترنت.</h2>
      <p>منذ ${site.since} نعمل على توفير مجموعة واسعة من الخدمات الرقمية للأفراد وقطاع الجملة، مع التركيز على السرعة والوضوح والموثوقية في كل طلب.</p>
      <a class="text-link" href="/about/">تعرف على قصتنا ${icon('arrow')}</a>
    </div>
    <div class="home-story__principles" aria-label="قيم العمل">
      <div><span>01</span><strong>سرعة</strong><small>في الاستجابة والتنفيذ بحسب طبيعة الخدمة.</small></div>
      <div><span>02</span><strong>وضوح</strong><small>في التوفر والتفاصيل والسعر قبل التنفيذ.</small></div>
      <div><span>03</span><strong>موثوقية</strong><small>في التعامل ومتابعة الطلب حتى اكتماله.</small></div>
    </div>
  </div>
</section>

<section class="home-services section-shell" aria-labelledby="services-title">
  <div class="container">
    <div class="home-section-heading">
      <div>
        <p class="eyebrow">مجالات خدماتنا</p>
        <h2 id="services-title">اختر المجال الذي يشبه احتياجك.</h2>
      </div>
      <div class="home-section-heading__aside">
        <p>نعرض الخدمات على شكل مجالات واضحة بدل قائمة طويلة؛ ادخل للفئة المناسبة وتعرّف على تفاصيلها والمنصات التي تشملها.</p>
        <a class="text-link" href="/services/">كل الخدمات ${icon('arrow')}</a>
      </div>
    </div>

    <div class="services-bento services-bento--home">
      ${mainServices.map(renderServiceCard).join('')}
    </div>
  </div>
</section>

<section class="home-custom section-shell" aria-labelledby="custom-title">
  <div class="container home-custom__frame">
    <div class="home-custom__media">
      ${renderResponsiveImage({ name: 'custom-request', alt: '', className: 'home-custom__image', variant: 'service' })}
      <span class="home-custom__veil" aria-hidden="true"></span>
    </div>
    <div class="home-custom__content">
      <p class="eyebrow">خدمة حسب الطلب</p>
      <h2 id="custom-title">ما لقيت الخدمة التي تبحث عنها؟</h2>
      <p>أرسل لنا اسم الخدمة أو رابط المنتج والمنطقة وما الذي تحتاجه، وسنراجع إمكانية توفيرها قبل تأكيد السعر والتنفيذ.</p>
      <div class="home-custom__actions">
        <a class="button button--primary" href="/services/custom-request/">كيف تطلب خدمة خاصة ${icon('arrow')}</a>
        <a class="text-link" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">أرسل طلبك على واتساب ${icon('whatsapp')}</a>
      </div>
    </div>
  </div>
</section>

<section class="home-audience section-shell" aria-labelledby="audience-title">
  <div class="container home-audience__grid">
    <div class="home-audience__intro">
      <p class="eyebrow">للأفراد وقطاع الجملة</p>
      <h2 id="audience-title">نفس الوضوح، باحتياجين مختلفين.</h2>
      <p>الموقع يساعدك أولًا على فهم المجالات المتاحة، وبعدها يتم تحديد تفاصيل الخدمة مباشرة بحسب نوع الطلب.</p>
    </div>

    <article class="home-audience__panel home-audience__panel--retail">
      <span class="home-audience__index">01</span>
      <div>
        <p class="eyebrow">للأفراد</p>
        <h3>خدماتك الرقمية بدون خطوات شراء معقدة.</h3>
        <p>استكشف الفئة المناسبة، ثم تواصل معنا لتأكيد الخدمة المتاحة والتفاصيل الحالية.</p>
        <a class="text-link" href="/services/">استكشف الخدمات ${icon('arrow')}</a>
      </div>
    </article>

    <article class="home-audience__panel home-audience__panel--wholesale">
      ${renderResponsiveImage({ name: 'wholesale', alt: '', className: 'home-audience__image', variant: 'page' })}
      <span class="home-audience__veil" aria-hidden="true"></span>
      <span class="home-audience__index">02</span>
      <div class="home-audience__panel-content">
        <p class="eyebrow">لقطاع الجملة</p>
        <h3>طلبات للمتاجر والموزعين حسب التوفر والاتفاق المباشر.</h3>
        <p>يتم تحديد نوع الخدمة والكميات والتفاصيل التشغيلية بعد التواصل المباشر.</p>
        <a class="text-link text-link--light" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">استفسر عن الجملة ${icon('arrow')}</a>
      </div>
    </article>
  </div>
</section>

<section class="home-process section-shell" aria-labelledby="process-title">
  <div class="container home-process__frame">
    <div class="home-process__heading">
      <p class="eyebrow">طريقة التعامل</p>
      <h2 id="process-title">من الاستكشاف إلى التنفيذ، بخط واضح.</h2>
    </div>
    <ol class="home-process__steps">
      <li><span>01</span><div><strong>استكشف</strong><small>اختر الفئة الأقرب لما تحتاجه.</small></div></li>
      <li><span>02</span><div><strong>تواصل</strong><small>أرسل تفاصيل طلبك عبر واتساب.</small></div></li>
      <li><span>03</span><div><strong>تأكيد</strong><small>نراجع التوفر والتفاصيل والسعر الحالي.</small></div></li>
      <li><span>04</span><div><strong>تنفيذ</strong><small>يتم تنفيذ الخدمة وفق ما تم الاتفاق عليه.</small></div></li>
    </ol>
  </div>
</section>

<section class="home-faq section-shell" aria-labelledby="faq-title">
  <div class="container home-faq__grid">
    <div class="home-faq__heading">
      <p class="eyebrow">قبل ما تتواصل</p>
      <h2 id="faq-title">إجابات مختصرة على الأسئلة المتكررة.</h2>
      <p>المعلومات الأساسية التي تساعدك على فهم طريقة الطلب والتوفر قبل التواصل.</p>
      <a class="text-link" href="/faq/">كل الأسئلة الشائعة ${icon('arrow')}</a>
    </div>
    <div class="faq-list">
      ${faqs.slice(0, 4).map((item, index) => `<details ${index === 0 ? 'open' : ''}><summary>${item.question}<span>+</span></summary><p>${item.answer}</p></details>`).join('')}
    </div>
  </div>
</section>

<div class="container home-closing-cta">${renderContactCTA()}</div>
`;
