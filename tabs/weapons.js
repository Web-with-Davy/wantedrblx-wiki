function renderWeapons(sort = "high") {
  const sortFn = (a, b) => {
    const valA = typeof a.contractPrice === 'number' ? a.contractPrice : 0;
    const valB = typeof b.contractPrice === 'number' ? b.contractPrice : 0;
    return sort === "high" ? valB - valA : valA - valB;
  };

  const sortedGuns       = [...GUNS_DATA].sort(sortFn);
  const sortedExplosives = [...EXPLOSIVES_DATA].sort(sortFn);
  const sortedTools      = [...TOOLS_DATA].sort(sortFn);

  function makeCards(data) {
    return data.map(item => {
      const hasAttachments = item.attachments && Object.keys(item.attachments).length > 0;
      const visibleContent = `
        ${hasAttachments ? '' : renderPriceTag(item.contractPrice)}
        <h3>${item.name}</h3>
      `;
      const hiddenContent = `
        ${renderStat('Obtaining',  item.obtaining)}
        ${renderStat('Location',   item.location || (item.stats && item.stats.location))}
        ${renderStat('Re-Buy Price',      formatPrice(item.reBuyPrice))}
        ${renderStat('Sell Price',       formatPrice(item.sellPrice))}
        ${renderStat('Ammo',       item.stats && item.stats.ammo)}
        ${renderStat('Ammo Cost',  item.stats && item.stats.ammoPrice)}
        ${renderStat('Damage',     item.stats && item.stats.damage)}
        ${renderStat('Fire Rate',        item.stats && item.stats.firerate)}
        ${item.stats && item.stats.reload ? renderStat('Reload Speed', `${item.stats.reload}s`) : ''}
        ${renderStat('Accuracy',   item.stats && item.stats.accuracy)}
      `;
      return renderWeaponCard(item, null, visibleContent, hiddenContent, 'weapons');
    });
  }

  const gunCards       = makeCards(sortedGuns);
  const explosiveCards = makeCards(sortedExplosives);
  const toolCards      = makeCards(sortedTools);

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortWeapons('high')" },
    { label: 'Cheapest first',     value: 'low',  onClick: "sortWeapons('low')" }
  ], sort);

  const divider = `<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>`;

  return `
    <h2>${'WEAPONS'}</h2>
    ${sortButtons}
    <h3 style="margin: 20px 0 10px;">${'Guns'}</h3>
    <div class="card-grid">${gunCards.join('')}</div>
    ${divider}
    <h3 style="margin: 20px 0 10px;">${'Explosives'}</h3>
    <div class="card-grid">${explosiveCards.join('')}</div>
    ${divider}
    <h3 style="margin: 20px 0 10px;">${'Tools'}</h3>
    <div class="card-grid">${toolCards.join('')}</div>
  `;
}

function sortWeapons(order) {
  document.getElementById("page-container").innerHTML = renderWeapons(order);
}