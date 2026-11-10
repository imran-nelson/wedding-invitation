/* Gallery module (inactive when moments section is removed) */
(window.WI = window.WI || { m: [] }).m.push(function (WI) {
  var items = WI.C.gallery, grid = WI.$('#gallery-grid'), lb = WI.$('#lightbox');
  if (!items || !grid || !lb) return;
  var stage = WI.$('.lb-stage', lb), cap = WI.$('figcaption', lb), idx = 0, opener = null;

  grid.innerHTML = items.map(function (it, i) {
    return '<button class="shot reveal" type="button" data-i="' + i + '" aria-label="Open photo ' + (i + 1) + '"><div class="photo"></div></button>';
  }).join('');
  WI.$$('.shot .photo', grid).forEach(function (box, i) { WI.setPhoto(box, items[i].src, items[i].alt, '✦'); });

  function show(i) {
    idx = (i + items.length) % items.length;
    stage.innerHTML = '';
    var box = document.createElement('div'); box.className = 'photo'; stage.appendChild(box);
    WI.setPhoto(box, items[idx].src, items[idx].alt, '✦');
    var probe = new Image(); probe.onload = function () { box.replaceWith(probe); }; probe.alt = items[idx].alt; probe.src = items[idx].src;
    cap.textContent = items[idx].caption || '';
  }
  function open(i, from) { opener = from; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; WI.$('.lb-close', lb).focus(); }
  function close() { lb.hidden = true; document.body.style.overflow = ''; if (opener) opener.focus(); }

  grid.addEventListener('click', function (e) { var b = e.target.closest('.shot'); if (b) open(+b.dataset.i, b); });
  WI.$('.lb-close', lb).addEventListener('click', close);
  WI.$('.lb-prev', lb).addEventListener('click', function () { show(idx - 1); });
  WI.$('.lb-next', lb).addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab') { /* keep focus inside dialog */
      var f = WI.$$('button', lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null;
  });
});
