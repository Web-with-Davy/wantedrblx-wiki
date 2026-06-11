function renderLocations(order = "az") {
  const sorted = [...LOCATIONS_DATA].sort((a, b) =>
    order === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const cards = sorted.map(item => makeUniversalCard(item, {
    folder: 'locations',
    rarityKey: null,
    visibleStats: [],
    hiddenStats: [
      { label: 'Description', value: item.description },
    ].filter(s => s.value),
    showButton: item.showMoreButton !== false && !!item.description
  })).join('');

  const sortButtons = renderSortButtons([
    { label: 'A-Z', value: 'az', onClick: "sortLocations('az')" },
    { label: 'Z-A', value: 'za', onClick: "sortLocations('za')" }
  ], order);

  return `
    <h2>LOCATIONS</h2>
    ${sortButtons}
    <div class="val-grid">${cards}</div>
  `;
}

function sortLocations(order) {
  document.getElementById("page-container").innerHTML = renderLocations(order);
}