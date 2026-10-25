'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const TYPES = [
  { v: 'AE', l: 'A&E' },
  { v: 'POLYCLINIC', l: 'Polyclinics' },
  { v: 'PRIVATE_GP', l: 'Private GP' },
  { v: 'PRIVATE_HOSPITAL', l: 'Private Hospital' },
];
const OWNERSHIP = [
  { v: 'PUBLIC', l: 'Public' },
  { v: 'PRIVATE', l: 'Private' },
];
const SORTS = [
  { v: 'wait', l: 'Shortest wait' },
  { v: 'distance', l: 'Nearest' },
  { v: 'updated', l: 'Recently updated' },
];

export default function FilterBar() {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, start] = useTransition();

  const setParam = (k: string, v: string | null) => {
    const next = new URLSearchParams(sp);
    if (!v) next.delete(k); else next.set(k, v);
    start(() => router.push(`?${next.toString()}`, { scroll: false }));
  };

  const type = sp.get('type');
  const own = sp.get('ownership');
  const open = sp.get('open');
  const sort = sp.get('sort') || 'wait';

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filters" aria-busy={pending}>
      {TYPES.map(t => (
        <button key={t.v} type="button"
          className={`chip ${type === t.v ? 'chip-active' : ''}`}
          aria-pressed={type === t.v}
          onClick={() => setParam('type', type === t.v ? null : t.v)}>
          {t.l}
        </button>
      ))}
      <span className="w-px bg-line mx-1" aria-hidden />
      {OWNERSHIP.map(t => (
        <button key={t.v} type="button"
          className={`chip ${own === t.v ? 'chip-active' : ''}`}
          aria-pressed={own === t.v}
          onClick={() => setParam('ownership', own === t.v ? null : t.v)}>
          {t.l}
        </button>
      ))}
      <button type="button"
        className={`chip ${open === '1' ? 'chip-active' : ''}`}
        aria-pressed={open === '1'}
        onClick={() => setParam('open', open === '1' ? null : '1')}>
        Open now
      </button>
      <label className="chip" aria-label="Sort">
        <span className="text-ink-muted">Sort:</span>
        <select
          className="bg-transparent focus:outline-none"
          value={sort}
          onChange={e => setParam('sort', e.target.value)}
        >
          {SORTS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
        </select>
      </label>
    </div>
  );
}
