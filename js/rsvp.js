/* RSVP: validation → WhatsApp message (and optional backend POST). Never claims storage without a real service. */
(window.WI = window.WI || { m: [] }).m.push(function (WI) {
  var R = WI.C.rsvp, form = WI.$('#rsvp-form'), status = WI.$('#rsvp-status'), note = WI.$('#rsvp-note');
  var guests = WI.$('#r-guests'), name = WI.$('#r-name');
  if (WI.guest) name.value = WI.guest;
  note.textContent = R.endpoint ? 'Your reply is sent to the hosts when you submit.' : 'This opens WhatsApp with your reply ready to send. Nothing is saved until you send it.';
  WI.$('#rsvp-btn-label').textContent = R.endpoint ? 'Send reply' : 'Reply on WhatsApp';
  guests.max = R.maxGuests;

  function setErr(id, msg) {
    var el = WI.$('#e-' + id), f = el.closest('.field');
    el.textContent = msg || ''; if (msg) f.setAttribute('data-invalid', ''); else f.removeAttribute('data-invalid');
    var input = f.querySelector('.input'); if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  function attendance() { var c = form.querySelector('[name=attendance]:checked'); return c ? c.value : ''; }
  form.addEventListener('change', function () {
    var no = attendance() === 'no'; guests.disabled = no; if (no) setErr('guests', '');
  });

  function validate() {
    var ok = true, n = name.value.trim(), a = attendance(), g = parseInt(guests.value, 10);
    ok = setErr('name', n.length < 2 ? 'Please enter your name.' : '') && ok;
    ok = setErr('attendance', a ? '' : 'Please choose one option.') && ok;
    ok = setErr('guests', a === 'yes' && !(g >= 1 && g <= R.maxGuests) ? 'Enter a number from 1 to ' + R.maxGuests + '.' : '') && ok;
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); status.textContent = '';
    if (!validate()) { var bad = form.querySelector('[data-invalid] .input, [data-invalid] input'); if (bad) bad.focus(); return; }
    var data = { name: name.value.trim(), attending: attendance() === 'yes', guests: attendance() === 'yes' ? +guests.value : 0, message: WI.$('#r-msg').value.trim() };
    var couple = WI.C.couple.groom.name + ' & ' + WI.C.couple.bride.name;

    if (R.endpoint) {
      status.textContent = 'Sending…';
      fetch(R.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); status.textContent = 'Thank you, your reply has been sent.'; form.reset(); })
        .catch(function () { status.textContent = 'We could not send your reply. Please try again or call the family.'; });
      return;
    }
    var msg = 'Assalamu Alaikum! RSVP for the wedding of ' + couple + ' (' + WI.C.date.display + ').\n' +
      'Name: ' + data.name + '\n' + (data.attending ? 'Attending: Yes, ' + data.guests + ' guest(s)' : 'Attending: Regretfully unable') +
      (data.message ? '\nMessage: ' + data.message : '');
    window.open('https://wa.me/' + R.whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    status.textContent = 'WhatsApp is opening. Please press Send there to confirm your reply.';
  });
});
