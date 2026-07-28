const __MANIFEST_npcs = [
  "js/data/npcs/bert.js",
  "js/data/npcs/cody.js",
  "js/data/npcs/dan.js",
  "js/data/npcs/davy.js",
  "js/data/npcs/erik.js",
  "js/data/npcs/justin.js",
  "js/data/npcs/ofy.js",
  "js/data/npcs/rod.js",
  "js/data/npcs/sir-b.js",
  "js/data/npcs/softy.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_npcs).then(() => {
  try {
    window.NPCS_DATA = [
      ...NPC_ERIK,
      ...NPC_DAN,
      ...NPC_SIRB,
      ...NPC_BERT,
      ...NPC_SOFTY,
      ...NPC_JUSTIN,
      ...NPC_CODY,
      ...NPC_DAVY,
      ...NPC_ROD,
      ...NPC_OFY,
    ];
  } catch (err) {
    console.error("Failed building data for js/jsdata/npcs.js:", err);
  }
}));
