const runtimeAssetVersion = (process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || 'local').slice(0, 12);

export const site = {
  brandName: 'UPDATE CARD',
  brandNameAr: 'أبديت كارد',
  since: 2018,
  siteUrl: 'https://updatecard.net',
  domainDisplay: 'updatecard.net',
  email: 'updatecardye@gmail.com',
  emailHref: 'mailto:updatecardye@gmail.com',
  location: 'اليمن - صنعاء',
  phoneDisplay: '770498884',
  phoneHref: 'tel:+967770498884',
  whatsappHref: 'https://wa.me/967770498884',
  facebookHref: 'https://www.facebook.com/Update.Cards.770498884/',
  developerNameAr: 'وصل تك',
  developerUrl: 'https://www.wasl-tech.com',
  assetVersion: runtimeAssetVersion,
  description:
    'أبديت كارد جهة متخصصة في الخدمات الرقمية وحلول الشحن والدفع والشراء الإلكتروني منذ عام 2018، وتخدم عملاء التجزئة والجملة عبر مجموعة واسعة من الخدمات والمنصات المدعومة.',
};

export const primaryNav = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about/' },
  { label: 'خدماتنا', href: '/services/' },
  { label: 'الأسئلة الشائعة', href: '/faq/' },
  { label: 'تواصل معنا', href: '/contact/' },
];
