import Image from 'next/image';
import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { EmailLink } from './EmailLink';
import { ProfileCard } from './ProfileCard';
import { TechList } from './TechList';

export function Hero({ t }: { t: Dictionary }) {
  const { hero } = t;
  return (
    <section id="top" className="py-12 md:py-20">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <Image
            src="/img/new/me.jpg"
            alt={SITE.name}
            width={400}
            height={400}
            priority
            className="mb-6 size-24 rounded-full border border-rule object-cover"
          />
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">{SITE.name}</h1>
          <p className="mt-3 text-xl font-medium text-muted md:text-2xl">{hero.role}</p>
          <p className="mt-5 max-w-[60ch] text-muted">{hero.lead}</p>
          <p className="mt-5 font-code text-sm text-muted">{hero.availability}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <EmailLink className="btn btn-primary">{hero.email}</EmailLink>
            <a className="btn" href="#cases">{t.nav.cases}</a>
            {SITE.resumeUrl && <a className="btn" href={SITE.resumeUrl} download>{hero.resume}</a>}
          </div>
        </div>
        <ProfileCard t={t} />

        <div className="border-t border-rule pt-6 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-muted">{hero.stackTitle}</h2>
          <TechList items={hero.stack} size={26} className="[&_li]:text-base" />
        </div>
      </div>
    </section>
  );
}
