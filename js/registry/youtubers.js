const __MANIFEST_youtubers = [
  "js/data/youtubers/creator-1.js",
  "js/data/youtubers/creator-2.js",
  "js/data/youtubers/creator-3.js"
];

const YOUTUBER_VIDEOS_URL = 'https://wanted-youtube-videos.the-davy-devv.workers.dev/youtube/videos';

async function refreshYoutuberVideos(youtubers) {
  const handles = youtubers.map(creator => {
    try {
      return new URL(creator.channelUrl).pathname.match(/^\/@([^/]+)/)?.[1];
    } catch (_) {
      return null;
    }
  }).filter(Boolean);

  if (!handles.length) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${YOUTUBER_VIDEOS_URL}?handles=${handles.map(encodeURIComponent).join(',')}`, {
      signal: controller.signal,
      cache: 'no-store'
    });
    if (!response.ok) return;

    const payload = await response.json();
    youtubers.forEach(creator => {
      const handle = creator.channelUrl.match(/\/@([^/]+)/)?.[1];
      const videos = handle && payload.videos?.[handle];
      if (Array.isArray(videos)) creator.videos = videos;
    });
  } catch (error) {
    console.warn('YouTuber video refresh unavailable; using cached data.', error);
  } finally {
    clearTimeout(timeout);
  }
}

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
window.__WANTED_LOADERS.push(loadScripts(__MANIFEST_youtubers).then(async () => {
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
    await refreshYoutuberVideos(youtubers);
    window.YOUTUBERS_DATA = youtubers;
  } catch (err) {
    console.error("Failed building data for js/registry/youtubers.js:", err);
  }
}));
