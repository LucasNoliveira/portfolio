import type { Contributions, GithubStats as Stats } from '../github';
import type { Dictionary } from '../content/types';
import type { Locale } from '../content/locales';
import { HTML_LANG } from '../content/locales';
import { SITE } from '../config';
import { ContributionHeatmap } from './ContributionHeatmap';
import { Reveal } from './Reveal';

interface GithubActivityProps {
  t: Dictionary;
  stats: Stats | null;
  contributions: Contributions | null;
  locale: Locale;
}

/** One compact block: a single line of public numbers, then the heatmap. Anything without data is left out. */
export function GithubActivity({ t, stats, contributions, locale }: GithubActivityProps) {
  const labels = t.about.github;
  const month = stats?.lastPush
    ? new Intl.DateTimeFormat(HTML_LANG[locale], { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(stats.lastPush))
    : null;

  const items = [
    stats && { term: labels.repos, value: String(stats.repos) },
    stats && stats.stars > 0 && { term: labels.stars, value: String(stats.stars) },
    stats && stats.languages.length > 0 && { term: labels.languages, value: stats.languages.join(', ') },
    month && { term: labels.lastPush, value: month },
  ].filter((item): item is { term: string; value: string } => Boolean(item));

  return (
    <Reveal className="mt-10 border-t border-rule pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-[.95rem] font-bold">{labels.title}</h3>
        <a href={SITE.github} rel="noopener noreferrer" className="font-code text-xs">{labels.profile}</a>
      </div>
      {items.length > 0 && (
        <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {items.map(({ term, value }) => (
            <div key={term} className="flex items-baseline gap-1.5">
              <dt className="text-muted">{term}</dt>
              <dd className="font-code">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {contributions && <ContributionHeatmap t={t} data={contributions} locale={locale} />}
    </Reveal>
  );
}
