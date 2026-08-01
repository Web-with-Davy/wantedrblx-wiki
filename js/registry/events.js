const __MANIFEST_events = [
  "js/data/events/christmas-2025.js",
  "js/data/events/easter-2026.js",
  "js/data/events/july-4th-2026.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_events).then(() => {
  try {
    window.EVENTS_DATA = __MANIFEST_events.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = 'EVENT_' + filename.toUpperCase().replace(/-/g, '_');
      const data = window[varName];
      if (!data) {
        console.warn(`events.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });
  } catch (err) {
    console.error("Failed building data for js/registry/events.js:", err);
  }
}));

