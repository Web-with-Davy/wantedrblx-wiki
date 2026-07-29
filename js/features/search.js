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
    const displayName = item.highlightedName || item.name || item.title || "";
    let visibleContent = `<h3>${displayName}</h3>`;
    let hiddenContent = '';
    let rarityKey = item.rarity || item.difficulty || item.team || null;
    let type = item.searchType;

    const folder = SEARCH_FOLDER_MAP[type];

    if (type === 'weapon') {
        const hasAttachments = item.attachments && Object.keys(item.attachments).length > 0;
        visibleContent = `
            ${hasAttachments ? '' : renderPriceTag(item.contractPrice)}
            <h3>${displayName}</h3>
        `;
        hiddenContent = `
            ${renderStat('Obtaining', item.obtaining)}
            ${renderStat('Location', item.location || (item.stats && item.stats.location))}
            ${renderStat('Re-Buy Price', formatPrice(item.reBuyPrice))}
            ${renderStat('Sell Price', formatPrice(item.sellPrice))}
            ${item.stats ? `
                ${renderStat('Ammo', item.stats.ammo)}
                ${renderStat('Ammo Cost', item.stats.ammoPrice)}
                ${renderStat('Damage', item.stats.damage)}
                ${renderStat('Fire Rate', item.stats.firerate)}
                ${item.stats.reload ? renderStat('Reload Speed', `${item.stats.reload}s`) : ''}
                ${renderStat('Accuracy', item.stats.accuracy)}
            ` : ''}
        `;
        return renderWeaponCard(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'vehicle') {
        visibleContent = `
            ${renderPriceTag(item.contractPrice)}
            <h3>${displayName}</h3>
        `;
        const isFlying = item.type === 'flying';
        hiddenContent = `
            ${renderStat('Obtaining', item.obtaining)}
            ${renderStat('Repair Price', formatPrice(item.repairPrice))}
            ${renderStat('Garage Repair Price', formatPrice(item.repairPriceGarage))}
            ${renderStatSuffix('Top Speed', item.stats.topSpeed, isFlying ? '%' : ' MPH')}
            ${isFlying ? `
                ${renderStatSuffix('Handling', item.stats.handling, '%')}
                ${renderStatSuffix('Spool Time', item.stats.spoolTime, 's')}
            ` : `
                ${renderStatSuffix('Acceleration', item.stats.acceleration, '%')}
                ${renderStatSuffix('Braking', item.stats.braking, '%')}
            `}
            ${renderStat('Health', item.stats.Health)}
            ${renderStat('Armor', item.stats.armor)}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'mission') {
        const title = item.title || item.name;
        const location = item.location;
        const description = item.description;
        const howToComplete = item.howToComplete;

        const formattedRewards = (item.rewards || []).map(formatReward).join(', ');

        visibleContent = `
            <h3>${title}</h3>
        `;
        hiddenContent = `
            ${renderStat('Location', location)}
            ${renderStat('Description', description)}
            ${renderStat('How', howToComplete)}
            ${renderStat('Reward', formattedRewards)}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'valuable') {
        visibleContent = `
            <h3>${displayName}</h3>
            ${renderStat('Sell Price', formatPrice(item.price))}
        `;
        hiddenContent = `
            ${renderStatSuffix('Weight', item.weight, ' kg')}
            ${renderStat('Common Location', item.commonLocation)}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'npc') {
        hiddenContent = `
            ${renderStat('Location', item.location)}
            ${renderStat('Description', item.description)}
        `;
        return renderNPCCard(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'event') {
        const title = item.title || item.name;
        const description = item.description;
        visibleContent = `<h3>${title}</h3>`;
        hiddenContent = `
            ${renderStat('Description', description)}
        `;
        return renderEventCard(item, visibleContent, hiddenContent, folder);

    } else if (type === 'atm') {
        visibleContent = `
            <h3>${displayName}</h3>
            ${renderStat('Value', formatPrice(item.price))}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, '', folder);

    } else if (type === 'guncrate') {
        const name = item.name || item.title;
        const gun = item.gun;
        const cooldown = item.cooldown;
        const location = item.location;

        visibleContent = `
            <h3>${name}</h3>
        `;
        hiddenContent = `
            ${renderStat('Content', gun)}
            ${renderStat('Cooldown', cooldown)}
            ${renderStat('Location', location)}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);

    } else {
        const name = item.name || item.title;
        const description = item.description;

        visibleContent = `<h3>${name}</h3>`;
        hiddenContent = description ? renderStat('Description', description) : '';
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);
    }
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
    checkData((typeof GUN_CRATES_DATA !== 'undefined' ? GUN_CRATES_DATA : window.GUN_CRATES), 'guncrate', 'GUN CRATE');
    checkData((typeof VALUABLES_DATA !== 'undefined' ? VALUABLES_DATA : window.VALUABLES), 'valuable', 'VALUABLE');
    checkData((typeof MISSIONS_DATA !== 'undefined' ? MISSIONS_DATA : window.MISSIONS), 'mission', 'MISSION');
    checkData((typeof NPCS_DATA !== 'undefined' ? NPCS_DATA : window.NPCS), 'npc', 'NPC');
    const locationsForSearch = (typeof MAP_PINS !== 'undefined' ? MAP_PINS.map(p => ({ name: p.name })) : []);
    checkData(locationsForSearch, 'location', 'LOCATION');
    checkData((typeof EVENTS_DATA !== 'undefined' ? EVENTS_DATA : []), 'event', 'EVENT');

    if (results.length === 0) {
        container.innerHTML = `<h2>NO MATCHES FOUND</h2><p style="text-align:center; color:#888;">No entries match "${query}"</p>`;
        return;
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const cardsHTML = results.map(item => {
        const highlightedName = item.name.replace(regex, '<span class="highlight">$1</span>');
        const itemWithHighlight = { ...item, highlightedName };
        return renderSearchItem(itemWithHighlight);
    }).join('');

    container.innerHTML = `<h2>SEARCH RESULTS: "${query}"</h2><div class="card-grid">${cardsHTML}</div>`;

    const cards = container.querySelectorAll('.card');
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
