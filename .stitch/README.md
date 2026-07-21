# Issue records (Stitch)

When **Settings → Documentation → Write Fix log to repo** is enabled, Stitch commits one markdown file per fix here:

```
.stitch/issues/{fixId}-{slug}.md
```

Each file mirrors the Fix Log card — diagnosis, diff summary, outcome — and survives even if you disconnect Stitch.

During live testing you should see new files appear after **Main · live PR** or webhook-triggered runs.
