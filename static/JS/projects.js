// Simple tag filter for the projects grid
(function () {
  const grid = document.getElementById('projectGrid');
  const buttons = document.querySelectorAll('#filters button');

  if (!grid || !buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active state
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards by data-tags
      const tag = btn.dataset.filter;
      [...grid.children].forEach((card) => {
        const tags = (card.dataset.tags || '').toLowerCase();
        const show = tag === 'all' || tags.includes(tag);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // Prevent Enter in the search bar from submitting/reloading
  const searchForm = document.querySelector('#searchbar form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => e.preventDefault());
  }
})();

// =============== Project Details Modal ===============
(() => {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const dialog   = modal.querySelector('.proj-modal__dialog');
  const closeBtn = modal.querySelector('.proj-modal__close');
  const titleEl  = document.getElementById('proj-modal-title');
  const subEl    = document.getElementById('proj-modal-sub');
  const badgesEl = document.getElementById('proj-modal-badges');
  const descEl   = document.getElementById('proj-modal-desc');
  const linksEl  = document.getElementById('proj-modal-links');
  const thumbEl  = modal.querySelector('.proj-modal__thumb');

  let lastFocused = null;

  // Open the modal from a given card
  function openFromCard(card) {
    // Title & subtitle
    const title = (card.querySelector('h3')?.textContent || '').trim();
    const sub   = (card.getAttribute('data-sub') || '').trim();

    titleEl.textContent = title || 'Project';
    subEl.textContent   = sub;

    // Thumbnail
    const thumb = card.querySelector('.thumb');
    if (thumb) {
      thumbEl.src = thumb.currentSrc || thumb.src || '';
      thumbEl.alt = thumb.alt || '';
    } else {
      thumbEl.removeAttribute('src');
      thumbEl.alt = '';
    }

    // Badges
    badgesEl.innerHTML = '';
    card.querySelectorAll('.badges .badge').forEach(b => {
      const tag = document.createElement('span');
      tag.className = 'badge';
      tag.textContent = b.textContent.trim();
      badgesEl.appendChild(tag);
    });

    // Long description (hidden block inside card)
    const long = card.querySelector('.details-content');
 descEl.innerHTML = (long?.innerHTML || '').trim() || 'More details coming soon.';

    // Links: prefer optional `.details-links`, else fall back to the primary action in `.links`
    linksEl.innerHTML = '';
    const extraLinks = card.querySelectorAll('.details-links a');
    if (extraLinks.length) {
      extraLinks.forEach(a => {
        const link = document.createElement('a');
        link.href = a.href;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = a.textContent || 'Link';
        linksEl.appendChild(link);
      });
    } else {
      const primary = card.querySelector('.links .btn:not(.ghost)');
      if (primary) {
        const link = document.createElement('a');
        link.href = primary.href;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = primary.textContent || 'Open';
        linksEl.appendChild(link);
      }
    }

    // Show + lock scroll
    lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  // Click handlers: open via .details-btn, close via backdrop/×
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.details-btn');
    if (btn) {
      e.preventDefault();
      const card = btn.closest('.card');
      if (card) openFromCard(card);
      return;
    }

    if (e.target.matches('[data-close]')) {
      e.preventDefault();
      closeModal();
    }
  });

  // Keyboard: Esc to close, basic focus trap
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      // simple focus trap inside dialog
      const focusables = dialog.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last  = focusables[focusables.length - 1];

      // Shift+Tab on first -> go to last
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      // Tab on last -> go to first
      else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
