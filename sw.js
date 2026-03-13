self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => clients.claim());
self.addEventListener('fetch', e => {
  if (e.request.method === 'GET' && !e.request.url.includes('rawg.io'))
    e.respondWith(caches.open('gd1').then(c => c.match(e.request).then(r => r || (fetch(e.request).then(res => { c.put(e.request, res.clone()); return res })))));
});
