// Service Worker — Jules Adventure CM1
// Version 4 : cache-first + stratégie réseau de secours

const CACHE_NAME = "jules-adventure-v4";
const ASSETS_TO_CACHE = [
    "./",
    "./App_Jules_Tablette.html",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
];

// Installation : mise en cache des ressources statiques
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting(); // Activation immédiate sans attendre
});

// Activation : nettoyage des anciens caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim(); // Contrôle immédiat de tous les onglets
});

// Fetch : cache-first, réseau en fallback
self.addEventListener("fetch", event => {
    // Ne traiter que les requêtes GET
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached; // Servi depuis le cache (mode offline OK)
            return fetch(event.request).then(response => {
                // Mettre en cache les nouvelles ressources locales
                if (response && response.status === 200 && response.type === "basic") {
                    const toCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
                }
                return response;
            });
        }).catch(() => {
            // Fallback ultime si réseau coupé et ressource non en cache
            return caches.match("./App_Jules_Tablette.html");
        })
    );
});
