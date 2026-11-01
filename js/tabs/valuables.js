function makeValuableCard(item, displayName) {
  const name = item.name || '';
  const slug = item.id || generateSlug(name);
  const imgSrc = `images/valuables/${slug}.${CARD_IMG_EXT}`;

  const rarity = RARITIES[item.rarity];
  const rarityName = rarity ? rarity.name : '';
  const rarityClass = rarity ? rarity.class : '';

  const priceHtml = formatPrice(item.price) || '—';

  const perKgHtml = (item.weight > 0 && typeof item.price === 'number')
    ? `<span class="val-per-kg">${Math.round(item.price / item.weight).toLocaleString()} $/kg</span>`
    : '';

  const nonContractBadge = item.priceNonContract
    ? `<span class="val-badge val-badge-nc">Non-Contract</span>` : '';

  const seeMoreBtn = typeof makeSeeMoreBtn === 'function' ? makeSeeMoreBtn('valuables', item) : '';

  return `
    <div class="val-card" data-rarity="${item.rarity || ''}">
      <div class="val-rarity-bar ${rarityClass}"></div>
      <div class="val-img-wrap">
        <img
          src="${imgSrc}"
          alt="${name}"
          loading="lazy"
          class="val-img"
          onerror="this.onerror=null;this.src='images/logo.webp';this.classList.add('val-img-fallback');"
        >
        ${rarityName ? `<span class="val-rarity-tag ${rarityClass}">${rarityName}</span>` : ''}
        ${perKgHtml}
      </div>
      <div class="val-body">
        <h3 class="val-name">${displayName || name}</h3>
        ${nonContractBadge}
        <div class="val-stat">
          <span class="val-stat-label">Sell Price</span>
          <span class="val-stat-value">${priceHtml}</span>
        </div>
        ${seeMoreBtn}
      </div>
    </div>`;
}

function renderValuables(sort = 'high') {
  const sortItems = (items) => [...items].sort((a, b) => {
    if (sort === 'az') return (a.name || '').localeCompare(b.name || '');
    if (sort === 'weight-high' || sort === 'weight-low') {
      const weightA = Number(a.weight);
      const weightB = Number(b.weight);
      const validA = a.weight !== undefined && a.weight !== null && a.weight !== '' && Number.isFinite(weightA);
      const validB = b.weight !== undefined && b.weight !== null && b.weight !== '' && Number.isFinite(weightB);
      if (validA !== validB) return validA ? -1 : 1;
      return (validA ? (sort === 'weight-high' ? weightB - weightA : weightA - weightB) : 0)
        || (a.name || '').localeCompare(b.name || '');
    }

    const priceA = a.priceNonContract ? 0 : Number(a.price) || 0;
    const priceB = b.priceNonContract ? 0 : Number(b.price) || 0;
    if (priceA > 0 && priceB > 0) return sort === 'high' ? priceB - priceA : priceA - priceB;
    if (priceA > 0) return -1;
    if (priceB > 0) return 1;
    return sort === 'high' ? priceB - priceA : priceA - priceB;
  });

  const sortedRegular = sortItems(VALUABLES_DATA);

  const categories = [
    { type: 'Gems', label: 'Gems' },
    { type: 'Jewelry', label: 'Jewelry' },
    { type: 'Electronics', label: 'Electronics' },
    { type: 'Tech', label: 'Tech' },
    { type: 'Shoes', label: 'Shoes' },
    { type: 'Miscellaneous', label: 'Miscellaneous' },
    { type: 'Mission Items', label: 'Mission Items' },
    { type: 'Halloween', label: 'Halloween' },
    { type: 'Easter', label: 'Easter' },
  ];

  const knownTypes = new Set(categories.map(c => c.type));
  sortedRegular.forEach(item => {
    if (item.category && !knownTypes.has(item.category)) {
      knownTypes.add(item.category);
      categories.push({ type: item.category, label: item.category });
    }
  });

  const sections = categories.map((cat, index) => {
    const items = sortedRegular.filter(item => item.category === cat.type);
    if (items.length === 0) return '';

    const divider = index > 0 ? '<div class="val-section-divider"></div>' : '';
    const anchorId = `val-cat-${generateSlug(cat.type)}`;

    return `
      ${divider}
      <div class="val-section-header" id="${anchorId}">
        <h3 class="val-section-title">${cat.label}</h3>
        <span class="val-section-count">${items.length} items</span>
      </div>
      <div class="val-grid">${items.map(item => makeValuableCard(item)).join('')}</div>`;
  }).join('');

  const christmasItems = sortItems(CHRISTMAS_VALUABLES_DATA);

  const christmasSection = christmasItems.length > 0 ? `
    <div class="val-section-divider"></div>
    <div class="val-section-header" id="val-cat-christmas">
      <h3 class="val-section-title">Christmas Limited</h3>
      <span class="val-section-count">${christmasItems.length} items</span>
    </div>
    <div class="val-grid">${christmasItems.map(item => makeValuableCard(item)).join('')}</div>` : '';

  const fourthOfJulyItems = sortItems(FOURTH_OF_JULY_VALUABLES_DATA);

  const fourthOfJulySection = fourthOfJulyItems.length > 0 ? `
    <div class="val-section-divider"></div>
    <div class="val-section-header" id="val-cat-4th-of-july">
      <h3 class="val-section-title">4th of July Limited</h3>
      <span class="val-section-count">${fourthOfJulyItems.length} items</span>
    </div>
    <div class="val-grid">${fourthOfJulyItems.map(item => makeValuableCard(item)).join('')}</div>` : '';

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortValuables('high')" },
    { label: 'Cheapest first', value: 'low', onClick: "sortValuables('low')" },
    { label: 'Heaviest first', value: 'weight-high', onClick: "sortValuables('weight-high')" },
    { label: 'Lightest first', value: 'weight-low', onClick: "sortValuables('weight-low')" },
    { label: 'A-Z', value: 'az', onClick: "sortValuables('az')" }
  ], sort);

  const jumpLinks = categories
    .filter(cat => sortedRegular.some(item => item.category === cat.type))
    .map(cat => `<a onclick="scrollToPageSection('val-cat-${generateSlug(cat.type)}')">${cat.label}</a>`)
    .join('');
  const xmasLink = christmasItems.length > 0
    ? `<a onclick="scrollToPageSection('val-cat-christmas')">Christmas</a>`
    : '';
  const fourthLink = fourthOfJulyItems.length > 0
    ? `<a onclick="scrollToPageSection('val-cat-4th-of-july')">4th of July</a>`
    : '';
  const jumpNav = `<div class="page-jump-nav">${jumpLinks}${xmasLink}${fourthLink}</div>`;

  return `
    <h2>VALUABLES</h2>
    ${sortButtons}
    ${jumpNav}
    ${sections}
    ${christmasSection}
    ${fourthOfJulySection}`;
}

function sortValuables(order) {
  document.getElementById('page-container').innerHTML = renderValuables(order);
}