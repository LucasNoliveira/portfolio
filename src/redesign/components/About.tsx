import type { Dictionary } from '../content/types';
import { Section } from './Section';

export function About({ t }: { t: Dictionary }) {
  return (
    <Section id="about" title={t.about.title}>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
        <div className="grid max-w-[62ch] gap-4">
          {t.about.paragraphs.map((text) => <p key={text}>{text}</p>)}
        </div>
        <dl className="grid content-start gap-3 text-[.95rem]">
          {t.about.facts.map((fact) => (
            <div key={fact.term} className="border-t border-rule pt-3">
              <dt className="font-code text-xs text-muted">{fact.term}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
