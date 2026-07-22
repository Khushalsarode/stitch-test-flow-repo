import { test } from "node:test";
import assert from "node:assert/strict";
import { isElevated, userSummary } from "./user.js";

test("userSummary serializes a complete user", () => {
  const out = userSummary({
    id: "u-1",
    profile: { email: "Dev@Example.COM", displayName: "Dev" },
  });
  assert.deepEqual(out, { id: "u-1", email: "dev@example.com", name: "Dev", active: true });
});

test("userSummary tolerates SSO users without a profile", () => {
  const out = userSummary({ id: "u-2", active: true });
  assert.equal(out.id, "u-2");
  assert.equal(out.email, null);
  assert.equal(out.name, "Anonymous");
});

test("isElevated defaults to member", () => {
  assert.equal(isElevated({ id: "u-3" }), false);
  assert.equal(isElevated({ id: "u-4", role: "admin" }), true);
});
