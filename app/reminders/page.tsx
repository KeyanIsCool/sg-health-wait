'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listLocalReminders, removeLocalReminder } from '@/lib/notifications';

export default function RemindersPage() {
  const [list, setList] = useState<ReturnType<typeof listLocalReminders>>([]);
  const [perm, setPerm] = useState<NotificationPermission | 'unknown'>('unknown');

  useEffect(() => {
    setList(listLocalReminders());
    if (typeof window !== 'undefined' && 'Notification' in window) setPerm(Notification.permission);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted mb-2"><Link href="/">Home</Link> › Reminders</nav>
      <h1 className="text-2xl font-bold">Your reminders</h1>
      <p className="text-sm text-ink-muted mt-1">Reminders are stored in this browser only. We don&apos;t collect your personal data.</p>

      {perm !== 'granted' && (
        <div className="card p-4 mt-4 bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200">
          Browser notifications aren&apos;t enabled. Reminders will only fire while this tab is open.
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {list.length === 0 && <li className="text-ink-muted">No reminders yet. Visit a <Link href="/singapore/polyclinics" className="underline">polyclinic page</Link> to set one.</li>}
        {list.map(r => (
          <li key={r.key} className="card p-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-medium">{r.title}</div>
              <div className="text-sm text-ink-muted">Fires at {new Date(r.fireAt).toLocaleString('en-SG')}</div>
            </div>
            <button className="btn-secondary" onClick={() => { removeLocalReminder(r.key); setList(listLocalReminders()); }}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
