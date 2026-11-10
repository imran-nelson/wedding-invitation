/* Calendar downloads (.ics) + Google Calendar link */
(window.WI = window.WI || { m: [] }).m.push(function (WI) {
  var C = WI.C, loc = C.venue.name + ', ' + C.venue.addressLines.join(' ').replace(/\s+/g, ' ');
  var utc = function (iso) { return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
  var esc = function (s) { return String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n'); };
  var fold = function (l) { return l.length > 74 ? l.match(/.{1,74}/g).join('\r\n ') : l; };
  var names = C.couple.groom.name + ' & ' + C.couple.bride.name;
  var desc = function (e) { return e.items.map(function (i) { return i.name + ': ' + i.time; }).join('\n'); };

  function ics(list) {
    var L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'CALSCALE:GREGORIAN'];
    list.forEach(function (e) {
      L.push('BEGIN:VEVENT', 'UID:' + e.id + '-' + utc(e.start) + '@wedding-invitation', 'DTSTAMP:' + utc(new Date().toISOString()),
        'DTSTART:' + utc(e.start), 'DTEND:' + utc(e.end), 'SUMMARY:' + esc(e.title + ' · ' + names),
        'LOCATION:' + esc(loc), 'DESCRIPTION:' + esc(desc(e)), 'END:VEVENT');
    });
    L.push('END:VCALENDAR'); return L.map(fold).join('\r\n');
  }
  function download(name, text) {
    var a = document.createElement('a'), url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-cal]'); if (!b) return;
    var id = b.dataset.cal;
    var list = id === 'all' ? C.events : C.events.filter(function (e) { return e.id === id; });
    if (list.length) download(id === 'all' ? 'wedding-events.ics' : 'wedding-' + id + '.ics', ics(list));
  });

  var n = C.events.filter(function (e) { return e.id === 'nikah'; })[0], g = WI.$('#gcal-link');
  if (n && g) g.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(n.title + ' · ' + names) +
    '&dates=' + utc(n.start) + '/' + utc(n.end) + '&location=' + encodeURIComponent(loc) + '&details=' + encodeURIComponent(desc(n));
});
