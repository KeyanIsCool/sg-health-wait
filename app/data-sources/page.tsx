import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { relativeTime } from '@/lib/time';

export const metadata: Metadata = { title: 'Data sources', alternates: { canonical: '/data-sources' } };
export const revalidate = 300;

export default async function Page() {
  const sources = await db.dataSourceStatus.findMany();
  const latestOfficial = await db.waitTime.count({ where: { sourceType: 'OFFICIAL', expiresAt: { gt: new Date() } } });
  const latestEstimated = await db.waitTime.count({ where: { sourceType: 'ESTIMATED', expiresAt: { gt: new Date() } } });
  const latestCrowd = await db.waitTime.count({ where: { sourceType: 'CROWDSOURCED', expiresAt: { gt: new Date() } } });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Data sources</nav>
      <h1 className="section-title text-ink">Data sources</h1>
      <p className="mt-2 text-ink-soft">We never present an estimate as an official number. Here&apos;s the honest state of our data.</p>

      <section className="card p-6 mt-6" aria-labelledby="now">
        <h2 id="now" className="font-semibold text-ink">Which sources are currently official?</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-3 bg-bg-soft/50">
            <div className="text-xs uppercase tracking-wider text-ink-muted">Official</div>
            <div className="text-3xl font-bold tabular text-ink mt-1">{latestOfficial}</div>
            <div className="text-xs text-ink-muted mt-1">live records</div>
          </div>
          <div className="rounded-xl border border-line p-3 bg-bg-soft/50">
            <div className="text-xs uppercase tracking-wider text-ink-muted">Estimated</div>
            <div className="text-3xl font-bold tabular text-ink mt-1">{latestEstimated}</div>
            <div className="text-xs text-ink-muted mt-1">live records</div>
          </div>
          <div className="rounded-xl border border-line p-3 bg-bg-soft/50">
            <div className="text-xs uppercase tracking-wider text-ink-muted">Community</div>
            <div className="text-3xl font-bold tabular text-ink mt-1">{latestCrowd}</div>
            <div className="text-xs text-ink-muted mt-1">live records</div>
          </div>
        </div>
        {latestOfficial === 0 && (
          <p className="mt-4 text-sm text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/60 rounded-lg p-3">
            <strong>Transparency:</strong> currently <strong>no live wait times are sourced from an official hospital feed</strong>.
            Singapore public hospitals do not publish a stable public A&E wait-time API. All A&E figures on this site are
            either demo estimates or community reports until we integrate a verified source. Every figure is tagged with its
            source — look for the label under each wait-time badge.
          </p>
        )}
      </section>

      <h2 className="section-title text-ink mt-10">Configured source adapters</h2>
      <ul className="mt-4 space-y-3">
        {sources.map(s => (
          <li key={s.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-ink">{s.name}</div>
              <span className="pill bg-bg-soft text-ink-soft">{s.kind}</span>
            </div>
            <div className="text-sm text-ink-muted mt-1">Last update: {s.lastSuccessAt ? relativeTime(s.lastSuccessAt) : '—'}</div>
          </li>
        ))}
      </ul>

      <h2 className="section-title text-ink mt-10">How to add an official source</h2>
      <p className="mt-3 text-ink-soft">Implement <code className="bg-bg-soft px-1.5 py-0.5 rounded">lib/data-sources/official/*</code> returning normalized <code className="bg-bg-soft px-1.5 py-0.5 rounded">NormalizedWaitRecord</code>s with <code className="bg-bg-soft px-1.5 py-0.5 rounded">sourceType: &apos;OFFICIAL&apos;</code>. Hook a cron job to push results into the <code className="bg-bg-soft px-1.5 py-0.5 rounded">WaitTime</code> table. No application code elsewhere changes.</p>
      <p className="mt-3 text-ink-muted text-sm">We will not implement scrapers that bypass authentication, CAPTCHAs or source ToS.</p>
    </div>
  );
}
