function renderATMs(sort = "high") {
  const sortedATMs = [...ATMS_DATA].sort((a, b) =>
    sort === "high" ? b.price - a.price : a.price - b.price
  );

  const sortedVaults = [...VAULTS_DATA].sort((a, b) => {
    const avgA = (typeof a.priceMin === 'number' && typeof a.priceMax === 'number') ? (a.priceMin + a.priceMax) / 2 : 0;
    const avgB = (typeof b.priceMin === 'number' && typeof b.priceMax === 'number') ? (b.priceMin + b.priceMax) / 2 : 0;
    return sort === "high" ? avgB - avgA : avgA - avgB;
  });

  const makeATMCard = (item) => {
    const cashHtml = formatPrice(item.price);
    return makeUniversalCard(item, {
      folder: 'atms',
      rarityKey: item.rarity,
      visibleStats: [
        cashHtml ? { label: 'Cash', value: cashHtml } : null,
      ].filter(Boolean),
      hiddenStats: [
        { label: 'Rarity', value: item.rarityPercent },
      ].filter(s => s.value),
      showButton: item.showMoreButton !== false && !!item.rarityPercent
    });
  };

  const makeVaultCard = (item) => {
    const priceDisplay = (typeof item.priceMin === 'number' && typeof item.priceMax === 'number')
      ? `${formatPrice(item.priceMin)} – ${formatPrice(item.priceMax)}`
      : '? – ?';
    return makeUniversalCard(item, {
      folder: 'atms',
      rarityKey: item.rarity,
      visibleStats: [
        { label: 'Cash Range', value: priceDisplay },
      ],
      hiddenStats: [
        { label: 'Rarity', value: item.rarityPercent },
      ].filter(s => s.value),
      showButton: item.showMoreButton !== false && !!item.rarityPercent
    });
  };

  const atmCards   = sortedATMs.map(makeATMCard).join('');
  const vaultCards = sortedVaults.map(makeVaultCard).join('');

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortATMs('high')" },
    { label: 'Cheapest first',       value: 'low',  onClick: "sortATMs('low')"  }
  ], sort);

  const jumpNav = `<div class="page-jump-nav">
    <a onclick="document.getElementById('atms-atms')?.scrollIntoView({behavior:'smooth'})">ATMs</a>
    <a onclick="document.getElementById('atms-vaults')?.scrollIntoView({behavior:'smooth'})">Vaults</a>
  </div>`;

  return `
    <h2>ATMs &amp; VAULTS</h2>
    ${sortButtons}
    ${jumpNav}
    <div class="val-section-header" id="atms-atms">
      <h3 class="val-section-title">ATMs</h3>
      <span class="val-section-count">${sortedATMs.length} items</span>
    </div>
    <div class="val-grid">${atmCards}</div>
    <div class="val-section-divider"></div>
    <div class="val-section-header" id="atms-vaults">
      <h3 class="val-section-title">Vaults</h3>
      <span class="val-section-count">${sortedVaults.length} items</span>
    </div>
    <div class="val-grid">${vaultCards}</div>
  `;
}

function sortATMs(order) {
  document.getElementById("page-container").innerHTML = renderATMs(order);
}