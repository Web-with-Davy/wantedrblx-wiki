const container = document.getElementById("page-container");
const bgm = document.getElementById("bgm");
const loadSfx = document.getElementById("sfx-load");
const clickSfx = document.getElementById("sfx-click");
const hoverSfx = document.getElementById("sfx-hover");
const volumeSlider = document.getElementById("bgm-volume");
const sizeSlider = document.getElementById("card-size-slider");

window.audioUnlocked = false;

window.loadPage = loadPage;

const VALID_PAGES = ["home", "valuables", "atms", "weapons", "vehicles", "gun-crates", "missions", "npcs", "locations", "store", "items", "events", "promo-codes"];
const PAGE_NAMES = {
    home: 'HOME', valuables: 'VALUABLES', atms: 'ATMs & VAULTS',
    weapons: 'WEAPONS', vehicles: 'VEHICLES', 'gun-crates': 'GUN CRATES',
    missions: 'MISSIONS', npcs: 'NPCs', locations: 'LOCATIONS',
    store: 'STORE', items: 'ITEMS', events: 'EVENTS', 'promo-codes': 'PROMO CODES'
};

const PAGE_META = {
    home: { title: 'Wanted Wiki - Roblox Wanted Game Wiki', path: '/' },
    valuables: { title: 'Valuables - Wanted Wiki', path: '/valuables' },
    atms: { title: 'ATMs & Vaults - Wanted Wiki', path: '/atms' },
    weapons: { title: 'Weapons - Wanted Wiki', path: '/weapons' },
    vehicles: { title: 'Vehicles - Wanted Wiki', path: '/vehicles' },
    'gun-crates': { title: 'Gun Crates - Wanted Wiki', path: '/gun-crates' },
    missions: { title: 'Missions - Wanted Wiki', path: '/missions' },
    npcs: { title: 'NPCs - Wanted Wiki', path: '/npcs' },
    locations: { title: 'Locations - Wanted Wiki', path: '/locations' },
    store: { title: 'Store - Wanted Wiki', path: '/store' },
    items: { title: 'Items - Wanted Wiki', path: '/items' },
    events: { title: 'Events - Wanted Wiki', path: '/events' },
    'promo-codes': { title: 'Promo Codes - Wanted Wiki', path: '/promo-codes' }
};

function setPageMeta(page) {
    const meta = PAGE_META[page] || PAGE_META.home;
    document.title = meta.title;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `https://wantedrblx.com${meta.path}`;
}

function getCurrentPage() {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (VALID_PAGES.includes(path)) return path;
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('item/')) return null;
    if (VALID_PAGES.includes(hash)) return hash;
    return 'home';
}
window.getCurrentPage = getCurrentPage;

function loadPage(page, saveToHistory = true) {
    if (!container) return;

    const currentPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const currentHash = window.location.hash.replace(/^#/, '');
    if (!saveToHistory && !VALID_PAGES.includes(currentPath) && VALID_PAGES.includes(currentHash)) {
        window.history.replaceState({ page }, '', page === 'home' ? '/' : `/${page}`);
    }


    document.querySelectorAll(".tab[data-page]").forEach(t => {
        t.classList.toggle("active", t.dataset.page === page);
    });

    const isLowEnd = document.body.classList.contains('low-end-mode');

    if (!isLowEnd) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(10px)';
    }

    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        container.innerHTML = '<div class="loading glitch" data-text="LOADING...">LOADING ARCHIVE...</div>';

        if (window.audioUnlocked && loadSfx) {
            loadSfx.currentTime = 0;
            loadSfx.volume = 0.3;
            loadSfx.play().catch(() => { });
        }

        let content = "";
        try {
            switch (page) {
                case "home": content = typeof renderHome === "function" ? renderHome() : ""; break;
                case "valuables": content = typeof renderValuables === "function" ? renderValuables() : ""; break;
                case "atms": content = typeof renderATMs === "function" ? renderATMs() : ""; break;
                case "weapons": content = typeof renderWeapons === "function" ? renderWeapons() : ""; break;
                case "vehicles": content = typeof renderVehicles === "function" ? renderVehicles() : ""; break;
                case "gun-crates": content = typeof renderGunCrates === "function" ? renderGunCrates() : ""; break;
                case "missions": content = typeof renderMissions === "function" ? renderMissions() : ""; break;
                case "npcs": content = typeof renderNPCs === "function" ? renderNPCs() : ""; break;
                case "locations": content = typeof renderLocations === "function" ? renderLocations() : ""; break;
                case "store": content = typeof renderStore === "function" ? renderStore() : ""; break;
                case "items": content = typeof renderItems === "function" ? renderItems() : ""; break;
                case "events": content = typeof renderEvents === "function" ? renderEvents() : ""; break;
                case "promo-codes": content = typeof renderPromoCodes === "function" ? renderPromoCodes() : ""; break;
                default: content = `<h2>Work In Progress</h2><p>Under construction...</p>`;
            }
        } catch (e) {
            console.error("Error rendering page:", page, e);
            content = `<h2>ERROR</h2><p>Failed to load ${page}. Check console for details.</p>`;
        }

        container.innerHTML = content;
        setPageMeta(page);

        const pageLabel = document.getElementById('page-label');
        if (pageLabel) pageLabel.textContent = PAGE_NAMES[page] || page.toUpperCase();
        const breadcrumb = document.getElementById('page-breadcrumb');
        if (breadcrumb) {
            breadcrumb.classList.add('visible');
            clearTimeout(breadcrumb._hideTimer);
            breadcrumb._hideTimer = setTimeout(() => breadcrumb.classList.remove('visible'), 1200);
        }

        if (saveToHistory) {
            const url = window.location.protocol === 'file:'
                ? `${window.location.pathname}${page === "home" ? '' : `#${page}`}`
                : page === "home" ? "/" : `/${page}`;
            window.history.pushState({ page }, "", url);
        }

        document.dispatchEvent(new CustomEvent('wantedPageChanged', { detail: { page } }));

        if (page === "home") {
            if (typeof initCountdownTimer === "function") initCountdownTimer();
            if (typeof initVaultGuesser === "function") initVaultGuesser();
        }

        const cards = container.querySelectorAll('.val-card');

        if (isLowEnd) {
            container.style.opacity = '1';
            container.style.transform = 'none';
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.style.transition = 'none';
            });
            return;
        }

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) skew(-1deg)';
        });

        requestAnimationFrame(() => {
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    card.style.opacity = '1';
                    card.style.transform = '';
                }, Math.min(index, 13) * 18);
            });
        });
    }, isLowEnd ? 0 : 60);
}

window.addEventListener("popstate", (event) => {
    if (typeof _handleItemPagePath === 'function' && _handleItemPagePath()) return;

    const hash = window.location.hash.replace(/^#/, '');

    if (hash.startsWith('item/') && typeof _handleItemPageHash === 'function') {
        if (_handleItemPageHash(hash)) return;
    }

    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    let page = (event.state && event.state.page) || (VALID_PAGES.includes(path) ? path : null);
    if (!page) {
        page = VALID_PAGES.includes(hash) ? hash : "home";
    }

    loadPage(page, false);
});

function initApp() {
    const bootPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const bootHash = window.location.hash.replace(/^#/, '');
    if (window.location.protocol !== 'file:' && !VALID_PAGES.includes(bootPath) && VALID_PAGES.includes(bootHash)) {
        window.history.replaceState({ page: bootHash }, '', bootHash === 'home' ? '/' : `/${bootHash}`);
    }

    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        const storedTheme = localStorage.getItem('visualTheme');
        const savedTheme = ['christmas', 'classic', 'frutiger-aero'].includes(storedTheme) ? storedTheme : 'classic';
        themeSelect.value = savedTheme;
        const applyTheme = (theme) => {
            const useChristmasTheme = theme === 'christmas';
            const useAeroTheme = theme === 'frutiger-aero';
            document.body.classList.toggle('frutiger-aero', useAeroTheme);
            document.body.classList.toggle('christmas-theme', useChristmasTheme);
            const activeTheme = theme === 'frutiger-aero' ? 'frutiger-aero' : useChristmasTheme ? 'christmas' : 'classic';
            localStorage.setItem('visualTheme', activeTheme);
            document.dispatchEvent(new CustomEvent('wantedThemeChanged', { detail: { theme: activeTheme } }));
        };

        applyTheme(savedTheme);
        themeSelect.addEventListener('change', () => applyTheme(themeSelect.value));
    }

    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initDropdownNav === 'function') initDropdownNav();
    if (typeof initSettingsPanel === 'function') initSettingsPanel(clickSfx);
    if (typeof initHeaderResize === 'function') initHeaderResize();
    if (typeof initSidebarToggle === 'function') initSidebarToggle(clickSfx);
    if (typeof initSearch === 'function') initSearch(container, window.renderSearchItem);

    const initGlobalSounds = () => {
        const interactiveSelectors = [
            'button',
            '.tab',
            '.sort-btn',
            '.card-details-toggle',
            '.val-toggle',
            '.card-overlay-button',
            '.attachment-category-header',
            '.settings-toggle',
            '.settings-close',
            '.low-end-toggle',
            '.sidebar-toggle',
            '.always-show-more-toggle',
            '.hamburger',
            '.settings-backdrop',
            '.setting-select',
            '.page-jump-nav a',
            '.home-category-card',
            'a'
        ].join(', ');

        const resumeAudio = () => {
            if (bgm && bgm.paused && window.audioUnlocked) {
                bgm.play().catch(() => { });
            }
        };

        document.addEventListener('click', (e) => {
            resumeAudio();
            const el = e.target.closest(interactiveSelectors);
            if (el && window.audioUnlocked && clickSfx) {
                clickSfx.currentTime = 0;
                clickSfx.volume = 0.4;
                clickSfx.play().catch(() => { });
            }
        }, true);

        document.addEventListener('mouseover', (e) => {
            const el = e.target.closest(interactiveSelectors);
            if (!window.matchMedia('(hover: hover)').matches) return;
            if (el && window.audioUnlocked && hoverSfx) {
                if (el.dataset.hovered === "true") return;
                el.dataset.hovered = "true";

                hoverSfx.currentTime = 0;
                hoverSfx.volume = 0.2;
                hoverSfx.play().catch(() => { });
            }
        }, true);

        document.addEventListener('mouseout', (e) => {
            const el = e.target.closest(interactiveSelectors);
            if (el && !el.contains(e.relatedTarget)) {
                el.dataset.hovered = "false";
            }
        }, true);
    };

    initGlobalSounds();

    if (bgm && volumeSlider) {
        const savedVol = localStorage.getItem("bgmVolume") || 0.4;
        volumeSlider.value = savedVol;
        bgm.volume = savedVol;

        volumeSlider.addEventListener("input", () => {
            bgm.volume = volumeSlider.value;
            localStorage.setItem("bgmVolume", volumeSlider.value);
        });
    }

    if (sizeSlider) {
        const savedSize = localStorage.getItem("cardSize") || 150;
        sizeSlider.value = savedSize;
        document.documentElement.style.setProperty('--card-min-size', `${savedSize}px`);

        sizeSlider.addEventListener("input", () => {
            document.documentElement.style.setProperty('--card-min-size', `${sizeSlider.value}px`);
            localStorage.setItem("cardSize", sizeSlider.value);
        });
    }

    document.addEventListener('click', (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const link = e.target.closest('a');
        if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return;

        const linkedPage = link.dataset.page || url.pathname.replace(/^\/+|\/+$/g, '');
        const page = linkedPage || 'home';
        if (!VALID_PAGES.includes(page)) return;

        e.preventDefault();
        loadPage(page);
    });

    // Pages whose renderers are loaded in the deferred (non-critical) bundle.
    const DEFERRED_PAGES = ["atms", "events", "gun-crates", "items", "locations", "missions", "npcs", "store", "valuables", "vehicles", "weapons"];

    // Top-level listener registered BEFORE the garage runs — immune to race conditions.
    // When deferred scripts finish, load any page that was parked during the garage phase.
    window.__deferredReady = false;
    document.addEventListener('wantedDeferredReady', () => {
        window.__deferredReady = true;
        if (window.__pendingDeferredPage) {
            const page = window.__pendingDeferredPage;
            window.__pendingDeferredPage = null;
            loadPage(page, false);
        }
    }, { once: true });

    if (typeof initGarage === 'function') {
        initGarage((skipped) => {
            window.audioUnlocked = true;

            if (typeof _handleItemPagePath === 'function' && _handleItemPagePath()) {
                if (!skipped && bgm) bgm.play().catch(() => { });
                return;
            }

            const hash = window.location.hash.replace(/^#/, '');

            if (hash.startsWith('item/') && typeof _handleItemPageHash === 'function') {
                if (!skipped && bgm) bgm.play().catch(() => { });
                setTimeout(() => _handleItemPageHash(hash), skipped ? 0 : 400);
                return;
            }

            const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
            if (!VALID_PAGES.includes(path) && VALID_PAGES.includes(hash)) {
                window.history.replaceState({ page: hash }, '', hash === 'home' ? '/' : `/${hash}`);
            }
            const initialPage = VALID_PAGES.includes(path) ? path : VALID_PAGES.includes(hash) ? hash : "home";

            const targetTab = document.querySelector(`.tab[data-page="${initialPage}"]`);
            if (targetTab) {
                targetTab.classList.add("active");
            }

            // Check renderer readiness using the actual function names (avoids case mismatch like renderAtms vs renderATMs).
            const RENDERER_MAP = {
                home: 'renderHome', valuables: 'renderValuables', atms: 'renderATMs',
                weapons: 'renderWeapons', vehicles: 'renderVehicles', 'gun-crates': 'renderGunCrates',
                missions: 'renderMissions', npcs: 'renderNPCs', locations: 'renderLocations',
                store: 'renderStore', items: 'renderItems', events: 'renderEvents', 'promo-codes': 'renderPromoCodes'
            };
            const rendererName = RENDERER_MAP[initialPage] || '';
            const rendererReady = !DEFERRED_PAGES.includes(initialPage) || typeof window[rendererName] === 'function';

            if (!rendererReady) {
                // Renderer not loaded yet — park it.
                // If wantedDeferredReady already fired (race condition), load immediately.
                if (window.__deferredReady) {
                    if (skipped) {
                        loadPage(initialPage, false);
                    } else {
                        if (bgm) bgm.play().catch(() => { });
                        setTimeout(() => loadPage(initialPage, false), 400);
                    }
                } else {
                    window.__pendingDeferredPage = initialPage;
                    if (!skipped && bgm) bgm.play().catch(() => { });
                }
            } else {
                // Renderer already available — load immediately.
                if (skipped) {
                    loadPage(initialPage, false);
                } else {
                    if (bgm) bgm.play().catch(() => { });
                    setTimeout(() => loadPage(initialPage, false), 400);
                }
            }
        });
    }

    const startAudioOnInteraction = () => {
        if (window.audioUnlocked && bgm && bgm.paused) {
            bgm.play().catch(() => { });
        }
    };
    window.addEventListener('mousedown', startAudioOnInteraction, true);
    window.addEventListener('keydown', startAudioOnInteraction, true);

    const lowEndToggle = document.getElementById("low-end-toggle");
    const lowEndStatus = document.getElementById("low-end-status");
    if (lowEndToggle && lowEndStatus) {
        const isLowEnd = document.body.classList.contains("low-end-mode");
        lowEndToggle.classList.toggle("active", isLowEnd);
        lowEndStatus.textContent = isLowEnd ? 'ON' : 'OFF';
        lowEndToggle.addEventListener("click", () => {
            const active = document.body.classList.toggle("low-end-mode");
            lowEndToggle.classList.toggle("active", active);
            lowEndStatus.textContent = active ? 'ON' : 'OFF';
            localStorage.setItem("lowEndMode", active);
        });
    }


    const introToggle = document.getElementById("intro-toggle");
    const introStatus = document.getElementById("intro-status");
    if (introToggle && introStatus) {
        const isSkipped = localStorage.getItem("skipGarageIntro") === "true";
        const isOn = !isSkipped;

        if (isOn) introToggle.classList.add("active");
        introStatus.textContent = isOn ? 'ON' : 'OFF';

        introToggle.addEventListener("click", () => {
            const nowOn = introToggle.classList.toggle("active");
            introStatus.textContent = nowOn ? 'ON' : 'OFF';
            localStorage.setItem("skipGarageIntro", nowOn ? "false" : "true");
        });
    }

    const bgmUploadBtn = document.getElementById("bgm-upload-btn");
    const bgmResetBtn = document.getElementById("bgm-reset-btn");
    const bgmUpload = document.getElementById("bgm-upload");

    let _audioDB = null;
    const getAudioDB = () => new Promise((resolve, reject) => {
        if (_audioDB) { resolve(_audioDB); return; }
        const req = indexedDB.open("audioStorage", 1);
        req.onupgradeneeded = (e) => e.target.result.createObjectStore("audio");
        req.onsuccess = (e) => { _audioDB = e.target.result; resolve(_audioDB); };
        req.onerror = () => reject(req.error);
    });

    const getCustomMusic = async () => {
        try {
            const db = await getAudioDB();
            return new Promise((resolve) => {
                const getReq = db.transaction("audio", "readonly").objectStore("audio").get("custom_bgm");
                getReq.onsuccess = () => resolve(getReq.result);
                getReq.onerror = () => resolve(null);
            });
        } catch (_) { return null; }
    };

    const saveCustomMusic = async (data) => {
        const db = await getAudioDB();
        return new Promise((resolve) => {
            const tx = db.transaction("audio", "readwrite");
            tx.objectStore("audio").put(data, "custom_bgm");
            tx.oncomplete = () => resolve();
        });
    };

    const deleteCustomMusic = async () => {
        const db = await getAudioDB();
        return new Promise((resolve) => {
            const tx = db.transaction("audio", "readwrite");
            tx.objectStore("audio").delete("custom_bgm");
            tx.oncomplete = () => resolve();
        });
    };

    const setThemeTrack = (theme) => {
        if (!bgm || bgm.dataset.customUrl) return;

        const nextTrack = theme === 'frutiger-aero'
            ? 'sounds/aero-background.aac'
            : theme === 'christmas' ? 'sounds/christmas-background.aac' : 'sounds/background.aac';
        if (bgm.getAttribute('src') === nextTrack) return;

        const resumePlayback = window.audioUnlocked && !bgm.paused;
        bgm.pause();
        bgm.src = nextTrack;
        bgm.load();
        if (resumePlayback) bgm.play().catch(() => { });
    };

    const updateBGM = async () => {
        const customData = await getCustomMusic();
        if (customData && bgm) {
            const blob = new Blob([customData], { type: 'audio/aac' });
            const url = URL.createObjectURL(blob);
            if (bgm.dataset.customUrl) URL.revokeObjectURL(bgm.dataset.customUrl);
            bgm.src = url;
            bgm.dataset.customUrl = url;
            if (window.audioUnlocked) bgm.play().catch(() => { });
        } else {
            setThemeTrack(localStorage.getItem('visualTheme'));
        }
    };

    document.addEventListener('wantedThemeChanged', async (event) => {
        if (await getCustomMusic()) return;
        setThemeTrack(event.detail.theme);
    });

    if (bgmUploadBtn && bgmUpload) {
        bgmUploadBtn.addEventListener("click", () => bgmUpload.click());
        bgmUpload.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    await saveCustomMusic(event.target.result);
                    await updateBGM();
                };
                reader.readAsArrayBuffer(file);
            }
        });
    }

    if (bgmResetBtn) {
        bgmResetBtn.addEventListener("click", async () => {
            await deleteCustomMusic();
            if (bgm) {
                if (bgm.dataset.customUrl) URL.revokeObjectURL(bgm.dataset.customUrl);
                delete bgm.dataset.customUrl;
                const theme = localStorage.getItem('visualTheme');
                bgm.src = theme === 'frutiger-aero'
                    ? "sounds/aero-background.aac"
                    : theme === 'christmas' ? "sounds/christmas-background.aac" : "sounds/background.aac";
                if (window.audioUnlocked) bgm.play().catch(() => { });
            }
        });
    }

    updateBGM();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp, { once: true });
} else {
    initApp();
}