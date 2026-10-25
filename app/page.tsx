import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import UseLocationButton from '@/components/UseLocationButton';
import FacilityCard from '@/components/FacilityCard';
import DecisionHelper from '@/components/DecisionHelper';
import AdSlot from '@/components/AdSlot';
import EmptyState from '@/components/EmptyState';
import { listFacilities } from '@/lib/queries';

export const revalidate = 60;

type SP = Record<string, string | string[] | undefined>;

function toUser(sp: SP) {
  const lat = Number(sp.lat), lng = Number(sp.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  return null;
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SP> | SP }) {
  const sp = (await Promise.resolve(searchParams)) as SP;
  const user = toUser(sp);
  const type = (sp.type as string) ?? null;
  const ownership = (sp.ownership as string) ?? null;
  const openNow = sp.open === '1';
  const sort = ((sp.sort as string) ?? (user ? 'distance' : 'wait')) as 'wait' | 'distance' | 'updated';

  const nearby = user ? await listFacilities({ user, maxKm: 10, limit: 8, sort: 'distance', type, ownership, openNow }) : [];
  const shortest = await listFacilities({ sort: 'wait', limit: 6, type: type ?? 'AE', ownership, openNow });

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-12 md:pt-16 md:pb-20">
          <div className="flex items-center gap-2 text-xs text-ink-muted mb-4">
            <span className="pill bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">● Live</span>
            <span>Updated continuously · 20+ public hospitals, polyclinics & GPs</span>
          </div>
          <h1 className="hero-title text-ink">
            Find the shortest healthcare wait, <span className="text-brand">near you</span>.
          </h1>
          <p className="mt-4 text-lg text-ink-soft max-w-2xl">
            Compare Singapore A&E departments, polyclinics and GPs — with honest estimates, sources shown.{' '}
            <Link href="/methodology" className="underline text-ink hover:text-brand">How we calculate this</Link>.
          </p>

          <div className="mt-6 max-w-2xl">
            <SearchBar />
          </div>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <UseLocationButton />
            <Link href="/singapore" className="btn btn-ghost">Browse all facilities →</Link>
          </div>
          <div className="mt-6">
            <FilterBar />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <AdSlot type="leaderboard" />

        {user && (
          <section className="mt-2" aria-labelledby="near">
            <div className="flex items-end justify-between">
              <h2 id="near" className="section-title text-ink">Near you</h2>
              <span className="text-sm text-ink-muted">{nearby.length} within 10 km · sort: {sort}</span>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {nearby.length === 0
                ? <EmptyState title="Nothing matches those filters" hint="Try expanding your distance or clearing filters." />
                : nearby.map(f => <FacilityCard key={f.slug} f={f} />)}
            </div>
          </section>
        )}

        <section className="mt-12" aria-labelledby="shortest">
          <div className="flex items-end justify-between">
            <h2 id="shortest" className="section-title text-ink">Shortest estimated A&E wait</h2>
            <Link href="/singapore/a-e" className="text-sm text-brand hover:underline">See all A&E →</Link>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shortest.map(f => <FacilityCard key={f.slug} f={f} />)}
          </div>
        </section>

        <AdSlot type="in-content" />

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <DecisionHelper />
          <aside className="card p-6" aria-labelledby="trust">
            <h2 id="trust" className="font-semibold text-ink text-lg">How this site works</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li className="flex gap-2"><span aria-hidden className="text-brand">•</span><span>Every wait figure is tagged <strong className="text-ink">Official</strong>, <strong className="text-ink">Estimated</strong>, or <strong className="text-ink">Community</strong>.</span></li>
              <li className="flex gap-2"><span aria-hidden className="text-brand">•</span><span>Figures older than an hour are downgraded automatically.</span></li>
              <li className="flex gap-2"><span aria-hidden className="text-brand">•</span><span>A facility with no data shows <em>Wait time unavailable</em> — we don&apos;t invent numbers.</span></li>
              <li className="flex gap-2"><span aria-hidden className="text-brand">•</span><span>Never delay emergency care based on a wait time shown here.</span></li>
            </ul>
            <Link href="/methodology" className="btn btn-secondary mt-5">Read methodology</Link>
          </aside>
        </section>

        <section className="mt-14" aria-labelledby="guides">
          <h2 id="guides" className="section-title text-ink">Helpful guides</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            <li className="card card-hover p-5">
              <Link href="/articles/a-e-vs-polyclinic-vs-gp" className="font-semibold text-ink hover:text-brand">A&E vs polyclinic vs GP</Link>
              <p className="text-sm text-ink-muted mt-2">Where to go for what.</p>
            </li>
            <li className="card card-hover p-5">
              <Link href="/articles/how-polyclinic-appointments-work" className="font-semibold text-ink hover:text-brand">How polyclinic appointments work</Link>
              <p className="text-sm text-ink-muted mt-2">Release windows & walk-ins.</p>
            </li>
            <li className="card card-hover p-5">
              <Link href="/articles/singapore-a-e-wait-times-explained" className="font-semibold text-ink hover:text-brand">A&E wait times explained</Link>
              <p className="text-sm text-ink-muted mt-2">What the colours mean.</p>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
