/**
 * Generates one A4 PDF per language from the résumé page, into public/cv/.
 *
 *   npm run build && npx next start -p 3000     (in one terminal)
 *   npm i --no-save playwright && npx playwright install chromium     (once)
 *   node scripts/build-cv-pdf.mjs [baseUrl]     (in another)
 *
 * The résumé content lives in src/redesign/content/*.ts, so the PDFs are regenerated from the same text as the site.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = process.argv[2] ?? 'http://localhost:3000';
const LOCALES = ['en', 'pt', 'es', 'ja'];
const OUT_DIR = path.resolve('public/cv');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. Run: npm i --no-save playwright && npx playwright install chromium');
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
try {
  for (const locale of LOCALES) {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/${locale}/cv`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.cv-contact a[href^="mailto:"]'); // the e-mail address appears after hydration
    await page.emulateMedia({ media: 'print' });
    const file = path.join(OUT_DIR, `lucas-oliveira-cv-${locale}.pdf`);
    await page.pdf({ path: file, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(`wrote ${path.relative(process.cwd(), file)}`);
    await page.close();
  }
} finally {
  await browser.close();
}
