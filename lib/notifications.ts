// Client-side only. Server imports should guard with 'use client'.
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'denied';
  if (Notification.permission === 'granted' || Notification.permission === 'denied') return Notification.permission;
  return await Notification.requestPermission();
}

export function scheduleLocalReminder(opts: {
  key: string;
  title: string;
  body: string;
  fireAt: Date;
}): void {
  if (typeof window === 'undefined') return;
  const store = JSON.parse(localStorage.getItem('reminders') || '[]') as Array<{ key: string; title: string; body: string; fireAt: string }>;
  const next = store.filter(r => r.key !== opts.key).concat({ key: opts.key, title: opts.title, body: opts.body, fireAt: opts.fireAt.toISOString() });
  localStorage.setItem('reminders', JSON.stringify(next));
}

export function listLocalReminders(): Array<{ key: string; title: string; body: string; fireAt: string }> {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('reminders') || '[]');
}

export function removeLocalReminder(key: string) {
  if (typeof window === 'undefined') return;
  const store = listLocalReminders().filter(r => r.key !== key);
  localStorage.setItem('reminders', JSON.stringify(store));
}

// Called once per app load from the client layout
export function startReminderWorker() {
  if (typeof window === 'undefined') return;
  const tick = async () => {
    const now = Date.now();
    const store = listLocalReminders();
    const remaining: typeof store = [];
    for (const r of store) {
      const t = new Date(r.fireAt).getTime();
      if (t <= now) {
        if ('Notification' in window && Notification.permission === 'granted') {
          try { new Notification(r.title, { body: r.body }); } catch {}
        }
      } else {
        remaining.push(r);
      }
    }
    if (remaining.length !== store.length) localStorage.setItem('reminders', JSON.stringify(remaining));
  };
  setInterval(tick, 30_000);
  tick();
}
