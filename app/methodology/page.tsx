import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Methodology — how we calculate wait times',
  description: 'How SG Health Wait estimates and sources Singapore healthcare wait times.',
  alternates: { canonical: '/methodology' },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-8 prose prose-slate dark:prose-invert">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Methodology</nav>
      <h1>How we calculate wait times</h1>
      <p>Every wait figure on this site is labelled with its source and age. We never present an estimate as an official number.</p>
      <h2>Sources</h2>
      <ul>
        <li><strong>Official</strong> — direct data from the hospital or operator, where available.</li>
        <li><strong>Scraped</strong> — public pages that we read with permission and attribution.</li>
        <li><strong>Crowd</strong> — anonymous reports submitted by site visitors; aggregated as a median over the last hour with a minimum of 3 reports.</li>
        <li><strong>Estimated</strong> — statistical estimates based on time of day, day of week, and prior patterns. Clearly labelled.</li>
        <li><strong>Manual</strong> — a human operator entered the value (e.g. after a confirmed outage).</li>
      </ul>
      <h2>Confidence &amp; freshness</h2>
      <p>Figures older than 15 minutes become <em>aging</em>; older than 60 minutes become <em>stale</em>. Stale figures are visually downgraded and may be hidden entirely.</p>
      <h2>Not a substitute for medical advice</h2>
      <p>Wait times are a convenience, not a diagnostic tool. In an emergency, call <a href="tel:995">995</a>.</p>
    </article>
  );
}
