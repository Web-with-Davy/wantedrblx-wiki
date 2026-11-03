const fs = require('fs');
const path = require('path');

const SITE = 'https://wantedrblx.com';
const DEFAULT_IMG = `${SITE}/images/og-image.webp`;
const DEFAULT_DESC = 'The Roblox Wanted Wiki — find all weapons, vehicles, missions, valuables, promo codes and more!';

const projectRoot = path.resolve(__dirname, '..');
const bundlePath = path.join(projectRoot, 'js', 'data-bundle.js');
const itemsJsonPath = path.join(projectRoot, 'items-data.json');

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function run() {
  if (!fs.existsSync(bundlePath)) {
    console.error('js/data-bundle.js not found!');
    return;
  }

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

  fs.writeFileSync(itemsJsonPath, JSON.stringify(itemsData), 'utf8');

  const totalItems = Object.values(itemsData).reduce((total, category) => total + Object.keys(category).length, 0);
  console.log(`Synced ${totalItems} items for the embed Worker.`);
}

run();
