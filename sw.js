self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('pwaready').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                'index.html?homescreen=1',
                '/?homescreen=1',
                '/styles/style.css'
            ])
            .then(() => self.skipWaiting())
        })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    )
});
