# Opens PR #1 from feature/checkout-v2 → main (Diagnose & suggest live demo)
# Requires: gh CLI authenticated (gh auth login)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $RepoRoot

$head = "feature/checkout-v2"
$base = "main"

Write-Host "Checking branches exist locally..."
git show-ref --verify --quiet "refs/heads/$head"
if ($LASTEXITCODE -ne 0) { Write-Error "Branch $head missing — run npm run testrepo:setup from Stitch root first." }
git show-ref --verify --quiet "refs/heads/$base"
if ($LASTEXITCODE -ne 0) { git branch -M main 2>$null; git checkout -b main 2>$null }

Write-Host "Pushing feature branch..."
git push -u origin $head 2>&1

$existing = gh pr list --head $head --base $base --json number --jq ".[0].number" 2>$null
if ($existing) {
  Write-Host "PR already open: #$existing"
  gh pr view $existing --web
  Pop-Location
  exit 0
}

Write-Host "Creating PR $head → $base ..."
gh pr create --base $base --head $head --title "Demo: checkout v2 (Stitch feature flow)" --body "CI should fail (JWT_SECRET missing). Use this PR for Stitch Diagnose & suggest + webhook demos. See DEMO-FLOWS.md Flow D."

Pop-Location
Write-Host "Done. Wait for CI to fail, then use Dashboard → Feature · comment or webhook."
