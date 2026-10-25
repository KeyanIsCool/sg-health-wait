'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { REGION_LABEL, type Region } from '@/lib/region';

const REGIONS: Region[] = ['CENTRAL', 'NORTH', 'NORTH_EAST', 'EAST', 'WEST'];

export default function RegionBar() {
  const router = useRouter();
  const sp = useSearchParams();
  const active = sp.get('region');

  const setRegion = (r: string | null) => {
    const next = new URLSearchParams(sp);
    if (!r) next.delete('region'); else next.set('region', r);
    router.push(`?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter by region">
      <span className="text-xs uppercase tracking-wider text-ink-muted font-semibold mr-1">Region</span>
      <button type="button" onClick={() => setRegion(null)}
        className={`chip ${!active ? 'chip-active' : ''}`} aria-pressed={!active}>All</button>
      {REGIONS.map(r => (
        <button key={r} type="button" onClick={() => setRegion(r)}
          className={`chip ${active === r ? 'chip-active' : ''}`} aria-pressed={active === r}>
          {REGION_LABEL[r]}
        </button>
      ))}
    </div>
  );
}
