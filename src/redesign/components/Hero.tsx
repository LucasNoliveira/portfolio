import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { AvailabilityBadge } from './AvailabilityBadge';
import { ContactMenu } from './ContactMenu';
import { ProfileCard } from './ProfileCard';
import { TechList } from './TechList';

export function Hero({ t }: { t: Dictionary }) {
  const { hero } = t;
  return (
    <section id="top" className="py-12 md:py-20">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <div className="rise mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Image
              src="/img/new/me.jpg"
              alt={SITE.name}
              width={400}
              height={400}
              priority
              className="size-24 rounded-full border border-rule object-cover"
            />
            <AvailabilityBadge>{hero.availability}</AvailabilityBadge>
          </div>
          <h1 style={{ '--i': 1 } as CSSProperties} className="rise text-4xl font-semibold tracking-tight md:text-6xl">{SITE.name}</h1>
          <p style={{ '--i': 2 } as CSSProperties} className="rise mt-3 text-xl font-medium text-muted md:text-2xl">{hero.role}</p>
          <p style={{ '--i': 3 } as CSSProperties} className="rise mt-5 max-w-[60ch] text-muted">{hero.lead}</p>
          <div style={{ '--i': 4 } as CSSProperties} className="rise mt-6 flex flex-wrap gap-3">
            <ContactMenu t={t} />
            <a className="btn" href="#cases">{t.nav.cases}</a>
            {SITE.resumeUrl && <a className="btn" href={SITE.resumeUrl} download>{hero.resume}</a>}
          </div>
        </div>
        <div style={{ '--i': 3 } as CSSProperties} className="rise min-w-0"><ProfileCard t={t} /></div>

        <div className="border-t border-rule pt-6 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-muted">{hero.stackTitle}</h2>
          <TechList items={hero.stack} size={26} className="[&_li]:text-base" />
        </div>
      </div>
    </section>
  );
}
