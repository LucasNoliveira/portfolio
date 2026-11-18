import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { Reveal } from './Reveal';
import { Section } from './Section';

const initials = (name: string) => name.split(' ').filter(Boolean).map((part) => part[0]).slice(0, 2).join('');

function QuoteMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 24" className="h-6 w-8 text-accent opacity-80" fill="currentColor">
      <path d="M0 24V14.4C0 6.2 4.4 1.1 12 0l1.6 3.4C9.7 4.6 8 7 7.7 10H13v14H0Zm19 0V14.4C19 6.2 23.4 1.1 31 0l1 3.4c-3.9 1.2-5.6 3.6-5.9 6.6H32v14H19Z" />
    </svg>
  );
}

export function Recommendations({ t }: { t: Dictionary }) {
  const { title, intro, viewAll, items } = t.recommendations;
  return (
    <Section id="recommendations" title={title} intro={intro} split revealBody={false}>
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.name} as="li" delay={(i % 2) * 100} className="flex">
            <figure className="flex w-full flex-col rounded-xl border border-rule bg-paper-2 p-5">
              <QuoteMark />
              <blockquote className="mt-3 flex-1 text-[.95rem] leading-relaxed">{item.quote}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-rule pt-4">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 flex-none place-items-center rounded-full bg-accent font-code text-sm font-medium text-paper"
                >
                  {initials(item.name)}
                </span>
                <span className="min-w-0 text-sm">
                  <span className="block font-semibold">{item.name}</span>
                  <span className="block text-muted">{item.headline}</span>
                  <span className="mt-0.5 block text-xs text-muted">{item.relation}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-sm">
        <a href={`${SITE.linkedin}details/recommendations/`} className="hover:underline hover:underline-offset-4">{viewAll}</a>
      </p>
    </Section>
  );
}
