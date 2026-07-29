const __MANIFEST_youtubers = [
  "js/data/youtubers/creator-1.js",
  "js/data/youtubers/creator-2.js",
  "js/data/youtubers/creator-3.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_youtubers).then(() => {
  try {
    window.YOUTUBERS_DATA = __MANIFEST_youtubers.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = 'YOUTUBER_' + filename.toUpperCase().replace(/-/g, '_');
      let data; try { data = eval(varName); } catch(_) {}
      if (!data) {
        console.warn(`youtubers.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return [data];
    });
  } catch (err) {
    console.error("Failed building data for js/registry/youtubers.js:", err);
  }
}));
