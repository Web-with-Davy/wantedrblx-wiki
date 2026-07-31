(function () {
  const POST_DATA_SCRIPTS = [
    "js/tabs/atms.js",
    "js/tabs/events.js",
    "js/tabs/gun-crates.js",
    "js/tabs/home.js",
    "js/tabs/locations.js",
    "js/tabs/missions.js",
    "js/tabs/npcs.js",
    "js/tabs/promo-codes.js",
    "js/tabs/store.js",
    "js/tabs/valuables.js",
    "js/tabs/vehicles.js",
    "js/tabs/weapons.js",
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
