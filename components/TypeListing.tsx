import Link from 'next/link';
import FacilityCard from '@/components/FacilityCard';
import FilterBar from '@/components/FilterBar';
import RegionBar from '@/components/RegionBar';
import UseLocationButton from '@/components/UseLocationButton';
import AdSlot from '@/components/AdSlot';
import EmptyState from '@/components/EmptyState';
import { listFacilities } from '@/lib/queries';
import type { Region } from '@/lib/region';

type SP = Record<string, string | string[] | undefined>;

export default async function TypeListing({ type, title, intro, breadcrumbLabel, showRegion, searchParams }: {
  type: string; title: string; intro: string; breadcrumbLabel: string;
  showRegion?: boolean;
  searchParams?: SP;
}) {
  const sp = searchParams ?? {};
  const region = (sp.region as Region | undefined) ?? null;
  const lat = Number(sp.lat), lng = Number(sp.lng);
  const user = Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;

  const items = await listFacilities({ type, region, user, sort: user ? 'distance' : 'wait', limit: 200 });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-2">
        <Link href="/">Home</Link> › <Link href="/singapore">Singapore</Link> › {breadcrumbLabel}
      </nav>
      <h1 className="section-title">{title}</h1>
      <p className="mt-2 text-ink-soft max-w-2xl">{intro}</p>

      <div className="mt-5 flex flex-col gap-3">
        <UseLocationButton />
        {showRegion && <RegionBar />}
        <FilterBar />
      </div>

      <div className="mt-6 flex items-end justify-between">
        <p className="text-sm text-ink-muted">{items.length} facilities{user ? ' · sorted by distance' : ''}</p>
      </div>

      {items.length === 0 ? (
        <EmptyState title="Nothing matches those filters" hint="Try clearing filters or expanding your region." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {items.map(f => <FacilityCard key={f.slug} f={f} />)}
        </div>
      )}

      <AdSlot type="leaderboard" />
    </div>
  );
}
