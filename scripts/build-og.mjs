/**
 * Generates the 1200x630 link-preview images (public/og/og-<lang>.png), one per language.
 *
 *   npm i --no-save playwright && npx playwright install chromium     (once)
 *   node scripts/build-og.mjs
 *
 * Edit the copy below when the headline changes. Japanese needs a CJK font installed on the machine running this.
 */
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('public/og');
const COPY = {
  en: { role: 'Backend engineer', line: 'Building AI-powered products with Python, Django, FastAPI and AWS.', where: 'São Paulo, Brazil · open to remote roles worldwide' },
  pt: { role: 'Engenheiro backend', line: 'Criando produtos com IA em Python, Django, FastAPI e AWS.', where: 'São Paulo, Brasil · vagas remotas no exterior' },
  es: { role: 'Ingeniero backend', line: 'Creando productos con IA en Python, Django, FastAPI y AWS.', where: 'São Paulo, Brasil · puestos remotos en todo el mundo' },
  ja: { role: 'バックエンドエンジニア', line: 'Python・Django・FastAPI・AWSでAIプロダクトを開発。', where: 'ブラジル・サンパウロ · リモート勤務（世界中）' },
};

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. Run: npm i --no-save playwright && npx playwright install chromium');
  process.exit(1);
}

const font = (await readFile('src/redesign/fonts/geist-sans.woff2')).toString('base64');
const photo = (await readFile('public/img/new/me.jpg')).toString('base64');

const html = ({ role, line, where }) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#f9fafb;color:#1f2937;font-family:Geist,'Noto Sans CJK JP','Noto Sans JP',sans-serif;display:flex;align-items:center;gap:72px;padding:0 88px;position:relative;overflow:hidden}
body::before{content:'';position:absolute;left:0;top:0;bottom:0;width:14px;background:#2563eb}
img{width:300px;height:300px;border-radius:50%;object-fit:cover;flex:none;border:6px solid #fff;box-shadow:0 0 0 2px #d6dae1}
h1{font-size:84px;font-weight:700;letter-spacing:-.03em;line-height:1.05}
.role{font-size:44px;font-weight:600;color:#2563eb;margin-top:14px}
.line{font-size:30px;line-height:1.4;color:#4b5563;margin-top:28px;max-width:640px}
.where{font-size:24px;color:#6b7280;margin-top:30px}
</style><img src="data:image/jpeg;base64,${photo}" alt="">
<div><h1>Lucas Oliveira</h1><p class="role">${role}</p><p class="line">${line}</p><p class="where">${where}</p></div>`;

await mkdir(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const [lang, copy] of Object.entries(COPY)) {
    await page.setContent(html(copy));
    await page.evaluate(() => document.fonts.ready);
    const file = path.join(OUT_DIR, `og-${lang}.png`);
    await page.screenshot({ path: file });
    console.log(`wrote ${path.relative(process.cwd(), file)}`);
  }
} finally {
  await browser.close();
}
