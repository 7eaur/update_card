import { icon } from './icons.js';

export const renderServiceCard = (service) => `
<a class="service-card service-card--${service.feature} service-card--${service.tone}" href="/services/${service.slug}/">
  <div class="service-card__visual" aria-hidden="true">
    <span class="service-card__halo"></span>
    <span class="service-card__icon">${icon(service.icon)}</span>
    <span class="service-card__kicker">${service.kicker}</span>
    <div class="service-card__chips">
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
