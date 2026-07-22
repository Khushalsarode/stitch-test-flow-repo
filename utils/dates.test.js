import { test } from "node:test";
import assert from "node:assert/strict";
import { daysBetween, formatReportDate } from "./dates.js";

test("formatReportDate returns ISO 8601 (YYYY-MM-DD)", () => {
  assert.equal(formatReportDate("2026-01-05T10:30:00Z"), "2026-01-05");
});

test("formatReportDate zero-pads month and day", () => {
  assert.equal(formatReportDate("2026-07-09T00:00:00Z"), "2026-07-09");
});

test("formatReportDate rejects garbage input", () => {
  assert.throws(() => formatReportDate("not-a-date"), TypeError);
});

test("daysBetween counts whole days", () => {
  assert.equal(daysBetween("2026-01-01", "2026-01-08"), 7);
});
