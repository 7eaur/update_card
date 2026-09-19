import { icon } from '../components/icons.js';
import { services } from '../data/services.js';
import { site } from '../config/site.js';
import { renderContactCTA } from '../components/ContactCTA.js';
import { renderResponsiveImage } from '../components/ResponsiveImage.js';
import { renderSubserviceCard } from '../components/SubserviceCard.js';
import { getServiceCatalog } from '../data/serviceCatalog.js';

const specialNotes = {
  'gift-cards': 'منطقة البطاقة يجب أن تتوافق مع منطقة الحساب أو المتجر المستخدم. يتم تأكيد المنطقة والفئة قبل التنفيذ.',
  'subscriptions': 'طريقة التفعيل أو التجديد تختلف حسب المنصة والخطة المتاحة، لذلك يتم تأكيد الآلية قبل التنفيذ.',
  'software-licenses': 'يجب تحديد المنتج والإصدار والجهاز أو الحساب عند الحاجة، ويتم توضيح نوع التفعيل المتاح قبل التنفيذ.',
  'digital-payments': 'خدمات الدفع والأصول الرقمية مرتبطة بالتوفر والمنصة والمنطقة. لا نعتمد صياغات مطلقة أو وعودًا غير مؤكدة.',
  'international-shopping': 'آلية الشراء والتوصيل تختلف حسب المتجر والدولة والمنتج، ويتم تأكيد التفاصيل عند مراجعة الرابط.',
  'custom-request': 'إرسال الطلب لا يعني ضمان توفره. يتم التحقق من إمكانية الخدمة والسعر قبل التنفيذ.',
};

export const renderServiceFamilyPage = (service) => {
  const catalog = getServiceCatalog(service.slug);
  const hasRichCatalog = catalog.length > 0;

  return `
<section class="service-hero service-hero--${service.tone}">
  <div class="container service-hero__grid">
    <div class="service-hero__content">
      <nav class="breadcrumb" aria-label="مسار الصفحة"><a href="/">الرئيسية</a><span>/</span><a href="/services/">الخدمات</a><span>/</span><span aria-current="page">${service.title}</span></nav>
      <p class="service-hero__label">${service.kicker}</p>
      <h1>${service.title}</h1>
      <p class="service-hero__intro">${service.intro}</p>
      <a class="button button--whatsapp service-hero__cta" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} استفسر عبر واتساب</a>
    </div>
    <div class="service-hero__visual">${renderResponsiveImage({ name: service.image, alt: service.imageAlt, className: 'service-hero__image', variant: 'service', loading: 'eager', fetchPriority: 'high' })}</div>
  </div>
</section>

${hasRichCatalog ? `
<section class="content-section">
  <div class="container subservice-panel">
    <div class="subservice-heading">
      <p class="eyebrow">ماذا يشمل هذا المجال؟</p>
      <h2>اختر الخدمة التي تناسبك</h2>
      <p>كل بطاقة توضح نوع الخدمة بشكل مختصر، ويمكنك التواصل معنا لتأكيد التوفر والتفاصيل.</p>
    </div>
    <div class="subservice-grid">${catalog.map((item) => renderSubserviceCard(item, service.slug)).join('')}</div>
  </div>
</section>` : `
<section class="content-section">
  <div class="container content-panel content-grid">
    <div><p class="eyebrow">ماذا يشمل هذا المجال؟</p><h2>أمثلة من الخدمات والمنصات</h2><p>القائمة التالية توضح نطاق الفئة الحالي، والتوفر الفعلي يُراجع عند الاستفسار.</p></div>
    <div class="example-grid">${service.examples.map((example) => `<span>${example}</span>`).join('')}</div>
  </div>
</section>`}

<section class="content-section">
  <div class="container service-process">
    <div><span>01</span><h3>حدد ما تحتاجه</h3><p>اسم الخدمة أو المنصة والمنطقة والخطة أو الرابط عند الحاجة.</p></div>
    <div><span>02</span><h3>تواصل معنا</h3><p>أرسل التفاصيل عبر واتساب أو من صفحة التواصل.</p></div>
    <div><span>03</span><h3>نؤكد التفاصيل</h3><p>يتم تأكيد التوفر والسعر وطريقة التنفيذ قبل بدء الخدمة.</p></div>
  </div>
</section>

${specialNotes[service.slug] ? `<section class="notice-section content-section"><div class="container notice">${icon('shield')}<p>${specialNotes[service.slug]}</p></div></section>` : ''}

<section class="content-section">
  <div class="container content-panel content-grid">
    <div><p class="eyebrow">خدمات مرتبطة</p><h2>استكشف مجالات أخرى</h2></div>
    <div class="related-links">${services.filter((item) => item.slug !== service.slug).slice(0, 4).map((item) => `<a href="/services/${item.slug}/">${item.title} ${icon('arrow')}</a>`).join('')}</div>
  </div>
</section>

<div class="container">${renderContactCTA({ title: `عندك استفسار عن ${service.title}؟` })}</div>`;
};
