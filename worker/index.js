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
  const imagePath = new URL(image).pathname.replace(/^\/+/, '');
  const banner = item
    ? `${SITE}/cdn-cgi/image/width=1200,height=630,fit=pad,background=%230C0E12/${imagePath}`
    : image;
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
  <meta property="og:image" content="${escHtml(banner)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escHtml(item ? item.n : 'Wanted Wiki')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escHtml(title)}">
  <meta name="twitter:description" content="${escHtml(desc)}">
  <meta name="twitter:image" content="${escHtml(banner)}">
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only intercept /item/<category>/<slug>
    const match = url.pathname.match(/^\/item\/([^\/]+)\/([^\/]+)\/?$/);
    if (!match) {
      // Pass everything else through to origin
      return fetch(request);
    }

    const [, category, id] = match;
    const item = lookup(category, id);
    const ua = request.headers.get('user-agent') || '';

    // Bots get the OG-tagged HTML page
    // Real browsers get an immediate JS redirect (they experience no delay)
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
