const YOUTUBE_STATS_CACHE_SECONDS = 900;
const YOUTUBE_FAILED_STATS_CACHE_SECONDS = 30;
const YOUTUBE_THROTTLED_STATS_CACHE_SECONDS = 300;
const YOUTUBE_RESPONSE_CACHE_SECONDS = 60;
const UPSTREAM_TIMEOUT_MS = 5000;
const YOUTUBE_VIDEO_LIMIT = 3;
const YOUTUBE_CANDIDATE_LIMIT = 15;
const YOUTUBE_STATS_CONCURRENCY = 6;
const YOUTUBE_CHANNEL_IDS = {
  Borgaboo: 'UCWZ4-zS2eeZA3lnOj7gQrrg',
  CeeJay_: 'UCHf5I37Mbk56eWNW-pXgBdA',
  ZDMD: 'UC9sVkmJIWkOrXI0pUW8M87g',
  Revndetta: 'UCUzNDXbOHPF10m4kR9KZ6rQ'
};
const YOUTUBE_HANDLE_DEADLINE_MS = 12000;
const YOUTUBE_STATS_TIMEOUT_MS = 3000;
const YOUTUBE_PARTIAL_CACHE_SECONDS = 60;
const VIDEO_ID_PATTERN = /^[\w-]{6,20}$/;
const YOUTUBE_WATCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cookie': 'CONSENT=YES+cb.20240101-00-p0.en+FX+001; SOCS=CAI'
};

async function fetchWithTimeout(input, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function withDeadline(promise, ms, fallback) {
  let timer;
  const timeout = new Promise(resolve => {
    timer = setTimeout(() => resolve(fallback), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function decodeXml(value) {
  return String(value || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function xmlValue(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
  return decodeXml(match && match[1]);
}

function parseYoutubeFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map(match => {
    const entry = match[1];
    const videoId = xmlValue(entry, 'yt:videoId');
    const title = xmlValue(entry, 'title');
    const published = xmlValue(entry, 'published');
    const thumbnail = entry.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1]
      || `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
    return { videoId, title, published, thumbnail };
  }).filter(video => video.videoId && video.title);
}

function extractJsonObject(html, marker) {
  const markerIndex = html.indexOf(marker);
  if (markerIndex === -1) return null;
  const jsonStart = html.indexOf('{', markerIndex + marker.length);
  if (jsonStart === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = jsonStart; index < html.length; index++) {
    const character = html[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') inString = true;
    else if (character === '{') depth++;
    else if (character === '}' && --depth === 0) {
      try {
        return JSON.parse(html.slice(jsonStart, index + 1));
      } catch (_) {
        return null;
      }
    }
  }
  return null;
}

function parseCompactNumber(raw) {
  const match = String(raw ?? '').trim().match(/^([\d.,]+)\s*([KMB])?/i);
  if (!match) return null;
  const suffix = (match[2] || '').toUpperCase();
  const number = suffix
    ? Number(match[1].replace(',', '.'))
    : Number(match[1].replace(/[,.]/g, ''));
  const multiplier = { K: 1e3, M: 1e6, B: 1e9 }[suffix] || 1;
  return Number.isFinite(number) ? Math.round(number * multiplier) : null;
}

function parseLikeCount(html) {
  const along = html.match(/"accessibilityText"\s*:\s*"like this video along with ([^"]+?) other/i);
  if (along) {
    const count = parseCompactNumber(along[1]);
    if (count !== null) return count + 1;
  }

  const accessible = html.match(/"likeCountA11y"\s*:\s*"([^"]*?)\s*likes?"/i);
  return accessible ? parseCompactNumber(accessible[1]) : null;
}

function parseViewCount(html, player) {
  const playerCount = parseCompactNumber(player?.videoDetails?.viewCount);
  if (playerCount !== null) return playerCount;

  const rawCount = html.match(/"viewCount"\s*:\s*"?([\d,.]+)"?/i);
  if (rawCount) {
    const count = parseCompactNumber(rawCount[1]);
    if (count !== null) return count;
  }

  const label = html.match(/"(?:simpleText|label)"\s*:\s*"([\d,.]+\s*[KMB]?)\s+views?\b/i);
  return label ? parseCompactNumber(label[1]) : null;
}

async function fetchVideoStats(videoId, cache, cacheOrigin, env) {
  const cacheKey = new Request(`${cacheOrigin}/_internal/video-stats/v1/${videoId}`);
  try {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      const cachedStats = await cachedResponse.json();
      const reusableStats = {
        ...cachedStats,
        updatedAt: cachedStats.updatedAt || Date.now()
      };
      await saveVideoStats(env, videoId, reusableStats).catch(() => {});
      return reusableStats;
    }
  } catch (error) {
    console.warn(`YouTube stats cache read failed for ${videoId}`);
  }

  const saveStats = async (stats, ttlOverride) => {
    const hasStats = Number.isFinite(stats.views) || Number.isFinite(stats.likes);
    const ttl = ttlOverride || (hasStats ? YOUTUBE_STATS_CACHE_SECONDS : YOUTUBE_FAILED_STATS_CACHE_SECONDS);
    try {
      await cache.put(cacheKey, new Response(JSON.stringify(stats), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `public, max-age=${ttl}, s-maxage=${ttl}`
        }
      }));
    } catch (error) {
      console.warn(`YouTube stats cache write failed for ${videoId}`);
    }
    await saveVideoStats(env, videoId, stats).catch(() => {});
    return stats;
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), YOUTUBE_STATS_TIMEOUT_MS);
  try {
    const response = await fetch(
      `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&hl=en`,
      { headers: YOUTUBE_WATCH_HEADERS, signal: controller.signal }
    );
    if (!response.ok) {
      console.warn(`YouTube stats request for ${videoId} returned HTTP ${response.status}`);
      const retryAfter = Number(response.headers.get('Retry-After'));
      const retryTtl = response.status === 429
        ? Math.max(YOUTUBE_THROTTLED_STATS_CACHE_SECONDS, Number.isFinite(retryAfter) ? retryAfter : 0)
        : YOUTUBE_FAILED_STATS_CACHE_SECONDS;
      return saveStats({ views: null, likes: null }, retryTtl);
    }

    const html = await response.text();
    const player = extractJsonObject(html, 'ytInitialPlayerResponse = ');
    const views = parseViewCount(html, player);
    const likes = parseLikeCount(html);
    if (views === null || likes === null) {
      console.warn(`YouTube stats incomplete for ${videoId}: player=${Boolean(player?.videoDetails)} views=${views !== null} likes=${likes !== null} bytes=${html.length}`);
    }
    return saveStats({
      views,
      likes,
      updatedAt: views !== null || likes !== null ? Date.now() : null
    });
  } catch (_) {
    console.warn(`YouTube stats request failed or timed out for ${videoId}`);
    return saveStats({ views: null, likes: null });
  } finally {
    clearTimeout(timer);
  }
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index], index);
    }
  }));
  return results;
}

async function resolveChannelId(handle) {
  if (YOUTUBE_CHANNEL_IDS[handle]) return YOUTUBE_CHANNEL_IDS[handle];

  const response = await fetchWithTimeout(`https://www.youtube.com/@${encodeURIComponent(handle)}?hl=en`, {
    redirect: 'follow',
    headers: YOUTUBE_WATCH_HEADERS
  });
  if (!response.ok) return null;

  const html = await response.text();
  return html.match(/(?:"channelId"|"externalId")\s*:\s*"(UC[^"]+)"/)?.[1] || null;
}

async function getVideoMetrics(env, videoId) {
  if (!env.VIDEO_ANALYTICS || !VIDEO_ID_PATTERN.test(videoId)) {
    return { clicks: 0, views: null, likes: null };
  }

  const id = env.VIDEO_ANALYTICS.idFromName('video-clicks');
  const stub = env.VIDEO_ANALYTICS.get(id);
  const response = await stub.fetch(`https://analytics/count?videoId=${encodeURIComponent(videoId)}`);
  if (!response.ok) return { clicks: 0, views: null, likes: null };

  const payload = await response.json();
  return {
    clicks: Number.isFinite(payload.clicks) ? payload.clicks : 0,
    views: Number.isFinite(payload.views) ? payload.views : null,
    likes: Number.isFinite(payload.likes) ? payload.likes : null,
    statsUpdatedAt: Number.isFinite(payload.statsUpdatedAt) ? payload.statsUpdatedAt : null
  };
}

async function saveVideoStats(env, videoId, stats) {
  if (!env.VIDEO_ANALYTICS || (!Number.isFinite(stats.views) && !Number.isFinite(stats.likes))) return;
  const id = env.VIDEO_ANALYTICS.idFromName('video-clicks');
  const stub = env.VIDEO_ANALYTICS.get(id);
  await stub.fetch(`https://analytics/stats?videoId=${encodeURIComponent(videoId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stats)
  });
}

async function getWantedVideos(handle, env) {
  const channelId = await resolveChannelId(handle);
  if (!channelId) {
    console.warn(`YouTube discovery for ${handle}: channelId=unresolved feedEntries=0 titleMatches=0 curatedResolved=0`);
    return { videos: [], complete: false };
  }

  const feedResponse = await fetchWithTimeout(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    headers: { 'User-Agent': 'Wanted Wiki video updater' }
  }).catch(() => null);
  const feedEntries = feedResponse?.ok ? parseYoutubeFeed(await feedResponse.text()) : [];
  const candidates = [...new Map(feedEntries
    .slice(0, YOUTUBE_CANDIDATE_LIMIT)
    .filter(video => VIDEO_ID_PATTERN.test(video.videoId) && /\bwanted\b/i.test(video.title))
    .map(video => [video.videoId, video])).values()]
    .sort((a, b) => (Date.parse(b.published) || 0) - (Date.parse(a.published) || 0))
    .slice(0, YOUTUBE_VIDEO_LIMIT);
  const videos = await Promise.all(candidates.map(async candidate => {
    const metrics = await getVideoMetrics(env, candidate.videoId).catch(() => ({
      clicks: 0,
      views: null,
      likes: null
    }));
    return {
      videoId: candidate.videoId,
      title: candidate.title,
      thumbnail: candidate.thumbnail,
      link: `https://www.youtube.com/watch?v=${candidate.videoId}`,
      published: candidate.published,
      views: metrics.views,
      likes: metrics.likes,
      statsUpdatedAt: metrics.statsUpdatedAt,
      clicks: metrics.clicks
    };
  }));

  console.info(`YouTube RSS discovery for ${handle}: channelId=${channelId} feedEntries=${feedEntries.length} selected=${videos.length}`);
  return { videos, complete: Boolean(feedResponse?.ok) };
}

function responseHeaders(cacheControl = 'no-store') {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://wantedrblx.com',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': cacheControl,
    'Referrer-Policy': 'no-referrer',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff'
  };
}

function withCors(response) {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', 'https://wantedrblx.com');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Vary', 'Origin');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

async function exceedsRateLimit(env, key) {
  if (!env.YOUTUBE_REFRESH_LIMITER?.limit) return false;
  try {
    const { success } = await env.YOUTUBE_REFRESH_LIMITER.limit({ key });
    return !success;
  } catch (error) {
    console.error('YouTube rate limiter unavailable; allowing request:', error);
    return false;
  }
}

async function handleYoutubeVideos(request, env) {
  const url = new URL(request.url);
  const cache = caches.default;
  const cacheUrl = new URL(url);
  cacheUrl.searchParams.set('cache_version', '11');
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });

  try {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) return withCors(cachedResponse);
  } catch (error) {
    console.error('YouTube response cache read failed; continuing:', error);
  }

  const handles = [...new Set((url.searchParams.get('handles') || '')
    .split(',')
    .map(handle => handle.trim().replace(/^@/, ''))
    .filter(handle => /^[\w.-]+$/.test(handle)))].slice(0, 20);
  if (!handles.length) {
    return new Response(JSON.stringify({ error: 'Missing handles' }), {
      status: 400,
      headers: responseHeaders()
    });
  }

  const results = await Promise.all(handles.map(handle =>
    withDeadline(
      getWantedVideos(handle, env).catch(error => {
        console.error(`YouTube refresh failed for ${handle}:`, error);
        return { videos: [], complete: false };
      }),
      YOUTUBE_HANDLE_DEADLINE_MS,
      { videos: [], complete: false }
    ).then(result => [handle, result])
  ));

  const selectedVideos = results.flatMap(([, result]) => result.videos);
  const stats = await mapWithConcurrency(
    selectedVideos,
    YOUTUBE_STATS_CONCURRENCY,
    video => Number.isFinite(video.views)
      && Number.isFinite(video.likes)
      && Number.isFinite(video.statsUpdatedAt)
      && Date.now() - video.statsUpdatedAt < YOUTUBE_STATS_CACHE_SECONDS * 1000
      ? Promise.resolve({ views: video.views, likes: video.likes })
      : fetchVideoStats(video.videoId, cache, url.origin, env)
  );
  selectedVideos.forEach((video, index) => {
    video.views = stats[index].views ?? video.views;
    video.likes = stats[index].likes ?? video.likes;
    if (Number.isFinite(stats[index].updatedAt)) video.statsUpdatedAt = stats[index].updatedAt;
  });

  const complete = results.every(([, result]) => result.complete);
  const hasVideos = results.some(([, result]) => result.videos.length > 0);
  const body = {
    complete,
    videos: Object.fromEntries(results.map(([handle, result]) => [
      handle,
      result.videos.map(({ videoId, statsUpdatedAt, ...video }) => video)
    ]))
  };

  // Cache complete results fully, partial results briefly if any videos were found
  const cacheSeconds = complete && hasVideos
    ? YOUTUBE_RESPONSE_CACHE_SECONDS
    : hasVideos
      ? YOUTUBE_PARTIAL_CACHE_SECONDS
      : 0;
  const cacheControl = cacheSeconds > 0
    ? `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}`
    : 'no-store';
  const response = new Response(JSON.stringify(body), { headers: responseHeaders(cacheControl) });

  if (cacheSeconds > 0) {
    try {
      await cache.put(cacheKey, response.clone());
    } catch (error) {
      console.error('YouTube response cache write failed; returning response:', error);
    }
  }
  return withCors(response);
}

function errorResponse(error) {
  console.error('YouTube worker request failed:', error);
  return new Response(JSON.stringify({ error: 'YouTube videos unavailable' }), {
    status: 503,
    headers: responseHeaders()
  });
}

async function handleVideoClick(request, env) {
  if (request.method !== 'POST') {
    return withCors(new Response('Method not allowed', {
      status: 405,
      headers: { 'Allow': 'POST', 'Cache-Control': 'no-store' }
    }));
  }

  const clientKey = request.headers.get('cf-connecting-ip') || 'unknown-client';
  if (await exceedsRateLimit(env, `click:${clientKey}`)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: { ...responseHeaders(), 'Retry-After': '60' }
    });
  }

  if (!env.VIDEO_ANALYTICS) {
    return new Response(JSON.stringify({ error: 'Analytics unavailable' }), {
      status: 503,
      headers: responseHeaders()
    });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (_) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: responseHeaders()
    });
  }

  const videoId = String(payload?.videoId || '');
  if (!VIDEO_ID_PATTERN.test(videoId)) {
    return new Response(JSON.stringify({ error: 'Invalid video ID' }), {
      status: 400,
      headers: responseHeaders()
    });
  }

  const id = env.VIDEO_ANALYTICS.idFromName('video-clicks');
  const stub = env.VIDEO_ANALYTICS.get(id);
  const response = await stub.fetch(`https://analytics/increment?videoId=${encodeURIComponent(videoId)}`, {
    method: 'POST'
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: responseHeaders()
  });
}

export class VideoAnalytics {
  constructor(state) {
    this.state = state;
    this.state.blockConcurrencyWhile(async () => {
      this.state.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS video_clicks (
          video_id TEXT PRIMARY KEY,
          clicks INTEGER NOT NULL DEFAULT 0
        )
      `);
      this.state.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS video_stats (
          video_id TEXT PRIMARY KEY,
          views INTEGER,
          likes INTEGER,
          updated_at INTEGER NOT NULL
        )
      `);
    });
  }

  async fetch(request) {
    const url = new URL(request.url);
    const videoId = url.searchParams.get('videoId') || '';
    if (!VIDEO_ID_PATTERN.test(videoId)) {
      return new Response(JSON.stringify({ error: 'Invalid video ID' }), { status: 400 });
    }

    if (url.pathname === '/stats' && request.method === 'POST') {
      let payload;
      try {
        payload = await request.json();
      } catch (_) {
        return new Response(JSON.stringify({ error: 'Invalid stats payload' }), { status: 400 });
      }

      const views = Number.isFinite(payload?.views) ? Math.max(0, Math.trunc(payload.views)) : null;
      const likes = Number.isFinite(payload?.likes) ? Math.max(0, Math.trunc(payload.likes)) : null;
      const updatedAt = Number.isFinite(payload?.updatedAt) ? Math.trunc(payload.updatedAt) : Date.now();
      if (views === null && likes === null) {
        return new Response(JSON.stringify({ error: 'No video stats provided' }), { status: 400 });
      }

      this.state.storage.sql.exec(
        `INSERT INTO video_stats (video_id, views, likes, updated_at) VALUES (?, ?, ?, ?)
         ON CONFLICT(video_id) DO UPDATE SET
           views = CASE WHEN excluded.updated_at >= video_stats.updated_at
             THEN COALESCE(excluded.views, video_stats.views) ELSE video_stats.views END,
           likes = CASE WHEN excluded.updated_at >= video_stats.updated_at
             THEN COALESCE(excluded.likes, video_stats.likes) ELSE video_stats.likes END,
           updated_at = MAX(video_stats.updated_at, excluded.updated_at)`,
        videoId,
        views,
        likes,
        updatedAt
      );
      return new Response(JSON.stringify({ views, likes, updatedAt }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }

    if (url.pathname === '/increment' && request.method === 'POST') {
      this.state.storage.sql.exec(
        `INSERT INTO video_clicks (video_id, clicks) VALUES (?, 1)
         ON CONFLICT(video_id) DO UPDATE SET clicks = clicks + 1`,
        videoId
      );
    }

    const result = this.state.storage.sql.exec(
      'SELECT clicks FROM video_clicks WHERE video_id = ?',
      videoId
    ).toArray()[0];
    const stats = this.state.storage.sql.exec(
      'SELECT views, likes, updated_at FROM video_stats WHERE video_id = ?',
      videoId
    ).toArray()[0];
    return new Response(JSON.stringify({
      clicks: result?.clicks || 0,
      views: stats?.views ?? null,
      likes: stats?.likes ?? null,
      statsUpdatedAt: stats?.updated_at ?? null
    }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      if (request.method === 'OPTIONS') {
        return withCors(new Response(null, { status: 204 }));
      }

      if (url.pathname === '/youtube/click') {
        return await handleVideoClick(request, env);
      }
      if (url.pathname !== '/youtube/videos') {
        return withCors(new Response('Not found', {
          status: 404,
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
            'Cache-Control': 'no-store',
            'Referrer-Policy': 'no-referrer',
            'X-Content-Type-Options': 'nosniff'
          }
        }));
      }

      if (request.method !== 'GET') {
        return withCors(new Response('Method not allowed', {
          status: 405,
          headers: { 'Allow': 'GET', 'Cache-Control': 'no-store' }
        }));
      }

      const clientKey = request.headers.get('cf-connecting-ip') || 'unknown-client';
      if (await exceedsRateLimit(env, clientKey)) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: {
            ...responseHeaders(),
            'Retry-After': '60'
          }
        });
      }

      return await handleYoutubeVideos(request, env);
    } catch (error) {
      return errorResponse(error);
    }
  }
};
