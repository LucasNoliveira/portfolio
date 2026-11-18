import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dictionaries } from '@/redesign/content';
import { isLocale, LOCALES } from '@/redesign/content/locales';
import { About } from '@/redesign/components/About';
import { Cases } from '@/redesign/components/Cases';
import { Contact } from '@/redesign/components/Contact';
import { Footer } from '@/redesign/components/Footer';
import { Header } from '@/redesign/components/Header';
import { getContributions, getGithubStats } from '@/redesign/github';
import { Hero } from '@/redesign/components/Hero';
import { Recommendations } from '@/redesign/components/Recommendations';
import { Writing } from '@/redesign/components/Writing';
import { getPostsFor } from '@/redesign/blog';
import { Services } from '@/redesign/components/Services';
import { Skills } from '@/redesign/components/Skills';
import { Work } from '@/redesign/components/Work';
import { pageMetadata, personJsonLd } from '@/redesign/seo';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : 'en';
  const { meta } = dictionaries[lang];
  return pageMetadata(lang, '', meta.title, meta.description);
}

export default async function NewSitePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaries[lang];
  const posts = getPostsFor(lang);
  const [github, contributions] = await Promise.all([getGithubStats(), getContributions()]);
  return (
    <>
      <Header t={t} locale={lang} hasBlog={posts.length > 0} />
      <main id="main">
        <Hero t={t} locale={lang} />
        <Work t={t} />
        <Cases t={t} />
        <Recommendations t={t} />
        <Services t={t} />
        <Skills t={t} />
        <Writing t={t} locale={lang} posts={posts} />
        <About t={t} github={github} contributions={contributions} locale={lang} />
        <Contact t={t} locale={lang} />
      </main>
      <Footer t={t} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)) }} />
    </>
  );
}
