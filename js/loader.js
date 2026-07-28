// Sequentially loads a list of classic scripts, preserving order.
// A missing/404 file is logged and skipped rather than aborting
// everything after it (matches how independent <script defer> tags
// used to behave).
function loadScripts(paths) {
  return paths.reduce(
    (chain, src) =>
      chain.then(
        () =>
          new Promise((resolve) => {
            const s = document.createElement("script");
            s.src = src;
            s.onload = () => resolve();
            s.onerror = () => {
              console.warn("Skipping missing script:", src);
              resolve();
            };
            document.head.appendChild(s);
          })
      ),
    Promise.resolve()
  );
}

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
