const __MANIFEST_contributors = [
  "js/data/contributors/contributors.js",
  "js/data/contributors/managers.js",
  "js/data/contributors/staff.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_contributors).then(() => {
  try {
    window.CONTRIBUTORS_DATA = __MANIFEST_contributors.reduce((acc, path) => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = 'CONTRIBUTORS_' + filename.toUpperCase().replace(/-/g, '_');
      let data; try { data = eval(varName); } catch(_) {}
      if (!data) {
        console.warn(`contributors.js: expected "${varName}" from "${path}" but it was not found.`);
        return acc;
      }
      acc[filename] = data;
      return acc;
    }, {});
  } catch (err) {
    console.error("Failed building data for js/jsdata/contributors.js:", err);
  }
}));

