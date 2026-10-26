import type { Plugin } from 'vite';

const worker = (assets: string[]) => `const CACHE = 'meuverso-shell-v1';
const PRECACHE = ${JSON.stringify(assets)};
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE.map(path => new URL(path, self.registration.scope).href))));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('meuverso-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/__mockup/')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () => {
      const cache = await caches.open(CACHE);
      return await cache.match(new URL('index.html', self.registration.scope).href)
        || await cache.match(new URL('offline.html', self.registration.scope).href)
        || Response.error();
    }));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      void caches.open(CACHE).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});`;

export function pwaPlugin(): Plugin {
  return {
    name: 'meuverso-pwa',
    apply: 'build',
    generateBundle(_options, bundle) {
      const generatedAssets = Object.keys(bundle).filter(name =>
        name !== 'sw.js' && !name.endsWith('.map'),
      );
      const staticAssets = ['manifest.webmanifest', 'offline.html', 'icon.svg', 'favicon.svg'];
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: worker([...new Set([...generatedAssets, ...staticAssets])]),
      });
    },
  };
}
