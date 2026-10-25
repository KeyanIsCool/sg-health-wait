'use client';
import { useEffect, useState } from 'react';
import { requestNotificationPermission, scheduleLocalReminder, removeLocalReminder, listLocalReminders } from '@/lib/notifications';
import { track } from '@/lib/analytics';

function nextReleaseDate(hhmm: string, minutesBefore: number): Date {
  const [h, m] = hhmm.split(':').map(Number);
  const now = new Date();
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  if (d.getTime() - minutesBefore * 60_000 <= now.getTime()) d.setDate(d.getDate() + 1);
  d.setMinutes(d.getMinutes() - minutesBefore);
  return d;
}

export default function ReminderButton({ facilitySlug, facilityName, releaseTime }: {
  facilitySlug: string; facilityName: string; releaseTime: string | null;
}) {
  const [set, setSet] = useState(false);
  const [fireAt, setFireAt] = useState<Date | null>(null);
  const [perm, setPerm] = useState<NotificationPermission | 'unknown'>('unknown');
  const [customTime, setCustomTime] = useState<string>(releaseTime ?? '08:00');

  useEffect(() => {
    const existing = listLocalReminders().find(r => r.key === facilitySlug);
    if (existing) { setSet(true); setFireAt(new Date(existing.fireAt)); }
    if (typeof window !== 'undefined' && 'Notification' in window) setPerm(Notification.permission);
  }, [facilitySlug]);

  const activate = async () => {
    const p = await requestNotificationPermission();
    setPerm(p);
    const time = releaseTime ?? customTime;
    const fire = nextReleaseDate(time, 10);
    scheduleLocalReminder({
      key: facilitySlug,
      title: `${facilityName} appointments open soon`,
      body: `Slots may open at ${time}. Opening in 10 min.`,
      fireAt: fire,
    });
    setSet(true); setFireAt(fire);
    track('reminder_created', { facility: facilitySlug });
  };

  const cancel = () => { removeLocalReminder(facilitySlug); setSet(false); setFireAt(null); };

  if (set && fireAt) {
    return (
      <div className="card p-5">
        <div className="font-semibold text-ink">✓ Reminder set</div>
        <div className="text-sm text-ink-muted mt-1">
          We&apos;ll notify you at {fireAt.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })} ({fireAt.toLocaleDateString('en-SG')}).
        </div>
        {perm !== 'granted' && <div className="text-xs text-amber-700 dark:text-amber-400 mt-2">Browser notifications aren&apos;t enabled; the reminder will only fire while this tab is open.</div>}
        <button className="btn btn-secondary mt-3" onClick={cancel}>Cancel reminder</button>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <div className="font-semibold text-ink">
        {releaseTime
          ? <>Appointment slots may open at {releaseTime}</>
          : <>Set a reminder for appointment slot release</>}
      </div>
      <div className="text-sm text-ink-muted mt-1">
        {releaseTime
          ? <>We&apos;ll remind you 10 minutes before. Actual release times may vary by cluster (NHGP, NUHS, SingHealth); check the booking site to confirm.</>
          : <>Different polyclinics release slots at different times. Pick a time to be reminded 10 minutes before.</>}
      </div>
      {!releaseTime && (
        <label className="mt-3 flex items-center gap-2 text-sm">
          Remind at
          <input type="time" value={customTime} onChange={e => setCustomTime(e.target.value)} className="input !min-h-[40px] !py-1.5 !px-2 !w-auto" />
        </label>
      )}
      <button className="btn btn-primary mt-3" onClick={activate}>🔔 Remind me 10 min before</button>
    </div>
  );
}
