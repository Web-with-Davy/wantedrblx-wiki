export function onRequestGet({ env }) {
    return Response.json(
        { version: env.CF_PAGES_COMMIT_SHA || 'local' },
        { headers: { 'Cache-Control': 'no-store' } }
    );
}