function makeWeaponCard(item, displayName) {
    const contractHtml = formatPrice(item.contractPrice);

    const visibleStats = [
      contractHtml ? { label: 'Buy Price', value: contractHtml } : null,
    ].filter(Boolean);

    return makeUniversalCard(item, {
      folder: 'weapons',
      rarityKey: null,
      displayName: displayName || undefined,
      visibleStats,
      hiddenStats: [],
      itemCategory: 'weapons',
      showButton: false
    });
}

function renderWeapons(sort = "high") {
  const sortFn = (a, b) => {
    const isUnA = typeof a.contractPrice !== 'number';
    const isUnB = typeof b.contractPrice !== 'number';
    if (isUnA && !isUnB) return 1;
    if (!isUnA && isUnB) return -1;
    if (isUnA && isUnB) return (a.name || '').localeCompare(b.name || '');

    const pA = a.contractPrice;
    const pB = b.contractPrice;
    return sort === "high" ? pB - pA : pA - pB;
  };

  const categories = [
    { id: 'weapons-light', key: 'Light', label: 'Light' },
    { id: 'weapons-medium', key: 'Medium', label: 'Medium' },
    { id: 'weapons-heavy', key: 'Heavy', label: 'Heavy' },
    { id: 'weapons-explosives', key: 'Explosives', label: 'Explosives' },
    { id: 'weapons-equipment', key: 'Equipment', label: 'Equipment' },
    { id: 'weapons-airdrop', key: 'Airdrop', label: 'Airdrop' },
  ];

  const knownKeys = new Set(categories.map(c => c.key));
  if (window.WEAPONS_BY_CATEGORY) {
    Object.keys(window.WEAPONS_BY_CATEGORY).forEach(k => {
      if (!knownKeys.has(k) && (window.WEAPONS_BY_CATEGORY[k] || []).length > 0) {
        categories.push({ id: `weapons-${k.toLowerCase()}`, key: k, label: k });
      }
    });
  }

  const getCategoryItems = (key) => {
    if (window.WEAPONS_BY_CATEGORY && window.WEAPONS_BY_CATEGORY[key]) {
      return window.WEAPONS_BY_CATEGORY[key];
    }
    if (key === 'Equipment') return window.EQUIPMENT_DATA || [];
    if (key === 'Explosives') return window.EXPLOSIVES_DATA || [];
    const all = window.WEAPONS_DATA || [...(window.GUNS_DATA || []), ...(window.EXPLOSIVES_DATA || []), ...(window.EQUIPMENT_DATA || [])];
    return all.filter(item => item.category === key);
  };

  const makeSectionCards = (data) => data.map(item => makeWeaponCard(item)).join('');

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortWeapons('high')" },
    { label: 'Cheapest first', value: 'low', onClick: "sortWeapons('low')" }
  ], sort);

  const activeCategories = categories.filter(cat => getCategoryItems(cat.key).length > 0);

  const jumpNav = `<div class="page-jump-nav">
    ${activeCategories.map(cat => `
      <a onclick="document.getElementById('${cat.id}')?.scrollIntoView({behavior:'smooth'})">${cat.label}</a>
    `).join('')}
  </div>`;

  const sectionsHtml = activeCategories.map((cat, idx) => {
    const sortedItems = [...getCategoryItems(cat.key)].sort(sortFn);
    const divider = idx > 0 ? '<div class="val-section-divider"></div>' : '';
    return `
      ${divider}
      <div class="val-section-header" id="${cat.id}">
        <h3 class="val-section-title">${cat.label}</h3>
        <span class="val-section-count">${sortedItems.length} items</span>
      </div>
      <div class="val-grid">${makeSectionCards(sortedItems)}</div>`;
  }).join('');

  return `
    <h2>WEAPONS</h2>
    ${sortButtons}
    ${jumpNav}
    ${sectionsHtml}
  `;
}

function sortWeapons(order) {
  document.getElementById("page-container").innerHTML = renderWeapons(order);
}