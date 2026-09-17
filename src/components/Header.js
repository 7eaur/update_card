import { primaryNav, site } from '../config/site.js';
import { services } from '../data/services.js';
import { icon } from './icons.js';
import { isCurrentPath } from '../lib/html.js';

export const renderHeader = (currentPath = '/') => `
<header class="site-header" data-site-header>
  <div class="container header-shell">
    <a class="brand-link" href="/" aria-label="${site.brandNameAr} - الرئيسية">
      <img src="/assets/brand/logo-horizontal-320.webp" width="320" height="137" alt="${site.brandName}" decoding="async">
    </a>

    <button class="menu-toggle" type="button" aria-label="فتح القائمة" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle>
      <span class="menu-toggle__open">${icon('menu')}</span>
      <span class="menu-toggle__close">${icon('close')}</span>
    </button>

    <nav class="primary-nav" id="primary-nav" aria-label="التنقل الرئيسي" data-mobile-menu>
      ${primaryNav
        .map((item) => {
          if (item.href === '/services/') {
            return `
              <details class="nav-services" ${isCurrentPath(currentPath, item.href) ? 'data-active="true"' : ''}>
                <summary>${item.label}</summary>
                <div class="services-menu">
                  <a class="services-menu__all" href="/services/">كل الخدمات ${icon('arrow')}</a>
                  <div class="services-menu__grid">
                    ${services.map((service) => `<a href="/services/${service.slug}/">${icon(service.icon)}<span>${service.title}</span></a>`).join('')}
                  </div>
                </div>
              </details>`;
          }

          return `<a class="nav-link ${isCurrentPath(currentPath, item.href) ? 'is-active' : ''}" href="${item.href}" ${isCurrentPath(currentPath, item.href) ? 'aria-current="page"' : ''}>${item.label}</a>`;
        })
        .join('')}
    </nav>

    <a class="button button--whatsapp header-cta" href="${site.whatsappHref}" target="_blank" rel="noopener noreferrer">
      ${icon('whatsapp')}<span>واتساب</span>
    </a>
  </div>
</header>`;
