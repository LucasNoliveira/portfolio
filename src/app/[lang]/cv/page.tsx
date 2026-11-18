import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CvDocument } from '@/redesign/components/CvDocument';
import { CvToolbar } from '@/redesign/components/CvToolbar';
import { cvPdfPath, SITE } from '@/redesign/config';
import { dictionaries } from '@/redesign/content';
import { isLocale, LOCALES } from '@/redesign/content/locales';
import { pageMetadata } from '@/redesign/seo';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: langParam } = await params;
  const lang = isLocale(langParam) ? langParam : 'en';
  const t = dictionaries[lang];
  return pageMetadata(lang, '/cv', `${SITE.name} — ${t.hero.resume}`, t.meta.description);
}

export default async function CvPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaries[lang];
  return (
    <>
      <CvToolbar t={t} backHref={`/${lang}`} pdfHref={cvPdfPath(lang)} />
      <main id="main" className="cv-page">
        <CvDocument t={t} />
      </main>
    </>
  );
}
