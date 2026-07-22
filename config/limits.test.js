import { test } from "node:test";
import assert from "node:assert/strict";
import { limits, validateLimits } from "./limits.js";

test("shipped limits config passes validation", () => {
  assert.deepEqual(validateLimits(limits), limits);
});

test("maxRetries is usable in a retry loop", () => {
  let attempts = 0;
  for (let i = 0; i < limits.maxRetries; i++) attempts++;
  assert.equal(attempts, 3);
});

test("validateLimits rejects a zero timeout", () => {
  assert.throws(() => validateLimits({ ...limits, maxRetries: 3, requestTimeoutMs: 0 }), TypeError);
});
