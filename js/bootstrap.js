// Runs after every category's data has finished loading, then loads
// tabs/renderer/app scripts, then replays DOMContentLoaded for any of
// them (e.g. app.js) that registered a listener for it after the real
// event already fired.
(function () {
  const POST_DATA_SCRIPTS = [
  "tabs/atms.js",
  "tabs/events.js",
  "tabs/gun-crates.js",
  "tabs/home.js",
  "tabs/locations.js",
  "tabs/missions.js",
  "tabs/npcs.js",
  "tabs/promo-codes.js",
  "tabs/store.js",
  "tabs/valuables.js",
  "tabs/vehicles.js",
  "tabs/weapons.js",
  "js/renderer.js",
  "js/ui.js",
  "js/settings.js",
  "js/garage.js",
  "js/visitor.js",
  "js/search.js",
  "js/easter_eggs.js",
  "js/birthday.js",
  "js/4th-of-july.js",
  "js/youtuber.js",
  "js/tutorial.js",
  "js/app.js"
  ];

  Promise.all(window.__WANTED_LOADERS || [])
    .then(() => loadScripts(POST_DATA_SCRIPTS))
    .then(() => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
    })
    .catch((err) => console.error("Wanted wiki failed to load:", err));
})();
