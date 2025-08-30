import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';

export default function Toasts() {
  const { t } = useI18n();
  const [items, setItems] = useState([]);

  useEffect(() => {
    function onErr(e) {
      const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
      const msg = e.detail?.message || t('genericError');
      setItems((list) => [...list, { id, msg }]);
      setTimeout(() => {
        setItems((list) => list.filter((x) => x.id !== id));
      }, 5000);
    }
    window.addEventListener('cineverse-error', onErr);
    return () => window.removeEventListener('cineverse-error', onErr);
  }, [t]);

  if (items.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {items.map((it) => (
        <div key={it.id} className="bg-red-600 text-white px-4 py-2 rounded shadow flex items-center gap-3">
          <span>⚠️</span>
          <span className="text-sm">{it.msg}</span>
          <button className="ml-2 text-white/90 hover:text-white" onClick={() => setItems((list) => list.filter((x) => x.id !== it.id))}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
