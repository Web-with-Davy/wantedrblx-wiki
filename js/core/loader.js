function loadScripts(paths) {
  // If the data bundle has been pre-loaded, skip any individual data file requests.
  // This eliminates 177+ HTTP requests when running with data-bundle.js.
  const filteredPaths = window.__WANTED_DATA_BUNDLED
    ? paths.filter(p => !p.startsWith('js/data/'))
    : paths;

  if (filteredPaths.length === 0) return Promise.resolve();

  return Promise.all(
    filteredPaths.map(
      (src) =>
        new Promise((resolve) => {
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

