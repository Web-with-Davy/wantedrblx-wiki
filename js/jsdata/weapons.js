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
  "js/data/weapons/Pistols/deagle.js",
  "js/data/weapons/Pistols/glock-18c.js",
  "js/data/weapons/Pistols/m9.js",
  "js/data/weapons/Rifles/ak-47.js",
  "js/data/weapons/Rifles/arx-160.js",
  "js/data/weapons/Rifles/aug-a1.js",
  "js/data/weapons/Rifles/fn-fal.js",
  "js/data/weapons/Rifles/light-carbine.js",
  "js/data/weapons/Rifles/m4a1.js",
  "js/data/weapons/Rifles/m60.js",
  "js/data/weapons/SMGs/kriss-vector.js",
  "js/data/weapons/SMGs/mp5k.js",
  "js/data/weapons/SMGs/p90.js",
  "js/data/weapons/SMGs/skorpion.js",
  "js/data/weapons/SMGs/ump-45.js",
  "js/data/weapons/SMGs/uzi.js",
  "js/data/weapons/Shotguns/benelli-m1014.js",
  "js/data/weapons/Shotguns/model-870.js",
  "js/data/weapons/Shotguns/sawn-off.js",
  "js/data/weapons/Shotguns/spas-12.js",
  "js/data/weapons/Snipers/awm.js",
  "js/data/weapons/Snipers/svd.js",
  "js/data/weapons/Tools/buzzsaw.js",
  "js/data/weapons/Tools/vault-cracker.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_weapons).then(() => {
  try {
    const GUN_CATEGORIES = new Set(['Pistols', 'SMGs', 'Shotguns', 'Rifles', 'Snipers', 'Airdrop']);

    const byCategory = {};
    __MANIFEST_weapons.forEach(path => {
      const parts = path.split('/');
      const category = parts[parts.length - 2];
      const filename = parts[parts.length - 1].replace('.js', '');
      const varName = 'WEAPON_' + filename.toUpperCase().replace(/-/g, '_');
      let data; try { data = eval(varName); } catch(_) {}
      if (!data) {
        console.warn(`weapons.js: expected "${varName}" from "${path}" but it was not found.`);
        return;
      }
      if (!byCategory[category]) byCategory[category] = [];
      byCategory[category].push(...data);
    });

    window.GUNS_DATA = Object.entries(byCategory)
      .filter(([cat]) => GUN_CATEGORIES.has(cat))
      .flatMap(([, items]) => items);

    window.EQUIPMENT_DATA = byCategory['Equipment'] || [];
    window.EXPLOSIVES_DATA = byCategory['Explosives'] || [];
    window.TOOLS_DATA = byCategory['Tools'] || [];
  } catch (err) {
    console.error("Failed building data for js/jsdata/weapons.js:", err);
  }
}));
