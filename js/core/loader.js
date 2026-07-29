function loadScripts(paths) {
  return Promise.all(
    paths.map(
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
