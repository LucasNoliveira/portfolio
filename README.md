# Lucas Oliveira — portfolio

Personal site and blog, in English, Portuguese, Spanish and Japanese. Next.js 14 (App Router), Tailwind, statically generated.

## Run it

```bash
pnpm install        # or npm install
pnpm dev            # http://localhost:3000
```

- `/` shows the site in the visitor's language (from `Accept-Language`); `/en`, `/pt`, `/es` and `/ja` are explicit.
- `/new/...` redirects to the same page without `/new` (the site used to live there).
- The previous version of the site is kept in the git tag `legacy-site`.

## Layout

- `src/app/[lang]` — routes: home, `/cv`, `/blog`, `/blog/[slug]`, RSS feed.
- `src/redesign` — `content/` (typed dictionaries, one per language), `components/` (one per section), `tech/` (logo catalog), `config.ts` (contact links, site URL), `seo.ts`, `blog.ts`, `github.ts`.
- `content/blog` — blog posts (see below).
- `public/cv`, `public/og` — résumé PDFs and link-preview images.

## Environment variables

| Variable | Used for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Real domain, for example `https://your-domain.dev`: canonical links, previews, sitemap and feed. Falls back to Vercel's production URL. |
| `GITHUB_STATS_TOKEN` | Optional. Enables the GitHub contribution heatmap. Server-side only: never prefix it with `NEXT_PUBLIC_`. |

## Résumé

The résumé is a page built from the same text as the site, so there is only one place to edit:

- Online: `/{en|pt|es|ja}/cv` (printable, A4 print styles).
- PDF: `public/cv/lucas-oliveira-cv-{lang}.pdf`, generated from that page.

After changing anything in `src/redesign/content/*.ts` that appears in the résumé, regenerate the PDFs:

```bash
npm run build && npx next start -p 3000        # terminal 1
npm i --no-save playwright && npx playwright install chromium   # once
npm run cv:pdf                                  # terminal 2 (optional argument: base URL)
```

`public/cv/Lucas_Oliveira_CV_FullStack_2025.pdf` is the old résumé, kept so existing links keep working.

## SEO

- Every page sets a canonical URL, `hreflang` for the four languages (plus `x-default`), Open Graph and Twitter tags; the home page adds `Person` structured data and each post `BlogPosting` (`src/redesign/seo.ts`).
- `/sitemap.xml` and `/robots.txt` are generated.
- Link previews are `public/og/og-<lang>.png` (1200×630). Regenerate them with `npm run og:images` after changing the headline in `scripts/build-og.mjs`.
- After the domain is set, submit `/sitemap.xml` in Google Search Console.

## Blog

Posts are Markdown files in `content/blog/<slug>/<lang>.md` (`en`, optionally `pt`), rendered to static pages at build time with highlighted code. Spanish and Japanese visitors see the English posts. Front matter, drafts and the slug rules are in `content/blog/README.md`. The Blog link in the header and the "Latest writing" section on the home page appear once there is at least one published post. Each language has an RSS feed at `/<lang>/blog/feed.xml`.
