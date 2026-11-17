import type { Contributions } from '../github';
import type { Dictionary } from '../content/types';
import type { Locale } from '../content/locales';
import { HTML_LANG } from '../content/locales';
import { Reveal } from './Reveal';

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_H = 14;

/** GitHub-style contribution heatmap, drawn as one scalable SVG (no layout shift, no client JavaScript). */
export function ContributionHeatmap({ t, data, locale }: { t: Dictionary; data: Contributions; locale: Locale }) {
  const lang = HTML_LANG[locale];
  const month = new Intl.DateTimeFormat(lang, { month: 'short', timeZone: 'UTC' });
  const day = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const labels = t.about.github;
  const width = data.weeks.length * STEP - GAP;
  const height = LABEL_H + 7 * STEP - GAP;

  return (
    <Reveal className="mt-10 border-t border-rule pt-6">
      <p className="mb-3 text-[.95rem]">
        <b className="font-code">{data.total}</b> <span className="text-muted">{labels.heatmap}</span>
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${data.total} ${labels.heatmap}`} className="block h-auto w-full">
        {data.weeks.map((week, x) => {
          const first = new Date(`${week[0].date}T00:00:00Z`);
          const showMonth = first.getUTCDate() <= 7 && x < data.weeks.length - 2;
          return (
            <g key={week[0].date} transform={`translate(${x * STEP} 0)`}>
              {showMonth && <text y={9} className="fill-muted font-code" fontSize={9}>{month.format(first)}</text>}
              {week.map((d, y) => (
                <rect key={d.date} y={LABEL_H + y * STEP} width={CELL} height={CELL} rx={2} className={`gh-${d.level}`}>
                  <title>{`${d.count} ${labels.heatmapDay} ${day.format(new Date(`${d.date}T00:00:00Z`))}`}</title>
                </rect>
              ))}
            </g>
          );
        })}
      </svg>
    </Reveal>
  );
}
