function loadScripts(paths) {
  const version = window.__WANTED_VERSION || document.querySelector('meta[name="app-version"]')?.content;
  const filteredPaths = window.__WANTED_DATA_BUNDLED
    ? paths.filter(p => !p.startsWith('js/data/'))
    : paths;

  if (filteredPaths.length === 0) return Promise.resolve();

  return Promise.all(
    filteredPaths.map(
      (rawSrc) =>
        new Promise((resolve) => {
          let src = rawSrc;
          if (version) {
            const hasQuery = src.includes('?');
            if (/[?&]v=/.test(src)) {
              src = src.replace(/([?&]v=)[^&]*/, `$1${encodeURIComponent(version)}`);
            } else {
              src = `${src}${hasQuery ? '&' : '?'}v=${encodeURIComponent(version)}`;
            }
          }

          const s = document.createElement("script");
          s.src = src;
          s.async = false;
          s.onload = () => resolve();
          s.onerror = () => {
            console.warn("Skipping missing script:", src);
            resolve();
          };
          document.head.appendChild(s);
        })
    )
  );
}

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
