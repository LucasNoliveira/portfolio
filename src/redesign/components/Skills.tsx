import type { Dictionary } from '../content/types';
import { TECH } from '../tech/catalog';
import { TechIcon } from './Icon';
import { Section } from './Section';

export function Skills({ t }: { t: Dictionary }) {
  return (
    <Section id="skills" title={t.skills.title} split>
      <div className="grid gap-9">
        {t.skills.groups.map((group) => (
          <div key={group.name}>
            <h3 className="mb-3.5 text-base font-semibold text-muted">{group.name}</h3>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
              {group.items.map((id) => (
                <li key={id} className="grid min-h-[112px] content-center justify-items-center gap-2.5 rounded-lg bg-paper-2 px-2 py-3 text-center text-sm font-medium">
                  <TechIcon id={id} size={40} />
                  <span>{TECH[id].label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
