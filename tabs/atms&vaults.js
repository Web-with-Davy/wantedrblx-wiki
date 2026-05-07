function renderATMs(sort = "high") {
  const sortedATMs = [...ATMS_DATA].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  const sortedVaults = [...VAULTS_DATA].sort((a, b) => {
    const avgA = (typeof a.priceMin === 'number' && typeof a.priceMax === 'number') ? (a.priceMin + a.priceMax) / 2 : 0;
    const avgB = (typeof b.priceMin === 'number' && typeof b.priceMax === 'number') ? (b.priceMin + b.priceMax) / 2 : 0;
    return sort === "high" ? avgB - avgA : avgA - avgB;
  });

  const atmCards = sortedATMs.map(item => {
    const visibleContent = `
      <h3>${tv(item, 'name')}</h3>
      ${renderStat(t('stat_cash'), formatPrice(item.price))}
    `;
    const hiddenContent = renderStat(t('stat_rarity'), item.rarityPercent);
    return renderExpandableCardJPG(item, item.rarity, visibleContent, hiddenContent, 'atms&vaults');
  });

  const vaultCards = sortedVaults.map(item => {
    const priceDisplay = (typeof item.priceMin === 'number' && typeof item.priceMax === 'number')
      ? `${formatPrice(item.priceMin)} - ${formatPrice(item.priceMax)}`
      : '? - ?';
    const visibleContent = `
      <h3>${tv(item, 'name')}</h3>
      ${renderStat(t('stat_cash'), priceDisplay)}
    `;
    const hiddenContent = renderStat(t('stat_rarity'), item.rarityPercent);
    return renderExpandableCardJPG(item, item.rarity, visibleContent, hiddenContent, 'atms&vaults');
  });

  const sortButtons = renderSortButtons([
    { label: t('sort_expensive'), value: 'high', onClick: "sortATMs('high')" },
    { label: t('sort_cheap'),     value: 'low',  onClick: "sortATMs('low')" }
  ], sort);

  const divider = `<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>`;

  return `
    <h2>${t('page_atms')}</h2>
    ${sortButtons}
    <h3 style="margin: 20px 0 10px;">ATMs</h3>
    <div class="card-grid">${atmCards.join('')}</div>
    ${divider}
    <h3 style="margin: 20px 0 10px;">Vaults</h3>
    <div class="card-grid">${vaultCards.join('')}</div>
  `;
}

function sortATMs(order) {
  document.getElementById("page-container").innerHTML = renderATMs(order);
}