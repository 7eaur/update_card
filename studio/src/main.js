const WHATSAPP='967770498884';
const products=[
{id:'pubg',name:'ببجي موبايل',en:'PUBG MOBILE',desc:'شدّات وخدمات اللعبة للحسابات والمناطق المدعومة.',category:'games',glyph:'✦',tone:'#eda847',badge:'الألعاب'},
{id:'freefire',name:'فري فاير',en:'FREE FIRE',desc:'شحن اللعبة حسب الحساب والمنطقة المتاحة.',category:'games',glyph:'◆',tone:'#ff744f',badge:'الألعاب'},
{id:'cod',name:'كول أوف ديوتي موبايل',en:'CALL OF DUTY MOBILE',desc:'نقاط وشحن للعبة حسب التوفر والمنصة.',category:'games',glyph:'✹',tone:'#f0bd64',badge:'الألعاب'},
{id:'fc',name:'FC Mobile',en:'EA SPORTS FC MOBILE',desc:'خدمات وشحن للعبة FC Mobile.',category:'games',glyph:'⬢',tone:'#5de6d9',badge:'الألعاب'},
{id:'efootball',name:'إي فوتبول',en:'EFOOTBALL',desc:'خدمات eFootball للحسابات والمنصات المدعومة.',category:'games',glyph:'◉',tone:'#5d89fb',badge:'الألعاب'},
{id:'clash',name:'كلاش أوف كلانس',en:'CLASH OF CLANS',desc:'شحن وخدمات داخل اللعبة وفق المنطقة والحساب.',category:'games',glyph:'♜',tone:'#d9a16a',badge:'الألعاب'},
{id:'psn',name:'بلايستيشن ستور',en:'PLAYSTATION STORE',desc:'بطاقات رقمية لمناطق وحسابات مختارة.',category:'cards',glyph:'△',tone:'#647cff',badge:'البطاقات'},
{id:'apple',name:'آبل / آيتونز',en:'APPLE / ITUNES',desc:'بطاقات لمتجر Apple لمناطق مدعومة.',category:'cards',glyph:'●',tone:'#a1e3ec',badge:'البطاقات'},
{id:'google',name:'جوجل بلاي',en:'GOOGLE PLAY',desc:'بطاقات Google Play حسب منطقة الحساب.',category:'cards',glyph:'▷',tone:'#62e8a7',badge:'البطاقات'},
{id:'netflix',name:'اشتراكات رقمية',en:'DIGITAL SUBSCRIPTIONS',desc:'اشتراكات ترفيه ومحتوى وخدمات متنوعة.',category:'subscriptions',glyph:'▶',tone:'#fc6c93',badge:'الاشتراكات'},
{id:'tiktok',name:'تيك توك والتطبيقات',en:'SOCIAL / ENTERTAINMENT',desc:'خدمات وشحن تطبيقات التواصل والترفيه حسب التوفر.',category:'social',glyph:'♫',tone:'#62e3f1',badge:'التطبيقات'},
{id:'bigo',name:'بيجو لايف',en:'BIGO LIVE',desc:'شحن وخدمات BIGO LIVE وفق نوع الطلب.',category:'social',glyph:'✺',tone:'#bd78f4',badge:'التطبيقات'},
{id:'xbox',name:'بطاقات Xbox',en:'XBOX',desc:'بطاقات ومناطق Xbox المدعومة.',category:'cards',glyph:'✕',tone:'#6fd9a0',badge:'البطاقات'},
{id:'shahid',name:'شاهد والاشتراكات',en:'SHAHID / MEMBERSHIPS',desc:'اشتراكات وتفعيلات رقمية حسب الخطة المتاحة.',category:'subscriptions',glyph:'◎',tone:'#e87ce9',badge:'الاشتراكات'}
];
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const catalog=$('#catalog-grid'), search=$('#catalog-search'), count=$('#result-count'), empty=$('#empty-state');
const filters=$$('[data-filter]');
let selectedFilter='all', currentOrder=null, orderTrigger=null, animating=false;
function normalize(s){return s.toLocaleLowerCase('ar').normalize('NFKD').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').trim()}
function card(product){
  const article=document.createElement('article');article.className='product';
  article.style.setProperty('--tone',product.tone);
  const visual=document.createElement('div');visual.className='product__art';
  const glyph=document.createElement('span');glyph.className='product__glyph';glyph.textContent=product.glyph;glyph.setAttribute('aria-hidden','true');
  const badge=document.createElement('span');badge.className='product__badge';badge.textContent=product.badge;
  visual.append(glyph,badge);
  const body=document.createElement('div');body.className='product__body';
  const eyebrow=document.createElement('span');eyebrow.className='product__eyebrow';eyebrow.textContent=product.en;
  const title=document.createElement('h3');title.className='product__title';title.textContent=product.name;
  const desc=document.createElement('p');desc.className='product__desc';desc.textContent=product.desc;
  const foot=document.createElement('div');foot.className='product__foot';
  const note=document.createElement('small');note.textContent='السعر والتوفر عند التأكيد';
  const btn=document.createElement('button');btn.type='button';btn.className='product__action';btn.textContent='استفسر الآن ↗';btn.setAttribute('aria-label','استفسر عن '+product.name);
  btn.addEventListener('click',()=>openOrder(product,btn));
  foot.append(note,btn);body.append(eyebrow,title,desc,foot);article.append(visual,body);
  return article;
}
function renderCatalog(){
 const q=normalize(search.value);
 const matches=products.filter(p=>(selectedFilter==='all'||p.category===selectedFilter)&&normalize([p.name,p.en,p.desc,p.badge].join(' ')).includes(q));
 const frag=document.createDocumentFragment();for(const product of matches)frag.append(card(product));
 catalog.replaceChildren(frag);
 empty.hidden=matches.length!==0;
 count.textContent='عرض '+matches.length+' من '+products.length+' خدمة مختارة';
}
function chooseFilter(category){
 selectedFilter=category;
 filters.forEach(b=>{const active=b.dataset.filter===category;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});
 renderCatalog();
}
filters.forEach(btn=>btn.addEventListener('click',()=>chooseFilter(btn.dataset.filter)));
search.addEventListener('input',renderCatalog);
$$('[data-category]').forEach(link=>link.addEventListener('click',()=>{chooseFilter(link.dataset.category);search.value='';renderCatalog()}));
renderCatalog();
const layer=$('#order-layer'), panel=$('.order-panel'), form=$('#order-form'), visual=$('#order-visual');
function openOrder(product,trigger){
 orderTrigger=trigger||document.activeElement;
 currentOrder=product;
 $('#order-title').textContent=product?('طلب '+product.name):'طلب خدمة خاصة';
 $('#order-product').value=product?product.name:'خدمة حسب الطلب';
 visual.textContent=product?product.glyph:'✳';
 visual.style.background=product?'radial-gradient(circle at 60% 50%, '+product.tone+'77, transparent 54%), linear-gradient(130deg,#362257,#17152f)':'radial-gradient(circle at 60% 50%, #d869bc88, transparent 54%),linear-gradient(130deg,#362257,#17152f)';
 form.reset();$('#order-product').value=product?product.name:'خدمة حسب الطلب';
 layer.hidden=false;document.body.style.overflow='hidden';
 panel.scrollTop=0;panel.focus({preventScroll:true});
}
function closeOrder(){layer.hidden=true;document.body.style.overflow='';currentOrder=null;orderTrigger?.focus({preventScroll:true})}
$$('[data-close-order]').forEach(b=>b.addEventListener('click',closeOrder));
$('[data-custom-request]').addEventListener('click',e=>openOrder(null,e.currentTarget));
form.addEventListener('submit',e=>{
 e.preventDefault();
 const fd=new FormData(form),safe=x=>String(x||'').trim().slice(0,500);
 const items=['مرحبًا أبديت كارد، أريد الاستفسار عن خدمة:', 'الخدمة: '+safe(fd.get('product'))];
 if(safe(fd.get('package')))items.push('الباقة أو الكمية: '+safe(fd.get('package')));
 if(safe(fd.get('region')))items.push('المنطقة أو المنصة: '+safe(fd.get('region')));
 if(safe(fd.get('notes')))items.push('ملاحظات: '+safe(fd.get('notes')));
 items.push('أرجو تأكيد التوفر والسعر وطريقة التنفيذ قبل الطلب.');
 const href='https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(items.join('\n'));
 const opened=window.open(href,'_blank','noopener,noreferrer');
 if(!opened)window.location.href=href;
});
function focusSearch(){
 chooseFilter('all');search.value='';renderCatalog();
 $('#catalog').scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});
 setTimeout(()=>search.focus({preventScroll:true}),reduced.matches?0:450);
 closeMenu();
}
$$('[data-focus-search]').forEach(b=>b.addEventListener('click',focusSearch));
const menu=$('#menu-toggle'),nav=$('#nav');
function closeMenu(){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','فتح القائمة')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة')});
$$('a',nav).forEach(a=>a.addEventListener('click',closeMenu));
addEventListener('keydown',e=>{
 const typing=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)||document.activeElement?.isContentEditable;
 if(e.key==='Escape'){if(!layer.hidden)closeOrder();else closeMenu()}
 if(e.key==='/'&&!typing&&layer.hidden){e.preventDefault();focusSearch()}
 if(e.key==='Tab'&&!layer.hidden){
  const tabbable=$$('button:not([disabled]),input:not([disabled]),textarea:not([disabled]),a[href]',panel).filter(el=>el.getClientRects().length);
  const first=tabbable[0],last=tabbable[tabbable.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
});
let observer;
if('IntersectionObserver' in window&&!reduced.matches){
 document.body.classList.add('js-animated');
 observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{rootMargin:'0px 0px -35px 0px',threshold:.08});
 $$('.reveal').forEach(el=>observer.observe(el));
}
const back=$('.backtotop'),header=$('#site-header');
let scrollQueued=false;
function onScroll(){
 if(scrollQueued)return;scrollQueued=true;
 requestAnimationFrame(()=>{scrollQueued=false;const y=scrollY;header.classList.toggle('is-scrolled',y>40);back.classList.toggle('show',y>720);});
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
back.addEventListener('click',()=>scrollTo({top:0,behavior:reduced.matches?'auto':'smooth'}));
$('#year').textContent=String(new Date().getFullYear());
const hero=$('#hero-visual'),cards=$$('.floating-card',hero),canFloat=matchMedia('(min-width: 900px) and (pointer: fine)');
let pointerFrame=0,pointerX=0,pointerY=0;
function frame(){
 pointerFrame=0;
 cards.forEach(el=>{const d=Number(el.dataset.depth);el.style.translate=(pointerX*d*55).toFixed(1)+'px '+(pointerY*d*55).toFixed(1)+'px'});
}
hero.addEventListener('pointermove',e=>{
 if(!canFloat.matches||reduced.matches)return;
 const r=hero.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;
 if(!pointerFrame)pointerFrame=requestAnimationFrame(frame);
},{passive:true});
hero.addEventListener('pointerleave',()=>{pointerX=pointerY=0;if(!pointerFrame)pointerFrame=requestAnimationFrame(frame)},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&pointerFrame){cancelAnimationFrame(pointerFrame);pointerFrame=0}});
