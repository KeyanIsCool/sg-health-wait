import Link from 'next/link';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav aria-label="Admin" className="flex gap-4 text-sm mb-6">
        <Link href="/admin" className="font-semibold">Admin</Link>
        <Link href="/admin/facilities">Facilities</Link>
        <Link href="/admin/wait-times">Wait times</Link>
        <Link href="/admin/crowd">Crowd reports</Link>
        <Link href="/admin/sources">Data sources</Link>
      </nav>
      {children}
    </div>
  );
}
