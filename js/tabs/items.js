function makeItemCard(item, displayName) {
  const contractHtml = formatPrice(item.contractPrice);

  return makeUniversalCard(item, {
    folder: 'items',
    rarityKey: null,
    displayName: displayName || undefined,
    visibleStats: contractHtml ? [{ label: 'Buy Price', value: contractHtml }] : [],
    hiddenStats: [],
    itemCategory: 'items',
    showButton: false
  });
}

function renderItems(sort = 'high') {
  const sortItems = (items) => [...items].sort((a, b) => {
    const priceA = typeof a.contractPrice === 'number' ? a.contractPrice : -1;
    const priceB = typeof b.contractPrice === 'number' ? b.contractPrice : -1;
    return sort === 'high' ? priceB - priceA : priceA - priceB;
  });
  const categories = ['Tools', 'Dropables'];

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortItems('high')" },
    { label: 'Cheapest first', value: 'low', onClick: "sortItems('low')" }
  ], sort);

  const sections = categories.map((category, index) => {
    const items = sortItems((window.ITEMS_BY_CATEGORY || {})[category] || []);
    const divider = index > 0 ? '<div class="val-section-divider"></div>' : '';
    const content = items.length
      ? `<div class="val-grid">${items.map(item => makeItemCard(item)).join('')}</div>`
      : '<p class="page-disclaimer">No items listed yet.</p>';

    return `${divider}<div class="val-section-header" id="items-${category.toLowerCase()}">
      <h3 class="val-section-title">${category}</h3>
      <span class="val-section-count">${items.length} items</span>
    </div>${content}`;
  }).join('');

  return `<h2>ITEMS</h2>${sortButtons}<div class="page-jump-nav">${categories.map(category => `<a onclick="document.getElementById('items-${category.toLowerCase()}')?.scrollIntoView({behavior:'smooth'})">${category}</a>`).join('')}</div>${sections}`;
}

function sortItems(order) {
  document.getElementById('page-container').innerHTML = renderItems(order);
}