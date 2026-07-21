## Feature branch demo PR

Use this template when opening **PR #1** from `feature/checkout-v2` → `main` so Stitch's **Diagnose & suggest** flow can comment on a real pull request.

### Checklist

- [ ] CI failed on this PR (expected — `JWT_SECRET` missing)
- [ ] Stitch webhook received the `workflow_run` event
- [ ] Fix Log shows **comment posted** (not a new PR)

### What Stitch should suggest

Guard `JWT_SECRET` in `auth/token.js` before calling `jwt.verify()`.
