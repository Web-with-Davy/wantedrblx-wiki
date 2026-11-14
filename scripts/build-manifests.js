#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const dataBaseDir = path.join(projectRoot, 'js', 'data');
const registryBaseDir = path.join(projectRoot, 'js', 'registry');

const REGISTRIES = [
  { name: 'missions', dataDir: 'missions', manifestVar: '__MANIFEST_missions', registryFile: 'missions.js' },
  { name: 'weapons', dataDir: 'weapons', manifestVar: '__MANIFEST_weapons', registryFile: 'weapons.js' },
  { name: 'vehicles', dataDir: 'vehicles', manifestVar: '__MANIFEST_vehicles', registryFile: 'vehicles.js' },
  { name: 'valuables', dataDir: 'valuables', manifestVar: '__MANIFEST_valuables', registryFile: 'valuables.js' },
  { name: 'items', dataDir: 'Items', manifestVar: '__MANIFEST_items', registryFile: 'items.js' },
  { name: 'youtubers', dataDir: 'youtubers', manifestVar: '__MANIFEST_youtubers', registryFile: 'youtubers.js' },
  { name: 'atms', dataDir: 'atms', manifestVar: '__MANIFEST_atms', registryFile: 'atms.js' },
  { name: 'events', dataDir: 'events', manifestVar: '__MANIFEST_events', registryFile: 'events.js' },
  { name: 'gun-crates', dataDir: 'gun-crates', manifestVar: '__MANIFEST_gun_crates', registryFile: 'gun-crates.js' },
  { name: 'npcs', dataDir: 'npcs', manifestVar: '__MANIFEST_npcs', registryFile: 'npcs.js' },
  { name: 'promo-codes', dataDir: 'promo-codes', manifestVar: '__MANIFEST_promo_codes', registryFile: 'promo-codes.js' },
  { name: 'store', dataDir: 'store', manifestVar: '__MANIFEST_store', registryFile: 'store.js' },
  { name: 'contributors', dataDir: 'contributors', manifestVar: '__MANIFEST_contributors', registryFile: 'contributors.js' }
];

function getJsFilesRecursive(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getJsFilesRecursive(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      const relPath = path.relative(projectRoot, fullPath).replace(/\\/g, '/');
      results.push(relPath);
    }
  }
  return results.sort();
}

function updateManifests() {
  for (const reg of REGISTRIES) {
    const regFilePath = path.join(registryBaseDir, reg.registryFile);
    const dataDirPath = path.join(dataBaseDir, reg.dataDir);

    if (!fs.existsSync(regFilePath)) {
      console.warn(`Registry file not found: ${regFilePath}`);
      continue;
    }

    const files = getJsFilesRecursive(dataDirPath);
    const manifestStr = `const ${reg.manifestVar} = [\n` +
      files.map(f => `  "${f}"`).join(',\n') +
      '\n];';

    let content = fs.readFileSync(regFilePath, 'utf8');
    const regex = new RegExp(`const ${reg.manifestVar} = \\[[\\s\\S]*?\\];`);

    if (regex.test(content)) {
      content = content.replace(regex, manifestStr);
      fs.writeFileSync(regFilePath, content, 'utf8');
      console.log(`Updated ${reg.manifestVar} in ${reg.registryFile} (${files.length} files)`);
    } else {
      console.warn(`Could not find ${reg.manifestVar} declaration in ${reg.registryFile}`);
    }
  }
}

if (require.main === module) {
  updateManifests();
}

module.exports = { updateManifests };
