export const renderSubserviceCard = (item, serviceSlug, assetVersion = '') => {
  const hasDedicatedImage = Boolean(item.image);
  const version = assetVersion ? `?v=${encodeURIComponent(assetVersion)}` : '';
  const imageSrc = (hasDedicatedImage
    ? `/assets/media/subservices/${serviceSlug}/${item.image}.avif`
    : `/assets/media/services/${serviceSlug}.avif`) + version;
  const imageAlt = item.imageAlt || `تصور بصري لخدمة ${item.title}`;
  const width = 640;
  const height = hasDedicatedImage ? 640 : 360;

  return `
<article class="subservice-card${hasDedicatedImage ? '' : ' subservice-card--fallback'}">
  <div class="subservice-card__visual">
    <img
      class="subservice-card__image"
      src="${imageSrc}"
      width="${width}"
      height="${height}"
      alt="${imageAlt}"
      loading="lazy"
      fetchpriority="low"
      decoding="async"
      sizes="(max-width: 680px) 46vw, (max-width: 1000px) 31vw, 23vw"
    >
  </div>
  <div class="subservice-card__body">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </div>
</article>`;
};
