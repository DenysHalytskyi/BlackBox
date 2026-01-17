// Назва сховища (кешу)
var cacheName = 'blackbox-v1';
// Список файлів, які треба зберегти для роботи офлайн
var filesToCache = [
    'index.html',
    'style.css',
    'app.js',
    'manifest.json'
];

// Подія встановлення: зберігаємо файли в кеш
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Подія активації: видаляємо старі версії кешу, якщо вони є
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(thisCacheName) {
                    if (thisCacheName !== cacheName) {
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});

// Подія запиту: якщо немає інтернету, беремо файли з кешу
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});