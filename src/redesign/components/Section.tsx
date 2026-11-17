import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** Heading above the content instead of in a left column (for wide layouts such as the case grid). */
  stacked?: boolean;
}

export function Section({ id, title, intro, children, stacked = false }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule py-14 md:py-24">
      <div className={`wrap grid gap-8 ${stacked ? '' : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] lg:gap-16'}`}>
        <div className={stacked ? '' : 'lg:sticky lg:top-24 lg:self-start'}>
          <h2 id={`${id}-title`} className="text-[clamp(2.1rem,1.3rem+3vw,3.6rem)] font-bold tracking-tight [font-stretch:80%]">
            {title}
          </h2>
          {intro && <p className={`mt-4 text-muted ${stacked ? 'max-w-[60ch]' : 'max-w-[34ch]'}`}>{intro}</p>}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
