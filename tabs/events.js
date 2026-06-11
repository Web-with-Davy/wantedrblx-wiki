function renderEvents() {
  const cards = EVENTS_DATA.map(event => {
    const name    = event.title || event.name || '';
    const imgSlug = event.image || event.id || generateSlug(name);
    const cardId  = `card-${imgSlug}-${Math.random().toString(36).substr(2, 8)}`;
    const imgSrc  = `images/events/${imgSlug}.jpg`;

    const dc = event.dateColor   ? `color:${event.dateColor};`   : '';
    const ds = event.dateOutline
      ? `border-color:${event.dateOutline};box-shadow:0 0 8px ${event.dateOutline};text-shadow:0 0 5px ${event.dateOutline};`
      : '';
    const dateTag = event.date
      ? `<span class="val-rarity-tag" style="${dc}${ds}">${event.date}</span>`
      : '';

    const accentColor1 = event.dateOutline || '#ffffff';
    const accentColor2 = event.dateColor   || '#ffffff';

    const featuresHtml = event.features && event.features.length > 0 ? `
      <div class="val-stat" style="flex-direction:column;align-items:flex-start;gap:6px;">
        <span class="val-stat-label">Key Features</span>
        <ul style="margin:4px 0 0 12px;padding:0;list-style:square;opacity:0.8;font-size:0.72rem;font-family:'Courier New',monospace;line-height:1.6;">
          ${event.features.map(f => `<li style="margin-bottom:3px;">${f}</li>`).join('')}
        </ul>
      </div>` : '';

    const showButton = event.showMoreButton !== false && featuresHtml !== '';

    const hiddenBlock = featuresHtml ? `
      <div class="val-hidden ${showButton ? 'collapsed' : ''}" id="${cardId}-details">
        ${featuresHtml}
      </div>` : '';

    const toggleBtn = showButton ? `
      <button class="val-toggle" onclick="toggleCardDetails('${cardId}', this)">Show more...</button>` : '';

    return `
      <div class="val-card val-card-wide">
        <div class="val-rarity-bar" style="background:linear-gradient(90deg,${accentColor1},${accentColor2},${accentColor1});"></div>
        <div class="val-img-wrap">
          <img
            src="${imgSrc}"
            alt="${name}"
            loading="lazy"
            class="val-img"
            style="object-fit:cover;"
            onerror="this.onerror=null;this.src='images/favicon.png';this.classList.add('val-img-fallback');"
          >
          ${dateTag}
        </div>
        <div class="val-body">
          <h3 class="val-name">${name}</h3>
          ${event.description ? `<div class="val-stat" style="flex-direction:column;align-items:flex-start;gap:2px;"><span class="val-stat-value" style="opacity:0.8;line-height:1.5;">${event.description}</span></div>` : ''}
          ${hiddenBlock}
          ${toggleBtn}
        </div>
      </div>`;
  }).join('');

  return `
    <h2>EVENTS</h2>
    <div class="val-grid val-grid-events">${cards}</div>
  `;
}
