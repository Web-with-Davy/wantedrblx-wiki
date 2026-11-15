const fs = require('fs');
const path = require('path');

const SITE = 'https://wantedrblx.com';

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
        const name = item && (item.name || item.title);
        if (!name) return;
        const slug = slugify(item.id || name);
        const stats = item.stats && typeof item.stats === 'object' ? item.stats : {};
        const details = {
          Category: item.category || item.missionType,
          Obtaining: item.obtaining,
          Location: item.location || item.commonLocation,
          Difficulty: item.difficulty,
          Team: item.team,
          Rarity: item.rarity,
          Contents: item.gun,
          Cooldown: item.cooldown,
          Price: item.contractPrice ?? item.price,
          'Cash range': typeof item.priceMin === 'number' && typeof item.priceMax === 'number'
            ? `${item.priceMin}-${item.priceMax}`
            : null,
          Reward: Array.isArray(item.rewards) ? item.rewards.join(', ') : item.rewards,
          ...stats,
        };
        const detailStats = Object.fromEntries(Object.entries(details).filter(([, value]) =>
          (typeof value === 'string' || typeof value === 'number')
          && String(value).trim()
          && !['?', '? - ?', 'Unknown', 'Nowhere'].includes(String(value).trim())
        ));
        itemsData[cat][slug] = {
          n: name,
          d: typeof item.description === 'string' && item.description.trim() ? item.description.trim() : null,
          i: `${SITE}/images/${folder}/${slug}.webp`,
          s: detailStats
        };
      });
    };

    if (key.startsWith('WEAPON_')) mapItem('weapons', 'weapons');
    if (key.startsWith('VEHICLE_')) mapItem('vehicles', 'vehicles');
    if (key.startsWith('GUN_CRATE_')) mapItem('gun-crates', 'crates');
    if (key.startsWith('ITEM_')) mapItem('items', 'items');
    if (key.startsWith('MISSIONS_')) mapItem('missions', 'missions');
    if (key.startsWith('NPC_')) mapItem('npcs', 'npcs');
    if (key.startsWith('EVENT_')) mapItem('events', 'events');
    if (key.startsWith('VALUABLES_')) mapItem('valuables', 'valuables');
    if (key === 'ATMS_DATA' || key === 'VAULTS_DATA') mapItem('atms', 'atms');
  }

  fs.writeFileSync(itemsJsonPath, JSON.stringify(itemsData), 'utf8');

  const totalItems = Object.values(itemsData).reduce((total, category) => total + Object.keys(category).length, 0);
  console.log(`Synced ${totalItems} items for the embed Worker.`);
}

run();
