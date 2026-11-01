function makeNPCCard(item, displayName) {
  const visibleStats = [
    { label: 'Location', value: item.location },
  ].filter(s => s.value);

  return makeUniversalCard(item, {
    folder: 'npcs',
    rarityKey: item.team,
    displayName: displayName || undefined,
    visibleStats,
    hiddenStats: [],
    itemCategory: 'npcs',
    showButton: false
  });
}

function renderNPCs(order = "az") {
  const sorted = [...NPCS_DATA].sort((a, b) => {
    if (order === 'team') return (a.team || '').localeCompare(b.team || '') || a.name.localeCompare(b.name);
    if (order === 'location') return (a.location || '').localeCompare(b.location || '') || a.name.localeCompare(b.name);
    return order === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const cards = sorted.map(item => makeNPCCard(item)).join('');

  const sortButtons = renderSortButtons([
    { label: 'A-Z', value: 'az', onClick: "sortNPCs('az')" },
    { label: 'Z-A', value: 'za', onClick: "sortNPCs('za')" },
    { label: 'By team', value: 'team', onClick: "sortNPCs('team')" },
    { label: 'By location', value: 'location', onClick: "sortNPCs('location')" }
  ], order);

  return `
    <h2>NPCs</h2>
    <div class="page-disclaimer">This page is currently unfinished and being worked on</div>
    ${sortButtons}
    <div class="val-grid">${cards}</div>
  `;
}

function sortNPCs(order) {
  document.getElementById("page-container").innerHTML = renderNPCs(order);
}