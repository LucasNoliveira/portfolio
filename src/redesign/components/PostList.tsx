import type { Locale } from '../content/locales';
import type { Dictionary } from '../content/types';
import { formatPostDate, type PostMeta } from '../blog';
import { Reveal } from './Reveal';

/** Where a post lives for a visitor of this site language (Spanish and Japanese read the English posts). */
export const postHref = (post: PostMeta) => `/new/${post.lang}/blog/${post.slug}`;

export function PostMetaLine({ post, t, locale }: { post: PostMeta; t: Dictionary; locale: Locale }) {
  return (
    <p className="font-code text-xs text-muted">
      <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
      <span aria-hidden="true"> · </span>
      {t.blog.minRead.replace('{n}', String(post.minutes))}
    </p>
  );
}

export function PostList({ posts, t, locale }: { posts: PostMeta[]; t: Dictionary; locale: Locale }) {
  return (
    <ul className="grid gap-8">
      {posts.map((post, i) => (
        <Reveal key={`${post.lang}-${post.slug}`} as="li" delay={i * 60}>
          <article lang={post.lang === 'pt' ? 'pt-BR' : 'en'}>
            <PostMetaLine post={post} t={t} locale={locale} />
            <h3 className="mt-1 text-xl">
              <a href={postHref(post)} className="no-underline hover:underline">{post.title}</a>
            </h3>
            <p className="mt-1.5 max-w-[62ch] text-[.95rem] text-muted">{post.description}</p>
            {post.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-rule px-2.5 py-0.5 font-code text-xs text-muted">{tag}</li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
