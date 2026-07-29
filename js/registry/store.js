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
    window.STORE_DATA = __MANIFEST_store.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = 'STORE_' + filename.toUpperCase().replace(/-/g, '_');
      let data; try { data = eval(varName); } catch(_) {}
      if (!data) {
        console.warn(`store.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });
  } catch (err) {
    console.error("Failed building data for js/registry/store.js:", err);
  }
}));
