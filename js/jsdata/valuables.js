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
    const SEASONAL = new Set(['christmas', '4th-of-july', 'easter']);

    window.VALUABLES_DATA = __MANIFEST_valuables.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      if (SEASONAL.has(filename)) return [];
      const varName = 'VALUABLES_' + filename.toUpperCase().replace(/-/g, '_');
      let data; try { data = eval(varName); } catch(_) {}
      if (!data) {
        console.warn(`valuables.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });

    try { window.EASTER_VALUABLES_DATA = VALUABLES_EASTER; } catch(_) { window.EASTER_VALUABLES_DATA = []; }
    try { window.CHRISTMAS_VALUABLES_DATA = VALUABLES_CHRISTMAS; } catch(_) { window.CHRISTMAS_VALUABLES_DATA = []; }
    try { window.FOURTH_OF_JULY_VALUABLES_DATA = VALUABLES_4TH_OF_JULY; } catch(_) { window.FOURTH_OF_JULY_VALUABLES_DATA = []; }
  } catch (err) {
    console.error("Failed building data for js/jsdata/valuables.js:", err);
  }
}));
