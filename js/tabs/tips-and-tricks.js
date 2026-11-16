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

            <section class="tips-guide-section" aria-labelledby="money-guide-title">
                <h3 id="money-guide-title">💰 Money Guide</h3>
                <p>The main way to earn money is through robberies. Here is a full breakdown of every robbery and money-making method in the game.</p>

                <div class="tips-guides-grid">
                    <article>
                        <h3>🏦 Bank</h3>
                        <p>The highest-potential robbery. A diamond bank can yield around <strong>$1 million</strong> per run, or over <strong>$2 million</strong> using the Double Bank Method.</p>
                        <p><strong>Vault tiers (worst → best):</strong> Regular → Silver → Gold → Sapphire → Ruby → Emerald → Amethyst → Diamond. The Diamond Vault is <strong>admin abuse only</strong> and cannot spawn in a normal server.</p>
                        <p><strong>Double Bank Method:</strong> Collect all piles from the bank, then leave and join a fresh server (private or dead servers work best). The piles respawn, letting you collect them again. Repeat until the vault resets for double or triple earnings.</p>
                    </article>
                    <article>
                        <h3>💍 Jewelry Store</h3>
                        <p>Requires a <strong>vault cracker</strong> to open the inner vault. Buy vault crackers from <strong>Rod at the Docks (Oasis City Port)</strong> for $10,000 each — buy only one at a time since you lose it on death.</p>
                        <p>Regular cases can be broken for free and hold smaller loot. <strong>Reinforced cases</strong> require a <strong>buzzsaw</strong> (sold at <strong>Ofy's Value Pawn</strong>) but contain the best loot: diamonds, rollies, and rare gems. This is a <strong>combat zone</strong> — avoid it if you don't want PvP.</p>
                        <p>You can steal a drill left behind by other players to skip placing your own.</p>
                    </article>
                    <article>
                        <h3>✈️ Cargo Plane</h3>
                        <p>The best heist in the game. <strong>Lands at :00 of every hour</strong> on the airstrip — board it for free then. During the rest of the hour, you need a helicopter to access it.</p>
                        <p>Requires a <strong>cargo card</strong> (found in briefcases around the airport — 3 conveyor spawns, 2 top spawns, 1 on the external conveyor belt, 1 at the top of the airport tower) and an <strong>explosive</strong> to blow the vault.</p>
                        <p>Use RPG, grenade launcher, or C4 to open the vault — regular grenades do not work. With a 40 kg bag on a gold plane, expect around <strong>$8,400 per run</strong> from gold bricks. Earnings scale significantly with vault rarity — higher-tier planes spawn gems like sapphires and rubies, which are worth more <em>and</em> weigh less than gold bricks, letting you carry more value per bag.</p>
                        <p><strong>Plane tiers:</strong> Gold (worst) → Sapphire → Ruby → Emerald → Amethyst → Diamond.</p>
                    </article>
                    <article>
                        <h3>📦 Airdrops</h3>
                        <p>Spawn <strong>randomly within each hour</strong>. Each airdrop can contain up to 3 guns, gems, cash, and money printers.</p>
                        <p>Wait for the crate to land, then loot it. If you have a helicopter, you can knock it down early. Each airdrop can be <strong>looted twice</strong> — but not by the same player twice. Use an alt account to get a second loot.</p>
                        <p>Server hop to find more — every public server has one airdrop available (private servers excluded).</p>
                    </article>
                    <article>
                        <h3>🚔 Police Station</h3>
                        <p>Blow up the correct generator to open the evidence room. Can contain <strong>M60s, golden guns</strong>, and gems. Resets <strong>twice per day</strong> (every 12 hours).</p>
                        <p>Watch out for police players — this location draws attention.</p>
                    </article>
                    <article>
                        <h3>🏪 Pear Store</h3>
                        <p>Use <strong>C4</strong> (cheapest at ~$250 per use) to blow open the cases. Can contain gold Peartech, regular Peartech, and rarely a <strong>Bitcoin</strong>.</p>
                    </article>
                    <article>
                        <h3>🗺️ Robberies that are not shown on the map</h3>
                        <ul>
                            <li><strong>Mini Bank (Badlands Bank):</strong> Throw C4 between the ATMs to blow them up along side the vault. Contains gold, silver, bitcoins, and rare gems. Loot is better in populated servers than in private/dead servers.</li>
                            <li><strong>News Station (across from the bank):</strong> No explosive needed. Search the PCs for flash drives and other PC parts. Also has GPUs (~$9k each) and Bitcoins.</li>
                            <li><strong>Shoe Locker, Tech Shack, and small Jewelry Store (Badlands)</strong> — worth checking for extra loot on the way by.</li>
                        </ul>
                    </article>
                    <article>
                        <h3>🔒 Safes</h3>
                        <p>Two types of safes are hidden around the map:</p>
                        <ul>
                            <li><strong>House safes:</strong> Contain varied loot (earphones, gems, etc.).</li>
                            <li><strong>Gas station safes:</strong> Exclusive cash drops. Found behind every gas station. Also in the Tech Shack (3-digit code lock). Reset every ~10–20 minutes.</li>
                        </ul>
                        <p>One example location: inside the Syndicate Hideout</p>
                    </article>
                </div>
            </section>

            <section class="tips-guide-section" aria-labelledby="selling-guide-title">
                <h3 id="selling-guide-title">💵 Selling Loot</h3>
                <div class="tips-guides-grid">
                    <article>
                        <h3>Ofy <a href="/npcs" data-page="npcs">(NPC)</a></h3>
                        <p>The main buyer — always available at <strong>Ofy's Value Pawn</strong>, no waiting period. Sell most loot here if Sir.B is full or on cooldown.</p>
                    </article>
                    <article>
                        <h3>Sir.B — Double Money <a href="/npcs" data-page="npcs">(NPC)</a></h3>
                        <p>Sell loot to Sir.B at the <strong>Syndicate Headquarters</strong> and receive <strong>double the value</strong> — but he takes <strong>4 hours</strong> to process and pay out. He has a sell cap (around $50k for new players). Once capped, sell to Ofy instead.</p>
                        <p><strong>Tip:</strong> Store gems in a display case at your house to hold them until Sir.B is ready. Display cases can be resold to get your money back.</p>
                    </article>
                    <article>
                        <h3>Rod at the Docks <a href="/npcs" data-page="npcs">(NPC)</a></h3>
                        <p>Sell unwanted guns to Rod at <strong>Oasis City Port</strong>. Hold out the gun and select the sell option. He pays <strong>35% of the gun's rebuy price</strong> — you cannot buy a gun and resell it at full price.</p>
                    </article>
                </div>
            </section>

            <section class="tips-guide-section" aria-labelledby="bag-guide-title">
                <h3 id="bag-guide-title">🎒 Bag Size</h3>
                <p>Your default bag is <strong>25 kg</strong>. Increasing bag size lets you carry more loot per robbery run.</p>
                <div class="tips-guides-grid">
                    <article>
                        <h3>How to increase bag size</h3>
                        <ul>
                            <li><strong>Syndicate career:</strong> Max out the Syndicate career to unlock bigger bags.</li>
                            <li><strong>Robux boost:</strong> Pay 16 Robux in the shop for a temporary bag boost — worth it during heavy grinding sessions.</li>
                            <li><strong>Events:</strong> Some events grant permanent bag boosts (e.g. Halloween gave +5 kg, the 100 Million event gave +10 kg).</li>
                        </ul>
                    </article>
                    <article>
                        <h3>Double bag trick</h3>
                        <p>You can carry <strong>two bags at once</strong>: one on your back and one on the ground. Drop your bag to get a second load of loot, then pick up the original bag before leaving.</p>
                        <p><strong>Warning:</strong> Dropping a bag destroys any bag already on the floor. If you leave a server, your carried bag is dropped and your floor bag is deleted.</p>
                    </article>
                </div>
            </section>

            <section class="tips-guide-section" aria-labelledby="passive-income-title">
                <h3 id="passive-income-title">📈 Passive Income</h3>
                <div class="tips-guides-grid">
                    <article>
                        <h3>Launder Money (next to Ofie)</h3>
                        <p>Invest <strong>$5k to receive $20k back</strong> after 20 hours. You can also feed it gold bars → big gold bars, or sapphires → rubies. A great way to passively upgrade your loot value over time.</p>
                    </article>
                    <article>
                        <h3>Crystal Club &amp; Resort Daily Spin</h3>
                        <p>Talk to <strong>Softy</strong> at the Crystal Club &amp; Resort to spin the daily wheel — available after 15 minutes of playtime per session. Prizes include cash, money printers, or a diamond. The resort also has loose cash and gems to grab while you're there.</p>
                    </article>
                    <article>
                        <h3>Career Quests</h3>
                        <p>Completing quests through your career gives decent cash on the side. Some late-game quests reward up to <strong>$1 million</strong> for completion.</p>
                    </article>
                </div>
            </section>

            <section class="tips-guide-section" aria-labelledby="vehicles-guide-title">
                <h3 id="vehicles-guide-title">🚗 Vehicle Progression Guide</h3>
                <p>Prioritize vehicles over gun contracts early on — free guns are available around the map. There are two vehicle categories: <strong>grinding</strong> (speed/hauling) and <strong>PvP</strong> (armor/handling).</p>

                <div class="tips-guides-grid">
                    <article>
                        <h3>Grinding Car Progression</h3>
                        <ol>
                            <li><strong>Cruiser</strong> — Your starting vehicle. Use it briefly.</li>
                            <li><strong>Interceptor (Police Level 1, free)</strong> — Get this first. Has 2 armor and 400 HP body — a sturdy early-game car for both grinding and PvP.</li>
                            <li><strong>Shinobi (~$700k)</strong> — Recommended over the Mini Bird for most players. Comparable speed to an unmodded Spectre for a fraction of the cost. Max cost ~$2.2M total.</li>
                            <li><strong>Spectre (~$8M + $12M to max)</strong> — Strong grinding car. Speed is nearly identical to the Helix and Emperion — save money and go Spectre first.</li>
                            <li><strong>Helix (~$15M)</strong> — Best overall handling in the game. Worth it after the Spectre if you can afford it — makes sharp turns much easier.</li>
                        </ol>
                        <p><strong>Tip:</strong> Spectre, Helix, and Emperion have almost identical top speeds — don't pay double for marginal gains.</p>
                    </article>
                    <article>
                        <h3>PvP Car Progression</h3>
                        <ol>
                            <li><strong>Interceptor</strong> — Great early PvP car. 2 armor and 400 HP body. Free via Police Level 1.</li>
                            <li><strong>Zoro ($900k, Bayview Motors)</strong> — Fits 4 players and has 2 armor. Good early PvP pick for its size and durability.</li>
                            <li><strong>Blade (endgame)</strong> — Recommended over the Warden. Works on all teams (Syndicate, Police, Civilian), goes faster, and has essentially the same armor as the Warden due to diminishing returns.</li>
                            <li><strong>Warden (endgame)</strong> — Only worthwhile if you want the grenade launcher (level 5 police perk) or faster arrests.</li>
                        </ol>
                    </article>
                    <article>
                        <h3>Notable Vehicles</h3>
                        <ul>
                            <li><strong>Mini Bird (helicopter)</strong> — Useful for cargo plane access mid-game.</li>
                            <li><strong>Panther (exotic helicopter)</strong> — Obtained from <strong>Vehicle Crates</strong>. Excellent stats (top speed 100, handling 100, 2 armor, 6 seats). Cannot be purchased directly.</li>
                            <li><strong>Rift</strong> — Technically the fastest vehicle in the game (top speed 79) but it's a <strong>motorcycle</strong>, not a car, and is un-buyable. Extremely hard to control — not recommended unless you've mastered handling.</li>
                            <li><strong>Event vehicles (e.g. Reaper)</strong> — Available during events for event currency. Can save money but still need cash to max out.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <section class="tips-guide-section" aria-labelledby="weapons-guide-title">
                <h3 id="weapons-guide-title">🔫 Weapons Guide</h3>
                <div class="tips-guides-grid">
                    <article>
                        <h3>Heavy vs Light Guns</h3>
                        <p><strong>Heavy guns</strong> (rifles, LMGs, snipers, RPGs) deal far more damage but cannot be used while driving. They can be fired from the passenger seat while stationary in a car.</p>
                        <p><strong>Light guns</strong> (SMGs, pistols) can be fired while driving as a passenger — their main advantage.</p>
                    </article>
                    <article>
                        <h3>Best PvP Guns</h3>
                        <ul>
                            <li><strong>M4A1</strong> — Highest DPS of any standard gun. Available from the gun store.</li>
                            <li><strong>M60</strong> — Best non-golden gun alongside the M4. Found in airdrops and the police station.</li>
                            <li><strong>SVD</strong> — Highest DPS if landing all headshots. Store-bought (~$5M).</li>
                            <li><strong>Gold Barrett</strong> — One-taps to the head. Airdrop-only; extremely rare.</li>
                            <li><strong>Gold Deagle &amp; Gold AK</strong> — Airdrop-exclusive. Worth selling (~60k for Gold AK) rather than using, as the Gold AK is weaker than the M4.</li>
                            <li><strong>Barrett</strong> — Also airdrop-only.</li>
                        </ul>
                    </article>
                    <article>
                        <h3>Free Guns Around the Map</h3>
                        <p>Multiple free guns can be found around the map — check the full free gun location guide for all spawns. Examples include:</p>
                        <ul>
                            <li><strong>Glock 18</strong> — Found in the airport area. Weak but usable as a driver sidearm. Sell unwanted ones to Rod.</li>
                            <li><strong>M4</strong> — Can be found in the cargo plane area.</li>
                            <li><strong>M60</strong> — Found in airdrops. Two can spawn per drop.</li>
                        </ul>
                        <p>Sell any unwanted found guns to Rod at the Docks for extra cash.</p>
                    </article>
                    <article>
                        <h3>Gun Storage & Hotkeys</h3>
                        <p>Store guns in the <strong>item locker</strong> at your house (unlocked via Syndicate career) or use the locker inside a gun store.</p>
                        <p><strong>PC Hotkey Tip:</strong> Instead of opening the GTA-style weapon wheel, hold out the wheel, hover over your gun, then press a number key (1–9) to hotkey it. Press that number directly to swap — much faster in combat.</p>
                        <p>Mobile and console players have <strong>auto-shoot</strong> and <strong>aim assist</strong> to compensate for not having hotkeys.</p>
                    </article>
                    <article>
                        <h3>When to Buy Gun Contracts</h3>
                        <p>Don't spend money on gun contracts in the early game — prioritize vehicles first. Only consider purchasing:</p>
                        <ul>
                            <li><strong>M60</strong> (~$6.4M) — Best LMG, top-tier PvP.</li>
                            <li><strong>SVD</strong> (~$5M) — Best sniper for headshot-focused players.</li>
                        </ul>
                        <p>Both can also be found for free, so wait until you have your grinding vehicles sorted before buying.</p>
                    </article>
                    <article>
                        <h3>Explosives</h3>
                        <p><strong>C4</strong> is the most cost-effective explosive at ~$250 per use. Best for store robberies, mini bank ATMs, and blowing vault doors.</p>
                        <p>For the cargo plane vault: use RPG, grenade launcher, or C4 — <strong>regular grenades do not work</strong> on the force field.</p>
                        <p>The <strong>grenade launcher</strong> (police career level 4) is better than the RPG — reloads twice as fast and deals the same damage.</p>
                    </article>
                </div>
            </section>

            <section class="tips-guide-section" aria-labelledby="careers-guide-title">
                <h3 id="careers-guide-title">🎖️ Career Guide</h3>
                <div class="tips-guides-grid">
                    <article>
                        <h3>Syndicate Career</h3>
                        <p>Focused on robbing, stealing, and selling to Sir B. Max it out first — the rewards are better for grinders:</p>
                        <ul>
                            <li>Bigger bag size</li>
                            <li>Item locker access</li>
                            <li>Extra incognito</li>
                            <li>The <strong>Blade</strong> (best overall PvP car)</li>
                        </ul>
                    </article>
                    <article>
                        <h3>Police Career</h3>
                        <p>Focused on arresting players, patrolling, and reviving. Generally less rewarding for new players. Useful perks:</p>
                        <ul>
                            <li><strong>Level 4:</strong> Arrest speed boost, grenade launcher (same damage as RPG, reloads twice as fast), bonus arrest cash, and the Warden car.</li>
                        </ul>
                        <p>Recommended: Max out the Syndicate career first. Police level 4 gives everything useful — the grenade launcher alone makes it worth reaching.</p>
                    </article>
                    <article>
                        <h3>Spending Priority (Beginner)</h3>
                        <ol>
                            <li>Vehicles (grinding cars first)</li>
                            <li>Gun contracts (M60 / SVD only, once vehicles are sorted)</li>
                            <li>House storage (only if storing gems for Sir B.)</li>
                            <li>Furniture — lowest priority</li>
                        </ol>
                    </article>
                </div>
            </section>
        </div>
    `;
}