(() => {
  'use strict';

  const hero = document.querySelector('.home-hero[data-slideshow]');
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll('.home-hero-slide'));
  const controls = hero.querySelector('.home-hero-controls');
  const selectors = Array.from(hero.querySelectorAll('.hero-image-button[data-slide]'));
  const autoplayButton = hero.querySelector('.hero-autoplay-toggle');
  if (!slides.length) return;

  const configuredInterval = Number(hero.dataset.interval);
  const interval = Number.isFinite(configuredInterval) && configuredInterval >= 2000
    ? configuredInterval : 6000;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const states = slides.map(() => 'waiting');
  let pausedByUser = motionPreference.matches;
  let manualAutoplayChoice = false;
  let inViewport = true;
  let activeIndex = -1;
  let pendingSelection = -1;
  let timer = null;

  function clearTimer() {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
  }

  function syncControls() {
    selectors.forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.slide) === activeIndex));
    });
    if (autoplayButton) {
      autoplayButton.dataset.paused = String(pausedByUser);
      autoplayButton.setAttribute('aria-pressed', String(pausedByUser));
      autoplayButton.setAttribute('aria-label', pausedByUser
        ? 'Retomar troca automática de imagens'
        : 'Pausar troca automática de imagens');
    }
  }

  function showSlide(index) {
    if (states[index] !== 'ready') return false;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
    activeIndex = index;
    hero.dataset.activeSlide = String(index + 1);
    syncControls();
    return true;
  }

  function showNextAvailable() {
    const start = activeIndex >= 0 ? activeIndex : slides.length - 1;
    for (let offset = 1; offset <= slides.length; offset += 1) {
      const next = (start + offset) % slides.length;
      if (next !== activeIndex && showSlide(next)) return;
    }
    // Keep the current photograph when other assets are still loading or failed.
  }

  function scheduleNext() {
    clearTimer();
    if (slides.length < 2 || pausedByUser || document.hidden || !inViewport) return;
    timer = window.setTimeout(() => {
      timer = null;
      pendingSelection = -1;
      showNextAvailable();
      scheduleNext();
    }, interval);
  }

  function imageReady(index) {
    const image = slides[index];
    if (!image.complete || image.naturalWidth <= 0) return;
    states[index] = 'ready';
    if (activeIndex < 0 || pendingSelection === index) {
      pendingSelection = -1;
      showSlide(index);
      scheduleNext();
    }
  }

  function imageFailed(index) {
    states[index] = 'error';
    if (pendingSelection === index) pendingSelection = -1;
    if (activeIndex === index) {
      slides[index].classList.remove('is-active');
      activeIndex = -1;
      delete hero.dataset.activeSlide;
      showNextAvailable();
      syncControls();
    }
  }

  // Preserve the declared first photograph when it has already loaded.
  const initialIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
  slides.forEach((image, index) => {
    image.addEventListener('load', () => imageReady(index));
    image.addEventListener('error', () => imageFailed(index));
    if (image.complete) states[index] = image.naturalWidth > 0 ? 'ready' : 'error';
    image.classList.remove('is-active');
  });
  if (!showSlide(initialIndex)) showNextAvailable();
  if (activeIndex < 0) delete hero.dataset.activeSlide;

  selectors.forEach(button => {
    button.addEventListener('click', () => {
      const selected = Number(button.dataset.slide);
      if (!Number.isInteger(selected) || selected < 0 || selected >= slides.length) return;
      pendingSelection = -1;
      if (!showSlide(selected) && states[selected] !== 'error') {
        pendingSelection = selected;
        slides[selected].loading = 'eager';
        imageReady(selected);
      }
      scheduleNext();
    });
  });

  autoplayButton?.addEventListener('click', () => {
    manualAutoplayChoice = true;
    pausedByUser = !pausedByUser;
    syncControls();
    scheduleNext();
  });

  document.addEventListener('visibilitychange', scheduleNext);
  motionPreference.addEventListener('change', event => {
    if (!manualAutoplayChoice) pausedByUser = event.matches;
    syncControls();
    scheduleNext();
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const entry = entries.find(item => item.target === hero);
      if (!entry) return;
      inViewport = entry.isIntersecting;
      scheduleNext();
    }, { threshold: 0 });
    observer.observe(hero);
  }

  if (controls) controls.hidden = slides.length < 2;
  syncControls();
  scheduleNext();
})();
