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
const motionEnabledRoutes = new Set(['/', '/services/']);
const currentMotionPath = window.location.pathname.endsWith('/')
  ? window.location.pathname
  : `${window.location.pathname}/`;

if (!prefersReducedMotion && motionEnabledRoutes.has(currentMotionPath)) {
  const revealItems = [...document.querySelectorAll('[data-reveal], [data-reveal-group] > *')];

  if (revealItems.length) {
    document.documentElement.classList.add('motion-ready');

    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
      [...group.children].forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 50}ms`);
      });
    });

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
