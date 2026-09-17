const visualVariants = {
  service: { width: 440, height: 330, folder: 'services' },
  page: { width: 680, height: 383, folder: 'pages' },
};

export const renderResponsiveImage = ({
  name,
  alt = '',
  className = '',
  variant = 'service',
  loading = 'lazy',
}) => {
  const asset = visualVariants[variant] ?? visualVariants.service;
  return `<img class="${className}" src="/assets/media/${asset.folder}/${name}.webp" width="${asset.width}" height="${asset.height}" alt="${alt}" loading="${loading}" decoding="async">`;
};
