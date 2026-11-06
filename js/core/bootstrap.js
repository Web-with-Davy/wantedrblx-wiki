(function () {
  const CRITICAL_SCRIPTS = [
    "js/tabs/home.js?v=20261105-6",
    "js/tabs/privacy.js?v=20261105-1",
    "js/core/renderer.js?v=20261102-1",
    "js/core/item-page.js?v=20261102-1",
    "js/core/ui.js?v=20261102-1",
    "js/features/settings.js?v=20261102-1",
    "js/features/garage.js?v=20261102-1",
    "js/features/search.js?v=20261102-1",
    "js/core/app.js?v=20261103-4",
    "js/features/theme-notification.js?v=20261105-1"
  ];

  const DEFERRED_SCRIPTS = [
    "js/tabs/promo-codes.js?v=20261102-1",
    "js/tabs/atms.js?v=20261102-1",
    "js/tabs/events.js?v=20261102-1",
    "js/tabs/gun-crates.js?v=20261102-1",
    "js/tabs/items.js?v=20261102-1",
    "js/tabs/locations.js?v=20261102-1",
    "js/tabs/missions.js?v=20261102-1",
    "js/tabs/npcs.js?v=20261102-1",
    "js/tabs/store.js?v=20261102-1",
    "js/tabs/valuables.js?v=20261102-1",
    "js/tabs/vehicles.js?v=20261102-1",
    "js/tabs/weapons.js?v=20261102-1",
    "js/features/youtuber.js?v=20261102-1",
    "js/features/tutorial.js?v=20261102-1"
  ];

  if (new Date().getMonth() === 6 && new Date().getDate() === 4) {
    DEFERRED_SCRIPTS.push("js/events/4th-of-july.js?v=20261102-1");
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

