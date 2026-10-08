import { createWhatsappHref, site } from '../config/site.js';
import { icon } from './icons.js';

export const renderSubserviceCard = (item, serviceSlug, serviceTitle) => {
  const hasDedicatedImage = Boolean(item.image);
  const imageSrc = hasDedicatedImage
    ? `/assets/media/subservices/${serviceSlug}/${item.image}.avif`
    : `/assets/media/services/${serviceSlug}.avif`;
  const imageAlt = item.imageAlt || `تصور بصري لخدمة ${item.title}`;
  const width = hasDedicatedImage ? 512 : 640;
  const height = hasDedicatedImage ? 512 : 360;
  const inquiryHref = createWhatsappHref(`مرحبًا، أريد الاستفسار عن خدمة «${item.title}» ضمن «${serviceTitle}». أرجو توضيح التوفر والتفاصيل والسعر.`);

  return `
<a class="subservice-card${hasDedicatedImage ? '' : ' subservice-card--fallback'}" href="${inquiryHref}" target="_blank" rel="noopener noreferrer" aria-label="استفسر عبر واتساب عن ${item.title}">
  <div class="subservice-card__visual">
    <img
      class="subservice-card__image"
      src="${imageSrc}?v=${site.assetVersion}"
      width="${width}"
      height="${height}"
      alt="${imageAlt}"
      loading="lazy"
      decoding="async"
      sizes="(max-width: 680px) 46vw, (max-width: 1000px) 31vw, 23vw"
    >
  </div>
  <div class="subservice-card__body">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    <span class="subservice-card__action">${icon('whatsapp')} استفسر عن الخدمة</span>
  </div>
</a>`;
};
