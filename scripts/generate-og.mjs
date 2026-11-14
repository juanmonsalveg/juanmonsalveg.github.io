/**
 * Post-build: renders 1200×630 social cards (og:image / twitter:image) into
 * dist/images/og-<locale>.png from the resume data and UI strings.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'dist', 'images');
const locales = ['en', 'es'];

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

async function readJson(relativePath) {
  return JSON.parse(await fs.readFile(path.join(root, relativePath), 'utf8'));
}

function renderCard({ name, label, tagline, domain, photo, lang }) {
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
    background: radial-gradient(circle at 85% 20%, #3a2a1a 0%, #2c1810 38%, #1a120c 100%);
    color: #f5e6d3;
    display: flex;
    align-items: center;
    gap: 64px;
    padding: 72px 80px;
  }
  .content { flex: 1; min-width: 0; display: flex; flex-direction: column; height: 100%; }
  .bar { width: 72px; height: 6px; border-radius: 3px; background: #f4a04a; margin-bottom: 40px; }
  h1 { font-size: 76px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; }
  .label { margin-top: 18px; font-size: 40px; font-weight: 600; color: #f4a04a; letter-spacing: -0.01em; }
  .tagline { margin-top: 28px; font-size: 30px; line-height: 1.35; color: #e3cfb6; max-width: 640px; }
  .domain { margin-top: auto; font-size: 26px; font-weight: 600; color: #f5e6d3; display: flex; align-items: center; gap: 14px; }
  .domain::before { content: ""; width: 12px; height: 12px; border-radius: 50%; background: #f4a04a; }
  .photo {
    width: 300px; height: 300px; flex-shrink: 0; border-radius: 40px; object-fit: cover;
    box-shadow: 0 0 0 8px rgba(244, 160, 74, 0.18), 0 24px 48px rgba(0, 0, 0, 0.45);
  }
</style>
</head>
<body>
  <div class="content">
    <div class="bar"></div>
    <h1>${escapeHtml(name)}</h1>
    <p class="label">${escapeHtml(label)}</p>
    <p class="tagline">${escapeHtml(tagline)}</p>
    <p class="domain">${escapeHtml(domain)}</p>
  </div>
  <img class="photo" src="${photo}" alt="" />
</body>
</html>`;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const photoBytes = await fs.readFile(path.join(root, 'public', 'images', 'profile.jpeg'));
  const photo = `data:image/jpeg;base64,${photoBytes.toString('base64')}`;

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

    for (const locale of locales) {
      const resume = await readJson(`data/resume.${locale}.json`);
      const ui = await readJson(`src/i18n/ui.${locale}.json`);
      const { name, label, url } = resume.basics;
      const domain = (url ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '');

      await page.setContent(renderCard({ name, label, tagline: ui.tagline, domain, photo, lang: locale }), {
        waitUntil: 'networkidle',
      });
      await page.evaluate(() => document.fonts.ready);

      const outFile = path.join(outDir, `og-${locale}.png`);
      await page.screenshot({ path: outFile, type: 'png' });
      console.log(`Generated ${outFile}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
