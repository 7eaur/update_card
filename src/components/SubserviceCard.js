export const renderSubserviceCard = (item, serviceSlug) => `
<article class="subservice-card">
  <div class="subservice-card__visual">
    <img
      class="subservice-card__image"
      src="/assets/media/subservices/${serviceSlug}/${item.image}.avif"
      width="480"
      height="360"
      alt="${item.imageAlt}"
      loading="lazy"
      decoding="async"
    >
  </div>
  <div class="subservice-card__body">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </div>
</article>`;
