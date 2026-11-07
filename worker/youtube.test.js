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

test('returns RSS video cards without scraping YouTube watch pages', async () => {
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
    if (url.pathname === '/watch') throw new Error('Watch-page scraping must not be used');
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
  assert.equal(payload.videos.ExampleCreator[0].views, null);
  assert.equal(payload.videos.ExampleCreator[0].likes, null);
});

test('finds three Wanted videos across the first 15 RSS entries', async () => {
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
    const title = index < 12 ? `Other Game Video ${number}` : `Wanted Video ${number}`;
    return `<entry><yt:videoId>video${number}</yt:videoId><title>${title}</title><published>${date}</published><media:thumbnail url="https://i.ytimg.com/vi/video${number}/hqdefault.jpg" /></entry>`;
  }).join('');

  globalThis.fetch = async input => {
    const url = new URL(input);
    if (url.pathname === '/@ExampleCreator') {
      return new Response('<script>{"channelId":"UC123456789"}</script>');
    }
    if (url.pathname === '/feeds/videos.xml') return new Response(`<feed>${entries}</feed>`);
    if (url.pathname === '/watch') throw new Error('Watch-page scraping must not be used');
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
      'https://www.youtube.com/watch?v=video13',
      'https://www.youtube.com/watch?v=video14',
      'https://www.youtube.com/watch?v=video15'
    ]
  );
});