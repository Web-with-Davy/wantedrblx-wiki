function renderCrimes() {
    const crimesData = [
        { name: "ATM Robbery", type: "Quick Grab", difficulty: "Easy", payout: "$500 - $1,500", cooldown: "3 min" },
        { name: "Bank of Oasis Vault", type: "Heist", difficulty: "Hard", payout: "$15,000", cooldown: "15 min" },
        { name: "Jewelry Store", type: "Heist", difficulty: "Medium", payout: "$8,000", cooldown: "10 min" },
        { name: "Gas Station Register", type: "Quick Grab", difficulty: "Easy", payout: "$200 - $800", cooldown: "2 min" },
        { name: "Syndicate Headquarters", type: "Raid", difficulty: "Extreme", payout: "$50,000", cooldown: "30 min" },
    ];

    const sortButtons = renderSortButtons([
        { label: "ALL", value: "all", onClick: "window.currentCrimesFilter='all'; loadPage('crimes');" },
        { label: "QUICK GRAB", value: "quick", onClick: "window.currentCrimesFilter='quick'; loadPage('crimes');" },
        { label: "HEISTS", value: "heist", onClick: "window.currentCrimesFilter='heist'; loadPage('crimes');" }
    ], window.currentCrimesFilter || 'all');

    const filter = window.currentCrimesFilter || 'all';

    const cards = crimesData.filter(crime => {
        if (filter === 'quick') return crime.type === 'Quick Grab';
        if (filter === 'heist') return crime.type === 'Heist';
        return true;
    }).map(crime => {
        // Placeholder images or simple text-based posters
        const imagePath = `images/favicon.png`; 

        const content = `
            <h3>${crime.name}</h3>
            ${renderStat('Type', crime.type)}
            ${renderStat('Difficulty', crime.difficulty)}
            ${renderStat('Payout', crime.payout)}
            ${renderStat('Cooldown', crime.cooldown)}
        `;

        return \`
        <div class="card crime-poster">
            <div class="crime-poster-header">WANTED</div>
            \${content}
        </div>\`;
    });

    const disclaimer = "A classified log of illicit activities available in Oasis City.";
    return renderPage("CRIME BOARD", sortButtons, cards, disclaimer);
}

window.renderCrimes = renderCrimes;
