import Link from 'next/link';
export default function MobileNav() {
  const items = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/singapore', label: 'Browse', icon: '🔎' },
    { href: '/map', label: 'Map', icon: '🗺️' },
    { href: '/reminders', label: 'Alerts', icon: '🔔' },
  ];
  return (
    <nav aria-label="Primary (mobile)" className="md:hidden fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 backdrop-blur-xl">
      <ul className="grid grid-cols-4">
        {items.map(i => (
          <li key={i.href}>
            <Link href={i.href} className="flex flex-col items-center justify-center py-2 text-xs text-ink-soft hover:text-ink" style={{ minHeight: 56 }}>
              <span aria-hidden className="text-lg leading-none">{i.icon}</span>
              <span className="mt-1">{i.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
