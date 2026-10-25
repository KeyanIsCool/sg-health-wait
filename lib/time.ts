export function relativeTime(from: Date, now: Date = new Date()): string {
  const sec = Math.round((now.getTime() - from.getTime()) / 1000);
  if (sec < 30) return 'just now';
  if (sec < 60) return `${sec}s ago`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? '' : 's'} ago`;
  const day = Math.round(hr / 24);
  return `${day} day${day === 1 ? '' : 's'} ago`;
}

// Confidence decay: fresher = higher confidence; stale pushed down.
export function freshnessBucket(reportedAt: Date, now: Date = new Date()): 'FRESH' | 'AGING' | 'STALE' {
  const min = (now.getTime() - reportedAt.getTime()) / 60000;
  if (min < 15) return 'FRESH';
  if (min < 60) return 'AGING';
  return 'STALE';
}

export function waitStatus(mins: number): 'short' | 'moderate' | 'long' | 'verylong' {
  if (mins < 30) return 'short';
  if (mins < 60) return 'moderate';
  if (mins < 120) return 'long';
  return 'verylong';
}

export function minutesToHHMM(m: number): string {
  const h = Math.floor(m / 60), mm = m % 60;
  return `${h.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
}

// Singapore is UTC+8 with no DST
export function sgtNow(): Date {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 8 * 3600000);
}

export function isOpenNow(hours: { dayOfWeek: number; openMin: number; closeMin: number; closed: boolean }[]): boolean {
  const n = sgtNow();
  const dow = n.getDay();
  const mins = n.getHours() * 60 + n.getMinutes();
  const today = hours.find(h => h.dayOfWeek === dow);
  if (!today || today.closed) return false;
  return mins >= today.openMin && mins < today.closeMin;
}
