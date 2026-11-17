import type { Dictionary } from '../content/types';
import type { Locale } from '../content/locales';
import type { GithubStats as Stats } from '../github';
import type { Contributions } from '../github';
import { ContributionHeatmap } from './ContributionHeatmap';
import { GithubStats } from './GithubStats';
import { LanguageLevels } from './LanguageLevels';
import { Section } from './Section';

export function About({ t, github, contributions, locale }: { t: Dictionary; github: Stats | null; contributions: Contributions | null; locale: Locale }) {
  return (
    <Section id="about" title={t.about.title} split>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
        <div className="grid max-w-[52ch] content-start gap-4 text-[1.12rem]">
          {t.about.paragraphs.map((text) => <p key={text}>{text}</p>)}
        </div>
        <div className="grid content-start gap-6">
          <LanguageLevels title={t.about.languagesTitle} languages={t.about.languages} />
          <dl className="grid gap-4">
            {t.about.facts.map((fact) => (
              <div key={fact.term} className="border-t border-rule pt-3.5">
                <dt className="text-[.95rem] font-bold">{fact.term}</dt>
                <dd className="text-muted">{fact.value}</dd>
              </div>
            ))}
          </dl>
          {github && <GithubStats t={t} stats={github} locale={locale} />}
        </div>
      </div>
      {contributions && <ContributionHeatmap t={t} data={contributions} locale={locale} />}
    </Section>
  );
}
