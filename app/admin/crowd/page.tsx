import { db } from '@/lib/db';
import { relativeTime } from '@/lib/time';
export const dynamic = 'force-dynamic';

export default async function AdminCrowd() {
  const rows = await db.crowdReport.findMany({ orderBy: { createdAt: 'desc' }, take: 100, include: { facility: true } });
  return (
    <>
      <h1 className="text-2xl font-bold">Crowd reports</h1>
      <p className="text-sm text-ink-muted mt-1">Flag suspicious submissions to exclude them from aggregates.</p>
      <table className="w-full text-sm mt-4 card">
        <thead className="text-left text-ink-muted"><tr>
          <th className="p-3">Facility</th><th className="p-3">Bucket</th><th className="p-3">Arrived</th><th className="p-3">Device</th><th className="p-3">When</th><th className="p-3">Flagged</th>
        </tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t border-line">
              <td className="p-3 font-medium">{r.facility.name}</td>
              <td className="p-3">{r.bucket}</td>
              <td className="p-3">{r.arrivedMinAgo ?? '—'}</td>
              <td className="p-3 font-mono text-xs">{r.deviceHash.slice(0, 8)}…</td>
              <td className="p-3">{relativeTime(r.createdAt)}</td>
              <td className="p-3">{r.flagged ? '🚩' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
