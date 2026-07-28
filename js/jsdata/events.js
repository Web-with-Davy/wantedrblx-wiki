const __MANIFEST_events = [
  "js/data/events/christmas-2025.js",
  "js/data/events/easter-2026.js",
  "js/data/events/july-4th.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_events).then(() => {
  try {
    window.EVENTS_DATA = [
      ...EVENT_JULY_4TH_2026,
      ...EVENT_EASTER_2026,
      ...EVENT_CHRISTMAS_2025,
    ];

  } catch (err) {
    console.error("Failed building data for js/jsdata/events.js:", err);
  }
}));
