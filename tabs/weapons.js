function renderWeapons(sort = "high") {
  const sortFn = (a, b) => {
    const valA = typeof a.contractPrice === 'number' ? a.contractPrice : 0;
    const valB = typeof b.contractPrice === 'number' ? b.contractPrice : 0;
    return sort === "high" ? valB - valA : valA - valB;
  };

  const sortedGuns       = [...GUNS_DATA].sort(sortFn);
  const sortedExplosives = [...EXPLOSIVES_DATA].sort(sortFn);
  const sortedTools      = [...TOOLS_DATA].sort(sortFn);

  function makeWeaponCard(item) {
    const hasAttachments = item.attachments && Object.keys(item.attachments).length > 0;
    const contractHtml   = formatPrice(item.contractPrice);
    const sellHtml       = formatPrice(item.sellPrice);
    const reBuyHtml      = formatPrice(item.reBuyPrice);

    const visibleStats = [
      contractHtml ? { label: 'Buy Price', value: contractHtml } : null,
    ].filter(Boolean);

    const hiddenStats = [
      { label: 'Obtaining',    value: item.obtaining },
      { label: 'Location',     value: item.location || (item.stats && item.stats.location) },
      reBuyHtml ? { label: 'Re-Buy Price', value: reBuyHtml } : null,
      sellHtml  ? { label: 'Sell Price',   value: sellHtml  } : null,
      { label: 'Ammo',         value: item.stats && item.stats.ammo },
      { label: 'Ammo Cost',    value: item.stats && item.stats.ammoPrice },
      { label: 'Damage',       value: item.stats && item.stats.damage },
      { label: 'Fire Rate',    value: item.stats && item.stats.firerate },
      { label: 'Reload Speed', value: item.stats && item.stats.reload ? `${item.stats.reload}s` : null },
      { label: 'Accuracy',     value: item.stats && item.stats.accuracy },
    ].filter(s => s && s.value !== undefined && s.value !== null && s.value !== '');

    if (!hasAttachments) {
      return makeUniversalCard(item, {
        folder: 'weapons',
        rarityKey: null,
        visibleStats,
        hiddenStats,
        showButton: item.showMoreButton !== false && hiddenStats.length > 0
      });
    }

    const attachmentsHTML = Object.entries(item.attachments || {}).map(([category, items]) => {
      if (!items || items.length === 0) return '';
      const itemsHTML = items.map(att => `<div class="card-overlay-item"><p><strong>${att.name}:</strong> ${att.price === 0 ? `<span style="color:#666">Free</span>` : formatPrice(att.price)}</p></div>`).join('');
      return `<div class="attachment-group"><div class="attachment-category-header" onclick="toggleAttachmentCategory(this)"><span>${category}</span><span class="attachment-chevron">▼</span></div><div class="attachment-category-items">${itemsHTML}</div></div>`;
    }).join('');

    return makeUniversalCard(item, {
      folder: 'weapons',
      rarityKey: null,
      visibleStats,
      hiddenStats,
      showButton: item.showMoreButton !== false && hiddenStats.length > 0,
      overlayHtml: attachmentsHTML,
      overlayLabel: 'ATTACHMENTS'
    });
  }

  const makeSectionCards = (data) => data.map(makeWeaponCard).join('');

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortWeapons('high')" },
    { label: 'Cheapest first',       value: 'low',  onClick: "sortWeapons('low')"  }
  ], sort);

  const jumpNav = `<div class="page-jump-nav">
    <a onclick="document.getElementById('weapons-guns')?.scrollIntoView({behavior:'smooth'})">Guns</a>
    <a onclick="document.getElementById('weapons-explosives')?.scrollIntoView({behavior:'smooth'})">Explosives</a>
    <a onclick="document.getElementById('weapons-tools')?.scrollIntoView({behavior:'smooth'})">Tools</a>
  </div>`;

  const section = (id, label, cards) => `
    <div class="val-section-header" id="${id}">
      <h3 class="val-section-title">${label}</h3>
      <span class="val-section-count">${cards.split('val-card').length - 1} items</span>
    </div>
    <div class="val-grid">${cards}</div>`;

  return `
    <h2>WEAPONS</h2>
    ${sortButtons}
    ${jumpNav}
    ${section('weapons-guns',       'Guns',       makeSectionCards(sortedGuns))}
    <div class="val-section-divider"></div>
    ${section('weapons-explosives', 'Explosives', makeSectionCards(sortedExplosives))}
    <div class="val-section-divider"></div>
    ${section('weapons-tools',      'Tools',      makeSectionCards(sortedTools))}
  `;
}

function sortWeapons(order) {
  document.getElementById("page-container").innerHTML = renderWeapons(order);
}