import { getPostsFor, POST_LANGS } from '@/redesign/blog';
import { SITE, SITE_URL } from '@/redesign/config';
import { dictionaries } from '@/redesign/content';
import type { Locale } from '@/redesign/content/locales';

export const dynamicParams = false;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return POST_LANGS.map((lang) => ({ lang }));
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET(_request: Request, { params }: { params: { lang: string } }) {
  const lang = (POST_LANGS as readonly string[]).includes(params.lang) ? (params.lang as Locale) : 'en';
  const { blog } = dictionaries[lang];
  const posts = getPostsFor(lang);
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/${post.lang}/blog/${post.slug}`;
      return `<item><title>${escape(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate><description>${escape(post.description)}</description></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(`${SITE.name} — ${blog.title}`)}</title><link>${SITE_URL}/${lang}/blog</link><description>${escape(blog.intro)}</description><language>${lang}</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
