/* ============================================================
   main.js — Language switch, form, interactions, a11y
   ============================================================ */

(function () {
  'use strict';

  /* ---- Analytics-ready event layer (inert until GA4 is added) ---- */
  // To enable GA4: paste your gtag snippet before </head> in index.html.
  // The events below flow into dataLayer automatically once GA is present.
  function trackEvent(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
  }

  /* ---- Language Switcher ---- */
  const html = document.documentElement;
  const langBtns = document.querySelectorAll('.lang-btn');
  const i18nEls = document.querySelectorAll('[data-i18n]');
  const i18nAriaEls = document.querySelectorAll('[data-i18n-aria]');
  const storedLang = localStorage.getItem('lang');

  function currentLang() {
    var lang = html.getAttribute('lang');
    return I18N[lang] ? lang : 'en';
  }
  function t(key) {
    var strings = I18N[currentLang()] || I18N.en;
    return strings[key] !== undefined ? strings[key] : (I18N.en[key] || '');
  }

  function applyLang(lang) {
    if (!I18N[lang]) return;
    const strings = I18N[lang];

    i18nEls.forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) {
        el.textContent = strings[key];
      }
    });
    i18nAriaEls.forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      if (strings[key] !== undefined) {
        el.setAttribute('aria-label', strings[key]);
      }
    });

    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', lang);
    }

    langBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    localStorage.setItem('lang', lang);
    trackEvent('language_change', { language: lang });
  }

  if (storedLang && I18N[storedLang]) {
    applyLang(storedLang);
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(this.getAttribute('data-lang'));
    });
  });

  /* ---- Mobile Menu ---- */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Contact Form (FormSubmit.co AJAX, localized status) ---- */
  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var formData = new FormData(form);
      formStatus.textContent = t('form_sending');
      formStatus.className = 'form-status';
      if (submitBtn) submitBtn.disabled = true;
      trackEvent('contact_form_submit', {});

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            formStatus.textContent = t('form_success');
            formStatus.className = 'form-status success';
            form.reset();
          } else {
            return res.json().then(function (data) {
              throw new Error(data.error || 'error');
            });
          }
        })
        .catch(function () {
          formStatus.textContent = t('form_error');
          formStatus.className = 'form-status error';
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ---- Footer Year ---- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Smooth Scroll (respects reduced motion) ---- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        trackEvent('nav_click', { target: this.getAttribute('href') });
      }
    });
  });

  /* ---- Navbar Scroll State ---- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = window.pageYOffset > 100
        ? '0 1px 0 rgba(213,56,41,0.1)'
        : 'none';
    }, { passive: true });
  }

  /* ---- Scrollspy: mark active nav link ---- */
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  var spyTargets = [];
  navAnchors.forEach(function (a) {
    var sec = document.querySelector(a.getAttribute('href'));
    if (sec) spyTargets.push({ link: a, section: sec });
  });
  if ('IntersectionObserver' in window && spyTargets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          spyTargets.forEach(function (item) {
            var isActive = item.section === entry.target;
            item.link.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    spyTargets.forEach(function (item) { spy.observe(item.section); });
  }

  /* ---- Back to Top ---- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.pageYOffset > 600);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      trackEvent('back_to_top', {});
    });
  }

  /* ---- Track outbound links (social / projects) ---- */
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    a.addEventListener('click', function () {
      trackEvent('outbound_click', { url: this.getAttribute('href') });
    });
  });

  /* ---- Section fade-in (skipped for reduced motion) ---- */
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var sections = document.querySelectorAll('section');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(function (s) {
      s.style.opacity = '0';
      s.style.transform = 'translateY(24px)';
      s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(s);
    });
  }

})();
