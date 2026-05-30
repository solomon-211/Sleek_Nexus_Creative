// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js', { updateViaCache: 'none' })
      .then(registration => {
        console.log('[OK] Service Worker registered:', registration.scope);

        // Force update checks so clients pick up new SW quickly after deploys.
        registration.update().catch(() => {});
        setInterval(() => registration.update().catch(() => {}), 60 * 1000);

        // One-time cleanup of old sleek caches to prevent stale CSS payloads.
        const cacheMigrationKey = 'sleek_cache_migration_v1_1';
        if ('caches' in window && localStorage.getItem(cacheMigrationKey) !== 'done') {
          caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k.startsWith('sleek-')).map((k) => caches.delete(k))))
            .then(() => localStorage.setItem(cacheMigrationKey, 'done'))
            .catch(() => {});
        }
      })
      .catch(error => {
        console.log('[ERROR] Service Worker registration failed:', error);
      });

    // Refresh page when a new service worker takes control.
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}
