const visualVariants = {
  service: { width: 640, height: 360, folder: 'services', ext: 'avif' },
  page: { width: 680, height: 383, folder: 'pages', ext: 'avif' },
};

export const renderResponsiveImage = ({
  name,
  alt = '',
  className = '',
  variant = 'service',
  loading = 'lazy',
  fetchPriority = 'auto',
  assetVersion = '',
}) => {
  const asset = visualVariants[variant] ?? visualVariants.service;
  const priority = fetchPriority !== 'auto' ? ` fetchpriority="${fetchPriority}"` : '';
  const version = assetVersion ? `?v=${encodeURIComponent(assetVersion)}` : '';
  return `<img class="${className}" src="/assets/media/${asset.folder}/${name}.${asset.ext}${version}" width="${asset.width}" height="${asset.height}" alt="${alt}" loading="${loading}"${priority} decoding="async">`;
};
