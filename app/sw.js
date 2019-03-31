/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "0af5515e95a7182aa41183c88b5c0162"
  },
  {
    "url": "main.js",
    "revision": "a6f69fb67b2c5f30af609289cf4ff85a"
  },
  {
    "url": "Classes/Camera.js",
    "revision": "e5f3e0b2318f3d030daf1f5ad9d54233"
  },
  {
    "url": "Classes/Message.js",
    "revision": "6756128010db843f8ce16501ca259b70"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(css|js)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https:\/\/use\.fontawesome\.com.*/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"fonteawesome", plugins: [] }), 'GET');
