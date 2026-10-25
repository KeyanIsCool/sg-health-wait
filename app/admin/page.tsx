import { db } from '@/lib/db';
import { relativeTime } from '@/lib/time';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const [facilities, waits, crowd, sources] = await Promise.all([
    db.facility.count(),
    db.waitTime.count({ where: { expiresAt: { gt: new Date() } } }),
    db.crowdReport.count({ where: { createdAt: { gte: new Date(Date.now() - 24 * 3600 * 1000) } } }),
    db.dataSourceStatus.findMany(),
  ]);
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <div className="card p-4"><div className="text-ink-muted text-xs">Facilities</div><div className="text-3xl font-bold tabular">{facilities}</div></div>
        <div className="card p-4"><div className="text-ink-muted text-xs">Fresh wait records</div><div className="text-3xl font-bold tabular">{waits}</div></div>
        <div className="card p-4"><div className="text-ink-muted text-xs">Crowd reports (24h)</div><div className="text-3xl font-bold tabular">{crowd}</div></div>
      </div>

      <h2 className="font-semibold mt-8">Data source health</h2>
      <table className="w-full text-sm mt-3 card">
        <thead className="text-left text-ink-muted">
          <tr><th className="p-3">Source</th><th className="p-3">Kind</th><th className="p-3">Last success</th><th className="p-3">Last failure</th><th className="p-3">Processed</th></tr>
        </thead>
        <tbody>
          {sources.map(s => (
            <tr key={s.id} className="border-t border-line">
              <td className="p-3 font-medium">{s.name}</td>
              <td className="p-3">{s.kind}</td>
              <td className="p-3">{s.lastSuccessAt ? relativeTime(s.lastSuccessAt) : '—'}</td>
              <td className="p-3">{s.lastFailureAt ? relativeTime(s.lastFailureAt) : '—'}</td>
              <td className="p-3 tabular">{s.recordsProcessed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
