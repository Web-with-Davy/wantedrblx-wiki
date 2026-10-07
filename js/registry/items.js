const __MANIFEST_items = [
  "js/data/Items/Dropables/dropables.js",
  "js/data/Items/Dropables/mystery-gift.js",
  "js/data/Items/Tools/buzzsaw.js",
  "js/data/Items/Tools/vault-cracker.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_items).then(() => {
  try {
    const byCategory = {};

    __MANIFEST_items.forEach(path => {
      const parts = path.split('/');
      const category = parts[parts.length - 2];
      if (!byCategory[category]) {
        const prefix = 'ITEM_' + category.toUpperCase() + '_';
        byCategory[category] = Object.keys(window)
          .filter(name => name.startsWith(prefix))
          .flatMap(name => Array.isArray(window[name]) ? window[name] : []);
      }
    });

    window.ITEMS_BY_CATEGORY = byCategory;
    window.ITEMS_DATA = Object.values(byCategory).flat();
  } catch (err) {
    console.error("Failed building data for js/registry/items.js:", err);
  }
}));