function makeVehicleCard(item, displayName) {
  const contractHtml = formatPrice(item.contractPrice);

  const visibleStats = [
    contractHtml ? { label: 'Buy Price', value: contractHtml } : null,
  ].filter(Boolean);

  return makeUniversalCard(item, {
    folder: 'vehicles',
    rarityKey: null,
    displayName: displayName || undefined,
    visibleStats,
    hiddenStats: [],
    itemCategory: 'vehicles',
    showButton: false
  });
}

function renderVehicles(sort = "high") {
  const groundVehicles = VEHICLES_DATA.filter(v => v.type === 'ground');
  const flyingVehicles = VEHICLES_DATA.filter(v => v.type === 'flying');

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

  const sortedGround = [...groundVehicles].sort(sortFn);
  const sortedFlying = [...flyingVehicles].sort(sortFn);



  const groundCards = sortedGround.map(v => makeVehicleCard(v)).join('');
  const flyingCards = sortedFlying.map(v => makeVehicleCard(v)).join('');

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortVehicles('high')" },
    { label: 'Cheapest first', value: 'low', onClick: "sortVehicles('low')" }
  ], sort);

  const jumpNav = `<div class="page-jump-nav">
    <a onclick="document.getElementById('vehicles-ground')?.scrollIntoView({behavior:'smooth'})">Ground</a>
    <a onclick="document.getElementById('vehicles-air')?.scrollIntoView({behavior:'smooth'})">Air</a>
  </div>`;

  return `
    <h2>VEHICLES</h2>
    ${sortButtons}
    ${jumpNav}
    <div class="val-section-header" id="vehicles-ground">
      <h3 class="val-section-title">Ground Vehicles</h3>
      <span class="val-section-count">${sortedGround.length} items</span>
    </div>
    <div class="val-grid">${groundCards}</div>
    <div class="val-section-divider"></div>
    <div class="val-section-header" id="vehicles-air">
      <h3 class="val-section-title">Air Vehicles</h3>
      <span class="val-section-count">${sortedFlying.length} items</span>
    </div>
    <div class="val-grid">${flyingCards}</div>
  `;
}

function sortVehicles(order) {
  document.getElementById("page-container").innerHTML = renderVehicles(order);
}