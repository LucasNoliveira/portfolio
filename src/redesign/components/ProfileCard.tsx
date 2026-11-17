import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { TECH } from '../tech/catalog';

/** A small `profile.json` snapshot: the same facts as the hero copy, in the form a backend engineer reads fastest. */
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

  return (
    <figure className="overflow-hidden rounded-lg border border-[#30363d] bg-[#0d1117] text-[#c9d1d9] shadow-sm">
      <figcaption className="border-b border-[#30363d] px-4 py-2.5 font-code text-xs text-[#8b949e]">profile.json</figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-code text-[.82rem] leading-7 sm:text-sm" tabIndex={0}>
        <code>
          {'{\n'}
          {rows.map(([k, v]) => (
            <span key={k}>{'  '}{key(k)}{': '}{str(v)}{',\n'}</span>
          ))}
          {'  '}{key('stack')}{': ['}
          {'\n'}
          {stack.map((id, i) => (
            <span key={id}>{'    '}{str(TECH[id].label.toLowerCase())}{i < stack.length - 1 ? ',' : ''}{'\n'}</span>
          ))}
          {'  ]\n}'}
        </code>
      </pre>
    </figure>
  );
}
