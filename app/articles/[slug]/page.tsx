import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';

type Params = { slug: string };

export async function generateStaticParams() {
  const rows = await db.article.findMany({ select: { slug: true } });
  return rows.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await db.article.findUnique({ where: { slug } });
  if (!a) return {};
  return { title: a.title, description: a.excerpt, alternates: { canonical: `/articles/${a.slug}` } };
}

// Minimal MD renderer: lines starting with # become h1/h2/h3; blank line = paragraph break; **bold**; [text](url) links.
function renderMd(src: string) {
  const html = src
    .replace(/</g, '&lt;')
    .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="underline">$1</a>')
    .split(/\n{2,}/)
    .map(p => (/^<h\d>/.test(p.trim()) ? p : `<p>${p.replace(/\n/g, ' ')}</p>`))
    .join('\n');
  return html;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = await db.article.findUnique({ where: { slug } });
  if (!a) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 prose prose-slate dark:prose-invert">
      <nav className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › <Link href="/articles">Guides</Link> › {a.title}</nav>
      <div dangerouslySetInnerHTML={{ __html: renderMd(a.bodyMd) }} />
    </article>
  );
}
