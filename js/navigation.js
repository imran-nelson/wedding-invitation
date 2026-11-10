/* Responsive nav, scroll-spy, back-to-top */
(window.WI = window.WI || { m: [] }).m.push(function (WI) {
  var toggle = WI.$('#nav-toggle'), links = WI.$('#nav-links'), top = WI.$('#to-top');
  function setOpen(o) { toggle.setAttribute('aria-expanded', o); links.classList.toggle('open', o); }
  toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  var map = {}; WI.$$('a', links).forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      WI.$$('a', links).forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
      var a = map[e.target.id]; if (a) { a.classList.add('is-active'); a.setAttribute('aria-current', 'true'); }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });

  window.addEventListener('scroll', function () { top.classList.toggle('show', window.scrollY > 700); }, { passive: true });
  top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' }); });
});
