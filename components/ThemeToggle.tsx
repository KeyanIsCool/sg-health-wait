'use client';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', t);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = (typeof localStorage !== 'undefined' && (localStorage.getItem('theme') as Theme | null)) || 'system';
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const cycle = () => {
    const next: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch {}
    applyTheme(next);
  };

  const label = theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Auto';
  const icon  = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🖥️';

  return (
    <button type="button" onClick={cycle} className="chip" aria-label={`Theme: ${label}. Click to change.`} title={`Theme: ${label}`}>
      <span aria-hidden>{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
