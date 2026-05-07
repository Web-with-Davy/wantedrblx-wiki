async function trackVisit(updateDisplayCallback) {
    const API_BASE = 'https://countapi.mileshilliard.com/api/v1';
    const KEY = 'wanted-wiki-unique-visitors';
    const LOCAL_KEY = 'wanted_wiki_visited_v2';

    async function fetchCount(endpoint) {
        try {
            const res = await fetch(`${API_BASE}/${endpoint}/${KEY}`);
            if (!res.ok) return null;
            const data = await res.json();
            return data.value ? parseInt(data.value, 10) : null;
        } catch (_) {
            return null;
        }
    }

    try {
        const hasVisited = localStorage.getItem(LOCAL_KEY);
        let count;

        if (!hasVisited) {
            count = await fetchCount('hit');
            if (count !== null) localStorage.setItem(LOCAL_KEY, 'true');
        } else {
            count = await fetchCount('get');
            if (count === null) {
                count = await fetchCount('hit');
                if (count !== null) localStorage.setItem(LOCAL_KEY, 'true');
            }
        }

        if (count !== null) {
            updateDisplayCallback(count.toLocaleString());
        }

        setInterval(async () => {
            try {
                const c = await fetchCount('get');
                if (c !== null) {
                    updateDisplayCallback(c.toLocaleString());
                }
            } catch (_) { }
        }, 30000);
    } catch (e) {
        console.warn('Visitor tracking error:', e);
    }
}
