(function () {
  // Phase 1: Scripts needed to render home page and initialize core UI.
  // Loaded immediately after registry data is ready.
  const CRITICAL_SCRIPTS = [
    "js/tabs/home.js",
    "js/tabs/promo-codes.js",
    "js/core/renderer.js",
    "js/core/item-page.js",
    "js/core/ui.js",
    "js/features/settings.js",
    "js/features/garage.js",
    "js/features/search.js",
    "js/features/youtuber.js",
    "js/core/app.js"
  ];

  // Phase 2: Scripts for secondary tabs and non-critical features.
  // Deferred until browser is idle after first paint.
  const DEFERRED_SCRIPTS = [
    "js/tabs/atms.js",
    "js/tabs/events.js",
    "js/tabs/gun-crates.js",
    "js/tabs/locations.js",
    "js/tabs/missions.js",
    "js/tabs/npcs.js",
    "js/tabs/store.js",
    "js/tabs/valuables.js",
    "js/tabs/vehicles.js",
    "js/tabs/weapons.js",
    "js/features/visitor.js",
    "js/events/easter_eggs.js",
    "js/events/birthday.js",
    "js/events/4th-of-july.js",
    "js/features/tutorial.js"
  ];

  function loadDeferred() {
    const doLoad = () =>
      loadScripts(DEFERRED_SCRIPTS).then(() => {
        document.dispatchEvent(new Event('wantedDeferredReady'));
      });
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(doLoad, { timeout: 2000 });
    } else {
      setTimeout(doLoad, 500);
    }
  }

  Promise.all(window.__WANTED_LOADERS || [])
    .then(() => loadScripts(CRITICAL_SCRIPTS))
    .then(() => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
      loadDeferred();
    })
    .catch((err) => console.error("Wanted wiki failed to load:", err));
})();

