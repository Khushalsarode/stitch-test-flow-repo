# Stitch live testing checklist (submission)

Repo: **`Khushalsarode/stitch-test-flow-repo`** · local copy: `testrepo/` · **v1.2**

After editing `testrepo/`, re-push with `npm run testrepo:setup` to trigger fresh CI runs on every branch.

## Quick start (Stitch monorepo root)

```powershell
npm run testrepo:setup      # push branches to GitHub
npm run db:seed             # register repo in Acme Corp org
npm run stitch:live-check   # validate .env
npm run dev                 # UI :5173, API :3000
```

Login: **`demo@stitch.dev`** / **`demo1234`**

Full guide: **`STITCH-LIVE-SETUP.md`** (repo root) · All flows: **`DEMO-FLOWS.md`**

---

## Prerequisites

| Step | Detail |
|------|--------|
| Postgres | `npm run db:migrate && npm run db:seed` |
| GitHub PAT | `repo` + `workflow` scopes on test repo |
| Webhook secret | Optional — only for webhook mode (same value in `.env`, Stitch Integrations, GitHub webhook). The scheduled monitor needs the PAT only. |
| Actions enabled | GitHub repo → Settings → Actions → Allow |
| Branches on remote | `main`, `release/v1.0`, `feature/checkout-v2`, `dev`, `hotfix/auth-guard` |

---

## Per-branch failures (each branch breaks differently)

| Branch | Failing suite | Bug | Fix target |
|--------|---------------|-----|------------|
| `main` | `auth` | `JWT_SECRET` missing in CI env | `.github/workflows/ci.yml` |
| `dev` | `cart` | off-by-one loop in `cartTotal` | `cart/cart.js` |
| `feature/*` | `api` | missing null-check on `user.profile` | `api/user.js` |
| `release/*` | `config` | `maxRetries` is a string | `config/limits.js` |
| `hotfix/*` | `utils` | date not ISO 8601 | `utils/dates.js` |

Full matrix + log signatures: **`DEMO-FLOWS.md`**.

---

## Dashboard flows

| Button | Branch | Expect |
|--------|--------|--------|
| Main · sandbox | `main` | Fix Log + demo PR (no GitHub) |
| Main · live PR | `main` | Issue + branch + real PR on GitHub (auth fix) |
| Release · pending | `release/v1.0` | Pending → Approve in Fix Log (config fix) |
| Feature · comment | `feature/checkout-v2` | Comment on PR #1 (api fix) |
| Dev · auto-merge | `dev` | PR + auto-merge (cart fix) |
| Hotfix · live PR | `hotfix/auth-guard` | Live PR on hotfix branch (utils fix) |

**Feature comment:** run `npm run testrepo:open-pr` first to open PR #1.

---

## Scheduled monitor (no webhook)

1. Settings → **Automation & monitoring** → enable (2–5 min interval)
2. Push to any branch (or Actions → CI → Run workflow, optional `suite` input)
3. Watch the Dashboard status strip — issue/branch/PR appear on GitHub with zero clicks
4. **Check GitHub now** forces a sweep immediately

---

## Real webhook

1. `ngrok http 3000`
2. GitHub → Webhooks → `https://YOUR-TUNNEL/webhooks/github`
3. Secret = `GITHUB_WEBHOOK_SECRET`
4. Events: **Workflow runs**
5. Push to `main` or re-run **CI** workflow (Actions tab → Run workflow)

---

## After merge

1. Fix Log → **Revert this fix**
2. Status **Reverted**, Issue record updated

---

## Verify fix worked

- Local: `$env:JWT_SECRET="stitch-demo-secret"; npm test` in `testrepo/` (or `npm run test:<suite>` for one)
- GitHub: Actions → **Verify fix (green path)** → Run workflow (input `suite`: `auth|cart|api|config|utils|all`)
