/* Opening-card reveal + scroll-triggered fade/slide (respects reduced motion) */
(window.WI = window.WI || { m: [] }).m.push(function (WI) {
  var opening = WI.$('#opening'), btn = WI.$('#open-btn');
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  btn.focus({ preventScroll: true });

  btn.addEventListener('click', function () {
    opening.classList.add('is-open');
    document.body.classList.remove('is-locked');
    window.scrollTo(0, 0);
    setTimeout(function () { opening.hidden = true; var h = WI.$('#invitation'); h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }, reduce ? 0 : 650);
  });

  var els = WI.$$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function (e) { io.observe(e); });
});
