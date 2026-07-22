# Changelog — stitch-test-flow-repo

## 1.2.0 — 2026-07-23

- Per-branch dynamic failure matrix (auth / cart / api / config / utils)
- CI workflow selects suite from branch name; manual `suite` input supported
- Added cart, api, config, and utils modules with deliberate bugs
- `.stitch/demo-version.json` sync marker for Stitch monitor de-dupe resets

## 1.1.0 — earlier

- Multi-branch demo repo with JWT auth failure on `main`
- GitHub Actions CI + verify-green workflow
