export default function ProductImage({ product, className = '', eager = false }) {
  return <img className={className} src={product.imageUrl} alt={product.imageAlt} width="512" height="512" loading={eager ? 'eager' : 'lazy'} decoding="async" onError={event => {
    const image = event.currentTarget;
    if (!image.dataset.fallback) {
      image.dataset.fallback = 'true';
      image.src = '/media/services/' + product.category + '.webp';
    } else image.style.visibility = 'hidden';
  }} />;
}
