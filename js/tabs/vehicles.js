function makeVehicleCard(item, displayName) {
  const contractHtml = formatPrice(item.contractPrice);
  const vehicleType = item.stats && item.stats.vehicleType;

  const visibleStats = [
    vehicleType ? { label: 'Type', value: vehicleType } : null,
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
  const isMotorcycle = v => v.category === 'Motorcycle' || v.category === 'Motorcycles' || ['Rift', 'Road Hog', 'Rooster', 'Shinobi', 'Reaper'].includes(v.name);
  const isCar = v => (v.category === 'Car' || v.category === 'Cars' || v.type === 'ground') && !isMotorcycle(v);
  const isAir = v => v.type === 'flying' || v.category === 'Air' || v.category === 'Air Vehicles';

  const cars = (window.VEHICLES_DATA || []).filter(isCar);
  const motorcycles = (window.VEHICLES_DATA || []).filter(isMotorcycle);
  const flyingVehicles = (window.VEHICLES_DATA || []).filter(isAir);

  const sortFn = (a, b) => {
    if (sort === 'type') {
      const typeA = String(a.stats && a.stats.vehicleType || a.category || '').toLowerCase();
      const typeB = String(b.stats && b.stats.vehicleType || b.category || '').toLowerCase();
      if (!typeA || !typeB) return typeA ? -1 : typeB ? 1 : (a.name || '').localeCompare(b.name || '');
      return typeA.localeCompare(typeB) || (a.name || '').localeCompare(b.name || '');
    }
    if (sort === 'speed') {
      const speedA = Number(a.stats && a.stats.topSpeed);
      const speedB = Number(b.stats && b.stats.topSpeed);
      const validA = Number.isFinite(speedA);
      const validB = Number.isFinite(speedB);
      if (validA !== validB) return validA ? -1 : 1;
      return (validB ? speedB - speedA : 0) || (a.name || '').localeCompare(b.name || '');
    }

    const isUnA = typeof a.contractPrice !== 'number';
    const isUnB = typeof b.contractPrice !== 'number';
    if (isUnA && !isUnB) return 1;
    if (!isUnA && isUnB) return -1;
    if (isUnA && isUnB) return (a.name || '').localeCompare(b.name || '');

    const pA = a.contractPrice;
    const pB = b.contractPrice;
    return sort === "high" ? pB - pA : pA - pB;
  };

  const sortedCars = [...cars].sort(sortFn);
  const sortedMotorcycles = [...motorcycles].sort(sortFn);
  const sortedFlying = [...flyingVehicles].sort(sortFn);

  const carCards = sortedCars.map(v => makeVehicleCard(v)).join('');
  const motorcycleCards = sortedMotorcycles.map(v => makeVehicleCard(v)).join('');
  const flyingCards = sortedFlying.map(v => makeVehicleCard(v)).join('');

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortVehicles('high')" },
    { label: 'Cheapest first', value: 'low', onClick: "sortVehicles('low')" },
    { label: 'Vehicle type A-Z', value: 'type', onClick: "sortVehicles('type')" },
    { label: 'Fastest first', value: 'speed', onClick: "sortVehicles('speed')" }
  ], sort);

  const jumpNav = `<div class="page-jump-nav">
    <a onclick="scrollToPageSection('vehicles-cars')">Cars</a>
    <a onclick="scrollToPageSection('vehicles-motorcycles')">Motorcycles</a>
    <a onclick="scrollToPageSection('vehicles-air')">Air</a>
  </div>`;

  return `
    <h2>VEHICLES</h2>
    ${sortButtons}
    ${jumpNav}
    <div class="val-section-header" id="vehicles-cars">
      <h3 class="val-section-title">Cars</h3>
      <span class="val-section-count">${sortedCars.length} items</span>
    </div>
    <div class="val-grid">${carCards}</div>
    <div class="val-section-divider"></div>
    <div class="val-section-header" id="vehicles-motorcycles">
      <h3 class="val-section-title">Motorcycles</h3>
      <span class="val-section-count">${sortedMotorcycles.length} items</span>
    </div>
    <div class="val-grid">${motorcycleCards}</div>
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