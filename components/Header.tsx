import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-ink hover:opacity-90">
          <span aria-hidden className="inline-grid h-8 w-8 place-items-center rounded-lg bg-brand text-white shadow-sm font-bold">+</span>
          <span className="tracking-tight">SG Health Wait</span>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-5 text-sm text-ink-soft">
          <Link href="/singapore/a-e" className="hover:text-ink">A&E</Link>
          <Link href="/singapore/polyclinics" className="hover:text-ink">Polyclinics</Link>
          <Link href="/singapore/private-gp" className="hover:text-ink">GPs</Link>
          <Link href="/map" className="hover:text-ink">Map</Link>
          <Link href="/reminders" className="hover:text-ink">Reminders</Link>
          <Link href="/methodology" className="hover:text-ink text-ink-muted">How it works</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
