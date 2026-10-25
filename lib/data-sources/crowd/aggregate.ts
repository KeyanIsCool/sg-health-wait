import { db } from '@/lib/db';
import type { DataSourceAdapter, NormalizedWaitRecord } from '../types';

const BUCKET_MIDPOINT: Record<string, number> = {
  LT_15: 10, B_15_30: 22, B_30_60: 45, B_60_120: 90, GT_120: 150,
};

const MIN_REPORTS = 3;
const WINDOW_MIN = 60;

export const crowdAggregateAdapter: DataSourceAdapter = {
  name: 'Crowd reports',
  kind: 'CROWD',
  async fetch(): Promise<NormalizedWaitRecord[]> {
    const since = new Date(Date.now() - WINDOW_MIN * 60 * 1000);
    const reports = await db.crowdReport.findMany({
      where: { createdAt: { gte: since }, flagged: false },
      include: { facility: true },
    });

    const grouped = new Map<string, { facilitySlug: string; minutes: number[]; latest: Date }>();
    for (const r of reports) {
      const g = grouped.get(r.facilityId) ?? { facilitySlug: r.facility.slug, minutes: [], latest: r.createdAt };
      g.minutes.push(BUCKET_MIDPOINT[r.bucket] ?? 30);
      if (r.createdAt > g.latest) g.latest = r.createdAt;
      grouped.set(r.facilityId, g);
    }

    const out: NormalizedWaitRecord[] = [];
    for (const g of grouped.values()) {
      if (g.minutes.length < MIN_REPORTS) continue;
      g.minutes.sort((a, b) => a - b);
      const median = g.minutes[Math.floor(g.minutes.length / 2)];
      out.push({
        facilitySlug: g.facilitySlug,
        waitType: 'AE',
        waitMinutes: Math.round(median),
        confidence: g.minutes.length >= 8 ? 'MEDIUM' : 'LOW',
        sourceType: 'CROWDSOURCED',
        sourceName: `Crowd (${g.minutes.length} reports)`,
        reportedAt: g.latest,
        expiresAt: new Date(Date.now() + 45 * 60 * 1000),
        collectionMethod: 'median-bucket-midpoint',
      });
    }
    return out;
  },
};
