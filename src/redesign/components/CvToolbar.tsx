'use client';

import Link from 'next/link';
import type { Dictionary } from '../content/types';

interface CvToolbarProps {
  t: Dictionary;
  backHref: string;
  pdfHref: string;
}

/** Actions around the résumé. Hidden when printing and in the generated PDF. */
export function CvToolbar({ t, backHref, pdfHref }: CvToolbarProps) {
  return (
    <div className="no-print sticky top-0 z-20 border-b border-rule bg-[color-mix(in_oklab,var(--paper)_92%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-[60px] w-[min(820px,100%-2*var(--gutter))] items-center justify-between gap-3">
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm font-medium no-underline hover:underline">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          {t.cv.back}
        </Link>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => window.print()} className="hidden h-[38px] cursor-pointer rounded-full border border-rule px-4 text-sm font-medium hover:bg-paper-2 sm:inline-flex sm:items-center">
            {t.cv.print}
          </button>
          <a href={pdfHref} download className="btn btn-primary !px-4 !py-2 text-sm">{t.cv.download}</a>
        </div>
      </div>
    </div>
  );
}
