import { db } from './db';
import { distanceKm } from './geo';
import { isOpenNow } from './time';
import { regionOf, type Region } from './region';
import type { FacilityCardData } from '@/components/FacilityCard';

export type ListFilters = {
  type?: string | null;
  ownership?: string | null;
  openNow?: boolean;
  maxKm?: number | null;
  user?: { lat: number; lng: number } | null;
  region?: Region | null;
  sort?: 'wait' | 'distance' | 'updated';
  limit?: number;
};

export async function listFacilities(filters: ListFilters = {}): Promise<FacilityCardData[]> {
  const where: Record<string, unknown> = { active: true };
  if (filters.type) where.type = filters.type;
  if (filters.ownership) where.ownership = filters.ownership;

  const rows = await db.facility.findMany({
    where,
    include: {
      hours: true,
      waitTimes: { orderBy: { reportedAt: 'desc' }, take: 1 },
    },
    take: filters.limit ?? 100,
  });

  let items: FacilityCardData[] = rows.map(r => {
    const w = r.waitTimes[0];
    const open = r.twentyFourHour || isOpenNow(r.hours);
    const d = filters.user ? distanceKm(filters.user, { lat: r.latitude, lng: r.longitude }) : null;
    return {
      slug: r.slug, name: r.name, type: r.type, ownership: r.ownership,
      address: r.address, postalCode: r.postalCode,
      twentyFourHour: r.twentyFourHour, isOpen: open,
      waitMinutes: w?.waitMinutes ?? null,
      waitSourceType: w?.sourceType ?? null,
      waitSourceName: w?.sourceName ?? null,
      waitReportedAt: w?.reportedAt ?? null,
      distanceKm: d,
      lat: r.latitude, lng: r.longitude,
    };
  });

  if (filters.openNow) items = items.filter(f => f.isOpen);
  if (filters.maxKm != null) items = items.filter(f => f.distanceKm != null && f.distanceKm <= filters.maxKm!);
  if (filters.region) items = items.filter(f => regionOf({ lat: f.lat, lng: f.lng }) === filters.region);

  const sort = filters.sort ?? (filters.user ? 'distance' : 'wait');
  if (sort === 'distance') items.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  else if (sort === 'updated') items.sort((a, b) => (b.waitReportedAt?.getTime() ?? 0) - (a.waitReportedAt?.getTime() ?? 0));
  else items.sort((a, b) => (a.waitMinutes ?? 9999) - (b.waitMinutes ?? 9999));

  return items;
}

export async function getFacilityBySlug(slug: string) {
  return db.facility.findUnique({
    where: { slug },
    include: {
      hours: { orderBy: { dayOfWeek: 'asc' } },
      services: true,
      waitTimes: { orderBy: { reportedAt: 'desc' }, take: 5 },
    },
  });
}

export async function nearbyAlternatives(facility: { id: string; type: string; latitude: number; longitude: number }, count = 3) {
  const same = await db.facility.findMany({
    where: { active: true, type: facility.type, NOT: { id: facility.id } },
    include: { waitTimes: { orderBy: { reportedAt: 'desc' }, take: 1 }, hours: true },
    take: 20,
  });
  return same
    .map(r => ({
      slug: r.slug, name: r.name, type: r.type,
      distanceKm: distanceKm({ lat: facility.latitude, lng: facility.longitude }, { lat: r.latitude, lng: r.longitude }),
      waitMinutes: r.waitTimes[0]?.waitMinutes ?? null,
      twentyFourHour: r.twentyFourHour, isOpen: r.twentyFourHour || isOpenNow(r.hours),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, count);
}
