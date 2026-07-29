# EES Genesis v1.0.0 Production Deployment

## Release artifact

This directory is the production-ready source package for EES Genesis v1.0.0.

## Final verification

Run:

```bash
npm ci
npm run build
npm run verify:production
```

For local interaction testing:

```bash
npm run clean:start
```

## GitHub

Recommended public repository:

`EES-Genesis`

Push this package to the `main` branch. Create the public release only after
the Vercel preview deployment passes the complete interaction checklist.

Recommended tag:

`v1.0.0`

Recommended release title:

`EES Genesis v1.0.0 — Project IMHOTEP`

## Vercel

- Framework Preset: Vite
- Production Branch: main
- Build Command: npm run build
- Output Directory: dist
- Root Directory: repository root

Test the generated Vercel URL before assigning the production domain.

## Domain

Assign:

- ees-jdl.com
- www.ees-jdl.com

Use `ees-jdl.com` as primary and redirect `www` to the primary domain.

## Wix gateway

Update the EES route at jeremiahlupton.com to:

`https://ees-jdl.com`

Keep the traditional route at:

`https://portfolio.jeremiahlupton.com`
