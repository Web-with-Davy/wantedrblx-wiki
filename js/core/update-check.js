(() => {
    const VERSION_KEY = 'wanted-wiki-deployment-version';
    const RELOAD_PARAM = '__wanted_version';
    const SESSION_RELOAD_KEY = '__wanted_reloaded_for';
    const CHECK_INTERVAL_MS = 60_000;
    let reloadStarted = false;

    // Clean up cache-busting reload parameter from URL bar after load without causing a reload
    const currentUrl = new URL(window.location.href);
    let strippedParam = false;
    if (currentUrl.searchParams.has(RELOAD_PARAM)) {
        currentUrl.searchParams.delete(RELOAD_PARAM);
        strippedParam = true;
    }
    if (currentUrl.searchParams.has('__v')) {
        currentUrl.searchParams.delete('__v');
        strippedParam = true;
    }
    if (strippedParam) {
        window.history.replaceState({}, document.title, `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
    }

    function getCurrentVersion() {
        return window.__WANTED_VERSION || document.querySelector('meta[name="app-version"]')?.content || null;
    }

    async function fetchServerVersion() {
        const timestamp = Date.now();
        // 1. Try static version.json first (fast, reliable, zero GitHub API rate limits)
        try {
            const res = await fetch(`/version.json?_t=${timestamp}`, {
                cache: 'no-store',
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                const data = await res.json();
                if (data && typeof data.version === 'string' && data.version) {
                    return data.version;
                }
            }
        } catch (_) {}

        // 2. Fallback to /version endpoint if version.json is not directly reachable
        try {
            const res = await fetch(`/version?_t=${timestamp}`, {
                cache: 'no-store',
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                const data = await res.json();
                if (data && typeof data.version === 'string' && data.version) {
                    return data.version;
                }
            }
        } catch (_) {}

        return null;
    }

    async function checkForUpdate() {
        if (reloadStarted) return;

        const currentVersion = getCurrentVersion();
        if (!currentVersion) return;

        try {
            const serverVersion = await fetchServerVersion();
            if (!serverVersion) return;

            // Running page already has the latest published version
            if (serverVersion === currentVersion) {
                sessionStorage.removeItem(SESSION_RELOAD_KEY);
                localStorage.setItem(VERSION_KEY, serverVersion);
                return;
            }

            // Loop protection: avoid repeated reloads during a session if CDN propagation is delayed
            const alreadyReloadedFor = sessionStorage.getItem(SESSION_RELOAD_KEY);
            if (alreadyReloadedFor === serverVersion) {
                return;
            }

            reloadStarted = true;
            sessionStorage.setItem(SESSION_RELOAD_KEY, serverVersion);
            localStorage.setItem(VERSION_KEY, serverVersion);

            // Clear any ServiceWorker / CacheStorage entries
            if ('caches' in window) {
                try {
                    const cacheNames = await caches.keys();
                    await Promise.allSettled(cacheNames.map(cacheName => caches.delete(cacheName)));
                } catch (error) {
                    console.warn('Could not clear site caches.', error);
                }
            }

            const executeReload = () => {
                const reloadUrl = new URL(window.location.href);
                reloadUrl.searchParams.set(RELOAD_PARAM, serverVersion);
                window.location.replace(reloadUrl.href);
            };

            // If the user is actively typing in an input or textarea, delay reload until blur
            const activeEl = document.activeElement;
            const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');
            if (isTyping) {
                activeEl.addEventListener('blur', executeReload, { once: true });
                // Safety timeout: don't wait indefinitely if input never blurs
                setTimeout(executeReload, 15_000);
            } else {
                executeReload();
            }
        } catch (error) {
            console.warn('Could not check for a site update.', error);
        }
    }

    // Defer initial check slightly so it doesn't contend with initial page paint
    setTimeout(checkForUpdate, 3_000);
    window.setInterval(checkForUpdate, CHECK_INTERVAL_MS);
    window.addEventListener('focus', checkForUpdate);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkForUpdate();
    });
})();
