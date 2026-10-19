#!/usr/bin/env bash
# build-bundle.sh — Concatenates all wiki data files into a single JS bundle.
# This replaces 177+ individual HTTP requests with a single file load.
# Run this script whenever data files are added or changed.

set -e

WIKI_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$WIKI_DIR/js/data-bundle.js"

echo "Building data bundle..."
echo "/* AUTO-GENERATED — do not edit directly. Run ./build-bundle.sh to regenerate. */" > "$OUT"
echo "" >> "$OUT"

DATA_DIR="$WIKI_DIR/js/data"

# Concatenate all JS data files in consistent order
find "$DATA_DIR" -type f -name "*.js" | sort | while IFS= read -r f; do
    rel="${f#$WIKI_DIR/}"
    echo "/* --- $rel --- */" >> "$OUT"
    cat "$f" >> "$OUT"
    echo "" >> "$OUT"
done

# Sentinel flag: tells registry scripts that all data is pre-loaded, skip loadScripts()
echo "" >> "$OUT"
echo "/* Sentinel: data bundle fully loaded */" >> "$OUT"
echo "window.__WANTED_DATA_BUNDLED = true;" >> "$OUT"

# Update weapon manifest in js/registry/weapons.js to match current weapon data files
WEAPONS_REGISTRY="$WIKI_DIR/js/registry/weapons.js"
if [ -f "$WEAPONS_REGISTRY" ]; then
    echo "Updating weapons manifest in js/registry/weapons.js..."
    node -e "
    const fs = require('fs');
    const path = require('path');
    const weaponsDir = path.join('$DATA_DIR', 'weapons');
    function getFiles(dir) {
        let results = [];
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat && stat.isDirectory()) {
                results = results.concat(getFiles(fullPath));
            } else if (file.endsWith('.js')) {
                results.push(path.relative('$WIKI_DIR', fullPath));
            }
        });
        return results;
    }
    const weaponFiles = getFiles(weaponsDir).sort();
    let content = fs.readFileSync('$WEAPONS_REGISTRY', 'utf8');
    const manifestStr = 'const __MANIFEST_weapons = [\n' + weaponFiles.map(f => '  \"' + f + '\"').join(',\n') + '\n];';
    content = content.replace(/const __MANIFEST_weapons = \[[\s\S]*?\];/, manifestStr);
    fs.writeFileSync('$WEAPONS_REGISTRY', content);
    "
fi

# Update valuables manifest in js/registry/valuables.js to match current valuable data files
VALUABLES_REGISTRY="$WIKI_DIR/js/registry/valuables.js"
if [ -f "$VALUABLES_REGISTRY" ]; then
    echo "Updating valuables manifest in js/registry/valuables.js..."
    node -e "
    const fs = require('fs');
    const path = require('path');
    const valDir = path.join('$DATA_DIR', 'valuables');
    const valFiles = fs.readdirSync(valDir)
        .filter(f => f.endsWith('.js'))
        .sort()
        .map(f => 'js/data/valuables/' + f);
    let content = fs.readFileSync('$VALUABLES_REGISTRY', 'utf8');
    const manifestStr = 'const __MANIFEST_valuables = [\n' + valFiles.map(f => '  \"' + f + '\"').join(',\n') + '\n];';
    content = content.replace(/const __MANIFEST_valuables = \[[\s\S]*?\];/, manifestStr);
    fs.writeFileSync('$VALUABLES_REGISTRY', content);
    "
fi

# Update vehicles manifest in js/registry/vehicles.js to match current vehicle data files
VEHICLES_REGISTRY="$WIKI_DIR/js/registry/vehicles.js"
if [ -f "$VEHICLES_REGISTRY" ]; then
    echo "Updating vehicles manifest in js/registry/vehicles.js..."
    node -e "
    const fs = require('fs');
    const path = require('path');
    const vecDir = path.join('$DATA_DIR', 'vehicles');
    function getFiles(dir) {
        let results = [];
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat && stat.isDirectory()) {
                results = results.concat(getFiles(fullPath));
            } else if (file.endsWith('.js')) {
                results.push(path.relative('$WIKI_DIR', fullPath));
            }
        });
        return results;
    }
    const vecFiles = getFiles(vecDir).sort();
    let content = fs.readFileSync('$VEHICLES_REGISTRY', 'utf8');
    const manifestStr = 'const __MANIFEST_vehicles = [\n' + vecFiles.map(f => '  \"' + f + '\"').join(',\n') + '\n];';
    content = content.replace(/const __MANIFEST_vehicles = \[[\s\S]*?\];/, manifestStr);
    fs.writeFileSync('$VEHICLES_REGISTRY', content);
    "
fi

LINES=$(wc -l < "$OUT")
SIZE=$(du -sh "$OUT" | cut -f1)
COUNT=$(find "$DATA_DIR" -type f -name "*.js" | wc -l)

echo "Done! Bundle: $OUT"
echo "  Files merged: $COUNT"
echo "  Total lines:  $LINES"
echo "  File size:    $SIZE"
