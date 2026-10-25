import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-bg-soft/40">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold text-ink">
            <span aria-hidden className="inline-grid h-7 w-7 place-items-center rounded-lg bg-brand text-white text-sm font-bold">+</span>
            SG Health Wait
          </div>
          <p className="mt-3 text-ink-muted">Compare Singapore healthcare wait times. Not medical advice.</p>
        </div>
        <div>
          <div className="font-semibold text-ink mb-3">Explore</div>
          <ul className="space-y-2 text-ink-soft">
            <li><Link href="/singapore/a-e" className="hover:text-ink">A&E</Link></li>
            <li><Link href="/singapore/polyclinics" className="hover:text-ink">Polyclinics</Link></li>
            <li><Link href="/singapore/private-gp" className="hover:text-ink">Private GPs</Link></li>
            <li><Link href="/singapore/private-hospitals" className="hover:text-ink">Private hospitals</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-ink mb-3">Trust</div>
          <ul className="space-y-2 text-ink-soft">
            <li><Link href="/methodology" className="hover:text-ink">Methodology</Link></li>
            <li><Link href="/data-sources" className="hover:text-ink">Data sources</Link></li>
            <li><Link href="/privacy" className="hover:text-ink">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-ink">Terms</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-ink mb-3">Help</div>
          <ul className="space-y-2 text-ink-soft">
            <li><Link href="/articles" className="hover:text-ink">Guides</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-5 text-center text-xs text-ink-muted">
        If this is an emergency, call <a className="underline" href="tel:995">995</a>. © SG Health Wait.
      </div>
    </footer>
  );
}
