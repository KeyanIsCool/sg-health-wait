import Link from 'next/link';
export default function DecisionHelper() {
  return (
    <section className="card p-6" aria-labelledby="decide">
      <h2 id="decide" className="font-semibold text-ink text-lg">What are you looking for?</h2>
      <p className="text-sm text-ink-muted mt-1">We&apos;ll point you in a direction. This is information, not a medical diagnosis.</p>
      <ul className="mt-4 grid gap-3">
        <li className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-red-900 dark:text-red-200">Emergency care</div>
              <p className="text-sm mt-1 text-red-900/80 dark:text-red-200/80">Chest pain, serious injury, severe breathing difficulty, suspected stroke.</p>
            </div>
            <a href="tel:995" className="btn btn-primary bg-red-600 hover:bg-red-700">Call 995</a>
          </div>
        </li>
        <li className="rounded-xl border border-line bg-bg-raised p-4 flex items-center justify-between gap-3">
          <div><div className="font-semibold text-ink">Urgent, not life-threatening</div><p className="text-sm mt-1 text-ink-muted">High fever, injuries that may need stitches.</p></div>
          <Link href="/singapore/a-e" className="btn btn-secondary">Compare A&E</Link>
        </li>
        <li className="rounded-xl border border-line bg-bg-raised p-4 flex items-center justify-between gap-3">
          <div><div className="font-semibold text-ink">Routine treatment</div><p className="text-sm mt-1 text-ink-muted">Flu, chronic disease review, vaccinations, MCs.</p></div>
          <Link href="/singapore/polyclinics" className="btn btn-secondary">Find polyclinic</Link>
        </li>
        <li className="rounded-xl border border-line bg-bg-raised p-4 flex items-center justify-between gap-3">
          <div><div className="font-semibold text-ink">Need a doctor right now</div><p className="text-sm mt-1 text-ink-muted">Open GPs, 24-hour clinics nearby.</p></div>
          <Link href="/singapore/private-gp" className="btn btn-secondary">Find a GP</Link>
        </li>
      </ul>
    </section>
  );
}
