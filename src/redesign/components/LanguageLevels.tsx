import type { CSSProperties } from 'react';
import type { LanguageSkill } from '../content/types';
import { Reveal } from './Reveal';

const STEPS = [1, 2, 3, 4, 5] as const;

/** Language proficiency as a five-step meter. Exposed to assistive tech as a meter with a text value. */
export function LanguageLevels({ title, languages }: { title: string; languages: LanguageSkill[] }) {
  return (
    <Reveal>
      <h3 className="mb-3 text-[.95rem] font-bold">{title}</h3>
      <ul className="grid gap-3.5">
        {languages.map(({ name, level, score }) => (
          <li key={name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="font-medium">{name}</span>
              <span className="font-code text-xs text-muted">{level}</span>
            </div>
            <div
              role="meter"
              aria-label={name}
              aria-valuemin={1}
              aria-valuemax={5}
              aria-valuenow={score}
              aria-valuetext={level}
              className="grid grid-cols-5 gap-1"
            >
              {STEPS.map((step) => (
                <span key={step} className={`h-1.5 rounded-full ${step <= score ? 'bg-accent seg' : 'bg-rule'}`} style={{ '--i': step } as CSSProperties} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
