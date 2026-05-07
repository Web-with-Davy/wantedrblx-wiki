const container = document.getElementById("page-container");
const bgm = document.getElementById("bgm");
const loadSfx = document.getElementById("sfx-load");
const clickSfx = document.getElementById("sfx-click");
const hoverSfx = document.getElementById("sfx-hover");
const volumeSlider = document.getElementById("bgm-volume");
const sizeSlider = document.getElementById("card-size-slider");

window.audioUnlocked = false;

window.loadPage = loadPage;
window.toggleCardDetails = toggleCardDetails;

function getCurrentPage() {
    const validPages = ["home", "valuables", "atms", "weapons", "vehicles", "gun-crates", "missions", "npcs", "locations", "store", "events", "promo-codes"];
    const hash = window.location.hash.replace(/^#/, '');
    const path = window.location.pathname.replace(/\/$/, '').split('/').pop().replace('.html', '');
    if (validPages.includes(hash)) return hash;
    if (validPages.includes(path)) return path;
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

        if (saveToHistory) {
            try {
                const isFileProtocol = window.location.protocol === 'file:';
                const url = isFileProtocol
                    ? (page === "home" ? "#" : `#${page}`)
                    : (page === "home" ? "/" : `/${page}`);
                window.history.pushState({ page }, "", url);
            } catch (e) {
                console.warn("History API pushState failed, falling back to hash.");
                window.location.hash = page === "home" ? "" : page;
            }
        }

        if (page === "home") {
            if (typeof initCountdownTimer === "function") initCountdownTimer();
            if (typeof updateVisitorDisplay === "function") updateVisitorDisplay(window.visitorCountCached || "---");
        }

        const cards = container.querySelectorAll('.card');

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
    const validPages = ["home", "valuables", "atms", "weapons", "vehicles", "gun-crates", "missions", "npcs", "locations", "store", "events", "promo-codes"];
    let page = (event.state && event.state.page);

    if (!page) {
        const hash = window.location.hash.replace(/^#/, '');
        const path = window.location.pathname.replace(/\/$/, '').split('/').pop().replace('.html', '');
        if (validPages.includes(hash)) page = hash;
        else if (validPages.includes(path)) page = path;
        else page = "home";
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

function toggleCardDetails(cardId, btn) {
    const detailsElement = document.getElementById(`${cardId}-details`);
    const button = btn || (window.event ? window.event.target : null);
    if (!detailsElement || !button) return;

    const isCollapsed = detailsElement.classList.toggle('collapsed');
    button.textContent = isCollapsed
        ? (typeof t === 'function' ? t('show_more') : 'Show more...')
        : (typeof t === 'function' ? t('show_less') : 'Show less');
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof i18n !== 'undefined') i18n.init();
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
        const isMobile = window.matchMedia('(max-width: 1024px)').matches;
        const defaultSize = isMobile ? 150 : 200;
        const savedSize = localStorage.getItem("cardSize") || defaultSize;
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
            if (!window.audioUnlocked) return;
            loadPage(tab.dataset.page);
        });
    });


    document.addEventListener('click', (e) => {
        const item = e.target.closest('.tab-dropdown-item[data-page], .tab-direct[data-page]');
        if (item && window.audioUnlocked) {
            e.preventDefault();
            loadPage(item.dataset.page);
        }
    });

    if (typeof initGarage === 'function') {
        initGarage((skipped) => {
            window.audioUnlocked = true;

            const validPages = ["home", "valuables", "atms", "weapons", "vehicles", "gun-crates", "missions", "npcs", "locations", "store", "events", "promo-codes"];
            const hash = window.location.hash.replace(/^#/, '');
            const path = window.location.pathname.replace(/\/$/, '').split('/').pop().replace('.html', '');

            let initialPage = "home";
            if (validPages.includes(hash)) initialPage = hash;
            else if (validPages.includes(path)) initialPage = path;

            const targetTab = document.querySelector(`.tab[data-page="${initialPage}"]`);
            if (targetTab) {
                targetTab.classList.add("active");
            }

            if (skipped) {
                loadPage(initialPage, false);
            } else {
                if (bgm) {
                    bgm.play().catch(() => { });
                }

                setTimeout(() => {
                    loadPage(initialPage, false);
                }, 400);
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
            lowEndStatus.textContent = typeof t === 'function' ? t('toggle_on') : 'ON';
        }
        lowEndToggle.addEventListener("click", () => {
            const active = document.body.classList.toggle("low-end-mode");
            lowEndToggle.classList.toggle("active", active);
            lowEndStatus.textContent = active
                ? (typeof t === 'function' ? t('toggle_on') : 'ON')
                : (typeof t === 'function' ? t('toggle_off') : 'OFF');
            localStorage.setItem("lowEndMode", active);
        });
    }

    const showMoreToggle = document.getElementById("always-show-more-toggle");
    const showMoreStatus = document.getElementById("always-show-more-status");
    if (showMoreToggle && showMoreStatus) {
        const isAlwaysShow = localStorage.getItem("alwaysShowMore") === "true";
        if (isAlwaysShow) {
            document.body.classList.add("always-show-more");
            showMoreToggle.classList.add("active");
            showMoreStatus.textContent = typeof t === 'function' ? t('toggle_on') : 'ON';
        }
        showMoreToggle.addEventListener("click", () => {
            const active = document.body.classList.toggle("always-show-more");
            showMoreToggle.classList.toggle("active", active);
            showMoreStatus.textContent = active
                ? (typeof t === 'function' ? t('toggle_on') : 'ON')
                : (typeof t === 'function' ? t('toggle_off') : 'OFF');
            localStorage.setItem("alwaysShowMore", active);

            const activeTab = document.querySelector(".tab.active");
            if (activeTab) loadPage(activeTab.dataset.page);
        });
    }

    const introToggle = document.getElementById("intro-toggle");
    const introStatus = document.getElementById("intro-status");
    if (introToggle && introStatus) {
        const isSkipped = localStorage.getItem("skipGarageIntro") === "true";
        const isOn = !isSkipped;

        if (isOn) introToggle.classList.add("active");
        introStatus.textContent = isOn
            ? (typeof t === 'function' ? t('toggle_on') : 'ON')
            : (typeof t === 'function' ? t('toggle_off') : 'OFF');

        introToggle.addEventListener("click", () => {
            const nowOn = introToggle.classList.toggle("active");
            introStatus.textContent = nowOn
                ? (typeof t === 'function' ? t('toggle_on') : 'ON')
                : (typeof t === 'function' ? t('toggle_off') : 'OFF');
            localStorage.setItem("skipGarageIntro", nowOn ? "false" : "true");
        });
    }

    // Custom Background Music Logic
    const bgmUploadBtn = document.getElementById("bgm-upload-btn");
    const bgmResetBtn = document.getElementById("bgm-reset-btn");
    const bgmUpload = document.getElementById("bgm-upload");

    const getCustomMusic = async () => {
        return new Promise((resolve) => {
            const request = indexedDB.open("audioStorage", 1);
            request.onupgradeneeded = (e) => e.target.result.createObjectStore("audio");
            request.onsuccess = (e) => {
                const db = e.target.result;
                const tx = db.transaction("audio", "readonly");
                const getReq = tx.objectStore("audio").get("custom_bgm");
                getReq.onsuccess = () => resolve(getReq.result);
                getReq.onerror = () => resolve(null);
            };
            request.onerror = () => resolve(null);
        });
    };

    const saveCustomMusic = async (data) => {
        return new Promise((resolve) => {
            const request = indexedDB.open("audioStorage", 1);
            request.onupgradeneeded = (e) => e.target.result.createObjectStore("audio");
            request.onsuccess = (e) => {
                const db = e.target.result;
                const tx = db.transaction("audio", "readwrite");
                tx.objectStore("audio").put(data, "custom_bgm");
                tx.oncomplete = () => resolve();
            };
        });
    };

    const deleteCustomMusic = async () => {
        return new Promise((resolve) => {
            const request = indexedDB.open("audioStorage", 1);
            request.onsuccess = (e) => {
                const db = e.target.result;
                const tx = db.transaction("audio", "readwrite");
                tx.objectStore("audio").delete("custom_bgm");
                tx.oncomplete = () => resolve();
            };
        });
    };

    const updateBGM = async () => {
        const customData = await getCustomMusic();
        if (customData && bgm) {
            const blob = new Blob([customData], { type: 'audio/mpeg' });
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
                bgm.src = "sounds/background.mp3";
                if (window.audioUnlocked) bgm.play().catch(() => { });
            }
        });
    }

    updateBGM();
});