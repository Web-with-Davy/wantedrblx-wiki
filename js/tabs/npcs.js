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
  const sorted = [...NPCS_DATA].sort((a, b) =>
    order === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const cards = sorted.map(item => makeNPCCard(item)).join('');

  const sortButtons = renderSortButtons([
    { label: 'A-Z', value: 'az', onClick: "sortNPCs('az')" },
    { label: 'Z-A', value: 'za', onClick: "sortNPCs('za')" }
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