import { icon } from './icons.js';
import { renderResponsiveImage } from './ResponsiveImage.js';

export const renderServiceCard = (service) => `
<a class="service-card" href="/services/${service.slug}/">
  <div class="service-card__visual">
    ${renderResponsiveImage({ name: service.image, alt: '', className: 'service-card__image', variant: 'service' })}
  </div>
  <div class="service-card__body">
    <h3>${service.title}</h3>
    <p>${service.description}</p>
    <span class="service-card__link">عرض الصفحة ${icon('arrow')}</span>
  </div>
</a>`;
