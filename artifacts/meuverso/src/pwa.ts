import { useEffect, useState } from 'react';

type PwaState = {
  online: boolean;
  offlineReady: boolean;
  updateAvailable: boolean;
  error: string | null;
  applyUpdate: () => void;
};

export function usePwa(): PwaState {
  const [online, setOnline] = useState(navigator.onLine);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const onlineChange = () => setOnline(navigator.onLine);
    window.addEventListener('online', onlineChange);
    window.addEventListener('offline', onlineChange);
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
      if (!('serviceWorker' in navigator)) setError('O modo offline não está disponível neste navegador.');
      return () => { window.removeEventListener('online', onlineChange); window.removeEventListener('offline', onlineChange); };
    }
    let alive = true;
    let current: ServiceWorkerRegistration | undefined;
    const onControllerChange = () => {
      if (applying && alive) window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
      .then(async (reg) => {
        current = reg;
        if (!alive) return;
        setRegistration(reg);
        setOfflineReady(true);
        if (reg.waiting) setUpdateAvailable(true);
        reg.addEventListener('updatefound', () => {
          const worker = reg.installing;
          worker?.addEventListener('statechange', () => {
            if (alive && worker.state === 'installed' && navigator.serviceWorker.controller) setUpdateAvailable(true);
          });
        });
        try { await reg.update(); } catch { /* The installed app remains usable offline. */ }
      })
      .catch(() => {
        if (alive) setError('Não foi possível preparar o uso offline. Verifique a conexão e recarregue o app.');
      });
    return () => {
      alive = false;
      window.removeEventListener('online', onlineChange);
      window.removeEventListener('offline', onlineChange);
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      void current;
    };
  }, [applying]);

  const applyUpdate = () => {
    const worker = registration?.waiting;
    if (worker) {
      setApplying(true);
      worker.postMessage({ type: 'SKIP_WAITING' });
    }
  };
  return { online, offlineReady, updateAvailable, error, applyUpdate };
}
