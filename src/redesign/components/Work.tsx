import type { Dictionary } from '../content/types';
import { Logo } from './Logo';
import { Section } from './Section';
import { TechList } from './TechList';
import { Timeline } from './Timeline';

export function Work({ t }: { t: Dictionary }) {
  return (
    <Section id="work" title={t.work.title} intro={t.work.intro} split revealBody={false}>
      <Timeline>
        {t.work.jobs.map((job) => (
          <li key={job.companyId} className="group grid gap-x-8 gap-y-3 py-6 first:pt-0 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex items-start gap-3">
              {/* The logo is the node on the timeline; it lights up once its entry is reached. */}
              <span className="relative z-10 rounded-full bg-paper p-1 ring-1 ring-rule transition-shadow duration-500 group-data-[visible=true]:ring-2 group-data-[visible=true]:ring-accent">
                <Logo id={job.companyId} size={40} />
              </span>
              <div className="pt-1">
                <h3 className="leading-tight">{job.company}</h3>
                <p className="mt-0.5 font-code text-xs text-muted">{job.period}</p>
              </div>
            </div>
            <div>
              <p className="flex flex-wrap items-center gap-2 font-medium">
                {job.role}
                {job.current && <span className="rounded-full bg-brand px-2.5 py-0.5 text-[.8rem] font-bold text-on-brand">{t.ui.current}</span>}
              </p>
              <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-[.95rem] text-muted marker:text-accent">
                {job.highlights.map((point) => <li key={point} className="max-w-[68ch]">{point}</li>)}
              </ul>
              <TechList items={job.stack} className="mt-4" />
            </div>
          </li>
        ))}
      </Timeline>
    </Section>
  );
}
