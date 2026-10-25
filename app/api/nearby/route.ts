import { NextResponse } from 'next/server';
import { listFacilities } from '@/lib/queries';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get('lat') ?? '');
  const lng = parseFloat(searchParams.get('lng') ?? '');
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: 'lat/lng required' }, { status: 400 });
  }
  const maxKm = Number(searchParams.get('maxKm') ?? 5);
  const type = searchParams.get('type');
  const items = await listFacilities({ user: { lat, lng }, maxKm, type, sort: 'distance', limit: 20 });
  return NextResponse.json({ items });
}
