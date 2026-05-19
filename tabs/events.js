function renderEvents() {
  const cards = EVENTS_DATA.map(event => {
    const title = typeof tv === 'function' ? event.title : event.title;
    const description = typeof tv === 'function' ? event.description : event.description;
    const date = typeof tv === 'function' ? event.date : event.date;
    const features = typeof tv === 'function' ? event.features : event.features;

    const visibleContent = `
      <h3>${title}</h3>
      <p>${description}</p>
    `;
    const hiddenContent = `
      <div style="margin-top: 15px;">
        <strong>Key Features:</strong>
        <ul style="margin-top: 10px; margin-left: 15px; list-style-type: square; opacity: 0.9;">
          ${features.map(f => `<li style="margin-bottom: 5px;">${f}</li>`).join('')}
        </ul>
      </div>
    `;
    return renderEventCard(event, visibleContent, hiddenContent, 'events');
  });

  return `
    <h2>${'EVENTS'}</h2>
    <div class="card-grid">
      ${cards.join('')}
    </div>
  `;
}
