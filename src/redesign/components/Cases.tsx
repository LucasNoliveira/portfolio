import type { Dictionary } from '../content/types';
import { CaseCarousel } from './CaseCarousel';
import { CountUp } from './CountUp';
import { Logo } from './Logo';
import { Section } from './Section';
import { TechList } from './TechList';

/** Color-blocked cards alternate with plain ones, so the track has rhythm without shouting. */
const TONES = [
  { card: 'border-transparent bg-deep text-on-deep', chip: false },
  { card: 'border-rule bg-paper-2', chip: false },
  { card: 'border-transparent bg-brand text-on-brand', chip: true },
  { card: 'border-rule bg-paper-2', chip: false },
] as const;

export function Cases({ t }: { t: Dictionary }) {
  return (
    <Section id="cases" title={t.cases.title} intro={t.cases.intro} split>
      <CaseCarousel label={t.cases.title} previous={t.ui.previous} next={t.ui.next}>
        {t.cases.items.map((item, i) => {
          const tone = TONES[i % TONES.length];
          return (
            <article
              key={item.title}
              className={`flex shrink-0 basis-[82%] snap-start flex-col rounded-xl border p-5 sm:basis-[calc((100%-1rem)/2.15)] md:p-6 ${tone.card}`}
            >
              <header className="flex items-center gap-2.5 text-sm font-medium">
                <Logo id={item.companyId} size={24} />
                <span>{item.company}</span>
              </header>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
                <CountUp value={item.result.value} className="whitespace-nowrap text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-none tracking-tight" />
                <span className="text-sm opacity-80">{item.result.label}</span>
              </p>
              <h3 className="mt-4 text-lg leading-snug">{item.title}</h3>
              <p className="mt-2 text-[.95rem] opacity-90"><b>{t.ui.problem}.</b> {item.problem}</p>
              <p className="mt-2 text-[.95rem] opacity-90"><b>{t.ui.approach}.</b> {item.approach}</p>
              <TechList items={item.stack} chip={tone.chip} className="mt-auto pt-4" />
            </article>
          );
        })}
      </CaseCarousel>
    </Section>
  );
}
