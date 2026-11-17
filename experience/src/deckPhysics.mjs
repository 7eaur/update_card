/** A half turn changes the visible face; movement stays attached to the hand. */
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
export function dragAngle(distance, width) {
  return clamp(distance / Math.max(width, 1) * 220, -190, 190);
}
export function settleTurn(base, delta, tapped = false) {
  if (tapped) return base + 180;
  return Math.abs(delta) >= 42 ? base + Math.sign(delta) * 180 : base;
}
export const backIsVisible = angle => Math.abs(Math.round(angle / 180)) % 2 === 1;
export const wrapIndex = (index, count) => ((index % count) + count) % count;
