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

    const folderMap = {
        'weapon': 'weapons',
        'vehicle': 'vehicles',
        'atm': 'atms&vaults',
        'valuable': 'valuables',
        'guncrate': 'crates',
        'mission': 'missions',
        'npc': 'npcs',
        'location': 'locations',
        'event': 'events'
    };
    const folder = folderMap[type];

    if (type === 'weapon') {
        const hasAttachments = item.attachments && Object.keys(item.attachments).length > 0;
        visibleContent = `
            ${hasAttachments ? '' : renderPriceTag(item.contractPrice)}
            <h3>${displayName}</h3>
        `;
        hiddenContent = `
            ${renderStat(t('stat_obtaining'),  item.obtaining)}
            ${renderStat(t('stat_location'),   item.location || (item.stats && item.stats.location))}
            ${renderStat(t('stat_rebuy'),      formatPrice(item.reBuyPrice))}
            ${renderStat(t('stat_sell'),       formatPrice(item.sellPrice))}
            ${item.stats ? `
                ${renderStat(t('stat_ammo'),       item.stats.ammo)}
                ${renderStat(t('stat_ammo_cost'),  item.stats.ammoPrice)}
                ${renderStat(t('stat_damage'),     item.stats.damage)}
                ${renderStat(t('stat_rpm'),        item.stats.firerate)}
                ${item.stats.reload ? renderStat(t('stat_reload'), `${item.stats.reload}s`) : ''}
                ${renderStat(t('stat_accuracy'),   item.stats.accuracy)}
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
            ${renderStat(t('stat_obtaining'),     item.obtaining)}
            ${renderStat(t('stat_repair'),        formatPrice(item.repairPrice))}
            ${renderStat(t('stat_garage_repair'), formatPrice(item.repairPriceGarage))}
            ${renderStatSuffix(t('stat_top_speed'),   item.stats.topSpeed, isFlying ? '%' : ' MPH')}
            ${isFlying ? `
                ${renderStatSuffix(t('stat_handling'),    item.stats.handling, '%')}
                ${renderStatSuffix(t('stat_spool_time'),  item.stats.spoolTime, 's')}
            ` : `
                ${renderStatSuffix(t('stat_acceleration'),item.stats.acceleration, '%')}
                ${renderStatSuffix(t('stat_braking'),     item.stats.braking, '%')}
            `}
            ${renderStat(t('stat_health'), item.stats.Health)}
            ${renderStat(t('stat_armor'),      item.stats.armor)}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'mission') {
        const title = typeof tv === 'function' ? tv(item, 'title') : (item.title || item.name);
        const location = typeof tv === 'function' ? tv(item, 'location') : item.location;
        const description = typeof tv === 'function' ? tv(item, 'description') : item.description;
        const howToComplete = typeof tv === 'function' ? tv(item, 'howToComplete') : item.howToComplete;
        
        const formattedRewards = (item.rewards || []).map(formatReward).join(', ');

        visibleContent = `
            <h3>${title}</h3>
        `;
        hiddenContent = `
            ${renderStat(t('stat_location'), location)}
            ${renderStat(t('stat_description'), description)}
            ${renderStat(t('stat_how'), howToComplete)}
            ${renderStat(t('stat_reward'), formattedRewards)}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'valuable') {
        visibleContent = `
            <h3>${displayName}</h3>
            ${renderStat(t('stat_sell'), formatPrice(item.price))}
        `;
        hiddenContent = `
            ${renderStatSuffix(t('stat_weight'), item.weight, ' kg')}
            ${renderStat(t('stat_common_location'), typeof tv === 'function' ? tv(item, 'commonLocation') : item.commonLocation)}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'npc') {
        hiddenContent = `
            ${renderStat(t('stat_location'), item.location)}
            ${renderStat(t('stat_description'), item.description)}
        `;
        return renderNPCCard(item, rarityKey, visibleContent, hiddenContent, folder);

    } else if (type === 'event') {
        const title = typeof tv === 'function' ? tv(item, 'title') : (item.title || item.name);
        const description = typeof tv === 'function' ? tv(item, 'description') : item.description;
        visibleContent = `<h3>${title}</h3>`;
        hiddenContent = `
            ${renderStat(t('stat_description'), description)}
        `;
        return renderEventCard(item, visibleContent, hiddenContent, folder);

    } else if (type === 'atm') {
        visibleContent = `
            <h3>${displayName}</h3>
            ${renderStat(t('stat_value'), formatPrice(item.price))}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, '', folder);

    } else if (type === 'guncrate') {
        const name = typeof tv === 'function' ? tv(item, 'name') : (item.name || item.title);
        const gun = typeof tv === 'function' ? tv(item, 'gun') : item.gun;
        const cooldown = typeof tv === 'function' ? tv(item, 'cooldown') : item.cooldown;
        const location = typeof tv === 'function' ? tv(item, 'location') : item.location;

        visibleContent = `
            <h3>${name}</h3>
        `;
        hiddenContent = `
            ${renderStat(t('stat_content'),  gun)}
            ${renderStat(t('stat_cooldown'), cooldown)}
            ${renderStat(t('stat_location'), location)}
        `;
        return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);

    } else {
        // Fallback for location or unknown types
        const name = typeof tv === 'function' ? tv(item, 'name') : (item.name || item.title);
        const description = typeof tv === 'function' ? tv(item, 'description') : item.description;
        
        visibleContent = `<h3>${name}</h3>`;
        hiddenContent = description ? renderStat(t('stat_description'), description) : '';
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
    checkData((typeof LOCATIONS_DATA !== 'undefined' ? LOCATIONS_DATA : window.LOCATIONS), 'location', 'LOCATION');
    checkData((typeof EVENTS_DATA !== 'undefined' ? EVENTS_DATA : []), 'event', 'EVENT');

    if (results.length === 0) {
        container.innerHTML = `<h2>NO MATCHES FOUND</h2><p style="text-align:center; color:#888;">No entries match "${query}"</p>`;
        return;
    }

    const cardsHTML = results.map(item => {
        const regex = new RegExp(`(${query})`, 'gi');
        const highlightedName = item.name.replace(regex, '<span class="highlight">$1</span>');
        const itemWithHighlight = { ...item, highlightedName: highlightedName };
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
