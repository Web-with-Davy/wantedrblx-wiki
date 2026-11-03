// Wanted Wiki — Item embed worker
// Intercepts /item/<category>/<slug> requests and returns OG-tagged HTML
// for Discord/social embeds. All other requests pass through to the origin.

const SITE = 'https://wantedrblx.com';
const DEFAULT_IMG = SITE + '/images/og-image.webp';
const DEFAULT_DESC = 'The Roblox Wanted Wiki — find all weapons, vehicles, missions, valuables, promo codes and more!';

import ITEMS from '../items-data.json';

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
  const canonical = SITE + '/item/' + category + '/' + id + '/';

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
</head>
<body>
  <h1>${escHtml(title)}</h1>
  <p>${escHtml(desc)}</p>
  <a href="${SITE}/">Back to the Wanted Wiki</a>
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

function htmlHeaders(cacheControl) {
  return {
    'Content-Type': 'text/html;charset=UTF-8',
    'Cache-Control': cacheControl,
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff'
  };
}

export default {
  async fetch(request, env) {
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

    if (!itemMatch) return fetch(request);

    const [, category, id] = itemMatch;
    const item = lookup(category, id);
    const ua = request.headers.get('user-agent') || '';

    if (!isBot(ua)) {
      const appResponse = await fetch(new URL('/', url));
      if (!appResponse.ok) return appResponse;

      const appHtml = (await appResponse.text())
        .replace(/<head(?:\s[^>]*)?>/i, head => `${head}<base href="/">`);
      return new Response(appHtml, { status: appResponse.status, headers: htmlHeaders('no-cache') });
    }

    if (!item) return new Response('Not found', {
      status: 404,
      headers: { ...htmlHeaders('no-store'), 'Content-Type': 'text/plain;charset=UTF-8' }
    });

    const html = buildHtml(item, category, id);

    return new Response(html, {
      status: 200,
      headers: htmlHeaders('public, max-age=300'),
    });
  },
};
