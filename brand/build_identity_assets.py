#!/usr/bin/env python3
"""Rebuild UPDATE CARD source-faithful brand assets from the supplied raster reference.
Requires Pillow and NumPy. WebP is written by Pillow; ICO by Pillow.
AVIF generation is intentionally left to the deployment/image pipeline when available.
"""
from PIL import Image, ImageOps, ImageDraw
from collections import deque
import numpy as np
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / 'source/originals/update-card-logo-reference.jpeg'

for d in ['logo/horizontal','logo/icon','logo/wordmark','logo/stacked','logo/micro','web','favicon','app-icons']:
    (ROOT / d).mkdir(parents=True, exist_ok=True)

src = Image.open(SRC).convert('RGB')

def trim_white(img, threshold=245, pad=0):
    a=np.array(img.convert('RGB'))
    m=np.min(a,axis=2) < threshold
    ys,xs=np.where(m)
    if not len(xs): return img.copy()
    return img.crop((max(0,xs.min()-pad),max(0,ys.min()-pad),min(img.width,xs.max()+1+pad),min(img.height,ys.max()+1+pad)))

def transparent_background(img, white_dist=42):
    rgb=np.array(img.convert('RGB')).astype(np.int32)
    dist=np.sqrt(((rgb-255)**2).sum(axis=2))
    near=dist <= white_dist
    h,w=near.shape; seen=np.zeros((h,w),dtype=bool); q=deque()
    for x in range(w):
        for y in (0,h-1):
            if near[y,x] and not seen[y,x]: seen[y,x]=1; q.append((y,x))
    for y in range(h):
        for x in (0,w-1):
            if near[y,x] and not seen[y,x]: seen[y,x]=1; q.append((y,x))
    while q:
        y,x=q.popleft()
        for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
            yy,xx=y+dy,x+dx
            if 0<=yy<h and 0<=xx<w and near[yy,xx] and not seen[yy,xx]:
                seen[yy,xx]=1; q.append((yy,xx))
    rgba=np.dstack([rgb.clip(0,255).astype(np.uint8),np.where(seen,0,255).astype(np.uint8)])
    return Image.fromarray(rgba,'RGBA')

def save(im,path): im.save(path,optimize=True)

icon = trim_white(src.crop((75,230,1005,690)),245,4)
word = trim_white(src.crop((105,690,975,810)),245,2)
icon_t = transparent_background(icon)
word_t = transparent_background(word)
save(icon_t, ROOT/'logo/icon/update-card-uc-transparent.png')
save(word_t, ROOT/'logo/wordmark/update-card-wordmark-transparent.png')

alpha=np.array(word_t)[:,:,3]; occ=(alpha>10).sum(axis=0)
runs=[]; s=None
for i,c in enumerate(occ):
    if c<=1 and s is None: s=i
    if c>1 and s is not None: runs.append((s,i-1)); s=None
if s is not None: runs.append((s,len(occ)-1))
gap=max([r for r in runs if r[0]>word_t.width*.35 and r[1]<word_t.width*.7],key=lambda r:r[1]-r[0])
split=sum(gap)//2
update=trim_white(word_t.crop((0,0,split,word_t.height)),250)
card=trim_white(word_t.crop((split,0,word_t.width,word_t.height)),250)

ICON_H=260; LINE_H=78; GAP=44
ic=icon_t.resize((round(icon_t.width*ICON_H/icon_t.height),ICON_H),Image.Resampling.LANCZOS)
up=update.resize((round(update.width*LINE_H/update.height),LINE_H),Image.Resampling.LANCZOS)
ca=card.resize((round(card.width*LINE_H/card.height),LINE_H),Image.Resampling.LANCZOS)
text_w=max(up.width,ca.width); text_h=LINE_H*2+18; H=max(ICON_H,text_h); W=text_w+GAP+ic.width
horizontal=Image.new('RGBA',(W,H),(255,255,255,0))
horizontal.alpha_composite(ic,(W-ic.width,(H-ic.height)//2))
horizontal.alpha_composite(up,(text_w-up.width,(H-text_h)//2))
horizontal.alpha_composite(ca,(text_w-ca.width,(H-text_h)//2+LINE_H+18))
horizontal=ImageOps.expand(horizontal.crop(horizontal.getbbox()),8,fill=(255,255,255,0))
save(horizontal,ROOT/'logo/horizontal/update-card-horizontal-transparent.png')

icon_s=icon_t.resize((700,round(icon_t.height*700/icon_t.width)),Image.Resampling.LANCZOS)
L=110; us=update.resize((round(update.width*L/update.height),L),Image.Resampling.LANCZOS); cs=card.resize((round(card.width*L/card.height),L),Image.Resampling.LANCZOS)
bw=max(icon_s.width,us.width,cs.width); stacked=Image.new('RGBA',(bw,icon_s.height+42+L*2+20),(255,255,255,0))
stacked.alpha_composite(icon_s,((bw-icon_s.width)//2,0)); y=icon_s.height+42
stacked.alpha_composite(us,((bw-us.width)//2,y)); stacked.alpha_composite(cs,((bw-cs.width)//2,y+L+20))
save(stacked,ROOT/'logo/stacked/update-card-stacked-transparent.png')

u=transparent_background(trim_white(icon.crop((0,0,int(icon.width*.43),icon.height)),245,4))
save(u,ROOT/'logo/micro/update-card-u-micro-transparent.png')

def square(mark,size,pad=.12,rounded=True):
    base=Image.new('RGBA',(size,size),'white'); avail=int(size*(1-2*pad)); k=min(avail/mark.width,avail/mark.height)
    m=mark.resize((round(mark.width*k),round(mark.height*k)),Image.Resampling.LANCZOS); base.alpha_composite(m,((size-m.width)//2,(size-m.height)//2))
    if rounded:
        mask=Image.new('L',(size,size)); ImageDraw.Draw(mask).rounded_rectangle((0,0,size-1,size-1),radius=round(size*.18),fill=255)
        out=Image.new('RGBA',(size,size)); out.paste(base,(0,0),mask); return out
    return base

for s in (16,32,48): save(square(u,s,.12,False),ROOT/f'favicon/favicon-{s}x{s}.png')
Image.open(ROOT/'favicon/favicon-32x32.png').save(ROOT/'favicon/favicon.ico',sizes=[(16,16),(32,32),(48,48)])
for s,name in ((180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png'),(1024,'app-icon-1024.png')): save(square(icon_t,s,.12,True),ROOT/f'app-icons/{name}')
for s in (192,512): save(square(icon_t,s,.22,False),ROOT/f'app-icons/maskable-icon-{s}.png')

for size in (320,640,1280):
    im=horizontal.copy(); im.thumbnail((size,9999),Image.Resampling.LANCZOS); im.save(ROOT/f'web/logo-horizontal-{size}.webp','WEBP',quality=88,method=6)
for size in (256,512):
    im=icon_t.copy(); im.thumbnail((size,9999),Image.Resampling.LANCZOS); im.save(ROOT/f'web/logo-icon-{size}.webp','WEBP',quality=88,method=6)
print('UPDATE CARD brand assets rebuilt.')
