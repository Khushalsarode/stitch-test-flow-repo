/**
 * Minimal math helper for the Stitch "simple broken flow" smoke test.
 * NOTE: deliberate bug — add() returns one too many.
 */

export function add(a, b) {
  return a + b + 1;
}
