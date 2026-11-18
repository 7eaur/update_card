import { useEffect, useRef, useState } from 'react';
import { contact, orderUrl } from './catalog.mjs';
import { Icon } from './Icons.jsx';
import ProductImage from './ProductImage.jsx';

export default function RequestDialog({ product, audience, onClose }) {
  const dialog = useRef(null);
  const backdropStart = useRef(false);
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
  return <dialog ref={dialog} className="request-dialog" aria-labelledby="request-title" aria-describedby="request-summary" onCancel={event => { event.preventDefault(); onClose(); }} onPointerDown={event => { backdropStart.current = event.target === event.currentTarget; }} onClick={event => { if (backdropStart.current && event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-toolbar"><span>تفاصيل الخدمة</span><button className="icon-button close-dialog" type="button" onClick={onClose} aria-label="إغلاق تفاصيل الخدمة" autoFocus><Icon name="close" /></button></div>
    <div className="request-layout">
      <div className="request-art" data-category={product.category}>
        <ProductImage product={product} eager />
        <span className="request-category">{product.categoryTitle}</span>
      </div>
      <div className="request-content">
        <span className="eyebrow">طلبك يبدأ من هنا</span>
        <h2 id="request-title">{product.title}</h2>
        <p id="request-summary">{product.description}</p>
        <div className="availability"><Icon name="info" />السعر والتوفر يُؤكدان قبل التنفيذ</div>
        <form action={contact.whatsapp} onSubmit={event => { event.preventDefault(); window.location.assign(link); }}>
          <fieldset className="audience-field"><legend>نوع الطلب</legend><label><input type="radio" name="audience" checked={kind === 'individual'} onChange={() => setKind('individual')} /> فردي</label><label><input type="radio" name="audience" checked={kind === 'wholesale'} onChange={() => setKind('wholesale')} /> جملة / توزيع</label></fieldset>
          <label className="field">منطقة الحساب أو الدولة <span>اختياري</span><input value={region} onChange={event => setRegion(event.target.value)} maxLength={100} placeholder="مثال: السعودية أو أمريكا" autoComplete="country-name" /></label>
          <label className="field">تفاصيل طلبك <span>اختياري</span><textarea value={details} onChange={event => setDetails(event.target.value)} maxLength={1200} rows="3" placeholder="الفئة، الكمية، مدة الاشتراك أو رابط المنتج" /></label>
          <p className="form-note">اكتب التفاصيل المتاحة وسنساعدك في الباقي. لا ترسل كلمة المرور أو رموز التحقق.</p>
          <button className="button primary full" type="submit"><Icon name="message" /> جهّز الطلب على واتساب</button>
          <p className="form-note centered">يفتح واتساب برسالة جاهزة؛ ترسلها بنفسك.</p>
        </form>
      </div>
    </div>
  </dialog>;
}
