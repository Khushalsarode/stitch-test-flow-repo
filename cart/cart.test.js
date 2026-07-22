import { test } from "node:test";
import assert from "node:assert/strict";
import { applyDiscount, cartTotal, itemCount } from "./cart.js";

const ITEMS = [
  { sku: "TEE-01", price: 2, qty: 3 },
  { sku: "MUG-07", price: 5, qty: 1 },
];

test("cartTotal sums price * qty for every line item", () => {
  assert.equal(cartTotal(ITEMS), 11);
});

test("cartTotal of an empty cart is 0", () => {
  assert.equal(cartTotal([]), 0);
});

test("applyDiscount rounds to cents", () => {
  assert.equal(applyDiscount(11, 10), 9.9);
});

test("itemCount counts quantities", () => {
  assert.equal(itemCount(ITEMS), 4);
});
