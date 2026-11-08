let promoCodeFilter = 'active';

function renderPromoCodes(filter = promoCodeFilter) {
  promoCodeFilter = filter;
  const filteredCodes = PROMO_CODES_DATA
    .filter(item => filter === 'active' ? item.active : !item.active)
    .sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || a.code.localeCompare(b.code));

  const cards = filteredCodes.map(item => {
    const statusColor = item.active ? '#00ffaa' : '#ff3333';
    const statusText  = item.active ? 'Active'  : 'Inactive';
    const statusHtml  = `<span style="color:${statusColor};text-shadow:0 0 5px ${statusColor};">${statusText}</span>`;
    const expiredClass = item.active ? '' : ' expired-code';
    const copyBtnHtml = `<button class="val-copy-btn${expiredClass}" onclick="copyPromoCode('${item.code}', this)">⎘ Copy Code</button>`;

    return makeUniversalCard(item, {
      codeText: item.code,
      rarityKey: null,
      accentColor: statusColor,
      dateTag: item.isNew ? 'NEW' : null,
      dateColor: '#fff',
      dateOutline: '#00ffaa',
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
    { label: 'Active',   value: 'active',   onClick: "filterPromoCodes('active')"   },
    { label: 'Inactive', value: 'inactive', onClick: "filterPromoCodes('inactive')" }
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
