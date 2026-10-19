const __MANIFEST_weapons = [
  "js/data/weapons/Airdrop/barrett-m82.js",
  "js/data/weapons/Airdrop/golden-ak-47.js",
  "js/data/weapons/Airdrop/golden-barrett-m82.js",
  "js/data/weapons/Airdrop/golden-deagle.js",
  "js/data/weapons/Equipment/ballistic-shield.js",
  "js/data/weapons/Explosives/c4.js",
  "js/data/weapons/Explosives/flashbang.js",
  "js/data/weapons/Explosives/grenade-launcher.js",
  "js/data/weapons/Explosives/m67.js",
  "js/data/weapons/Explosives/rpg-7.js",
  "js/data/weapons/Heavy/ak-47.js",
  "js/data/weapons/Heavy/arx-160.js",
  "js/data/weapons/Heavy/aug-a1.js",
  "js/data/weapons/Heavy/awm.js",
  "js/data/weapons/Heavy/flamethrower.js",
  "js/data/weapons/Heavy/fn-fal.js",
  "js/data/weapons/Heavy/m4a1.js",
  "js/data/weapons/Heavy/m60.js",
  "js/data/weapons/Heavy/svd.js",
  "js/data/weapons/Light/deagle.js",
  "js/data/weapons/Light/glock-18c.js",
  "js/data/weapons/Light/light-carbine.js",
  "js/data/weapons/Light/m9.js",
  "js/data/weapons/Light/raygun.js",
  "js/data/weapons/Light/sawn-off.js",
  "js/data/weapons/Light/skorpion.js",
  "js/data/weapons/Light/uzi.js",
  "js/data/weapons/Medium/benelli-m1014.js",
  "js/data/weapons/Medium/kriss-vector.js",
  "js/data/weapons/Medium/model-870.js",
  "js/data/weapons/Medium/mp5k.js",
  "js/data/weapons/Medium/p90.js",
  "js/data/weapons/Medium/spas-12.js",
  "js/data/weapons/Medium/ump-45.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_weapons).then(() => {
  try {
    const GUN_CATEGORIES = new Set(['Light', 'Medium', 'Heavy', 'Airdrop']);

    const byCategory = {};
    __MANIFEST_weapons.forEach(path => {
      const parts = path.split('/');
      const category = parts[parts.length - 2];
      const filename = parts[parts.length - 1].replace('.js', '');
      const varName = 'WEAPON_' + filename.toUpperCase().replace(/-/g, '_');
      const data = window[varName];
      if (!data) {
        console.warn(`weapons.js: expected "${varName}" from "${path}" but it was not found.`);
        return;
      }
      data.forEach(item => {
        if (!item.category) item.category = category;
      });
      if (!byCategory[category]) byCategory[category] = [];
      byCategory[category].push(...data);
    });

    window.WEAPONS_BY_CATEGORY = byCategory;
    window.GUNS_DATA = Object.entries(byCategory)
      .filter(([cat]) => GUN_CATEGORIES.has(cat))
      .flatMap(([, items]) => items);

    window.EQUIPMENT_DATA = byCategory['Equipment'] || [];
    window.EXPLOSIVES_DATA = byCategory['Explosives'] || [];
    window.WEAPONS_DATA = Object.values(byCategory).flat();
  } catch (err) {
    console.error("Failed building data for js/registry/weapons.js:", err);
  }
}));
