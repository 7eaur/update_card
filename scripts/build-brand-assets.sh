#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
BRAND="$ROOT/brand"
SOURCE="$BRAND/source/originals/update-card-logo-reference.jpeg"

mkdir -p "$BRAND/logo/original/png" "$BRAND/logo/compact/png" "$BRAND/web" "$BRAND/previews"

# The lower UPDATE CARD wordmark is retained exactly as supplied. The white
# version preserves every source pixel; the transparent version only removes
# near-white background pixels so it can sit on a white HTML surface.
convert "$SOURCE" -crop 870x120+105+690 +repage -trim +repage \
  "$BRAND/logo/original/png/update-card-original-wordmark-on-white.png"
convert "$SOURCE" -crop 870x120+105+690 +repage -fuzz 5% -transparent white -trim +repage \
  "$BRAND/logo/original/png/update-card-original-wordmark-transparent.png"

# The compact lockup is the small mark actually present inside the supplied image.
convert "$SOURCE" -crop 190x85+800+430 +repage -trim +repage \
  "$BRAND/logo/compact/png/update-card-original-compact-on-white.png"
convert "$SOURCE" -crop 190x85+800+430 +repage -fuzz 5% -transparent white -trim +repage \
  "$BRAND/logo/compact/png/update-card-original-compact-transparent.png"

cp "$BRAND/logo/original/png/update-card-original-wordmark-on-white.png" "$BRAND/web/logo-horizontal.png"
cp "$BRAND/logo/original/png/update-card-original-wordmark-transparent.png" "$BRAND/web/logo-horizontal-transparent.png"

convert -size 980x160 xc:white "$BRAND/logo/original/png/update-card-original-wordmark-on-white.png" -gravity center -composite "$BRAND/previews/original-wordmark-light.png"
convert -size 980x160 xc:'#101827' "$BRAND/logo/original/png/update-card-original-wordmark-on-white.png" -gravity center -composite "$BRAND/previews/original-wordmark-dark-container.png"
convert -size 360x180 xc:white "$BRAND/logo/compact/png/update-card-original-compact-on-white.png" -gravity center -composite "$BRAND/previews/original-compact-light.png"

echo 'Faithful original-logo assets built.'
