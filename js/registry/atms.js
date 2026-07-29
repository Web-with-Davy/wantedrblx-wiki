const __MANIFEST_atms = [
  "js/data/atms/atms.js",
  "js/data/atms/vaults.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_atms).then(() => {
  try {
    window.ATMS_AND_VAULTS_DATA = __MANIFEST_atms.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = filename.toUpperCase().replace(/-/g, '_') + '_DATA';
      let data; try { data = eval(varName); } catch(_) {}
      if (!data) {
        console.warn(`atms.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });
  } catch (err) {
    console.error("Failed building data for js/registry/atms.js:", err);
  }
}));

