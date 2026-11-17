import { useEffect, useMemo, useRef, useState } from 'react';
import { products } from './catalog.mjs';
import { backIsVisible, clamp, dragAngle, settleTurn, wrapIndex } from './deckPhysics.mjs';
import mark from '../../brand/web/logo-icon-256.webp';

function Arrow({ reverse = false }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={reverse ? { transform: 'rotate(180deg)' } : undefined}><path d="M20 12H4m6-6-6 6 6 6" /></svg>;
}
function CardFace({ product, world, back = false }) {
  return <span className={'deck-face ' + (back ? 'deck-back' : 'deck-front')} aria-hidden="true">
    {back ? <>
      <span className="card-magnetic" />
      <span className="back-monogram">UC<span>✦</span></span>
      <span className="back-caption">YOUR WORLD. UPGRADED.</span>
      <span className="back-service">{product.title}</span>
      <span className="back-description">{product.description}</span>
      <span className="back-digital-code"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
      <span className="back-footer">اكتشف الخدمة. وجهّز طلبك.<span>↗</span></span>
    </> : <>
      <img className="deck-cover" src={product.imageUrl} alt="" width="512" height="512" draggable="false" decoding="async" />
      <span className="deck-vignette" />
      <span className="deck-foil" />
      <span className="deck-edge" />
      <span className="deck-brand"><img src={mark} alt="" width="34" height="34" draggable="false" /><span dir="ltr">UPDATE<br />CARD</span><span className="deck-chip"><i /><i /><i /></span></span>
      <span className="deck-world">{world.en} <span>✦</span></span>
      <span className="deck-title"><small>{world.name}</small><strong>{product.title}</strong><span>عالمك… على الجهة الثانية <span>↻</span></span></span>
    </>}
  </span>;
}

export default function FlipDeck({ world, onOpenProduct }) {
  const cards = useMemo(() => products.filter(product => product.category === world.id).slice(0, 6), [world.id]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const cardRef = useRef(null);
  const flightRef = useRef(null);
  const animationRef = useRef(null);
  const gestureRef = useRef(null);
  const boundsRef = useRef(null);
  const angleRef = useRef(0);
  const active = cards[index];
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => { media.removeEventListener('change', update); animationRef.current?.cancel(); };
  }, []);
  function writePose(angle, x = 0, bank = -5) {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty('--turn', angle + 'deg');
    node.style.setProperty('--drag-x', x + 'px');
    node.style.setProperty('--bank', bank + 'deg');
  }
  function settle(angle) {
    const node = cardRef.current;
    node?.classList.remove('is-dragging');
    node?.style.setProperty('--pitch', '0deg');
    node?.style.setProperty('--yaw', '0deg');
    angleRef.current = angle;
    writePose(angle);
    setFlipped(backIsVisible(angle));
  }
  function flip() { if (!busy) settle(settleTurn(angleRef.current, 0, true)); }
  function begin(event) {
    if (busy || !event.isPrimary || event.button !== 0) return;
    boundsRef.current = event.currentTarget.getBoundingClientRect();
    gestureRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, base: angleRef.current, delta: 0, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('is-dragging');
    event.currentTarget.style.setProperty('--yaw', '0deg');
  }
  function move(event) {
    const gesture = gestureRef.current;
    const node = cardRef.current;
    if (!node) return;
    if (gesture && gesture.id === event.pointerId) {
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      // pan-y keeps vertical page scrolling native; an interrupted drag springs home.
      if (!gesture.moved && Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx) * 1.2) { cancel(event); return; }
      gesture.moved ||= Math.abs(dx) > 5;
      gesture.delta = dragAngle(dx, boundsRef.current.width);
      if (!reduced) writePose(gesture.base + gesture.delta, dx * .055, -5 + clamp(dx / 28, -9, 9));
      return;
    }
    if (event.pointerType !== 'mouse' || reduced || busy) return;
    const bounds = boundsRef.current;
    if (!bounds) return;
    const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
    const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
    node.style.setProperty('--yaw', (x - .5) * 13 + 'deg');
    node.style.setProperty('--pitch', (.5 - y) * 12 + 'deg');
    node.style.setProperty('--light-x', x * 100 + '%');
    node.style.setProperty('--light-y', y * 100 + '%');
  }
  function release(event) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    gestureRef.current = null;
    settle(settleTurn(gesture.base, gesture.delta, !gesture.moved));
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function cancel(event) {
    const gesture = gestureRef.current;
    if (!gesture) return;
    gestureRef.current = null;
    settle(gesture.base);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function leave() {
    if (!gestureRef.current) {
      cardRef.current?.style.setProperty('--yaw', '0deg');
      cardRef.current?.style.setProperty('--pitch', '0deg');
    }
  }
  async function advance(direction) {
    if (busy || gestureRef.current) return;
    const showNext = () => {
      angleRef.current = 0;
      setFlipped(false);
      setIndex(previous => wrapIndex(previous + direction, cards.length));
    };
    if (reduced || !flightRef.current?.animate) { showNext(); return; }
    setBusy(true);
    const animation = flightRef.current.animate([
      { transform: 'translate3d(0,0,0) rotateY(0deg) rotateZ(0deg)', opacity: 1 },
      { transform: 'translate3d(' + direction * 430 + 'px,-90px,150px) rotateY(' + direction * 75 + 'deg) rotateZ(' + direction * 27 + 'deg)', opacity: 0 },
    ], { duration: 390, easing: 'cubic-bezier(.5,.05,.8,.5)', fill: 'forwards' });
    animationRef.current = animation;
    try { await animation.finished; showNext(); }
    catch { /* A world change cancels the finite flight without another update. */ }
    finally { if (animationRef.current === animation) { animationRef.current = null; setBusy(false); } }
  }
  return <div className={'flip-deck ' + (reduced ? 'motion-reduced' : '')} data-world={world.id} style={{ '--deck-accent': world.color }}>
    <div className="deck-environment" aria-hidden="true"><div className="deck-sun" /><div className="deck-orbit orbit-a" /><div className="deck-orbit orbit-b" /><span className="deck-giant-word">{world.en}</span><span className="deck-coordinate">HANDLE WITH CURIOSITY</span><span className="deck-spark spark-a">✦</span><span className="deck-spark spark-b">+</span><div className="deck-ground" /></div>
    <div className="physical-stage">
      {[2, 1].map(offset => <button className={'deck-preview preview-' + offset} key={offset} type="button" tabIndex="-1" aria-hidden="true" onClick={() => advance(1)} disabled={busy}><CardFace product={cards[wrapIndex(index + offset, cards.length)]} world={world} /></button>)}
      <div className="card-flight" ref={flightRef} key={active.slug}>
        <div className="physical-card main-card" ref={cardRef} role="button" tabIndex="0" data-world={world.id} data-flipped={flipped} aria-pressed={flipped} aria-label={'اقلب بطاقة ' + active.title} aria-describedby="deck-help"
          onPointerEnter={event => { boundsRef.current = event.currentTarget.getBoundingClientRect(); }} onPointerDown={begin} onPointerMove={move} onPointerUp={release} onPointerCancel={cancel} onLostPointerCapture={event => { if (gestureRef.current) cancel(event); }} onPointerLeave={leave}
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (!event.repeat) flip(); } if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); advance(event.key === 'ArrowLeft' ? 1 : -1); } }}>
          <CardFace product={active} world={world} /><CardFace product={active} world={world} back />
        </div>
      </div>
      <span className="deck-drag-note" id="deck-help"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" aria-hidden="true"><path d="M9 15V7a2 2 0 0 1 4 0v7-4a2 2 0 0 1 4 0v4-2a2 2 0 0 1 4 0v6l-4 6h-7l-6-8a2 2 0 0 1 3-2l2 1ZM2 6h4M3 3 0 6l3 3M23 3l3 3-3 3" /></svg><span>اسحبها بإصبعك<span>أو اضغط… واقلبها ↻</span></span></span>
    </div>
    <div className="deck-toolbar"><div className="deck-pagination" role="status" aria-live="polite"><b>{String(index + 1).padStart(2, '0')}</b><span>/ {String(cards.length).padStart(2, '0')}</span><span className="face-indicator">{flipped ? 'ظهر البطاقة' : 'وجه البطاقة'}</span></div><div className="deck-actions"><button type="button" aria-label="البطاقة السابقة" onClick={() => advance(-1)} disabled={busy}><Arrow reverse /></button><button className="flip-control" type="button" aria-label="اقلب البطاقة" aria-pressed={flipped} onClick={flip} disabled={busy}>↻</button><button type="button" aria-label="البطاقة التالية" onClick={() => advance(1)} disabled={busy}><Arrow /></button></div></div>
    <a className="deck-discover" href={'#service/' + active.category + '/' + active.slug} onClick={event => { event.preventDefault(); onOpenProduct(active, event.currentTarget); }}><span>اكتشف {active.title}</span><Arrow /></a>
  </div>;
}
