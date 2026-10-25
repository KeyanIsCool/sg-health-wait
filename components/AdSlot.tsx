'use client';
import { useEffect, useRef } from 'react';

type Props = { type: 'leaderboard' | 'rectangle' | 'in-content' | 'sidebar'; slot?: string; className?: string };

const SIZES: Record<Props['type'], string> = {
  leaderboard: 'min-h-[90px]',
  rectangle: 'min-h-[250px]',
  'in-content': 'min-h-[200px]',
  sidebar: 'min-h-[600px]',
};

export default function AdSlot({ type, slot, className }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!client || !slot) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {}
  }, [client, slot]);

  if (!client) return null; // gracefully collapse when no publisher configured

  return (
    <div ref={ref} className={`w-full flex items-center justify-center bg-canvas-soft border border-dashed border-line rounded-card my-6 ${SIZES[type]} ${className ?? ''}`}
      aria-label="Advertisement" role="complementary">
      {slot ? (
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true" />
      ) : (
        <span className="text-xs text-ink-muted">Ad</span>
      )}
    </div>
  );
}
