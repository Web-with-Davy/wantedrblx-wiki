function renderGunCrates(sort = "a-z") {
  let sorted = [...GUN_CRATES_DATA];
  if (sort === "a-z") sorted.sort((a, b) => a.name.localeCompare(b.name));
  else                sorted.sort((a, b) => b.name.localeCompare(a.name));

  const cards = sorted.map(item => makeUniversalCard(item, {
    folder: 'crates',
    rarityKey: null,
    visibleStats: [],
    hiddenStats: [
      { label: 'Content',  value: item.gun      },
      { label: 'Location', value: item.location },
    ].filter(s => s.value),
    showButton: item.showMoreButton !== false
  })).join('');

  const sortButtons = renderSortButtons([
    { label: 'A-Z', value: 'a-z', onClick: "sortGunCrates('a-z')" },
    { label: 'Z-A', value: 'z-a', onClick: "sortGunCrates('z-a')" }
  ], sort);

  return `
    <h2>GUN CRATES</h2>
    ${sortButtons}
    <div class="val-grid">${cards}</div>
  `;
}

function sortGunCrates(order) {
  document.getElementById("page-container").innerHTML = renderGunCrates(order);
}