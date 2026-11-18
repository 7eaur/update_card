import { useEffect, useMemo, useRef, useState } from 'react';
import { services, products, findProducts, orderUrl, routeProduct, contact } from './catalog.mjs';
import { faqs } from '../../src/data/faqs.js';
import logo from '../../brand/web/logo-horizontal-320.webp';
import mark from '../../brand/web/logo-icon-256.webp';
import FlipDeck from './FlipDeck.jsx';
import { Icon } from './Icons.jsx';
import RequestDialog from './RequestDialog.jsx';
import ProductImage from './ProductImage.jsx';

const worlds = [
  { id: 'games', en: 'PLAY', name: 'عالم الألعاب', shortLabel: 'ألعاب', label: 'اشحن حماسك', color: '#ad87ff', product: 'pubg-mobile', second: 'free-fire', third: 'efootball' },
  { id: 'gift-cards', en: 'UNLOCK', name: 'عالم البطاقات', shortLabel: 'بطاقات', label: 'افتح احتمالاتك', color: '#ffab87', product: 'playstation', second: 'apple-itunes', third: 'amazon' },
  { id: 'subscriptions', en: 'ENJOY', name: 'عالم الاشتراكات', shortLabel: 'اشتراكات', label: 'كمل اللي تحبه', color: '#e899cc', product: 'netflix', second: 'shahid-vip', third: 'youtube-premium' },
];
function Brand({ footer = false }) {
  return <a href="#top" className={'brand ' + (footer ? 'brand-footer' : '')} aria-label="أبديت كارد — الرئيسية"><img src={logo} width="160" height="64" alt="أبديت كارد" /></a>;
}

export default function App() {
  const [worldIndex, setWorldIndex] = useState(0);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(8);
  const [audience, setAudience] = useState('individual');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(() => routeProduct(window.location.hash));
  const [routeMissing, setRouteMissing] = useState(() => window.location.hash.startsWith('#service/') && !routeProduct(window.location.hash));
  const searchRef = useRef(null);
  const gridRef = useRef(null);
  const openedInternally = useRef(false);
  const returnFocus = useRef(null);
  const productWasOpen = useRef(Boolean(selected));
  const world = worlds[worldIndex];
  const matches = useMemo(() => findProducts(query, category), [query, category]);
  useEffect(() => {
    const onHash = () => {
      const product = routeProduct(window.location.hash);
      const restoreFocus = productWasOpen.current && !product;
      productWasOpen.current = Boolean(product);
      setSelected(product);
      setRouteMissing(window.location.hash.startsWith('#service/') && !product);
      setMenuOpen(false);
      if (restoreFocus) requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }));
    };
    window.addEventListener('hashchange', onHash);
    const onKey = event => {
      if (event.key === 'Escape') {
        const menu = document.querySelector('.menu-toggle[aria-expanded="true"]');
        setMenuOpen(false);
        menu?.focus();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && !document.querySelector('dialog[open]')) {
        event.preventDefault();
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'auto' });
        searchRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('keydown', onKey); };
  }, []);
  useEffect(() => { setLimit(8); }, [query, category]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.dataset.seen = 'true'; observer.unobserve(entry.target); } });
    }, { threshold: 0.18 });
    document.querySelectorAll('[data-observe]').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const node = gridRef.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { node.dataset.arrived = 'true'; observer.disconnect(); }
    }, { threshold: .08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [category, query]);
  function openProduct(product, target) {
    returnFocus.current = target;
    openedInternally.current = true;
    productWasOpen.current = true;
    window.location.hash = 'service/' + product.category + '/' + product.slug;
    setSelected(product);
    setRouteMissing(false);
  }
  function closeProduct() {
    setSelected(null);
    if (openedInternally.current) { openedInternally.current = false; window.history.back(); }
    else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search + '#catalog');
      requestAnimationFrame(() => document.getElementById('catalog')?.focus({ preventScroll: true }));
    }
  }
  function explore(id) {
    setQuery(''); setCategory(id); setLimit(8);
    window.location.hash = 'catalog';
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'auto' });
  }

  return <>
    <a className="skip-link" href="#catalog">انتقل إلى الخدمات</a>
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav aria-label="التنقل الرئيسي" className={menuOpen ? 'nav open' : 'nav'} id="primary-navigation">
          <a href="#catalog" onClick={() => setMenuOpen(false)}>استكشف الخدمات</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>كيف تطلب؟</a>
          <a href="#business" onClick={() => setMenuOpen(false)}>للأعمال والجملة</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>الأسئلة الشائعة</a>
        </nav>
        <a className="header-contact" href={contact.whatsapp} aria-label="تواصل عبر واتساب"><Icon name="message" /><span>تواصل معنا</span></a>
        <button className="icon-button menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} onClick={() => setMenuOpen(value => !value)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
    </header>
    <main id="top">
      {routeMissing && <div className="route-notice" role="alert"><Icon name="info" /><p>هذه الخدمة غير موجودة في الكتالوج.</p><a href="#catalog">تصفح الخدمات</a></div>}
      <section className="hero section-shell" aria-labelledby="hero-title" style={{ '--world-accent': world.color }}>
        <div className="hero-copy">
          <p className="eyebrow">من اليمن، لعالمك الرقمي</p>
          <h1 id="hero-title">بطاقتك<br />تفتح <span className="outline-word">عالمك</span></h1>
          <p className="hero-description">اسحب البطاقة، اقلبها، واكتشف عالمك الجاي.<br />ألعاب، اشتراكات وبطاقات… بطريقتك.</p>
          <div className="hero-actions"><a className="button primary" href="#catalog">تصفح الخدمات </a><a className="text-link" href="#how">كيف نسهّلها عليك؟ </a></div>
          <div className="hero-caption"><span className="small-line" /><span>ألعاب · بطاقات · اشتراكات · وأكثر</span></div>
        </div>
        <div className="hero-visual">
          <div className="scene-label" aria-hidden="true"><span>اسحب البطاقة واكتشفها</span></div>
          <div className="world-picker" role="group" aria-label="اختر العالم الذي يظهر في المشهد">
            {worlds.map((item, index) => <button key={item.id} aria-label={item.name} aria-pressed={worldIndex === index} onClick={() => setWorldIndex(index)}>{item.shortLabel}</button>)}
          </div>
          <FlipDeck key={world.id} world={world} onOpenProduct={openProduct} />
        </div>
        <a className="scroll-cue" href="#catalog"><span />استكشف أكثر</a>
      </section>

      <section className="world-portals section-shell" aria-label="اختر وجهتك الرقمية">
        <div className="portal-heading"><p className="eyebrow">ابدأ بالعالم الذي تحبه</p><span>كل بطاقة… بداية عالم</span></div>
        <div className="portal-grid">{worlds.map((item, index) => {
          const art = products.find(product => product.category === item.id && product.slug === item.second);
          return <button className="world-portal" key={item.id} onClick={() => explore(item.id)} style={{ '--portal-accent': item.color }}>
            <img src={art.imageUrl} alt="" width="512" height="512" loading="lazy" />
            <span className="portal-overlay" /><span className="portal-english">{item.en}</span>
            <span className="portal-bottom"><span><small>{item.label}</small><strong>{item.name}</strong></span><span className="portal-arrow">تصفح</span></span>
          </button>;
        })}</div>
      </section>

      <section className="catalog section-shell" id="catalog" tabIndex="-1" aria-labelledby="catalog-title">
        <div className="section-heading"><div><p className="eyebrow">كل خدماتك الرقمية</p><h2 id="catalog-title">إيش عالمك اليوم<span>؟</span></h2></div><p>من أول لعبة… لآخر اشتراك.<br />ابدأ بالخدمة اللي تحتاجها.</p></div>
        <div className="catalog-tools">
          <label className="search-field"><Icon name="search" /><span className="sr-only">ابحث باسم الخدمة أو المنصة</span><input ref={searchRef} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="اسم اللعبة أو الخدمة" /><kbd aria-hidden="true">{ /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K' }</kbd></label>
          <div className="audience-switch" role="group" aria-label="نوع العميل"><button aria-pressed={audience === 'individual'} onClick={() => setAudience('individual')}>للأفراد</button><button aria-pressed={audience === 'wholesale'} onClick={() => setAudience('wholesale')}>للجملة</button></div>
        </div>
        <div className="category-filter" role="group" aria-label="تصفية حسب نوع الخدمة"><button aria-pressed={category === 'all'} onClick={() => setCategory('all')}>كل العوالم <span>{products.length}</span></button>{services.map(item => <button key={item.slug} aria-pressed={category === item.slug} onClick={() => setCategory(item.slug)}>{item.title}</button>)}</div>
        <div className="results-line"><p role="status">{matches.length} خدمة{query ? ' تطابق بحثك' : ' للاستكشاف'}{audience === 'wholesale' ? ' · طلبات الجملة والتوزيع' : ''}</p><span>التوفر والسعر عند الاستفسار</span></div>
        <div className="product-grid" ref={gridRef} key={category + query}>
          {matches.slice(0, limit).map((item, index) => <article className="product-card" key={item.category + '/' + item.slug} data-category={item.category} style={{ '--card-order': Math.min(index, 7) }}>
            <a className="product-open" href={'#service/' + item.category + '/' + item.slug} onClick={event => { event.preventDefault(); openProduct(item, event.currentTarget); }}>
              <div className="product-art"><ProductImage product={item} /><span className="product-tag">{item.categoryTitle}</span></div>
              <div className="product-info"><h3>{item.title}</h3><p>{item.description}</p><span className="product-action">اكتشف التفاصيل </span></div>
            </a>
          </article>)}
        </div>
        {!matches.length && <div className="empty-state"><Icon name="search" width="38" height="38" /><h3>عالمك مش ظاهر هنا؟</h3><p>جرّب اسمًا آخر، أو أرسل لنا طلبك ونتحقق من توفره.</p><button className="button secondary" onClick={() => { setQuery(''); setCategory('all'); }}>عرض كل الخدمات</button><a className="text-link" href={orderUrl({ details: query, audience })}>استفسر عن «{query || 'خدمتك'}» </a></div>}
        {matches.length > limit && <button className="button secondary load-more" onClick={() => setLimit(value => value + 12)}>اكتشف خدمات أكثر <Icon name="plus" /><span>{matches.length - limit}</span></button>}
        <div className="custom-strip"><span><Icon name="sparkle" /> عندك طلب مختلف؟</span><p>أرسل اسم الخدمة أو رابطها، والباقي نتفاهم عليه.</p><a href={orderUrl({ audience })}>اسألنا عنه </a></div>
      </section>

      <section className="how-section" id="how" aria-labelledby="how-title">
        <div className="section-shell how-layout">
          <div className="how-intro"><p className="eyebrow">خطوات واضحة</p><h2 id="how-title">من «أشتي»<br />إلى «تم»</h2><p>تفاصيل واضحة من البداية.<br />وخدمة تمشي مع احتياجك.</p><a className="text-link" href="#catalog">نبدأ بطلبك </a></div>
          <div className="journey">
            {[['01', 'اختَر اللي تحتاجه', 'لعبة، بطاقة، اشتراك أو طلب خاص. استكشف وحدّد الخدمة المناسبة لك.', 'game'], ['02', 'نضبط التفاصيل معك', 'أرسل المنطقة والكمية أو الخطة عبر واتساب، ونؤكد لك السعر والتوفر وطريقة التنفيذ.', 'card'], ['03', 'ونكملها سوا', 'بعد موافقتك على التفاصيل، نمشي معك في خطوات التنفيذ المناسبة للخدمة.', 'check']].map(([n, title, text, icon]) => <article className="journey-step" key={n} data-observe><span className="step-number">{n}</span><div><span className="step-icon"><Icon name={icon} /></span><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="business section-shell" id="business" aria-labelledby="business-title">
        <div className="business-card" data-observe>
          <div className="business-copy"><p className="eyebrow">للأفراد والجملة والتوزيع</p><h2 id="business-title">شغلك يكبر.<br />وعالمك يتوسّع.</h2><p>عندك محل أو نشاط رقمي؟ أبديت كارد تخدم الأفراد وعملاء الجملة والتوزيع. نتفق معك على الخيارات حسب نوع الخدمة وحجم الطلب والتوفر.</p><a className="button light" href={orderUrl({ audience: 'wholesale', details: 'أريد معرفة تفاصيل خدمات الجملة والتوزيع.' })}>نتكلم عن شغلك </a></div>
          <div className="business-art" aria-hidden="true"><div className="network-ring ring-one" /><div className="network-ring ring-two" /><div className="network-card nc-one"><Icon name="game" />GAMES</div><div className="network-card nc-two"><Icon name="card" />CARDS</div><div className="network-card nc-three"><Icon name="globe" />WORLD</div><div className="network-center"><img src={mark} alt="" width="80" height="80" /></div><span className="network-label">ONE CONNECTION.<br />MORE POSSIBILITIES.</span></div>
        </div>
      </section>

      <section className="faq section-shell" id="faq" aria-labelledby="faq-title"><div className="section-heading"><div><p className="eyebrow">إجابات تهمك</p><h2 id="faq-title">قبل ما تبدأ<span>…</span></h2></div><a className="text-link" href={contact.whatsapp}>عندك سؤال ثاني؟ </a></div><div className="faq-grid">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Icon name="plus" /></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className="closing section-shell"><div className="closing-top"><p className="eyebrow">جاهز لطلبك؟</p></div><h2>عالمك الجاي<br />يبدأ <a href="#catalog">من هنا </a></h2><div className="closing-bottom"><p>ما عرفت تختار؟ احكِ لنا إيش تحتاج.</p><a className="button primary" href={contact.whatsapp}>خلّنا نساعدك </a></div></section>
    </main>
    <footer className="site-footer section-shell"><div className="footer-main"><Brand footer /><p>خدماتك الرقمية في مكان واحد.<br />اليمن — صنعاء</p><div><a href={contact.phone} dir="ltr">+967 770 498 884</a><a href={contact.email}>updatecardye@gmail.com</a><a href={contact.facebook}>تابعنا على فيسبوك</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} أبديت كارد</span><span>السعر والتوفر يُؤكدان قبل التنفيذ.</span><a href="#top">للأعلى</a></div></footer>
    {selected && <RequestDialog key={selected.category + selected.slug} product={selected} audience={audience} onClose={closeProduct} />}
  </>;
}
