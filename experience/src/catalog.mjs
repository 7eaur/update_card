import { services } from '../../src/data/services.js';
import { serviceCatalog } from '../../src/data/serviceCatalog.js';

export { services };
export const contact = {
  whatsapp: 'https://wa.me/967770498884',
  phone: 'tel:+967770498884',
  email: 'mailto:updatecardye@gmail.com',
  facebook: 'https://www.facebook.com/Update.Cards.770498884/',
};
export const products = services.flatMap(category => (serviceCatalog[category.slug] || []).map(item => ({
  ...item, category: category.slug, categoryTitle: category.title,
  keywords: category.examples.join(' '),
  imageUrl: '/media/subservices/' + category.slug + '/' + item.image + '.avif',
})));
export const normalize = value => String(value).toLowerCase().normalize('NFKD')
  .replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').trim();
export function findProducts(query, category = 'all') {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return products.filter(item => (category === 'all' || item.category === category) &&
    terms.every(term => normalize(item.title + ' ' + item.slug + ' ' + item.description + ' ' + item.categoryTitle).includes(term)));
}
export function orderUrl({ product, region = '', details = '', audience = 'individual' }) {
  const lines = [
    'مرحبًا أبديت كارد، أريد الاستفسار عن:',
    product?.title || 'خدمة حسب الطلب',
    product?.categoryTitle ? 'القسم: ' + product.categoryTitle : '',
    'نوع الطلب: ' + (audience === 'wholesale' ? 'جملة / توزيع' : 'فردي'),
    region.trim() ? 'منطقة الحساب / الدولة: ' + region.trim() : '',
    details.trim() ? 'تفاصيل الطلب: ' + details.trim() : '',
    'يرجى تأكيد التوفر والسعر وطريقة التنفيذ.',
  ];
  return contact.whatsapp + '?text=' + encodeURIComponent(lines.filter(Boolean).join('\n'));
}
export function routeProduct(hash) {
  const match = /^#service\/([^/]+)\/([^/]+)$/.exec(hash);
  return match ? products.find(p => p.category === match[1] && p.slug === match[2]) || null : null;
}
