const SEARCH_FOLDER_MAP = {
    'weapon': 'weapons',
    'vehicle': 'vehicles',
    'atm': 'atms',
    'valuable': 'valuables',
    'guncrate': 'crates',
    'mission': 'missions',
    'npc': 'npcs',
    'location': 'locations',
    'event': 'events'
};

function initSearch(container, renderSearchItem) {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            const activeTab = document.querySelector(".tab.active");
            if (activeTab) window.loadPage(activeTab.dataset.page);
            return;
        }

        container.innerHTML = '<div class="loading glitch" data-text="SEARCHING...">SEARCHING DATABASE...</div>';
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            performSearch(query, container, renderSearchItem);
        }, 300);
    });
}

function renderSearchItem(item) {
    const type = item.searchType;
    const displayName = item.highlightedName || item.name || item.title || '';

    if (type === 'weapon' && typeof makeWeaponCard === 'function') return makeWeaponCard(item, displayName);
    if (type === 'vehicle' && typeof makeVehicleCard === 'function') return makeVehicleCard(item, displayName);
    if (type === 'mission' && typeof makeMissionCard === 'function') return makeMissionCard(item, displayName);
    if (type === 'valuable' && typeof makeValuableCard === 'function') return makeValuableCard(item, displayName);
    if (type === 'npc' && typeof makeNPCCard === 'function') return makeNPCCard(item, displayName);
    if (type === 'atm' && typeof makeATMCard === 'function') return makeATMCard(item, displayName);
    if (type === 'vault' && typeof makeVaultCard === 'function') return makeVaultCard(item, displayName);
    if (type === 'guncrate' && typeof makeGunCrateCard === 'function') return makeGunCrateCard(item, displayName);
    if (type === 'event' && typeof makeEventCard === 'function') return makeEventCard(item, displayName);
    if (type === 'store' && typeof makeStoreCard === 'function') return makeStoreCard(item, displayName);

    const folder = SEARCH_FOLDER_MAP[type] || '';
    return makeUniversalCard(item, {
        folder,
        rarityKey: null,
        displayName,
        visibleStats: [],
        hiddenStats: item.description ? [{ label: 'Description', value: item.description }] : []
    });
}

function performSearch(query, container, renderSearchItem) {
    const results = [];
    const checkData = (data, searchType, categoryLabel) => {
        if (typeof data !== 'undefined' && Array.isArray(data)) {
            data.forEach(item => {
                const itemName = item.name || item.title || "";
                if (itemName.toLowerCase().includes(query)) {
                    results.push({ ...item, name: itemName, searchType, categoryLabel });
                }
            });
        }
    };

    checkData((typeof GUNS_DATA !== 'undefined' ? GUNS_DATA : []), 'weapon', 'WEAPON');
    checkData((typeof EXPLOSIVES_DATA !== 'undefined' ? EXPLOSIVES_DATA : []), 'weapon', 'WEAPON');
    checkData((typeof TOOLS_DATA !== 'undefined' ? TOOLS_DATA : []), 'weapon', 'WEAPON');
    checkData((typeof VEHICLES_DATA !== 'undefined' ? VEHICLES_DATA : window.VEHICLES), 'vehicle', 'VEHICLE');
    checkData((typeof ATMS_DATA !== 'undefined' ? ATMS_DATA : window.ATMS), 'atm', 'ATM');
    checkData((typeof VAULTS_DATA !== 'undefined' ? VAULTS_DATA : []), 'vault', 'VAULT');
    checkData((typeof GUN_CRATES_DATA !== 'undefined' ? GUN_CRATES_DATA : window.GUN_CRATES), 'guncrate', 'GUN CRATE');
    checkData((typeof VALUABLES_DATA !== 'undefined' ? VALUABLES_DATA : window.VALUABLES), 'valuable', 'VALUABLE');
    checkData((typeof MISSIONS_DATA !== 'undefined' ? MISSIONS_DATA : window.MISSIONS), 'mission', 'MISSION');
    checkData((typeof NPCS_DATA !== 'undefined' ? NPCS_DATA : window.NPCS), 'npc', 'NPC');
    const locationsForSearch = (typeof MAP_PINS !== 'undefined' ? MAP_PINS.map(p => ({ name: p.name })) : []);
    checkData(locationsForSearch, 'location', 'LOCATION');
    checkData((typeof EVENTS_DATA !== 'undefined' ? EVENTS_DATA : []), 'event', 'EVENT');
    checkData((typeof STORE_DATA !== 'undefined' ? STORE_DATA : []), 'store', 'STORE');

    if (results.length === 0) {
        container.innerHTML = `<h2>NO MATCHES FOUND</h2><p style="text-align:center; color:#888;">No entries match "${query}"</p>`;
        return;
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const cardsHTML = results.map(item => {
        // highlightedName is HTML — kept separate from item.name (plain text)
        const highlightedName = item.name.replace(regex, '<span class="highlight">$1</span>');
        return renderSearchItem({ ...item, highlightedName });
    }).join('');

    container.innerHTML = `<h2>SEARCH RESULTS: "${query}"</h2><div class="val-grid">${cardsHTML}</div>`;

    const cards = container.querySelectorAll('.val-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) skew(-1deg)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.opacity = '1';
            card.style.transform = '';
        }, index * 20);
    });
}
window.renderSearchItem = renderSearchItem;
