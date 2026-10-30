const fs = require('fs');
const path = require('path');

const SITE = 'https://wantedrblx.com';

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractItems() {
  const sandbox = { window: {} };
  const projectRoot = path.resolve(__dirname, '..');
  const bundlePath = path.join(projectRoot, 'js', 'data-bundle.js');
  if (!fs.existsSync(bundlePath)) {
    console.error('js/data-bundle.js not found at:', bundlePath);
    return null;
  }

  const bundleCode = fs.readFileSync(bundlePath, 'utf8');
  try {
    const fn = new Function('window', bundleCode);
    fn(sandbox.window);
  } catch (err) {
    console.error('Error running data bundle:', err);
    return null;
  }

  const w = sandbox.window;

  // Read existing items-data.json as base so any pre-mapped items/descriptions are preserved
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

  const existingPath = path.join(projectRoot, 'items-data.json');
  if (fs.existsSync(existingPath)) {
    try {
      itemsData = Object.assign(itemsData, JSON.parse(fs.readFileSync(existingPath, 'utf8')));
    } catch (_) {}
  }

  // Iterate over all window properties to extract/update items
  for (const [key, val] of Object.entries(w)) {
    if (!Array.isArray(val) || val.length === 0) continue;

    // Weapons
    if (key.startsWith('WEAPON_')) {
      val.forEach(item => {
        if (!item || !item.name) return;
        const slug = slugify(item.name);
        itemsData.weapons[slug] = {
          n: item.name,
          d: item.description || (itemsData.weapons[slug] && itemsData.weapons[slug].d) || null,
          i: `${SITE}/images/weapons/${slug}.webp`
        };
      });
    }

    // Vehicles
    if (key.startsWith('VEHICLE_')) {
      val.forEach(item => {
        if (!item || !item.name) return;
        const slug = slugify(item.name);
        itemsData.vehicles[slug] = {
          n: item.name,
          d: item.description || (itemsData.vehicles[slug] && itemsData.vehicles[slug].d) || null,
          i: `${SITE}/images/vehicles/${slug}.webp`
        };
      });
    }

    // Gun crates
    if (key.startsWith('GUN_CRATE_')) {
      val.forEach(item => {
        if (!item || !item.name) return;
        const slug = slugify(item.name);
        itemsData['gun-crates'][slug] = {
          n: item.name,
          d: item.description || (itemsData['gun-crates'][slug] && itemsData['gun-crates'][slug].d) || null,
          i: `${SITE}/images/crates/${slug}.webp`
        };
      });
    }

    // Items
    if (key.startsWith('ITEM_')) {
      val.forEach(item => {
        if (!item || !item.name) return;
        const slug = slugify(item.name);
        itemsData.items[slug] = {
          n: item.name,
          d: item.description || (itemsData.items[slug] && itemsData.items[slug].d) || null,
          i: `${SITE}/images/items/${slug}.webp`
        };
      });
    }

    // NPCs
    if (key.startsWith('NPC_')) {
      val.forEach(item => {
        if (!item || !item.name) return;
        const slug = slugify(item.name);
        itemsData.npcs[slug] = {
          n: item.name,
          d: item.description || (itemsData.npcs[slug] && itemsData.npcs[slug].d) || null,
          i: `${SITE}/images/npcs/${slug}.webp`
        };
      });
    }

    // Events
    if (key.startsWith('EVENT_')) {
      val.forEach(item => {
        if (!item || !item.name) return;
        const slug = slugify(item.name);
        itemsData.events[slug] = {
          n: item.name,
          d: item.description || (itemsData.events[slug] && itemsData.events[slug].d) || null,
          i: `${SITE}/images/events/${slug}.webp`
        };
      });
    }
  }

  fs.writeFileSync(existingPath, JSON.stringify(itemsData), 'utf8');
  let total = 0;
  for (const cat in itemsData) {
    total += Object.keys(itemsData[cat]).length;
  }
  console.log(`Updated items-data.json successfully! (Total items tracked: ${total})`);
}

extractItems();
