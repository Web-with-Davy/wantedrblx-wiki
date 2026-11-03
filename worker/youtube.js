const YOUTUBE_API_CACHE_SECONDS = 900;
const YOUTUBE_VIDEO_LIMIT = 3;
const YOUTUBE_CHANNEL_IDS = {
  Borgaboo: 'UCWZ4-zS2eeZA3lnOj7gQrrg',
  CeeJay_: 'UCHf5I37Mbk56eWNW-pXgBdA',
  ZDMD: 'UC9sVkmJIWkOrXI0pUW8M87g'
};

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

  const response = await fetch(`https://www.youtube.com/@${encodeURIComponent(handle)}?hl=en`, {
    redirect: 'follow',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!response.ok) return null;

  const html = await response.text();
  return html.match(/(?:"channelId"|"externalId")\s*:\s*"(UC[^"]+)"/)?.[1] || null;
}

async function isLivestream(videoId) {
  const response = await fetch(`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!response.ok) return false;

  const html = await response.text();
  return /"isLiveContent"\s*:\s*true|"isUpcoming"\s*:\s*true/i.test(html);
}

async function getWantedVideos(handle) {
  const channelId = await resolveChannelId(handle);
  if (!channelId) return [];

  const feedResponse = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    headers: { 'User-Agent': 'Wanted Wiki video updater' }
  });
  if (!feedResponse.ok) return [];

  const feed = parseYoutubeFeed(await feedResponse.text());
  const candidates = feed.filter(video => /\bwanted\b/i.test(video.title)
    && !/\b(?:live|livestream|live stream|streaming)\b/i.test(video.title));
  const videos = [];

  for (const video of candidates) {
    if (await isLivestream(video.videoId)) continue;
    videos.push({
      title: video.title,
      thumbnail: video.thumbnail,
      link: `https://www.youtube.com/watch?v=${video.videoId}`,
      published: video.published
    });
    if (videos.length === YOUTUBE_VIDEO_LIMIT) break;
  }

  return videos;
}

function responseHeaders(cacheControl = 'no-store') {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://wantedrblx.com',
    'Cache-Control': cacheControl,
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff'
  };
}

async function handleYoutubeVideos(request) {
  const url = new URL(request.url);
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
      return [handle, await getWantedVideos(handle)];
    } catch (error) {
      console.error(`YouTube refresh failed for ${handle}:`, error);
      return [handle, []];
    }
  })));

  return new Response(JSON.stringify({ videos }), {
    headers: responseHeaders(`public, max-age=${YOUTUBE_API_CACHE_SECONDS}`)
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/youtube/videos') {
      return new Response('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
          'Cache-Control': 'no-store',
          'Referrer-Policy': 'no-referrer',
          'X-Content-Type-Options': 'nosniff'
        }
      });
    }

    if (request.method !== 'GET') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { 'Allow': 'GET', 'Cache-Control': 'no-store' }
      });
    }

    const clientKey = request.headers.get('cf-connecting-ip') || 'unknown-client';
    const { success } = await env.YOUTUBE_REFRESH_LIMITER.limit({ key: clientKey });
    if (!success) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: {
          ...responseHeaders(),
          'Retry-After': '60'
        }
      });
    }

    return handleYoutubeVideos(request);
  }
};
