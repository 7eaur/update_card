#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
ICON = ROOT / 'logo/icon/update-card-uc-transparent.png'
OUT = ROOT / 'social'
OUT.mkdir(parents=True, exist_ok=True)

mark = Image.open(ICON).convert('RGBA')

def avatar(size: int):
    base = Image.new('RGBA', (size, size), 'white')
    avail = int(size * 0.76)
    scale = min(avail / mark.width, avail / mark.height)
    m = mark.resize((round(mark.width * scale), round(mark.height * scale)), Image.Resampling.LANCZOS)
    base.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=round(size * 0.18), fill=255)
    out = Image.new('RGBA', (size, size))
    out.paste(base, (0, 0), mask)
    return out

for size in (512, 1024):
    avatar(size).save(OUT / f'social-avatar-{size}.png', optimize=True)

print('UPDATE CARD social assets generated.')
