const __MANIFEST_youtubers = [
  "js/data/youtubers/creator-1.js",
  "js/data/youtubers/creator-2.js",
  "js/data/youtubers/creator-3.js",
  "js/data/youtubers/creator-4.js"
];

const YOUTUBER_VIDEOS_URL = 'https://wanted-youtube-videos.the-davy-devv.workers.dev/youtube/videos';
window.WANTED_YOUTUBER_VIDEO_CLICK_URL = 'https://wanted-youtube-videos.the-davy-devv.workers.dev/youtube/click';

const YOUTUBER_FETCH_TIMEOUT_MS = 12000;
const YOUTUBER_MAX_ATTEMPTS = 3;
const YOUTUBER_RETRY_BASE_MS = 1500;
const YOUTUBER_VIDEO_LIMIT = 3;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function isVideoReady(video) {
  try {
    const url = new URL(video?.link);
    return url.protocol === 'https:'
      && url.hostname === 'www.youtube.com'
      && url.pathname === '/watch'
      && /^[\w-]{6,20}$/.test(url.searchParams.get('v') || '');
  } catch (_) {
    return false;
  }
}

async function fetchYoutuberVideosOnce(handles) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), YOUTUBER_FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(`${YOUTUBER_VIDEOS_URL}?handles=${handles.map(encodeURIComponent).join(',')}`, {
      signal: controller.signal
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function refreshYoutuberVideos(youtubers) {
  const handles = youtubers.map(creator => {
    try {
      return new URL(creator.channelUrl).pathname.match(/^\/@([^/]+)/)?.[1];
    } catch (_) {
      return null;
    }
  }).filter(Boolean);
  if (!handles.length) return false;

  let payload = null;
  for (let attempt = 1; attempt <= YOUTUBER_MAX_ATTEMPTS; attempt++) {
    payload = await fetchYoutuberVideosOnce(handles);
    if (payload?.videos) break;
    if (attempt < YOUTUBER_MAX_ATTEMPTS) await wait(YOUTUBER_RETRY_BASE_MS * attempt);
  }
  if (!payload?.videos || typeof payload.videos !== 'object') return false;

  youtubers.forEach(creator => {
    const handle = creator.channelUrl.match(/\/@([^/]+)/)?.[1];
    const handleVideos = handle && payload.videos[handle];
    creator.videos = (Array.isArray(handleVideos) ? handleVideos : [])
      .filter(isVideoReady)
      .slice(0, YOUTUBER_VIDEO_LIMIT);
  });

  return youtubers.some(creator => creator.videos.length > 0);
}

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.YOUTUBER_VIDEOS_STATUS = 'loading';
window.YOUTUBER_DATA_READY = loadScripts(__MANIFEST_youtubers).then(() => {
  try {
    const youtubers = __MANIFEST_youtubers.flatMap(path => {
      const filename = path.split('/').pop().replace('.js', '');
      const varName = 'YOUTUBER_' + filename.toUpperCase().replace(/-/g, '_');
      const data = window[varName];
      if (!data) {
        console.warn(`youtubers.js: expected "${varName}" from "${path}" but it was not found.`);
        return [];
      }
      return [data];
    });
    window.YOUTUBERS_DATA = youtubers;
    document.dispatchEvent(new CustomEvent('youtuberDataReady'));
    return youtubers;
  } catch (err) {
    console.error("Failed building data for js/registry/youtubers.js:", err);
    return [];
  }
});
window.__WANTED_LOADERS.push(window.YOUTUBER_DATA_READY);

// Videos are merged only once their stats are complete, then a single update event fires.
window.YOUTUBER_VIDEOS_READY = window.YOUTUBER_DATA_READY.then(async youtubers => {
  const hasUsableResults = await refreshYoutuberVideos(youtubers);
  window.YOUTUBER_VIDEOS_STATUS = hasUsableResults ? 'ready' : 'error';
  document.dispatchEvent(new CustomEvent('youtuberVideosUpdated'));
  return youtubers;
});
