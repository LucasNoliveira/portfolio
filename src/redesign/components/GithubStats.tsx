import type { GithubStats as Stats } from '../github';
import type { Dictionary } from '../content/types';
import type { Locale } from '../content/locales';
import { HTML_LANG } from '../content/locales';
import { SITE } from '../config';

/** Small, honest strip of public GitHub numbers. Items with nothing to show are left out. */
export function GithubStats({ t, stats, locale }: { t: Dictionary; stats: Stats; locale: Locale }) {
  const labels = t.about.github;
  const month = stats.lastPush
    ? new Intl.DateTimeFormat(HTML_LANG[locale], { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(stats.lastPush))
    : null;

  const items = [
    { term: labels.repos, value: String(stats.repos), wide: false },
    stats.stars > 0 && { term: labels.stars, value: String(stats.stars), wide: false },
    stats.languages.length > 0 && { term: labels.languages, value: stats.languages.join(', '), wide: true },
    month && { term: labels.lastPush, value: month, wide: false },
  ].filter((item): item is { term: string; value: string; wide: boolean } => Boolean(item));

  return (
    <div className="border-t border-rule pt-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[.95rem] font-bold">{labels.title}</h3>
        <a href={SITE.github} rel="noopener noreferrer" className="font-code text-xs">{labels.profile}</a>
      </div>
      <dl className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {items.map(({ term, value, wide }) => (
          <div key={term} className={wide ? 'col-span-2' : undefined}>
            <dt className="text-xs text-muted">{term}</dt>
            <dd className="font-code text-sm">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
