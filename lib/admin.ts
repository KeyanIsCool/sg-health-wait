import { headers } from 'next/headers';

// Simple HTTP Basic admin gate. Replace with proper auth in production.
export async function requireAdmin(): Promise<Response | null> {
  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASS || 'change-me';
  const h = await headers();
  const auth = h.get('authorization');
  if (auth?.startsWith('Basic ')) {
    const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
    const [u, p] = decoded.split(':');
    if (u === user && p === pass) return null;
  }
  return new Response('Authentication required', {
    status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
  });
}
