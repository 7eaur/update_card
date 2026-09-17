const visualDimensions = {
  hero: { width: 1200, height: 675, ext: 'webp' },
  card: { width: 640, height: 480, ext: 'avif' },
  landscape: { width: 720, height: 405, ext: 'avif' },
};

export const renderResponsiveImage = ({
  name,
  alt = '',
  className = '',
  variant = 'card',
  loading = 'lazy',
  fetchPriority,
}) => {
  const asset = visualDimensions[variant] ?? visualDimensions.card;
  const priority = fetchPriority ? ` fetchpriority="${fetchPriority}"` : '';

  return `<img class="${className}" src="/assets/visuals/${name}.${asset.ext}" width="${asset.width}" height="${asset.height}" alt="${alt}" loading="${loading}" decoding="async"${priority}>`;
};
