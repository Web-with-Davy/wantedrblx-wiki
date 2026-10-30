const fs = require('fs');
const path = require('path');

const SITE = 'https://wantedrblx.com';
const DEFAULT_IMG = `${SITE}/images/og-image.webp`;
const DEFAULT_DESC = 'The Roblox Wanted Wiki — find all weapons, vehicles, missions, valuables, promo codes and more!';

const projectRoot = path.resolve(__dirname, '..');
const bundlePath = path.join(projectRoot, 'js', 'data-bundle.js');
const itemsJsonPath = path.join(projectRoot, 'items-data.json');
const itemDir = path.join(projectRoot, 'item');

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtml(item, category, id) {
  const title = (item && item.n) ? `${item.n} — Wanted Wiki` : 'Wanted Wiki';
  const desc = (item && item.d) ? item.d : DEFAULT_DESC;
  const img = (item && item.i) ? item.i : DEFAULT_IMG;
  const canonical = `${SITE}/item/${category}/${id}/`;
  const hashUrl = `${SITE}/#item/${category}/${id}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escHtml(title)}</title>
  <meta name="description" content="${escHtml(desc)}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Wanted Wiki">
  <meta property="og:url" content="${escHtml(canonical)}">
  <meta property="og:title" content="${escHtml(title)}">
  <meta property="og:description" content="${escHtml(desc)}">
  <meta property="og:image" content="${escHtml(img)}">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">
  <meta property="og:image:alt" content="${escHtml(item && item.n ? item.n : 'Wanted Wiki')}">

  <!-- Twitter Card: summary forces Discord to show the small square thumbnail -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escHtml(title)}">
  <meta name="twitter:description" content="${escHtml(desc)}">
  <meta name="twitter:image" content="${escHtml(img)}">

  <link rel="canonical" href="${escHtml(canonical)}">
  <meta http-equiv="refresh" content="0;url=${escHtml(hashUrl)}">
</head>
<body>
  <script>location.replace(${JSON.stringify(hashUrl)});</script>
  <p>Redirecting to <a href="${escHtml(hashUrl)}">${escHtml(title)}</a>…</p>
</body>
</html>
`;
}

function run() {
  if (!fs.existsSync(bundlePath)) {
    console.error('js/data-bundle.js not found!');
    return;
  }

  // Load existing items dictionary if present
  let itemsData = {
    weapons: {},
    vehicles: {},
    missions: {},
    valuables: {},
    locations: {},
    store: {},
    npcs: {},
    events: {},
    items: {},
    'gun-crates': {},
    atms: {}
  };

  if (fs.existsSync(itemsJsonPath)) {
    try {
      itemsData = Object.assign(itemsData, JSON.parse(fs.readFileSync(itemsJsonPath, 'utf8')));
    } catch (_) {}
  }

  // Evaluate data-bundle in isolated sandbox
  const sandbox = { window: {} };
  const bundleCode = fs.readFileSync(bundlePath, 'utf8');
  try {
    const fn = new Function('window', bundleCode);
    fn(sandbox.window);
  } catch (err) {
    console.error('Error evaluating bundle:', err);
    return;
  }

  const w = sandbox.window;

  // Sync data from bundle
  for (const [key, val] of Object.entries(w)) {
    if (!Array.isArray(val) || val.length === 0) continue;

    const mapItem = (cat, folder) => {
      val.forEach(item => {
        if (!item || !item.name) return;
        const slug = slugify(item.name);
        itemsData[cat][slug] = {
          n: item.name,
          d: item.description || (itemsData[cat] && itemsData[cat][slug] && itemsData[cat][slug].d) || null,
          i: `${SITE}/images/${folder}/${slug}.webp`
        };
      });
    };

    if (key.startsWith('WEAPON_')) mapItem('weapons', 'weapons');
    if (key.startsWith('VEHICLE_')) mapItem('vehicles', 'vehicles');
    if (key.startsWith('GUN_CRATE_')) mapItem('gun-crates', 'crates');
    if (key.startsWith('ITEM_')) mapItem('items', 'items');
    if (key.startsWith('NPC_')) mapItem('npcs', 'npcs');
    if (key.startsWith('EVENT_')) mapItem('events', 'events');
  }

  // Save items-data.json
  fs.writeFileSync(itemsJsonPath, JSON.stringify(itemsData), 'utf8');

  // Clean and generate static HTML files in item/
  if (fs.existsSync(itemDir)) {
    fs.rmSync(itemDir, { recursive: true, force: true });
  }
  fs.mkdirSync(itemDir, { recursive: true });

  let totalPages = 0;
  for (const [category, items] of Object.entries(itemsData)) {
    const catDir = path.join(itemDir, category);
    fs.mkdirSync(catDir, { recursive: true });

    for (const [id, item] of Object.entries(items)) {
      const targetDir = path.join(catDir, id);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), buildHtml(item, category, id), 'utf8');
      totalPages++;
    }
  }

  console.log(`Synced ${totalPages} items and generated Discord embed pages in item/`);
}

run();
