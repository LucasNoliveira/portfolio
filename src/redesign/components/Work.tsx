import type { Dictionary } from '../content/types';
import { Logo } from './Logo';
import { Section } from './Section';
import { TechList } from './TechList';

export function Work({ t }: { t: Dictionary }) {
  return (
    <Section id="work" title={t.work.title} intro={t.work.intro}>
      <ol>
        {t.work.jobs.map((job) => (
          <li key={job.companyId} className="grid gap-x-8 gap-y-4 border-t border-rule py-8 first:border-t-0 first:pt-0 sm:grid-cols-[200px_minmax(0,1fr)]">
            <div className="flex items-center gap-3.5 self-start">
              <Logo id={job.companyId} size={48} />
              <div>
                <h3 className="text-[1.15rem]">{job.company}</h3>
                <p className="text-sm text-muted">{job.period}</p>
              </div>
            </div>
            <div>
              <p className="mb-2.5 flex flex-wrap items-center gap-2.5 text-[1.3rem] font-semibold tracking-tight">
                {job.role}
                {job.current && <span className="rounded-full bg-brand px-2.5 py-0.5 text-[.8rem] font-bold text-on-brand">{t.ui.current}</span>}
              </p>
              <ul className="mb-4 grid gap-2 text-muted">
                {job.highlights.map((point) => (
                  <li key={point} className="relative max-w-[62ch] pl-4 before:absolute before:left-0 before:top-[.72em] before:h-0.5 before:w-2 before:bg-accent">
                    {point}
                  </li>
                ))}
              </ul>
              <TechList items={job.stack} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
