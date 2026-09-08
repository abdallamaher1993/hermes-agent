/* ============================================================
   project.js — Renders the project detail page from ?id=
   ============================================================ */
(function () {
  'use strict';

  /* Extract id from URL, e.g. project.html?id=titanic-1912 */
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var project = getProject(id);

  var tagEl = document.getElementById('projTag');
  var titleEl = document.getElementById('projTitle');
  var metaEl = document.getElementById('projMeta');
  var frameEl = document.getElementById('projVideo');
  var storyEl = document.getElementById('projStory');
  var watchEl = document.getElementById('projWatch');
  var relatedGrid = document.getElementById('relatedGrid');

  if (!project) {
    // No id or unknown id -> fall back to home
    window.location.replace('index.html');
    return;
  }

  function t(key) {
    var lang = document.documentElement.getAttribute('lang') || 'en';
    var strings = I18N[lang];
    return strings && strings[key] !== undefined ? strings[key] : (I18N.en[key] || key);
  }

  /* Fill static fields */
  document.title = t(project.titleKey) + ' — Abdalla Maher';
  tagEl.textContent = t(project.tagKey);
  titleEl.textContent = t(project.titleKey);

  metaEl.innerHTML =
    '<span>▸ ' + t('project_year') + ': ' + project.year + '</span>' +
    '<span>▸ ' + project.platform + '</span>';

  frameEl.src = 'https://www.youtube-nocookie.com/embed/' + project.videoId + '?rel=0&modestbranding=1';
  frameEl.setAttribute('title', t(project.titleKey));

  storyEl.textContent = t(project.storyKey);

  watchEl.href = 'https://www.youtube.com/watch?v=' + project.videoId;
  watchEl.setAttribute('aria-label', 'Watch on YouTube');

  /* Related projects: 3 others (deterministic, wrap around) */
  var others = PROJECTS.filter(function (p) { return p.id !== project.id; });
  var picked = [];
  for (var i = 0; i < 3 && i < others.length; i++) {
    picked.push(others[(i * 2 + 1) % others.length]);
  }
  relatedGrid.innerHTML = picked.map(function (p) {
    return '<a class="related-item" href="project.html?id=' + p.id + '">' +
      '<p style="font-family:var(--f-mono);font-size:11px;color:var(--c-accent-on-dark);text-transform:uppercase;letter-spacing:.1em;">' + t(p.tagKey) + '</p>' +
      '<h4>' + t(p.titleKey) + '</h4>' +
      '<p>' + t(p.descKey) + '</p></a>';
  }).join('');

  /* Re-apply language after i18n fills data-i18n spans */
  if (window.I18N) { document.documentElement.setAttribute('lang', document.documentElement.getAttribute('lang') || 'en'); }

  var i18nEls = document.querySelectorAll('[data-i18n]');
  var langBtns = document.querySelectorAll('.lang-btn');
  function rerenderDynamic() {
    tagEl.textContent = t(project.tagKey);
    titleEl.textContent = t(project.titleKey);
    document.title = t(project.titleKey) + ' — Abdalla Maher';
    metaEl.innerHTML =
      '<span>▸ ' + t('project_year') + ': ' + project.year + '</span>' +
      '<span>▸ ' + project.platform + '</span>';
    storyEl.textContent = t(project.storyKey);
    frameEl.setAttribute('title', t(project.titleKey));
    relatedGrid.innerHTML = others.map(function (p) {
      return '<a class="related-item" href="project.html?id=' + p.id + '">' +
        '<p style="font-family:var(--f-mono);font-size:11px;color:var(--c-accent-on-dark);text-transform:uppercase;letter-spacing:.1em;">' + t(p.tagKey) + '</p>' +
        '<h4>' + t(p.titleKey) + '</h4>' +
        '<p>' + t(p.descKey) + '</p></a>';
    }).join('');
  }
  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      // Let main.js handle data-i18n elements via its own listener, then
      // re-render the dynamic (non-data-i18n) fields using the new lang.
      requestAnimationFrame(function () { rerenderDynamic(); });
    });
  });
})();
