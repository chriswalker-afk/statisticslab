# Statistics Lab — 9MA0 Statistics Story

An interactive Pearson Edexcel A level Mathematics 9MA0 Statistics Story and unified Statistics Lab.

## Hosting migration

This repository is being populated from the latest recoverable project source file, **`9MA0_Statistics_Story_Rebuilt_v27.html`**, saved on **21 September 2026**. It contains a standalone HTML application (embedded CSS and JavaScript). The previous public address is https://statisticslab.netlify.app/.

**Important:** The current Netlify deployment could not be downloaded independently for a byte-for-byte comparison. The source used for migration is a recovered project build, **not a verified export of the Netlify deployment**. Keep Netlify online and review functionality before retiring it.

The intended GitHub Pages domain is **https://statistics.mrwalkermaths.com/**. Once the site is committed, configure **Settings → Pages → Deploy from a branch → main / (root)**, then set **Custom domain** to `statistics.mrwalkermaths.com` and enable **Enforce HTTPS** when available.

## Site format

- `index.html`: fully self-contained Statistics Story and Statistics Lab application.
- `CNAME`: GitHub Pages custom-domain marker when publishing from the `main` branch.
- `tests/site-smoke.mjs`: basic static checks and parsing of embedded scripts.

All browser storage is scoped to its origin. Saved user progress on Netlify does **not** automatically appear on the new GitHub Pages origin.

## Migration policy

Do not switch links or delete the Netlify deployment until the GitHub site is functionally checked against the Netlify site.
