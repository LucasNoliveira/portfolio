import type { Dictionary } from '../content/types';
import { Logo } from './Logo';
import { Section } from './Section';
import { TechList } from './TechList';

export function Cases({ t }: { t: Dictionary }) {
  return (
    <Section id="cases" title={t.cases.title} intro={t.cases.intro}>
      <div className="grid gap-4 md:grid-cols-2">
        {t.cases.items.map((item) => (
          <article key={item.title} className="flex flex-col rounded-lg border border-rule bg-paper-2 p-5 md:p-6">
            <header className="flex items-center gap-2.5 text-sm text-muted">
              <Logo id={item.companyId} size={24} />
              <span>{item.company}</span>
            </header>
            <h3 className="mt-4 text-lg leading-snug">{item.title}</h3>
            <p className="mt-3 flex flex-wrap items-baseline gap-x-3">
              <strong className="font-code text-2xl font-semibold text-accent">{item.result.value}</strong>
              <span className="text-sm text-muted">{item.result.label}</span>
            </p>
            <dl className="mt-4 grid gap-3 text-[.95rem]">
              <div>
                <dt className="font-code text-xs text-muted">{t.ui.problem}</dt>
                <dd>{item.problem}</dd>
              </div>
              <div>
                <dt className="font-code text-xs text-muted">{t.ui.approach}</dt>
                <dd>{item.approach}</dd>
              </div>
            </dl>
            <TechList items={item.stack} className="mt-auto pt-5" />
          </article>
        ))}
      </div>
    </Section>
  );
}
