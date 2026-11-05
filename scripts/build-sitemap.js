const fs = require('fs');
const path = require('path');

const SITE = 'https://wantedrblx.com';
const root = path.resolve(__dirname, '..');
const sitemapPath = path.join(root, 'sitemap.xml');
const items = JSON.parse(fs.readFileSync(path.join(root, 'items-data.json'), 'utf8'));

const sections = [
  ['/', 'weekly', '1.0'],
  ['/weapons', 'weekly', '0.9'],
  ['/vehicles', 'weekly', '0.9'],
  ['/missions', 'weekly', '0.8'],
  ['/locations', 'monthly', '0.8'],
  ['/npcs', 'monthly', '0.7'],
  ['/atms', 'monthly', '0.7'],
  ['/valuables', 'monthly', '0.7'],
  ['/gun-crates', 'monthly', '0.7'],
  ['/store', 'weekly', '0.7'],
  ['/items', 'weekly', '0.7'],
  ['/promo-codes', 'daily', '0.9'],
  ['/events', 'monthly', '0.6'],
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry(url, changefreq, priority) {
  return `    <url>\n        <loc>${escapeXml(SITE + url)}</loc>\n        <changefreq>${changefreq}</changefreq>\n        <priority>${priority}</priority>\n    </url>`;
}

const entries = sections.map(([url, changefreq, priority]) => urlEntry(url, changefreq, priority));
for (const [category, categoryItems] of Object.entries(items)) {
  for (const id of Object.keys(categoryItems)) {
    entries.push(urlEntry(`/item/${encodeURIComponent(category)}/${encodeURIComponent(id)}/`, 'monthly', '0.6'));
  }
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  entries.join('\n'),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`Generated ${entries.length} sitemap URLs (${entries.length - sections.length} item URLs).`);