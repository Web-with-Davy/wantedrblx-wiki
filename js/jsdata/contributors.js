const __MANIFEST_contributors = [
  "js/data/contributors/contributors.js",
  "js/data/contributors/managers.js",
  "js/data/contributors/staff.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_contributors).then(() => {
  try {
    window.CONTRIBUTORS_DATA = {
      managers: CONTRIBUTORS_MANAGERS,
      staff: CONTRIBUTORS_STAFF,
      contributors: CONTRIBUTORS_CONTRIBUTORS,
    };
  } catch (err) {
    console.error("Failed building data for js/jsdata/contributors.js:", err);
  }
}));
