import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import type { CSSProperties, ReactNode } from 'react';
import { TECH } from '../tech/catalog';

/** A small `profile.json` snapshot: the same facts as the hero copy, in the form a backend engineer reads fastest. */
/** Typing effect on first load. Set to false (or delete the "Typing effect" block in globals.css) to remove it. */
const TYPING = true;
const MS_PER_CHAR = 14;
const START_DELAY = 700;

/** Width in monospace cells: CJK characters take two. */
const cells = (text: string) => Array.from(text).reduce((sum, char) => sum + ((char.codePointAt(0) ?? 0) > 0x2e80 ? 2 : 1), 0);

interface Line { text: string; node: ReactNode }

export function ProfileCard({ t }: { t: Dictionary }) {
  const { card, stack } = t.hero;
  const key = (name: string) => <span className="text-[#79c0ff]">&quot;{name}&quot;</span>;
  const str = (value: string) => <span className="text-[#a5d6ff]">&quot;{value}&quot;</span>;
  const rows: [string, string][] = [
    ['name', SITE.name],
    ['role', card.role],
    ['location', card.location],
    ['timezone', card.timezone],
    ['open_to', card.openTo],
  ];

  // Each line keeps its plain text so the typing animation knows how many characters (ch) it spans.
  const lines: Line[] = [
    { text: '{', node: '{' },
    ...rows.map(([k, v]): Line => ({ text: `  "${k}": "${v}",`, node: <>{'  '}{key(k)}{': '}{str(v)},</> })),
    { text: '  "stack": [', node: <>{'  '}{key('stack')}{': ['}</> },
    ...stack.map((id, i): Line => {
      const label = TECH[id].label.toLowerCase();
      const comma = i < stack.length - 1 ? ',' : '';
      return { text: `    "${label}"${comma}`, node: <>{'    '}{str(label)}{comma}</> };
    }),
    { text: '  ]', node: '  ]' },
    { text: '}', node: '}' },
  ];

  let start = START_DELAY;
  return (
    <figure className="overflow-hidden rounded-lg border border-[#30363d] bg-[#0d1117] text-[#c9d1d9] shadow-sm">
      <figcaption className="border-b border-[#30363d] px-4 py-2.5 font-code text-xs text-[#8b949e]">profile.json</figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-code text-[.82rem] leading-7 sm:text-sm" tabIndex={0}>
        <code className={TYPING ? 'typing' : undefined}>
          {lines.map(({ text, node }, i) => {
            const style = { '--n': cells(text), '--start': `${start}ms`, '--dur': `${cells(text) * MS_PER_CHAR}ms` } as CSSProperties;
            start += cells(text) * MS_PER_CHAR;
            return <span key={i} className="line" style={style}>{node}</span>;
          })}
        </code>
      </pre>
    </figure>
  );
}
