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
