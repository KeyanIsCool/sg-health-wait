import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Privacy', alternates: { canonical: '/privacy' } };
export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Privacy</nav>
      <h1 className="text-3xl font-bold">Privacy</h1>
      <div className="mt-4 space-y-4 text-ink-soft">
        <p>We collect the minimum data needed to run this site. Location is only requested when you tap <em>Use my location</em>, and is used in-browser — we never store your coordinates server-side.</p>
        <p>Reminders are stored in your browser (localStorage) unless you explicitly set up an email or push reminder.</p>
        <p>Crowd reports are anonymous. We derive a one-way hash of your IP and user agent for abuse protection; we never store raw IPs.</p>
        <p>We may show ads via Google AdSense, which uses cookies. See Google&apos;s policies for details.</p>
      </div>
    </article>
  );
}
