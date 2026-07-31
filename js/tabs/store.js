function makeStoreCard(item, displayName) {
  const robuxIcon = `https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/e/d/f/edfae9388da4cd8496b885a8a2df613372500d9c.png`;
  const robuxHtml = `<img src="${robuxIcon}" alt="Robux"
    style="width:14px;height:14px;vertical-align:middle;margin-right:3px;border-radius:0;padding:0;"
    onerror="this.src='';this.alt='R$'"/>
    ${item.robuxPrice}`;

  return makeUniversalCard(item, {
    folder: 'store',
    rarityKey: null,
    displayName: displayName || undefined,
    visibleStats: [
      { label: 'Price',       value: robuxHtml     },
      { label: 'Description', value: item.description },
    ].filter(s => s.value),
    hiddenStats: [],
    showButton: false
  });
}

function renderStore(sort = "high") {
  const sortFn = (a, b) =>
    sort === "high" ? b.robuxPrice - a.robuxPrice : a.robuxPrice - b.robuxPrice;

  const sortedStoreItems = [...STORE_DATA].sort(sortFn);

  const cards = sortedStoreItems.map(item => makeStoreCard(item)).join('');

  const sortButtons = renderSortButtons([
    { label: 'Most expensive first', value: 'high', onClick: "sortStore('high')" },
    { label: 'Cheapest first',       value: 'low',  onClick: "sortStore('low')"  }
  ], sort);

  return `
    <h2>STORE</h2>
    ${sortButtons}
    <div class="val-grid">${cards}</div>
  `;
}

function sortStore(order) {
  const container = document.getElementById("page-container");
  if (container) container.innerHTML = renderStore(order);
}
