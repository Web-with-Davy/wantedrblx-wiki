const __MANIFEST_gun_crates = [
  "js/data/gun-crates/ak-47-crate.js",
  "js/data/gun-crates/aug-a1-crate.js",
  "js/data/gun-crates/awm-crate.js",
  "js/data/gun-crates/benelli-m1014-crate.js",
  "js/data/gun-crates/glock-18c-crate.js",
  "js/data/gun-crates/m4a1-crate.js",
  "js/data/gun-crates/rpg-7-crate.js",
  "js/data/gun-crates/ump-45-crate.js",
  "js/data/gun-crates/uzi-crate.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_gun_crates).then(() => {
  try {
    window.GUN_CRATES_DATA = __MANIFEST_gun_crates.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '').replace(/-crate$/, '');
      const varName = 'GUN_CRATE_' + filename.toUpperCase().replace(/-/g, '_');
      const data = window[varName];
      if (!data) {
        console.warn(`gun-crates.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });
  } catch (err) {
    console.error("Failed building data for js/registry/gun-crates.js:", err);
  }
}));

