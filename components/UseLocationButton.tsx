'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { track } from '@/lib/analytics';

export default function UseLocationButton() {
  const router = useRouter();
  const sp = useSearchParams();
  const [state, setState] = useState<'idle' | 'loading' | 'denied' | 'unavailable' | 'ok'>('idle');

  const onClick = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState('unavailable');
      return;
    }
    setState('loading');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setState('ok');
        track('use_location');
        const next = new URLSearchParams(sp);
        next.set('lat', pos.coords.latitude.toFixed(5));
        next.set('lng', pos.coords.longitude.toFixed(5));
        router.push(`?${next.toString()}`, { scroll: false });
      },
      err => { setState(err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable'); },
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 10_000 },
    );
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button type="button" onClick={onClick} className="btn-secondary" aria-live="polite">
        📍 {state === 'loading' ? 'Locating…' : state === 'ok' ? 'Found you' : 'Use my location'}
      </button>
      {state === 'denied' && <span className="text-xs text-ink-muted">Permission denied. You can still browse all facilities below.</span>}
      {state === 'unavailable' && <span className="text-xs text-ink-muted">Location unavailable on this device.</span>}
    </div>
  );
}
