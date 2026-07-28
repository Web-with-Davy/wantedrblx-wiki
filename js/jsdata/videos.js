const __MANIFEST_videos = [
  "js/data/videos/a.js",
  "js/data/videos/b.js",
  "js/data/videos/c.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_videos).then(() => {
  try {
    window.VIDEOS_DATA = [
      ...VIDEO_A,
      ...VIDEO_B,
      ...VIDEO_C
    ];

  } catch (err) {
    console.error("Failed building data for js/jsdata/videos.js:", err);
  }
}));
