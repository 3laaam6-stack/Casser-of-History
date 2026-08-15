const CACHE_NAME = 'caeser-v2';
const urlsToCache = [
  './',
  './Caeser.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});
// ==================== SERVICE WORKER ====================
const CACHE_NAME = 'mohamed-allam-v1';
const urlsToCache = [
  './',
  './Mohamed_Allam.html'
];

// تثبيت الـ Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('✅ Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// تفعيل الـ Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});

// جلب الملفات من الكاش
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});

// استقبال Push Notifications
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'إشعار جديد من أستاذ محمد علام',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📜</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📜</text></svg>',
    dir: 'rtl',
    lang: 'ar',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification('أستاذ محمد علام', options)
  );
});

// عند الضغط على الإشعار
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});
