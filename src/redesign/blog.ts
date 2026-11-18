import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { Locale } from './content/locales';

/** Posts live in content/blog/<slug>/<lang>.md. See content/blog/README.md. */
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export const POST_LANGS = ['en', 'pt'] as const;
export type PostLang = (typeof POST_LANGS)[number];

export interface PostMeta {
  slug: string;
  lang: PostLang;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  tags: string[];
  minutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

/** Spanish and Japanese visitors read the English posts. */
export const postLangFor = (locale: Locale): PostLang => (locale === 'pt' ? 'pt' : 'en');

const isPostLang = (value: string): value is PostLang => (POST_LANGS as readonly string[]).includes(value);

function readFile(slug: string, lang: PostLang): { meta: PostMeta; body: string; draft: boolean } | null {
  const file = path.join(BLOG_DIR, slug, `${lang}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  if (typeof data.title !== 'string' || typeof data.description !== 'string' || !data.date) {
    throw new Error(`${file}: front matter needs title, description and date`);
  }
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date).slice(0, 10);
  const words = content.trim().split(/\s+/).length;
  return {
    body: content,
    draft: data.draft === true,
    meta: {
      slug,
      lang,
      title: data.title,
      description: data.description,
      date,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      minutes: Math.max(1, Math.round(words / 220)),
    },
  };
}

const slugs = (): string[] =>
  fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
    : [];

/** Drafts are visible while developing and left out of production builds. */
const showDrafts = process.env.NODE_ENV !== 'production';

/** Every published post in every language, newest first. */
export function getAllPosts(): PostMeta[] {
  const posts: PostMeta[] = [];
  for (const slug of slugs()) {
    for (const lang of POST_LANGS) {
      const entry = readFile(slug, lang);
      if (entry && (showDrafts || !entry.draft)) posts.push(entry.meta);
    }
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** The posts a visitor of this site language sees. */
export const getPostsFor = (locale: Locale): PostMeta[] => {
  const lang = postLangFor(locale);
  return getAllPosts().filter((post) => post.lang === lang);
};

/** Languages in which a post exists. */
export const getTranslations = (slug: string): PostLang[] =>
  getAllPosts().filter((post) => post.slug === slug).map((post) => post.lang);

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype) // raw HTML in Markdown is not rendered
  .use(rehypeSlug)
  .use(rehypeShiki, { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false })
  .use(rehypeStringify);

export async function getPost(slug: string, lang: string): Promise<Post | null> {
  if (!isPostLang(lang) || !/^[a-z0-9-]+$/.test(slug)) return null;
  const entry = readFile(slug, lang);
  if (!entry || (entry.draft && !showDrafts)) return null;
  const html = String(await processor.process(entry.body));
  return { ...entry.meta, html };
}

export const formatPostDate = (iso: string, locale: Locale): string =>
  new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
