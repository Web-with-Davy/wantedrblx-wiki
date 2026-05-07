const UPDATES = [
    { version: "D.30/M.04/Y.2026", description: "Unknown Update...", color: "#000000ff", color2: "#ffffffff" },
    { version: "D.18/M.04/Y.2026", description: "Bayview Revamp", color: "#006affff", color2: "#ffffffff" },
    { version: "D.03/M.04/Y.2026", description: "Easter Event", color: "#ff80f7ff", color2: "#ffffffff" },
    { version: "D.20/M.03/Y.2026", description: "Airdrop Update", color: "#ff0000ff", color2: "#ffffffff" },
    // { version: "D.06/M.03/Y.2026", description: "Zoro and Zorvello Cars Update", color: "#f97316ff", color2: "#ffffffff" },
    // { version: "D.20/M.02/Y.2026", description: "Docks & Jewerly Update", color: "#00e1ffff", color2: "#ffffffff" },
    // { version: "D.12/M.12/Y.2025", description: "Christmas Event", color: "#00ffaaff", color2: "#ffffffff" }
];

const COUNTDOWN_TARGET = new Date('2026-05-30T20:00:00+03:00');
window.COUNTDOWN_TARGET = COUNTDOWN_TARGET;

function renderHome() {

    const updatesHTML = UPDATES.map(update => {
        const isRainbow = !!update.color2;
        const colorVars = isRainbow ? `--color-1: ${update.color}; --color-2: ${update.color2};` : '';
        const textClass = isRainbow ? 'rainbow-text' : '';
        const textColorStyle = isRainbow ? '' : `color: ${update.color};`;

        return `
        <div class="update-row">
            <div class="update-dot" style="background: ${update.color}; box-shadow: 0 0 6px ${update.color};"></div>
            <div>
                <div class="update-version ${textClass}" style="${colorVars}${textColorStyle}">
                    ${update.version}
                </div>
                <div class="update-desc">${update.description}</div>
            </div>
        </div>
    `;
    }).join('');

    const renderStaffItem = (person, type) => {
        const filenameName = (person.name || "").toLowerCase().replace(/\s+/g, '');
        const roleText = type === 'contributor' ? person.contributions : (person.title || 'STAFF');

        let nameColorStyle = '';
        if (person.name === 'Davy' || type === 'manager') {
            nameColorStyle = 'style="color: #ffd700;"';
        } else if (type === 'staff') {
            nameColorStyle = 'style="color: #b266ff;"';
        } else if (type === 'contributor') {
            nameColorStyle = 'style="color: #ff8c1a;"';
        }

        return `
            <div class="staff-inline-item">
                <img src="images/contributors/${filenameName}.jpg" alt="${person.name}" class="staff-inline-avatar" onerror="this.src='images/wikiadmin.png'">
                <div class="staff-inline-name" ${nameColorStyle}>${person.name}</div>
                <div class="staff-inline-role">${roleText}</div>
            </div>
        `;
    };

    const videosHTML = (window.VIDEOS_DATA || VIDEOS_DATA || []).map(v => `
        <a href="${v.link}" target="_blank" class="featured-video-card">
            <div class="video-thumb-container">
                <img src="${v.thumbnail}" alt="${v.title}" class="video-thumbnail">
                <div class="video-play-overlay"><span>▶</span></div>
            </div>
            <div class="video-title-card">${v.title}</div>
        </a>
    `).join('');

    const managersHTML = (window.CONTRIBUTORS_DATA?.managers || CONTRIBUTORS_DATA?.managers || []).map(p => renderStaffItem(p, 'manager')).join('');
    const staffHTML = (window.CONTRIBUTORS_DATA?.staff || CONTRIBUTORS_DATA?.staff || []).map(p => renderStaffItem(p, 'staff')).join('');
    const inlineContributorsHTML = (window.CONTRIBUTORS_DATA?.contributors || CONTRIBUTORS_DATA?.contributors || []).map(p => renderStaffItem(p, 'contributor')).join('');

    return `
        <div class="home-container">
            <div class="home-main-content">
                <div class="hero-section">
                    <div class="hero-bg"></div>
                    <div class="hero-logo-container">
                        <img src="images/logo.png" alt="WANTED Logo" class="hero-logo">
                    </div>
                    <h1 class="hero-title">${t('home_hero_title')}</h1>
                    <p class="hero-text">
                        ${t('home_hero_text')}<br><br>
                        ${t('home_hero_disclaimer')}
                    </p>
                    <div class="play-btn-container">
                        <a href="https://www.roblox.com/games/14438406081/Wanted" target="_blank" class="play-btn">${t('home_play_btn')}</a>
                    </div>
                </div>

                <div class="main-grid-container">
                    <div class="main-grid-col">
                        <div class="grid-header">
                            <h2 class="grid-title"><span class="cat-icon">⚔️</span> ${t('nav_combat')}</h2>
                            <div class="grid-nav-arrows">
                                <span onclick="scrollCardGrid('grid-combat',-1)">&lt;</span>
                                <span onclick="scrollCardGrid('grid-combat',1)">&gt;</span>
                            </div>
                        </div>
                        <div class="inner-card-grid" id="grid-combat">
                            <div class="home-category-card" onclick="goToTab('weapons')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_weapons')}</h3>
                                    <span class="cat-icon">🔫</span>
                                </div>
                                <p class="cat-desc">${t('home_combat_desc')}</p>
                            </div>
                            <div class="home-category-card" onclick="goToTab('vehicles')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_vehicles')}</h3>
                                    <span class="cat-icon">🚗</span>
                                </div>
                                <p class="cat-desc">${t('home_vehicles_desc')}</p>
                            </div>
                            <div class="home-category-card" onclick="goToTab('gun-crates')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_gun_crates')}</h3>
                                    <span class="cat-icon">📦</span>
                                </div>
                                <p class="cat-desc">${t('home_gun_crates_desc')}</p>
                            </div>
                        </div>
                    </div>

                    <div class="main-grid-col">
                        <div class="grid-header">
                            <h2 class="grid-title"><span class="cat-icon">🌍</span> ${t('nav_world')}</h2>
                            <div class="grid-nav-arrows">
                                <span onclick="scrollCardGrid('grid-world',-1)">&lt;</span>
                                <span onclick="scrollCardGrid('grid-world',1)">&gt;</span>
                            </div>
                        </div>
                        <div class="inner-card-grid" id="grid-world">
                            <div class="home-category-card" onclick="goToTab('locations')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_locations')}</h3>
                                    <span class="cat-icon">🗺️</span>
                                </div>
                                <p class="cat-desc">${t('home_locations_desc')}</p>
                            </div>
                            <div class="home-category-card" onclick="goToTab('npcs')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_npcs')}</h3>
                                    <span class="cat-icon">👥</span>
                                </div>
                                <p class="cat-desc">${t('home_npcs_desc')}</p>
                            </div>
                            <div class="home-category-card" onclick="goToTab('missions')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_missions')}</h3>
                                    <span class="cat-icon">📋</span>
                                </div>
                                <p class="cat-desc">${t('home_missions_desc')}</p>
                            </div>
                            <div class="home-category-card" onclick="goToTab('events')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_events')}</h3>
                                    <span class="cat-icon">🌍</span>
                                </div>
                                <p class="cat-desc">${t('home_events_desc')}</p>
                            </div>
                        </div>
                    </div>

                    <div class="main-grid-col">
                        <div class="grid-header">
                            <h2 class="grid-title"><span class="cat-icon">💰</span> ${t('nav_economy')}</h2>
                            <div class="grid-nav-arrows">
                                <span onclick="scrollCardGrid('grid-economy',-1)">&lt;</span>
                                <span onclick="scrollCardGrid('grid-economy',1)">&gt;</span>
                            </div>
                        </div>
                        <div class="inner-card-grid" id="grid-economy">
                            <div class="home-category-card" onclick="goToTab('atms')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_atms')}</h3>
                                    <span class="cat-icon">🏧</span>
                                </div>
                                <p class="cat-desc">${t('home_atms_desc')}</p>
                            </div>
                            <div class="home-category-card" onclick="goToTab('store')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_store')}</h3>
                                    <span class="cat-icon">🛒</span>
                                </div>
                                <p class="cat-desc">${t('home_store_desc')}</p>
                            </div>
                            <div class="home-category-card" onclick="goToTab('valuables')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_valuables')}</h3>
                                    <span class="cat-icon">💎</span>
                                </div>
                                <p class="cat-desc">${t('home_valuables_desc')}</p>
                            </div>
                            <div class="home-category-card" onclick="goToTab('promo-codes')">
                                <div class="cat-header">
                                    <h3 class="cat-title">${t('nav_promo_codes')}</h3>
                                    <span class="cat-icon">🏷️</span>
                                </div>
                                <p class="cat-desc">${t('home_promo_codes_desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="videos-section">
                    <div class="sidebar-block" style="width: 100%;">
                        <h2 class="sidebar-title">${t('home_featured_videos')}</h2>
                        <div class="video-list-container video-row-flex">
                            ${videosHTML}
                        </div>
                    </div>
                </div>
            </div>

            <div class="home-admin-sidebar">
                <div class="admin-section">
                    <div class="sidebar-block">
                        <h2 class="sidebar-title">${t('home_recent_updates')}</h2>
                        <div class="sidebar-box">
                            <div class="updates-list sidebar-updates-list">
                                ${updatesHTML}
                            </div>
                        </div>
                    </div>

                    <div class="sidebar-block">
                        <div class="sidebar-box countdown-box" style="width: 100%;">
                            <div class="countdown-header">
                                <span class="countdown-icon">⏱</span>
                                <h3 class="countdown-title">${t('home_next_update')}</h3>
                            </div>
                            <div id="countdown-display" class="countdown-display">
                                <div class="countdown-time">${t('home_calculating')}</div>
                            </div>
                        </div>
                    </div>

                    <div class="sidebar-block">
                        <h2 class="sidebar-title">${t('home_wiki_contributors')}</h2>
                        <div class="sidebar-box staff-group-box">
                            <div class="staff-inline-grid" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
                                ${managersHTML}
                                <div class="staff-divider"></div>
                                ${staffHTML}
                                ${inlineContributorsHTML}
                            </div>
                        </div>
                    </div>

                    <div class="sidebar-block">
                        <div class="sidebar-box views-box" style="width: 100%;">
                            <div class="views-header" style="justify-content: center;">
                                <h3 class="views-title">${t('home_viewers_title')}</h3>
                            </div>
                            <div class="views-display">
                                <div id="visitor-count" class="views-count">---</div>
                                <div class="views-subtext">${t('home_viewers_subtext')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function scrollCardGrid(gridId, direction) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const card = grid.firstElementChild;
    if (!card) return;
    const cardWidth = card.offsetWidth + 10;
    const scrollAmount = cardWidth * 2 * direction;
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

window.scrollCardGrid = scrollCardGrid;

function goToTab(tabId) {
    if (typeof window.switchTab === 'function') {
        window.switchTab(tabId);
        return;
    }
    const navTab = document.querySelector(
        `.tab[data-tab="${tabId}"], .tab[href="#${tabId}"], [data-tab="${tabId}"]`
    );
    if (navTab) {
        navTab.click();
    }
}

window.goToTab = goToTab;