import { db } from '@/lib/db';
import { relativeTime } from '@/lib/time';
export const dynamic = 'force-dynamic';

export default async function AdminWaitTimes() {
  const rows = await db.waitTime.findMany({ orderBy: { reportedAt: 'desc' }, take: 100, include: { facility: true } });
  return (
    <>
      <h1 className="text-2xl font-bold">Wait times</h1>
      <table className="w-full text-sm mt-4 card">
        <thead className="text-left text-ink-muted"><tr>
          <th className="p-3">Facility</th><th className="p-3">Mins</th><th className="p-3">Source</th><th className="p-3">Confidence</th><th className="p-3">Reported</th><th className="p-3">Expires</th>
        </tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t border-line">
              <td className="p-3 font-medium">{r.facility.name}</td>
              <td className="p-3 tabular">{r.waitMinutes}</td>
              <td className="p-3">{r.sourceType} · {r.sourceName}</td>
              <td className="p-3">{r.confidence}</td>
              <td className="p-3">{relativeTime(r.reportedAt)}</td>
              <td className="p-3">{relativeTime(r.expiresAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
