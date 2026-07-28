const __MANIFEST_gun_crates = [
  "js/data/gun-crates/ak-47-crate.js",
  "js/data/gun-crates/aug-a1-crate.js",
  "js/data/gun-crates/awm-crate.js",
  "js/data/gun-crates/benelli-m1014-crate.js",
  "js/data/gun-crates/glock-18c-crate.js",
  "js/data/gun-crates/m4a1-crate.js",
  "js/data/gun-crates/rpg-7-crate.js",
  "js/data/gun-crates/ump-45-crate.js",
  "js/data/gun-crates/uzi-crate.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_gun_crates).then(() => {
  try {
    window.GUN_CRATES_DATA = [

      ...GUN_CRATE_AK_47,
      ...GUN_CRATE_UZI,
      ...GUN_CRATE_RPG_7,
      ...GUN_CRATE_UMP_45,
      ...GUN_CRATE_AWM,
      ...GUN_CRATE_GLOCK_18C,
      ...GUN_CRATE_M4A1,
      ...GUN_CRATE_AUG_A1,
      ...GUN_CRATE_BENELLI_M1014,

    ];
  } catch (err) {
    console.error("Failed building data for js/jsdata/gun-crates.js:", err);
  }
}));
