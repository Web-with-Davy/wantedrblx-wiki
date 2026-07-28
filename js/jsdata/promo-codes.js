const __MANIFEST_promo_codes = [
  "js/data/promo-codes/active.js",
  "js/data/promo-codes/expired.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_promo_codes).then(() => {
  try {
    window.PROMO_CODES_DATA = [
      ...PROMO_CODES_ACTIVE,
      ...PROMO_CODES_EXPIRED,
    ];

  } catch (err) {
    console.error("Failed building data for js/jsdata/promo-codes.js:", err);
  }
}));
