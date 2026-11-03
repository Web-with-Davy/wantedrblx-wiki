const LIVE_CHECK_CACHE_SECONDS = 30;

function jsonHeaders(cacheControl = 'no-store') {
  return {
    'Access-Control-Allow-Origin': 'https://wantedrblx.com',
    'Cache-Control': cacheControl,
    'Content-Type': 'application/json',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff'
  };
}

function jsonResponse(body, status = 200, cacheControl = 'no-store') {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders(cacheControl)
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'GET') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { 'Allow': 'GET', 'Cache-Control': 'no-store' }
      });
    }

    const clientKey = request.headers.get('cf-connecting-ip') || 'unknown-client';
    const { success } = await env.LIVE_CHECK_LIMITER.limit({ key: clientKey });
    if (!success) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { ...jsonHeaders(), 'Retry-After': '60' }
      });
    }

    const handle = url.searchParams.get('handle') || '';
    if (!/^[A-Za-z0-9._-]{1,100}$/.test(handle)) {
      return jsonResponse({ error: 'Invalid or missing handle' }, 400);
    }

    try {
      const targetUrl = `https://www.youtube.com/@${encodeURIComponent(handle)}/live`;
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const html = await response.text();
      const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)">/);
      const canonicalHref = canonicalMatch ? canonicalMatch[1] : '';
      const videoIdMatch = canonicalHref.match(/watch\?v=([\w-]+)/);

      if (!videoIdMatch) return jsonResponse({ live: false }, 200, `public, max-age=${LIVE_CHECK_CACHE_SECONDS}`);

      const videoId = videoIdMatch[1];
      const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"/);
      const title = titleMatch ? titleMatch[1] : '';

      return jsonResponse({
        live: true,
        videoId,
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`
      }, 200, `public, max-age=${LIVE_CHECK_CACHE_SECONDS}`);
    } catch (error) {
      console.error('Live check failed:', error);
      return jsonResponse({ error: 'Live check unavailable' }, 502);
    }
  }
};
