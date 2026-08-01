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

LINES=$(wc -l < "$OUT")
SIZE=$(du -sh "$OUT" | cut -f1)
COUNT=$(find "$DATA_DIR" -type f -name "*.js" | wc -l)

echo "Done! Bundle: $OUT"
echo "  Files merged: $COUNT"
echo "  Total lines:  $LINES"
echo "  File size:    $SIZE"
