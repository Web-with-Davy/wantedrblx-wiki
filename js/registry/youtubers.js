const __MANIFEST_youtubers = [
  "js/data/youtubers/creator-1.js",
  "js/data/youtubers/creator-2.js",
  "js/data/youtubers/creator-3.js",
  "js/data/youtubers/creator-4.js"
];

const YOUTUBER_VIDEOS_URL = 'https://wanted-youtube-videos.the-davy-devv.workers.dev/youtube/videos';
const YOUTUBER_STATS_URL = 'https://wanted-youtube-videos.the-davy-devv.workers.dev/youtube/stats';
const YOUTUBER_VIDEOS_CACHE_VERSION = '20261106-6';
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
      `${YOUTUBER_VIDEOS_URL}?handles=${handles.map(encodeURIComponent).join(',')}&v=${YOUTUBER_VIDEOS_CACHE_VERSION}`,
      { signal: controller.signal }
    );
    if (!response.ok) return;
    const payload = await response.json();

    youtubers.forEach(creator => {
      const handle = creator.channelUrl.match(/\/@([^/]+)/)?.[1];
      const videos = handle && payload.videos?.[handle];
      if (Array.isArray(videos)) {
        const existingByLink = new Map((creator.videos || [])
          .filter(video => video?.link)
          .map(video => [video.link, video]));
        const mergedVideos = videos.map(video => {
          const existing = existingByLink.get(video.link) || {};
          return {
            ...existing,
            ...video,
            views: Number.isFinite(video.views) ? video.views : (existing.views ?? null),
            likes: Number.isFinite(video.likes) ? video.likes : (existing.likes ?? null),
            clicks: Number.isFinite(video.clicks) ? video.clicks : (existing.clicks || 0)
          };
        });
        const remoteLinks = new Set(mergedVideos.map(video => video.link));
        creator.videos = [...mergedVideos, ...(creator.videos || []).filter(video =>
          video?.link && !remoteLinks.has(video.link)
        )];
      }
    });
  } catch (error) {
    console.warn('YouTuber video refresh unavailable; using cached data.', error);
  } finally {
    clearTimeout(timeout);
  }
}

async function refreshYoutuberStats(youtubers) {
  const videoIdFromLink = link => link?.match(/[?&]v=([\w-]+)/)?.[1];
  const ids = [...new Set(youtubers.flatMap(creator =>
    (creator.videos || []).map(video => videoIdFromLink(video.link)).filter(Boolean)
  ))];
  if (!ids.length) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(`${YOUTUBER_STATS_URL}?ids=${ids.map(encodeURIComponent).join(',')}`, {
      signal: controller.signal
    });
    if (!response.ok) return;
    const payload = await response.json();
    const statsById = payload.stats || {};

    youtubers.forEach(creator => {
      creator.videos = (creator.videos || []).flatMap(video => {
        const stats = statsById[videoIdFromLink(video.link)];
        if (stats?.isLive) return [];
        return [{
          ...video,
          views: Number.isFinite(stats?.views) ? stats.views : video.views,
          likes: Number.isFinite(stats?.likes) ? stats.likes : video.likes
        }];
      }).slice(0, 3);
    });
  } catch (error) {
    console.warn('YouTuber video stats unavailable; using cached data.', error);
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
    document.dispatchEvent(new CustomEvent('youtuberDataReady'));
    return youtubers;
  } catch (err) {
    console.error("Failed building data for js/registry/youtubers.js:", err);
    return [];
  }
});
window.YOUTUBER_STATS_READY = Promise.resolve();
window.YOUTUBER_VIDEOS_READY = window.YOUTUBER_DATA_READY.then(async youtubers => {
  await refreshYoutuberVideos(youtubers);
  window.YOUTUBER_STATS_READY = refreshYoutuberStats(youtubers).then(() => {
    return youtubers;
  });
  await window.YOUTUBER_STATS_READY;
  document.dispatchEvent(new CustomEvent('youtuberVideosUpdated'));
  return youtubers;
});
