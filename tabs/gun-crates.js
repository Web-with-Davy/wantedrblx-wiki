function renderGunCrates(sort = "a-z") {
  let sorted = [...GUN_CRATES_DATA];

  if (sort === "a-z") {
    sorted.sort((a, b) => {
      const nameA = typeof tv === 'function' ? a.name : a.name;
      const nameB = typeof tv === 'function' ? b.name : b.name;
      return nameA.localeCompare(nameB);
    });
  } else if (sort === "z-a") {
    sorted.sort((a, b) => {
      const nameA = typeof tv === 'function' ? a.name : a.name;
      const nameB = typeof tv === 'function' ? b.name : b.name;
      return nameB.localeCompare(nameA);
    });
  }

  const cards = sorted.map(item => {
    const name = typeof tv === 'function' ? item.name : item.name;
    const gun = typeof tv === 'function' ? item.gun : item.gun;
    const location = typeof tv === 'function' ? item.location : item.location;

    const visibleContent = `<h3>${name}</h3>`;
    const hiddenContent  = `
      ${renderStat('Content',  gun)}
      ${renderStat('Location', location)}
    `;
    return renderExpandableCardJPG(item, null, visibleContent, hiddenContent, 'crates');
  });

  const sortButtons = renderSortButtons([
    { label: 'A-Z', value: 'a-z', onClick: "sortGunCrates('a-z')" },
    { label: 'Z-A', value: 'z-a', onClick: "sortGunCrates('z-a')" }
  ], sort);

  return renderPage('GUN CRATES', sortButtons, cards);
}

function sortGunCrates(order) {
  document.getElementById("page-container").innerHTML = renderGunCrates(order);
}