# Blog posts

One folder per post, one Markdown file per language:

```
content/blog/<slug>/en.md
content/blog/<slug>/pt.md      (optional)
```

The slug is the folder name and is shared by every language. A post only appears in the languages that have a file. Spanish and Japanese visitors see the English posts.

Each file starts with front matter:

```md
---
title: Making webhook handlers idempotent in Django
description: One or two sentences, used in lists, search results and link previews.
date: 2026-11-18
tags: [django, webhooks]
canonical: https://example.com/original   # optional: the post was first published elsewhere; search engines are pointed there and it is left out of the sitemap
draft: true          # optional: drafts show in `npm run dev` but are left out of the build
---

Write in plain Markdown. Fenced code blocks are highlighted at build time, e.g. ```python.
```

Raw HTML is not rendered. The post's `h1` comes from `title`, so start the body at `##`.
