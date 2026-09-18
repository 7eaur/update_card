import { site } from '../config/site.js';
import { icon } from '../components/icons.js';
import { renderContactCTA } from '../components/ContactCTA.js';
import { renderPageHero } from '../components/PageHero.js';

export const renderAboutPage = () => `
${renderPageHero({
  eyebrow: 'من نحن',
  title: `خبرة في الخدمات الرقمية منذ ${site.since}`,
  text: `من ${site.location}، نقدم للأفراد وقطاع الجملة خدمات شحن ودفع وشراء إلكتروني وبطاقات واشتراكات وخدمات رقمية حسب الطلب.`,
  imageSrc: '/assets/images/home/about.avif',
  imageAlt: 'هوية أبديت كارد على واجهة مبنى حديث',
  className: 'page-hero--about',
})}

<section class="content-section">
  <div class="container about-facts" aria-label="نبذة سريعة عن أبديت كارد">
    <article><strong>${site.since}</strong><span>بداية الخبرة</span></article>
    <article><strong>8</strong><span>مجالات خدمات رئيسية</span></article>
    <article><strong>أفراد + جملة</strong><span>نخدم احتياجات مختلفة</span></article>
    <article><strong>صنعاء</strong><span>اليمن</span></article>
  </div>
</section>

<section class="content-section">
  <div class="container about-story">
    <div class="about-story__heading">
      <p class="eyebrow">قصتنا</p>
      <h2>نقطة واحدة لاحتياجات رقمية متعددة</h2>
    </div>
    <div class="about-story__copy">
      <p>منذ عام ${site.since}، تعمل <strong>${site.brandNameAr}</strong> في مجال الخدمات الرقمية، مع تركيز على تسهيل الوصول إلى الشحن، البطاقات والاشتراكات، الدفع الإلكتروني، التراخيص والشراء من المواقع العالمية.</p>
      <p>الموقع تعريفي وليس متجرًا إلكترونيًا؛ هدفه أن يساعدك على معرفة ما نقدمه بسرعة، ثم تتواصل معنا مباشرة لتأكيد التوفر والسعر وطريقة التنفيذ بحسب خدمتك.</p>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="container about-principles">
    <div class="section-heading section-heading--about">
      <p class="eyebrow">كيف نتعامل</p>
      <h2>وضوح قبل التنفيذ</h2>
      <p>نعتمد خطوات بسيطة تقلل الالتباس وتوضح للعميل ما سيحدث قبل بدء الخدمة.</p>
    </div>
    <div class="about-principles__grid">
      <article>${icon('search')}<div><span>01</span><h3>نفهم طلبك</h3><p>نحدد الخدمة أو المنصة والمنطقة والخطة أو الرابط عند الحاجة.</p></div></article>
      <article>${icon('check')}<div><span>02</span><h3>نؤكد التفاصيل</h3><p>نراجع التوفر والسعر وطريقة التنفيذ قبل اعتماد الطلب.</p></div></article>
      <article>${icon('shield')}<div><span>03</span><h3>نتابع التنفيذ</h3><p>ننفذ الخدمة حسب التفاصيل المتفق عليها ونبقى معك حتى اكتمالها.</p></div></article>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="container about-audiences">
    <article>
      <p class="eyebrow">للأفراد</p>
      <h2>خدمات مباشرة لاحتياجك الرقمي</h2>
      <p>من شحن الألعاب والاشتراكات إلى البطاقات الرقمية والدفع والشراء من المواقع العالمية.</p>
      <a class="text-link" href="/services/">استكشف الخدمات ${icon('arrow')}</a>
    </article>
    <article>
      <p class="eyebrow">للجملة والتوزيع</p>
      <h2>حلول تناسب الطلبات المتكررة</h2>
      <p>نتعامل أيضًا مع احتياجات الجملة بحسب نوع الخدمة والتوفر، مع تأكيد التفاصيل والكميات قبل التنفيذ.</p>
      <a class="text-link" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">تواصل معنا ${icon('whatsapp')}</a>
    </article>
  </div>
</section>

<section class="content-section">
  <div class="container about-official">
    <div class="about-official__heading">
      <p class="eyebrow">بياناتنا الرسمية</p>
      <h2>تواصل معنا من القنوات المعتمدة</h2>
    </div>
    <div class="about-official__grid">
      <a href="${site.siteUrl}" target="_blank" rel="noopener noreferrer">${icon('globe')}<div><span>الموقع الإلكتروني</span><strong>${site.domainDisplay}</strong></div></a>
      <a href="${site.emailHref}">${icon('mail')}<div><span>البريد الإلكتروني</span><strong>${site.email}</strong></div></a>
      <div>${icon('mapPin')}<div><span>الموقع</span><strong>${site.location}</strong></div></div>
      <a href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<div><span>واتساب</span><strong>${site.phoneDisplay}</strong></div></a>
    </div>
  </div>
</section>

<div class="container">${renderContactCTA({ eyebrow: 'جاهز نساعدك', title: 'تعرف على خدماتنا أو أرسل طلبك مباشرة', text: 'إذا عرفت الخدمة التي تحتاجها تواصل معنا عبر واتساب، وإذا كنت تستكشف ابدأ من صفحة الخدمات.' })}</div>`;
