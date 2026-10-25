import Link from 'next/link';
import type { Metadata } from 'next';
import { listFacilities } from '@/lib/queries';
import FacilityCard from '@/components/FacilityCard';
import FilterBar from '@/components/FilterBar';
import AdSlot from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Singapore healthcare directory — A&E, polyclinics, GPs',
  description: 'Browse every public hospital A&E, polyclinic, private hospital and GP clinic in Singapore. Wait-time estimates and directions.',
  alternates: { canonical: '/singapore' },
};

type SP = Record<string, string | string[] | undefined>;

export default async function SingaporeIndex({ searchParams }: { searchParams: Promise<SP> | SP }) {
  const sp = (await Promise.resolve(searchParams)) as SP;
  const type = (sp.type as string) ?? null;
  const ownership = (sp.ownership as string) ?? null;
  const items = await listFacilities({ type, ownership });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Singapore</nav>
      <h1 className="text-3xl font-bold">Singapore healthcare directory</h1>
      <p className="mt-2 text-ink-soft max-w-2xl">{items.length} facilities. Filter by type, ownership or availability.</p>

      <div className="mt-4"><FilterBar /></div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {items.map(f => <FacilityCard key={f.slug} f={f} />)}
      </div>

      <AdSlot type="leaderboard" />
    </div>
  );
}
