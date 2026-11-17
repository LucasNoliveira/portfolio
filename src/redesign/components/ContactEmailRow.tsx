'use client';

import { useEmail } from '../hooks/useEmail';
import { Icon } from './Icon';

interface Props { className: string; labelClass: string; hintClass: string }

export function ContactEmailRow({ className, labelClass, hintClass }: Props) {
  const email = useEmail();
  return (
    <a href={email ? `mailto:${email}` : '#contact'} className={className}>
      <Icon id="gmail" size={28} color="#EA4335" />
      <span className={labelClass}>Email</span>
      <span className={hintClass}>{email ?? ''}</span>
    </a>
  );
}
