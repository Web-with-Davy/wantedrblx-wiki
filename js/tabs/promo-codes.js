function renderPromoCodes(filter = "all") {
  let filteredCodes = PROMO_CODES_DATA;
  if (filter === "active")  filteredCodes = PROMO_CODES_DATA.filter(item => item.active);
  if (filter === "expired") filteredCodes = PROMO_CODES_DATA.filter(item => !item.active);

  const cards = filteredCodes.map(item => {
    const statusColor = item.active ? '#00ffaa' : '#ff3333';
    const statusText  = item.active ? 'Active'  : 'Expired';
    const statusHtml  = `<span style="color:${statusColor};text-shadow:0 0 5px ${statusColor};">${statusText}</span>`;
    const expiredClass = item.active ? '' : ' expired-code';
    const copyBtnHtml = `<button class="val-copy-btn${expiredClass}" onclick="copyPromoCode('${item.code}', this)">⎘ Copy Code</button>`;

    return makeUniversalCard(item, {
      codeText: item.code,
      rarityKey: null,
      accentColor: statusColor,
      visibleStats: [
        { label: 'Status', value: statusHtml },
        { label: 'Reward', value: item.reward },
      ].filter(s => s.value),
      hiddenStats: [
        { label: 'Description', value: item.description },
      ].filter(s => s.value),
      extraBodyHtml: copyBtnHtml
    });
  }).join('');

  const filterButtons = renderSortButtons([
    { label: 'All',     value: 'all',     onClick: "filterPromoCodes('all')"     },
    { label: 'Active',  value: 'active',  onClick: "filterPromoCodes('active')"  },
    { label: 'Expired', value: 'expired', onClick: "filterPromoCodes('expired')" }
  ], filter);

  return `
    <h2>PROMO CODES</h2>
    ${filterButtons}
    <div class="val-grid">${cards}</div>
  `;
}

function filterPromoCodes(status) {
  const container = document.getElementById("page-container");
  if (container) container.innerHTML = renderPromoCodes(status);
}
