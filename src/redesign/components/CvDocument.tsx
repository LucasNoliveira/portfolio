import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { TECH } from '../tech/catalog';
import { CvEmail } from './CvEmail';

const labels = (ids: readonly (keyof typeof TECH)[]) => ids.map((id) => TECH[id].label).join(', ');

function Heading({ children }: { children: string }) {
  return <h2 className="cv-h2">{children}</h2>;
}

/** The résumé as a document: one column, plain text, selectable and readable by screen readers and ATS. */
export function CvDocument({ t }: { t: Dictionary }) {
  const { hero, work, skills, about, cv } = t;
  const url = (value: string) => value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <article className="cv">
      <header>
        <h1 className="cv-name">{SITE.name}</h1>
        <p className="cv-role">{hero.role}</p>
        <p className="cv-contact">
          <span>{hero.location}</span>
          <CvEmail />
          <a href={SITE.linkedin}>{url(SITE.linkedin)}</a>
          <a href={SITE.github}>{url(SITE.github)}</a>
        </p>
      </header>

      <section>
        <Heading>{cv.summary}</Heading>
        <p>{hero.lead}</p>
      </section>

      <section>
        <Heading>{cv.experience}</Heading>
        <ol className="cv-jobs">
          {work.jobs.map((job) => (
            <li key={job.companyId} className="cv-job">
              <div className="cv-job-head">
                <h3>{job.company}</h3>
                <span className="cv-period">{job.period}</span>
              </div>
              <p className="cv-job-role">{job.role}{job.kind ? ` · ${job.kind}` : ''}</p>
              {job.summary && <p className="cv-summary">{job.summary}</p>}
              {job.highlights.length > 0 && (
                <ul>
                  {job.highlights.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
              {job.stack.length > 0 && <p className="cv-stack">{labels(job.stack)}</p>}
              {job.engagements?.map((engagement) => (
                <div key={engagement.companyId} className="cv-engagement">
                  <h4>{engagement.company} <span className="cv-kind">{engagement.kind}</span></h4>
                  <ul>
                    {engagement.highlights.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <p className="cv-stack">{labels(engagement.stack)}</p>
                </div>
              ))}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <Heading>{cv.skills}</Heading>
        <dl className="cv-skills">
          {skills.groups.map((group) => (
            <div key={group.name}>
              <dt>{group.name}</dt>
              <dd>{labels(group.items)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="cv-columns">
        <section>
          <Heading>{cv.education}</Heading>
          {about.facts.map((fact) => <p key={fact.term}>{fact.value}</p>)}
        </section>
        <section>
          <Heading>{cv.languages}</Heading>
          <ul className="cv-langs">
            {about.languages.map((language) => <li key={language.name}><b>{language.name}</b> {language.level}</li>)}
          </ul>
        </section>
      </div>
    </article>
  );
}
