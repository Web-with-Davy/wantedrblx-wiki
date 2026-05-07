function renderGunCrates(sort = "a-z") {
  let sorted = [...GUN_CRATES_DATA];

  if (sort === "a-z") {
    sorted.sort((a, b) => {
      const nameA = typeof tv === 'function' ? tv(a, 'name') : a.name;
      const nameB = typeof tv === 'function' ? tv(b, 'name') : b.name;
      return nameA.localeCompare(nameB);
    });
  } else if (sort === "z-a") {
    sorted.sort((a, b) => {
      const nameA = typeof tv === 'function' ? tv(a, 'name') : a.name;
      const nameB = typeof tv === 'function' ? tv(b, 'name') : b.name;
      return nameB.localeCompare(nameA);
    });
  }

  const cards = sorted.map(item => {
    const name = typeof tv === 'function' ? tv(item, 'name') : item.name;
    const gun = typeof tv === 'function' ? tv(item, 'gun') : item.gun;
    const location = typeof tv === 'function' ? tv(item, 'location') : item.location;

    const visibleContent = `<h3>${name}</h3>`;
    const hiddenContent  = `
      ${renderStat(t('stat_content'),  gun)}
      ${renderStat(t('stat_location'), location)}
    `;
    return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'crates');
  });

  const sortButtons = renderSortButtons([
    { label: t('sort_az'), value: 'a-z', onClick: "sortGunCrates('a-z')" },
    { label: t('sort_za'), value: 'z-a', onClick: "sortGunCrates('z-a')" }
  ], sort);

  return renderPage(t('page_gun_crates'), sortButtons, cards);
}

function sortGunCrates(order) {
  document.getElementById("page-container").innerHTML = renderGunCrates(order);
}