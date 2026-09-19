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

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
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
