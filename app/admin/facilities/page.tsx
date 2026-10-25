import Link from 'next/link';
import { db } from '@/lib/db';
import { facilityPath } from '@/lib/facility';

export const dynamic = 'force-dynamic';

export default async function AdminFacilities() {
  const rows = await db.facility.findMany({ orderBy: { name: 'asc' } });
  return (
    <>
      <h1 className="text-2xl font-bold">Facilities</h1>
      <p className="text-sm text-ink-muted mt-1">{rows.length} total. Edit facility data via the API or seed script; a full CRUD UI is in the roadmap.</p>
      <table className="w-full text-sm mt-4 card">
        <thead className="text-left text-ink-muted">
          <tr><th className="p-3">Name</th><th className="p-3">Type</th><th className="p-3">Ownership</th><th className="p-3">Active</th><th className="p-3">Link</th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t border-line">
              <td className="p-3 font-medium">{r.name}</td>
              <td className="p-3">{r.type}</td>
              <td className="p-3">{r.ownership}</td>
              <td className="p-3">{r.active ? '✓' : '—'}</td>
              <td className="p-3"><Link href={facilityPath(r.type, r.slug)} className="underline">View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
