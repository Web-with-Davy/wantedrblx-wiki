(function () {
  const CRITICAL_SCRIPTS = [
    "js/tabs/home.js",
    "js/tabs/privacy.js",
    "js/core/renderer.js",
    "js/core/item-page.js",
    "js/core/ui.js",
    "js/features/settings.js",
    "js/features/garage.js",
    "js/features/search.js",
    "js/core/app.js",
    "js/features/theme-notification.js"
  ];

  const DEFERRED_SCRIPTS = [
    "js/tabs/promo-codes.js",
    "js/tabs/atms.js",
    "js/tabs/events.js",
    "js/tabs/gun-crates.js",
    "js/tabs/items.js",
    "js/tabs/locations.js",
    "js/tabs/missions.js",
    "js/tabs/npcs.js",
    "js/tabs/store.js",
    "js/tabs/valuables.js",
    "js/tabs/vehicles.js",
    "js/tabs/weapons.js",
    "js/features/youtuber.js",
    "js/features/tutorial.js"
  ];

  if (new Date().getMonth() === 6 && new Date().getDate() === 4) {
    DEFERRED_SCRIPTS.push("js/events/4th-of-july.js");
  }

  function loadDeferred() {
    const batchSize = 3;
    const batchLoads = [];

    const scheduleBatch = start => {
      const doLoad = () => {
        const end = Math.min(start + batchSize, DEFERRED_SCRIPTS.length);
        batchLoads.push(loadScripts(DEFERRED_SCRIPTS.slice(start, end)));
        if (end < DEFERRED_SCRIPTS.length) {
          scheduleBatch(end);
        } else {
          Promise.all(batchLoads).then(() => {
            document.dispatchEvent(new Event("wantedDeferredReady"));
          });
        }
      };

      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(doLoad, { timeout: 2000 });
      } else {
        setTimeout(doLoad, start === 0 ? 500 : 0);
      }
    };

    scheduleBatch(0);
  }

  const dataReady = Promise.all(window.__WANTED_LOADERS || []);
  dataReady
    .then(() => {
      document.dispatchEvent(new Event("wantedDataReady"));
      return loadScripts(CRITICAL_SCRIPTS);
    })
    .then(loadDeferred)
    .catch((err) => console.error("Wanted wiki failed to load:", err));
})();
