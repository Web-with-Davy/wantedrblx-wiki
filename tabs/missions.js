
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

      const title = typeof tv === 'function' ? tv(item, 'title') : item.title;
      const location = typeof tv === 'function' ? tv(item, 'location') : item.location;
      const description = typeof tv === 'function' ? tv(item, 'description') : item.description;
      const howToComplete = typeof tv === 'function' ? tv(item, 'howToComplete') : item.howToComplete;

      const visibleContent = `<h3>${title}</h3>`;
      const hiddenContent = `
        ${renderStat(t('stat_location'), location)}
        ${renderStat(t('stat_description'), description)}
        ${renderStat(t('stat_how'), howToComplete)}
        ${renderStat(t('stat_reward'), formattedRewards)}
      `;

      return renderExpandableCardJPG(item, item.difficulty, visibleContent, hiddenContent, 'missions');
    });
  };

  const categories = [
    { type: 'Game', key: 'cat_game_missions' },
    { type: 'Erik', key: 'cat_erik_missions' },
    { type: 'Dan', key: 'cat_dan_missions' },
    { type: 'Sir. B', key: 'cat_sirb_missions' },
    { type: 'Bert', key: 'cat_bert_missions' },
    { type: 'Easter', key: 'cat_easter_missions' },
    { type: 'Christmas', key: 'cat_christmas_missions' },
  ];

  const sections = categories.map((cat, index) => {
    const missionsInCategory = allMissions.filter(m => m.missionType === cat.type);
    if (missionsInCategory.length === 0) return '';

    const sortedMissions = sortMissionsList(missionsInCategory);
    const cards = makeMissionCards(sortedMissions);

    const divider = index > 0 ? '<div style="margin: 40px 0; border-bottom: 2px solid #fff; opacity: 0.3;"></div>' : '';

    return `
      ${divider}
      <h3 style="margin: 20px 0 10px;">${t(cat.key)}</h3>
      <div class="card-grid">
        ${cards.join('')}
      </div>
    `;
  }).join('');

  const sortButtons = renderSortButtons([
    { label: t('sort_hardest'), value: 'hard', onClick: "sortMissions('hard')" },
    { label: t('sort_easiest'), value: 'easy', onClick: "sortMissions('easy')" }
  ], order);

  return `
    <h2>${t('page_missions')}</h2>
    <div class="page-disclaimer">${t('disclaimer_wip')}</div>
    ${sortButtons}
    ${sections}
  `;
}

function sortMissions(order) {
  document.getElementById("page-container").innerHTML = renderMissions(order);
}