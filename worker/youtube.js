const YOUTUBE_API_CACHE_SECONDS = 900;
const UPSTREAM_TIMEOUT_MS = 8000;
const YOUTUBE_VIDEO_LIMIT = 3;
const YOUTUBE_CHANNEL_IDS = {
  Borgaboo: 'UCWZ4-zS2eeZA3lnOj7gQrrg',
  CeeJay_: 'UCHf5I37Mbk56eWNW-pXgBdA',
  ZDMD: 'UC9sVkmJIWkOrXI0pUW8M87g'
};
const VIDEO_ID_PATTERN = /^[\w-]{6,20}$/;

async function fetchWithTimeout(input, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
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

async function resolveChannelId(handle) {
  if (YOUTUBE_CHANNEL_IDS[handle]) return YOUTUBE_CHANNEL_IDS[handle];

  const response = await fetchWithTimeout(`https://www.youtube.com/@${encodeURIComponent(handle)}?hl=en`, {
    redirect: 'follow',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!response.ok) return null;

  const html = await response.text();
  return html.match(/(?:"channelId"|"externalId")\s*:\s*"(UC[^"]+)"/)?.[1] || null;
}

function parseYoutubeMetric(html, name) {
  const match = html.match(new RegExp(`"${name}"\\s*:\\s*"?(\\d+)"?`, 'i'));
  return match ? Number(match[1]) : null;
}

async function getYoutubeVideoDetails(videoId) {
  const response = await fetchWithTimeout(`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!response.ok) return null;

  const html = await response.text();
  return {
    isLive: /"isLiveContent"\s*:\s*true|"isUpcoming"\s*:\s*true/i.test(html),
    views: parseYoutubeMetric(html, 'viewCount'),
    likes: parseYoutubeMetric(html, 'likeCount')
  };
}

async function getVideoClicks(env, videoId) {
  if (!env.VIDEO_ANALYTICS || !VIDEO_ID_PATTERN.test(videoId)) return 0;

  const id = env.VIDEO_ANALYTICS.idFromName('video-clicks');
  const stub = env.VIDEO_ANALYTICS.get(id);
  const response = await stub.fetch(`https://analytics/count?videoId=${encodeURIComponent(videoId)}`);
  if (!response.ok) return 0;

  const payload = await response.json();
  return Number.isFinite(payload.clicks) ? payload.clicks : 0;
}

async function getWantedVideos(handle, env) {
  const channelId = await resolveChannelId(handle);
  if (!channelId) return [];

  const feedResponse = await fetchWithTimeout(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    headers: { 'User-Agent': 'Wanted Wiki video updater' }
  });
  if (!feedResponse.ok) return [];

  const feed = parseYoutubeFeed(await feedResponse.text());
  const candidates = feed.filter(video => /\bwanted\b/i.test(video.title)
    && !/\b(?:live|livestream|live stream|streaming)\b/i.test(video.title));
  const videos = (await Promise.all(candidates.map(async video => {
    const details = await getYoutubeVideoDetails(video.videoId);
    if (details?.isLive) return null;
    return {
      title: video.title,
      thumbnail: video.thumbnail,
      link: `https://www.youtube.com/watch?v=${video.videoId}`,
      published: video.published,
      views: Number.isFinite(details?.views) ? details.views : null,
      likes: Number.isFinite(details?.likes) ? details.likes : null,
      clicks: await getVideoClicks(env, video.videoId)
    };
  }))).filter(Boolean).slice(0, YOUTUBE_VIDEO_LIMIT);

  return videos;
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
  const cacheKey = new Request(url.toString(), { method: 'GET' });
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

  const videos = Object.fromEntries(await Promise.all(handles.map(async handle => {
    try {
      return [handle, await getWantedVideos(handle, env)];
    } catch (error) {
      console.error(`YouTube refresh failed for ${handle}:`, error);
      return [handle, []];
    }
  })));

  const response = new Response(JSON.stringify({ videos }), {
    headers: responseHeaders(`public, max-age=${YOUTUBE_API_CACHE_SECONDS}, s-maxage=${YOUTUBE_API_CACHE_SECONDS}`)
  });
  try {
    await cache.put(cacheKey, response.clone());
  } catch (error) {
    console.error('YouTube response cache write failed; returning response:', error);
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
    });
  }

  async fetch(request) {
    const url = new URL(request.url);
    const videoId = url.searchParams.get('videoId') || '';
    if (!VIDEO_ID_PATTERN.test(videoId)) {
      return new Response(JSON.stringify({ error: 'Invalid video ID' }), { status: 400 });
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
    return new Response(JSON.stringify({ clicks: result?.clicks || 0 }), {
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
