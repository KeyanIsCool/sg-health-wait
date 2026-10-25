import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { allow, deviceHash } from '@/lib/abuse';

const Schema = z.object({
  facilityId: z.string().min(1),
  bucket: z.enum(['LT_15', 'B_15_30', 'B_30_60', 'B_60_120', 'GT_120']),
  arrivedMinAgo: z.number().int().min(0).max(600).optional(),
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  const ua = req.headers.get('user-agent');
  const device = deviceHash(ip, ua);
  if (!allow(device)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'invalid_input', issues: parsed.error.issues }, { status: 400 });

  const facility = await db.facility.findUnique({ where: { id: parsed.data.facilityId }, select: { id: true } });
  if (!facility) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  // Dedup within 10 minutes
  const recent = await db.crowdReport.findFirst({
    where: { facilityId: facility.id, deviceHash: device, createdAt: { gte: new Date(Date.now() - 10 * 60 * 1000) } },
  });
  if (recent) return NextResponse.json({ ok: true, deduped: true });

  await db.crowdReport.create({
    data: { facilityId: facility.id, bucket: parsed.data.bucket, arrivedMinAgo: parsed.data.arrivedMinAgo, deviceHash: device },
  });
  return NextResponse.json({ ok: true });
}
