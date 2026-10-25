import { db } from '@/lib/db';
import { relativeTime } from '@/lib/time';
export const dynamic = 'force-dynamic';

export default async function AdminSources() {
  const rows = await db.dataSourceStatus.findMany({ orderBy: { updatedAt: 'desc' } });
  return (
    <>
      <h1 className="text-2xl font-bold">Data sources</h1>
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {rows.map(s => {
          const ok = s.lastSuccessAt && (!s.lastFailureAt || s.lastSuccessAt > s.lastFailureAt);
          return (
            <li key={s.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{s.name}</div>
                <span className={ok ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}>{ok ? '✓ Healthy' : '⚠ Warning'}</span>
              </div>
              <div className="text-xs text-ink-muted mt-1">{s.kind}</div>
              <div className="text-sm mt-2">Last success: {s.lastSuccessAt ? relativeTime(s.lastSuccessAt) : '—'}</div>
              <div className="text-sm">Last failure: {s.lastFailureAt ? relativeTime(s.lastFailureAt) : '—'}</div>
              {s.lastError && <div className="text-xs text-red-700 dark:text-red-300 mt-1">{s.lastError}</div>}
            </li>
          );
        })}
      </ul>
    </>
  );
}
