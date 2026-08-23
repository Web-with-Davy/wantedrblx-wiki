const container = document.getElementById("page-container");
const bgm = document.getElementById("bgm");
const loadSfx = document.getElementById("sfx-load");
const clickSfx = document.getElementById("sfx-click");
const hoverSfx = document.getElementById("sfx-hover");
const volumeSlider = document.getElementById("bgm-volume");
const sizeSlider = document.getElementById("card-size-slider");

window.audioUnlocked = false;

window.loadPage = loadPage;

const VALID_PAGES = ["home", "valuables", "atms", "weapons", "vehicles", "gun-crates", "missions", "npcs", "locations", "store", "events", "promo-codes"];
const PAGE_NAMES = {
    home: 'HOME', valuables: 'VALUABLES', atms: 'ATMs & VAULTS',
    weapons: 'WEAPONS', vehicles: 'VEHICLES', 'gun-crates': 'GUN CRATES',
    missions: 'MISSIONS', npcs: 'NPCs', locations: 'LOCATIONS',
    store: 'STORE', events: 'EVENTS', 'promo-codes': 'PROMO CODES'
};

function getCurrentPage() {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash.startsWith('item/')) return null;
    if (VALID_PAGES.includes(hash)) return hash;
    return 'home';
}
window.getCurrentPage = getCurrentPage;

function loadPage(page, saveToHistory = true) {
    if (saveToHistory && typeof saveToHistory === 'object') saveToHistory = true;
    if (!container) return;


    document.querySelectorAll(".tab[data-page]").forEach(t => {
        t.classList.toggle("active", t.dataset.page === page);
    });

    document.querySelectorAll(".tab-dropdown-item[data-page]").forEach(item => {
        const isActive = item.dataset.page === page;
        item.classList.toggle("active", isActive);
        const trigger = item.closest('.tab-group')?.querySelector('.tab-dropdown-trigger');
        if (trigger) trigger.classList.toggle("active", isActive);
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
                case "events": content = typeof renderEvents === "function" ? renderEvents() : ""; break;
                case "promo-codes": content = typeof renderPromoCodes === "function" ? renderPromoCodes() : ""; break;
                default: content = `<h2>Work In Progress</h2><p>Under construction...</p>`;
            }
        } catch (e) {
            console.error("Error rendering page:", page, e);
            content = `<h2>ERROR</h2><p>Failed to load ${page}. Check console for details.</p>`;
        }

        container.innerHTML = content;

        const pageLabel = document.getElementById('page-label');
        if (pageLabel) pageLabel.textContent = PAGE_NAMES[page] || page.toUpperCase();
        const breadcrumb = document.getElementById('page-breadcrumb');
        if (breadcrumb) {
            breadcrumb.classList.add('visible');
            clearTimeout(breadcrumb._hideTimer);
            breadcrumb._hideTimer = setTimeout(() => breadcrumb.classList.remove('visible'), 1200);
        }

        if (saveToHistory) {
            const url = page === "home" ? "#" : `#${page}`;
            window.history.pushState({ page }, "", url);
        }

        document.dispatchEvent(new CustomEvent('wantedPageChanged', { detail: { page } }));

        if (page === "home") {
            if (typeof initCountdownTimer === "function") initCountdownTimer();
            if (typeof updateVisitorDisplay === "function") updateVisitorDisplay(window.visitorCountCached || "---");
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
                    card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    card.style.opacity = '1';
                    card.style.transform = '';
                }, index * 20);
            });
        });
    }, isLowEnd ? 0 : 150);
}

window.addEventListener("popstate", (event) => {
    const hash = window.location.hash.replace(/^#/, '');

    if (hash.startsWith('item/') && typeof _handleItemPageHash === 'function') {
        if (_handleItemPageHash(hash)) return;
    }

    let page = (event.state && event.state.page);
    if (!page) {
        page = VALID_PAGES.includes(hash) ? hash : "home";
    }

    loadPage(page, false);
});

function updateVisitorDisplay(count) {
    window.visitorCountCached = count;
    const counterValue = document.getElementById('visitor-count');
    if (counterValue) {
        counterValue.textContent = count;
    }
}


document.addEventListener('DOMContentLoaded', () => {

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

    if (typeof trackVisit === 'function') trackVisit(updateVisitorDisplay);

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

    document.querySelectorAll(".tab[data-page]").forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            loadPage(tab.dataset.page);
        });
    });


    document.addEventListener('click', (e) => {
        const item = e.target.closest('.tab-dropdown-item[data-page], .tab-direct[data-page]');
        if (item) {
            e.preventDefault();
            loadPage(item.dataset.page);
        }
    });

    // Pages whose renderers are loaded in the deferred (non-critical) bundle.
    const DEFERRED_PAGES = ["atms", "events", "gun-crates", "locations", "missions", "npcs", "store", "valuables", "vehicles", "weapons"];

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

            const hash = window.location.hash.replace(/^#/, '');

            if (hash.startsWith('item/') && typeof _handleItemPageHash === 'function') {
                if (!skipped && bgm) bgm.play().catch(() => { });
                setTimeout(() => _handleItemPageHash(hash), skipped ? 0 : 400);
                return;
            }

            const initialPage = VALID_PAGES.includes(hash) ? hash : "home";

            const targetTab = document.querySelector(`.tab[data-page="${initialPage}"]`);
            if (targetTab) {
                targetTab.classList.add("active");
            }

            // Check renderer readiness using the actual function names (avoids case mismatch like renderAtms vs renderATMs).
            const RENDERER_MAP = {
                home: 'renderHome', valuables: 'renderValuables', atms: 'renderATMs',
                weapons: 'renderWeapons', vehicles: 'renderVehicles', 'gun-crates': 'renderGunCrates',
                missions: 'renderMissions', npcs: 'renderNPCs', locations: 'renderLocations',
                store: 'renderStore', events: 'renderEvents', 'promo-codes': 'renderPromoCodes'
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
        const isLowEnd = localStorage.getItem("lowEndMode") === "true";
        if (isLowEnd) {
            document.body.classList.add("low-end-mode");
            lowEndToggle.classList.add("active");
            lowEndStatus.textContent = 'ON';
        }
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

    const updateBGM = async () => {
        const customData = await getCustomMusic();
        if (customData && bgm) {
            const blob = new Blob([customData], { type: 'audio/aac' });
            const url = URL.createObjectURL(blob);
            if (bgm.dataset.customUrl) URL.revokeObjectURL(bgm.dataset.customUrl);
            bgm.src = url;
            bgm.dataset.customUrl = url;
            if (window.audioUnlocked) bgm.play().catch(() => { });
        }
    };

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
                bgm.src = "sounds/background.aac";
                if (window.audioUnlocked) bgm.play().catch(() => { });
            }
        });
    }

    updateBGM();
});