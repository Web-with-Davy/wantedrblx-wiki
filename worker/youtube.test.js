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

test('returns RSS videos with public views and likes', async () => {
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
        '<feed><entry><yt:videoId>video123</yt:videoId><title>Wanted Roblox Update</title><published>2026-11-07T10:00:00Z</published><media:thumbnail url="https://i.ytimg.com/vi/video123/hqdefault.jpg" /></entry></feed>',
        { headers: { 'Content-Type': 'application/xml' } }
      );
    }
    if (url.pathname === '/watch') {
      return new Response('ytInitialPlayerResponse = {"videoDetails":{"viewCount":"1206"}}; "accessibilityText":"like this video along with 26 other people"');
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
  assert.equal(payload.videos.ExampleCreator[0].title, 'Wanted Roblox Update');
  assert.equal(payload.videos.ExampleCreator[0].link, 'https://www.youtube.com/watch?v=video123');
  assert.equal(payload.videos.ExampleCreator[0].views, 1206);
  assert.equal(payload.videos.ExampleCreator[0].likes, 27);
});

test('returns the newest three videos from the first 15 RSS entries', async () => {
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
    const title = `Creator Upload ${number}`;
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
      'https://www.youtube.com/watch?v=video01',
      'https://www.youtube.com/watch?v=video02',
      'https://www.youtube.com/watch?v=video03'
    ]
  );
  assert.deepEqual(statsRequests, ['video01', 'video02', 'video03']);
  assert.ok(payload.videos.ExampleCreator.every(video => video.views === 1206 && video.likes === 27));
});

test('loads three newest videos and stats for every creator with bounded concurrency', async () => {
  globalThis.caches = {
    default: {
      async match() {
        return undefined;
      },
      async put() {}
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
        return `<entry><yt:videoId>${videoId}</yt:videoId><title>${handle} upload ${index + 1}</title><published>${published}</published><media:thumbnail url="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" /></entry>`;
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
    {}
  );
  const payload = await response.json();

  assert.equal(payload.complete, true);
  assert.deepEqual(Object.values(payload.videos).map(videos => videos.length), [3, 3, 3, 3]);
  assert.equal(statsRequestCount, 12);
  assert.ok(maximumStatsRequests <= 4);
  assert.ok(Object.values(payload.videos).flat().every(video => video.views === 1206 && video.likes === 27));
});