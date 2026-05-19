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
      <h3>${item.name}</h3>
      ${renderStat('Cash', formatPrice(item.price))}
    `;
    const hiddenContent = renderStat('Rarity', item.rarityPercent);
    return renderExpandableCardJPG(item, item.rarity, visibleContent, hiddenContent, 'atms&vaults');
  });

  const vaultCards = sortedVaults.map(item => {
    const priceDisplay = (typeof item.priceMin === 'number' && typeof item.priceMax === 'number')
      ? `${formatPrice(item.priceMin)} - ${formatPrice(item.priceMax)}`
      : '? - ?';
    const visibleContent = `
      <h3>${item.name}</h3>
      ${renderStat('Cash', priceDisplay)}
    `;
    const hiddenContent = renderStat('Rarity', item.rarityPercent);
    return renderExpandableCardJPG(item, item.rarity, visibleContent, hiddenContent, 'atms&vaults');
  });

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortATMs('high')" },
    { label: 'Cheapest first',     value: 'low',  onClick: "sortATMs('low')" }
  ], sort);

  const divider = `<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>`;

  return `
    <h2>${'ATMs & VAULTS'}</h2>
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