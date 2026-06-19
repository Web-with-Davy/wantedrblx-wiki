function renderNPCs(order = "az") {
  const sorted = [...NPCS_DATA].sort((a, b) =>
    order === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const cards = sorted.map(item => {
    const dialogueData = item.dialogue;
    const hasDialogues = dialogueData && Object.keys(dialogueData).length > 0;

    const hiddenStats = [
      { label: 'Location',    value: item.location    },
      { label: 'Description', value: item.description },
    ].filter(s => s.value);

    if (!hasDialogues) {
      return makeUniversalCard(item, {
        folder: 'npcs',
        rarityKey: item.team,
        visibleStats: [],
        hiddenStats,
        showButton: item.showMoreButton !== false && hiddenStats.length > 0
      });
    }

    const dialoguesHTML = Object.entries(dialogueData).map(([category, items]) => {
      if (!items || items.length === 0) return '';
      const itemsHTML = items.map(d => `
        <div class="card-overlay-item">
          <p style="white-space:normal;line-height:1.5;word-break:break-word;">
            ${d.title ? `<strong>${d.title}:</strong> ` : ''}${d.dialogue}
          </p>
        </div>`).join('');
      return `
        <div class="attachment-group">
          <div class="attachment-category-header" onclick="toggleAttachmentCategory(this)">
            <span>${category}</span>
            <span class="attachment-chevron">▼</span>
          </div>
          <div class="attachment-category-items">${itemsHTML}</div>
        </div>`;
    }).join('');

    return makeUniversalCard(item, {
      folder: 'npcs',
      rarityKey: item.team,
      visibleStats: [],
      hiddenStats,
      showButton: item.showMoreButton !== false && hiddenStats.length > 0,
      overlayHtml: dialoguesHTML,
      overlayLabel: 'DIALOGUES'
    });
  }).join('');

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