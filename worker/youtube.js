const ALLOWED_ORIGIN = 'https://wantedrblx.com';
const UPSTREAM_TIMEOUT_MS = 6000;
const VIDEO_LIMIT = 3;
const CANDIDATES_PER_CHANNEL = 8;
const MAX_HANDLES = 8;
const MAX_STATS_IDS = VIDEO_LIMIT * MAX_HANDLES;
const VIDEO_ID_PATTERN = /^[\w-]{6,20}$/;
const CHANNEL_IDS = {
  Borgaboo: 'UCWZ4-zS2eeZA3lnOj7gQrrg',
  CeeJay_: 'UCHf5I37Mbk56eWNW-pXgBdA',
  ZDMD: 'UC9sVkmJIWkOrXI0pUW8M87g'
};

function corsHeaders(extra = {}) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    ...extra
  };
}

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers })
  });
}

async function fetchWithTimeout(input, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

const numberOrNull = value => (value == null || !Number.isFinite(Number(value)) ? null : Number(value));

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

function parseFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map(([, entry]) => {
    const videoId = xmlValue(entry, 'yt:videoId');
    const published = xmlValue(entry, 'published');
    const thumbnail = entry.match(/<media:thumbnail[^>]+url="([^"]+)"/i)?.[1]
      || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    return { videoId, title: xmlValue(entry, 'title'), thumbnail, published };
  }).filter(video => video.videoId && video.title);
}

async function resolveChannelId(handle, env) {
  if (CHANNEL_IDS[handle]) return CHANNEL_IDS[handle];

  const res = await fetchWithTimeout(`https://www.youtube.com/@${encodeURIComponent(handle)}?hl=en`, {
    headers: { 'User-Agent': 'Wanted Wiki video updater' }
  });
  if (!res.ok) return null;

  const html = await res.text();
  return html.match(/(?:"channelId"|"externalId")\s*:\s*"(UC[^"]+)"/)?.[1] || null;
}

async function getCandidates(handle, env) {
  const channelId = await resolveChannelId(handle, env);
  if (!channelId) return [];

  const res = await fetchWithTimeout(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`,
    { headers: { 'User-Agent': 'Wanted Wiki video updater' } }
  );
  if (!res.ok) return [];

  return parseFeed(await res.text())
    .filter(video => /\bwanted\b/i.test(video.title)
      && !/\b(?:live|livestream|live stream|streaming)\b/i.test(video.title))
    .slice(0, CANDIDATES_PER_CHANNEL);
}

async function getVideoDetails(ids) {
  const details = new Map();
  const clients = [
    {
      name: 'WEB',
      version: '2.20241126.01.00',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36'
    },
    {
      name: 'ANDROID',
      version: '20.10.38',
      userAgent: 'com.google.android.youtube/20.10.38 (Linux; U; Android 11) gzip'
    }
  ];

  await Promise.all(ids.slice(0, VIDEO_LIMIT * MAX_HANDLES).map(async videoId => {
    for (const client of clients) {
      try {
        const res = await fetchWithTimeout('https://www.youtube.com/youtubei/v1/player', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': client.userAgent,
            'Origin': 'https://www.youtube.com',
            'Referer': 'https://www.youtube.com/'
          },
          body: JSON.stringify({
            context: { client: { clientName: client.name, clientVersion: client.version } },
            videoId
          })
        });
        if (!res.ok) {
          console.error(`YouTube ${client.name} player request failed for ${videoId}:`, res.status);
          continue;
        }

        const data = await res.json();
        const video = data.videoDetails;
        if (!video) {
          console.error(`YouTube ${client.name} player response missing details for ${videoId}:`, data.playabilityStatus?.status);
          continue;
        }
        const existing = details.get(videoId) || {};
        details.set(videoId, {
          isLive: existing.isLive === true || video.isLiveContent === true,
          views: numberOrNull(video.viewCount) ?? existing.views ?? null,
          likes: numberOrNull(data.microformat?.playerMicroformatRenderer?.likeCount) ?? existing.likes ?? null
        });
        const stats = details.get(videoId);
        if (stats.views != null && stats.likes != null) break;
      } catch (error) {
        console.error(`YouTube ${client.name} player lookup failed for ${videoId}:`, error);
      }
    }
  }));
  return details;
}

async function getClicks(ids, env) {
  if (!env.VIDEO_ANALYTICS || !ids.length) return {};

  const stub = env.VIDEO_ANALYTICS.get(env.VIDEO_ANALYTICS.idFromName('video-clicks'));
  const res = await stub.fetch('https://analytics/counts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  });
  if (!res.ok) return {};
  return (await res.json()).counts || {};
}

async function exceedsRateLimit(env, key) {
  if (!env.YOUTUBE_REFRESH_LIMITER?.limit) return false;
  try {
    const { success } = await env.YOUTUBE_REFRESH_LIMITER.limit({ key });
    return !success;
  } catch (error) {
    console.error('Rate limiter unavailable; allowing request:', error);
    return false;
  }
}

async function handleVideos(request, env) {
  const url = new URL(request.url);

  const clientKey = request.headers.get('cf-connecting-ip') || 'unknown-client';
  if (await exceedsRateLimit(env, `videos:${clientKey}`)) {
    return json({ error: 'Rate limit exceeded' }, 429, { 'Retry-After': '60' });
  }

  const handles = [...new Set((url.searchParams.get('handles') || '')
    .split(',')
    .map(handle => handle.trim().replace(/^@/, ''))
    .filter(handle => /^[\w.-]{1,100}$/.test(handle)))].slice(0, MAX_HANDLES);
  if (!handles.length) return json({ error: 'Missing handles' }, 400);

  const candidates = await Promise.all(handles.map(handle =>
    getCandidates(handle, env).catch(error => {
      console.error(`Feed lookup failed for ${handle}:`, error);
      return [];
    })
  ));

  const ids = [...new Set(candidates.flatMap(channelVideos => channelVideos
    .slice(0, VIDEO_LIMIT)
    .map(video => video.videoId)))]
    .filter(id => VIDEO_ID_PATTERN.test(id));

  const clicks = await getClicks(ids, env).catch(() => ({}));

  const videos = {};
  handles.forEach((handle, index) => {
    videos[handle] = candidates[index]
      .slice(0, VIDEO_LIMIT)
      .map(video => {
        return {
          title: video.title,
          thumbnail: video.thumbnail,
          link: `https://www.youtube.com/watch?v=${video.videoId}`,
          published: video.published,
          views: null,
          likes: null,
          clicks: clicks[video.videoId] || 0
        };
      });
  });

  return json({ videos });
}

async function handleVideoStats(request, env) {
  const url = new URL(request.url);
  const ids = [...new Set((url.searchParams.get('ids') || '')
    .split(',')
    .filter(id => VIDEO_ID_PATTERN.test(id)))].slice(0, MAX_STATS_IDS);
  if (!ids.length) return json({ error: 'Missing or invalid video IDs' }, 400);

  const clientKey = request.headers.get('cf-connecting-ip') || 'unknown-client';
  if (await exceedsRateLimit(env, `stats:${clientKey}`)) {
    return json({ error: 'Rate limit exceeded' }, 429, { 'Retry-After': '60' });
  }

  const details = await getVideoDetails(ids).catch(() => new Map());
  const stats = Object.fromEntries([...details.entries()].map(([id, values]) => [id, values]));
  return json({ stats });
}

async function handleVideoClick(request, env) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders({ Allow: 'POST' }) });
  }

  const clientKey = request.headers.get('cf-connecting-ip') || 'unknown-client';
  if (await exceedsRateLimit(env, `click:${clientKey}`)) {
    return json({ error: 'Rate limit exceeded' }, 429, { 'Retry-After': '60' });
  }
  if (!env.VIDEO_ANALYTICS) return json({ error: 'Analytics unavailable' }, 503);

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const videoId = String(payload?.videoId || '');
  if (!VIDEO_ID_PATTERN.test(videoId)) return json({ error: 'Invalid video ID' }, 400);

  const stub = env.VIDEO_ANALYTICS.get(env.VIDEO_ANALYTICS.idFromName('video-clicks'));
  const res = await stub.fetch(`https://analytics/increment?videoId=${encodeURIComponent(videoId)}`, {
    method: 'POST'
  });
  return new Response(await res.text(), {
    status: res.status,
    headers: corsHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
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

  readClicks(videoId) {
    return this.state.storage.sql
      .exec('SELECT clicks FROM video_clicks WHERE video_id = ?', videoId)
      .toArray()[0]?.clicks || 0;
  }

  async fetch(request) {
    const url = new URL(request.url);
    const reply = (body, status = 200) => new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });

    if (url.pathname === '/increment' && request.method === 'POST') {
      const videoId = url.searchParams.get('videoId') || '';
      if (!VIDEO_ID_PATTERN.test(videoId)) return reply({ error: 'Invalid video ID' }, 400);

      this.state.storage.sql.exec(
        `INSERT INTO video_clicks (video_id, clicks) VALUES (?, 1)
         ON CONFLICT(video_id) DO UPDATE SET clicks = clicks + 1`,
        videoId
      );
      return reply({ clicks: this.readClicks(videoId) });
    }

    if (url.pathname === '/counts' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const ids = Array.isArray(body?.ids) ? body.ids : [];
      const counts = {};
      for (const id of ids.filter(id => VIDEO_ID_PATTERN.test(id)).slice(0, 50)) {
        counts[id] = this.readClicks(id);
      }
      return reply({ counts });
    }

    return reply({ error: 'Not found' }, 404);
  }
}

export default {
  async fetch(request, env) {
    try {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders() });
      }

      const url = new URL(request.url);
      if (url.pathname === '/') {
        return json({
          service: 'wanted-youtube-videos',
          status: 'ok',
          endpoints: ['/youtube/videos', '/youtube/stats', '/youtube/click']
        });
      }
      if (url.pathname === '/youtube/click') return await handleVideoClick(request, env);
      if (url.pathname === '/youtube/stats') {
        if (request.method !== 'GET') {
          return new Response('Method not allowed', { status: 405, headers: corsHeaders({ Allow: 'GET' }) });
        }
        return await handleVideoStats(request, env);
      }
      if (url.pathname !== '/youtube/videos') {
        return new Response('Not found', { status: 404, headers: corsHeaders({ 'Cache-Control': 'no-store' }) });
      }
      if (request.method !== 'GET') {
        return new Response('Method not allowed', { status: 405, headers: corsHeaders({ Allow: 'GET' }) });
      }

      return await handleVideos(request, env);
    } catch (error) {
      console.error('YouTube worker failed:', error);
      return json({ error: 'YouTube videos unavailable' }, 503);
    }
  }
};
