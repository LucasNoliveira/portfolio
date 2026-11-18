import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsFor } from '@/redesign/blog';
import { Footer } from '@/redesign/components/Footer';
import { Header } from '@/redesign/components/Header';
import { PostList } from '@/redesign/components/PostList';
import { dictionaries } from '@/redesign/content';
import { isLocale, LOCALES } from '@/redesign/content/locales';
import { pageMetadata } from '@/redesign/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const { blog } = dictionaries[lang];
  return pageMetadata(lang, '/blog', `${blog.title} — Lucas Oliveira`, blog.intro, { rss: `/new/${lang === 'pt' ? 'pt' : 'en'}/blog/feed.xml` });
}

export default function BlogIndex({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const t = dictionaries[lang];
  const posts = getPostsFor(lang);
  return (
    <>
      <Header t={t} locale={lang} hasBlog homePath={`/new/${lang}`} />
      <main id="main" className="wrap py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.blog.title}</h1>
        <p className="mt-2 max-w-[60ch] text-muted">{t.blog.intro}</p>
        {(lang === 'es' || lang === 'ja') && posts.length > 0 && <p className="mt-1 text-sm text-muted">{t.blog.englishOnly}</p>}
        <div className="mt-10 max-w-[70ch]">
          {posts.length > 0 ? <PostList posts={posts} t={t} locale={lang} /> : <p className="text-muted">{t.blog.empty}</p>}
        </div>
        <p className="mt-10 text-sm">
          <a href={`/new/${lang === 'pt' ? 'pt' : 'en'}/blog/feed.xml`}>{t.blog.feed}</a>
        </p>
      </main>
      <Footer t={t} />
    </>
  );
}
