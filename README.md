<<<<<<< HEAD
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
# portfolio-page
>>>>>>> 22409d8af7d709ab47c95c7b70f551d0d7c0ae39

## Two versions of the site

- `/` is the original site (`src/app/(legacy)` + `src/app/components`), unchanged.
- `/new` is the redesign (`src/app/(new)` + `src/redesign`), in English, Portuguese, Spanish or Japanese. `/new` picks the language from the browser's `Accept-Language`; `/new/en`, `/new/pt`, `/new/es` and `/new/ja` are explicit. It is marked `noindex` until it replaces the old site.

Redesign layout: `content/` (typed dictionaries), `components/` (one per section), `tech/` (logo catalog), `hooks/`, `config.ts` (contact links, résumé URL).

## Résumé (new site)

The résumé is a page built from the same text as the site, so there is only one place to edit:

- Online: `/new/{en|pt|es|ja}/cv` (printable, A4 print styles).
- PDF: `public/cv/lucas-oliveira-cv-{lang}.pdf`, generated from that page.

After changing anything in `src/redesign/content/*.ts` that appears in the résumé, regenerate the PDFs:

```bash
npm run build && npx next start -p 3000        # terminal 1
npm i --no-save playwright && npx playwright install chromium   # once
npm run cv:pdf                                  # terminal 2 (optional argument: base URL)
```

The old site keeps using `public/cv/Lucas_Oliveira_CV_FullStack_2025.pdf`.

## SEO (new site)

- Every page sets a canonical URL, `hreflang` for the four languages (plus `x-default`), Open Graph and Twitter tags, and the home page adds `Person` structured data (`src/redesign/seo.ts`).
- Link previews are `public/og/og-<lang>.png` (1200×630). Regenerate them with `npm run og:images` after changing the headline in `scripts/build-og.mjs`.
- Set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.dev`) so canonical links, previews and the sitemap use the real domain.
- The redesign is `noindex` and the sitemap is empty until the launch: set `NEW_SITE_INDEXABLE=1` in the production environment, redeploy, then submit `/sitemap.xml` in Search Console.
