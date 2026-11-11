/* ===========================================================
   CENTRAL CONFIGURATION — edit this file only.
   Text, dates, contacts, images, map and theme live here.
   =========================================================== */
window.WEDDING_CONFIG = {
  /* Optional CSS-variable overrides, e.g. { silver: '#94A3B8' } → --silver */
  theme: {},

  couple: {
    groom: {
      name: "Imran Hussain",
      initial: "I",
      parents: "Son of Mrs. & Mr. Akhtar Imam (Munna Jee)",
      illustration: "assets/images/groom.jpeg",
    },
    bride: {
      name: "Rukhsar Parveen",
      initial: "R",
      parents: "Daughter of Mrs. & Mr. Rahimuddin Ansari",
      origin: "Jagdishpur, Distt. Bhojpur, Bihar",
      illustration: "assets/icons/bride.svg",
    },
  },

  date: { display: "20 November 2026", nikahISO: "2026-11-18T20:00:00+05:30" },

  text: {
    bismillahAr: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahEn: "In the name of Allah, the Most Gracious, the Most Merciful.",
    together: "Together with their families",
    weds: "Weds",
    openBtn: "Open Invitation",
    inviteLine:
      "Together with their families, we cordially invite you to celebrate the blessed occasion of their marriage.",
    presence: "Your gracious presence and blessings are warmly requested.",
    closing:
      "May Allah bless this beautiful union with love, happiness, peace and countless blessings.",
  },

  /* start/end are used for calendar files (IST, +05:30) */
  events: [
    {
      id: "pre",
      title: "Pre-Wedding Celebrations",
      weekday: "Tuesday",
      date: "2026-11-17",
      start: "2026-11-17T18:00:00+05:30",
      end: "2026-11-17T22:00:00+05:30",
      items: [
        { name: "Qurankhani", time: "After Namaz-e-Fajr" },
        { name: "Milad-Un-Nabi", time: "6:00 PM" },
        { name: "Haldi", time: "8:00 PM" },
      ],
    },
    {
      id: "nikah",
      title: "Nikah Ceremony",
      weekday: "Wednesday",
      date: "2026-11-18",
      highlight: true,
      start: "2026-11-18T20:00:00+05:30",
      end: "2026-11-18T22:30:00+05:30",
      items: [{ name: "Nikah", time: "8:00 PM" }],
    },
    {
      id: "walima",
      title: "Walima (Dinner)",
      weekday: "Friday",
      date: "2026-11-20",
      start: "2026-11-20T19:00:00+05:30",
      end: "2026-11-20T22:30:00+05:30",
      items: [{ name: "Dinner", time: "7:00 PM" }],
    },
  ],

  venue: {
    name: "Shehnai Palace",
    addressLines: [
      "In front of Makhan Bhog,",
      "Behind Nagar Parishad,",
      "Buxar, Bihar.",
    ],
    /* Search text for map + directions (no coordinates invented).
       For an exact pin, paste Google Maps "Embed a map" src into mapEmbedUrl
       and a share link into directionsUrl. */
    mapQuery: "Shehnai Palace, Makhan Bhog, Nagar Parishad, Buxar, Bihar",
    mapEmbedUrl: "",
    directionsUrl: "",
  },

  family: {
    host: "Mrs. & Mr. Akhtar Imam (Munna Jee)",
    address: "Station Road, Koirpurwa, Buxar.",
    rsvp: "All Relatives & Friends.",
    phones: ["9334604268", "9718140049"],
    firm: { name: "K.G.N. Watch", address: "Milap Hotel, P.P. Road, Buxar." },
  },

  /* Share: set url to your deployed address (e.g. https://yourname.netlify.app). Empty = current page address. */
  share: { url: "", title: "Wedding Invitation", text: "" },

  credit: { name: "Imran Hussain", role: "Software Developer" },

  rsvp: {
    whatsapp:
      "919334604268" /* country code + number, no "+" (assumes India +91) */,
    endpoint: "" /* optional: URL that accepts a JSON POST (see README) */,
    maxGuests: 10,
  },
};
