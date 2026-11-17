import type { Dictionary } from '../content/types';
import { Section } from './Section';

export function About({ t }: { t: Dictionary }) {
  return (
    <Section id="about" title={t.about.title} split>
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
        <div className="grid max-w-[52ch] gap-4 text-[1.12rem]">
          {t.about.paragraphs.map((text) => <p key={text}>{text}</p>)}
        </div>
        <dl className="grid content-start gap-4">
          {t.about.facts.map((fact) => (
            <div key={fact.term} className="border-t border-rule pt-3.5">
              <dt className="text-[.95rem] font-bold">{fact.term}</dt>
              <dd className="text-muted">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
