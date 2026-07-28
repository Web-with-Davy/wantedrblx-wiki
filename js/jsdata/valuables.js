const __MANIFEST_valuables = [
  "js/data/valuables/4th-of-july.js",
  "js/data/valuables/christmas.js",
  "js/data/valuables/easter.js",
  "js/data/valuables/electronics.js",
  "js/data/valuables/gems.js",
  "js/data/valuables/jewelry.js",
  "js/data/valuables/miscellaneous.js",
  "js/data/valuables/mission-items.js",
  "js/data/valuables/shoes.js",
  "js/data/valuables/tech.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_valuables).then(() => {
  try {
    window.VALUABLES_DATA = [
      ...VALUABLES_GEMS,
      ...VALUABLES_JEWELRY,
      ...VALUABLES_ELECTRONICS,
      ...VALUABLES_TECH,
      ...VALUABLES_SHOES,
      ...VALUABLES_MISCELLANEOUS,
      ...VALUABLES_MISSION_ITEMS,
      ...VALUABLES_EASTER,
    ];

    window.EASTER_VALUABLES_DATA = [
      ...VALUABLES_EASTER,
    ];

    window.CHRISTMAS_VALUABLES_DATA = [
      ...VALUABLES_CHRISTMAS,
    ];

    window.FOURTH_OF_JULY_VALUABLES_DATA = [
      ...VALUABLES_4TH_OF_JULY,
    ];

  } catch (err) {
    console.error("Failed building data for js/jsdata/valuables.js:", err);
  }
}));
