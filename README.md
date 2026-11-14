# Juan Monsalve — Resume Site

Modern bilingual resume site for [juanmonsalve.dev](https://juanmonsalve.dev), built with Astro and deployed to GitHub Pages.

## Stack

- [Astro](https://astro.build) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [JSON Resume](https://jsonresume.org) data in `data/resume.en.json` and `data/resume.es.json`
- Playwright for build-time PDF export

## Development

```bash
npm install
npm run dev
```

- English: http://localhost:4321/en/
- Spanish: http://localhost:4321/es/

## Build

```bash
npm run build
```

Builds the static site to `dist/`, generates `resume-en.pdf` and `resume-es.pdf`, and renders the 1200×630 social cards (`images/og-en.png`, `images/og-es.png`).

## Content

Edit resume content in:

- `data/resume.en.json`
- `data/resume.es.json`

Optional sections (`caseStudies`, `featuredProject`, `testimonials`, `howIWork`, `services`) and the `brands` strip render only when they have data, and appear in the navigation automatically. Set `"compact": true` on older work entries to collapse their details on screen (the PDF always shows them in full).

UI labels (section titles, buttons) live in:

- `src/i18n/ui.en.json`
- `src/i18n/ui.es.json`

## Deploy

Pushes to `main` trigger GitHub Actions (`.github/workflows/deploy.yml`) to build and publish to GitHub Pages (repo Settings → Pages → Source: GitHub Actions). Custom domain is configured via `public/CNAME`.

The build job runs on `ubuntu-24.04` instead of `ubuntu-latest` because Playwright 1.60 can't install Chromium on Ubuntu 26.04. Switch back to `ubuntu-latest` only after upgrading Playwright to a version that supports it.

`/` redirects to `/en/` with a client-side meta refresh (`src/pages/index.astro`); GitHub Pages can't send server-side redirects.

### DNS and domain (Cloudflare)

DNS for `juanmonsalve.dev` is managed in Cloudflare. GitHub Pages serves the site and issues the HTTPS certificate (Let's Encrypt, renewed automatically).

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | GitHub Pages |
| CNAME | `www` | `juanmonsalveg.github.io` | GitHub redirects `www` to the apex |
| TXT | `_github-pages-challenge-juanmonsalveg` | Value from github.com/settings/pages | Domain verification for GitHub Pages |
| TXT | `@` | `v=spf1 -all` | The domain sends no email |
| TXT | `_dmarc` | `v=DMARC1; p=reject;` | Reject email spoofing the domain |
| MX | `@` | `0 .` | Null MX: the domain receives no email |

- Keep every record on **DNS only** (grey cloud), even though Cloudflare suggests proxying. Proxying can stop GitHub from renewing the certificate, and SSL mode "Flexible" causes redirect loops. If you ever proxy, set SSL/TLS to "Full (strict)" first.
- The `www` CNAME, the verification TXT name and the repo name (`<username>.github.io`) all contain the GitHub username. Update all three if it changes again.
- Replace the SPF and null MX records only if you add a real mailbox on this domain.
