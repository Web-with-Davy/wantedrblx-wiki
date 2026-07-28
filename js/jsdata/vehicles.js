const __MANIFEST_vehicles = [
  "js/data/vehicles/Flying/Crates/panther.js",
  "js/data/vehicles/Flying/Davis/maverick.js",
  "js/data/vehicles/Flying/Davis/mini-bird.js",
  "js/data/vehicles/Flying/Davis/scout.js",
  "js/data/vehicles/Ground/Bayview/beam.js",
  "js/data/vehicles/Ground/Bayview/contender.js",
  "js/data/vehicles/Ground/Bayview/crowline.js",
  "js/data/vehicles/Ground/Bayview/falcon-gt.js",
  "js/data/vehicles/Ground/Bayview/g-cruiser.js",
  "js/data/vehicles/Ground/Bayview/gemstone.js",
  "js/data/vehicles/Ground/Bayview/mochi.js",
  "js/data/vehicles/Ground/Bayview/nomad.js",
  "js/data/vehicles/Ground/Bayview/pulse-477.js",
  "js/data/vehicles/Ground/Bayview/ranger.js",
  "js/data/vehicles/Ground/Bayview/razor.js",
  "js/data/vehicles/Ground/Bayview/spectre.js",
  "js/data/vehicles/Ground/Bayview/stallion-450.js",
  "js/data/vehicles/Ground/Bayview/vanguard.js",
  "js/data/vehicles/Ground/Bayview/zoro.js",
  "js/data/vehicles/Ground/Bayview/zorvello.js",
  "js/data/vehicles/Ground/Crates/empyrean.js",
  "js/data/vehicles/Ground/Crates/horizon.js",
  "js/data/vehicles/Ground/Crates/pulse-477-rs.js",
  "js/data/vehicles/Ground/Crates/roku.js",
  "js/data/vehicles/Ground/Crates/temporo.js",
  "js/data/vehicles/Ground/Daily/rival.js",
  "js/data/vehicles/Ground/Police/interceptor.js",
  "js/data/vehicles/Ground/Police/warden.js",
  "js/data/vehicles/Ground/Starter/cruiser.js",
  "js/data/vehicles/Ground/Syndicate/blade.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_vehicles).then(() => {
  try {
    window.VEHICLES_DATA = [

      // Ground Vehicles
      ...VEHICLE_CRUISER,
      ...VEHICLE_NOMAD,
      ...VEHICLE_RANGER,
      ...VEHICLE_CONTENDER,
      ...VEHICLE_BEAM,
      ...VEHICLE_CROWLINE,
      ...VEHICLE_STALLION_450,
      ...VEHICLE_G_CRUISER,
      ...VEHICLE_GEMSTONE,
      ...VEHICLE_VANGUARD,
      ...VEHICLE_ZORO,
      ...VEHICLE_PULSE_477,
      ...VEHICLE_RAZOR,
      ...VEHICLE_ZORVELLO,
      ...VEHICLE_SPECTRE,
      ...VEHICLE_BLADE,
      ...VEHICLE_ROKU,
      ...VEHICLE_HORIZON,
      ...VEHICLE_TEMPORO,
      ...VEHICLE_PULSE_477_RS,
      ...VEHICLE_EMPYREAN,
      ...VEHICLE_FALCON_GT,
      ...VEHICLE_RIVAL,
      ...VEHICLE_MOCHI,
      ...VEHICLE_WARDEN,
      ...VEHICLE_INTERCEPTOR,

      // Flying Vehicles
      ...VEHICLE_MINI_BIRD,
      ...VEHICLE_SCOUT,
      ...VEHICLE_PANTHER,
      ...VEHICLE_MAVERICK,

    ];
  } catch (err) {
    console.error("Failed building data for js/jsdata/vehicles.js:", err);
  }
}));
