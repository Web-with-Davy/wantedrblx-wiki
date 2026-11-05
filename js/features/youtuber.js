const YOUTUBER_ENABLED = true;
const YOUTUBER_TEST_MODE = false;

(function () {
    'use strict';

    if (!YOUTUBER_ENABLED) return;

    const CHANNEL_HANDLES = ['Borgaboo', 'CeeJay_', 'ZDMD'];
    const LIVE_TITLE_MATCH = 'wanted';
    const LIVE_IMAGE = 'https://www.pngall.com/wp-content/uploads/13/Logo-Youtube-PNG-Images.png';

    const IN_MS   = 600;
    const SHOW_MS = 5000;
    const OUT_MS  = 600;
    const GAP_MS  = 1200;

    const LIVE_CHECK_INTERVAL_MS = 3 * 60 * 1000;
    const WORKER_URL = 'https://wanted-live-check.the-davy-devv.workers.dev/';

    let activeMatches = [];
    let sessionDone   = false;

    async function checkChannelLive(handle) {
        try {
            const res  = await fetch(`${WORKER_URL}?handle=${encodeURIComponent(handle)}`);
            if (!res.ok) return null;
            const data = await res.json();
            if (!data.live) return null;
            const title = data.title || '';
            if (title.toLowerCase().includes(LIVE_TITLE_MATCH.toLowerCase())) {
                return { handle, videoId: data.videoId, title, url: data.url };
            }
            return null;
        } catch (err) {
            console.error('[youtuber.js] Live check failed for', handle, err);
            return null;
        }
    }

    async function refreshLiveState() {
        if (sessionDone) return;

        let matches;
        if (YOUTUBER_TEST_MODE) {
            matches = [
                { handle: 'Borgaboo', videoId: 'dQw4w9WgXcQ', title: 'wanted (TEST)', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
                { handle: 'CeeJay_',  videoId: 'dQw4w9WgXcQ', title: 'wanted (TEST)', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
                { handle: 'ZDMD',     videoId: 'dQw4w9WgXcQ', title: 'wanted (TEST)', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            ];
        } else {
            const results = await Promise.all(CHANNEL_HANDLES.map(checkChannelLive));
            matches = results.filter(Boolean);
        }

        activeMatches = matches;
        if (matches.length > 0) {
            sessionDone = true;
            runSequence();
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        #yt-live-container {
            position: fixed;
            bottom: calc(24px + env(safe-area-inset-bottom, 0px));
            left: 16px;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            gap: 6px;
            align-items: flex-start;
            transform-origin: bottom left;
            opacity: 0;
            transform: scale(0.5) translateY(18px);
            pointer-events: none;
        }
        #yt-live-container.yt-in {
            transition: opacity ${IN_MS}ms cubic-bezier(0.34, 1.3, 0.64, 1),
                        transform ${IN_MS}ms cubic-bezier(0.34, 1.3, 0.64, 1);
        }
        #yt-live-container.yt-out {
            transition: opacity ${OUT_MS}ms ease-in,
                        transform ${OUT_MS}ms ease-in,
                        filter ${OUT_MS}ms ease-in;
        }
        @media (max-width: 1024px) {
            #yt-live-container {
                bottom: calc(62px + env(safe-area-inset-bottom, 0px) + 12px);
            }
        }

        .yt-live-card {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: #00000000;
            border: 2px solid rgb(255, 255, 255);
            padding: 8px 16px 8px 10px;
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
            position: relative;
            text-decoration: none;
            cursor: pointer;
            color: #fff;
            box-sizing: border-box;
            transition: border-color 0.2s ease, background 0.2s ease;
        }
        .yt-live-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 18px;
            height: 18px;
            background: transparent;
            border-top: 2px solid rgb(255, 255, 255);
            transform: rotate(-45deg) translate(9px, 9px);
            transition: border-color 0.2s ease;
            pointer-events: none;
        }
        .yt-live-card:hover {
            border-color: #ff3b3b;
            background: rgba(255, 0, 0, 0.07);
        }
        .yt-live-card:hover::after {
            border-color: #ff3b3b;
        }

        .yt-live-card img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
            border: 2px solid rgba(255, 255, 255, 0.3);
            background: #111;
        }
        .yt-live-card-text {
            display: flex;
            flex-direction: column;
            gap: 2px;
            overflow: hidden;
            min-width: 0;
        }
        .yt-live-badge {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.6rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            color: #ff6b6b;
            text-transform: uppercase;
            font-family: 'Geist Pixel', system-ui;
            white-space: nowrap;
        }
        .yt-live-badge::before {
            content: '';
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #ff2020;
            box-shadow: 0 0 5px #ff2020;
            animation: yt-pulse 1.4s ease-in-out infinite;
            flex-shrink: 0;
        }
        @keyframes yt-pulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.3; }
        }
        .yt-live-name {
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: 'Geist Pixel', system-ui;
        }

        body.christmas-theme .yt-live-card {
            color: var(--xmas-ink, #fff1d2);
            background: var(--xmas-gloss, linear-gradient(180deg, rgba(255, 240, 210, 0.2), rgba(0, 0, 0, 0.14))), var(--xmas-plate, #231812);
            border-color: var(--xmas-gold-hi, #f2cd7a);
            box-shadow: var(--xmas-shadow, 0 10px 26px rgba(8, 4, 2, 0.45)), var(--xmas-rim-soft, inset 0 1px 0 rgba(255, 236, 190, 0.12));
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
        }
        body.christmas-theme .yt-live-card::after {
            border-color: var(--xmas-gold-hi, #f2cd7a);
        }
        body.christmas-theme .yt-live-card:hover {
            border-color: var(--xmas-gold-hi, #f2cd7a);
            background: var(--xmas-wood-btn-hover, linear-gradient(180deg, #7a5540, #4c3322));
            box-shadow: var(--xmas-shadow, 0 10px 26px rgba(8, 4, 2, 0.45)), var(--xmas-glow, 0 0 16px rgba(240, 180, 90, 0.22));
        }
        body.christmas-theme .yt-live-card:hover::after {
            border-color: var(--xmas-gold-hi, #f2cd7a);
        }
        body.christmas-theme .yt-live-badge {
            color: var(--xmas-gold-hi, #f2cd7a);
        }
        body.christmas-theme .yt-live-badge::before {
            background: var(--xmas-ember, #8a3a31);
            box-shadow: 0 0 5px var(--xmas-ember, #8a3a31);
        }
        body.christmas-theme .yt-live-name {
            color: var(--xmas-ink, #fff1d2);
        }
        body.christmas-theme .yt-live-card img {
            border-color: var(--xmas-edge-hi, rgba(224, 177, 91, 0.7));
            background: var(--xmas-wood, #2b1d15);
        }

        body.frutiger-aero .yt-live-card {
            color: var(--aero-ink, #123d58);
            background: var(--aero-glass, rgba(236, 250, 255, 0.9));
            border-color: var(--aero-edge, rgba(255, 255, 255, 0.94));
            box-shadow: var(--aero-shadow, 0 12px 30px rgba(9, 71, 112, 0.2), inset 0 1px rgba(255, 255, 255, 0.92));
            text-shadow: 0 1px rgba(255, 255, 255, 0.8);
        }
        body.frutiger-aero .yt-live-card::after {
            border-color: var(--aero-edge, rgba(255, 255, 255, 0.94));
        }
        body.frutiger-aero .yt-live-card:hover {
            color: #fff;
            border-color: rgba(255, 255, 255, 0.98);
            background: linear-gradient(135deg, #138cc3, #27b4c2);
            box-shadow: 0 12px 30px rgba(9, 71, 112, 0.25), inset 0 1px rgba(255, 255, 255, 0.72);
            text-shadow: 0 1px rgba(0, 61, 93, 0.4);
        }
        body.frutiger-aero .yt-live-card:hover::after {
            border-color: rgba(255, 255, 255, 0.98);
        }
        body.frutiger-aero .yt-live-badge {
            color: #c62850;
        }
        body.frutiger-aero .yt-live-badge::before {
            background: #d82c57;
            box-shadow: 0 0 5px rgba(216, 44, 87, 0.7);
        }
        body.frutiger-aero .yt-live-name {
            color: var(--aero-ink, #123d58);
        }
        body.frutiger-aero .yt-live-card:hover .yt-live-name {
            color: #fff;
        }
        body.frutiger-aero .yt-live-card img {
            border-color: rgba(255, 255, 255, 0.9);
            background: #dff8ff;
        }

        @media (max-width: 1024px) {
            .yt-live-card {
                padding: 6px 12px 6px 8px;
                gap: 9px;
            }
            .yt-live-card img {
                width: 26px;
                height: 26px;
            }
            .yt-live-badge {
                font-size: 0.55rem;
            }
            .yt-live-name {
                font-size: 0.7rem;
            }
        }
    `;
    document.head.appendChild(style);

    function buildCard(match) {
        const link = document.createElement('a');
        link.href = match.url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.className = 'yt-live-card';
        link.title = `${match.handle} is live on YouTube!`;

        const img = document.createElement('img');
        img.src = LIVE_IMAGE;
        img.alt = match.handle;
        link.appendChild(img);

        const text = document.createElement('div');
        text.className = 'yt-live-card-text';

        const badge = document.createElement('span');
        badge.className = 'yt-live-badge';
        badge.textContent = 'Live on YouTube';

        const name = document.createElement('span');
        name.className = 'yt-live-name';
        name.textContent = match.handle;

        text.appendChild(badge);
        text.appendChild(name);
        link.appendChild(text);
        return link;
    }

    function createContainer() {
        const el = document.createElement('div');
        el.id = 'yt-live-container';
        activeMatches.forEach(match => el.appendChild(buildCard(match)));
        document.body.appendChild(el);
        return el;
    }

    function isLowEnd() {
        return document.body && document.body.classList.contains('low-end-mode');
    }

    function popIn(el, onDone) {
        el.getBoundingClientRect();
        if (isLowEnd()) {
            el.style.opacity = '1';
            el.style.transform = 'scale(1) translateY(0)';
            el.style.filter = 'blur(0px)';
            el.style.pointerEvents = 'auto';
            onDone();
        } else {
            el.classList.add('yt-in');
            el.style.opacity = '1';
            el.style.transform = 'scale(1) translateY(0)';
            el.style.filter = 'blur(0px)';
            el.style.pointerEvents = 'auto';
            setTimeout(onDone, IN_MS);
        }
    }

    function popOut(el, onDone) {
        if (isLowEnd()) {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            onDone();
        } else {
            el.classList.remove('yt-in');
            el.classList.add('yt-out');
            el.style.opacity = '0';
            el.style.transform = 'scale(0.3)';
            el.style.filter = 'blur(8px)';
            el.style.pointerEvents = 'none';
            setTimeout(onDone, OUT_MS);
        }
    }

    function showOnce(onDone) {
        const el = createContainer();
        popIn(el, () => {
            setTimeout(() => {
                popOut(el, () => {
                    el.remove();
                    onDone();
                });
            }, SHOW_MS);
        });
    }

    function runSequence() {
        showOnce(() => {
            setTimeout(() => {
                showOnce(() => {});
            }, isLowEnd() ? 0 : GAP_MS);
        });
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
