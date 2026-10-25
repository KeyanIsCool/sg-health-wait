import crypto from 'node:crypto';

export function deviceHash(ip: string | null, ua: string | null): string {
  const salt = process.env.ABUSE_SALT || 'sg-health-wait-salt';
  return crypto.createHash('sha256').update(`${salt}|${ip ?? ''}|${ua ?? ''}`).digest('hex');
}

// Simple in-memory token bucket per device. For production, back with Redis/Upstash.
const buckets = new Map<string, { tokens: number; refilledAt: number }>();
const CAPACITY = 5;
const REFILL_PER_MIN = 1;

export function allow(deviceKey: string): boolean {
  const now = Date.now();
  const b = buckets.get(deviceKey) ?? { tokens: CAPACITY, refilledAt: now };
  const elapsed = (now - b.refilledAt) / 60000;
  b.tokens = Math.min(CAPACITY, b.tokens + elapsed * REFILL_PER_MIN);
  b.refilledAt = now;
  if (b.tokens < 1) { buckets.set(deviceKey, b); return false; }
  b.tokens -= 1;
  buckets.set(deviceKey, b);
  return true;
}
