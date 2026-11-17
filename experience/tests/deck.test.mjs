import test from 'node:test';
import assert from 'node:assert/strict';
import { dragAngle, settleTurn, backIsVisible, wrapIndex } from '../src/deckPhysics.mjs';
test('manual turning follows hand distance and stays within a half turn', () => {
  assert.equal(dragAngle(125, 250), 110);
  assert.equal(dragAngle(-125, 250), -110);
  assert.equal(dragAngle(900, 250), 190);
  assert.equal(dragAngle(-900, 250), -190);
});
test('release commits a deliberate turn and restores short or cancelled movement', () => {
  assert.equal(settleTurn(0, 30), 0);
  assert.equal(settleTurn(0, 75), 180);
  assert.equal(settleTurn(0, -75), -180);
  assert.equal(settleTurn(-180, -75), -360);
  assert.equal(settleTurn(180, 0, true), 360);
});
test('both directions and repeated turns expose the right face', () => {
  assert.equal(backIsVisible(-180), true);
  assert.equal(backIsVisible(180), true);
  assert.equal(backIsVisible(360), false);
  assert.equal(backIsVisible(-360), false);
  assert.equal(backIsVisible(540), true);
});
test('deck navigation wraps at both ends', () => {
  assert.equal(wrapIndex(-1, 6), 5);
  assert.equal(wrapIndex(6, 6), 0);
  assert.equal(wrapIndex(-7, 6), 5);
});
