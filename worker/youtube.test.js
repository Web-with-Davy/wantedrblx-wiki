import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import worker from './youtube.js';

const originalFetch = globalThis.fetch;
const originalCaches = globalThis.caches;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalCaches === undefined) delete globalThis.caches;
  else globalThis.caches = originalCaches;
});

test('returns Wanted livestreams with public views and likes', async () => {
  globalThis.caches = {
    default: {
      async match() {
        return undefined;
      },
      async put() {}
    }
  };
  globalThis.fetch = async input => {
    const url = new URL(input);
    if (url.pathname === '/@ExampleCreator') {
      return new Response('<script>{"channelId":"UC123456789"}</script>', {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    if (url.pathname === '/feeds/videos.xml') {
      return new Response(
        '<feed><entry><yt:videoId>video123</yt:videoId><title>LIVE: Wanted Roblox Update</title><published>2026-11-07T10:00:00Z</published><media:thumbnail url="https://i.ytimg.com/vi/video123/hqdefault.jpg" /></entry></feed>',
        { headers: { 'Content-Type': 'application/xml' } }
      );
    }
    if (url.pathname === '/watch') {
      return new Response('ytInitialPlayerResponse = {"videoDetails":{"viewCount":"1206","isLiveContent":true}}; "accessibilityText":"like this video along with 26 other people"');
    }
    throw new Error(`Unexpected upstream URL: ${url}`);
  };

  const response = await worker.fetch(
    new Request('https://worker.test/youtube/videos?handles=ExampleCreator'),
    {}
  );
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.complete, true);
  assert.equal(payload.videos.ExampleCreator.length, 1);
  assert.equal(payload.videos.ExampleCreator[0].title, 'LIVE: Wanted Roblox Update');
  assert.equal(payload.videos.ExampleCreator[0].link, 'https://www.youtube.com/watch?v=video123');
  assert.equal(payload.videos.ExampleCreator[0].views, 1206);
  assert.equal(payload.videos.ExampleCreator[0].likes, 27);
});

test('returns the newest three Wanted titles from the first 15 RSS entries', async () => {
  globalThis.caches = {
    default: {
      async match() {
        return undefined;
      },
      async put() {}
    }
  };

  const entries = Array.from({ length: 15 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const date = new Date(Date.UTC(2026, 10, 7, 12, 15 - index)).toISOString();
    const isWantedUpload = [2, 4, 11, 14].includes(index);
    const title = isWantedUpload ? `Wanted Update ${number}` : `Other Game Upload ${number}`;
    return `<entry><yt:videoId>video${number}</yt:videoId><title>${title}</title><published>${date}</published><media:thumbnail url="https://i.ytimg.com/vi/video${number}/hqdefault.jpg" /></entry>`;
  }).join('');
  const statsRequests = [];

  globalThis.fetch = async input => {
    const url = new URL(input);
    if (url.pathname === '/@ExampleCreator') {
      return new Response('<script>{"channelId":"UC123456789"}</script>');
    }
    if (url.pathname === '/feeds/videos.xml') return new Response(`<feed>${entries}</feed>`);
    if (url.pathname === '/watch') {
      statsRequests.push(url.searchParams.get('v'));
      return new Response('ytInitialPlayerResponse = {"videoDetails":{"viewCount":"1206"}}; "accessibilityText":"like this video along with 26 other people"');
    }
    throw new Error(`Unexpected upstream URL: ${url}`);
  };

  const response = await worker.fetch(
    new Request('https://worker.test/youtube/videos?handles=ExampleCreator'),
    {}
  );
  const payload = await response.json();

  assert.equal(payload.videos.ExampleCreator.length, 3);
  assert.deepEqual(
    payload.videos.ExampleCreator.map(video => video.link),
    [
      'https://www.youtube.com/watch?v=video03',
      'https://www.youtube.com/watch?v=video05',
      'https://www.youtube.com/watch?v=video12'
    ]
  );
  assert.deepEqual(statsRequests, ['video03', 'video05', 'video12']);
  assert.ok(payload.videos.ExampleCreator.every(video => /\bwanted\b/i.test(video.title)));
  assert.ok(payload.videos.ExampleCreator.every(video => video.views === 1206 && video.likes === 27));
});

test('loads three newest videos and stats for every creator with bounded concurrency', async () => {
  const cachedResponses = new Map();
  const durableStats = new Map();
  let bypassVideoEdgeCache = false;
  globalThis.caches = {
    default: {
      async match(request) {
        if (bypassVideoEdgeCache && new URL(request.url).pathname.includes('/_internal/video-stats/')) {
          return undefined;
        }
        return cachedResponses.get(request.url)?.clone();
      },
      async put(request, response) {
        cachedResponses.set(request.url, response.clone());
      },
    }
  };

  const channelIds = {
    Borgaboo: 'UCWZ4-zS2eeZA3lnOj7gQrrg',
    CeeJay_: 'UCHf5I37Mbk56eWNW-pXgBdA',
    ZDMD: 'UC9sVkmJIWkOrXI0pUW8M87g',
    Revndetta: 'UCRevndetta1234567890'
  };
  const handlesByChannelId = Object.fromEntries(Object.entries(channelIds).map(([handle, id]) => [id, handle]));
  let activeStatsRequests = 0;
  let maximumStatsRequests = 0;
  let statsRequestCount = 0;
  const analyticsStub = {
    async fetch(input, init = {}) {
      const request = input instanceof Request ? input : new Request(input, init);
      const url = new URL(request.url);
      const videoId = url.searchParams.get('videoId');
      if (url.pathname === '/stats' && request.method === 'POST') {
        const stats = await request.json();
        durableStats.set(videoId, {
          views: stats.views ?? durableStats.get(videoId)?.views ?? null,
          likes: stats.likes ?? durableStats.get(videoId)?.likes ?? null
        });
        return new Response(JSON.stringify(durableStats.get(videoId)));
      }
      return new Response(JSON.stringify({ clicks: 0, ...durableStats.get(videoId) }));
    }
  };
  const env = {
    VIDEO_ANALYTICS: {
      idFromName: () => 'video-clicks',
      get: () => analyticsStub
    }
  };

  globalThis.fetch = async input => {
    const url = new URL(input);
    if (url.pathname.startsWith('/@')) {
      return new Response(`<script>{"channelId":"${channelIds.Revndetta}"}</script>`);
    }
    if (url.pathname === '/feeds/videos.xml') {
      const handle = handlesByChannelId[url.searchParams.get('channel_id')];
      const entries = Array.from({ length: 15 }, (_, index) => {
        const videoId = `${handle}Vid${String(index + 1).padStart(2, '0')}`;
        const published = new Date(Date.UTC(2026, 10, 7, 12, 15 - index)).toISOString();
        return `<entry><yt:videoId>${videoId}</yt:videoId><title>${handle} Wanted upload ${index + 1}</title><published>${published}</published><media:thumbnail url="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" /></entry>`;
      }).join('');
      return new Response(`<feed>${entries}</feed>`);
    }
    if (url.pathname === '/watch') {
      statsRequestCount++;
      activeStatsRequests++;
      maximumStatsRequests = Math.max(maximumStatsRequests, activeStatsRequests);
      await new Promise(resolve => setTimeout(resolve, 5));
      activeStatsRequests--;
      return new Response('ytInitialPlayerResponse = {"videoDetails":{"viewCount":"1206"}}; "accessibilityText":"like this video along with 26 other people"');
    }
    throw new Error(`Unexpected upstream URL: ${url}`);
  };

  const response = await worker.fetch(
    new Request('https://worker.test/youtube/videos?handles=Borgaboo,CeeJay_,ZDMD,Revndetta'),
    env
  );
  const payload = await response.json();

  assert.equal(payload.complete, true);
  assert.deepEqual(Object.values(payload.videos).map(videos => videos.length), [3, 3, 3, 3]);
  assert.equal(statsRequestCount, 12);
  assert.ok(maximumStatsRequests <= 4);
  assert.ok(Object.values(payload.videos).flat().every(video => video.views === 1206 && video.likes === 27));

  bypassVideoEdgeCache = true;
  const repeatResponse = await worker.fetch(
    new Request('https://worker.test/youtube/videos?handles=Borgaboo,CeeJay_,ZDMD,Revndetta&refresh=again'),
    env
  );
  const repeatedPayload = await repeatResponse.json();
  assert.equal(repeatedPayload.complete, true);
  assert.equal(statsRequestCount, 12);
});