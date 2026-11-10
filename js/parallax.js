/* Parallax: splash (pointer / device tilt / idle sway), invitation section (scroll), profile 3D tilt */
(window.WI = window.WI || { m: [] }).m.push(function (WI) {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var AMP = 30, clamp = function (v) { return Math.max(-1, Math.min(1, v)); };

  /* --- Splash --- */
  var op = WI.$('#opening'), layers = WI.$$('.px', op), card = WI.$('.invite-card', op);
  var tx = 0, ty = 0, x = 0, y = 0, live = false;
  function loop(now) {
    if (op.hidden) return;
    if (!live) { tx = Math.sin(now / 1700); ty = Math.cos(now / 2300) * .6; }  /* gentle idle sway */
    x += (tx - x) * .06; y += (ty - y) * .06;
    layers.forEach(function (l) {
      var d = +l.dataset.depth;
      l.style.setProperty('--px-x', (-x * d * AMP).toFixed(1) + 'px');
      l.style.setProperty('--px-y', (-y * d * AMP * .7).toFixed(1) + 'px');
    });
    card.style.setProperty('--cx', (x * 6).toFixed(1) + 'px'); card.style.setProperty('--cy', (y * 4).toFixed(1) + 'px');
    requestAnimationFrame(loop);
  }
  op.addEventListener('pointermove', function (e) { live = true; tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; });
  op.addEventListener('pointerleave', function () { live = false; });
  window.addEventListener('deviceorientation', function (e) {
    if (e.gamma == null || op.hidden) return; live = true; tx = clamp(e.gamma / 25); ty = clamp((e.beta - 45) / 25);
  });
  requestAnimationFrame(loop);

  /* --- Invitation section & cards: scroll parallax --- */
  var scenes = WI.$$('[data-px="scroll"]'), cards = WI.$$('.invite-card.reveal'), pending = false;
  function update() {
    pending = false; var vh = innerHeight;
    scenes.forEach(function (s) {
      var r = s.getBoundingClientRect(); if (r.bottom < -120 || r.top > vh + 120) return;
      var p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      WI.$$('.px', s).forEach(function (l) { l.style.setProperty('--px-y', (-p * l.dataset.depth * 55).toFixed(1) + 'px'); });
    });

    cards.forEach(function (c) {
      var r = c.getBoundingClientRect();
      if (r.bottom < -150 || r.top > vh + 150) return;
      var p = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2));
      var py = (-p * 38).toFixed(1);
      var rx = (p * 3.5).toFixed(2);
      var shadowY = (24 - Math.abs(p) * 10).toFixed(1);
      var shadowBlur = (50 - Math.abs(p) * 16).toFixed(1);
      var shadowAlpha = (0.32 - Math.abs(p) * 0.08).toFixed(2);

      c.style.setProperty('--card-py', py + 'px');
      c.style.setProperty('--card-rx', rx + 'deg');
      c.style.setProperty('--card-sy', shadowY + 'px');
      c.style.setProperty('--card-sb', shadowBlur + 'px');
      c.style.setProperty('--card-sa', shadowAlpha);

      var arch = WI.$('.arch', c);
      if (arch) {
        var archPy = (p * 18).toFixed(1);
        arch.style.setProperty('--arch-py', archPy + 'px');
      }
    });
  }
  function queue() { if (!pending) { pending = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', queue, { passive: true }); window.addEventListener('resize', queue); update();

  /* --- Profile portraits: 3D tilt on hover --- */
  WI.$$('.profile__frame').forEach(function (f) {
    var t = WI.$('.profile__tilt', f);
    f.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = f.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      t.style.transform = 'perspective(800px) rotateX(' + (-py * 12).toFixed(1) + 'deg) rotateY(' + (px * 14).toFixed(1) + 'deg)';
    });
    f.addEventListener('pointerleave', function () { t.style.transform = ''; });
  });
});
