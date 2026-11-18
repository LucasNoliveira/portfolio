import type { Locale } from '../content/locales';
import type { Dictionary } from '../content/types';
import type { PostMeta } from '../blog';
import { PostList } from './PostList';
import { Section } from './Section';

/** Home-page teaser: the latest posts. Renders nothing until there is a published post. */
export function Writing({ t, locale, posts }: { t: Dictionary; locale: Locale; posts: PostMeta[] }) {
  if (posts.length === 0) return null;
  return (
    <Section id="writing" title={t.blog.latest} intro={t.blog.latestIntro} split revealBody={false}>
      <PostList posts={posts.slice(0, 3)} t={t} locale={locale} />
      <p className="mt-8 text-sm">
        <a href={`/${locale}/blog`}>{t.blog.all}</a>
      </p>
    </Section>
  );
}
