(() => {
    const VERSION_KEY = 'wanted-wiki-deployment-version';
    const CHECK_INTERVAL_MS = 60_000;
    let reloadStarted = false;

    async function checkForUpdate() {
        if (reloadStarted) return;

        try {
            const response = await fetch('/version', { cache: 'no-store' });
            if (!response.ok) return;

            const { version } = await response.json();
            if (typeof version !== 'string' || !version) return;

            const previousVersion = localStorage.getItem(VERSION_KEY);
            if (!previousVersion) {
                localStorage.setItem(VERSION_KEY, version);
                return;
            }
            if (previousVersion === version) return;

            reloadStarted = true;
            localStorage.setItem(VERSION_KEY, version);

            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
            }

            window.location.reload();
        } catch (error) {
            console.warn('Could not check for a site update.', error);
        }
    }

    checkForUpdate();
    window.setInterval(checkForUpdate, CHECK_INTERVAL_MS);
    window.addEventListener('focus', checkForUpdate);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkForUpdate();
    });
})();