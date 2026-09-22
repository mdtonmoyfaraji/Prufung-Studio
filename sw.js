/* =========================================================================
   Prüfungsstudio — Service Worker
   Macht die App installierbar und offlinefähig:
   - Die App-Hülle (index.html, Manifest, Icons) wird beim ersten Besuch
     im Cache abgelegt und danach "cache-first" ausgeliefert.
   - Modelltest-Listen (api/library.js, library.php) und Modelltest-JSON aus
     modeltest/ werden "network-first" geladen und zusätzlich im Cache
     abgelegt, damit sie offline aus dem letzten bekannten Stand verfügbar
     bleiben.
   - Google-Fonts-Dateien werden nach dem ersten Laden ebenfalls gecacht.
   - Alles andere (insbesondere KI-Aufrufe an fremde Adressen und alle
     POST-Anfragen) läuft unverändert direkt über das Netzwerk — der
     Service Worker mischt sich dort nicht ein.
   ======================================================================= */
"use strict";

const VERSION = "ps-cache-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png"
];

const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
const LIBRARY_PATTERN = /(^|\/)(api\/library\.js|library\.php)(\?|$)/;
const MODELTEST_PATTERN = /\/modeltest\//;

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(() => {}) // don't block install if e.g. one icon 404s during dev
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* cache-first, falling back to network and re-populating the cache */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const res = await fetch(request);
  if (res && res.ok) {
    const cache = await caches.open(VERSION);
    cache.put(request, res.clone());
  }
  return res;
}

/* network-first, falling back to the last cached copy when offline */
async function networkFirst(request) {
  try {
    const res = await fetch(request, { cache: "no-cache" });
    if (res && res.ok) {
      const cache = await caches.open(VERSION);
      cache.put(request, res.clone());
    }
    return res;
  } catch (e) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw e;
  }
}

/* always try the network for the app shell so updates land quickly;
   fall back to the cached shell the moment the network is unavailable */
async function shellFirst(request) {
  try {
    const res = await fetch(request);
    if (res && res.ok) {
      const cache = await caches.open(VERSION);
      cache.put(request, res.clone());
    }
    return res;
  } catch (e) {
    const cached = await caches.match(request) || await caches.match("./index.html");
    if (cached) return cached;
    throw e;
  }
}

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return; // let POSTs (KI-Aufrufe etc.) pass through untouched

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  /* navigations -> the app shell itself */
  if (req.mode === "navigate") {
    event.respondWith(shellFirst(new Request("./index.html", { credentials: "same-origin" })));
    return;
  }

  if (sameOrigin) {
    if (LIBRARY_PATTERN.test(url.pathname) || MODELTEST_PATTERN.test(url.pathname)) {
      event.respondWith(networkFirst(req));
      return;
    }
    event.respondWith(cacheFirst(req));
    return;
  }

  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  /* everything else (KI-Endpunkt, GitHub API, …): normal network, untouched */
});
