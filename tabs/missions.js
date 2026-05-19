
function renderMissions(order = "hard") {
  const allMissions = [...MISSIONS_DATA];

  const sortMissionsList = (list) => {
    return [...list].sort((a, b) => {
      const diffA = DIFFICULTIES[a.difficulty];
      const diffB = DIFFICULTIES[b.difficulty];

      if (diffA.order === diffB.order) {
        const numA = parseInt(a.title) || 0;
        const numB = parseInt(b.title) || 0;
        if (numA !== 0 || numB !== 0) {
          return order === "hard" ? numB - numA : numA - numB;
        }
      }

      return order === "hard" ? diffB.order - diffA.order : diffA.order - diffB.order;
    });
  };

  const makeMissionCards = (list) => {
    return list.map(item => {
      const formattedRewards = (item.rewards || []).map(formatReward).join(', ');

      const title = item.title;
      const location = item.location;
      const description = item.description;
      const howToComplete = item.howToComplete;

      const visibleContent = `<h3>${title}</h3>`;
      const hiddenContent = `
        ${renderStat('Location', location)}
        ${renderStat('Description', description)}
        ${renderStat('How', howToComplete)}
        ${renderStat('Reward', formattedRewards)}
      `;

      return renderExpandableCardJPG(item, item.difficulty, visibleContent, hiddenContent, 'missions');
    });
  };

  const categories = [
    { type: 'Game', label: 'Game Missions' },
    { type: 'Erik', label: "Erik's Missions" },
    { type: 'Dan', label: "Dan's Missions" },
    { type: 'Sir. B', label: "Sir. B's Missions" },
    { type: 'Bert', label: "Bert's Missions" },
    { type: 'Easter', label: 'Easter Missions' },
    { type: 'Christmas', label: 'Christmas Missions' },
  ];

  const sections = categories.map((cat, index) => {
    const missionsInCategory = allMissions.filter(m => m.missionType === cat.type);
    if (missionsInCategory.length === 0) return '';

    const sortedMissions = sortMissionsList(missionsInCategory);
    const cards = makeMissionCards(sortedMissions);

    const divider = index > 0 ? '<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>' : '';

    return `
      ${divider}
      <h3 style="margin: 20px 0 10px;">${cat.label}</h3>
      <div class="card-grid">
        ${cards.join('')}
      </div>
    `;
  }).join('');

  const sortButtons = renderSortButtons([
    { label: 'Hardest first', value: 'hard', onClick: "sortMissions('hard')" },
    { label: 'Easiest first', value: 'easy', onClick: "sortMissions('easy')" }
  ], order);

  return `
    <h2>${'MISSIONS'}</h2>
    <div class="page-disclaimer">${'This page is currently unfinished and being worked on'}</div>
    ${sortButtons}
    ${sections}
  `;
}

function sortMissions(order) {
  document.getElementById("page-container").innerHTML = renderMissions(order);
}