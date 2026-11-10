/* Core: renders config-driven content, then runs every registered module. Load LAST. */
(function () {
  'use strict';
  var WI = (window.WI = window.WI || { m: [] });
  var C = (WI.C = window.WEDDING_CONFIG);
  var $ = (WI.$ = function (s, r) { return (r || document).querySelector(s); });
  var $$ = (WI.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); });
  var get = function (o, p) { return p.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); };
  WI.esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); };
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function applyTheme() {
    Object.keys(C.theme || {}).forEach(function (k) { document.documentElement.style.setProperty('--' + k, C.theme[k]); });
  }

  function bindText() {
    $$('[data-cfg]').forEach(function (n) { var v = get(C, n.dataset.cfg); if (v != null) n.textContent = v; else n.hidden = true; });
  }

  function renderEvents() {
    var host = $('#events'); if (!host) return;
    host.innerHTML = C.events.map(function (e) {
      var d = e.date.split('-'), day = parseInt(d[2], 10), month = MONTHS[parseInt(d[1], 10) - 1] + ' ' + d[0];
      var slots = e.items.map(function (i) {
        return '<li class="slot"><span class="slot__name">' + WI.esc(i.name) + '</span><span class="slot__dots" aria-hidden="true"></span><span class="slot__time">' + WI.esc(i.time) + '</span></li>';
      }).join('');
      return '<article class="event reveal' + (e.highlight ? ' event--nikah' : '') + '" id="event-' + e.id + '">' +
        '<svg class="event__crest" aria-hidden="true"><use href="#i-arch"/></svg>' +
        '<p class="event__weekday">' + WI.esc(e.weekday) + '</p><p class="event__day">' + day + '</p><p class="event__month">' + WI.esc(month) + '</p>' +
        '<h3 class="event__title">' + WI.esc(e.title) + '</h3><ul class="slots">' + slots + '</ul>' +
        '<button class="btn btn--ghost btn--sm" type="button" data-cal="' + e.id + '"><svg class="icon" aria-hidden="true"><use href="#i-cal"/></svg>Add to calendar</button></article>';
    }).join('');
  }

  function renderVenue() {
    var v = C.venue, q = encodeURIComponent(v.mapQuery);
    $('#venue-address').innerHTML = v.addressLines.map(WI.esc).join('<br>');
    $('#venue-map').src = v.mapEmbedUrl || 'https://www.google.com/maps?q=' + q + '&output=embed';
    $('#directions-btn').href = v.directionsUrl || 'https://www.google.com/maps/dir/?api=1&destination=' + q;
  }

  function renderFamily() {
    $('#family-phones').innerHTML = C.family.phones.map(function (p) {
      return '<a class="btn btn--ghost btn--sm" href="tel:+91' + WI.esc(p) + '"><svg class="icon" aria-hidden="true"><use href="#i-phone"/></svg>' + WI.esc(p) + '</a>';
    }).join('');
  }

  function guestName() {
    var g = (new URLSearchParams(location.search).get('to') || '').trim().slice(0, 60);
    if (!g) return;
    WI.guest = g;
    var el = $('#guest-line'); el.textContent = 'Dear ' + g + ','; el.hidden = false;
  }

  function decorate() {
    $$('.invite-card').forEach(function (c) {
      c.insertAdjacentHTML('afterbegin', '<i class="corner tl" aria-hidden="true"></i><i class="corner tr" aria-hidden="true"></i><i class="corner bl" aria-hidden="true"></i><i class="corner br" aria-hidden="true"></i>');
    });
  }

  function start() {
    applyTheme(); bindText(); renderEvents(); renderVenue(); renderFamily(); guestName(); decorate();
    WI.m.forEach(function (fn) { try { fn(WI); } catch (e) { console.error(e); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
