function renderGunCrates(sort = "a-z") {
  let sorted = [...GUN_CRATES_DATA];

  if (sort === "a-z") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "z-a") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  }

  const cards = sorted.map(item => {
    const visibleContent = `<h3>${item.name}</h3>`;
    const hiddenContent  = `
      ${renderStat('Content',  item.gun)}
      ${renderStat('Location', item.location)}
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