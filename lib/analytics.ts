// Minimal analytics shim. Replace with Plausible/Umami/GA in production.
export type AnalyticsEvent =
  | 'facility_search' | 'facility_view' | 'use_location'
  | 'get_directions' | 'filter_used' | 'reminder_created'
  | 'crowd_report_submitted';

export function track(event: AnalyticsEvent, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  try {
    const w = window as unknown as { plausible?: (e: string, o?: unknown) => void };
    w.plausible?.(event, { props });
  } catch {}
}
