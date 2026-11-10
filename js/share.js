/* Share: WhatsApp, native share sheet (where supported), copy link */
(window.WI = window.WI || { m: [] }).m.push(function (WI) {
  var C = WI.C, S = C.share || {}, status = WI.$('#share-status');
  var url = S.url || location.href.split('#')[0].split('?')[0];
  var text = S.text || ('You are warmly invited to the wedding of ' + C.couple.groom.name + ' & ' + C.couple.bride.name +
    ' on ' + C.date.display + ' at ' + C.venue.name + ', Buxar. Insha Allah, we hope to see you there.');

  WI.$('#share-wa').href = 'https://wa.me/?text=' + encodeURIComponent(text + '\n' + url);

  var nat = WI.$('#share-native');
  if (navigator.share) {
    nat.hidden = false;
    nat.addEventListener('click', function () { navigator.share({ title: S.title || document.title, text: text, url: url }).catch(function () {}); });
  }
  WI.$('#share-copy').addEventListener('click', function () {
    function ok() { status.textContent = 'Link copied. You can paste it anywhere.'; }
    function fallback() {
      var t = document.createElement('textarea'); t.value = url; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy') ? ok() : (status.textContent = 'Copy this link: ' + url); } catch (e) { status.textContent = 'Copy this link: ' + url; }
      t.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(ok, fallback); else fallback();
  });
});
