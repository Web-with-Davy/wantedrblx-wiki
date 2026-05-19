function renderNPCs(order = "az") {
  const sorted = [...NPCS_DATA].sort((a, b) =>
    order === "az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  const cards = sorted.map(item => {
    const visibleContent = `<h3>${item.name}</h3>`;
    const hiddenContent = `
      ${renderStat('Location',    item.location)}
      ${renderStat('Description', item.description)}
    `;
    return renderNPCCard(item, item.team, visibleContent, hiddenContent, 'npcs');
  });

  const sortButtons = renderSortButtons([
    { label: 'A-Z', value: 'az', onClick: "sortNPCs('az')" },
    { label: 'Z-A', value: 'za', onClick: "sortNPCs('za')" }
  ], order);

  return renderPage('NPCs', sortButtons, cards, 'This page is currently unfinished and being worked on');
}

function sortNPCs(order) {
  document.getElementById("page-container").innerHTML = renderNPCs(order);
}