function renderNPCs(order = "az") {
  const sorted = [...NPCS_DATA].sort((a, b) =>
    order === "az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const cards = sorted.map(item => {
    const visibleContent = `<h3>${item.name}</h3>`;
    const hiddenContent = `
      ${renderStat(t('stat_location'),    tv(item, 'location'))}
      ${renderStat(t('stat_description'), tv(item, 'description'))}
    `;
    return renderNPCCard(item, item.team, visibleContent, hiddenContent, 'npcs');
  });

  const sortButtons = renderSortButtons([
    { label: t('sort_az'), value: 'az', onClick: "sortNPCs('az')" },
    { label: t('sort_za'), value: 'za', onClick: "sortNPCs('za')" }
  ], order);

  return renderPage(t('page_npcs'), sortButtons, cards, t('disclaimer_wip'));
}

function sortNPCs(order) {
  document.getElementById("page-container").innerHTML = renderNPCs(order);
}