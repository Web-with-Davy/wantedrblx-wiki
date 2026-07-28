const YOUTUBER_ENABLED = true;

(function () {
    'use strict';

    if (!YOUTUBER_ENABLED) return;

    const CHANNEL_HANDLES = ['Borgaboo', 'CeeJay_', 'ZDMD'];
    const LIVE_TITLE_MATCH = 'wanted';

    const LIVE_IMAGE = 'https://www.pngall.com/wp-content/uploads/13/Logo-Youtube-PNG-Images.png';

    const FALL_MS = 7000;
    const DELAY_MS = 2000;

    const LIVE_CHECK_INTERVAL_MS = 3 * 60 * 1000;
    const WORKER_URL = 'https://wanted-live-check.the-davy-devv.workers.dev/';

    let activeMatch = null;
    let spawnActive = false;
    let pendingTimeoutId = null;
    let currentElement = null;

    async function checkChannelLive(handle) {
        try {
            const res = await fetch(`${WORKER_URL}?handle=${encodeURIComponent(handle)}`);
            if (!res.ok) return null;
            const data = await res.json();

            if (!data.live) return null;

            const title = data.title || '';
            if (title.toLowerCase().includes(LIVE_TITLE_MATCH.toLowerCase())) {
                return {
                    handle,
                    videoId: data.videoId,
                    title,
                    url: data.url,
                };
            }
            return null;
        } catch (err) {
            console.error('[youtuber.js] Live check failed for', handle, err);
            return null;
        }
    }

    function applyMatch(match) {
        activeMatch = match;
        if (match) {
            console.log(`[youtuber.js] ${match.handle} is live with a matching title: "${match.title}"`);
            startSpawning();
        } else {
            stopSpawning();
        }
    }

    async function refreshLiveState() {
        if (activeMatch) {
            const stillLive = await checkChannelLive(activeMatch.handle);
            applyMatch(stillLive);
            if (stillLive) return;
        }

        for (const handle of CHANNEL_HANDLES) {
            const match = await checkChannelLive(handle);
            if (match) {
                applyMatch(match);
                return;
            }
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        #yt-hair-link {
            position: fixed;
            top: -150px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99999;
            display: block;
            transition: top 0s;
        }
        #yt-hair-link.fall {
            transition: top ${FALL_MS}ms linear;
            top: 110vh;
        }
        #yt-hair-link img {
            width: 80px;
            cursor: pointer;
            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
            display: block;
        }
    `;
    document.head.appendChild(style);

    function spawnHair() {
        if (!spawnActive || !activeMatch) return;

        const link = document.createElement('a');
        link.href = activeMatch.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.id = 'yt-hair-link';

        const img = document.createElement('img');
        img.src = LIVE_IMAGE;
        img.title = 'Click me!';
        link.appendChild(img);
        document.body.appendChild(link);
        currentElement = link;

        link.getBoundingClientRect();
        link.classList.add('fall');

        pendingTimeoutId = setTimeout(() => {
            link.remove();
            currentElement = null;
            if (spawnActive) {
                pendingTimeoutId = setTimeout(spawnHair, DELAY_MS);
            }
        }, 100000);
    }

    function startSpawning() {
        if (spawnActive) return;
        spawnActive = true;
        pendingTimeoutId = setTimeout(spawnHair, DELAY_MS);
    }

    function stopSpawning() {
        spawnActive = false;
        if (pendingTimeoutId) {
            clearTimeout(pendingTimeoutId);
            pendingTimeoutId = null;
        }
        if (currentElement) {
            currentElement.remove();
            currentElement = null;
        }
    }

    function init() {
        if (!document.body) return;
        refreshLiveState();
        setInterval(refreshLiveState, LIVE_CHECK_INTERVAL_MS);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();