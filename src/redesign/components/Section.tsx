import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
  /** Two columns on large screens: sticky heading on the left, content on the right. */
  split?: boolean;
  /** Set to false when the children animate themselves. */
  revealBody?: boolean;
}

export function Section({ id, title, intro, children, split = false, revealBody = true }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule py-12 md:py-16">
      <div className={`wrap ${split ? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] lg:gap-16' : ''}`}>
        <Reveal className={split ? 'max-w-[60ch] lg:sticky lg:top-24 lg:self-start' : 'mb-8 max-w-[60ch]'}>
          <header>
          <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight md:text-3xl">
            <span aria-hidden="true" className="mr-2 font-code font-normal text-accent">##</span>
            {title}
          </h2>
          {intro && <p className="mt-2 text-muted">{intro}</p>}
        </header></Reveal>
        {revealBody ? <Reveal delay={80}>{children}</Reveal> : <div>{children}</div>}
      </div>
    </section>
  );
}
