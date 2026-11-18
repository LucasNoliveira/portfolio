import { notFound } from 'next/navigation';

/** Any address under a language that no page handles ends in the styled 404 (see ../not-found.tsx). */
export default function UnknownPath() {
  notFound();
}
