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
    // Auto-build VEHICLES_DATA from the manifest.
    // Each file exports a const named VEHICLE_<FILENAME_UPPERCASED>
    // e.g. "js/data/vehicles/Ground/Bayview/beam.js" -> VEHICLE_BEAM
    window.VEHICLES_DATA = __MANIFEST_vehicles.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = 'VEHICLE_' + filename.toUpperCase().replace(/-/g, '_');
      let data; try { data = eval(varName); } catch(_) {}
      if (!data) {
        console.warn(`vehicles.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });
  } catch (err) {
    console.error("Failed building data for js/registry/vehicles.js:", err);
  }
}));
