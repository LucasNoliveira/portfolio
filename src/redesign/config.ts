/** Public contact details and links. Single place to edit. */
export const SITE = {
  name: 'Lucas Oliveira',
  emailParts: ['lucasnoliveira126', 'gmail.com'],
  whatsapp: 'https://wa.me/5511972571089',
  linkedin: 'https://www.linkedin.com/in/lucasnevesoliveira/',
  githubUser: 'LucasNoliveira',
  github: 'https://github.com/LucasNoliveira',
  repo: 'https://github.com/LucasNoliveira/portfolio',
  calendly: 'https://calendly.com/lucasnoliveira126',
} as const;

/** Page with the résumé in HTML, and the PDF generated from it (see scripts/build-cv-pdf.mjs). */
export const cvPagePath = (locale: string) => `/new/${locale}/cv`;
export const cvPdfPath = (locale: string) => `/cv/lucas-oliveira-cv-${locale}.pdf`;

/**
 * Public origin of the site, used for canonical links, hreflang, Open Graph and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL (for example https://lucasoliveira.dev); Vercel's production URL is the fallback.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
).replace(/\/$/, '');

/**
 * The redesign stays out of search results until it replaces the old site.
 * To launch it, set NEW_SITE_INDEXABLE=1 (the same variable is read in next.config.mjs).
 */
export const NEW_SITE_INDEXABLE = process.env.NEW_SITE_INDEXABLE === '1';
