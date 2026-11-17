import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { ContactEmailRow } from './ContactEmailRow';
import { Icon } from './Icon';
import { Section } from './Section';

const ROW = 'grid grid-cols-[28px_1fr] items-center gap-x-4 gap-y-1 px-0.5 py-4 no-underline sm:grid-cols-[28px_auto_1fr]';
const LABEL = 'text-[1.35rem] font-semibold tracking-tight group-hover:underline group-hover:decoration-brand group-hover:decoration-4 group-hover:underline-offset-[5px]';
const HINT = 'col-start-2 text-[.95rem] text-muted [overflow-wrap:anywhere] sm:col-start-auto sm:text-right';

export function Contact({ t }: { t: Dictionary }) {
  const links = [
    { icon: 'whatsapp', color: '#25D366', label: 'WhatsApp', hint: t.contact.whatsapp, href: SITE.whatsapp },
    { icon: 'linkedin', color: '#0A66C2', label: 'LinkedIn', hint: 'linkedin.com', href: SITE.linkedin },
    { icon: 'github', color: 'currentColor', label: 'GitHub', hint: 'LucasNoliveira', href: SITE.github },
    { icon: 'calendly', color: '#006BFF', label: 'Calendly', hint: t.contact.call, href: SITE.calendly },
  ];
  return (
    <Section id="contact" title={t.contact.title} intro={t.contact.intro}>
      <ul className="divide-y divide-rule">
        <li><ContactEmailRow className={`group ${ROW}`} labelClass={LABEL} hintClass={HINT} /></li>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={`group ${ROW}`}>
              <Icon id={link.icon} size={28} color={link.color} />
              <span className={LABEL}>{link.label}</span>
              <span className={HINT}>{link.hint}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
