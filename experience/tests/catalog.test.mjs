import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { services, products, normalize, findProducts, orderUrl, routeProduct } from '../src/catalog.mjs';

test('all catalog entries have distinct routes and existing local artwork', () => {
  assert.equal(services.length, 8);
  assert.ok(products.length >= 60);
  assert.equal(new Set(products.map(p => p.category + '/' + p.slug)).size, products.length);
  for (const p of products) {
    assert.ok(existsSync(new URL('../../src/assets' + p.imageUrl, import.meta.url)), p.imageUrl);
    assert.equal(routeProduct('#service/' + p.category + '/' + p.slug)?.title, p.title);
  }
});
test('Arabic search handles hamza, diacritics and multiple words', () => {
  assert.equal(normalize('إِشْتِرَاك'), normalize('اشتراك'));
  assert.ok(findProducts('بُبْجِي').some(p => p.slug === 'pubg-mobile'));
  assert.ok(findProducts('PUBG   Mobile', 'games').some(p => p.slug === 'pubg-mobile'));
  assert.ok(findProducts('آبل').some(p => p.slug === 'apple-itunes'));
  assert.ok(findProducts('نتفلكس', 'games').length === 0);
});
test('WhatsApp receives exact encoded details and wholesale selection', () => {
  const product = products.find(p => p.slug === 'playstation');
  const url = new URL(orderUrl({product, region:'  السعودية  ', details:'100 & 200 + بطاقة', audience:'wholesale'}));
  assert.equal(url.origin + url.pathname, 'https://wa.me/967770498884');
  const text = url.searchParams.get('text');
  assert.ok(text.includes('السعودية'));
  assert.ok(text.includes('100 & 200 + بطاقة'));
  assert.ok(text.includes('جملة / توزيع'));
  assert.ok(!text.includes('  السعودية  '));
});
test('unknown routes fail safely and custom requests remain available', () => {
  assert.equal(routeProduct('#service/missing/missing'), null);
  assert.equal(routeProduct('#faq'), null);
  assert.ok(new URL(orderUrl({})).searchParams.get('text').includes('خدمة حسب الطلب'));
});
