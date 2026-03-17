const CACHE_NAME = 'simplikit-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/workspace.html',
  '/js/api.js',
  '/js/auth.js',
  '/js/dashboard.js',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
];

// Install Service Worker & Simpan Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ambil dari Cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return file dari cache jika ada, jika tidak ambil dari internet
        return response || fetch(event.request);
      })
  );
});
