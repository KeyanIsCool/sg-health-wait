import { NextResponse } from 'next/server';
import { listFacilities } from '@/lib/queries';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get('lat') ?? '');
  const lng = parseFloat(searchParams.get('lng') ?? '');
  const type = searchParams.get('type');
  const ownership = searchParams.get('ownership');
  const openNow = searchParams.get('open') === '1';
  const maxKm = searchParams.get('maxKm') ? Number(searchParams.get('maxKm')) : null;
  const sort = (searchParams.get('sort') as 'wait' | 'distance' | 'updated' | null) ?? undefined;

  const user = Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
  const items = await listFacilities({ type, ownership, openNow, maxKm, user, sort: sort ?? undefined, limit: 100 });
  return NextResponse.json({ items });
}
