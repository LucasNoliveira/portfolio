import Image from 'next/image';
import type { Dictionary } from '../content/types';
import { SITE } from '../config';
import { EmailLink } from './EmailLink';
import { TechList } from './TechList';

export function Hero({ t }: { t: Dictionary }) {
  const { hero } = t;
  return (
    <section id="top" className="pb-12 pt-8 md:pb-20 md:pt-16">
      <div className="wrap grid gap-x-12 gap-y-8 lg:grid-cols-[1fr_auto]">
        <h1
          aria-label={SITE.name}
          className="text-[clamp(4.2rem,20vw,13rem)] font-extrabold leading-[.86] tracking-[-.04em] [font-stretch:75%]"
        >
          <span className="block overflow-hidden pb-[.06em]"><span className="name-in block">Lucas</span></span>
          <span className="block overflow-hidden pb-[.06em]"><span className="name-in block [animation-delay:.12s]">Oliveira</span></span>
        </h1>

        <figure className="relative my-2 w-[clamp(150px,42vw,270px)] -rotate-[2.5deg] justify-self-start lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-4 lg:w-[clamp(220px,24vw,300px)] lg:self-start lg:justify-self-end">
          <div aria-hidden="true" className="absolute inset-0 translate-x-[14px] translate-y-[14px] rounded-[28px] bg-brand" />
          <Image
            src="/img/new/me.jpg"
            alt={SITE.name}
            width={400}
            height={400}
            priority
            className="relative aspect-square h-auto w-full rounded-[28px] object-cover"
          />
        </figure>

        <div className="grid max-w-[38rem] gap-4 lg:col-start-1 lg:row-start-2">
          <p className="text-[clamp(1.6rem,1.1rem+2vw,2.4rem)] font-semibold leading-[1.12] tracking-tight [font-stretch:88%]">{hero.role}</p>
          <p className="max-w-[60ch] text-muted">{hero.lead}</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1 text-[.95rem] text-muted">
            <span className="font-semibold text-ink underline decoration-brand decoration-4 underline-offset-4">{hero.availability}</span>
            <span>{hero.location}</span>
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <EmailLink className="btn btn-primary">{hero.email}</EmailLink>
            {SITE.resumeUrl && <a className="btn" href={SITE.resumeUrl} download>{hero.resume}</a>}
          </div>
        </div>

        <div className="border-t border-rule pt-6 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-muted">{hero.stackTitle}</h2>
          <TechList items={hero.stack} size={26} className="[&_li]:text-base" />
        </div>
      </div>
    </section>
  );
}
