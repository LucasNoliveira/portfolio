import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, getTranslations, POST_LANGS } from '@/redesign/blog';
import { Footer } from '@/redesign/components/Footer';
import { Header } from '@/redesign/components/Header';
import { PostMetaLine } from '@/redesign/components/PostList';
import { dictionaries } from '@/redesign/content';
import { isLocale, LOCALE_NAMES, LOCALES, type Locale } from '@/redesign/content/locales';
import { blogPostingJsonLd, pageMetadata } from '@/redesign/seo';

/** Post pages exist only in the languages the post is written in. */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ lang: post.lang, slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const post = await getPost(slug, langParam);
  if (!post) return {};
  const lang = langParam as Locale;
  return pageMetadata(lang, `/blog/${post.slug}`, `${post.title} — Lucas Oliveira`, post.description, {
    languages: getTranslations(post.slug),
    article: { publishedTime: post.date },
    rss: `/${lang}/blog/feed.xml`,
    canonical: post.canonical,
  });
}

export default async function PostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || !(POST_LANGS as readonly string[]).includes(lang)) notFound();
  const post = await getPost(slug, lang);
  if (!post) notFound();
  const t = dictionaries[lang];
  const translations = getTranslations(post.slug);
  const others = translations.filter((l) => l !== lang);
  // Language menu: the translation if there is one, otherwise the blog index of that language.
  const languageHrefs = Object.fromEntries(
    LOCALES.map((l) => [l, translations.includes(l as 'en' | 'pt') ? `/${l}/blog/${post.slug}` : `/${l}/blog`]),
  );

  return (
    <>
      <Header t={t} locale={lang} hasBlog homePath={`/${lang}`} languageHrefs={languageHrefs} />
      <main id="main" className="wrap py-12 md:py-16">
        <article className="mx-auto max-w-[70ch]">
          <p className="text-sm"><a href={`/${lang}/blog`} className="hover:underline hover:underline-offset-4">← {t.blog.back}</a></p>
          <header className="mt-6">
            <PostMetaLine post={post} t={t} locale={lang} />
            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight md:text-4xl md:leading-10">{post.title}</h1>
            <p className="mt-3 text-lg text-muted">{post.description}</p>
            {post.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-rule px-2.5 py-0.5 font-code text-xs text-muted">{tag}</li>
                ))}
              </ul>
            )}
          </header>
          <div className="post mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
          {others.length > 0 && (
            <p className="mt-12 border-t border-rule pt-6 text-sm">
              {others.map((other) => (
                <a key={other} href={`/${other}/blog/${post.slug}`} hrefLang={other} lang={other}>
                  {t.blog.alsoIn.replace('{language}', LOCALE_NAMES[other])}
                </a>
              ))}
            </p>
          )}
        </article>
      </main>
      <Footer t={t} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd(lang, post)) }} />
    </>
  );
}
