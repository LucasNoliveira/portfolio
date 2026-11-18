import Image, { type StaticImageData } from 'next/image';
import type { CompanyId } from '../content/types';
import accenture from '../../../public/img/company_logos/accenture_logo.jpeg';
import indra from '../../../public/img/company_logos/indra_energia_logo.jpeg';
import mont from '../../../public/img/company_logos/montcapitalasset_logo.jpeg';
import vitta from '../../../public/img/company_logos/vitta_logo.jpeg';
import riobranco from '../../../public/img/company_logos/fundacao_rotarianos_sp_logo.jpeg';
import vocal from '../../../public/img/company_logos/vocal_silence_logo.jpg';

const LOGOS: Record<Exclude<CompanyId, 'independent'>, StaticImageData> = { vocal, accenture, indra, mont, vitta, riobranco };

export function Logo({ id, size }: { id: CompanyId; size: number }) {
  // Self-employed work has no company logo: a neutral briefcase in the same round frame.
  if (id === 'independent') {
    return (
      <span aria-hidden="true" className="inline-flex flex-none items-center justify-center rounded-full border border-rule bg-paper-2 text-accent" style={{ width: size, height: size }}>
        <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
        </svg>
      </span>
    );
  }
  return (
    <Image
      src={LOGOS[id]}
      alt=""
      width={size}
      height={size}
      className="flex-none rounded-full border border-rule bg-white object-cover"
      style={{ width: size, height: size }}
    />
  );
}
