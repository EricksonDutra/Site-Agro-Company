(() => {
  'use strict';

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const dropdown = document.querySelector('.nav-dropdown');
  const dropdownButton = document.querySelector('.nav-dropdown-trigger');
  const dropdownMenu = document.querySelector('.nav-dropdown-menu');
  const mobileMenu = window.matchMedia('(max-width: 1080px)');
  const desktopHover = window.matchMedia('(min-width: 1081px) and (hover: hover)');

  function setDropdown(open, restoreFocus = false) {
    if (!dropdown || !dropdownButton || !dropdownMenu) return;
    dropdownButton.setAttribute('aria-expanded', String(open));
    dropdown.classList.toggle('is-open', open);
    // A single state controls visual display and ARIA, including after Escape.
    dropdownMenu.style.display = open ? 'block' : 'none';
    if (restoreFocus) dropdownButton.focus();
  }

  function setMenu(open, restoreFocus = false) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
    if (!open) setDropdown(false);
    if (restoreFocus) toggle.focus();
  }

  setDropdown(false);

  toggle?.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  dropdownButton?.addEventListener('click', () => {
    setDropdown(dropdownButton.getAttribute('aria-expanded') !== 'true');
  });

  dropdownButton?.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    setDropdown(true);
    dropdownMenu?.querySelector('a')?.focus();
  });

  dropdown?.addEventListener('mouseenter', () => {
    if (desktopHover.matches) setDropdown(true);
  });

  dropdown?.addEventListener('mouseleave', () => {
    if (desktopHover.matches && !dropdown.contains(document.activeElement)) {
      setDropdown(false);
    }
  });

  dropdown?.addEventListener('focusout', event => {
    if (!dropdown.contains(event.relatedTarget)) setDropdown(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (dropdownButton?.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setDropdown(false, dropdown?.contains(document.activeElement));
      return;
    }
    if (mobileMenu.matches && toggle?.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setMenu(false, true);
    }
  });

  document.addEventListener('click', event => {
    const target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    if (!target.closest('.site-header')) setMenu(false);
    if (!target.closest('.nav-dropdown')) setDropdown(false);
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });

  mobileMenu.addEventListener('change', () => setMenu(false));

  const fieldLabels = Object.freeze({
    Nome: 'Nome',
    WhatsApp: 'Telefone / WhatsApp',
    Email: 'E-mail',
    Cidade: 'Cidade / Estado',
    Perfil: 'Perfil',
    Servico: 'Serviço de interesse',
    Mensagem: 'Mensagem',
    Empresa: 'Empresa',
    Area: 'Área de atuação'
  });

  function prepareWhatsAppMessage(kind, entries) {
    const lines = [
      kind === 'parceiro'
        ? 'Olá, Agro Company! Gostaria de me cadastrar como parceiro.'
        : 'Olá, Agro Company! Gostaria de iniciar um atendimento.',
      ''
    ];
    for (const [name, rawValue] of entries) {
      if (!name) continue;
      const value = String(rawValue).trim();
      lines.push(`${fieldLabels[name] || name}: ${value || 'Não informado'}`);
    }
    return lines.join('\n');
  }

  // The pure formatter is also usable by the package's offline verification.
  window.AgroCompanySite = Object.freeze({ prepareWhatsAppMessage });

  document.querySelectorAll('form.aci-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const message = prepareWhatsAppMessage(form.dataset.kind, new FormData(form).entries());
      const url = 'https://wa.me/5567998214438?text=' + encodeURIComponent(message);
      const feedback = form.querySelector('.form-feedback');

      // This only opens a prepared conversation. The visitor confirms sending
      // inside WhatsApp; no message is sent or stored by this website.
      try {
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch (_error) {
        // The ordinary link below remains available if popups are blocked.
      }

      if (feedback) {
        const explanation = document.createElement('span');
        explanation.textContent = 'Mensagem preparada. Revise e confirme o envio no WhatsApp. Se a conversa não abrir, use o link abaixo.';
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Abrir mensagem no WhatsApp';
        feedback.replaceChildren(explanation, document.createElement('br'), link);
        feedback.hidden = false;
      }
    });
  });
})();
