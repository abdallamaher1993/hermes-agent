/* ============================================================
   yt.js — Auto-fetch latest videos from the channel.

   Two data sources, in priority order:
   1) If a browser YT_API_KEY is set, fetch live from the
      YouTube Data API v3 (playlistItems -> videos stats).
   2) Otherwise use the pre-baked snapshot in latest-videos.js
      (generated server-side from the same API), so the section
      always shows real channel data without exposing credentials.

   The strip is injected ABOVE the curated project grid, never
   replacing the hand-picked projects.
   ============================================================ */
(function () {
  'use strict';

  var PLAYLIST_ID = 'UUkMLbf6BLoqapmfbDECYVtQ';

  function init() {
    var grid = document.getElementById('workGrid');
    if (!grid) { return; }

    var key = window.YT_API_KEY;
    if (key) {
      fetchLive(grid, key);
    } else {
      var baked = window.LATEST_VIDEOS;
      if (baked && baked.length) { renderLatest(grid, baked.slice(0, 6)); }
      else { console.warn('[yt.js] No data source available.'); }
    }
  }

  function fetchLive(grid, key) {
    var url = 'https://www.googleapis.com/youtube/v3/playlistItems' +
      '?part=snippet,contentDetails&playlistId=' + PLAYLIST_ID +
      '&maxResults=12&key=' + key;
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      var items = (data.items || []).map(function (i) {
        return {
          id: i.contentDetails.videoId,
          title: i.snippet.title,
          thumb: (i.snippet.thumbnails.medium || i.snippet.thumbnails.default || {}).url
        };
      });
      if (items.length) { renderLatest(grid, items.slice(0, 6)); }
    }).catch(function (err) { console.warn('[yt.js] live fetch failed:', err); });
  }

  function renderLatest(grid, items) {
    // Avoid double-injection if init() runs more than once.
    if (document.querySelector('.latest-strip')) { return; }
    var wrap = document.createElement('div');
    wrap.className = 'latest-strip';
    var head = document.createElement('div');
    head.className = 'section-header';
    head.innerHTML = '<span class="section-num">↳</span><h2 class="section-title"></h2>';
    head.querySelector('.section-title').textContent = I18N.current('latest_videos');
    wrap.appendChild(head);
    var row = document.createElement('div');
    row.className = 'latest-row';
    items.forEach(function (v) {
      var a = document.createElement('a');
      a.href = 'https://www.youtube.com/watch?v=' + v.id;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'latest-card';
      var img = document.createElement('img');
      img.src = v.thumb; img.alt = ''; img.loading = 'lazy';
      var t = document.createElement('p');
      t.className = 'latest-title';
      t.textContent = v.title;
      a.appendChild(img); a.appendChild(t);
      row.appendChild(a);
    });
    wrap.appendChild(row);
    grid.parentNode.insertBefore(wrap, grid);

    // Re-translate the heading when the language changes.
    var titleEl = head.querySelector('.section-title');
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        requestAnimationFrame(function () { titleEl.textContent = I18N.current('latest_videos'); });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
