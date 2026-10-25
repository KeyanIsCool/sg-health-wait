import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const rows = await db.waitTime.findMany({
    where: { expiresAt: { gt: new Date() } },
    orderBy: { reportedAt: 'desc' }, take: 200,
    include: { facility: { select: { slug: true, name: true, type: true } } },
  });
  return NextResponse.json({ items: rows });
}
