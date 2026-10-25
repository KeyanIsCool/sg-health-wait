'use client';
import { useEffect, useRef, useState } from 'react';
import { requestNotificationPermission } from '@/lib/notifications';
import { track } from '@/lib/analytics';

type Status = 'off' | 'on' | 'available';
const STORE_KEY = 'slotwatch';

function readStore(): Record<string, { since: string }> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch { return {}; }
}
function writeStore(s: Record<string, { since: string }>) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch {}
}

export default function SlotWatchButton({ facilitySlug, facilityName, bookingUrl }: {
  facilitySlug: string; facilityName: string; bookingUrl?: string | null;
}) {
  const [status, setStatus] = useState<Status>('off');
  const [perm, setPerm] = useState<NotificationPermission | 'unknown'>('unknown');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const store = readStore();
    if (store[facilitySlug]) setStatus('on');
    if (typeof window !== 'undefined' && 'Notification' in window) setPerm(Notification.permission);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [facilitySlug]);

  // Poll while this tab is open and watch is active.
  useEffect(() => {
    if (status !== 'on') return;
    const check = async () => {
      try {
        const r = await fetch(`/api/slot-check?facility=${facilitySlug}`, { cache: 'no-store' });
        if (!r.ok) return;
        const j = await r.json() as { available?: boolean; count?: number };
        if (j.available) {
          setStatus('available');
          if ('Notification' in window && Notification.permission === 'granted') {
            try { new Notification(`${facilityName}: slots available`, { body: 'Slots have opened — tap to book.' }); } catch {}
          }
        }
      } catch {}
    };
    timerRef.current = setInterval(check, 60_000);
    check();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status, facilitySlug, facilityName]);

  const start = async () => {
    const p = await requestNotificationPermission();
    setPerm(p);
    const store = readStore();
    store[facilitySlug] = { since: new Date().toISOString() };
    writeStore(store);
    setStatus('on');
    track('reminder_created', { facility: facilitySlug, kind: 'slot_watch' });
  };

  const stop = () => {
    const store = readStore();
    delete store[facilitySlug];
    writeStore(store);
    setStatus('off');
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-semibold text-ink">Notify me if slots open up</h3>
          <p className="text-sm text-ink-muted mt-1">
            We&apos;ll check for last-minute availability every minute while this page or your reminder tab is open.
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
            Beta — availability is detected from our data integration. If the integration isn&apos;t configured for this clinic, this watch won&apos;t trigger.
          </p>
        </div>
        {status === 'off' && <button className="btn btn-primary" onClick={start}>🔔 Watch for slots</button>}
        {status === 'on' && (
          <div className="flex items-center gap-2">
            <span className="pill bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">● Watching</span>
            <button className="btn btn-secondary" onClick={stop}>Stop</button>
          </div>
        )}
        {status === 'available' && (
          <div className="flex items-center gap-2">
            <span className="pill bg-emerald-600 text-white">✓ Slots available</span>
            {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book now</a>}
            <button className="btn btn-secondary" onClick={stop}>Stop</button>
          </div>
        )}
      </div>
      {status !== 'off' && perm !== 'granted' && (
        <p className="text-xs text-ink-muted mt-3">Browser notifications aren&apos;t enabled, so the alert will only appear while this tab is open.</p>
      )}
    </div>
  );
}
