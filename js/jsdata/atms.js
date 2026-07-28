const __MANIFEST_atms = [
  "js/data/atms/atms.js",
  "js/data/atms/vaults.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_atms).then(() => {
  try {
    window.ATMS_AND_VAULTS_DATA = [
      ...ATMS_DATA,
      ...VAULTS_DATA,
    ];

  } catch (err) {
    console.error("Failed building data for js/jsdata/atms.js:", err);
  }
}));
