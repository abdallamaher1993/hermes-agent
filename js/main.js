/* ═══════════════════════════════════════════════════════
   عبدالله ماهر — JS رئيسي
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── بيانات المشاريع ── */
  const PROJECTS = [
    {
      img:    './img/menes.jpg',
      cat:    'Flagship · Full Episode',
      name:   'الأنمي الفرعوني — مِنِس موحّد الأرضين',
      desc:   'ملحمة أنمي بالذكاء الاصطناعي تعيد تخيّل مصر القديمة مشهدًا بمشهد — من السيناريو حتى النشر، بشخصيات ثابتة بثبات أسلوبي مضمّن.',
      link:   'https://www.youtube.com/watch?v=0m9sP3wAxGw',
      linkLabel: 'شاهد الحلقة'
    },
    {
      img:    './img/titanic.jpg',
      cat:    'Historical POV Documentary',
      name:   'تيتانيك — أعين الراوي',
      desc:   'وثائقي سينمائي بمنظور شاهد عاش الحدث: 11:40 مساءً على تيتانيك، الباب ما زال مفتوحًا — كل مشهد بتقنيات احتفاظ بالمشاهد حادة.',
      link:   'https://www.youtube.com/watch?v=4Qk1GZS9YdU',
      linkLabel: 'شاهد الفيلم'
    },
    {
      img:    './img/chernobyl.jpg',
      cat:    'Historical POV',
      name:   'تشيرنوبيل — مناوبة ليلة 25 أبريل',
      desc:   'فيلم وثائقي 3:53 بمعايير بث احترافية (-13.5 LUFS / -1.0 dBTP) — من المفاعل حتى الكارثة بمنظور راوي عاش الليلة.',
      link:   'https://www.youtube.com/watch?v=iAp6u-50q3s',
      linkLabel: 'شاهد الفيلم'
    },
    {
      img:    './img/dawn.jpg',
      cat:    'Pharaonic Series',
      name:   'فجر الحضارة — نهر النيل',
      desc:   'سلسلة أنمي فرعونية تروي قصص الحضارة المصرية القديمة بأحدث تقنيات توليد الفيديو بالذكاء الاصطناعي.',
      link:   'https://www.youtube.com/watch?v=EBdsozeCMXs',
      linkLabel: 'شاهد الحلقة'
    },
    {
      img:    './img/minecraft.jpg',
      cat:    'Narrative Film',
      name:   'أفلام مينكرافت السردية',
      desc:   'بناء عالم سينمائي قصصي بمحتوى Minecraft مع تعليق صوتي وكاميرا سينمائية وهيكل hook-first مضبوط لوقت المشاهدة.',
      link:   'https://www.youtube.com/@abdallamaher_1',
      linkLabel: 'زُر القناة'
    },
    {
      img:    './img/thoth.jpg',
      cat:    'Neon Anime',
      name:   'عمارة تُوث المفقودة — أنيمي نيون',
      desc:   'كشف معماري فرعوني بأنيمي نيون سينمائي — تصميمات تختفي وحقائق تظهر عبر أحدث أدوات توليد الصور والفيديو.',
      link:   'https://www.youtube.com/watch?v=5nK-F3Frp_s',
      linkLabel: 'شاهد الفيلم'
    }
  ];

  /* ── توليد بطاقات المشاريع ── */
  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = PROJECTS.map(p => `
      <article class="project-card">
        <img class="project-thumb" src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.style.background='var(--grey-l)';this.alt='صورة غير متاحة'">
        <div class="project-body">
          <span class="project-cat">${p.cat}</span>
          <h3 class="project-name">${p.name}</h3>
          <p class="project-desc">${p.desc}</p>
          <a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel} <span aria-hidden="true">←</span></a>
        </div>
      </article>
    `).join('');
  }

  /* ── قائمة الجوال ── */
  function setupNav() {
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    // إغلاق عند النقر على رابط
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── زر العودة للأعلى ── */
  function setupBackTop() {
    const btn = document.getElementById('backTop');
    if (!btn) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        btn.classList.toggle('visible', window.scrollY > 600);
        ticking = false;
      });
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── سنة التذييل ── */
  function setFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── نموذج التواصل (FormSubmit) ── */
  function setupContactForm() {
    const form   = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const btn    = document.getElementById('formSubmit');
    if (!form || !status || !btn) return;

    function showStatus(msg, type) {
      status.textContent = msg;
      status.className = 'form-status ' + type;
    }

    function clearErrors() {
      form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
      form.querySelectorAll('.field-error').forEach(el => el.remove());
    }

    function addError(field, msg) {
      field.classList.add('invalid');
      const span = document.createElement('span');
      span.className = 'field-error';
      span.textContent = msg;
      field.parentNode.appendChild(span);
    }

    function validate() {
      clearErrors();
      let ok = true;
      const name    = form.querySelector('#fname');
      const email   = form.querySelector('#femail');
      const subject = form.querySelector('#fsubject');
      const message = form.querySelector('#fmessage');

      if (!name.value.trim())    { addError(name,    'الاسم مطلوب');           ok = false; }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
                               { addError(email,   'بريد غير صالح');         ok = false; }
      if (!subject.value.trim()) { addError(subject, 'الموضوع مطلوب');         ok = false; }
      if (!message.value.trim()) { addError(message, 'الرسالة مطلوبة');         ok = false; }
      return ok;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate()) return;

      btn.disabled = true;
      btn.textContent = 'جارٍ الإرسال...';
      showStatus('', '');

      try {
        const res = await fetch('https://formsubmit.co/ajax/abdalla2.1993@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showStatus('✓ تم إرسال رسالتك بنجاح! سأردّ خلال 24 ساعة.', 'success');
          form.reset();
        } else {
          showStatus('لم ينجح الإرسال. جرّب مرة أخرى أو راسلني مباشرة على abdalla2.1993@gmail.com', 'error');
        }
      } catch {
        showStatus('خطأ في الاتصال. تحقق من شبكتك وحاول مرة أخرى.', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = 'أرسل الرسالة';
      }
    });
  }

  /* ── إطلاق ── */
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    setupNav();
    setupBackTop();
    setFooterYear();
    setupContactForm();
  });

})();
