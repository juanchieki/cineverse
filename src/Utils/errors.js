export function reportError(message) {
  try {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cineverse-error', { detail: { message } }));
    }
    console.error('[CineVerse]', message);
  } catch {
    /* noop */
  }
}
