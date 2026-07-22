import { test } from "node:test";
import assert from "node:assert/strict";
import { add } from "./math.js";

test("add sums two numbers", () => {
  assert.equal(add(2, 2), 4);
});

test("add handles zero", () => {
  assert.equal(add(0, 5), 5);
});
