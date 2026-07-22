# stitch-test-flow-repo

Deliberate CI failure repo for **Stitch** live testing before Build Week submission.

| | |
|---|---|
| Remote | https://github.com/Khushalsarode/stitch-test-flow-repo |
| Bug | `JWT_SECRET` not set in CI → tests fail |
| Stitch fix | Guard in `auth/token.js` (demo patch applies cleanly) |

## Branches → Stitch modes

| Branch | Stitch behavior |
|--------|-----------------|
| `main` | Autopilot · sandbox + live PR |
| `release/v1.0` | Fix & propose · pending review |
| `feature/checkout-v2` | Diagnose & suggest · PR comment |
| `dev` | Autopilot · auto-merge |
| `hotfix/auth-guard` | Autopilot · urgent hotfix |

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
npm test                    # fails — expected (no JWT_SECRET)
$env:JWT_SECRET = "local-dev-secret"
npm test                    # passes
```

## GitHub Actions

| Workflow | Purpose |
|----------|---------|
| **CI** | Fails on every push/PR (deliberate) |
| **Verify fix (green path)** | Manual — run after Stitch merge to prove green |
| **Create Stitch PR labels** | Adds `stitch` + `auto-fix` labels on first push |

## Stitch setup

1. `npm run db:seed` in Stitch monorepo
2. `.env`: `GITHUB_TOKEN`, `GITHUB_WEBHOOK_SECRET`
3. Integrations → GitHub → Connect
4. Dashboard → Try the autonomous loop

**`STITCH-LIVE-SETUP.md`** in the Stitch repo root has the full checklist.
