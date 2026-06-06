document.addEventListener('DOMContentLoaded', () => {
  const skillButtons = document.querySelectorAll('.skill-toggle');
  skillButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.target);
      const skillCard = button.closest('.skill-item');
      const isOpen = target.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      if (skillCard) {
        skillCard.classList.toggle('open', isOpen);
      }

      skillButtons.forEach((otherButton) => {
        const otherTarget = document.getElementById(otherButton.dataset.target);
        const otherCard = otherButton.closest('.skill-item');
        if (otherButton !== button) {
          otherTarget.classList.remove('open');
          otherButton.setAttribute('aria-expanded', 'false');
          if (otherCard) {
            otherCard.classList.remove('open');
          }
        }
      });
    });
  });

  const yearButton = document.getElementById('sortYearBtn');
  const educationTable = document.getElementById('educationTable');
  const tbody = educationTable.querySelector('tbody');
  let ascending = true;

  yearButton.addEventListener('click', () => {
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      const firstYear = parseInt(a.dataset.year, 10) || 0;
      const secondYear = parseInt(b.dataset.year, 10) || 0;
      return ascending ? firstYear - secondYear : secondYear - firstYear;
    });

    rows.forEach((row) => tbody.appendChild(row));
    ascending = !ascending;
    yearButton.textContent = `Sort by Year ${ascending ? '▲' : '▼'}`;
  });

  document.querySelectorAll('.read-more-btn').forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const card = button.closest('.hobby-card');
      const text = card ? card.querySelector('.hobby-text') : null;
      if (!text) return;
      const isExpanded = text.classList.toggle('expanded');
      button.textContent = isExpanded ? 'Read Less' : 'Read More';
      button.setAttribute('aria-expanded', String(isExpanded));
    });
  });

  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeLightbox = document.getElementById('closeLightbox');

  document.querySelectorAll('.gallery-image').forEach((image) => {
    image.addEventListener('click', () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxOverlay.classList.add('show');
      lightboxOverlay.setAttribute('aria-hidden', 'false');
    });
  });

  const closeOverlay = () => {
    lightboxOverlay.classList.remove('show');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
  };

  closeLightbox.addEventListener('click', closeOverlay);
  lightboxOverlay.addEventListener('click', (event) => {
    if (event.target === lightboxOverlay) {
      closeOverlay();
    }
  });

  const themeToggle = document.getElementById('themeToggle');
  const applyTheme = (darkMode) => {
    document.body.classList.toggle('dark-mode', darkMode);
    themeToggle.textContent = darkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('profile2-theme', darkMode ? 'dark' : 'light');
  };

  const savedTheme = localStorage.getItem('profile2-theme');
  applyTheme(savedTheme === 'dark');

  themeToggle.addEventListener('click', () => {
    applyTheme(!document.body.classList.contains('dark-mode'));
  });

  const scrollTopButton = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    scrollTopButton.classList.toggle('show', window.scrollY > 200);
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
