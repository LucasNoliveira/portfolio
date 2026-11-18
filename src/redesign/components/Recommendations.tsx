import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { Reveal } from './Reveal';
import { Section } from './Section';

const initials = (name: string) => name.split(' ').filter(Boolean).map((part) => part[0]).slice(0, 2).join('');

export function Recommendations({ t }: { t: Dictionary }) {
  const { title, intro, viewAll, items } = t.recommendations;
  return (
    <Section id="recommendations" title={title} intro={intro} split revealBody={false}>
      <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.name} as="li" delay={(i % 2) * 100}>
            <figure className="flex h-full flex-col">
              <blockquote className="text-[.95rem] leading-relaxed">{item.quote}</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 flex-none place-items-center rounded-full bg-paper-2 font-code text-xs text-muted"
                >
                  {initials(item.name)}
                </span>
                <span className="min-w-0 text-sm">
                  <span className="block font-medium">{item.name}</span>
                  <span className="block text-muted">{item.headline}</span>
                  <span className="block text-muted">{item.relation}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <a href={`${SITE.linkedin}details/recommendations/`}>{viewAll}</a>
      </p>
    </Section>
  );
}
