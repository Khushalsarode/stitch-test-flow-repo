# Demo flows — stitch-test-flow-repo

Step-by-step paths to exercise **every** Stitch trust level on a real GitHub repo.

## Before you start

1. Push all branches: from Stitch monorepo root run `npm run testrepo:setup`
2. GitHub repo → **Settings → Actions → General** → allow Actions
3. Stitch: `npm run db:seed`, `.env` with `GITHUB_TOKEN` + `GITHUB_WEBHOOK_SECRET`, Integrations → GitHub → Connect
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

- Expect: branch `stitch/fix-sim-*` on GitHub, PR opened, patch on `auth/token.js`
- Fix Log → **View PR** link works
- Optional: merge PR on GitHub, then run **Verify fix (green path)** workflow in Actions tab

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

- Expect: PR opened and auto-merged (personal repos usually allow this)
- If auto-merge fails: check repo **Settings → General → Allow auto-merge** and that branch protection isn't blocking

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

## Local green test (after applying fix yourself)

```powershell
cd testrepo
$env:JWT_SECRET = "stitch-demo-secret"
npm test   # should pass both tests
```

Or run GitHub Actions workflow **Verify fix (green path)**.
