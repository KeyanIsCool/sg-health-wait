import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = { title: 'Guides', alternates: { canonical: '/articles' } };

export default async function Page() {
  const rows = await db.article.findMany({ orderBy: { publishedAt: 'desc' } });
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Guides</nav>
      <h1 className="text-3xl font-bold">Guides</h1>
      <ul className="mt-6 grid gap-3">
        {rows.map(a => (
          <li key={a.slug} className="card p-4">
            <Link href={`/articles/${a.slug}`} className="font-semibold hover:text-brand">{a.title}</Link>
            <p className="text-sm text-ink-muted mt-1">{a.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
