(() => {
  const root = document.documentElement;
  const themeColor = document.querySelector('#theme-color');
  let themeTimer;

  function applyTimeTheme() {
    const hour = new Date().getHours();
    const night = hour < 6 || hour >= 18;
    root.dataset.theme = night ? 'night' : 'day';
    if (themeColor) themeColor.content = night ? '#0A1020' : '#F6F7F9';

    clearTimeout(themeTimer);
    const now = new Date();
    const boundary = new Date(now);
    if (hour < 6) boundary.setHours(6, 0, 0, 0);
    else if (hour < 18) boundary.setHours(18, 0, 0, 0);
    else {
      boundary.setDate(boundary.getDate() + 1);
      boundary.setHours(6, 0, 0, 0);
    }
    themeTimer = window.setTimeout(applyTimeTheme, boundary - now + 250);
  }

  applyTimeTheme();

  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
      }
    });
  }

  const header = document.querySelector('[data-header]');
  const updateHeader = () => header?.classList.toggle('scrolled', scrollY > 8);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('visible'));
  } else {
    reveals.forEach((element) => element.classList.add('reveal-pending'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));
  }
})();
