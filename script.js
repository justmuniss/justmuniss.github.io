(() => {
  const body = document.body;
  const themeButton = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const topButton = document.querySelector('.back-top-float');

  if (localStorage.getItem('munisa-theme') === 'dark') body.classList.add('dark');
  function syncTheme() {
    const dark = body.classList.contains('dark');
    themeIcon.textContent = dark ? '☀' : '☾';
    themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#241c2c' : '#f7f2fb';
  }
  syncTheme();
  themeButton.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('munisa-theme', body.classList.contains('dark') ? 'dark' : 'light');
    syncTheme();
  });

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    navLinks.classList.toggle('open', !open);
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));
  window.addEventListener('resize', () => {
    if (innerWidth > 600) {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });

  const updateTop = () => topButton.classList.toggle('visible', scrollY > 420);
  window.addEventListener('scroll', updateTop, { passive: true });
  updateTop();
  topButton.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelector('#year').textContent = new Date().getFullYear();

  document.querySelector('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`A note from ${data.get('name')}`);
    const message = encodeURIComponent(`${data.get('message')}\n\nFrom: ${data.get('name')} (${data.get('email')})`);
    document.querySelector('#form-feedback').textContent = 'Your email app is opening with your note.';
    location.href = `mailto:hello@munisa.dev?subject=${subject}&body=${message}`;
  });
})();
