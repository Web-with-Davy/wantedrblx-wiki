function renderLocations(order = "az") {
  const sorted = [...LOCATIONS_DATA].sort((a, b) => {
    const nameA = typeof tv === 'function' ? a.name : a.name;
    const nameB = typeof tv === 'function' ? b.name : b.name;
    return order === "az"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  const cards = sorted.map(item => {
    const name = typeof tv === 'function' ? item.name : item.name;
    const description = typeof tv === 'function' ? item.description : item.description;

    const visibleContent = `<h3>${name}</h3>`;
    const hiddenContent  = `<p>${description}</p>`;
    return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'locations');
  });

  const sortButtons = renderSortButtons([
    { label: 'A-Z', value: 'az', onClick: "sortLocations('az')" },
    { label: 'Z-A', value: 'za', onClick: "sortLocations('za')" }
  ], order);

  return renderPage('LOCATIONS', sortButtons, cards);
}

function sortLocations(order) {
  document.getElementById("page-container").innerHTML = renderLocations(order);
}