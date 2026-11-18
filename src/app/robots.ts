import type { MetadataRoute } from 'next';
import { NEW_SITE_INDEXABLE, SITE_URL } from '@/redesign/config';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, ...(NEW_SITE_INDEXABLE ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}) };
}
