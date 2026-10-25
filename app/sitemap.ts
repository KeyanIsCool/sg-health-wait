import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { facilityPath } from '@/lib/facility';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [facilities, articles] = await Promise.all([
    db.facility.findMany({ where: { active: true }, select: { slug: true, type: true, updatedAt: true } }),
    db.article.findMany({ select: { slug: true, updatedAt: true } }),
  ]);
  const now = new Date();
  const staticPaths: MetadataRoute.Sitemap = [
    '', '/singapore', '/singapore/a-e', '/singapore/polyclinics', '/singapore/private-gp', '/singapore/private-hospitals',
    '/map', '/methodology', '/data-sources', '/privacy', '/terms', '/contact', '/articles',
  ].map(p => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: 'daily' as const, priority: p === '' ? 1 : 0.8 }));

  const facilityEntries: MetadataRoute.Sitemap = facilities.map(f => ({
    url: `${BASE}${facilityPath(f.type, f.slug)}`,
    lastModified: f.updatedAt, changeFrequency: 'hourly', priority: 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/articles/${a.slug}`, lastModified: a.updatedAt, changeFrequency: 'weekly', priority: 0.5,
  }));

  return [...staticPaths, ...facilityEntries, ...articleEntries];
}
