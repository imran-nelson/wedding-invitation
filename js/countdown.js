/* Countdown to the Nikah */
(window.WI = window.WI || { m: [] }).m.push(function (WI) {
  var target = new Date(WI.C.date.nikahISO).getTime();
  var nodes = {}; WI.$$('[data-unit]').forEach(function (n) { nodes[n.dataset.unit] = n; });
  var done = WI.$('#countdown-done'), grid = WI.$('#countdown'), t;
  var pad = function (n) { return String(n).padStart(2, '0'); };
  function tick() {
    var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    nodes.days.textContent = pad(Math.floor(s / 86400));
    nodes.hours.textContent = pad(Math.floor(s % 86400 / 3600));
    nodes.minutes.textContent = pad(Math.floor(s % 3600 / 60));
    nodes.seconds.textContent = pad(s % 60);
    if (s === 0) { clearInterval(t); grid.hidden = true; done.hidden = false; }
  }
  tick(); t = setInterval(tick, 1000);
});
