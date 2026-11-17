import type { Dictionary } from '../content/types';
import { Logo } from './Logo';
import { Section } from './Section';
import { TechList } from './TechList';

/** Visual rhythm of the bento grid: color block and column span per position. */
const LAYOUT = [
  { tone: 'border-transparent bg-deep text-on-deep', span: 'md:col-span-4' },
  { tone: 'border-rule', span: 'md:col-span-2' },
  { tone: 'border-transparent bg-brand text-on-brand', span: 'md:col-span-2', chip: true },
  { tone: 'border-rule', span: 'md:col-span-4' },
] as const;

export function Cases({ t }: { t: Dictionary }) {
  return (
    <Section id="cases" title={t.cases.title} intro={t.cases.intro} stacked>
      <div className="grid gap-4 md:grid-cols-6">
        {t.cases.items.map((item, i) => {
          const layout = LAYOUT[i % LAYOUT.length];
          const chip = 'chip' in layout;
          return (
            <article key={item.title} className={`flex flex-col gap-3 rounded-[28px] border-[1.5px] p-6 md:p-8 ${layout.tone} ${layout.span}`}>
              <header className="flex items-center gap-2.5 text-[.92rem] font-semibold">
                <Logo id={item.companyId} size={28} />
                <span>{item.company}</span>
              </header>
              <p className="my-2 flex flex-col">
                <strong className="text-[clamp(3.4rem,8vw,6rem)] font-extrabold leading-[.9] tracking-[-.04em] [font-stretch:75%]">{item.result.value}</strong>
                <span className="text-[.95rem] opacity-85">{item.result.label}</span>
              </p>
              <h3 className="text-[1.35rem] tracking-tight">{item.title}</h3>
              <p className="max-w-[56ch] opacity-90"><b>{t.ui.problem}</b> {item.problem}</p>
              <p className="max-w-[56ch] opacity-90"><b>{t.ui.approach}</b> {item.approach}</p>
              <TechList items={item.stack} chip={chip} className="mt-auto pt-3" />
            </article>
          );
        })}
      </div>
    </Section>
  );
}
