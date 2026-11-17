import type { Dictionary } from '../content/types';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { TechList } from './TechList';

export function Services({ t }: { t: Dictionary }) {
  return (
    <Section id="services" title={t.services.title} intro={t.services.intro} split revealBody={false}>
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {t.services.items.map((item, i) => (
          <Reveal
            key={item.title}
            as="li"
            delay={(i % 2) * 100}
            className={item.featured ? 'rounded-xl bg-paper-2 p-5 sm:col-span-2 md:p-6' : ''}
          >
            <h3 className="text-lg">{item.title}</h3>
            <p className="mt-1.5 max-w-[62ch] text-[.95rem] text-muted">{item.description}</p>
            <TechList items={item.stack} className="mt-3" />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
