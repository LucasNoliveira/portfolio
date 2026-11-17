import type { Dictionary } from '../content/types';
import { Logo } from './Logo';
import { Section } from './Section';
import { TechList } from './TechList';

/** Two color-blocked cards on a diagonal, the rest plain, so the grid has rhythm without shouting. */
const TONES = [
  { card: 'border-transparent bg-deep text-on-deep', chip: false },
  { card: 'border-rule bg-paper-2', chip: false },
  { card: 'border-rule bg-paper-2', chip: false },
  { card: 'border-transparent bg-brand text-on-brand', chip: true },
] as const;

export function Cases({ t }: { t: Dictionary }) {
  return (
    <Section id="cases" title={t.cases.title} intro={t.cases.intro} split>
      <div className="grid gap-4 sm:grid-cols-2">
        {t.cases.items.map((item, i) => {
          const tone = TONES[i % TONES.length];
          return (
            <article key={item.title} className={`flex flex-col rounded-xl border p-5 md:p-6 ${tone.card}`}>
              <header className="flex items-center gap-2.5 text-sm font-medium">
                <Logo id={item.companyId} size={24} />
                <span>{item.company}</span>
              </header>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
                <strong className="whitespace-nowrap text-[clamp(2rem,3.2vw,2.75rem)] font-bold leading-none tracking-tight">{item.result.value}</strong>
                <span className="text-sm opacity-80">{item.result.label}</span>
              </p>
              <h3 className="mt-4 text-lg leading-snug">{item.title}</h3>
              <p className="mt-2 text-[.95rem] opacity-90"><b>{t.ui.problem}.</b> {item.problem}</p>
              <p className="mt-2 text-[.95rem] opacity-90"><b>{t.ui.approach}.</b> {item.approach}</p>
              <TechList items={item.stack} chip={tone.chip} className="mt-auto pt-4" />
            </article>
          );
        })}
      </div>
    </Section>
  );
}
