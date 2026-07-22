/**
 * JWT helpers for the demo auth layer (v1.2).
 * CI failure on main: JWT_SECRET is omitted from the workflow env — see auth/token.test.js.
 */
import jwt from "jsonwebtoken";

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}
