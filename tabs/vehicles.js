function renderVehicles(sort = "high") {
  const renderStatSuffix = (label, val, suffix) =>
    val !== undefined && val !== null ? renderStat(label, `${val}${suffix}`) : '';

  const groundVehicles = VEHICLES_DATA.filter(v => v.type === 'ground');
  const flyingVehicles = VEHICLES_DATA.filter(v => v.type === 'flying');

  const sortFn = (a, b) => {
    const pA = typeof a.contractPrice === 'number' ? a.contractPrice : 0;
    const pB = typeof b.contractPrice === 'number' ? b.contractPrice : 0;
    return sort === "high" ? pB - pA : pA - pB;
  };

  const sortedGround = [...groundVehicles].sort(sortFn);
  const sortedFlying = [...flyingVehicles].sort(sortFn);

  const makeCard = (item, isFlying) => {
    const visibleContent = `
      ${renderPriceTag(item.contractPrice)}
      <h3>${item.name}</h3>
    `;
    const hiddenContent = isFlying ? `
      ${renderStat('Obtaining',     item.obtaining)}
      ${renderStat('Repair Price',        formatPrice(item.repairPrice))}
      ${renderStat('Garage Repair Price', formatPrice(item.repairPriceGarage))}
      ${renderStatSuffix('Top Speed',   item.stats.topSpeed, '%')}
      ${renderStatSuffix('Handling',    item.stats.handling, '%')}
      ${renderStatSuffix('Spool Time',  item.stats.spoolTime, 's')}
      ${renderStat('Health', item.stats.Health)}
      ${renderStat('Armor',      item.stats.armor)}
    ` : `
      ${renderStat('Obtaining',     item.obtaining)}
      ${renderStat('Repair Price',        formatPrice(item.repairPrice))}
      ${renderStat('Garage Repair Price', formatPrice(item.repairPriceGarage))}
      ${renderStatSuffix('Top Speed',   item.stats.topSpeed, '%')}
      ${renderStatSuffix('Acceleration',item.stats.acceleration, '%')}
      ${renderStatSuffix('Braking',     item.stats.braking, '%')}
      ${renderStat('Health', item.stats.Health)}
      ${renderStat('Armor',      item.stats.armor)}
    `;
    return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'vehicles');
  };

  const groundCards = sortedGround.map(item => makeCard(item, false));
  const flyingCards = sortedFlying.map(item => makeCard(item, true));

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortVehicles('high')" },
    { label: 'Cheapest first',     value: 'low',  onClick: "sortVehicles('low')" }
  ], sort);

  const divider = `<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>`;

  return `
    <h2>${'VEHICLES'}</h2>
    ${sortButtons}
    <h3 style="margin: 20px 0 10px;">${'Ground Vehicles'}</h3>
    <div class="card-grid">${groundCards.join('')}</div>
    ${divider}
    <h3 style="margin: 20px 0 10px;">${'Air Vehicles'}</h3>
    <div class="card-grid">${flyingCards.join('')}</div>
  `;
}

function sortVehicles(order) {
  document.getElementById("page-container").innerHTML = renderVehicles(order);
}