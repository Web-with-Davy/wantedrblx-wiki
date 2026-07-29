const __MANIFEST_videos = [
  "js/data/videos/a.js",
  "js/data/videos/b.js",
  "js/data/videos/c.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_videos).then(() => {
  try {
    window.VIDEOS_DATA = __MANIFEST_videos.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = 'VIDEO_' + filename.toUpperCase().replace(/-/g, '_');
      let data; try { data = eval(varName); } catch(_) {}
      if (!data) {
        console.warn(`videos.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });
  } catch (err) {
    console.error("Failed building data for js/jsdata/videos.js:", err);
  }
}));
