# Demo flows — stitch-test-flow-repo

**v1.2 re-sync:** after pulling these changes, run `npm run testrepo:setup` from the Stitch monorepo root to push all branches and fire fresh CI runs (new workflow run IDs for the monitor).

Step-by-step paths to exercise **every** Stitch trust level on a real GitHub repo.

## Per-branch failure matrix (dynamic flows)

CI picks a different deliberately-broken test suite per branch, so every branch produces a **distinct diagnosis and a distinct fix** — no two PRs look the same:

| Branch | Suite | Deliberate bug | File Stitch must fix | Failure signature in logs |
|--------|-------|----------------|----------------------|---------------------------|
| `main` / `master` | `auth` | `JWT_SECRET` missing from CI env | `.github/workflows/ci.yml` (add env) | `JWT_SECRET must be set in CI` |
| `dev` / `staging` | `cart` | Off-by-one loop (`i <= items.length`) | `cart/cart.js` | `TypeError: Cannot read properties of undefined (reading 'price')` |
| `feature/**` | `api` | Missing null-check on `user.profile` | `api/user.js` | `TypeError: Cannot read properties of undefined (reading 'email')` |
| `release/**` | `config` | `maxRetries` is `"3"` (string, not int) | `config/limits.js` | `invalid limits config: maxRetries must be a non-negative integer` |
| `hotfix/**` | `utils` | Date formatted `M/D/YYYY`, not ISO 8601 | `utils/dates.js` | `AssertionError ... expected: '2026-01-05'` |

Manual dispatch of the **CI** workflow accepts a `suite` input (`auth|cart|api|config|utils|all`) to force any failure on any branch. `npm test` runs all five suites; `npm run test:<suite>` runs one.

## Before you start

1. Push all branches: from Stitch monorepo root run `npm run testrepo:setup`
2. GitHub repo → **Settings → Actions → General** → allow Actions
3. Stitch: `npm run db:seed`, `.env` with `GITHUB_TOKEN` (+ `GITHUB_WEBHOOK_SECRET` only if using webhooks), Integrations → GitHub → Connect
4. Login `demo@stitch.dev` / `demo1234`

---

## Flow A — Dashboard sandbox (no GitHub)

**Dashboard → Main · sandbox**

- Repo: `Khushalsarode/stitch-test-flow-repo`, branch `main`
- Expect: Fix Log row, SSE toast, demo PR URL
- No GitHub push required

---

## Flow B — Live PR on main

**Dashboard → Main · live PR** (GitHub must be connected)

- Expect on GitHub: a `stitch/fix-*` branch, a **tracking issue** with the diagnosis (labels `stitch`, `ci-failure`), and a PR referencing it with `Closes #N`
- Fix Log → **View PR** link works
- Optional: merge PR on GitHub, then run **Verify fix (green path)** workflow (input `suite: auth`)

---

## Flow C — Release · Fix & propose

**Dashboard → Release · pending** (`release/v1.0`)

- Expect: `Pending review` in Fix Log
- Click **Approve fix** → merges on GitHub (if connected)
- Issue record updated

---

## Flow D — Feature · Diagnose & suggest (needs open PR)

1. Open PR from `feature/checkout-v2` → `main`:

   ```powershell
   cd testrepo
   .\scripts\open-feature-pr.ps1
   ```

   Or on GitHub: **Compare & pull request** from `feature/checkout-v2`.

2. Wait for CI to fail on the PR (red check).

3. **Dashboard → Feature · comment** — uses PR #1 by default.

   Or trigger via webhook (Flow F) — Stitch comments on the open PR instead of opening a new one.

---

## Flow E — Dev · auto-merge

**Dashboard → Dev · auto-merge** (`dev` branch)

- CI on `dev` fails in the **cart** suite (off-by-one) — expect the fix PR to patch `cart/cart.js`
- Expect: PR opened and auto-merged (personal repos usually allow this)
- If immediate auto-merge is blocked by branch protection: leave it — the **automation monitor** merges the PR once its checks pass (Settings → Automation → "Auto-merge on green")

---

## Flow F — Real webhook (best submission demo)

### 1. Expose Stitch API

```powershell
# Example with ngrok (install separately)
ngrok http 3000
# Note the https URL, e.g. https://abc123.ngrok-free.app
```

### 2. GitHub webhook

Repo → **Settings → Webhooks → Add webhook**

| Field | Value |
|-------|--------|
| Payload URL | `https://YOUR-TUNNEL/webhooks/github` |
| Content type | `application/json` |
| Secret | Same as `GITHUB_WEBHOOK_SECRET` in `.env` and Stitch Integrations |
| Events | **Workflow runs** |

### 3. Trigger failure

- Push any commit to `main`, **or**
- Actions → **CI** → **Run workflow** (manual dispatch)

### 4. Watch Stitch

- Dashboard SSE feed updates
- Fix Log new entry
- Audit trail for the run

---

## Flow G — Revert after merge

1. Complete Flow B or C until fix is **Merged**
2. Fix Log → **Revert this fix** (Developer+ role)
3. Expect: **Reverted** status, revert PR or original closed, Issue record append

---

## Flow H — Repeat failure → auto-revert

1. Settings → Rollback & safety → **Auto-revert on repeat failure** (default on)
2. Merge a fix on `main`
3. Simulate or webhook another failure on `main` within 30 minutes
4. Stitch auto-reverts the previous merge before diagnosing again

---

## Flow I — Scheduled monitor (no webhook, full automation)

Best way to prove the loop runs unattended:

1. Stitch → **Settings → Automation & monitoring** → enable, interval 2–5 minutes, keep auto-fix + auto-merge-on-green + GitHub issues on
2. Push any commit to a branch (e.g. `dev`), or Actions → **CI** → Run workflow with a `suite` input — CI goes red
3. Do nothing. Within one sweep the Dashboard status strip shows **Pipeline running** with live stages, and the repo gets issue + branch + PR without any click
4. **Check GitHub now** on the Dashboard forces a sweep immediately
5. After the PR's own CI passes, the monitor merges it (Autopilot branches) and closes the tracking issue

---

## Local green test (after applying fix yourself)

```powershell
cd testrepo
$env:JWT_SECRET = "stitch-demo-secret"
npm test              # all five suites should pass once every bug is fixed
npm run test:cart     # or verify one suite at a time
```

Or run GitHub Actions workflow **Verify fix (green path)** (input `suite`).
