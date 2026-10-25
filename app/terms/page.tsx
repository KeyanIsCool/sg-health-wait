import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Terms', alternates: { canonical: '/terms' } };
export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Terms</nav>
      <h1 className="text-3xl font-bold">Terms of use</h1>
      <div className="mt-4 space-y-4 text-ink-soft">
        <p>SG Health Wait provides healthcare facility information and <strong>estimated</strong> wait times. It is not medical advice, diagnosis, or triage.</p>
        <p>In an emergency, call 995. Do not delay emergency care based on anything shown on this site.</p>
        <p>We make no guarantee of accuracy. Wait figures are indicative only.</p>
      </div>
    </article>
  );
}
