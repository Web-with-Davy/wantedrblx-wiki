const __MANIFEST_store = [
  "js/data/store/bag-boosts.js",
  "js/data/store/cash.js",
  "js/data/store/money-printers.js",
  "js/data/store/other.js",
  "js/data/store/packs.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_store).then(() => {
  try {
    window.STORE_DATA = [
      ...STORE_OTHER,
      ...STORE_BAG_BOOSTS,
      ...STORE_PACKS,
      ...STORE_MONEY_PRINTERS,
      ...STORE_CASH,
    ];

  } catch (err) {
    console.error("Failed building data for js/jsdata/store.js:", err);
  }
}));
