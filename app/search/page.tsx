import Link from 'next/link';
import { db } from '@/lib/db';
import FacilityCard from '@/components/FacilityCard';
import { isOpenNow } from '@/lib/time';
import EmptyState from '@/components/EmptyState';
import SearchBar from '@/components/SearchBar';

type SP = Record<string, string | string[] | undefined>;

export const metadata = { title: 'Search Singapore healthcare facilities' };

export default async function SearchPage({ searchParams }: { searchParams: Promise<SP> | SP }) {
  const sp = (await Promise.resolve(searchParams)) as SP;
  const q = (sp.q as string | undefined)?.trim() ?? '';
  const results = q ? await db.facility.findMany({
    where: {
      active: true,
      OR: [
        { name: { contains: q } },
        { address: { contains: q } },
        { postalCode: { contains: q } },
        { slug: { contains: q.toLowerCase().replace(/\s+/g, '-') } },
      ],
    },
    include: { hours: true, waitTimes: { orderBy: { reportedAt: 'desc' }, take: 1 } },
    take: 30,
  }) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Search</nav>
      <h1 className="text-2xl font-bold">Search</h1>
      <div className="mt-4 max-w-xl"><SearchBar initial={q} /></div>

      {q && (
        <p className="mt-4 text-sm text-ink-muted">{results.length} results for &ldquo;{q}&rdquo;</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {q && results.length === 0 && <EmptyState title="No matches" hint="Try a different name, area or postal code." />}
        {results.map(r => {
          const w = r.waitTimes[0];
          return (
            <FacilityCard key={r.id} f={{
              slug: r.slug, name: r.name, type: r.type, ownership: r.ownership,
              address: r.address, twentyFourHour: r.twentyFourHour,
              isOpen: r.twentyFourHour || isOpenNow(r.hours),
              waitMinutes: w?.waitMinutes ?? null,
              waitSourceType: w?.sourceType ?? null,
              waitSourceName: w?.sourceName ?? null,
              waitReportedAt: w?.reportedAt ?? null,
              distanceKm: null,
              lat: r.latitude, lng: r.longitude,
            }} />
          );
        })}
      </div>
    </div>
  );
}
