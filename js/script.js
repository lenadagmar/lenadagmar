// =========================================================
// Project popup with photo carousel.
// Opens on card click; closes on backdrop click, the × button, or Escape.
// =========================================================
const modal = document.querySelector('.project-modal');

if (modal) {
  const photo = modal.querySelector('.modal-photo');
  const title = modal.querySelector('#modal-title');
  const body = modal.querySelector('.modal-body');
  const dots = modal.querySelector('.modal-dots');
  const prev = modal.querySelector('.modal-prev');
  const next = modal.querySelector('.modal-next');
  const closeBtn = modal.querySelector('.modal-close');

  let images = [];
  let index = 0;

  const show = (i) => {
    index = (i + images.length) % images.length;
    photo.src = images[index].src;
    photo.alt = images[index].alt;
    dots.querySelectorAll('button').forEach((dot, n) => {
      dot.setAttribute('aria-selected', String(n === index));
    });
  };

  const open = (card) => {
    images = [...card.querySelectorAll('.project-gallery img')].map((img) => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || '',
    }));

    // Fall back to the thumbnail if a card has no gallery images
    if (images.length === 0) {
      const thumb = card.querySelector('.project-image img');
      images = [{ src: thumb.getAttribute('src'), alt: '' }];
    }

    title.textContent = card.querySelector('h3').textContent;
    const details = card.querySelector('.project-details');
    body.innerHTML = details ? details.innerHTML : '';

    const multiple = images.length > 1;
    prev.hidden = !multiple;
    next.hidden = !multiple;

    dots.innerHTML = '';
    if (multiple) {
      images.forEach((_, n) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Photo ${n + 1} of ${images.length}`);
        dot.addEventListener('click', () => show(n));
        dots.appendChild(dot);
      });
    }

    show(0);
    modal.showModal();
    document.body.style.overflow = 'hidden';
  };

  document.querySelectorAll('.project-card').forEach((card) => {
    card.querySelector('.project-open').addEventListener('click', () => open(card));
  });

  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  closeBtn.addEventListener('click', () => modal.close());

  // Restore page scrolling however the popup gets closed (incl. Escape)
  modal.addEventListener('close', () => {
    document.body.style.overflow = '';
  });

  // The dialog has no padding, so a click landing on the <dialog> itself
  // is a click on the backdrop, outside the popup.
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  // Arrow keys switch photos
  modal.addEventListener('keydown', (e) => {
    if (images.length < 2) return;
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe on touch screens
  let startX = null;
  photo.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  photo.addEventListener('touchend', (e) => {
    if (startX === null || images.length < 2) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
}

