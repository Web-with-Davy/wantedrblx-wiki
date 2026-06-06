function renderLocations(order = "az") {
  const sorted = [...LOCATIONS_DATA].sort((a, b) => {
    return order === "az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const cards = sorted.map(item => {
    const visibleContent = `<h3>${item.name}</h3>`;
    const hiddenContent  = `<p>${item.description}</p>`;
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