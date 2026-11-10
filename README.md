# Imran Hussain & Rukhsar Parveen — Digital Nikah Invitation

Pure HTML5 + CSS3 + vanilla JS. No build step, no dependencies. Open `index.html` or deploy the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

## Structure
```
index.html        markup + shared SVG (pointed-arch clip path, icon sprite)
css/              variables · main · components · sections · responsive
js/config.js     ← ALL wedding content, dates, contacts, images, map, theme
js/main.js        renders config into the page, then runs the other modules
js/countdown · gallery · navigation · calendar · rsvp · animations
assets/images/    put photos here (see below)
assets/patterns/  arabesque tile + floral corner ornaments (SVG)
```

## Customise (edit `js/config.js` only)
- **Photos:** add `groom.jpg`, `bride.jpg`, `gallery-1.jpg … gallery-6.jpg` to `assets/images/` (or change the paths). Missing files show an ivory placeholder. Add or remove gallery entries freely.
- **Guest greeting:** share links like `index.html?to=Ahmed%20Family` — the name appears on the cover and pre-fills the RSVP.
- **Map:** by default uses a Google Maps *search* for the venue (no invented coordinates). For an exact pin, paste the Google Maps “Embed a map” `src` into `venue.mapEmbedUrl` and a share link into `venue.directionsUrl`.
- **RSVP:** default opens WhatsApp (`rsvp.whatsapp`, currently +91 9334604268 — change if needed). To use a backend (Google Apps Script, Formspree, etc.), set `rsvp.endpoint`; it receives JSON `{name, attending, guests, message}` and success is shown only if the server returns OK.
- **Calendar:** each event has `start`/`end` (IST). The pre-wedding card is saved as one 6–10 PM entry; the full schedule is in its description.
- **Theme:** override any CSS variable, e.g. `theme: { gold: '#B99552' }`.

## Notes
- Small gold text uses `--gold-deep` (#8A6D3B) so it stays readable; the specified antique gold is used for borders/ornaments.
- The Bismillah is real text in Amiri (never an image). No autoplay audio. Reduced-motion is respected.
- The cover can be skipped by keyboard (button is auto-focused).

## v1.1 additions
- **Parallax:** splash and first invitation section use 3 SVG architecture layers (`assets/patterns/arch-back|arch-mid|dust.svg`). Splash reacts to pointer / phone tilt (gentle idle sway otherwise); the invitation section moves on scroll. Disabled for reduced-motion.
- **Profile portraits:** rotating ornamental rings (`ring.svg`), entrance rotation, hover tilt.
- **Share:** WhatsApp, native share sheet, copy link. Set `share.url` in `config.js` to your deployed address (otherwise the current page address is shared, which is a local path when opened from disk).
- **Credit:** edit `credit` in `config.js`.
