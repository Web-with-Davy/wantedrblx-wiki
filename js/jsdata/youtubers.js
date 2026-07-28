const __MANIFEST_youtubers = [
  "js/data/youtubers/creator-1.js",
  "js/data/youtubers/creator-2.js",
  "js/data/youtubers/creator-3.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_youtubers).then(() => {
  try {
    window.YOUTUBERS_DATA = [
      YOUTUBER_CREATOR_1,
      YOUTUBER_CREATOR_2,
      YOUTUBER_CREATOR_3
    ];
  } catch (err) {
    console.error("Failed building data for js/jsdata/youtubers.js:", err);
  }
}));
