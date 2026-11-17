import { useEffect, useMemo, useRef, useState } from 'react';
import { services, products, findProducts, orderUrl, routeProduct, contact } from './catalog.mjs';
import { faqs } from '../../src/data/faqs.js';
import logo from '../../brand/web/logo-horizontal-320.webp';
import mark from '../../brand/web/logo-icon-256.webp';

const worlds = [
  { id: 'games', en: 'PLAY', name: 'عالم الألعاب', label: 'اشحن حماسك', color: '#ad87ff', product: 'pubg-mobile', second: 'free-fire', third: 'efootball' },
  { id: 'gift-cards', en: 'UNLOCK', name: 'عالم البطاقات', label: 'افتح احتمالاتك', color: '#ffab87', product: 'playstation', second: 'apple-itunes', third: 'amazon' },
  { id: 'subscriptions', en: 'ENJOY', name: 'عالم الاشتراكات', label: 'كمل اللي تحبه', color: '#e899cc', product: 'netflix', second: 'shahid-vip', third: 'youtube-premium' },
];
const paths = {
  arrow: 'M19 12H5m6-6-6 6 6 6',
  search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  close: 'm6 6 12 12M6 18 18 6',
  plus: 'M12 5v14M5 12h14',
  check: 'm5 12 4 4L19 6',
  globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
  card: 'M3 5h18v14H3zM3 10h18M7 15h4',
  game: 'M7 8h10c4 0 6 10 3 11-2 1-4-3-5-3H9c-1 0-3 4-5 3C1 18 3 8 7 8ZM8 10v5M5.5 12.5h5M16 12h.01M18 14h.01',
  shield: 'M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7l-9-4Zm-4 9 3 3 5-6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  sparkle: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
};
function Icon({ name = 'arrow', ...props }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name] || paths.sparkle} /></svg>;
}
function Brand({ footer = false }) {
  return <a href="#top" className={'brand ' + (footer ? 'brand-footer' : '')} aria-label="أبديت كارد — الرئيسية"><img src={footer ? logo : mark} width={footer ? 160 : 43} height={footer ? 64 : 43} alt="" />{!footer && <span dir="ltr">UPDATE<span>CARD</span></span>}</a>;
}
function ProductImage({ product, className = '', eager = false }) {
  return <img className={className} src={product.imageUrl} alt={product.imageAlt} width="600" height="450" loading={eager ? 'eager' : 'lazy'} decoding="async" onError={event => { event.currentTarget.style.visibility = 'hidden'; }} />;
}

function RequestDialog({ product, audience, onClose }) {
  const dialog = useRef(null);
  const [region, setRegion] = useState('');
  const [details, setDetails] = useState('');
  const [kind, setKind] = useState(audience);
  useEffect(() => {
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    return () => { node.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  const link = orderUrl({ product, region, details, audience: kind });
  return <dialog ref={dialog} className="request-dialog" aria-labelledby="request-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="request-layout">
      <div className="request-art" data-category={product.category}>
        <span className="eyebrow">YOUR NEXT UPGRADE</span>
        <ProductImage product={product} eager />
        <span className="request-category">{product.categoryTitle}</span>
      </div>
      <div className="request-content">
        <button className="icon-button close-dialog" type="button" onClick={onClose} aria-label="إغلاق تفاصيل الخدمة" autoFocus><Icon name="close" /></button>
        <span className="eyebrow">خلّ الباقي علينا</span>
        <h2 id="request-title">{product.title}</h2>
        <p>{product.description}</p>
        <div className="availability"><span />السعر والتوفر يُؤكدان قبل التنفيذ</div>
        <form action="https://wa.me/967770498884" onSubmit={event => { event.preventDefault(); window.location.assign(link); }}>
          <fieldset className="audience-field"><legend>نوع الطلب</legend><label><input type="radio" name="audience" checked={kind === 'individual'} onChange={() => setKind('individual')} /> فردي</label><label><input type="radio" name="audience" checked={kind === 'wholesale'} onChange={() => setKind('wholesale')} /> جملة / توزيع</label></fieldset>
          <label className="field">منطقة الحساب أو الدولة <span>اختياري</span><input value={region} onChange={event => setRegion(event.target.value)} maxLength={100} placeholder="مثال: السعودية، أمريكا، عالمي" autoComplete="country-name" /></label>
          <label className="field">تفاصيل طلبك <span>اختياري</span><textarea value={details} onChange={event => setDetails(event.target.value)} maxLength={1200} rows="3" placeholder="الفئة، الكمية، مدة الاشتراك أو رابط المنتج…" /></label>
          <p className="form-note">اكتب التفاصيل المتاحة، وسنساعدك في الباقي. لا ترسل كلمة المرور أو رموز التحقق.</p>
          <button className="button primary full" type="submit">جهّز الطلب على واتساب <Icon /></button>
          <p className="form-note centered">يفتح واتساب برسالة جاهزة؛ ترسلها بنفسك.</p>
        </form>
      </div>
    </div>
  </dialog>;
}

export default function App() {
  const [worldIndex, setWorldIndex] = useState(0);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(8);
  const [audience, setAudience] = useState('individual');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(() => routeProduct(window.location.hash));
  const searchRef = useRef(null);
  const openedInternally = useRef(false);
  const returnFocus = useRef(null);
  const productWasOpen = useRef(Boolean(selected));
  const world = worlds[worldIndex];
  const matches = useMemo(() => findProducts(query, category), [query, category]);
  const featured = [world.product, world.second, world.third].map(slug => products.find(p => p.category === world.id && p.slug === slug));
  useEffect(() => {
    const onHash = () => {
      const product = routeProduct(window.location.hash);
      const restoreFocus = productWasOpen.current && !product;
      productWasOpen.current = Boolean(product);
      setSelected(product);
      setMenuOpen(false);
      if (restoreFocus) requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }));
    };
    window.addEventListener('hashchange', onHash);
    const onKey = event => {
      if (event.key === 'Escape') setMenuOpen(false);
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
  function openProduct(product, target) {
    returnFocus.current = target;
    openedInternally.current = true;
    productWasOpen.current = true;
    window.location.hash = 'service/' + product.category + '/' + product.slug;
    setSelected(product);
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
    setQuery(''); setCategory(id);
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
        <a className="header-contact" href={contact.whatsapp}>خلّنا نساعدك <Icon /></a>
        <button className="icon-button menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} onClick={() => setMenuOpen(value => !value)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      </div>
    </header>
    <main id="top">
      <section className="hero section-shell" aria-labelledby="hero-title" style={{ '--world-accent': world.color }}>
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> من اليمن، لعالمك الرقمي</p>
          <h1 id="hero-title">بطاقتك<br />تفتح <span className="outline-word">عالمك<span className="heading-star">✦</span></span></h1>
          <p className="hero-description">لعبتك. اشتراكك. وكل اللي تحبّه.<br />خدماتك الرقمية أقرب مع أبديت كارد.</p>
          <div className="hero-actions"><a className="button primary" href="#catalog">اكتشف عالمك <Icon /></a><a className="text-link" href="#how">كيف نسهّلها عليك؟ <span>↙</span></a></div>
          <div className="hero-caption"><span className="small-line" /><span>ألعاب · بطاقات · اشتراكات · وأكثر</span></div>
        </div>
        <div className="hero-visual">
          <div className="world-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="scene-label" aria-hidden="true"><span>UPDATE YOUR WORLD</span><span>0{worldIndex + 1} / 03</span></div>
          <div className="card-scene" key={world.id}>
            <div className="world-word" aria-hidden="true">{world.en}</div>
            <div className="scene-card back-card back-two" aria-hidden="true"><ProductImage product={featured[2]} eager /><span>{featured[2].title}</span></div>
            <div className="scene-card back-card back-one" aria-hidden="true"><ProductImage product={featured[1]} eager /><span>{featured[1].title}</span></div>
            <button className="scene-card main-card" onClick={() => explore(world.id)} aria-label={'استكشف ' + world.name}>
              <div className="card-top"><span dir="ltr">UPDATE CARD</span><Icon name="sparkle" /></div>
              <div className="main-card-art"><ProductImage product={featured[0]} eager /><span className="art-shine" /></div>
              <div className="card-bottom"><span><small>{world.name}</small><strong>{world.label}</strong></span><span className="round-arrow"><Icon /></span></div>
            </button>
            <span className="floating-token token-plus" aria-hidden="true">+</span>
            <span className="floating-token token-star" aria-hidden="true">✦</span>
            <span className="scene-stamp" aria-hidden="true">YOUR<br />NEXT LEVEL ↗</span>
          </div>
          <div className="world-picker" role="group" aria-label="اختر العالم الذي يظهر في المشهد">
            {worlds.map((item, index) => <button key={item.id} aria-pressed={worldIndex === index} onClick={() => setWorldIndex(index)}><span>0{index + 1}</span>{item.name}</button>)}
          </div>
        </div>
        <a className="scroll-cue" href="#catalog"><span />استكشف أكثر</a>
      </section>

      <div className="platform-ribbon" aria-label="أمثلة من المنصات المدعومة حسب التوفر"><div><span>PUBG MOBILE</span><span>PlayStation</span><span>Netflix</span><span>Google Play</span><span>Apple</span><span>Amazon</span><span>شحن، وأكثر <Icon name="sparkle" /></span></div></div>

      <section className="catalog section-shell" id="catalog" tabIndex="-1" aria-labelledby="catalog-title">
        <div className="section-heading"><div><p className="eyebrow">PICK YOUR NEXT</p><h2 id="catalog-title">إيش عالمك اليوم<span>؟</span></h2></div><p>من أول لعبة… لآخر اشتراك.<br />ابدأ بالخدمة اللي تحتاجها.</p></div>
        <div className="catalog-tools">
          <label className="search-field"><Icon name="search" /><span className="sr-only">ابحث باسم الخدمة أو المنصة</span><input ref={searchRef} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="ابحث عن لعبتك، بطاقتك أو اشتراكك…" /><kbd aria-hidden="true">⌘ K</kbd></label>
          <div className="audience-switch" role="group" aria-label="نوع العميل"><button aria-pressed={audience === 'individual'} onClick={() => setAudience('individual')}>للأفراد</button><button aria-pressed={audience === 'wholesale'} onClick={() => setAudience('wholesale')}>للجملة</button></div>
        </div>
        <div className="category-filter" role="group" aria-label="تصفية حسب نوع الخدمة"><button aria-pressed={category === 'all'} onClick={() => setCategory('all')}>كل العوالم <span>{products.length}</span></button>{services.map(item => <button key={item.slug} aria-pressed={category === item.slug} onClick={() => setCategory(item.slug)}>{item.title}</button>)}</div>
        <div className="results-line"><p role="status">{matches.length} خدمة{query ? ' تطابق بحثك' : ' للاستكشاف'}{audience === 'wholesale' ? ' · طلبات الجملة والتوزيع' : ''}</p><span>التوفر والسعر عند الاستفسار <span className="status-dot" /></span></div>
        <div className="product-grid">
          {matches.slice(0, limit).map((item, index) => <article className="product-card" key={item.category + '/' + item.slug} data-category={item.category} style={{ '--card-order': Math.min(index, 7) }}>
            <a className="product-open" href={'#service/' + item.category + '/' + item.slug} onClick={event => { event.preventDefault(); openProduct(item, event.currentTarget); }}>
              <div className="product-art"><ProductImage product={item} /><span className="product-tag">{item.categoryTitle}</span><span className="product-open-icon"><Icon /></span></div>
              <div className="product-info"><h3>{item.title}</h3><p>{item.description}</p><span className="product-action">اكتشف التفاصيل <Icon /></span></div>
            </a>
          </article>)}
        </div>
        {!matches.length && <div className="empty-state"><Icon name="search" width="38" height="38" /><h3>عالمك مش ظاهر هنا؟</h3><p>جرّب اسمًا آخر، أو أرسل لنا طلبك ونتحقق من توفره.</p><button className="button secondary" onClick={() => { setQuery(''); setCategory('all'); }}>عرض كل الخدمات</button><a className="text-link" href={orderUrl({ details: query, audience })}>استفسر عن «{query || 'خدمتك'}» <Icon /></a></div>}
        {matches.length > limit && <button className="button secondary load-more" onClick={() => setLimit(value => value + 12)}>اكتشف خدمات أكثر <Icon name="plus" /><span>{matches.length - limit}</span></button>}
        <div className="custom-strip"><span><Icon name="sparkle" /> عندك طلب مختلف؟</span><p>أرسل اسم الخدمة أو رابطها، والباقي نتفاهم عليه.</p><a href={orderUrl({ audience })}>اسألنا عنه <Icon /></a></div>
      </section>

      <section className="how-section" id="how" aria-labelledby="how-title">
        <div className="section-shell how-layout">
          <div className="how-intro"><p className="eyebrow">LESS STEPS. MORE POSSIBILITIES.</p><h2 id="how-title">من «أشتي»<br />إلى «تم»<span>↙</span></h2><p>تفاصيل واضحة من البداية.<br />وخدمة تمشي مع احتياجك.</p><a className="text-link" href="#catalog">نبدأ بطلبك <Icon /></a></div>
          <div className="journey">
            {[['01', 'اختَر اللي تحتاجه', 'لعبة، بطاقة، اشتراك أو طلب خاص. استكشف وحدّد الخدمة المناسبة لك.', 'game'], ['02', 'نضبط التفاصيل معك', 'أرسل المنطقة والكمية أو الخطة عبر واتساب، ونؤكد لك السعر والتوفر وطريقة التنفيذ.', 'card'], ['03', 'ونكملها سوا', 'بعد موافقتك على التفاصيل، نمشي معك في خطوات التنفيذ المناسبة للخدمة.', 'check']].map(([n, title, text, icon]) => <article className="journey-step" key={n} data-observe><span className="step-number">{n}</span><div><span className="step-icon"><Icon name={icon} /></span><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="business section-shell" id="business" aria-labelledby="business-title">
        <div className="business-card" data-observe>
          <div className="business-copy"><p className="eyebrow">A BIGGER WORLD FOR YOUR BUSINESS</p><h2 id="business-title">شغلك يكبر.<br />وعالمك يتوسّع.</h2><p>عندك محل أو نشاط رقمي؟ أبديت كارد تخدم الأفراد وعملاء الجملة والتوزيع. نتفق معك على الخيارات حسب نوع الخدمة وحجم الطلب والتوفر.</p><a className="button light" href={orderUrl({ audience: 'wholesale', details: 'أريد معرفة تفاصيل خدمات الجملة والتوزيع.' })}>نتكلم عن شغلك <Icon /></a></div>
          <div className="business-art" aria-hidden="true"><div className="network-ring ring-one" /><div className="network-ring ring-two" /><div className="network-card nc-one"><Icon name="game" />GAMES</div><div className="network-card nc-two"><Icon name="card" />CARDS</div><div className="network-card nc-three"><Icon name="globe" />WORLD</div><div className="network-center"><img src={mark} alt="" width="80" height="80" /></div><span className="network-label">ONE CONNECTION.<br />MORE POSSIBILITIES.</span></div>
        </div>
      </section>

      <section className="faq section-shell" id="faq" aria-labelledby="faq-title"><div className="section-heading"><div><p className="eyebrow">GOOD TO KNOW</p><h2 id="faq-title">قبل ما تبدأ<span>…</span></h2></div><a className="text-link" href={contact.whatsapp}>عندك سؤال ثاني؟ <Icon /></a></div><div className="faq-grid">{faqs.map((faq, index) => <details key={faq.question}><summary><span className="faq-number">0{index + 1}</span>{faq.question}<Icon name="plus" /></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className="closing section-shell"><div className="closing-top"><p className="eyebrow">READY FOR YOUR NEXT?</p><span aria-hidden="true">✦</span></div><h2>عالمك الجاي<br />يبدأ <a href="#catalog">من هنا <Icon /></a></h2><div className="closing-bottom"><p>ما عرفت تختار؟ احكِ لنا إيش تحتاج.</p><a className="button primary" href={contact.whatsapp}>خلّنا نساعدك <Icon /></a></div></section>
    </main>
    <footer className="site-footer section-shell"><div className="footer-main"><Brand footer /><p>خدماتك الرقمية في مكان واحد.<br />اليمن — صنعاء</p><div><a href={contact.phone} dir="ltr">+967 770 498 884</a><a href={contact.email}>updatecardye@gmail.com</a><a href={contact.facebook}>تابعنا على فيسبوك ↗</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} أبديت كارد</span><span>السعر والتوفر يُؤكدان قبل التنفيذ.</span><a href="#top">للأعلى ↑</a></div></footer>
    {selected && <RequestDialog key={selected.category + selected.slug} product={selected} audience={audience} onClose={closeProduct} />}
  </>;
}
