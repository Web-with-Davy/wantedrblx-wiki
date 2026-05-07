function renderCard(item, rarityKey, content, folder = null) {
  const name = item.name || item.title || "";
  const slug = item.id || generateSlug(name);
  const rarity = RARITIES[rarityKey] || DIFFICULTIES[rarityKey] || TEAMS[rarityKey];
  const rarityClass = rarity ? rarity.class : '';
  const rarityName = rarity ? rarity.name : '';
  const imagePath = folder ? `images/${folder}/${slug}.png` : `images/${slug}.png`;

  return `
    <div class="card">
      <img src="${imagePath}" alt="${name}" loading="lazy" 
           style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; 
                  box-shadow:0 0 10px rgba(255,255,255,0.2);"
           onerror="this.onerror=null; this.src='images/favicon.png'; this.style.opacity='0.5'; this.style.objectFit='contain'; this.style.height='150px';">
      ${rarityName ? `<div class="rarity ${rarityClass}">${rarityName}</div>` : ''}
      ${content}
    </div>`;
}

function renderCardJPG(item, rarityKey, content, folder = null) {
  const name = item.name || item.title || "";
  const slug = item.id || generateSlug(name);
  const rarity = RARITIES[rarityKey] || DIFFICULTIES[rarityKey] || TEAMS[rarityKey];
  const rarityClass = rarity ? rarity.class : '';
  const rarityName = rarity ? rarity.name : '';
  const imagePath = folder ? `images/${folder}/${slug}.jpg` : `images/${slug}.jpg`;

  return `
    <div class="card">
      <img src="${imagePath}" alt="${name}" loading="lazy" 
           style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; 
                  box-shadow:0 0 10px rgba(255,255,255,0.2);"
           onerror="this.onerror=null; this.src='images/favicon.png'; this.style.opacity='0.5'; this.style.objectFit='contain'; this.style.height='150px';">
      ${rarityName ? `<div class="rarity ${rarityClass}">${rarityName}</div>` : ''}
      ${content}
    </div>`;
}

function renderPriceTag(price) {
  return `<div class="price-tag">${formatPrice(price)}</div>`;
}

function renderSortButtons(buttons, activeSort) {
  return `
    <div class="sort-buttons">
      ${buttons.map(btn => `
        <span class="sort-btn ${activeSort === btn.value ? 'active' : ''}" 
              onclick="${btn.onClick}">
          ${btn.label}
        </span>
      `).join('')}
    </div>`;
}

function renderPage(title, sortButtons, cards, disclaimer = null) {
  const html = `
    <h2>${title}</h2>
    ${disclaimer ? `<div class="page-disclaimer">${disclaimer}</div>` : ''}
    ${sortButtons}
    <div class="card-grid">
      ${cards.join('')}
    </div>`;

  return html;
}

function renderStat(label, value) {
  if (value === undefined || value === null || value === '' || value === '?' || value === '? - ?') return '';
  return `<p><strong>${label}:</strong> ${value}</p>`;
}

function renderStatSuffix(label, val, suffix) {
  return val !== undefined && val !== null ? renderStat(label, `${val}${suffix}`) : '';
}

function renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, ext = 'jpg', folder = null) {
  const name = item.name || item.title || "";
  const slug = item.id || generateSlug(name);
  const rarity = RARITIES[rarityKey] || DIFFICULTIES[rarityKey] || TEAMS[rarityKey];
  const rarityClass = rarity ? rarity.class : '';
  const rarityName = rarity ? rarity.name : '';
  const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;
  const showButton = item.showMoreButton !== false && hiddenContent && hiddenContent.trim() !== '';
  const imagePath = folder ? `images/${folder}/${slug}.${ext}` : `images/${slug}.${ext}`;

  return `
    <div class="card">
      <img src="${imagePath}" alt="${item.name}" loading="lazy" 
           style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; 
                  box-shadow:0 0 10px rgba(255,255,255,0.2);"
           onerror="this.onerror=null; this.src='images/favicon.png'; this.style.opacity='0.5'; this.style.objectFit='contain'; this.style.height='150px';">
      ${rarityName ? `<div class="rarity ${rarityClass}">${rarityName}</div>` : ''}
      ${visibleContent}
      ${hiddenContent && hiddenContent.trim() !== '' ? `
      <div class="card-details ${showButton ? 'collapsed' : ''}" id="${cardId}-details">
        ${hiddenContent}
      </div>` : ''}
      ${showButton ? `
      <button class="card-details-toggle" onclick="toggleCardDetails('${cardId}', this)">
        ${t('show_more')}
      </button>` : ''}
    </div>`;
}

function renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder = null) {
  return renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, 'jpg', folder);
}

function renderExpandableCardPNG(item, rarityKey, visibleContent, hiddenContent, folder = null) {
  return renderExpandableCard(item, rarityKey, visibleContent, hiddenContent, 'png', folder);
}

function toggleCardOverlay(btn) {
  const card = btn.closest('.card');
  if (!card) return;
  const front = card.querySelector('.card-front-content');
  const overlay = card.querySelector('.card-overlay');
  if (front && overlay) {
    front.classList.toggle('hidden');
    overlay.classList.toggle('active');
  }
}

function toggleAttachmentCategory(headerEl) {
  const group = headerEl.closest('.attachment-group');
  if (group) group.classList.toggle('open');
}

function renderNPCCard(item, rarityKey, visibleContent, hiddenContent, folder = 'npcs') {
  const name = item.name || "";
  const slug = generateSlug(name);
  const dialogueData = tv(item, 'dialogue');
  const hasDialogues = dialogueData && Object.keys(dialogueData).length > 0;
  const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;
  const showButton = item.showMoreButton !== false && hiddenContent && hiddenContent.trim() !== '';
  const imagePath = `images/${folder}/${slug}.png`;

  if (!hasDialogues) {
    return renderExpandableCardPNG(item, rarityKey, visibleContent, hiddenContent, folder);
  }

  const dialoguesHTML = Object.entries(dialogueData).map(([category, items]) => {
    if (!items || items.length === 0) return '';
    const itemsHTML = items.map(d => `
      <div class="card-overlay-item">
        <p style="white-space: normal; line-height: 1.5; word-break: break-word;">
          ${d.title ? `<strong>${d.title}:</strong> ` : ''}${d.dialogue}
        </p>
      </div>
    `).join('');
    return `
      <div class="attachment-group">
        <div class="attachment-category-header" onclick="toggleAttachmentCategory(this)">
          <span>${category}</span>
          <span class="attachment-chevron">▼</span>
        </div>
        <div class="attachment-category-items">
          ${itemsHTML}
        </div>
      </div>
    `;
  }).join('');

  return `
  <div class="card">
    <button class="card-overlay-button" onclick="toggleCardOverlay(this)">${t('card_dialogues')}</button>
    <img src="${imagePath}" alt="${name}" loading="lazy"
         style="width:100%; height:auto; margin-bottom:15px; border-radius:4px;
                box-shadow:0 0 10px rgba(255,255,255,0.2);"
         onerror="this.onerror=null; this.src='images/favicon.png'; this.style.opacity='0.5'; this.style.objectFit='contain'; this.style.height='150px';">
    <div class="card-front-content">
      ${visibleContent}
      ${showButton ? `
      <div class="card-details collapsed" id="${cardId}-details">
        ${hiddenContent}
      </div>
      <button class="card-details-toggle" onclick="toggleCardDetails('${cardId}', this)">${t('show_more')}</button>
      ` : ''}
    </div>
    <div class="card-overlay">
      <div class="card-overlay-title">${name} ${t('card_dialogues')}</div>
      <div class="card-overlay-list">
        ${dialoguesHTML}
      </div>
    </div>
  </div>`;
}

function renderWeaponCard(item, rarityKey, visibleContent, hiddenContent, folder = 'weapons') {
  const name = tv(item, 'name') || item.title || "";
  const slug = item.id || generateSlug(item.name || item.title || "");
  const hasAttachments = item.attachments && Object.keys(item.attachments).length > 0;
  const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;
  const showButton = item.showMoreButton !== false && hiddenContent && hiddenContent.trim() !== '';
  const imagePath = folder ? `images/${folder}/${slug}.jpg` : `images/${slug}.jpg`;

  if (!hasAttachments) {
    return renderExpandableCardJPG(item, rarityKey, visibleContent, hiddenContent, folder);
  }

  const categoryIcons = { Optics: '', Muzzle: '', Underbarrel: '', Tactical: '', Ammunition: '', Stock: '' };

  const attachmentsHTML = Object.entries(item.attachments || {}).map(([category, items]) => {
    if (!items || items.length === 0) return '';
    const localizedCategory = t(`attr_${category.toLowerCase()}`) || category;
    const itemsHTML = items.map(att => `
      <div class="card-overlay-item">
        <p><strong>${tv(att, 'name')}:</strong> ${att.price === 0 ? `<span style="color:#666">${t('free')}</span>` : formatPrice(att.price)}</p>
      </div>
    `).join('');
    const icon = categoryIcons[category] || '●';
    return `
      <div class="attachment-group">
        <div class="attachment-category-header" onclick="toggleAttachmentCategory(this)">
          <span>${localizedCategory}</span>
          <span class="attachment-chevron">▼</span>
        </div>
        <div class="attachment-category-items">
          ${itemsHTML}
        </div>
      </div>
    `;
  }).join('');

  return `
  <div class="card">
    ${renderPriceTag(tv(item, 'contractPrice'))}
    <button class="card-overlay-button" onclick="toggleCardOverlay(this)">${t('card_attachments')}</button>
    <img src="${imagePath}" alt="${name}" loading="lazy"
         style="width:100%; height:auto; margin-bottom:15px; border-radius:4px;
                box-shadow:0 0 10px rgba(255,255,255,0.2);"
         onerror="this.onerror=null; this.src='images/favicon.png'; this.style.opacity='0.5'; this.style.objectFit='contain'; this.style.height='150px';">
    <div class="card-front-content">
      ${visibleContent}
      ${showButton ? `
      <div class="card-details collapsed" id="${cardId}-details">
        ${hiddenContent}
      </div>
      <button class="card-details-toggle" onclick="toggleCardDetails('${cardId}', this)">${t('show_more')}</button>
      ` : ''}
    </div>
    <div class="card-overlay">
      <div class="card-overlay-title">${name} ${t('card_attachments')}</div>
      <div class="card-overlay-list">
        ${attachmentsHTML}
      </div>
    </div>
  </div>`;
}

function renderEventCard(item, visibleContent, hiddenContent, folder = 'events') {
  const name = item.title || item.name || "";
  const slug = item.id || generateSlug(name);
  const cardId = `card-${slug}-${Math.random().toString(36).substr(2, 9)}`;
  const showButton = item.showMoreButton !== false && hiddenContent && hiddenContent.trim() !== '';
  const imagePath = `images/${folder}/${slug}.jpg`;

  return `
    <div class="card card-large">
      <img src="${imagePath}" alt="${name}" loading="lazy" 
           style="width:100%; height:auto; margin-bottom:15px; border-radius:4px; 
                  box-shadow:0 0 10px rgba(255,255,255,0.2);"
           onerror="this.onerror=null; this.src='images/favicon.png'; this.style.opacity='0.5'; this.style.objectFit='contain'; this.style.height='150px';">
      ${item.date ? `
        <div class="rarity" style="${item.dateColor ? `color: ${item.dateColor};` : ''} ${item.dateOutline ? `border-color: ${item.dateOutline}; box-shadow: 0 0 8px ${item.dateOutline}; text-shadow: 0 0 5px ${item.dateOutline};` : ''}">
          ${item.date}
        </div>` : ''}
      ${visibleContent}
      ${hiddenContent && hiddenContent.trim() !== '' ? `
      <div class="card-details ${showButton ? 'collapsed' : ''}" id="${cardId}-details">
        ${hiddenContent}
      </div>` : ''}
      ${showButton ? `
      <button class="card-details-toggle" onclick="toggleCardDetails('${cardId}', this)">
        ${t('show_more')}
      </button>` : ''}
    </div>`;
}