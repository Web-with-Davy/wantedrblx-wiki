function renderTipsAndTricks() {
    const totalWeapons = (window.GUNS_DATA?.length || 0) + (window.EQUIPMENT_DATA?.length || 0) + (window.EXPLOSIVES_DATA?.length || 0);
    const totalVehicles = window.VEHICLES_DATA?.length || 0;
    const totalMissions = window.MISSIONS_DATA?.length || 0;

    const vehiclesByBudget = [5000, 25000, 100000].map(budget => {
        const affordable = (window.VEHICLES_DATA || [])
            .filter(vehicle => typeof vehicle.contractPrice === 'number'
                && vehicle.contractPrice <= budget
                && Number.isFinite(Number(vehicle.stats?.topSpeed)))
            .sort((a, b) => Number(b.stats.topSpeed) - Number(a.stats.topSpeed));
        return { budget, vehicle: affordable[0] };
    }).filter(entry => entry.vehicle);

    const starterCarGuide = vehiclesByBudget.map(({ budget, vehicle }) => `
        <li><strong>Up to ${formatPrice(budget)}:</strong> ${vehicle.name}, ${vehicle.stats.topSpeed} top speed, listed at ${formatPrice(vehicle.contractPrice)}.</li>
    `).join('');

    const starterMission = (window.MISSIONS_DATA || []).find(mission => mission.id === 'bank-heist');
    const missionProgression = (window.MISSIONS_DATA || [])
        .filter(mission => DIFFICULTIES[mission.difficulty]?.order)
        .sort((a, b) => DIFFICULTIES[a.difficulty].order - DIFFICULTIES[b.difficulty].order
            || (a.missionType || '').localeCompare(b.missionType || '')
            || (a.title || '').localeCompare(b.title || ''))
        .slice(0, 5)
        .map(mission => `<li><strong>${mission.title}</strong> (${DIFFICULTIES[mission.difficulty].name})${mission.rewards?.length ? `: ${mission.rewards.join(', ')}` : ''}</li>`)
        .join('');

    const crateComparisons = (window.GUN_CRATES_DATA || [])
        .filter(crate => crate.cooldown && crate.cooldown !== 'Unknown')
        .slice(0, 3)
        .map(crate => {
            const weapon = (window.GUNS_DATA || []).find(item => item.name?.toLowerCase() === crate.gun?.toLowerCase());
            const listedPrice = typeof weapon?.contractPrice === 'number'
                ? `listed weapon price ${formatPrice(weapon.contractPrice)}`
                : 'weapon price not listed';
            return `<li><strong>${crate.name}:</strong> ${crate.gun}, ${listedPrice}; ${crate.cooldown}; ${crate.location || 'location not listed'}.</li>`;
        })
        .join('');

    const printer = (window.ITEMS_DATA || []).find(item => item.printerStats);
    const printerYield = printer && window.getPrinterYieldStats
        ? window.getPrinterYieldStats(printer.printerStats)
        : null;

    return `
        <div class="tips-page">
            <h2>TIPS AND TRICKS</h2>
            <section class="tips-guide-section" aria-labelledby="what-is-wanted-title">
                <h3 id="what-is-wanted-title">What is Wanted?</h3>
                <p><strong>Wanted</strong> is a Roblox open-world crime and law-enforcement game. Players can take on missions, earn cash, collect vehicles and weapons, and explore a map built around robberies, pursuits, and team play. This community wiki records game data and practical starting points; it is not affiliated with Roblox or DevvGames.</p>
                <h3>Start here</h3>
                <p>New to the game? Begin with the tutorial-linked Bank Heist${starterMission ? `, which lists ${starterMission.rewards?.join(' and ') || 'a mission reward'}` : ''}, then browse weapon and vehicle stats before spending cash.</p>
                <nav class="tips-start-links" aria-label="Getting started">
                    <a href="/missions" data-page="missions">Mission guide (${totalMissions})</a>
                    <a href="/weapons" data-page="weapons">Weapon guide (${totalWeapons})</a>
                    <a href="/vehicles" data-page="vehicles">Vehicle guide (${totalVehicles})</a>
                    <a href="/promo-codes" data-page="promo-codes">Active codes</a>
                </nav>
                <div class="tips-guides-grid">
                    <article>
                        <h3>Starter car by budget</h3>
                        <p>These are the fastest listed vehicles within each budget, based on the wiki's current contract price and top-speed data.</p>
                        <ul>${starterCarGuide || '<li>Vehicle price and speed data is being checked.</li>'}</ul>
                    </article>
                    <article>
                        <h3>Mission progression order</h3>
                        <p>A suggested starting route, ordered by the difficulty ratings in the mission data. This is a guide, not a required in-game quest chain.</p>
                        <ol>${missionProgression || '<li>Mission difficulty data is being checked.</li>'}</ol>
                        <a href="/missions" data-page="missions">Browse all ${totalMissions} missions</a>
                    </article>
                    <article>
                        <h3>Gun crate value comparison</h3>
                        <p>Compare each crate's weapon against its listed contract price, plus cooldown and spawn location.</p>
                        <ul>${crateComparisons || '<li>Crate details are being checked.</li>'}</ul>
                        <a href="/gun-crates" data-page="gun-crates">Compare all gun crates</a>
                    </article>
                    <article>
                        <h3>Money printer yield</h3>
                        <p>At the listed payout and breakage odds, the expected lifetime return is ${printerYield ? formatPrice(Math.round(printerYield.expectedLifetimeCash)) : 'not available'} over about ${printerYield ? `${(printerYield.expectedRuntime / 60).toFixed(1)} minutes` : 'an unlisted runtime'}. Actual returns vary by printer.</p>
                        <a href="/item/items/money-printer/">View the money printer yield</a>
                    </article>
                </div>
            </section>
        </div>
    `;
}