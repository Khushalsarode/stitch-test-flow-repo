/**
 * Runtime limits for the demo service.
 * NOTE: maxRetries has a deliberate wrong type for the Stitch demo —
 * it is a string, but validateLimits (and the retry loop) require a
 * non-negative integer.
 */

export const limits = {
  maxRetries: "3",
  requestTimeoutMs: 5000,
  maxPayloadBytes: 1_048_576,
};

export function validateLimits(config) {
  const problems = [];
  if (!Number.isInteger(config.maxRetries) || config.maxRetries < 0) {
    problems.push(`maxRetries must be a non-negative integer, got ${JSON.stringify(config.maxRetries)}`);
  }
  if (!Number.isInteger(config.requestTimeoutMs) || config.requestTimeoutMs <= 0) {
    problems.push(`requestTimeoutMs must be a positive integer, got ${JSON.stringify(config.requestTimeoutMs)}`);
  }
  if (!Number.isInteger(config.maxPayloadBytes) || config.maxPayloadBytes <= 0) {
    problems.push(`maxPayloadBytes must be a positive integer, got ${JSON.stringify(config.maxPayloadBytes)}`);
  }
  if (problems.length > 0) {
    throw new TypeError(`invalid limits config: ${problems.join("; ")}`);
  }
  return config;
}
