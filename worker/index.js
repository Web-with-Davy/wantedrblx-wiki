// Wanted Wiki — Item embed worker
// Intercepts /item/<category>/<slug> requests and returns OG-tagged HTML
// for Discord/social embeds. All other requests pass through to the origin.

const SITE = 'https://wantedrblx.com';
const DEFAULT_IMG = SITE + '/images/og-image.webp';
const DEFAULT_DESC = 'The Roblox Wanted Wiki — find all weapons, vehicles, missions, valuables, promo codes and more!';

import ITEMS from '../items-data.json';

const PAGE_PATHS = new Set([
  'valuables', 'atms', 'weapons', 'vehicles', 'gun-crates', 'missions',
  'npcs', 'locations', 'store', 'items', 'events', 'promo-codes'
]);

function slugify(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function lookup(category, id) {
  const cat = ITEMS[category];
  if (!cat) return null;
  // direct hit
  if (cat[id]) return cat[id];
  // try normalizing the id
  const norm = slugify(id);
  if (cat[norm]) return cat[norm];
  return null;
}

function buildHtml(item, category, id) {
  const title = item ? `${item.n} — Wanted Wiki` : 'Wanted Wiki';
  const desc  = (item && item.d) ? item.d : DEFAULT_DESC;
  const image = (item && item.i) ? item.i : DEFAULT_IMG;
  const canonical = SITE + '/item/' + category + '/' + id;
  const hashUrl   = SITE + '/#item/' + category + '/' + id;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escHtml(title)}</title>
  <meta name="description" content="${escHtml(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Wanted Wiki">
  <meta property="og:url" content="${escHtml(canonical)}">
  <meta property="og:title" content="${escHtml(title)}">
  <meta property="og:description" content="${escHtml(desc)}">
  <meta property="og:image" content="${escHtml(image)}">
  <meta property="og:image:alt" content="${escHtml(item ? item.n : 'Wanted Wiki')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escHtml(title)}">
  <meta name="twitter:description" content="${escHtml(desc)}">
  <meta name="twitter:image" content="${escHtml(image)}">
  <link rel="canonical" href="${escHtml(canonical)}">
  <meta http-equiv="refresh" content="0;url=${escHtml(hashUrl)}">
</head>
<body>
  <script>location.replace(${JSON.stringify(hashUrl)});</script>
  <p>Redirecting to <a href="${escHtml(hashUrl)}">${escHtml(title)}</a>…</p>
</body>
</html>`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isBot(ua) {
  if (!ua) return false;
  const lower = ua.toLowerCase();
  return (
    lower.includes('discordbot') ||
    lower.includes('twitterbot') ||
    lower.includes('facebookexternalhit') ||
    lower.includes('slackbot') ||
    lower.includes('telegrambot') ||
    lower.includes('whatsapp') ||
    lower.includes('linkedinbot') ||
    lower.includes('bot') ||
    lower.includes('crawler') ||
    lower.includes('spider')
  );
}

const ITEM_PATH_COMPAT = `<script>
(() => {
  const parts = location.pathname.split('/').filter(Boolean);
  if (parts.length !== 3 || parts[0] !== 'item') return;

  const category = decodeURIComponent(parts[1]);
  const id = decodeURIComponent(parts[2]);
  const pushState = history.pushState.bind(history);

  history.pushState = (state, title, url) => {
    if (state && state.itemPage && typeof url === 'string' && url.startsWith('#item/')) {
      const itemParts = url.slice(1).split('/');
      if (itemParts.length >= 3) {
        url = '/item/' + encodeURIComponent(itemParts[1]) + '/' + encodeURIComponent(itemParts.slice(2).join('/')) + '/';
        if (url === location.pathname) return history.replaceState(state, title, url);
      }
    }
    return pushState(state, title, url);
  };

  let pending = true;
  window._handleItemPagePath = () => {
    if (typeof window.loadItemPage === 'function') {
      pending = false;
      window.loadItemPage(category, id, category);
    }
    return true;
  };

  const timer = setInterval(() => {
    if (pending && typeof window.loadItemPage === 'function') window._handleItemPagePath();
    if (!pending) clearInterval(timer);
  }, 50);
  setTimeout(() => clearInterval(timer), 15000);
})();
</script>`;

const PAGE_PATH_COMPAT = `<script>
(() => {
  const page = location.pathname.split('/').filter(Boolean)[0];
  const pages = ['valuables', 'atms', 'weapons', 'vehicles', 'gun-crates', 'missions', 'npcs', 'locations', 'store', 'items', 'events', 'promo-codes'];
  if (!pages.includes(page)) return;

  const pushState = history.pushState.bind(history);
  history.pushState = (state, title, url) => {
    if (state && typeof state.page === 'string') {
      url = state.page === 'home' ? '/' : '/' + state.page;
      if (url === location.pathname) return history.replaceState(state, title, url);
    }
    return pushState(state, title, url);
  };

  const renderers = {
    valuables: 'renderValuables', atms: 'renderATMs', weapons: 'renderWeapons',
    vehicles: 'renderVehicles', 'gun-crates': 'renderGunCrates', missions: 'renderMissions',
    npcs: 'renderNPCs', locations: 'renderLocations', store: 'renderStore',
    items: 'renderItems', events: 'renderEvents', 'promo-codes': 'renderPromoCodes'
  };
  const labels = {
    valuables: 'VALUABLES', atms: 'ATMs & VAULTS', weapons: 'WEAPONS',
    vehicles: 'VEHICLES', 'gun-crates': 'GUN CRATES', missions: 'MISSIONS',
    npcs: 'NPCs', locations: 'LOCATIONS', store: 'STORE', items: 'ITEMS',
    events: 'EVENTS', 'promo-codes': 'PROMO CODES'
  };
  const timer = setInterval(() => {
    const label = document.getElementById('page-label')?.textContent;
    if (label === labels[page]) {
      clearInterval(timer);
      return;
    }

    if (typeof window.loadPage !== 'function' || typeof window[renderers[page]] !== 'function') return;
    window.loadPage(page, false);
  }, 750);
  setTimeout(() => clearInterval(timer), 15000);
})();
</script>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const itemMatch = url.pathname.match(/^\/item\/([^\/]+)\/([^\/]+)\/?$/);
    const page = url.pathname.split('/').filter(Boolean)[0] || '';
    const isPageRoute = PAGE_PATHS.has(page);
    if (!itemMatch && !isPageRoute) {
      // Pass everything else through to origin
      return fetch(request);
    }

    const [, category, id] = itemMatch || [];
    const item = itemMatch ? lookup(category, id) : null;
    const ua = request.headers.get('user-agent') || '';

    if (!itemMatch || !isBot(ua)) {
      const appResponse = await fetch(new URL('/', url));
      if (!appResponse.ok) return appResponse;

      const appHtml = (await appResponse.text())
        .replace(/<head(?:\s[^>]*)?>/i, head => `${head}<base href="/">${ITEM_PATH_COMPAT}${PAGE_PATH_COMPAT}`)
        .replace(/js\/core\/bootstrap\.js\?v=[^"']+/, 'js/core/bootstrap.js?v=20261101-2');
      return new Response(appHtml, {
        status: appResponse.status,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'no-cache',
        },
      });
    }

    const html = buildHtml(item, category, id);

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=300',
      },
    });
  },
};
