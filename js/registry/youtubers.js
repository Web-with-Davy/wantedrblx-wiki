const __MANIFEST_youtubers = [
  "js/data/youtubers/creator-1.js",
  "js/data/youtubers/creator-2.js",
  "js/data/youtubers/creator-3.js",
  "js/data/youtubers/creator-4.js"
];

const YOUTUBER_VIDEOS_URL = 'https://wanted-youtube-videos.the-davy-devv.workers.dev/youtube/videos';
window.WANTED_YOUTUBER_VIDEO_CLICK_URL = 'https://wanted-youtube-videos.the-davy-devv.workers.dev/youtube/click';

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
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(
      `${YOUTUBER_VIDEOS_URL}?handles=${handles.map(encodeURIComponent).join(',')}`,
      { signal: controller.signal }
    );
    if (!response.ok) return;
    const payload = await response.json();

    youtubers.forEach(creator => {
      const handle = creator.channelUrl.match(/\/@([^/]+)/)?.[1];
      const videos = handle && payload.videos?.[handle];
      if (Array.isArray(videos)) {
        const mergedVideos = [...videos, ...(creator.videos || [])];
        const seenLinks = new Set();
        creator.videos = mergedVideos.filter(video => {
          if (!video?.link || seenLinks.has(video.link)) return false;
          seenLinks.add(video.link);
          return true;
        }).slice(0, 3);
      }
    });
  } catch (error) {
    console.warn('YouTuber video refresh unavailable; using cached data.', error);
  } finally {
    clearTimeout(timeout);
  }
}

window.__WANTED_LOADERS = window.__WANTED_LOADERS || [];
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
    return youtubers;
  } catch (err) {
    console.error("Failed building data for js/registry/youtubers.js:", err);
    return [];
  }
});
window.__WANTED_LOADERS.push(window.YOUTUBER_DATA_READY);
window.YOUTUBER_VIDEOS_READY = window.YOUTUBER_DATA_READY.then(youtubers =>
  refreshYoutuberVideos(youtubers).then(() => {
    document.dispatchEvent(new CustomEvent('youtuberVideosUpdated'));
    return youtubers;
  })
);
