(() => {
    const VERSION_KEY = 'wanted-wiki-deployment-version';
    const RELOAD_PARAM = '__wanted_version';
    const CHECK_INTERVAL_MS = 60_000;
    let reloadStarted = false;

    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has(RELOAD_PARAM)) {
        currentUrl.searchParams.delete(RELOAD_PARAM);
        window.history.replaceState({}, document.title, `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
    }

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
            if ('caches' in window) {
                try {
                    const cacheNames = await caches.keys();
                    await Promise.allSettled(cacheNames.map(cacheName => caches.delete(cacheName)));
                } catch (error) {
                    console.warn('Could not clear site caches.', error);
                }
            }

            localStorage.setItem(VERSION_KEY, version);
            const reloadUrl = new URL(window.location.href);
            reloadUrl.searchParams.set(RELOAD_PARAM, version);
            window.location.replace(reloadUrl.href);
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