import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CvDocument } from '@/redesign/components/CvDocument';
import { CvToolbar } from '@/redesign/components/CvToolbar';
import { cvPdfPath, SITE } from '@/redesign/config';
import { dictionaries } from '@/redesign/content';
import { isLocale, LOCALES } from '@/redesign/content/locales';
import { pageMetadata } from '@/redesign/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const t = dictionaries[lang];
  return pageMetadata(lang, '/cv', `${SITE.name} — ${t.hero.resume}`, t.meta.description);
}

export default function CvPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const t = dictionaries[params.lang];
  return (
    <>
      <CvToolbar t={t} backHref={`/${params.lang}`} pdfHref={cvPdfPath(params.lang)} />
      <main id="main" className="cv-page">
        <CvDocument t={t} />
      </main>
    </>
  );
}
