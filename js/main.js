/* ============================================================
   main.js — Language switch, form, interactions
   ============================================================ */

(function () {
  'use strict';

  /* ---- Language Switcher ---- */
  const html = document.documentElement;
  const langBtns = document.querySelectorAll('.lang-btn');
  const i18nEls = document.querySelectorAll('[data-i18n]');
  const storedLang = localStorage.getItem('lang');

  function applyLang(lang) {
    if (!I18N[lang]) return;
    const strings = I18N[lang];

    // Update text content
    i18nEls.forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (strings[key] !== undefined) {
        el.textContent = strings[key];
      }
    });

    // Direction & lang attribute
    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', lang);
    }

    // Active button
    langBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    localStorage.setItem('lang', lang);
  }

  // Init language
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

  /* ---- Contact Form (FormSubmit.co AJAX) ---- */
  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(form);
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            formStatus.textContent = 'Message sent successfully.';
            formStatus.className = 'form-status success';
            form.reset();
          } else {
            return res.json().then(function (data) {
              throw new Error(data.error || 'Submission failed');
            });
          }
        })
        .catch(function (err) {
          formStatus.textContent = err.message || 'Something went wrong. Please try again.';
          formStatus.className = 'form-status error';
        });
    });
  }

  /* ---- Footer Year ---- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Navbar Scroll State ---- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var current = window.pageYOffset;
      if (current > 100) {
        navbar.style.boxShadow = '0 1px 0 ' + 'rgba(213,56,41,0.1)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      lastScroll = current;
    }, { passive: true });
  }

  /* ---- Intersection Observer for fade-in (staggered cards) ---- */
  if ('IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll('section, .project-card, .service-card, .skill-group');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.08 });

    revealTargets.forEach(function (s) {
      if (s.classList.contains('project-card') || s.classList.contains('service-card') || s.classList.contains('skill-group')) {
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      } else {
        s.style.opacity = '0';
        s.style.transform = 'translateY(24px)';
        s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
      observer.observe(s);
    });
  }

})();
