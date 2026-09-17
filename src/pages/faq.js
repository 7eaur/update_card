import { faqs } from '../data/faqs.js';
import { renderContactCTA } from '../components/ContactCTA.js';
import { renderPageHero } from '../components/PageHero.js';

export const renderFaqPage = () => `
${renderPageHero({
  eyebrow: 'الأسئلة الشائعة',
  title: 'معلومات مهمة قبل طلب الخدمة',
  text: 'إجابات مختصرة تساعدك على فهم طريقة التعامل والتوفر والأسعار المتغيرة.',
  imageSrc: '/assets/images/home/service-not-found.webp',
  imageAlt: 'علامة استفهام ترمز للأسئلة الشائعة',
})}

<section class="content-section">
  <div class="container faq-panel">
    <div class="faq-page-list">${faqs.map((item) => `<details><summary>${item.question}<span aria-hidden="true">+</span></summary><p>${item.answer}</p></details>`).join('')}</div>
  </div>
</section>

<div class="container">${renderContactCTA({ title: 'ما زال عندك سؤال؟' })}</div>`;
