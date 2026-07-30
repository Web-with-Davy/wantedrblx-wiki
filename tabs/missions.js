function makeMissionCard(item, displayName) {
  const formattedRewards = (item.rewards || []).map(formatReward).join(', ');
  const visibleStats = [
    formattedRewards ? { label: 'Reward', value: formattedRewards } : null,
  ].filter(Boolean);

  return makeUniversalCard(item, {
    folder: 'missions',
    rarityKey: item.difficulty,
    displayName: displayName || undefined,
    visibleStats,
    hiddenStats: [],
    itemCategory: 'missions',
    showButton: false
  });
}

function renderMissions(order = "hard") {
  const allMissions = [...MISSIONS_DATA];

  const sortMissionsList = (list) => [...list].sort((a, b) => {
    const diffA = DIFFICULTIES[a.difficulty] || { order: 0 };
    const diffB = DIFFICULTIES[b.difficulty] || { order: 0 };
    if (diffA.order === diffB.order) {
      const numA = parseInt(a.title) || 0;
      const numB = parseInt(b.title) || 0;
      if (numA !== 0 || numB !== 0) return order === "hard" ? numB - numA : numA - numB;
    }
    return order === "hard" ? diffB.order - diffA.order : diffA.order - diffB.order;
  });


  const categories = [
    { type: 'Game', label: 'Game Missions', id: 'missions-game' },
    { type: 'Erik', label: "Erik's Missions", id: 'missions-erik' },
    { type: 'Dan', label: "Dan's Missions", id: 'missions-dan' },
    { type: 'Sir. B', label: "Sir. B's Missions", id: 'missions-sirb' },
    { type: 'Bert', label: "Bert's Missions", id: 'missions-bert' },
    { type: 'Easter', label: 'Easter Missions', id: 'missions-easter' },
    { type: 'Christmas', label: 'Christmas Missions', id: 'missions-christmas' },
  ];

  const jumpLinks = categories
    .filter(cat => allMissions.some(m => m.missionType === cat.type))
    .map(cat => `<a onclick="document.getElementById('${cat.id}')?.scrollIntoView({behavior:'smooth'})">${cat.label}</a>`)
    .join('');

  const sections = categories.map((cat, index) => {
    const missionsInCategory = allMissions.filter(m => m.missionType === cat.type);
    if (missionsInCategory.length === 0) return '';
    const sortedMissions = sortMissionsList(missionsInCategory);
    const cards = sortedMissions.map(makeMissionCard).join('');
    const divider = index > 0 ? '<div class="val-section-divider"></div>' : '';
    return `
      ${divider}
      <div class="val-section-header" id="${cat.id}">
        <h3 class="val-section-title">${cat.label}</h3>
        <span class="val-section-count">${sortedMissions.length} items</span>
      </div>
      <div class="val-grid">${cards}</div>`;
  }).join('');

  const sortButtons = renderSortButtons([
    { label: 'Hardest first', value: 'hard', onClick: "sortMissions('hard')" },
    { label: 'Easiest first', value: 'easy', onClick: "sortMissions('easy')" }
  ], order);

  return `
    <h2>MISSIONS</h2>
    <div class="page-disclaimer">This page is currently unfinished and being worked on</div>
    ${sortButtons}
    <div class="page-jump-nav">${jumpLinks}</div>
    ${sections}
  `;
}

function sortMissions(order) {
  document.getElementById("page-container").innerHTML = renderMissions(order);
}