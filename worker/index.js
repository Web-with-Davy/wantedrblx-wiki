
const SITE = 'https://wantedrblx.com';

import ITEMS from '../items-data.json';

function slugify(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function lookup(category, id) {
  const cat = ITEMS[category];
  if (!cat) return null;
  if (cat[id]) return cat[id];
  const norm = slugify(id);
  if (cat[norm]) return cat[norm];
  return null;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildItemMarkup(item) {
  const stats = Object.entries(item.s || {}).map(([label, value]) => `
    <div class="val-stat"><span class="val-stat-label">${escapeHtml(label)}</span><span class="val-stat-value">${escapeHtml(value)}</span></div>
  `).join('');
  const description = item.d
    ? `<div class="ip-desc-block sidebar-box">${escapeHtml(item.d)}</div>`
    : '';

  return `
    <article class="ip-wrap">
      <header class="ip-hero sidebar-box">
        <div class="ip-hero-img-wrap"><img class="ip-hero-img" src="${escapeHtml(item.i)}" alt="${escapeHtml(item.n)}"></div>
        <div class="ip-hero-info"><h1 class="ip-title">${escapeHtml(item.n)}</h1></div>
      </header>
      <div class="ip-body">
        ${description}
        ${stats ? `<section class="ip-section sidebar-box"><h2 class="ip-section-header">Item details</h2><div class="ip-section-body">${stats}</div></section>` : ''}
      </div>
    </article>`;
}

function itemDescription(item) {
  if (item.d) return item.d;
  const facts = Object.entries(item.s || {}).slice(0, 4)
    .map(([label, value]) => `${label}: ${value}`)
    .join('; ');
  return facts ? `${item.n} details for Roblox Wanted. ${facts}.` : `${item.n} in Roblox Wanted.`;
}

function applyItemMetadata(html, item, category, id) {
  const title = `${item.n} - Wanted Wiki`;
  const description = itemDescription(item);
  const canonical = `${SITE}/item/${encodeURIComponent(String(category).toLowerCase())}/${encodeURIComponent(slugify(id))}/`;
  const tags = [
    [/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`],
    [/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(description)}">`],
    [/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(title)}">`],
    [/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(description)}">`],
    [/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${escapeHtml(canonical)}">`],
    [/<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${escapeHtml(item.i)}">`],
    [/<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(title)}">`],
    [/<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(description)}">`],
    [/<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${escapeHtml(item.i)}">`],
    [/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}">`],
  ];
  for (const [pattern, replacement] of tags) html = html.replace(pattern, replacement);
  if (String(item.d || '').trim().length < 60) {
    html = html.replace(/<meta\s+name="robots"[^>]*>/i, '<meta name="robots" content="noindex, follow">');
  }
  return html;
}

function htmlHeaders() {
  return {
    'Content-Type': 'text/html;charset=UTF-8',
    'Cache-Control': 'no-store',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff'
  };
}

export default {
  async fetch(request) {
    let url;
    let itemMatch;
    try {
      url = new URL(request.url);
      itemMatch = url.pathname.match(/^\/item\/([^\/]+)\/([^\/]+)\/?$/);
      if (itemMatch) {
        itemMatch[1] = decodeURIComponent(itemMatch[1]);
        itemMatch[2] = decodeURIComponent(itemMatch[2]);
      }
    } catch (error) {
      return fetch(request);
    }

    if (url.hostname !== 'wantedrblx.com') {
      return Response.redirect(`https://wantedrblx.com${url.pathname}${url.search}`, 301);
    }

    if (url.pathname === '/version' || url.pathname === '/version.json') {
      try {
        const originUrl = new URL('/version.json', request.url);
        originUrl.searchParams.set('_t', Date.now().toString());
        const response = await fetch(originUrl.toString(), {
          headers: { 'Accept': 'application/json' },
          cf: { cacheTtl: 0, cacheEverything: false }
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.version) {
            return Response.json(data, {
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                'Access-Control-Allow-Origin': '*'
              }
            });
          }
        }
        return response;
      } catch (error) {
        console.error('Could not check site version from origin.', error);
        return Response.json({ error: 'Version unavailable' }, {
          status: 503,
          headers: { 'Cache-Control': 'no-store' }
        });
      }
    }

    if (!itemMatch) return fetch(request);

    const [, category, id] = itemMatch;
    const item = lookup(category, id);
    if (!item) return new Response('Not found', {
      status: 404,
      headers: { ...htmlHeaders(), 'Content-Type': 'text/plain;charset=UTF-8' }
    });

    const appResponse = await fetch(new URL('/', url));
    if (!appResponse.ok) return appResponse;

    let appHtml = (await appResponse.text())
      .replace(/<head(?:\s[^>]*)?>/i, head => `${head}<base href="/">`);
    appHtml = applyItemMetadata(appHtml, item, category, id);
    appHtml = appHtml.replace(
      /(<div\b[^>]*\bid=["']page-container["'][^>]*>)[\s\S]*?(<\/div>\s*<\/main>\s*<\/div>)/i,
      (_, openingTag, closingTags) => `${openingTag}${buildItemMarkup(item)}${closingTags}`
    );
    return new Response(appHtml, { status: appResponse.status, headers: htmlHeaders() });
  },
};
