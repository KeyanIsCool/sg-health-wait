import Link from 'next/link';
import WaitTimeBadge from './WaitTimeBadge';
import LastUpdated from './LastUpdated';
import SourceBadge from './SourceBadge';
import AdSlot from './AdSlot';
import ReminderButton from './ReminderButton';
import SlotWatchButton from './SlotWatchButton';
import CrowdReportForm from './CrowdReportForm';
import { TYPE_LABEL, OWNERSHIP_LABEL, facilityPath } from '@/lib/facility';
import { minutesToHHMM } from '@/lib/time';
import { formatDistance } from '@/lib/geo';
import { directionsUrl } from '@/lib/directions';

type Alt = { slug: string; name: string; type: string; distanceKm: number; waitMinutes: number | null; twentyFourHour: boolean; isOpen: boolean };

export default function FacilityDetail({ f, latest, alternatives }: {
  f: {
    id: string; slug: string; name: string; type: string; ownership: string;
    address: string; postalCode: string | null; latitude: number; longitude: number;
    phone: string | null; websiteUrl: string | null; bookingUrl: string | null;
    description: string | null; twentyFourHour: boolean;
    appointmentReleaseTime: string | null;
    hours: { dayOfWeek: number; openMin: number; closeMin: number; closed: boolean }[];
    services: { label: string }[];
    waitTimes: { waitMinutes: number; sourceType: string; sourceName: string; reportedAt: Date; confidence: string }[];
  };
  latest: { waitMinutes: number; sourceType: string; sourceName: string; reportedAt: Date; confidence: string } | null;
  alternatives: Alt[];
}) {
  const mapsUrl = directionsUrl({ name: f.name, address: f.address, postalCode: f.postalCode, lat: f.latitude, lng: f.longitude });
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-2">
        <Link href="/">Home</Link> › <Link href="/singapore">Singapore</Link> ›{' '}
        <Link href={facilityPath(f.type, '').replace(/\/$/, '')}>{TYPE_LABEL[f.type]}</Link> › {f.name}
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{f.name}</h1>
          <div className="mt-1 text-ink-muted">{OWNERSHIP_LABEL[f.ownership]} · {TYPE_LABEL[f.type]} · {f.twentyFourHour ? 'Open 24 hours' : 'See hours below'}</div>
        </div>
        <div className="flex gap-2">
          {f.phone && <a href={`tel:${f.phone}`} className="btn-secondary">Call</a>}
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Directions</a>
        </div>
      </header>

      <section className="card p-5 mt-6" aria-labelledby="wait">
        <h2 id="wait" className="font-semibold">Current estimated wait</h2>
        <div className="mt-3 flex flex-wrap items-end gap-4">
          <WaitTimeBadge minutes={latest?.waitMinutes ?? null} size="lg" />
          <div className="flex flex-col text-sm">
            {latest ? (
              <>
                <LastUpdated at={latest.reportedAt} />
                <SourceBadge sourceType={latest.sourceType} sourceName={latest.sourceName} />
              </>
            ) : <span className="text-ink-muted">No recent data. <Link href="/methodology" className="underline">Why?</Link></span>}
          </div>
          <Link href="/methodology" className="text-sm underline text-brand ml-auto">How we calculate this</Link>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <section className="card p-5" aria-labelledby="info">
          <h2 id="info" className="font-semibold">Facility information</h2>
          <dl className="mt-3 text-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="text-ink-muted">Address</dt><dd>{f.address}{f.postalCode ? ` ${f.postalCode}` : ''}</dd>
            {f.phone && <><dt className="text-ink-muted">Phone</dt><dd><a className="underline" href={`tel:${f.phone}`}>{f.phone}</a></dd></>}
            {f.websiteUrl && <><dt className="text-ink-muted">Website</dt><dd><a className="underline" href={f.websiteUrl} target="_blank" rel="noopener noreferrer">{new URL(f.websiteUrl).hostname}</a></dd></>}
            {f.bookingUrl && <><dt className="text-ink-muted">Booking</dt><dd><a className="underline" href={f.bookingUrl} target="_blank" rel="noopener noreferrer">Book appointment</a></dd></>}
          </dl>
        </section>

        <section className="card p-5" aria-labelledby="hours">
          <h2 id="hours" className="font-semibold">Opening hours</h2>
          <ul className="mt-3 text-sm space-y-1">
            {DAYS.map((d, i) => {
              const h = f.hours.find(x => x.dayOfWeek === i);
              return (
                <li key={d} className="flex justify-between tabular">
                  <span>{d}</span>
                  <span>{!h || h.closed ? 'Closed' : `${minutesToHHMM(h.openMin)} – ${minutesToHHMM(h.closeMin)}`}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {f.type === 'POLYCLINIC' && (
        <section className="mt-6 grid gap-4 md:grid-cols-2" aria-labelledby="reminder">
          <h2 id="reminder" className="sr-only">Appointment reminders</h2>
          <ReminderButton facilitySlug={f.slug} facilityName={f.name} releaseTime={f.appointmentReleaseTime} />
          <SlotWatchButton facilitySlug={f.slug} facilityName={f.name} bookingUrl={f.bookingUrl} />
        </section>
      )}

      {f.services.length > 0 && (
        <section className="card p-5 mt-6" aria-labelledby="services">
          <h2 id="services" className="font-semibold">Services</h2>
          <ul className="mt-2 flex flex-wrap gap-2">{f.services.map(s => <li key={s.label} className="chip">{s.label}</li>)}</ul>
        </section>
      )}

      <AdSlot type="in-content" />

      <section className="mt-6" aria-labelledby="crowd">
        <h2 id="crowd" className="sr-only">Report your wait</h2>
        <CrowdReportForm facilityId={f.id} />
      </section>

      {alternatives.length > 0 && (
        <section className="mt-8" aria-labelledby="alts">
          <h2 id="alts" className="font-semibold text-xl">Nearby alternatives</h2>
          <ul className="mt-3 grid gap-3 md:grid-cols-3">
            {alternatives.map(a => (
              <li key={a.slug} className="card p-4">
                <Link href={facilityPath(a.type, a.slug)} className="font-medium hover:text-brand">{a.name}</Link>
                <div className="text-xs text-ink-muted mt-1">{formatDistance(a.distanceKm)} · {a.twentyFourHour ? 'Open 24h' : (a.isOpen ? 'Open now' : 'Closed')}</div>
                <div className="mt-2"><WaitTimeBadge minutes={a.waitMinutes} size="sm" /></div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 card p-5" aria-labelledby="faq">
        <h2 id="faq" className="font-semibold">FAQ</h2>
        <details className="mt-3"><summary className="cursor-pointer font-medium">Is this wait time official?</summary><p className="text-sm text-ink-soft mt-2">The source is shown next to every figure. If it says Estimated or Community, it is not an official hospital number — see <Link href="/methodology" className="underline">methodology</Link>.</p></details>
        <details className="mt-2"><summary className="cursor-pointer font-medium">What if this is an emergency?</summary><p className="text-sm text-ink-soft mt-2">Call <a href="tel:995" className="underline">995</a> immediately. Do not choose a hospital based on wait time in an emergency.</p></details>
      </section>
    </article>
  );
}
