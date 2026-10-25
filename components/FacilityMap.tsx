'use client';
import { useEffect, useRef } from 'react';

export type MapFacility = {
  slug: string; name: string; type: string;
  lat: number; lng: number;
  waitMinutes: number | null;
  href: string;
};

// Lightweight Leaflet loader (loaded via CDN on demand) — avoids bundling cost.
async function ensureLeaflet(): Promise<any> {
  const w = window as any;
  if (w.L) return w.L;
  await new Promise<void>((res, rej) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    css.crossOrigin = '';
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.async = true; s.crossOrigin = '';
    s.onload = () => res(); s.onerror = () => rej(new Error('leaflet load failed'));
    document.body.appendChild(s);
  });
  return w.L;
}

function markerColor(mins: number | null) {
  if (mins == null) return '#94a3b8';
  if (mins < 30) return '#059669';
  if (mins < 60) return '#d97706';
  if (mins < 120) return '#ea580c';
  return '#dc2626';
}

export default function FacilityMap({ facilities, center = { lat: 1.3521, lng: 103.8198 }, zoom = 12 }: { facilities: MapFacility[]; center?: { lat: number; lng: number }; zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await ensureLeaflet();
      if (cancelled || !ref.current || mapRef.current) return;
      const map = L.map(ref.current, { scrollWheelZoom: false }).setView([center.lat, center.lng], zoom);
      mapRef.current = map;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors', maxZoom: 19,
      }).addTo(map);
      for (const f of facilities) {
        const icon = L.divIcon({
          className: 'facility-marker',
          html: `<div style="background:${markerColor(f.waitMinutes)};color:white;border-radius:999px;padding:2px 8px;font:600 12px system-ui;border:2px solid white;box-shadow:0 1px 2px rgba(0,0,0,.25);white-space:nowrap">${f.waitMinutes == null ? '—' : f.waitMinutes + 'm'}</div>`,
          iconSize: [40, 20], iconAnchor: [20, 10],
        });
        const marker = L.marker([f.lat, f.lng], { icon, title: f.name }).addTo(map);
        marker.bindPopup(`<strong>${f.name}</strong><br/>${f.waitMinutes == null ? 'Wait unavailable' : f.waitMinutes + ' min est. wait'}<br/><a href="${f.href}">View details</a>`);
      }
    })();
    return () => { cancelled = true; if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilities]);

  return (
    <div className="rounded-card overflow-hidden border border-line">
      <div ref={ref} style={{ height: 420 }} role="application" aria-label="Map of Singapore healthcare facilities" />
      <noscript>
        <p className="p-4 text-sm text-ink-muted">The interactive map requires JavaScript. A full list of facilities is available below.</p>
      </noscript>
    </div>
  );
}
