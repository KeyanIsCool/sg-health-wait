import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Contact', alternates: { canonical: '/contact' } };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Contact</nav>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4 text-ink-soft">To correct facility information, flag a wait-time issue, or ask about partnerships, email <a className="underline" href="mailto:hello@example.com">hello@example.com</a>.</p>
    </div>
  );
}
