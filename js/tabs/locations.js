

const MAP_SIZE = 2048;

const MAP_ZONES = [
  { name: "Frostpire\nSummit", x: 533, y: 1069 },
  { name: "Zanora\nBadlands", x: 556, y: 1515 },
  { name: "Bayview", x: 1101, y: 1226 },
  { name: "Downtown", x: 1358, y: 740 },
  { name: "Fort\nEmberreach", x: 1328, y: 1477 },
  { name: "Harris Intl.", x: 538, y: 450 },
  { name: "Oakwood\nEstates", x: 872, y: 572 },
  { name: "Suncrest\nHills", x: 1659, y: 407 },
];



const MAP_PINS = [
  {
    id: "port",
    name: "Oasis City Port",
    color: "#31955d",
    icon: "images/map/Markers/Port.webp",
    iconSize: 30,
    positions: [{ x: 690, y: 225 }],
  },
  {
    id: "airport",
    name: "Harris International Airport",
    color: "#95ceff",
    icon: "images/map/Markers/Airport.webp",
    iconSize: 30,
    positions: [{ x: 508, y: 495 }],
  },
  {
    id: "jewelry",
    name: "Oasis City Jewelry",
    color: "#01ddff",
    icon: "images/map/Markers/Jewerly.webp",
    iconSize: 36,
    positions: [{ x: 1301, y: 584 }],
  },
  {
    id: "casino",
    name: "Crystal Club & Resort",
    color: "#aaffff",
    icon: "images/map/Markers/Casino.webp",
    iconSize: 36,
    positions: [{ x: 1200, y: 607 }],
  },
  {
    id: "pearstore",
    name: "Pear Store",
    color: "#d1e231",
    icon: "images/map/Markers/PearShop.webp",
    iconSize: 30,
    positions: [{ x: 1310, y: 806 }],
  },
  {
    id: "fort",
    name: "Fort Emberreach",
    color: "#ffff00",
    icon: "images/map/Markers/Fort.webp",
    iconSize: 36,
    positions: [{ x: 1330, y: 1524 }],
  },
  {
    id: "observatory",
    name: "Orrery Observatory",
    color: "#b67bff",
    icon: "images/map/Markers/Observatory.webp",
    iconSize: 36,
    positions: [{ x: 962, y: 1060 }],
  },
  {
    id: "pawn",
    name: "Ofy's Value Pawn",
    color: "#ff2d03",
    icon: "images/map/Markers/Pawn.webp",
    iconSize: 36,
    positions: [{ x: 1092, y: 1316 }],
  },
  {
    id: "dealership",
    name: "Bayview Motors",
    color: "#009cfe",
    icon: "images/map/Markers/Dealership.webp",
    iconSize: 36,
    positions: [{ x: 1062, y: 1257 }],
  },
  {
    id: "heliport",
    name: "Davis Heliport",
    color: "#ff5500",
    icon: "images/map/Markers/Heliport.webp",
    iconSize: 36,
    positions: [{ x: 1540, y: 1149 }],
  },
  {
    id: "bank",
    name: "Bank of Oasis",
    color: "#00e200",
    icon: "images/map/Markers/Bank.webp",
    iconSize: 40,
    positions: [{ x: 1372, y: 835 }],
  },
  {
    id: "police",
    name: "Oasis City Police Station",
    color: "#ffffff",
    icon: "images/map/Markers/Police.webp",
    iconSize: 36,
    positions: [{ x: 1660, y: 849 }],
  },
  {
    id: "syndicate",
    name: "Syndicate Base",
    color: "#c85500",
    icon: "images/map/Markers/Syndicate.webp",
    iconSize: 36,
    positions: [{ x: 330, y: 1357 }],
  },
  {
    id: "armory",
    name: "Lock n' Load Armory",
    color: "#ffad08",
    icon: "images/map/Markers/Armory.webp",
    iconSize: 36,
    positions: [
      { x: 1107, y: 1278 },
      { x: 445, y: 1375 },
      { x: 1358, y: 595 },
    ],
  },
  {
    id: "autoshop",
    name: "Auto Shop & Repairs",
    color: "#d0c4c3",
    icon: "images/map/Markers/Garage.webp",
    iconSize: 36,
    positions: [
      { x: 1420, y: 560 },
      { x: 1263, y: 930 },
      { x: 1075, y: 1167 },
      { x: 1188, y: 1659 },
      { x: 580, y: 1286 },
      { x: 590, y: 550 },
      { x: 1690, y: 820 }
    ],
  },
];


function renderLocations() {
  return `
<div class="map-page-root">
  <div class="map-sidebar" id="map-sidebar">
    <div class="map-sidebar-header">
      <span class="map-sidebar-title">📍 LOCATIONS</span>
    </div>
    <div class="map-legend" id="map-legend">
      ${MAP_PINS.map(pin => `
        <button
          class="map-legend-item"
          data-pin-id="${pin.id}"
          id="legend-${pin.id}"
          onclick="mapTogglePin('${pin.id}', this)"
          style="--pin-color: ${pin.color};"
        >
          <img src="${pin.icon}" class="map-legend-icon" alt="${pin.name}"
            style="filter: drop-shadow(0 0 4px ${pin.color})">
          <span class="map-legend-name">${pin.name}</span>
          <span class="map-legend-badge">${pin.positions.length > 1 ? pin.positions.length + 'x' : ''}</span>
        </button>
      `).join('')}
    </div>
  </div>

  <div class="map-viewport-wrap">
    <div class="map-controls">
      <button class="map-ctrl-btn" id="map-zoom-in"  onclick="mapZoom(1.25)"  title="Zoom in">+</button>
      <button class="map-ctrl-btn" id="map-zoom-out" onclick="mapZoom(0.8)"   title="Zoom out">−</button>
      <button class="map-ctrl-btn" id="map-reset"    onclick="mapReset()"     title="Reset view">⟳</button>
    </div>

    <div class="map-viewport" id="map-viewport"
      onmousedown="mapDragStart(event)"
      onmousemove="mapDragMove(event)"
      onmouseup="mapDragEnd(event)"
      onmouseleave="mapDragEnd(event)"
      onwheel="mapWheel(event)"
      ontouchstart="mapTouchStart(event)"
      ontouchmove="mapTouchMove(event)"
      ontouchend="mapTouchEnd(event)"
    >
      <div class="map-canvas" id="map-canvas">
        <!-- Map tiles -->
        <img src="images/map/TopLeft.webp"     class="map-tile" style="left:0;    top:0;"    alt="" draggable="false">
        <img src="images/map/TopRight.webp"    class="map-tile" style="left:50%;  top:0;"    alt="" draggable="false">
        <img src="images/map/BottomLeft.webp"  class="map-tile" style="left:0;    top:50%;"  alt="" draggable="false">
        <img src="images/map/BottomRight.webp" class="map-tile" style="left:50%;  top:50%;"  alt="" draggable="false">

        <!-- Zone labels -->
        ${MAP_ZONES.map(z => `
          <div class="map-zone-label" style="left:${(z.x / MAP_SIZE * 100).toFixed(4)}%;top:${(z.y / MAP_SIZE * 100).toFixed(4)}%;">${z.name.replace(/\n/g, '<br>')}</div>
        `).join('')}

        <!-- Location pins -->
        ${MAP_PINS.map(pin => pin.positions.map((pos, posIdx) => `
          <div
            class="map-pin"
            id="pin-${pin.id}-${posIdx}"
            data-pin-id="${pin.id}"
            data-name="${pin.name}"
            style="left:${(pos.x / MAP_SIZE * 100).toFixed(4)}%;top:${(pos.y / MAP_SIZE * 100).toFixed(4)}%;--pin-color:${pin.color};"
            onpointerenter="if(event.pointerType === 'mouse') mapPinHover(this, true)"
            onpointerleave="if(event.pointerType === 'mouse') mapPinHover(this, false)"
            onclick="mapPinClick(this, event)"
          >
            <div class="map-pin-tooltip">
              ${pin.name}
              <span class="map-pin-tooltip-arrow"></span>
            </div>
            <svg class="map-pin-svg" viewBox="0 0 72 72" width="72" height="72">
              <defs>
                <filter id="bc-${pin.id}-${posIdx}" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
                  <feFlood flood-color="${pin.color}" flood-opacity="1" result="flood"/>
                  <feComposite in="flood" in2="SourceAlpha" operator="in"/>
                </filter>
                <filter id="glow-${pin.id}-${posIdx}">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                  <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" result="glow"/>
                  <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <polygon points="36,2 70,36 36,70 2,36" fill="#161616" stroke="${pin.color}" stroke-width="1" stroke-opacity="0.4"/>
              <image href="images/map/Markers/BORDER.webp" x="5" y="5" width="62" height="62" filter="url(#bc-${pin.id}-${posIdx})"/>
              <image href="${pin.icon}" x="${(72 - (pin.iconSize || 36)) / 2}" y="${(72 - (pin.iconSize || 36)) / 2}" width="${pin.iconSize || 36}" height="${pin.iconSize || 36}"/>
            </svg>
          </div>
        `).join('')).join('')}
      </div>
    </div>
  </div>
</div>
`;
}


(function initMapLogic() {

  window._mapState = {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    hiddenPins: new Set(),

    lastTouchDist: null,
    lastTouchMidX: 0,
    lastTouchMidY: 0,

    pinCycleIndex: {},
    activePinId: null,
  };

  function getCanvas() { return document.getElementById('map-canvas'); }
  function getViewport() { return document.getElementById('map-viewport'); }

  function applyTransform(smooth) {
    const canvas = getCanvas();
    if (!canvas) return;
    const s = window._mapState;
    canvas.style.transition = smooth ? 'transform 0.25s cubic-bezier(0.23,1,0.32,1)' : 'none';
    canvas.style.transform = `translate(${s.offsetX}px, ${s.offsetY}px) scale(${s.scale})`;
    canvas.style.transformOrigin = '0 0';

    if (!s._pinEls || s._pinEls.length === 0) s._pinEls = canvas.querySelectorAll('.map-pin');
    if (!s._zoneEls || s._zoneEls.length === 0) s._zoneEls = canvas.querySelectorAll('.map-zone-label');

    const pinScale = Math.min(2.2, Math.max(0.5, 1 / Math.sqrt(s.scale)));
    s._pinEls.forEach(pin => {
      pin.style.transform = `translate(-50%, -50%) scale(${pinScale})`;
    });

    const zoneScale = Math.min(1.8, Math.max(0.6, 1 / s.scale));
    s._zoneEls.forEach(label => {
      label.style.transform = `translate(-50%, -50%) scale(${zoneScale})`;
    });
  }

  function clampOffset() {
    const s = window._mapState;
    const vp = getViewport();
    if (!vp) return;
    const vpW = vp.clientWidth;
    const vpH = vp.clientHeight;
    const cW = 800 * s.scale;
    const cH = 800 * s.scale;


    const margin = 100;
    s.offsetX = Math.min(margin, Math.max(vpW - cW - margin, s.offsetX));
    s.offsetY = Math.min(margin, Math.max(vpH - cH - margin, s.offsetY));
  }

  window.mapZoom = function (factor, cx, cy) {
    const s = window._mapState;
    const vp = getViewport();
    if (!vp) return;

    const prevScale = s.scale;
    s.scale = Math.min(4, Math.max(0.3, s.scale * factor));


    if (cx === undefined) cx = vp.clientWidth / 2;
    if (cy === undefined) cy = vp.clientHeight / 2;


    s.offsetX = cx - (cx - s.offsetX) * (s.scale / prevScale);
    s.offsetY = cy - (cy - s.offsetY) * (s.scale / prevScale);
    clampOffset();
    applyTransform(true);
  };


  window.mapWheel = function (e) {
    e.preventDefault();
    const vp = getViewport();
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    mapZoom(factor, cx, cy);
  };

  window.mapDragStart = function (e) {
    if (e.button !== 0) return;
    if (!e.target.closest('.map-pin')) {
      document.querySelectorAll('.map-pin').forEach(pin => mapPinHover(pin, false));
    }
    const s = window._mapState;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    const vp = getViewport();
    if (vp) vp.style.cursor = 'grabbing';
  };

  let _dragRafId = null;
  window.mapDragMove = function (e) {
    const s = window._mapState;
    if (!s.dragging) return;
    if (_dragRafId) return;
    _dragRafId = requestAnimationFrame(() => {
      s.offsetX += e.clientX - s.lastX;
      s.offsetY += e.clientY - s.lastY;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      applyTransform(false);
      _dragRafId = null;
    });
  };

  window.mapDragEnd = function (e) {
    const s = window._mapState;
    s.dragging = false;
    const vp = getViewport();
    if (vp) vp.style.cursor = 'grab';
    clampOffset();
  };


  window.mapTouchStart = function (e) {
    if (!e.target.closest('.map-pin')) {
      document.querySelectorAll('.map-pin').forEach(pin => mapPinHover(pin, false));
    }
    const s = window._mapState;
    if (e.touches.length === 1) {
      s.dragging = true;
      s.lastX = e.touches[0].clientX;
      s.lastY = e.touches[0].clientY;
      s.lastTouchDist = null;
    } else if (e.touches.length === 2) {
      s.dragging = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      s.lastTouchDist = Math.hypot(dx, dy);
      s.lastTouchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      s.lastTouchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    }
  };

  window.mapTouchMove = function (e) {
    e.preventDefault();
    const s = window._mapState;
    const vp = getViewport();
    if (!vp) return;
    const rect = vp.getBoundingClientRect();

    if (e.touches.length === 1 && s.dragging) {
      s.offsetX += e.touches[0].clientX - s.lastX;
      s.offsetY += e.touches[0].clientY - s.lastY;
      s.lastX = e.touches[0].clientX;
      s.lastY = e.touches[0].clientY;
      applyTransform(false);
    } else if (e.touches.length === 2 && s.lastTouchDist !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
      mapZoom(dist / s.lastTouchDist, midX, midY);
      s.lastTouchDist = dist;
    }
  };

  window.mapTouchEnd = function (e) {
    const s = window._mapState;
    s.dragging = false;
    s.lastTouchDist = null;
  };


  window.mapPinHover = function (el, entering) {
    const tip = el.querySelector('.map-pin-tooltip');
    if (!tip) return;
    tip.style.opacity = entering ? '1' : '0';
    tip.style.transform = entering
      ? 'translateX(-50%) translateY(0)'
      : 'translateX(-50%) translateY(4px)';
    el.style.filter = entering ? 'brightness(1.4)' : '';
    el.style.zIndex = entering ? '50' : '';
  };

  window.mapPinClick = function (el, event) {
    event.stopPropagation();
    const tip = el.querySelector('.map-pin-tooltip');
    if (!tip) return;
    const isVisible = tip.style.opacity === '1';

    document.querySelectorAll('.map-pin').forEach(pin => {
      if (pin !== el) mapPinHover(pin, false);
    });

    mapPinHover(el, !isVisible);
  };


  window.mapTogglePin = function (pinId, btn) {
    const vp = getViewport();
    if (!vp) return;

    const pinData = MAP_PINS.find(p => p.id === pinId);
    if (!pinData || !pinData.positions.length) return;

    const canvasSize = 800;
    const s = window._mapState;

    if (s.activePinId !== pinId) {
      s.pinCycleIndex[pinId] = 0;
      s.activePinId = pinId;
    }

    const idx = s.pinCycleIndex[pinId] ?? 0;
    s.pinCycleIndex[pinId] = (idx + 1) % pinData.positions.length;

    const pos = pinData.positions[idx];
    const canvasX = (pos.x / MAP_SIZE) * canvasSize;
    const canvasY = (pos.y / MAP_SIZE) * canvasSize;
    const targetScale = 2.8;

    s.scale = targetScale;
    s.offsetX = (vp.clientWidth / 2) - (canvasX * targetScale);
    s.offsetY = (vp.clientHeight / 2) - (canvasY * targetScale);

    clampOffset();
    applyTransform(true);

    const badge = btn.querySelector('.map-legend-badge');
    if (badge && pinData.positions.length > 1) {
      badge.textContent = `${idx + 1}/${pinData.positions.length}`;
    }

    document.querySelectorAll('.map-legend-item').forEach(el => {
      el.classList.remove('active');
    });
    btn.classList.add('active');

    document.querySelectorAll('.map-pin').forEach(pin => {
      pin.style.opacity = '1';
      pin.style.pointerEvents = 'auto';
      const samePinId = pin.getAttribute('data-pin-id') === pinId;
      const pinIdx = parseInt(pin.id.split('-').pop(), 10);
      if (samePinId && pinIdx === idx) {
        pin.style.zIndex = '40';
        pin.style.filter = 'brightness(1.5) drop-shadow(0 0 8px var(--pin-color))';
      } else if (samePinId) {
        pin.style.zIndex = '20';
        pin.style.filter = 'brightness(0.7)';
      } else {
        pin.style.zIndex = '10';
        pin.style.filter = '';
      }
    });
  };


  function tryInit() {
    const vp = getViewport();
    if (!vp) return;
    const vpW = vp.clientWidth;
    const vpH = vp.clientHeight;
    if (vpW < 10 || vpH < 10) {
      setTimeout(tryInit, 60);
      return;
    }
    const s = window._mapState;
    const canvasSize = 800;
    s.scale = Math.min(vpW / canvasSize, vpH / canvasSize) * 0.9;
    s.offsetX = (vpW - canvasSize * s.scale) / 2;
    s.offsetY = (vpH - canvasSize * s.scale) / 2;
    s._pinEls = null;
    s._zoneEls = null;
    applyTransform(true);
  }


  window.mapReset = function () {
    const vp = getViewport();
    if (!vp) return;
    const s = window._mapState;
    const canvasSize = 800;
    const vpW = vp.clientWidth;
    const vpH = vp.clientHeight;
    s.scale = Math.min(vpW / canvasSize, vpH / canvasSize) * 0.9;
    s.offsetX = (vpW - canvasSize * s.scale) / 2;
    s.offsetY = (vpH - canvasSize * s.scale) / 2;
    applyTransform(true);

    document.querySelectorAll('.map-legend-item').forEach(el => {
      el.classList.remove('active');
    });

    document.querySelectorAll('.map-pin').forEach(pin => {
      pin.style.opacity = '1';
      pin.style.pointerEvents = 'auto';
      pin.style.zIndex = '10';
      pin.style.filter = '';
    });
  };


  const observer = new MutationObserver(() => {
    if (document.getElementById('map-viewport')) {
      observer.disconnect();

      requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(tryInit, 50)));
    }
  });
  observer.observe(document.getElementById('page-container') || document.body, { childList: true, subtree: true });
})();

function sortLocations() { /* no-op: map doesn't sort */ }