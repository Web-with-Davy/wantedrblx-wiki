import versionData from '../version.json';

export function onRequestGet({ env }) {
    const version = env?.CF_PAGES_COMMIT_SHA || versionData?.version || 'local';
    return Response.json(
        { version },
        {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                'Access-Control-Allow-Origin': '*'
            }
        }
    );
}
