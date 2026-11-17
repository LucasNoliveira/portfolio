import Image, { type StaticImageData } from 'next/image';
import type { CompanyId } from '../content/types';
import accenture from '../../../public/img/company_logos/accenture_logo.jpeg';
import indra from '../../../public/img/company_logos/indra_energia_logo.jpeg';
import mont from '../../../public/img/company_logos/montcapitalasset_logo.jpeg';
import vitta from '../../../public/img/company_logos/vitta_logo.jpeg';
import vocal from '../../../public/img/company_logos/vocal_silence_logo.jpg';

const LOGOS: Record<CompanyId, StaticImageData> = { vocal, accenture, indra, mont, vitta };

export function Logo({ id, size }: { id: CompanyId; size: number }) {
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
