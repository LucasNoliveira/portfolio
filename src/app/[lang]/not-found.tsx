import type { Metadata } from 'next';
import { NotFoundView } from '@/redesign/components/NotFoundView';

export const metadata: Metadata = { title: '404 — Lucas Oliveira' };

export default function NotFound() {
  return <NotFoundView />;
}
