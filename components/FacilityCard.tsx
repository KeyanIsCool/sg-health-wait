import Link from 'next/link';
import WaitTimeBadge from './WaitTimeBadge';
import LastUpdated from './LastUpdated';
import SourceBadge from './SourceBadge';
import { formatDistance } from '@/lib/geo';
import { TYPE_LABEL, OWNERSHIP_LABEL, facilityPath } from '@/lib/facility';
import { directionsUrl } from '@/lib/directions';

export type FacilityCardData = {
  slug: string; name: string; type: string; ownership: string;
  address: string; postalCode?: string | null;
  twentyFourHour: boolean; isOpen: boolean;
  waitMinutes: number | null;
  waitSourceType: string | null;
  waitSourceName: string | null;
  waitReportedAt: Date | null;
  distanceKm: number | null;
  lat: number; lng: number;
};

export default function FacilityCard({ f }: { f: FacilityCardData }) {
  const href = facilityPath(f.type, f.slug);
  const maps = directionsUrl({ name: f.name, address: f.address, postalCode: f.postalCode ?? null, lat: f.lat, lng: f.lng });

  return (
    <article className="card card-hover p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-ink leading-snug tracking-tight truncate">
            <Link href={href} className="hover:text-brand">{f.name}</Link>
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
            <span className="pill bg-bg-soft text-ink-soft">{OWNERSHIP_LABEL[f.ownership]}</span>
            <span className="pill bg-bg-soft text-ink-soft">{TYPE_LABEL[f.type]}</span>
            {f.twentyFourHour
              ? <span className="pill bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">24h</span>
              : f.isOpen
                ? <span className="pill bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Open</span>
                : <span className="pill bg-bg-soft text-ink-muted">Closed</span>}
          </div>
        </div>
        {f.distanceKm != null && (
          <span className="shrink-0 chip tabular" aria-label={`Distance ${formatDistance(f.distanceKm)}`}>
            <span aria-hidden>📍</span>{formatDistance(f.distanceKm)}
          </span>
        )}
      </div>

      <WaitTimeBadge minutes={f.waitMinutes} size="lg" />

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <LastUpdated at={f.waitReportedAt} />
        {f.waitSourceType && <SourceBadge sourceType={f.waitSourceType} />}
      </div>

      <div className="flex gap-2 pt-1">
        <Link href={href} className="btn btn-secondary flex-1">Details</Link>
        <a href={maps} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1" aria-label={`Directions to ${f.name}`}>
          Directions
        </a>
      </div>
    </article>
  );
}
