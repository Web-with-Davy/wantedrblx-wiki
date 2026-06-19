function renderVehicles(sort = "high") {
  const groundVehicles = VEHICLES_DATA.filter(v => v.type === 'ground');
  const flyingVehicles = VEHICLES_DATA.filter(v => v.type === 'flying');

  const sortFn = (a, b) => {
    const pA = typeof a.contractPrice === 'number' ? a.contractPrice : 0;
    const pB = typeof b.contractPrice === 'number' ? b.contractPrice : 0;
    return sort === "high" ? pB - pA : pA - pB;
  };

  const sortedGround = [...groundVehicles].sort(sortFn);
  const sortedFlying = [...flyingVehicles].sort(sortFn);

  const makeVehicleCard = (item, isFlying) => {
    const contractHtml = formatPrice(item.contractPrice);
    const repairHtml = formatPrice(item.repairPrice);
    const garageHtml = formatPrice(item.repairPriceGarage);

    const visibleStats = [
      contractHtml ? { label: 'Buy Price', value: contractHtml } : null,
    ].filter(Boolean);

    const hiddenStats = [
      { label: 'Obtaining', value: item.obtaining },
      repairHtml ? { label: 'Repair Price', value: repairHtml } : null,
      garageHtml ? { label: 'Garage Repair', value: garageHtml } : null,
      isFlying
        ? { label: 'Top Speed', value: item.stats.topSpeed != null ? `${item.stats.topSpeed}%` : null }
        : { label: 'Top Speed', value: item.stats.topSpeed != null ? `${item.stats.topSpeed}%` : null },
      !isFlying
        ? { label: 'Acceleration', value: item.stats.acceleration != null ? `${item.stats.acceleration}%` : null }
        : { label: 'Spool Time', value: item.stats.spoolTime != null ? `${item.stats.spoolTime}s` : null },
      !isFlying
        ? { label: 'Braking', value: item.stats.braking != null ? `${item.stats.braking}%` : null }
        : { label: 'Handling', value: item.stats.handling != null ? `${item.stats.handling}%` : null },
      { label: 'Health', value: item.stats.Health },
      { label: 'Armor', value: item.stats.armor != null ? String(item.stats.armor) : null },
    ].filter(s => s && s.value !== undefined && s.value !== null && s.value !== '');

    return makeUniversalCard(item, {
      folder: 'vehicles',
      rarityKey: null,
      visibleStats,
      hiddenStats,
      showButton: item.showMoreButton !== false && hiddenStats.length > 0
    });
  };

  const groundCards = sortedGround.map(v => makeVehicleCard(v, false)).join('');
  const flyingCards = sortedFlying.map(v => makeVehicleCard(v, true)).join('');

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