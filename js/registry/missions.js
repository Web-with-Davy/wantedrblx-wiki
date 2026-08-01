const __MANIFEST_missions = [
  "js/data/missions/Bert/community-outreach.js",
  "js/data/missions/Bert/stolen-goods.js",
  "js/data/missions/Bert/service-fee.js",
  "js/data/missions/Bert/counter-intel.js",
  "js/data/missions/Bert/hot-pursuit.js",
  "js/data/missions/Bert/first-responder.js",
  "js/data/missions/Bert/on-patrol.js",
  "js/data/missions/Bert/bulletproof.js",
  "js/data/missions/Bert/public-relations.js",
  "js/data/missions/Bert/police-sharpshooter.js",
  "js/data/missions/Bert/calling-all-units.js",
  "js/data/missions/Bert/cop-killer.js",
  "js/data/missions/Bert/dirty-money.js",
  "js/data/missions/Bert/introduction.js",
  "js/data/missions/Bert/search-and-seizure.js",
  "js/data/missions/Bert/smash-and-grab.js",
  "js/data/missions/Bert/loss-prevention.js",
  "js/data/missions/Bert/bang-and-clear.js",
  "js/data/missions/Bert/officer-down.js",
  "js/data/missions/Bert/night-shift.js",
  "js/data/missions/Bert/the-italian-job.js",
  "js/data/missions/Bert/air-support.js",
  "js/data/missions/Bert/con-air.js",
  "js/data/missions/Bert/tactical-unit.js",
  "js/data/missions/Bert/all-points-bulletin.js",
  "js/data/missions/Christmas/jingle-balls.js",
  "js/data/missions/Christmas/santas-helper.js",
  "js/data/missions/Christmas/toy-drive.js",
  "js/data/missions/Dan/forbidden-meat.js",
  "js/data/missions/Easter/syndicegg.js",
  "js/data/missions/Easter/the-egg-hunt.js",
  "js/data/missions/Erik/artisan.js",
  "js/data/missions/Game/bank-heist.js",
  "js/data/missions/Game/get-rolling.js",
  "js/data/missions/Sir B/contraband.js",
  "js/data/missions/Sir B/crime-squad.js",
  "js/data/missions/Sir B/data-disk.js",
  "js/data/missions/Sir B/fence.js",
  "js/data/missions/Sir B/front-toward-enemy.js",
  "js/data/missions/Sir B/fuel-depot.js",
  "js/data/missions/Sir B/gem-collector.js",
  "js/data/missions/Sir B/going-loud.js",
  "js/data/missions/Sir B/hidden-cargo.js",
  "js/data/missions/Sir B/incriminating-data.js",
  "js/data/missions/Sir B/lights-out.js",
  "js/data/missions/Sir B/lockpicker.js",
  "js/data/missions/Sir B/most-wanted.js",
  "js/data/missions/Sir B/nightstalker.js",
  "js/data/missions/Sir B/oasis-eleven.js",
  "js/data/missions/Sir B/payday.js",
  "js/data/missions/Sir B/phantom.js",
  "js/data/missions/Sir B/ring-collector.js",
  "js/data/missions/Sir B/smuggler.js",
  "js/data/missions/Sir B/stealth-pilot.js",
  "js/data/missions/Sir B/submariner.js",
  "js/data/missions/Sir B/syndicate-dogs.js",
  "js/data/missions/Sir B/teller.js",
  "js/data/missions/Sir B/the-deposit.js",
  "js/data/missions/Sir B/the-estate.js",
  "js/data/missions/Sir B/the-files.js",
  "js/data/missions/Sir B/the-heaviest-bag.js",
  "js/data/missions/Sir B/timepiece.js",
  "js/data/missions/Sir B/upgrade.js",
  "js/data/missions/Sir B/wargames.js",
  "js/data/missions/Sir B/weapons-cache.js"
];

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_missions).then(() => {
  try {
    window.MISSIONS_DATA = __MANIFEST_missions.flatMap(path => {
      const parts = path.split('/');
      const folder = parts[parts.length - 2].toUpperCase().replace(/[\s-]/g, '_');
      const filename = parts[parts.length - 1].replace('.js', '').toUpperCase().replace(/-/g, '_');
      const varName = 'MISSIONS_' + folder + '_' + filename;
      const data = window[varName];
      if (!data) {
        console.warn(`missions.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return data;
    });
  } catch (err) {
    console.error("Failed building data for js/registry/missions.js:", err);
  }
}));

