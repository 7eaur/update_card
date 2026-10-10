/* Approved first-session brand reveal; original UPDATE CARD raster is not redrawn. */
export const renderLogoIntro = () => `
  <div class="brand-intro" data-brand-intro aria-hidden="true">
    <div class="brand-intro__mark">
      <img class="brand-intro__layer brand-intro__layer--symbol" src="/assets/brand/logo-horizontal-640.webp" width="640" height="274" alt="" decoding="async">
      <img class="brand-intro__layer brand-intro__layer--wordmark" src="/assets/brand/logo-horizontal-640.webp" width="640" height="274" alt="" decoding="async">
      <img class="brand-intro__layer brand-intro__layer--finished" src="/assets/brand/logo-horizontal-640.webp" width="640" height="274" alt="" decoding="async">
      <span class="brand-intro__line"></span>
      <span class="brand-intro__loader" aria-hidden="true"></span>
    </div>
  </div>`;

/** Non-blocking network feedback for native, same-origin multi-page navigation. */
export const renderNavigationStatus = () => `
  <div class="navigation-status" data-navigation-status role="status" aria-live="polite" aria-atomic="true">
    <img class="navigation-status__logo" src="/assets/brand/logo-horizontal-320.webp" width="320" height="137" alt="" decoding="async">
    <span class="navigation-status__spinner" aria-hidden="true"></span>
    <span class="navigation-status__label" data-navigation-message>جاري فتح الصفحة…</span>
    <button class="navigation-status__dismiss" type="button" data-navigation-dismiss aria-label="إخفاء حالة الانتقال">إخفاء</button>
  </div>`;
