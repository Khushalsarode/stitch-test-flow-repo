import { test } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { verifyToken } from "./token.js";

/** Fails in GitHub Actions on purpose — JWT_SECRET is omitted from the workflow env. */
test("CI must provide JWT_SECRET for auth", () => {
  assert.ok(process.env.JWT_SECRET, "JWT_SECRET must be set in CI");
});

test("verifyToken accepts a valid signed token", (t) => {
  if (!process.env.JWT_SECRET) {
    t.skip("JWT_SECRET not configured");
    return;
  }
  const token = jwt.sign({ sub: "stitch-demo" }, process.env.JWT_SECRET);
  const payload = verifyToken(token);
  assert.equal(payload.sub, "stitch-demo");
});
