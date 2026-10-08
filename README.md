# UPDATE CARD

Official repository for the UPDATE CARD website.

## Production

- Primary domain: https://updatecard.net
- `www.updatecard.net` redirects permanently to the apex domain.
- Production branch: `main`
- Deployment: Vercel
- Build output: `dist/`

## Active documentation

There are two active documentation layers:

1. **Project source of truth:**  
   `docs/PROJECT_SOURCE_OF_TRUTH.md`  
   Current architecture, live status, service/image rules, QA, deployment, Git workflow, and remaining work.

2. **General web engineering standard:**  
   `docs/WEB_DESIGN_ENGINEERING_STANDARD.md`  
   Long-lived UX/UI, accessibility, performance, SEO, responsive, code-quality, media, motion, and release rules.

Brand-package notes under `docs/brand/` remain identity references.

Historical project-status documents were consolidated and removed to avoid conflicting instructions. Git history remains the archive.

## Workflow

`main → short-lived branch → PR → exact-head Site CI green → merge → verify main → verify production`

Do not resume work from historical branches or old pull requests.
