function renderPromoCodes(filter = "all") {
    let filteredCodes = PROMO_CODES_DATA;

    if (filter === "active") {
        filteredCodes = PROMO_CODES_DATA.filter(item => item.active);
    } else if (filter === "expired") {
        filteredCodes = PROMO_CODES_DATA.filter(item => !item.active);
    }

    const cards = filteredCodes.map(item => {
        const statusText  = item.active ? t('status_active') : t('status_expired');
        const statusColor = item.active ? '#00ffaa' : '#ff3333';
        const statusHtml  = `<span style="color: ${statusColor}; text-shadow: 0 0 5px ${statusColor};">${statusText}</span>`;

        const visibleContent = `
            <h3>${item.code}</h3>
            ${renderStat(t('stat_status'),      statusHtml)}
            ${renderStat(t('stat_code_reward'), tv(item, 'reward'))}
            ${renderStat(t('stat_description'), tv(item, 'description'))}
        `;

        const slug = generateSlug(item.code);

        const imgTag = `<img src="images/promocodes/${slug}.jpg" alt="${item.code}" loading="lazy"
          style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; box-shadow:0 0 10px rgba(255,255,255,0.2);"
          onerror="this.onerror=null; this.src='images/favicon.png'; this.style.opacity='0.5'; this.style.objectFit='contain'; this.style.height='150px';"/>`;

        return `
          <div class="card" style="border-top: 3px solid ${statusColor};">
            ${imgTag}
            ${visibleContent}
          </div>
        `;
    });

    const filterButtons = renderSortButtons([
        { label: t('filter_all'),     value: 'all',     onClick: "filterPromoCodes('all')" },
        { label: t('filter_active'),  value: 'active',  onClick: "filterPromoCodes('active')" },
        { label: t('filter_expired'), value: 'expired', onClick: "filterPromoCodes('expired')" }
    ], filter);

    return renderPage(t('page_promo_codes'), filterButtons, cards, t('promo_disclaimer'));
}

function filterPromoCodes(status) {
    const container = document.getElementById("page-container");
    if (container) container.innerHTML = renderPromoCodes(status);
}
