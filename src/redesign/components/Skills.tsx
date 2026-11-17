import type { Dictionary } from '../content/types';
import { Section } from './Section';
import { TechList } from './TechList';

export function Skills({ t }: { t: Dictionary }) {
  return (
    <Section id="skills" title={t.skills.title}>
      <dl className="grid gap-6">
        {t.skills.groups.map((group) => (
          <div key={group.name} className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
            <dt className="font-code text-sm text-muted">{group.name}</dt>
            <dd><TechList items={group.items} size={18} /></dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
