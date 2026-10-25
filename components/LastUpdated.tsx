import { relativeTime, freshnessBucket } from '@/lib/time';

export default function LastUpdated({ at }: { at: Date | string | null }) {
  if (!at) return <span className="text-xs text-ink-muted">No recent update</span>;
  const d = typeof at === 'string' ? new Date(at) : at;
  const f = freshnessBucket(d);
  const cls = f === 'FRESH' ? 'text-emerald-700 dark:text-emerald-300' : f === 'AGING' ? 'text-amber-700 dark:text-amber-300' : 'text-ink-muted';
  return <span className={`text-xs ${cls}`}>Updated {relativeTime(d)}</span>;
}
