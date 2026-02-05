const CACHE_NAME = 'blackbox-v1';

// Список усіх файлів для офлайн-режиму
const filesToCache = [
  '/BlackBox/',
  '/BlackBox/index.html',
  '/BlackBox/style.css',
  '/BlackBox/app.js',
  '/BlackBox/manifest.json'
];

// 1. Подія встановлення: записуємо файли в кеш
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Кешування ресурсів...');
      return cache.addAll(filesToCache);
    })
  );
});

// 2. Подія активації: видаляємо старі версії кешу
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Видалення старого кешу...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Перехоплення запитів: спочатку шукаємо в кеші, потім у мережі
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Якщо файл є в кеші — повертаємо його, інакше йдемо в інтернет
      return response || fetch(event.request);
    }).catch(() => {
      // Якщо немає інтернету і файлу в кеші (запасний варіант)
      return caches.match('/BlackBox/index.html');
    })
  );
});
