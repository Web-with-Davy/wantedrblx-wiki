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

  const sortedGuns = [...GUNS_DATA].sort(sortFn);
  const sortedExplosives = [...EXPLOSIVES_DATA].sort(sortFn);
  const sortedEquipment = [...EQUIPMENT_DATA].sort(sortFn);
  const sortedTools = [...TOOLS_DATA].sort(sortFn);



  const makeSectionCards = (data) => data.map(item => makeWeaponCard(item)).join('');

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortWeapons('high')" },
    { label: 'Cheapest first', value: 'low', onClick: "sortWeapons('low')" }
  ], sort);

  const jumpNav = `<div class="page-jump-nav">
    <a onclick="document.getElementById('weapons-guns')?.scrollIntoView({behavior:'smooth'})">Guns</a>
    <a onclick="document.getElementById('weapons-explosives')?.scrollIntoView({behavior:'smooth'})">Explosives</a>
    <a onclick="document.getElementById('weapons-equipment')?.scrollIntoView({behavior:'smooth'})">Equipment</a>
    <a onclick="document.getElementById('weapons-tools')?.scrollIntoView({behavior:'smooth'})">Tools</a>
  </div>`;

  const section = (id, label, cards) => `
    <div class="val-section-header" id="${id}">
      <h3 class="val-section-title">${label}</h3>
      <span class="val-section-count">${cards.split('val-card').length - 1} items</span>
    </div>
    <div class="val-grid">${cards}</div>`;

  return `
    <h2>WEAPONS</h2>
    ${sortButtons}
    ${jumpNav}
    ${section('weapons-guns', 'Guns', makeSectionCards(sortedGuns))}
    <div class="val-section-divider"></div>
    ${section('weapons-explosives', 'Explosives', makeSectionCards(sortedExplosives))}
    <div class="val-section-divider"></div>
    ${section('weapons-equipment', 'Equipment', makeSectionCards(sortedEquipment))}
    <div class="val-section-divider"></div>
    ${section('weapons-tools', 'Tools', makeSectionCards(sortedTools))}
  `;
}

function sortWeapons(order) {
  document.getElementById("page-container").innerHTML = renderWeapons(order);
}