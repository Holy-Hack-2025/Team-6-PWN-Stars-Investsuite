// dummy service worker to allow installing as PWA

self.addEventListener('install', (event) => {
    console.log('Service Worker Installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker Activated');
});
