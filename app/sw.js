// import workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

// allow new SW to take over
workbox.skipWaiting();
workbox.clientsClaim();

// Cache .js files - cache First
workbox.routing.registerRoute(/\.js$/, workbox.strategies.cacheFirst());
