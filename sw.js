// Service Worker — Jules Adventure CM1
// Version 7 : guide tuiles (data-guide + event delegation)

const CACHE_NAME = "jules-adventure-v7";
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

// Activation : nettoyage anciens caches + notification rechargement
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
            .then(() => self.clients.matchAll({ type: "window" }))
            .then(clients => {
                // Demande à toutes les pages ouvertes de se recharger
                clients.forEach(client => client.postMessage({ type: "SW_UPDATED" }));
            })
    );
});

// Fetch : réseau d'abord pour HTML/SW/manifest, cache pour le reste
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);
    const isCore = url.pathname === "/" ||
                   url.pathname.endsWith(".html") ||
                   url.pathname.endsWith("sw.js") ||
                   url.pathname.endsWith("manifest.json");

    if (isCore) {
        // Fichiers principaux : réseau en priorité (toujours à jour)
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response && response.status === 200 && response.type === "basic") {
                        const toCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
                    }
                    return response;
                })
                .catch(() => caches.match(event.request)
                    .then(cached => cached || caches.match("./App_Jules_Tablette.html"))
                )
        );
    } else {
        // Assets (images, fonts…) : cache en priorité
        event.respondWith(
            caches.match(event.request).then(cached => {
                if (cached) return cached;
                return fetch(event.request).then(response => {
                    if (response && response.status === 200 && response.type === "basic") {
                        const toCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
                    }
                    return response;
                });
            }).catch(() => caches.match("./App_Jules_Tablette.html"))
        );
    }
});
