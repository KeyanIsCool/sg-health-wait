import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Returns whether appointment slots are currently open for a given polyclinic.
//
// This is a stub endpoint — connecting it to a real source requires integration
// with the HealthHub Appointment API (polyclinics) or an operator-provided
// webhook. Admins can override by writing a WaitTime record with
// sourceType='MANUAL' and waitType='SLOT_OPEN' (waitMinutes=1 means "open",
// 0 means "closed"); this route returns that override when present.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('facility');
  if (!slug) return NextResponse.json({ available: false, reason: 'missing_facility' });

  const facility = await db.facility.findUnique({ where: { slug }, select: { id: true } });
  if (!facility) return NextResponse.json({ available: false, reason: 'not_found' });

  const override = await db.waitTime.findFirst({
    where: { facilityId: facility.id, waitType: 'SLOT_OPEN', expiresAt: { gt: new Date() } },
    orderBy: { reportedAt: 'desc' },
  });
  if (override) {
    return NextResponse.json({ available: override.waitMinutes > 0, source: override.sourceName, since: override.reportedAt });
  }
  return NextResponse.json({ available: false, reason: 'no_integration', note: 'Live slot integration not configured for this facility.' });
}
