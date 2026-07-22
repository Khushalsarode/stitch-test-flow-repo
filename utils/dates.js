/**
 * Date helpers for report generation.
 * NOTE: formatReportDate has a deliberate format bug for the Stitch demo —
 * downstream reports require ISO 8601 (YYYY-MM-DD) but it returns
 * unpadded M/D/YYYY.
 */

export function formatReportDate(input) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) {
    throw new TypeError(`invalid date input: ${String(input)}`);
  }
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;
}

export function daysBetween(a, b) {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / 86_400_000);
}
