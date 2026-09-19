export const serviceCatalog = {
  'gift-cards': [
    {
      slug: 'amazon',
      title: 'بطاقات أمازون',
      description: 'أمريكي، سعودي وإماراتي حسب منطقة الحساب والتوفر.',
      image: 'amazon',
      imageAlt: 'بطاقات أمازون الرقمية',
    },
    {
      slug: 'apple-itunes',
      title: 'بطاقات آبل / آيتونز',
      description: 'بطاقات أمريكية لشحن رصيد Apple ID المتوافق مع منطقة الحساب.',
      image: 'apple-itunes',
      imageAlt: 'بطاقات آبل وآيتونز الرقمية',
    },
    {
      slug: 'google-play',
      title: 'بطاقات Google Play',
      description: 'بطاقات أمريكية لحسابات Google Play المتوافقة مع المنطقة.',
      image: 'google-play',
      imageAlt: 'بطاقات جوجل بلاي الرقمية',
    },
    {
      slug: 'walmart',
      title: 'بطاقات Walmart',
      description: 'بطاقات للمتجر الأمريكي حسب الفئة والقيمة المتاحة.',
      image: 'walmart',
      imageAlt: 'بطاقات وول مارت الرقمية',
    },
    {
      slug: 'razer-gold',
      title: 'بطاقات Razer Gold',
      description: 'أمريكي وعالمي لشحن الرصيد والألعاب والخدمات المدعومة.',
      image: 'razer-gold',
      imageAlt: 'بطاقات ريزر جولد الرقمية',
    },
    {
      slug: 'xbox',
      title: 'بطاقات Xbox',
      description: 'لشحن الرصيد والألعاب والخدمات على الحسابات المدعومة.',
      image: 'xbox',
      imageAlt: 'بطاقات إكس بوكس الرقمية',
    },
    {
      slug: 'playstation',
      title: 'بطاقات PlayStation',
      description: 'أمريكي، سعودي وإماراتي حسب منطقة حساب PlayStation.',
      image: 'playstation',
      imageAlt: 'بطاقات بلايستيشن الرقمية',
    },
  ],
};

export const getServiceCatalog = (serviceSlug) => serviceCatalog[serviceSlug] ?? [];
