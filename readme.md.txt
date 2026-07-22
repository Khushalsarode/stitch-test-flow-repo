# stitch-test-flow-repo

Deliberate CI failure repo for **Stitch** live testing (v1.2).

| | |
|---|---|
| Remote | https://github.com/Khushalsarode/stitch-test-flow-repo |
| Version | 1.2.0 — see `CHANGELOG.md` and `.stitch/demo-version.json` |

## Per-branch failure matrix

CI picks a different broken suite per branch so Stitch gets a **distinct diagnosis + fix** on each:

| Branch | Suite | Bug | File to fix |
|--------|-------|-----|-------------|
| `main` | auth | `JWT_SECRET` missing in CI | `.github/workflows/ci.yml` |
| `dev` | cart | Off-by-one in `cartTotal` | `cart/cart.js` |
| `feature/**` | api | Missing null-check on `user.profile` | `api/user.js` |
| `release/**` | config | `maxRetries` is a string | `config/limits.js` |
| `hotfix/**` | utils | Date not ISO 8601 | `utils/dates.js` |

See **`DEMO-FLOWS.md`** for step-by-step paths (webhook, revert, auto-revert, green CI).

## Push (from Stitch monorepo)

```powershell
npm run testrepo:setup
```

Or manually from this folder:

```powershell
git push -u origin main
git push origin release/v1.0 feature/checkout-v2 dev hotfix/auth-guard
```

## Local

```powershell
npm install
npm test                    # fails — expected (multiple deliberate bugs)
npm run test:auth           # auth suite only (needs JWT_SECRET for green)
$env:JWT_SECRET = "local-dev-secret"
npm run test:auth           # passes
```

## GitHub Actions

| Workflow | Purpose |
|----------|---------|
| **CI** | Fails on every push/PR — suite selected by branch |
| **Verify fix (green path)** | Manual — run after Stitch merge to prove green |
| **Create Stitch PR labels** | Adds `stitch` + `auto-fix` labels on first push |

## Stitch setup

1. `npm run db:seed` in Stitch monorepo
2. `.env`: `GITHUB_TOKEN`, `GITHUB_WEBHOOK_SECRET` (optional for monitor-only)
3. Integrations → GitHub → Connect
4. Settings → Automation → enable monitor
5. Dashboard → Try the autonomous loop

**`STITCH-LIVE-SETUP.md`** in the Stitch repo root has the full checklist.
