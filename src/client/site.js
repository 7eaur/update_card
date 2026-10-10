const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
    mobileMenu.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('a') && window.innerWidth <= 900) {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
}

document.querySelectorAll('[data-current-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const backToTopButton = document.querySelector('[data-back-to-top]');
if (backToTopButton) {
  const updateBackToTopVisibility = () => {
    const isVisible = window.scrollY > 420;
    backToTopButton.classList.toggle('is-visible', isVisible);
    backToTopButton.setAttribute('aria-hidden', String(!isVisible));
    backToTopButton.tabIndex = isVisible ? 0 : -1;
  };

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  });

  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
  updateBackToTopVisibility();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const network = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const constrainedConnection =
  Boolean(network?.saveData) || ['slow-2g', '2g'].includes(network?.effectiveType);

if (!prefersReducedMotion && !constrainedConnection && 'IntersectionObserver' in window) {
  const singleRevealSelectors = [
    '[data-reveal]',
    '.page-hero__grid',
    '.service-hero__grid',
    '.content-section > .container',
    '.contact-cta',
    '.home-about__card',
    '.home-services__panel',
    '.home-custom__bar',
    '.home-closing__bar',
  ];

  const groupSelectors = [
    '[data-reveal-group]',
    '.home-services__grid',
    '.audience-split',
    '.process-timeline',
    '.services-directory',
    '.about-facts',
    '.about-principles__grid',
    '.about-audiences',
    '.about-official__grid',
    '.contact-grid',
    '.contact-meta',
    '.faq-page-list',
    '.example-grid',
    '.service-process',
    '.related-links',
  ];

  const singleItems = new Set();
  singleRevealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((item) => {
      item.setAttribute('data-reveal', item.getAttribute('data-reveal') || 'section');
      singleItems.add(item);
    });
  });

  const groupItems = new Set();
  groupSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((group) => {
      [...group.children].forEach((item, index) => {
        if (singleItems.has(item)) return;
        item.setAttribute('data-reveal-item', '');
        item.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 50}ms`);
        groupItems.add(item);
      });
    });
  });

  const revealItems = [...singleItems, ...groupItems];
  if (revealItems.length) {
    document.documentElement.classList.add('motion-ready');

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          currentObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      },
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}

/* Entry motion is optional and starts only if the canonical logo decodes promptly.
 * The page is already usable underneath; never wait for the logo or for other images.
 */
const brandIntro = document.querySelector('[data-brand-intro]');
if (brandIntro) {
  const eligible = document.documentElement.dataset.brandIntroEligible === 'true';
  const queuedAt = Number(document.documentElement.dataset.brandIntroQueuedAt || 0);
  delete document.documentElement.dataset.brandIntroEligible;
  delete document.documentElement.dataset.brandIntroQueuedAt;

  if (!eligible) {
    document.documentElement.classList.remove('brand-intro-pending');
    brandIntro.remove();
  } else {
    const exitEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'];
    let disposed = false;
    let interacted = false;
    let timeout;

    const disposeIntro = () => {
      if (disposed) return;
      disposed = true;
      window.clearTimeout(timeout);
      document.documentElement.classList.remove('brand-intro-pending', 'brand-intro-active');
      brandIntro.removeEventListener('animationend', onIntroAnimationEnd);
      exitEvents.forEach((type) => window.removeEventListener(type, onIntroInteraction, true));
      window.removeEventListener('pagehide', disposeIntro);
      brandIntro.remove();
    };

    const onIntroAnimationEnd = (event) => {
      if (event.target === brandIntro && event.animationName === 'uc-intro-out') {
        disposeIntro();
      }
    };
    const onIntroInteraction = () => {
      interacted = true;
      disposeIntro();
    };

    exitEvents.forEach((type) => {
      window.addEventListener(type, onIntroInteraction, { capture: true, passive: true });
    });
    window.addEventListener('pagehide', disposeIntro, { once: true });
    brandIntro.addEventListener('animationend', onIntroAnimationEnd);

    const startIntro = async () => {
      const logo = brandIntro.querySelector('.brand-intro__layer--finished');
      if (!logo) { disposeIntro(); return; }
      // A missing/slow image must never leave an empty splash screen.
      const assetReady = typeof logo.decode === 'function'
        ? logo.decode().then(() => true, () => false)
        : new Promise((resolve) => {
            if (logo.complete) { resolve(Boolean(logo.naturalWidth)); return; }
            logo.addEventListener('load', () => resolve(true), { once: true });
            logo.addEventListener('error', () => resolve(false), { once: true });
          });

      const ready = await Promise.race([
        assetReady,
        new Promise((resolve) => window.setTimeout(() => resolve(false), 650)),
      ]);
      const queuedTooLong = queuedAt > 0 && performance.now() - queuedAt > 1400;
      if (!ready || disposed || interacted || document.hidden || queuedTooLong) {
        disposeIntro();
        return;
      }

      try { localStorage.setItem('update-card-intro-v2', 'seen'); } catch (_) {}
      document.documentElement.classList.remove('brand-intro-pending');
      document.documentElement.classList.add('brand-intro-active');
      // CSS cross-fades away, so the already-rendered page appears continuously.
      // Last-resort cleanup for browser interruptions or missing animationend.
      timeout = window.setTimeout(disposeIntro, 2100);
    };
    void startIntro();
  }
}

/* Only indicate a genuinely slow, native in-site navigation.
 * Never intercept the link or block scrolling, input, or the previous page.
 */
const navigationStatus = document.querySelector('[data-navigation-status]');
if (navigationStatus) {
  const message = navigationStatus.querySelector('[data-navigation-message]');
  const dismiss = navigationStatus.querySelector('[data-navigation-dismiss]');
  const DELAY_MS = 350;
  const SLOW_MS = 7000;
  let revealTimeout;
  let slowTimeout;
  let pending = false;

  const resetStatus = () => {
    window.clearTimeout(revealTimeout);
    window.clearTimeout(slowTimeout);
    pending = false;
    navigationStatus.classList.remove('is-visible');
    message.textContent = 'جاري فتح الصفحة…';
  };

  const showStatus = () => {
    if (!pending) return;
    message.textContent = navigator.onLine
      ? 'جاري فتح الصفحة…'
      : 'الاتصال غير متاح. يمكنك المحاولة مجددًا.';
    navigationStatus.classList.add('is-visible');
    slowTimeout = window.setTimeout(() => {
      if (!pending) return;
      message.textContent = navigator.onLine
        ? 'الاتصال بطيء. يمكنك مواصلة استخدام هذه الصفحة.'
        : 'الاتصال غير متاح. يمكنك المحاولة مجددًا.';
    }, SLOW_MS);
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download') || link.hasAttribute('data-no-loading')) return;
    if (link.target && link.target.toLowerCase() !== '_self') return;
    let next;
    try { next = new URL(link.href, location.href); } catch (_) { return; }
    if (next.origin !== location.origin || !['https:', 'http:'].includes(next.protocol)) return;
    if (next.pathname === location.pathname && next.search === location.search &&
        (next.hash || next.href === location.href)) return;

    resetStatus();
    pending = true;
    revealTimeout = window.setTimeout(showStatus, DELAY_MS);
    // Native browser navigation runs as normal, even if the request fails.
  });

  dismiss?.addEventListener('click', resetStatus);
  window.addEventListener('pagehide', resetStatus);
  window.addEventListener('pageshow', resetStatus); // bfcache/back navigation
  window.addEventListener('offline', () => {
    if (pending && navigationStatus.classList.contains('is-visible')) {
      message.textContent = 'الاتصال غير متاح. يمكنك المحاولة مجددًا.';
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && pending) resetStatus();
  });
}
