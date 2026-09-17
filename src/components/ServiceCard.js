import { icon } from './icons.js';
import { renderResponsiveImage } from './ResponsiveImage.js';

export const renderServiceCard = (service) => `
<a class="service-card service-card--${service.feature} service-card--${service.tone}" href="/services/${service.slug}/">
  <div class="service-card__visual">
    ${renderResponsiveImage({ name: service.image, alt: '', className: 'service-card__image', variant: 'card' })}
    <span class="service-card__veil" aria-hidden="true"></span>
    <span class="service-card__icon" aria-hidden="true">${icon(service.icon)}</span>
    <span class="service-card__kicker">${service.kicker}</span>
    <div class="service-card__chips" aria-hidden="true">
      ${service.examples.slice(0, 3).map((example) => `<span>${example}</span>`).join('')}
    </div>
  </div>
  <div class="service-card__body">
    <div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </div>
    <span class="service-card__arrow" aria-hidden="true">${icon('arrow')}</span>
  </div>
</a>`;
