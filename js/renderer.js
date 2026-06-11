function makeUniversalCard(item, opts = {}) {
  const name    = item.name || item.title || item.code || '';
  const slug    = item.id   || generateSlug(name);
  const ext     = opts.ext    || 'jpg';
  const folder  = opts.folder || '';
  const imgSrc  = folder ? `images/${folder}/${slug}.${ext}` : `images/${slug}.${ext}`;

  const rarityKey   = opts.rarityKey;
  const rarity      = rarityKey ? (RARITIES[rarityKey] || DIFFICULTIES[rarityKey] || TEAMS[rarityKey]) : null;
  const rarityName  = rarity ? rarity.name  : '';
  const rarityClass = rarity ? rarity.class : '';

  const accentStyle = opts.accentColor
    ? `style="background:${opts.accentColor};box-shadow:0 0 6px ${opts.accentColor};"`
    : '';

  let dateTagHtml = '';
  if (opts.dateTag) {
    const dc = opts.dateColor   ? `color:${opts.dateColor};`   : '';
    const ds = opts.dateOutline ? `border-color:${opts.dateOutline};box-shadow:0 0 8px ${opts.dateOutline};text-shadow:0 0 5px ${opts.dateOutline};` : '';
    dateTagHtml = `<span class="val-rarity-tag" style="${dc}${ds}">${opts.dateTag}</span>`;
  }

  const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 8)}`;

  const buildStatRow = ({label, value}) => {
    if (!value && value !== 0) return '';
    return `<div class="val-stat"><span class="val-stat-label">${label}</span><span class="val-stat-value">${value}</span></div>`;
  };

  const visibleRows = (opts.visibleStats || []).map(buildStatRow).join('');
  const hiddenRows  = (opts.hiddenStats  || []).map(buildStatRow).join('');

  const hasHidden  = hiddenRows.trim() !== '' || (opts.extraBodyHtml || '').trim() !== '';
  const showButton = opts.showButton !== undefined
    ? opts.showButton
    : (item.showMoreButton !== false && hasHidden);

  const hiddenBlock = hasHidden ? `<div class="val-hidden ${showButton ? 'collapsed' : ''}" id="${cardId}-details">${hiddenRows}${opts.extraBodyHtml || ''}</div>` : '';
  const toggleBtn   = showButton ? `<button class="val-toggle" onclick="toggleCardDetails('${cardId}', this)">Show more...</button>` : '';

  const overlayHtml  = opts.overlayHtml  || '';
  const overlayLabel = opts.overlayLabel || 'VIEW';

  const overlayBtn = overlayHtml
    ? `<button class="val-overlay-btn" onclick="toggleValCardOverlay(this)">${overlayLabel}</button>`
    : '';

  const overlayPanel = overlayHtml ? `
    <div class="val-overlay-panel">
      <button class="val-overlay-close" onclick="toggleValCardOverlay(this)">✕ Close</button>
      <div class="val-overlay-title">${overlayLabel}</div>
      <div class="val-overlay-body">${overlayHtml}</div>
    </div>` : '';

  const headlineHtml = opts.headlineHtml || '';
  const badgeHtml    = opts.badgeHtml    || '';
  const wideClass    = opts.wide ? ' val-card-wide' : '';

  return `
    <div class="val-card${wideClass}" data-rarity="${rarityKey || ''}">
      <div class="val-rarity-bar ${rarityClass}" ${accentStyle}></div>
      <div class="val-img-wrap">
        <img src="${imgSrc}" alt="${name}" loading="lazy" class="val-img"
          onerror="this.onerror=null;this.src='images/favicon.png';this.classList.add('val-img-fallback');">
        ${rarityName && !opts.dateTag ? `<span class="val-rarity-tag ${rarityClass}">${rarityName}</span>` : ''}
        ${dateTagHtml}
        ${badgeHtml}
        ${overlayBtn}
      </div>
      <div class="val-body">
        ${headlineHtml}
        <h3 class="val-name">${name}</h3>
        ${visibleRows}
        ${hiddenBlock}
        ${toggleBtn}
      </div>
      ${overlayPanel}
    </div>`;
}

function toggleValCardOverlay(btn) {
  const card = btn.closest('.val-card');
  if (!card) return;
  const panel = card.querySelector('.val-overlay-panel');
  if (panel) panel.classList.toggle('active');
}

function renderCard(item, rarityKey, content, folder = null) {
  return makeUniversalCard(item, { folder, rarityKey, ext: 'png', extraBodyHtml: content });
}

function renderCardJPG(item, rarityKey, content, folder = null) {
  return makeUniversalCard(item, { folder, rarityKey, extraBodyHtml: content });
}

function renderPriceTag(price) {
  const html = formatPrice(price);
  if (!html) return '';
  return `<div class="val-price-row"><span class="val-price-label">Contract Price</span><span class="val-price-value">${html}</span></div>`;
}

function renderSortButtons(buttons, activeSort) {
  return `<div class="sort-buttons">${buttons.map(btn => `<span class="sort-btn ${activeSort === btn.value ? 'active' : ''}" onclick="${btn.onClick}">${btn.label}</span>`).join('')}</div>`;
}

function renderPage(title, sortButtons, cards, disclaimer = null) {
  return `<h2>${title}</h2>${disclaimer ? `<div class="page-disclaimer">${disclaimer}</div>` : ''}${sortButtons}<div class="val-grid">${cards.join('')}</div>`;
}

function renderStat(label, value) {
  if (value === undefined || value === null || value === '' || value === '?' || value === '? - ?') return '';
  return `<div class="val-stat"><span class="val-stat-label">${label}</span><span class="val-stat-value">${value}</span></div>`;
}

function renderStatSuffix(label, val, suffix) {
  return val !== undefined && val !== null ? renderStat(label, `${val}${suffix}`) : '';
}

function renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, ext = 'jpg', folder = null) {
  return makeUniversalCard(item, {
    folder, rarityKey, ext,
    extraBodyHtml: `${visibleContent || ''}${hiddenContent || ''}`,
    showButton: item.showMoreButton !== false && (hiddenContent || '').trim() !== ''
  });
}

function renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder = null) {
  return renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, 'jpg', folder);
}

function renderExpandableCardPNG(item, rarityKey, visibleContent, hiddenContent, folder = null) {
  return renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, 'png', folder);
}

function toggleCardOverlay(btn) {
  toggleValCardOverlay(btn);
}

function toggleAttachmentCategory(headerEl) {
  const group = headerEl.closest('.attachment-group');
  if (group) group.classList.toggle('open');
}

function renderNPCCard(item, rarityKey, visibleContent, hiddenContent, folder = 'npcs') {
  const dialogueData = item.dialogue;
  const hasDialogues = dialogueData && Object.keys(dialogueData).length > 0;

  if (!hasDialogues) {
    return renderExpandableCardPNG(item, rarityKey, visibleContent, hiddenContent, folder);
  }

  const dialoguesHTML = Object.entries(dialogueData).map(([category, items]) => {
    if (!items || items.length === 0) return '';
    const itemsHTML = items.map(d => `<div class="card-overlay-item"><p style="white-space:normal;line-height:1.5;word-break:break-word;">${d.title ? `<strong>${d.title}:</strong> ` : ''}${d.dialogue}</p></div>`).join('');
    return `<div class="attachment-group"><div class="attachment-category-header" onclick="toggleAttachmentCategory(this)"><span>${category}</span><span class="attachment-chevron">▼</span></div><div class="attachment-category-items">${itemsHTML}</div></div>`;
  }).join('');

  return makeUniversalCard(item, {
    folder, rarityKey, ext: 'png',
    extraBodyHtml: `${visibleContent || ''}${hiddenContent || ''}`,
    showButton: item.showMoreButton !== false && (hiddenContent || '').trim() !== '',
    overlayHtml: dialoguesHTML,
    overlayLabel: 'DIALOGUES'
  });
}

function renderWeaponCard(item, rarityKey, visibleContent, hiddenContent, folder = 'weapons') {
  const hasAttachments = item.attachments && Object.keys(item.attachments).length > 0;

  if (!hasAttachments) {
    return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);
  }

  const attachmentsHTML = Object.entries(item.attachments || {}).map(([category, items]) => {
    if (!items || items.length === 0) return '';
    const itemsHTML = items.map(att => `<div class="card-overlay-item"><p><strong>${att.name}:</strong> ${att.price === 0 ? `<span style="color:#666">Free</span>` : formatPrice(att.price)}</p></div>`).join('');
    return `<div class="attachment-group"><div class="attachment-category-header" onclick="toggleAttachmentCategory(this)"><span>${category}</span><span class="attachment-chevron">▼</span></div><div class="attachment-category-items">${itemsHTML}</div></div>`;
  }).join('');

  const contractHtml = formatPrice(item.contractPrice);
  const headlineHtml = contractHtml ? `<div class="val-price-row"><span class="val-price-label">Contract Price</span><span class="val-price-value">${contractHtml}</span></div>` : '';

  return makeUniversalCard(item, {
    folder, rarityKey,
    headlineHtml,
    extraBodyHtml: `${visibleContent || ''}${hiddenContent || ''}`,
    showButton: item.showMoreButton !== false && (hiddenContent || '').trim() !== '',
    overlayHtml: attachmentsHTML,
    overlayLabel: 'ATTACHMENTS'
  });
}

function renderEventCard(item, visibleContent, hiddenContent, folder = 'events') {
  const name    = item.title || item.name || '';
  const imgSlug = item.image || item.id || generateSlug(name);
  const cardId  = `card-${imgSlug}-${Math.random().toString(36).substr(2, 8)}`;
  const imgSrc  = `images/${folder}/${imgSlug}.jpg`;

  const dc = item.dateColor   ? `color:${item.dateColor};`   : '';
  const ds = item.dateOutline ? `border-color:${item.dateOutline};box-shadow:0 0 8px ${item.dateOutline};text-shadow:0 0 5px ${item.dateOutline};` : '';
  const dateTagHtml = item.date ? `<span class="val-rarity-tag" style="${dc}${ds}">${item.date}</span>` : '';

  const hasHidden  = (hiddenContent || '').trim() !== '';
  const showButton = item.showMoreButton !== false && hasHidden;
  const hiddenBlock = hasHidden ? `<div class="val-hidden ${showButton ? 'collapsed' : ''}" id="${cardId}-details">${hiddenContent}</div>` : '';
  const toggleBtn   = showButton ? `<button class="val-toggle" onclick="toggleCardDetails('${cardId}', this)">Show more...</button>` : '';

  return `
    <div class="val-card val-card-wide">
      <div class="val-rarity-bar" style="background:linear-gradient(90deg,${item.dateOutline||'#fff'},${item.dateColor||'#fff'},${item.dateOutline||'#fff'});"></div>
      <div class="val-img-wrap">
        <img src="${imgSrc}" alt="${name}" loading="lazy" class="val-img" style="object-fit:cover;"
          onerror="this.onerror=null;this.src='images/favicon.png';this.classList.add('val-img-fallback');">
        ${dateTagHtml}
      </div>
      <div class="val-body">
        <h3 class="val-name">${name}</h3>
        ${visibleContent || ''}
        ${hiddenBlock}
        ${toggleBtn}
      </div>
    </div>`;
}