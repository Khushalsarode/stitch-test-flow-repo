# Stitch live testing checklist (submission)

Repo: **`Khushalsarode/stitch-test-flow-repo`** · local copy: `testrepo/`

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
| Webhook secret | Same value in `.env`, Stitch Integrations, GitHub webhook |
| Actions enabled | GitHub repo → Settings → Actions → Allow |
| Branches on remote | `main`, `release/v1.0`, `feature/checkout-v2`, `dev`, `hotfix/auth-guard` |

---

## Dashboard flows

| Button | Branch | Expect |
|--------|--------|--------|
| Main · sandbox | `main` | Fix Log + demo PR (no GitHub) |
| Main · live PR | `main` | Real PR on GitHub |
| Release · pending | `release/v1.0` | Pending → Approve in Fix Log |
| Feature · comment | `feature/checkout-v2` | Comment on PR #1 |
| Dev · auto-merge | `dev` | PR + auto-merge |
| Hotfix · live PR | `hotfix/auth-guard` | Live PR on hotfix branch |

**Feature comment:** run `npm run testrepo:open-pr` first to open PR #1.

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

- Local: `$env:JWT_SECRET="stitch-demo-secret"; npm test` in `testrepo/`
- GitHub: Actions → **Verify fix (green path)** → Run workflow
