import { notFound } from 'next/navigation';
import { dictionaries } from '@/redesign/content';
import { isLocale, LOCALES } from '@/redesign/content/locales';
import { About } from '@/redesign/components/About';
import { Cases } from '@/redesign/components/Cases';
import { Contact } from '@/redesign/components/Contact';
import { Footer } from '@/redesign/components/Footer';
import { Header } from '@/redesign/components/Header';
import { Hero } from '@/redesign/components/Hero';
import { Services } from '@/redesign/components/Services';
import { Skills } from '@/redesign/components/Skills';
import { Work } from '@/redesign/components/Work';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default function NewSitePage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const t = dictionaries[params.lang];
  return (
    <>
      <Header t={t} locale={params.lang} />
      <main id="main">
        <Hero t={t} />
        <Work t={t} />
        <Cases t={t} />
        <Services t={t} />
        <Skills t={t} />
        <About t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
