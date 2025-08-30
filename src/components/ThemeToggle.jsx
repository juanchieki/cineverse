import { useEffect, useState } from 'react';

const THEME_KEY = 'cineverse-theme';

export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle theme"
      className={`px-3 py-2 rounded-md bg-secondary text-text hover:opacity-90 transition ${className}`}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}
