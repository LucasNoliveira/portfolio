import { SITE } from './config';

/** Fewer public repositories than this and the strip is hidden: a thin profile would hurt more than help. */
const MIN_REPOS = 3;
const REVALIDATE_SECONDS = 60 * 60 * 24;
const TIMEOUT_MS = 5000;
const STALE_AFTER_DAYS = 365;

export interface GithubStats {
  repos: number;
  stars: number;
  languages: string[];
  /** ISO date of the most recent push, or null when it is too old to be worth showing. */
  lastPush: string | null;
}

interface RepoSummary {
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string | null;
}

/** Pure: turns the API list into the numbers we show. Forks do not count as your own work. */
export function summarize(repos: RepoSummary[], now = Date.now()): GithubStats | null {
  const own = repos.filter((repo) => !repo.fork);
  if (own.length < MIN_REPOS) return null;

  const byLanguage = new Map<string, number>();
  for (const { language } of own) if (language) byLanguage.set(language, (byLanguage.get(language) ?? 0) + 1);
  const languages = Array.from(byLanguage.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3).map(([name]) => name);

  const latest = own.map((repo) => repo.pushed_at).filter((d): d is string => !!d).sort().at(-1) ?? null;
  const fresh = latest !== null && now - Date.parse(latest) < STALE_AFTER_DAYS * 86_400_000;

  return {
    repos: own.length,
    stars: own.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    languages,
    lastPush: fresh ? latest : null,
  };
}

/** Runs on the server at build time and again once a day. Any failure just hides the strip. */
export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&type=owner`, {
      headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return Array.isArray(data) ? summarize(data as RepoSummary[]) : null;
  } catch {
    return null;
  }
}

/* ---------- Contribution heatmap ---------- */

/** Below this many contributions in the last year the heatmap is hidden. */
const MIN_CONTRIBUTIONS = 50;

export interface ContributionDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
export interface Contributions { total: number; weeks: ContributionDay[][] }

interface CalendarResponse {
  data?: { user?: { contributionsCollection?: { contributionCalendar?: {
    totalContributions: number;
    weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
  } } } | null };
}

/** Pure: buckets daily counts into five intensity levels relative to the busiest day. */
export function toContributions(calendar: NonNullable<NonNullable<NonNullable<CalendarResponse['data']>['user']>['contributionsCollection']>['contributionCalendar']): Contributions | null {
  if (!calendar || calendar.totalContributions < MIN_CONTRIBUTIONS) return null;
  const max = Math.max(1, ...calendar.weeks.flatMap((week) => week.contributionDays.map((day) => day.contributionCount)));
  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map((week) =>
      week.contributionDays.map(({ date, contributionCount: count }) => ({
        date,
        count,
        level: (count === 0 ? 0 : Math.min(4, Math.ceil((count / max) * 4))) as ContributionDay['level'],
      })),
    ),
  };
}

const CALENDAR_QUERY = `query($login: String!) {
  user(login: $login) { contributionsCollection { contributionCalendar {
    totalContributions weeks { contributionDays { date contributionCount } }
  } } }
}`;

/**
 * Needs a read-only token in GITHUB_STATS_TOKEN (server only, never sent to the browser).
 * Without it, or on any failure, the heatmap is simply not shown.
 */
export async function getContributions(): Promise<Contributions | null> {
  const token = process.env.GITHUB_STATS_TOKEN;
  if (!token) return null;
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: CALENDAR_QUERY, variables: { login: SITE.githubUser } }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const json = (await response.json()) as CalendarResponse;
    return toContributions(json.data?.user?.contributionsCollection?.contributionCalendar);
  } catch {
    return null;
  }
}
