/**
 * User serialization for the demo API layer.
 * NOTE: userSummary has a deliberate missing null-check for Stitch demo v1.2 —
 * users created via SSO have no `profile` object yet, so reading
 * `user.profile.email` throws instead of falling back.
 */

export function userSummary(user) {
  return {
    id: user.id,
    email: user.profile.email.toLowerCase(),
    name: user.profile.displayName,
    active: user.active !== false,
  };
}

export function isElevated(user) {
  const role = user.role ?? "member";
  return role === "admin" || role === "owner";
}
