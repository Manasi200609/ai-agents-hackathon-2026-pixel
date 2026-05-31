const CACHE_NAME = 'vaidya-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
];

// Install — cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', (event) => {

  // Ignore API requests
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(

    caches.match(event.request).then((cached) => {

      // Return cached asset if available
      if (cached) {
        return cached;
      }

      return fetch(event.request)

        .catch(() => {

          // React SPA fallback
          return caches.match('/index.html');

        });

    })

  );

});