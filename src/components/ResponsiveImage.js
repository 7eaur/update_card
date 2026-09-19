import { site } from '../config/site.js';

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
}) => {
  const asset = visualVariants[variant] ?? visualVariants.service;
  const priority = fetchPriority !== 'auto' ? ` fetchpriority="${fetchPriority}"` : '';
  return `<img class="${className}" src="/assets/media/${asset.folder}/${name}.${asset.ext}?v=${site.assetVersion}" width="${asset.width}" height="${asset.height}" alt="${alt}" loading="${loading}"${priority} decoding="async">`;
};
