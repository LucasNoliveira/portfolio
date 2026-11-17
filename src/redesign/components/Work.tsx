import type { Dictionary } from '../content/types';
import { Logo } from './Logo';
import { Section } from './Section';
import { TechList } from './TechList';

export function Work({ t }: { t: Dictionary }) {
  return (
    <Section id="work" title={t.work.title} intro={t.work.intro} split>
      <ol className="divide-y divide-rule border-b border-rule lg:border-t-0">
        {t.work.jobs.map((job) => (
          <li key={job.companyId} className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex items-start gap-3">
              <Logo id={job.companyId} size={40} />
              <div>
                <h3 className="leading-tight">{job.company}</h3>
                <p className="mt-0.5 font-code text-xs text-muted">{job.period}</p>
              </div>
            </div>
            <div>
              <p className="flex flex-wrap items-center gap-2 font-medium">
                {job.role}
                {job.current && <span className="rounded border border-accent px-1.5 py-px font-code text-[.7rem] text-accent">{t.ui.current}</span>}
              </p>
              <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-[.95rem] text-muted marker:text-accent">
                {job.highlights.map((point) => <li key={point} className="max-w-[68ch]">{point}</li>)}
              </ul>
              <TechList items={job.stack} className="mt-4" />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
