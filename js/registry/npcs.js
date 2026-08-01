const __MANIFEST_npcs = [
  "js/data/npcs/bert.js",
  "js/data/npcs/cody.js",
  "js/data/npcs/dan.js",
  "js/data/npcs/davy.js",
  "js/data/npcs/erik.js",
  "js/data/npcs/justin.js",
  "js/data/npcs/ofy.js",
  "js/data/npcs/rod.js",
  "js/data/npcs/sir-b.js",
  "js/data/npcs/softy.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_npcs).then(() => {
  try {
    window.NPCS_DATA = __MANIFEST_npcs.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = 'NPC_' + filename.toUpperCase().replace(/-/g, '');
      const data = window[varName];
      if (!data) {
        console.warn(`npcs.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });
  } catch (err) {
    console.error("Failed building data for js/registry/npcs.js:", err);
  }
}));

