const runtimeAssetVersion = (process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || 'local').slice(0, 12);

export const site = {
  brandName: 'UPDATE CARD',
  brandNameAr: 'أبديت كارد',
  brandAliases: ['أبديت كارد', 'UPDATE CARD', 'UpdateCard', 'Update Card'],
  since: 2018,
  siteUrl: 'https://updatecard.net',
  domainDisplay: 'updatecard.net',
  language: 'ar',
  locale: 'ar_YE',
  countryCode: 'YE',
  areaServed: 'اليمن',
  email: 'updatecardye@gmail.com',
  emailHref: 'mailto:updatecardye@gmail.com',
  location: 'اليمن - صنعاء',
  phoneDisplay: '770498884',
  phoneHref: 'tel:+967770498884',
  whatsappHref: 'https://wa.me/967770498884',
  facebookHref: 'https://www.facebook.com/Update.Cards.770498884/',
  developerNameAr: 'وصل تك',
  developerUrl: 'https://www.wasl-tech.com',
  socialImage: '/assets/social/update-card-share.png',
  socialImageAlt: 'شعار أبديت كارد للخدمات الرقمية في اليمن',
  assetVersion: runtimeAssetVersion,
  description:
    'أبديت كارد (UPDATE CARD) لخدمات الشحن الرقمي والخدمات الرقمية في اليمن منذ عام 2018، وتشمل شحن الألعاب والبطاقات والاشتراكات والدفع والشراء الإلكتروني للأفراد والجملة حسب التوفر.',
};

export const primaryNav = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about/' },
  { label: 'خدماتنا', href: '/services/' },
  { label: 'الأسئلة الشائعة', href: '/faq/' },
  { label: 'تواصل معنا', href: '/contact/' },
];

export const createWhatsappHref = (message) =>
  message ? `${site.whatsappHref}?text=${encodeURIComponent(message)}` : site.whatsappHref;
