'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ initial = '' }: { initial?: string }) {
  const [q, setQ] = useState(initial);
  const router = useRouter();
  return (
    <form role="search" className="relative flex gap-2 w-full" onSubmit={e => { e.preventDefault(); router.push(`/search?q=${encodeURIComponent(q)}`); }}>
      <label className="sr-only" htmlFor="q">Search facility, area or postal code</label>
      <div className="relative flex-1">
        <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted text-lg">🔍</span>
        <input id="q" name="q" type="search" value={q} onChange={e => setQ(e.target.value)}
          placeholder="Search hospital, polyclinic, area or postal code"
          className="input !pl-11" autoComplete="off" />
      </div>
      <button type="submit" className="btn btn-primary px-6">Search</button>
    </form>
  );
}
