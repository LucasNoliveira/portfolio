import type { Dictionary, Engagement } from '../content/types';
import { Logo } from './Logo';
import { Section } from './Section';
import { TechList } from './TechList';
import { Timeline } from './Timeline';

const pill = 'rounded-full border border-rule px-2.5 py-0.5 text-[.8rem] font-medium text-muted';

function EngagementItem({ engagement }: { engagement: Engagement }) {
  return (
    <li className="border-l-2 border-rule pl-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <Logo id={engagement.companyId} size={28} />
        <h4 className="font-semibold">{engagement.company}</h4>
        <span className={pill}>{engagement.kind}</span>
      </div>
      <ul className="mt-2.5 grid list-disc gap-1.5 pl-5 text-[.95rem] text-muted marker:text-accent">
        {engagement.highlights.map((point) => <li key={point} className="max-w-[68ch]">{point}</li>)}
      </ul>
      <TechList items={engagement.stack} className="mt-3" />
    </li>
  );
}

export function Work({ t }: { t: Dictionary }) {
  return (
    <Section id="work" title={t.work.title} intro={t.work.intro} split revealBody={false}>
      <Timeline>
        {t.work.jobs.map((job) => (
          <li key={job.companyId} className="group grid gap-x-8 gap-y-3 py-6 first:pt-0 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex items-start gap-3">
              {/* The logo is the node on the timeline; it lights up once its entry is reached. */}
              <span className="relative z-10 flex-none rounded-full bg-paper p-1 ring-1 ring-rule transition-shadow duration-500 group-data-[visible=true]:ring-2 group-data-[visible=true]:ring-accent">
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
                {job.kind && <span className={pill}>{job.kind}</span>}
              </p>
              {job.summary && <p className="mt-1.5 max-w-[68ch] text-[.95rem] text-muted">{job.summary}</p>}
              {job.highlights.length > 0 && (
                <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-[.95rem] text-muted marker:text-accent">
                  {job.highlights.map((point) => <li key={point} className="max-w-[68ch]">{point}</li>)}
                </ul>
              )}
              {job.engagements && (
                <ul className="mt-4 grid gap-6">
                  {job.engagements.map((engagement) => <EngagementItem key={engagement.companyId} engagement={engagement} />)}
                </ul>
              )}
              {job.stack.length > 0 && <TechList items={job.stack} className="mt-4" />}
            </div>
          </li>
        ))}
      </Timeline>
    </Section>
  );
}
