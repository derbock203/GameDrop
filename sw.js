self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== 'gd2').map(k => caches.delete(k))))); clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method === 'GET' && !e.request.url.includes('rawg.io'))
    e.respondWith(caches.open('gd2').then(c => c.match(e.request).then(r => r || (fetch(e.request).then(res => { c.put(e.request, res.clone()); return res })))));
});
