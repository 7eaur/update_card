import { faqs } from '../data/faqs.js';
import { renderContactCTA } from '../components/ContactCTA.js';

export const renderFaqPage = () => `
<section class="page-hero section-shell"><div class="container page-hero__grid"><div><p class="eyebrow">الأسئلة الشائعة</p><h1>معلومات مهمة قبل طلب الخدمة</h1><p>إجابات مختصرة تساعدك على فهم طريقة التعامل والتوفر والأسعار المتغيرة.</p></div></div></section>
<section class="content-section section-shell"><div class="container faq-page-list">${faqs.map((item) => `<details><summary>${item.question}<span>+</span></summary><p>${item.answer}</p></details>`).join('')}</div></section>
<div class="container">${renderContactCTA({ title: 'ما زال عندك سؤال؟' })}</div>`;
