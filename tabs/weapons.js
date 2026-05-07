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
        ${hasAttachments ? '' : renderPriceTag(tv(item, 'contractPrice'))}
        <h3>${tv(item, 'name')}</h3>
      `;
      const hiddenContent = `
        ${renderStat(t('stat_obtaining'),  tv(item, 'obtaining'))}
        ${renderStat(t('stat_location'),   tv(item, 'location') || tv(item.stats, 'location'))}
        ${renderStat(t('stat_rebuy'),      formatPrice(item.reBuyPrice))}
        ${renderStat(t('stat_sell'),       formatPrice(item.sellPrice))}
        ${renderStat(t('stat_ammo'),       item.stats.ammo)}
        ${renderStat(t('stat_ammo_cost'),  tv(item.stats, 'ammoPrice'))}
        ${renderStat(t('stat_damage'),     tv(item.stats, 'damage'))}
        ${renderStat(t('stat_rpm'),        item.stats.firerate)}
        ${item.stats.reload ? renderStat(t('stat_reload'), `${item.stats.reload}s`) : ''}
        ${renderStat(t('stat_accuracy'),   tv(item.stats, 'accuracy'))}
      `;
      return renderWeaponCard(item, null, visibleContent, hiddenContent, 'weapons');
    });
  }

  const gunCards       = makeCards(sortedGuns);
  const explosiveCards = makeCards(sortedExplosives);
  const toolCards      = makeCards(sortedTools);

  const sortButtons = renderSortButtons([
    { label: t('sort_expensive'), value: 'high', onClick: "sortWeapons('high')" },
    { label: t('sort_cheap'),     value: 'low',  onClick: "sortWeapons('low')" }
  ], sort);

  const divider = `<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>`;

  return `
    <h2>${t('page_weapons')}</h2>
    ${sortButtons}
    <h3 style="margin: 20px 0 10px;">${t('cat_guns')}</h3>
    <div class="card-grid">${gunCards.join('')}</div>
    ${divider}
    <h3 style="margin: 20px 0 10px;">${t('cat_explosives')}</h3>
    <div class="card-grid">${explosiveCards.join('')}</div>
    ${divider}
    <h3 style="margin: 20px 0 10px;">${t('cat_tools')}</h3>
    <div class="card-grid">${toolCards.join('')}</div>
  `;
}

function sortWeapons(order) {
  document.getElementById("page-container").innerHTML = renderWeapons(order);
}