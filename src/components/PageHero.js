import { icon } from './icons.js';

export const renderPageHero = ({
  eyebrow,
  title,
  text,
  imageSrc = '',
  imageAlt = '',
  actionHref = '',
  actionLabel = '',
  className = '',
} = {}) => `
<section class="page-hero ${className}">
  <div class="container page-hero__grid">
    <div class="page-hero__content">
      ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
      <h1>${title}</h1>
      ${text ? `<p>${text}</p>` : ''}
      ${actionHref && actionLabel ? `<a class="button button--primary page-hero__action" href="${actionHref}">${actionLabel} ${icon('arrow')}</a>` : ''}
    </div>
    ${imageSrc ? `<div class="page-hero__visual"><img class="page-hero__image" src="${imageSrc}" alt="${imageAlt}" width="640" height="360" loading="eager" decoding="async"></div>` : ''}
  </div>
</section>`;
