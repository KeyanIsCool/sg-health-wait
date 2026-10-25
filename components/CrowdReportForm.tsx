'use client';
import { useState } from 'react';
import { track } from '@/lib/analytics';

const BUCKETS = [
  { v: 'LT_15', l: '<15 min' },
  { v: 'B_15_30', l: '15–30 min' },
  { v: 'B_30_60', l: '30–60 min' },
  { v: 'B_60_120', l: '1–2 hours' },
  { v: 'GT_120', l: '2+ hours' },
];

export default function CrowdReportForm({ facilityId }: { facilityId: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const submit = async (bucket: string) => {
    setState('sending');
    const r = await fetch('/api/crowd-reports', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ facilityId, bucket }),
    });
    if (r.ok) { setState('done'); track('crowd_report_submitted', { facilityId, bucket }); }
    else setState('error');
  };

  if (state === 'done') return <div className="card p-4 text-emerald-700 dark:text-emerald-300">Thanks — your report helps everyone.</div>;

  return (
    <div className="card p-4">
      <h3 className="font-semibold">Were you just here?</h3>
      <p className="text-sm text-ink-muted mt-1">Help others — report how long you waited. No sign-in needed.</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {BUCKETS.map(b => (
          <button key={b.v} className="chip hover:chip-active" disabled={state === 'sending'} onClick={() => submit(b.v)}>{b.l}</button>
        ))}
      </div>
      {state === 'error' && <div className="text-xs text-red-700 dark:text-red-300 mt-2">Could not submit. Try again shortly.</div>}
    </div>
  );
}
