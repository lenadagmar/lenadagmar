const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
  });
});

const projectToggles = document.querySelectorAll('.project-toggle');
projectToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.project-card');
    if (!card) return;

    const isExpanded = card.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded', String(isExpanded));
  });
});
