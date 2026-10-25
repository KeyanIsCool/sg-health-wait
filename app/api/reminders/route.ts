import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

// Optional server-side reminders (for email/webpush channels). The default
// polyclinic reminder is local-only in the browser — no account required.
const Schema = z.object({
  facilitySlug: z.string(),
  channel: z.enum(['EMAIL', 'WEBPUSH']),
  contact: z.string().min(1),
  minutesBefore: z.number().int().min(1).max(60).default(10),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  const facility = await db.facility.findUnique({ where: { slug: parsed.data.facilitySlug } });
  if (!facility) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  const r = await db.reminder.create({
    data: {
      facilityId: facility.id,
      channel: parsed.data.channel,
      contact: parsed.data.contact,
      minutesBefore: parsed.data.minutesBefore,
    },
  });
  return NextResponse.json({ ok: true, id: r.id });
}
