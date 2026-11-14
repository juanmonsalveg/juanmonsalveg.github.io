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

Pushes to `main` trigger GitHub Actions (`.github/workflows/deploy.yml`) to build and publish to GitHub Pages. Custom domain is configured via `public/CNAME`.
