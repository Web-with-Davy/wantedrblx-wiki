function renderStore(sort = "high") {
    const sortFn = (a, b) =>
        sort === "high" ? b.robuxPrice - a.robuxPrice : a.robuxPrice - b.robuxPrice;

    const sortedStoreItems = [...STORE_DATA].sort(sortFn);

    const cards = sortedStoreItems.map(item => {
        const robuxIcon = `https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/e/d/f/edfae9388da4cd8496b885a8a2df613372500d9c.png`;
        const robuxPriceHtml = `<img src="${robuxIcon}" alt="Robux" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px; border-radius: 0; padding: 0;" onerror="this.src=''; this.alt='Robux'"/>${item.robuxPrice}`;

        const visibleContent = `
            <h3>${tv(item, 'name')}</h3>
            ${renderStat(t('stat_price'),       robuxPriceHtml)}
            ${renderStat(t('stat_description'), tv(item, 'description'))}
        `;

        const slug = generateSlug(item.name);

        const imgTag = `<img src="images/store/${slug}.jpg" alt="${item.name}" loading="lazy"
          style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2);"
          onerror="this.onerror=null; this.src='images/favicon.png'; this.style.opacity='0.5'; this.style.objectFit='contain'; this.style.height='150px';"/>`;

        return `
          <div class="card">
            ${imgTag}
            ${visibleContent}
          </div>
        `;
    });

    const sortButtons = renderSortButtons([
        { label: t('sort_expensive'), value: 'high', onClick: "sortStore('high')" },
        { label: t('sort_cheap'),     value: 'low',  onClick: "sortStore('low')" }
    ], sort);

    return renderPage(t('page_store'), sortButtons, cards);
}

function sortStore(order) {
    const container = document.getElementById("page-container");
    if (container) container.innerHTML = renderStore(order);
}
