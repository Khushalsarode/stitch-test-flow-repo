/**
 * Shopping cart helpers for the Stitch demo shop.
 * NOTE: cartTotal has a deliberate off-by-one bug for Stitch demo v1.2 —
 * the loop reads one element past the end of the array.
 */

export function cartTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price * items[i].qty;
  }
  return total;
}

export function applyDiscount(total, percent) {
  if (percent < 0 || percent > 100) {
    throw new RangeError(`invalid discount percent: ${percent}`);
  }
  return Math.round(total * (1 - percent / 100) * 100) / 100;
}

export function itemCount(items) {
  return items.reduce((n, item) => n + item.qty, 0);
}
