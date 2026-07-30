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
    "js/core/renderer.js",
    "js/core/item-page.js",
    "js/core/ui.js",
    "js/features/settings.js",
    "js/features/garage.js",
    "js/features/visitor.js",
    "js/features/search.js",
    "js/events/easter_eggs.js",
    "js/events/birthday.js",
    "js/events/4th-of-july.js",
    "js/features/youtuber.js",
    "js/features/tutorial.js",
    "js/core/app.js"
  ];

  Promise.all(window.__WANTED_LOADERS || [])
    .then(() => loadScripts(POST_DATA_SCRIPTS))
    .then(() => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
    })
    .catch((err) => console.error("Wanted wiki failed to load:", err));
})();
