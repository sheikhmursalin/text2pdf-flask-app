// Cache name & files (चाहें तो बाद में expand करना)
const CACHE = "text2pdf-cache-v1";
const OFFLINE_URLS = [
  "/",
  "/static/css/styles.css",
  "/static/js/main.js",
  "/static/icons/icon-192.png"
];

// Install → cache basic assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

// Fetch → try network first, else cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
