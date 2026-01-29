document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  const openClass = 'open';
  const updateAria = () => {
    const expanded = menu.classList.contains(openClass);
    toggle.setAttribute('aria-expanded', String(expanded));
  };

  const openMenu = () => {
    menu.classList.add(openClass);
    updateAria();
  };
  const closeMenu = () => {
    menu.classList.remove(openClass);
    updateAria();
  };

  toggle.addEventListener('click', () => {
    if (menu.classList.contains(openClass)) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) closeMenu();
  });
});
