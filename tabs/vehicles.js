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
      ${renderPriceTag(tv(item, 'contractPrice'))}
      <h3>${tv(item, 'name')}</h3>
    `;
    const hiddenContent = isFlying ? `
      ${renderStat(t('stat_obtaining'),     tv(item, 'obtaining'))}
      ${renderStat(t('stat_repair'),        formatPrice(item.repairPrice))}
      ${renderStat(t('stat_garage_repair'), formatPrice(item.repairPriceGarage))}
      ${renderStatSuffix(t('stat_top_speed'),   item.stats.topSpeed, '%')}
      ${renderStatSuffix(t('stat_handling'),    item.stats.handling, '%')}
      ${renderStatSuffix(t('stat_spool_time'),  item.stats.spoolTime, 's')}
      ${renderStat(t('stat_health'), tv(item.stats, 'Health'))}
      ${renderStat(t('stat_armor'),      item.stats.armor)}
    ` : `
      ${renderStat(t('stat_obtaining'),     tv(item, 'obtaining'))}
      ${renderStat(t('stat_repair'),        formatPrice(item.repairPrice))}
      ${renderStat(t('stat_garage_repair'), formatPrice(item.repairPriceGarage))}
      ${renderStatSuffix(t('stat_top_speed'),   item.stats.topSpeed, '%')}
      ${renderStatSuffix(t('stat_acceleration'),item.stats.acceleration, '%')}
      ${renderStatSuffix(t('stat_braking'),     item.stats.braking, '%')}
      ${renderStat(t('stat_health'), tv(item.stats, 'Health'))}
      ${renderStat(t('stat_armor'),      item.stats.armor)}
    `;
    return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'vehicles');
  };

  const groundCards = sortedGround.map(item => makeCard(item, false));
  const flyingCards = sortedFlying.map(item => makeCard(item, true));

  const sortButtons = renderSortButtons([
    { label: t('sort_expensive'), value: 'high', onClick: "sortVehicles('high')" },
    { label: t('sort_cheap'),     value: 'low',  onClick: "sortVehicles('low')" }
  ], sort);

  const divider = `<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>`;

  return `
    <h2>${t('page_vehicles')}</h2>
    ${sortButtons}
    <h3 style="margin: 20px 0 10px;">${t('cat_ground_vehicles')}</h3>
    <div class="card-grid">${groundCards.join('')}</div>
    ${divider}
    <h3 style="margin: 20px 0 10px;">${t('cat_air_vehicles')}</h3>
    <div class="card-grid">${flyingCards.join('')}</div>
  `;
}

function sortVehicles(order) {
  document.getElementById("page-container").innerHTML = renderVehicles(order);
}