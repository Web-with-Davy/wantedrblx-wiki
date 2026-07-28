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
    window.GUNS_DATA = [

      // Pistols
      ...WEAPON_M9,
      ...WEAPON_GLOCK_18C,
      ...WEAPON_DEAGLE,

      // SMGs
      ...WEAPON_UZI,
      ...WEAPON_UMP_45,
      ...WEAPON_SKORPION,
      ...WEAPON_KRISS_VECTOR,
      ...WEAPON_MP5K,
      ...WEAPON_P90,

      // Shotguns
      ...WEAPON_MODEL_870,
      ...WEAPON_BENELLI_M1014,
      ...WEAPON_SPAS_12,
      ...WEAPON_SAWNOFF,

      // Rifles
      ...WEAPON_AUG_A1,
      ...WEAPON_AK_47,
      ...WEAPON_M4A1,
      ...WEAPON_ARX_160,
      ...WEAPON_M60,
      ...WEAPON_FN_FAL,
      ...WEAPON_LIGHTCARBINE,

      // Snipers
      ...WEAPON_AWM,
      ...WEAPON_SVD,

      // Airdrop
      ...WEAPON_BARRETT_M82,
      ...WEAPON_GOLDEN_BARRETT_M82,
      ...WEAPON_GOLDEN_AK_47,
      ...WEAPON_GOLDEN_DEAGLE,

    ];

    window.EQUIPMENT_DATA = [
      ...WEAPON_BALLISTIC_SHIELD,
    ];

    window.EXPLOSIVES_DATA = [
      ...WEAPON_C4,
      ...WEAPON_FLASHBANG,
      ...WEAPON_GRENADE_LAUNCHER,
      ...WEAPON_M67,
      ...WEAPON_RPG_7,
    ];

    window.TOOLS_DATA = [
      ...WEAPON_BUZZSAW,
      ...WEAPON_VAULT_CRACKER,
    ];
  } catch (err) {
    console.error("Failed building data for js/jsdata/weapons.js:", err);
  }
}));
