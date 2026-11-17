import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

export function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule py-12 md:py-16">
      <div className="wrap">
        <header className="mb-8 max-w-[60ch]">
          <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight md:text-3xl">
            <span aria-hidden="true" className="mr-2 font-code font-normal text-accent">##</span>
            {title}
          </h2>
          {intro && <p className="mt-2 text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
