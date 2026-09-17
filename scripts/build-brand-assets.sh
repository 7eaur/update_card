#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/.." && pwd)
BRAND="$ROOT/brand"
SRC="$BRAND/source"

mkdir -p "$SRC/originals" "$BRAND"/{web,favicon,app-icons,social,previews} \
  "$BRAND/logo"/{primary/svg,primary/png,primary/pdf,icon/svg,icon/png,wordmark/svg,stacked/svg,monochrome/svg,small-size/svg}
cp "$ROOT/../upload/673199e3-1a99-4b78-b2e1-225a65de7677(2).jpeg" "$SRC/originals/update-card-logo-reference.jpeg"

as_paths() { inkscape "$1" --export-plain-svg --export-text-to-path --export-filename="$2" >/dev/null; }
png() { inkscape "$1" --export-background-opacity=0 --export-filename="$2" -w "$3" >/dev/null; }
pdf() { inkscape "$1" --export-text-to-path --export-filename="$2" >/dev/null; }
eps() { inkscape "$1" --export-text-to-path --export-filename="$2" >/dev/null; }
minify_svg() { tr '\n\t' '  ' < "$1" | tr -s ' ' | sed -e 's/> </></g' -e 's/[[:space:]]*$//' > "$2"; printf '\n' >> "$2"; }

# Production full-color originals, with all lettering converted to paths.
as_paths "$SRC/logo-horizontal-master.svg" "$BRAND/logo/primary/svg/logo-horizontal-full-color.svg"
as_paths "$SRC/logo-icon-master.svg" "$BRAND/logo/icon/svg/logo-icon-full-color.svg"
as_paths "$SRC/logo-stacked-master.svg" "$BRAND/logo/stacked/svg/logo-stacked-full-color.svg"
as_paths "$SRC/wordmark-master.svg" "$BRAND/logo/wordmark/svg/wordmark-full-color.svg"
cp "$BRAND/logo/primary/svg/logo-horizontal-full-color.svg" "$BRAND/web/logo-horizontal.svg"
cp "$BRAND/logo/icon/svg/logo-icon-full-color.svg" "$BRAND/web/logo-icon.svg"
pdf "$SRC/logo-horizontal-master.svg" "$BRAND/logo/primary/pdf/logo-horizontal-full-color.pdf"
eps "$SRC/logo-horizontal-master.svg" "$BRAND/logo/primary/pdf/logo-horizontal-full-color.eps"
sed -i 's/[[:space:]]*$//' "$BRAND/logo/primary/pdf/logo-horizontal-full-color.eps"

# Single-color production variants are generated from the exact same geometry.
for tone in dark white; do
  color='#303845'; [ "$tone" = white ] && color='#FFFFFF'
  tmp=$(mktemp)
  sed -E "s/#B21D35|#7B0B4B|#102B82|#173B8F|#1F83B6|#A91535|#303845/${color}/g" "$SRC/logo-horizontal-master.svg" > "$tmp"
  as_paths "$tmp" "$BRAND/logo/monochrome/svg/logo-horizontal-${tone}.svg"
  rm "$tmp"
done
cp "$BRAND/logo/monochrome/svg/logo-horizontal-dark.svg" "$BRAND/web/logo-dark.svg"
cp "$BRAND/logo/monochrome/svg/logo-horizontal-white.svg" "$BRAND/web/logo-white.svg"
cp "$BRAND/logo/monochrome/svg/logo-horizontal-dark.svg" "$BRAND/logo/primary/svg/logo-horizontal-single-color.svg"

# The micro mark is icon-only; it removes the three narrow status bars at 16px.
cat > "$BRAND/logo/small-size/svg/micro-mark.svg" <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" role="img" aria-label="Update Card micro mark"><path fill="#303845" d="M156 29c38 0 69 31 69 69v24c0 38-31 69-69 69h-45c-38 0-69-31-69-69V98c0-38 31-69 69-69h45Zm-45 31c-21 0-38 17-38 38v24c0 21 17 38 38 38h45c21 0 38-17 38-38V98c0-21-17-38-38-38h-45Z"/><path fill="#303845" d="M76 43h27v103c0 20-16 36-36 36H39c-20 0-36-16-36-36V43h31v103c0 3 2 5 5 5h28c5 0 9-4 9-9V43Z" transform="translate(25 0)"/></svg>
EOF

# Website optimized copies: Inkscape's plain-SVG export removes editor metadata and font dependencies.
minify_svg "$BRAND/web/logo-horizontal.svg" "$BRAND/web/logo-horizontal.min.svg"
minify_svg "$BRAND/web/logo-icon.svg" "$BRAND/web/logo-icon.min.svg"

for n in 256 512 1024 2048; do
  png "$SRC/logo-horizontal-master.svg" "$BRAND/logo/primary/png/logo-horizontal-${n}.png" "$n"
  png "$SRC/logo-icon-master.svg" "$BRAND/logo/icon/png/logo-icon-${n}.png" "$n"
done

# Favicons and mobile icons.
png "$BRAND/logo/small-size/svg/micro-mark.svg" "$BRAND/favicon/favicon-16x16.png" 16
png "$BRAND/logo/small-size/svg/micro-mark.svg" "$BRAND/favicon/favicon-32x32.png" 32
cp "$BRAND/logo/small-size/svg/micro-mark.svg" "$BRAND/favicon/favicon.svg"
convert "$BRAND/favicon/favicon-16x16.png" "$BRAND/favicon/favicon-32x32.png" \( "$BRAND/favicon/favicon-32x32.png" -resize 48x48 \) "$BRAND/favicon/favicon.ico"

# White base and 20% safe padding keep the mark safe in masks and circular crops.
for n in 180 192 512 1024; do
  tmp=$(mktemp --suffix=.png)
  mark=$(mktemp --suffix=.png)
  png "$SRC/logo-icon-master.svg" "$tmp" "$n"
  convert "$tmp" -resize "$((n*64/100))x$((n*64/100))" "$mark"
  convert -size "${n}x${n}" xc:white "$mark" -gravity center -composite "$tmp"
  rm "$mark"
  case "$n" in
    180) mv "$tmp" "$BRAND/app-icons/apple-touch-icon.png";;
    192) cp "$tmp" "$BRAND/app-icons/icon-192.png"; cp "$tmp" "$BRAND/app-icons/maskable-icon-192.png"; cp "$tmp" "$BRAND/social/social-avatar-512.png"; convert "$tmp" -resize 512x512 "$BRAND/social/social-avatar-512.png"; rm "$tmp";;
    512) cp "$tmp" "$BRAND/app-icons/icon-512.png"; cp "$tmp" "$BRAND/app-icons/maskable-icon-512.png"; cp "$SRC/logo-icon-master.svg" "$BRAND/social/social-profile.svg"; convert "$tmp" -resize 1024x1024 "$BRAND/social/social-avatar-1024.png"; rm "$tmp";;
    1024) mv "$tmp" "$BRAND/app-icons/app-icon-1024.png";;
  esac
done

# Preview assets (not source assets).
png "$SRC/logo-horizontal-master.svg" "$BRAND/previews/horizontal-preview.png" 1120
convert -size 1400x420 xc:white "$BRAND/previews/horizontal-preview.png" -gravity center -resize 900x -composite "$BRAND/previews/light-background.png"
darktmp=$(mktemp --suffix=.png)
png "$BRAND/web/logo-white.svg" "$darktmp" 1120
convert -size 1400x420 xc:'#101827' "$darktmp" -gravity center -resize 900x -composite "$BRAND/previews/dark-background.png"
rm "$darktmp"
png "$SRC/logo-icon-master.svg" "$BRAND/previews/icon-preview.png" 512
convert "$BRAND/favicon/favicon-16x16.png" -filter point -resize 256x256 "$BRAND/previews/favicon-size-test-16.png"
convert "$BRAND/favicon/favicon-32x32.png" -filter point -resize 256x256 "$BRAND/previews/favicon-size-test-32.png"
montage "$BRAND/previews/light-background.png" "$BRAND/previews/dark-background.png" "$BRAND/previews/icon-preview.png" "$BRAND/previews/favicon-size-test-16.png" -tile 2x2 -geometry 700x420+12+12 -background '#E8ECF2' "$BRAND/previews/contact-sheet.png"

echo "Brand assets built."
