import type { Metadata } from 'next';
import Link from 'next/link';
import FacilityMap from '@/components/FacilityMap';
import FilterBar from '@/components/FilterBar';
import { listFacilities } from '@/lib/queries';
import { facilityPath } from '@/lib/facility';

export const metadata: Metadata = {
  title: 'Singapore healthcare map',
  description: 'Interactive map of Singapore hospitals, A&E departments, polyclinics and GPs with estimated wait times.',
  alternates: { canonical: '/map' },
};

type SP = Record<string, string | string[] | undefined>;

export default async function MapPage({ searchParams }: { searchParams: Promise<SP> | SP }) {
  const sp = (await Promise.resolve(searchParams)) as SP;
  const type = (sp.type as string) ?? null;
  const ownership = (sp.ownership as string) ?? null;
  const items = await listFacilities({ type, ownership, limit: 200 });
  const markers = items.map(f => ({ slug: f.slug, name: f.name, type: f.type, lat: f.lat, lng: f.lng, waitMinutes: f.waitMinutes, href: facilityPath(f.type, f.slug) }));
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Map</nav>
      <h1 className="text-2xl font-bold">Singapore healthcare map</h1>
      <p className="text-sm text-ink-muted mt-1">Markers show estimated wait where available. For an accessible alternative, use the <Link href="/singapore" className="underline">facility list</Link>.</p>
      <div className="my-4"><FilterBar /></div>
      <FacilityMap facilities={markers} />
    </div>
  );
}
