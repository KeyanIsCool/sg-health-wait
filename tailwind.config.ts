import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-soft': 'var(--bg-soft)',
        'bg-raised': 'var(--bg-raised)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-muted': 'var(--ink-muted)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        brand: 'var(--brand)',
        'brand-dark': 'var(--brand-dark)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: { card: 'var(--radius)' },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        card: 'var(--shadow)',
        pop: 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
};
export default config;
