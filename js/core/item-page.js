const ITEM_PAGE_REGISTRY = {
  weapons: {
    label: 'WEAPONS', emoji: '🔫',
    getData: () => [...(window.GUNS_DATA || []), ...(window.EXPLOSIVES_DATA || []), ...(window.EQUIPMENT_DATA || []), ...(window.TOOLS_DATA || [])],
    folder: 'weapons',
    renderDetails: renderWeaponDetails,
  },
  vehicles: {
    label: 'VEHICLES', emoji: '🚗',
    getData: () => window.VEHICLES_DATA || [],
    folder: 'vehicles',
    renderDetails: renderVehicleDetails,
  },
  npcs: {
    label: 'NPCs', emoji: '👥',
    getData: () => window.NPCS_DATA || [],
    folder: 'npcs',
    renderDetails: renderNPCDetails,
  },
  missions: {
    label: 'MISSIONS', emoji: '📜',
    getData: () => window.MISSIONS_DATA || [],
    folder: 'missions',
    renderDetails: renderMissionDetails,
  },
  valuables: {
    label: 'VALUABLES', emoji: '💎',
    getData: () => [...(window.VALUABLES_DATA || []), ...(window.CHRISTMAS_VALUABLES_DATA || []), ...(window.FOURTH_OF_JULY_VALUABLES_DATA || [])],
    folder: 'valuables',
    renderDetails: renderValuableDetails,
  },
  locations: {
    label: 'LOCATIONS', emoji: '📍',
    getData: () => window.LOCATIONS_DATA || [],
    folder: 'locations',
    renderDetails: renderLocationDetails,
  },
  store: {
    label: 'STORE', emoji: '🛒',
    getData: () => window.STORE_DATA || [],
    folder: 'store',
    renderDetails: renderStoreDetails,
  },
  'gun-crates': {
    label: 'GUN CRATES', emoji: '📦',
    getData: () => window.GUN_CRATES_DATA || [],
    folder: 'crates',
    renderDetails: renderGunCrateDetails,
  },
  events: {
    label: 'EVENTS', emoji: '📅',
    getData: () => window.EVENTS_DATA || [],
    folder: 'events',
    renderDetails: renderEventDetails,
  },
  atms: {
    label: 'ATMs & VAULTS', emoji: '🏧',
    getData: () => window.ATMS_DATA || [],
    folder: 'atms',
    renderDetails: renderATMDetails,
  },
};

function _ipSlug(str) {
  if (typeof generateSlug === 'function') return generateSlug(str);
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function _findItem(category, id) {
  const reg = ITEM_PAGE_REGISTRY[category];
  if (!reg) return null;
  const data = reg.getData();
  return data.find(item => {
    const slug = item.id || _ipSlug(item.name || item.title || item.code || '');
    return slug === id;
  }) || null;
}

function _stat(label, value) {
  if (value === undefined || value === null || value === '' || value === '?') return '';
  return `
    <div class="val-stat">
      <span class="val-stat-label">${label}</span>
      <span class="val-stat-value">${value}</span>
    </div>`;
}

function _section(title, bodyHtml) {
  if (!bodyHtml || !bodyHtml.trim()) return '';
  const match = title.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji})\s*(.*)$/u);
  let finalTitle = title;
  if (match) {
    finalTitle = `<span class="ip-emoji">${match[1]}</span> ${match[2]}`;
  }
  return `
    <div class="ip-section sidebar-box">
      <div class="ip-section-header">${finalTitle}</div>
      <div class="ip-section-body">${bodyHtml}</div>
    </div>`;
}

function _descBlock(text) {
  if (!text) return '';
  return `<div class="ip-desc-block sidebar-box">${text}</div>`;
}

function renderWeaponDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);

  const statsHtml = [
    _stat('Obtaining', item.obtaining),
    _stat('Location', item.location || (item.stats && item.stats.location)),
    _stat('Buy Price', f(item.contractPrice)),
    _stat('Re-Buy Price', f(item.reBuyPrice)),
    _stat('Sell Price', f(item.sellPrice)),
    _stat('Ammo', item.stats && item.stats.ammo),
    _stat('Ammo Cost', item.stats && item.stats.ammoPrice),
    _stat('Damage', item.stats && item.stats.damage),
    _stat('Fire Rate', item.stats && item.stats.firerate),
    _stat('Reload Speed', item.stats && item.stats.reload ? `${item.stats.reload}s` : null),
    _stat('Accuracy', item.stats && item.stats.accuracy),
  ].join('');

  let attachmentsHtml = '';
  const hasAtt = item.attachments && Object.keys(item.attachments).length > 0;
  if (hasAtt) {
    const attGroups = Object.entries(item.attachments).map(([cat, items]) => {
      if (!items || !items.length) return '';
      const rows = items.map(att => 
        _stat(
          att.name, 
          att.price === 0 ? '<span style="color: rgba(255,255,255,0.5); font-style: italic;">Free</span>' : f(att.price)
        )
      ).join('');
      return `<div class="ip-att-group">
        <div class="ip-att-cat">${cat}</div>
        ${rows}
      </div>`;
    }).join('');
    attachmentsHtml = attGroups;
  }

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Stats', statsHtml)}
    ${hasAtt ? _section('🔧 Attachments', attachmentsHtml) : ''}
  `;
}

function renderVehicleDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const isFlying = item.type === 'flying';

  const statsHtml = [
    _stat('Type', item.type ? (item.type.charAt(0).toUpperCase() + item.type.slice(1)) : null),
    _stat('Obtaining', item.obtaining),
    _stat('Buy Price', f(item.contractPrice)),
    _stat('Repair Price', f(item.repairPrice)),
    _stat('Garage Repair', f(item.repairPriceGarage)),
    _stat('Top Speed', item.stats && item.stats.topSpeed != null ? `${item.stats.topSpeed}%` : null),
    isFlying
      ? _stat('Spool Time', item.stats && item.stats.spoolTime != null ? `${item.stats.spoolTime}s` : null)
      : _stat('Acceleration', item.stats && item.stats.acceleration != null ? `${item.stats.acceleration}%` : null),
    isFlying
      ? _stat('Handling', item.stats && item.stats.handling != null ? `${item.stats.handling}%` : null)
      : _stat('Braking', item.stats && item.stats.braking != null ? `${item.stats.braking}%` : null),
    _stat('Health', item.stats && item.stats.Health),
    _stat('Armor', item.stats && item.stats.armor != null ? String(item.stats.armor) : null),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Stats', statsHtml)}
  `;
}

function renderNPCDetails(item) {
  const statsHtml = [
    _stat('Team', item.team),
    _stat('Location', item.location),
  ].join('');

  let dialogueHtml = '';
  if (item.dialogue && Object.keys(item.dialogue).length > 0) {
    const groups = Object.entries(item.dialogue).map(([cat, lines]) => {
      if (!lines || !lines.length) return '';
      const lineRows = lines.map(d =>
        `<div class="ip-dialogue-line">
          ${d.title ? `<span class="ip-dialogue-title">${d.title}</span>` : ''}
          <span class="ip-dialogue-text">${d.dialogue}</span>
        </div>`
      ).join('');
      return `<div class="ip-dialogue-group">
        <div class="ip-att-cat">${cat}</div>
        ${lineRows}
      </div>`;
    }).join('');
    dialogueHtml = `<div class="ip-dialogues">${groups}</div>`;
  }

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
    ${item.dialogue ? _section('💬 Dialogues', dialogueHtml) : ''}
  `;
}

function renderMissionDetails(item) {
  const f = typeof formatReward === 'function' ? formatReward : (r => JSON.stringify(r));
  const rewardStr = (item.rewards || []).map(f).join(', ');

  const statsHtml = [
    _stat('Mission Type', item.missionType),
    _stat('Difficulty', item.difficulty),
    _stat('Location', item.location),
    rewardStr ? _stat('Rewards', rewardStr) : '',
  ].join('');

  const howToHtml = item.howToComplete
    ? `<div class="ip-how-to">${item.howToComplete}</div>` : '';

  let tipsHtml = '';
  if (item.tipsAndInfo) {
    const tips = Array.isArray(item.tipsAndInfo) ? item.tipsAndInfo : [item.tipsAndInfo];
    tipsHtml = tips.map(t => `<div class="ip-tip">💡 ${t}</div>`).join('');
  }

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Mission Info', statsHtml)}
    ${item.howToComplete ? _section('📋 How to Complete', howToHtml) : ''}
    ${tipsHtml ? _section('💡 Tips & Info', tipsHtml) : ''}
  `;
}

function renderValuableDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const perKg = (item.weight > 0 && typeof item.price === 'number')
    ? `${Math.round(item.price / item.weight).toLocaleString()} $/kg` : null;

  const statsHtml = [
    _stat('Category', item.category),
    _stat('Rarity', item.rarity),
    _stat('Sell Price', f(item.price) || '—'),
    _stat('Weight', item.weight != null ? `${item.weight} kg` : null),
    _stat('Value per kg', perKg),
    _stat('Location', item.commonLocation),
    item.priceNonContract ? _stat('Note', 'Non-Contract item') : '',
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function renderLocationDetails(item) {
  const statsHtml = [
    _stat('Type', item.type),
    _stat('District', item.district),
    _stat('Notable', item.notable),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function renderStoreDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const statsHtml = [
    _stat('Category', item.category),
    _stat('Price', f(item.price)),
    _stat('Location', item.location),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function renderGunCrateDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const statsHtml = [
    _stat('Location', item.location),
    _stat('Contents', item.gun),
    _stat('Cooldown', item.cooldown),
    _stat('Price', f(item.price) || f(item.contractPrice)),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function renderEventDetails(item) {
  const statsHtml = [
    _stat('Date', item.date),
    _stat('Type', item.type),
    _stat('Rewards', item.rewards),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
    ${item.howToComplete ? _section('📋 How to Complete', `<div class="ip-how-to">${item.howToComplete}</div>`) : ''}
  `;
}

function renderATMDetails(item) {
  const f = typeof formatPrice === 'function' ? formatPrice : (v => v);
  const statsHtml = [
    _stat('Type', item.type),
    _stat('Location', item.location),
    _stat('Cash Limit', f(item.cashLimit) || item.cashLimit),
  ].join('');

  return `
    ${_descBlock(item.description)}
    ${_section('📊 Info', statsHtml)}
  `;
}

function loadItemPage(category, id, returnTab) {
  const back = returnTab || category;
  window.history.pushState({ itemPage: true, category, id, back }, '', `#item/${category}/${id}`);
  _renderItemPage(category, id, back);
}
window.loadItemPage = loadItemPage;

function _renderItemPage(category, id, back) {
  const container = document.getElementById('page-container');
  if (!container) return;

  const isLowEnd = document.body.classList.contains('low-end-mode');

  if (!isLowEnd) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';
  }

  setTimeout(() => {
    const reg = ITEM_PAGE_REGISTRY[category];
    const item = _findItem(category, id);

    if (!reg || !item) {
      container.innerHTML = `
        <div class="ip-not-found">
          <h2>ITEM NOT FOUND</h2>
          <p>Could not find <strong>${id}</strong> in <strong>${category}</strong>.</p>
          <button class="ip-back-btn" onclick="loadPage('${back}')">← Back to ${(reg && reg.label) || back.toUpperCase()}</button>
        </div>`;
      if (!isLowEnd) { container.style.opacity = '1'; container.style.transform = 'translateY(0)'; }
      return;
    }

    const name = item.name || item.title || item.code || id;
    const slug = item.id || _ipSlug(name);
    const ext = reg.ext || 'webp';
    const imgSrc = reg.folder ? `images/${reg.folder}/${slug}.${ext}` : `images/${slug}.${ext}`;

    const rarityKey = item.rarity || item.difficulty || item.team || null;
    const rarityData = rarityKey
      ? ((typeof RARITIES !== 'undefined' && RARITIES[rarityKey]) ||
        (typeof DIFFICULTIES !== 'undefined' && DIFFICULTIES[rarityKey]) ||
        (typeof TEAMS !== 'undefined' && TEAMS[rarityKey]) || null)
      : null;
    const rarityName = rarityData ? rarityData.name : (rarityKey || '');
    const rarityClass = rarityData ? rarityData.class : '';

    const detailHtml = reg.renderDetails ? reg.renderDetails(item) : '';

    container.innerHTML = `
      <div class="ip-wrap">

        <!-- Breadcrumb -->
        <div class="ip-breadcrumb">
          <button class="ip-back-btn" onclick="loadPage('${back}')">
            ← ${reg.emoji} ${reg.label}
          </button>
          <span class="ip-breadcrumb-sep">/</span>
          <span class="ip-breadcrumb-current">${name}</span>
        </div>

        <!-- Hero -->
        <div class="ip-hero sidebar-box">
          <div class="ip-hero-img-wrap">
            <img
              src="${imgSrc}"
              alt="${name}"
              class="ip-hero-img"
              onerror="this.onerror=null;this.src='images/logo.webp';this.classList.add('ip-img-fallback');"
            >
            ${rarityName ? `<span class="val-rarity-tag ${rarityClass}">${rarityName}</span>` : ''}
          </div>
          <div class="ip-hero-info">
            <h2 class="ip-title">${name}</h2>
          </div>
        </div>

        <!-- Detail body -->
        <div class="ip-body">
          ${detailHtml || '<p class="ip-empty">No additional details available.</p>'}
        </div>

      </div>
    `;

    if (!isLowEnd) {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }
  }, isLowEnd ? 0 : 120);
}

function _handleItemPageHash(route) {
  const match = route.match(/^item\/([^/]+)\/(.+)$/);
  if (!match) return false;
  const [, category, id] = match;
  _renderItemPage(category, id, category);
  return true;
}
window._handleItemPageHash = _handleItemPageHash;

function makeSeeMoreBtn(category, item) {
  const name = item.name || item.title || item.code || '';
  const slug = item.id || _ipSlug(name);
  return `<button class="val-see-more-btn" onclick="loadItemPage('${category}','${slug}')">SEE MORE →</button>`;
}
window.makeSeeMoreBtn = makeSeeMoreBtn;
